import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getCurrentLevel, getNextLevel } from '@/lib/utils'
import { BookOpen, Star, Target, Zap } from 'lucide-react'
import type { AchievementLevel, Program, UserProgress } from '@/lib/types'

interface EnrolledProgram {
  program_id: string
  enrolled_at: string
  programs: Program
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/dashboard')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('program_id, enrolled_at, programs(*)')
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false })

  type RawEnrollment = { program_id: string; enrolled_at: string; programs: Program | Program[] }
  const typedEnrollments: EnrolledProgram[] = (enrollments ?? []).map((e: RawEnrollment) => ({
    ...e,
    programs: Array.isArray(e.programs) ? e.programs[0] : e.programs,
  }))
  const programIds = typedEnrollments.map((e) => e.program_id)

  // Fetch all progress + achievement levels for enrolled programs
  const { data: allProgress } = programIds.length > 0
    ? await supabase.from('user_progress').select('*').eq('user_id', user.id).in('program_id', programIds)
    : { data: [] }

  const { data: dayCountRows } = programIds.length > 0
    ? await supabase.from('study_days').select('program_id, id').in('program_id', programIds)
    : { data: [] }

  const { data: allLevels } = programIds.length > 0
    ? await supabase.from('achievement_levels').select('*').in('program_id', programIds).order('min_points')
    : { data: [] }

  // Compute per-program stats
  const progressByProgram = new Map<string, UserProgress[]>()
  for (const row of (allProgress ?? []) as UserProgress[]) {
    if (!progressByProgram.has(row.program_id)) progressByProgram.set(row.program_id, [])
    progressByProgram.get(row.program_id)!.push(row)
  }

  const totalDaysByProgram = new Map<string, number>()
  for (const row of (dayCountRows ?? []) as { program_id: string; id: string }[]) {
    totalDaysByProgram.set(row.program_id, (totalDaysByProgram.get(row.program_id) ?? 0) + 1)
  }

  const levelsByProgram = new Map<string, AchievementLevel[]>()
  for (const lvl of (allLevels ?? []) as AchievementLevel[]) {
    if (!levelsByProgram.has(lvl.program_id)) levelsByProgram.set(lvl.program_id, [])
    levelsByProgram.get(lvl.program_id)!.push(lvl)
  }

  const displayName = profile?.display_name ?? user.email?.split('@')[0] ?? 'Student'

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin={profile?.is_admin} userEmail={user.email} />

      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
        {/* Welcome */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {displayName}!</h1>
            <p className="text-slate-500 text-sm">Keep up the great work</p>
          </div>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'Courses Enrolled', value: enrollments?.length ?? 0, color: 'text-indigo-600' },
            { icon: Target, label: 'Days Completed', value: (allProgress ?? []).filter((p: UserProgress) => p.is_lesson_complete).length, color: 'text-green-600' },
            { icon: Star, label: 'Quizzes Done', value: (allProgress ?? []).filter((p: UserProgress) => !!p.quiz_completed_at).length, color: 'text-purple-600' },
            { icon: Zap, label: 'Total Points', value: (allProgress ?? []).reduce((s: number, p: UserProgress) => s + p.total_points, 0), color: 'text-orange-600' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Enrolled courses */}
        {enrollments && enrollments.length > 0 ? (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">My Courses</h2>
            <div className="space-y-4">
              {typedEnrollments.map(({ program_id, programs: prog }) => {
                const progRows = progressByProgram.get(program_id) ?? []
                const totalDays = totalDaysByProgram.get(program_id) ?? 30
                const completedDays = progRows.filter(p => p.is_lesson_complete).length
                const totalPts = progRows.reduce((s, p) => s + p.total_points, 0)
                const pct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
                const levels = levelsByProgram.get(program_id) ?? []
                const currentLevel = getCurrentLevel(totalPts, levels)
                const nextLevel = getNextLevel(totalPts, levels)

                return (
                  <div key={program_id} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900">{prog?.name}</h3>
                        <p className="text-xs text-slate-400">{prog?.grade} · {prog?.county}, {prog?.state}</p>
                      </div>
                      {currentLevel && (
                        <div className="text-center shrink-0">
                          <div className="text-2xl">{currentLevel.badge_icon}</div>
                          <div className="text-xs font-semibold text-slate-700">{currentLevel.name}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{completedDays}/{totalDays} days ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold text-indigo-600">{totalPts}</span>
                        <span className="text-slate-400 text-xs"> pts earned</span>
                        {nextLevel && (
                          <span className="text-xs text-slate-400 ml-2">
                            · {nextLevel.min_points - totalPts} to {nextLevel.name} {nextLevel.badge_icon}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/courses/${program_id}/plan`}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Continue studying →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <h3 className="font-semibold text-slate-700 mb-1">No courses yet</h3>
            <p className="text-slate-400 text-sm mb-4">Browse available programs and enroll to get started</p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition">
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
