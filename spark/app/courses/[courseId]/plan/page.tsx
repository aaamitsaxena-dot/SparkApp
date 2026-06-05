import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { CheckCircle2, Lock, Circle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StudyDay, UserProgress } from '@/lib/types'

export default async function PlanPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/courses/' + courseId + '/plan')

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()

  const { data: program } = await supabase.from('programs').select('id,name,grade,subject').eq('id', courseId).single()
  if (!program) notFound()

  const { data: enrollment } = await supabase
    .from('enrollments').select('id').eq('user_id', user.id).eq('program_id', courseId).single()
  if (!enrollment) redirect(`/courses/${courseId}`)

  const { data: days } = await supabase
    .from('study_days').select('*').eq('program_id', courseId).order('day_number')

  const { data: progressRows } = await supabase
    .from('user_progress').select('*').eq('user_id', user.id).eq('program_id', courseId)

  const progressMap = new Map<string, UserProgress>()
  for (const row of (progressRows ?? []) as UserProgress[]) {
    progressMap.set(row.study_day_id, row)
  }

  // Group by week
  const weeks: Record<number, StudyDay[]> = {}
  for (const day of (days ?? []) as StudyDay[]) {
    if (!weeks[day.week_number]) weeks[day.week_number] = []
    weeks[day.week_number].push(day)
  }

  const totalDays = days?.length ?? 0
  const completedDays = [...progressMap.values()].filter(p => p.is_lesson_complete).length
  const totalPoints = [...progressMap.values()].reduce((sum, p) => sum + p.total_points, 0)
  const overallPct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin={profile?.is_admin} userEmail={user.email} />

      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <nav className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <Link href="/courses" className="hover:text-indigo-600">Courses</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/courses/${courseId}`} className="hover:text-indigo-600">{program.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>30-Day Plan</span>
          </nav>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{program.name}</h1>
              <p className="text-slate-500 text-sm">{program.grade} · {program.subject}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-indigo-600">{totalPoints}</div>
              <div className="text-xs text-slate-400">total points</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Overall progress</span>
              <span>{completedDays}/{totalDays} days</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        </div>

        {/* Weekly plan grid */}
        <div className="space-y-8">
          {Object.entries(weeks).map(([weekNum, weekDays]) => {
            const weekCompleted = weekDays.filter(d => progressMap.get(d.id)?.is_lesson_complete).length
            const weekPct = Math.round((weekCompleted / weekDays.length) * 100)
            return (
              <div key={weekNum}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-slate-700">Week {weekNum}</h2>
                  <span className="text-xs text-slate-400">{weekCompleted}/{weekDays.length} complete · {weekPct}%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${weekPct}%` }} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {weekDays.map(day => {
                    const prog = progressMap.get(day.id)
                    const isDone = prog?.is_lesson_complete ?? false
                    const quizDone = !!prog?.quiz_completed_at
                    const expDone = prog?.experiment_completed ?? false
                    const dayPoints = prog?.total_points ?? 0

                    return (
                      <Link
                        key={day.id}
                        href={`/courses/${courseId}/day/${day.day_number}`}
                        className={cn(
                          'relative bg-white border rounded-xl p-4 hover:shadow-md transition-all group',
                          isDone ? 'border-green-300 bg-green-50/30' : 'border-slate-200 hover:border-indigo-300'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={cn(
                            'text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center',
                            isDone ? 'bg-green-500 text-white' : 'bg-indigo-50 text-indigo-700'
                          )}>
                            {day.day_number}
                          </span>
                          <div className="flex gap-1">
                            {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Circle className="w-3.5 h-3.5 text-slate-300" />}
                            {quizDone && <span className="text-xs">✅</span>}
                            {expDone && <span className="text-xs">🧪</span>}
                          </div>
                        </div>
                        <div className="font-medium text-sm text-slate-900 leading-snug mb-0.5 line-clamp-2">{day.title}</div>
                        <div className="text-xs text-slate-400 truncate">{day.topic}</div>
                        {dayPoints > 0 && (
                          <div className="mt-2 text-xs font-semibold text-indigo-600">{dayPoints} pts</div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
