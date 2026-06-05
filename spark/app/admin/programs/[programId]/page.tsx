import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import AdminDayEditor from './AdminDayEditor'
import AdminAchievementsEditor from './AdminAchievementsEditor'
import { Plus } from 'lucide-react'
import type { StudyDay, AchievementLevel } from '@/lib/types'

export default async function AdminProgramPage({ params }: { params: Promise<{ programId: string }> }) {
  const { programId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/dashboard')

  const { data: program } = await supabase.from('programs').select('*').eq('id', programId).single()
  if (!program) notFound()

  const { data: days } = await supabase.from('study_days').select('*').eq('program_id', programId).order('day_number')
  const { data: levels } = await supabase.from('achievement_levels').select('*').eq('program_id', programId).order('min_points')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin userEmail={user.email} />
      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-10">
        <div>
          <nav className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
            <span>/</span>
            <span>{program.name}</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">{program.name}</h1>
          <p className="text-sm text-slate-400">{program.grade} · {program.subject} · {program.county}, {program.state}</p>
        </div>

        {/* Achievement Levels */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Achievement Levels</h2>
          <AdminAchievementsEditor programId={programId} initialLevels={(levels ?? []) as AchievementLevel[]} />
        </section>

        {/* Study Days */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900">Study Days ({days?.length ?? 0}/30)</h2>
          </div>
          <div className="space-y-2">
            {(days ?? []).map((day: StudyDay) => (
              <Link
                key={day.id}
                href={`/admin/programs/${programId}/days/${day.day_number}`}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-indigo-300 transition"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {day.day_number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 truncate">{day.title}</div>
                  <div className="text-xs text-slate-400 truncate">{day.topic}</div>
                </div>
                <span className="text-xs text-indigo-500">Edit →</span>
              </Link>
            ))}
          </div>
          {(days?.length ?? 0) < 30 && (
            <div className="mt-4">
              <AdminDayEditor
                programId={programId}
                nextDayNumber={(days?.length ?? 0) + 1}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
