import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import AdminResourcesEditor from './AdminResourcesEditor'
import AdminQuizEditor from './AdminQuizEditor'
import AdminExperimentEditor from './AdminExperimentEditor'
import type { Resource, QuizQuestion, Experiment } from '@/lib/types'

export default async function AdminDayPage({
  params,
}: {
  params: Promise<{ programId: string; dayNumber: string }>
}) {
  const { programId, dayNumber } = await params
  const dayNum = parseInt(dayNumber, 10)
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/dashboard')

  const { data: program } = await supabase.from('programs').select('id,name').eq('id', programId).single()
  if (!program) notFound()

  const { data: day } = await supabase
    .from('study_days').select('*').eq('program_id', programId).eq('day_number', dayNum).single()
  if (!day) notFound()

  const [{ data: resources }, { data: questions }, { data: experiment }] = await Promise.all([
    supabase.from('resources').select('*').eq('study_day_id', day.id).order('order_index'),
    supabase.from('quiz_questions').select('*').eq('study_day_id', day.id).order('order_index'),
    supabase.from('experiments').select('*').eq('study_day_id', day.id).single(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin userEmail={user.email} />
      <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-10">
        <div>
          <nav className="text-xs text-slate-400 mb-2 flex gap-1 items-center">
            <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
            <span>/</span>
            <Link href={`/admin/programs/${programId}`} className="hover:text-indigo-600">{program.name}</Link>
            <span>/</span>
            <span>Day {dayNum}</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900">{day.title}</h1>
          <p className="text-sm text-slate-400">Day {dayNum} · Week {day.week_number} · {day.topic}</p>
        </div>

        <AdminResourcesEditor studyDayId={day.id} initialResources={(resources ?? []) as Resource[]} />
        <AdminQuizEditor studyDayId={day.id} initialQuestions={(questions ?? []) as QuizQuestion[]} />
        <AdminExperimentEditor studyDayId={day.id} initialExperiment={experiment as Experiment | null} />
      </div>
    </div>
  )
}
