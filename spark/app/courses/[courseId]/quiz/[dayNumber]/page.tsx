import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import QuizClient from './QuizClient'
import { ChevronRight } from 'lucide-react'
import type { QuizQuestion } from '@/lib/types'

export default async function QuizPage({
  params,
}: {
  params: Promise<{ courseId: string; dayNumber: string }>
}) {
  const { courseId, dayNumber } = await params
  const dayNum = parseInt(dayNumber, 10)
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?next=/courses/${courseId}/quiz/${dayNumber}`)

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()

  const { data: enrollment } = await supabase
    .from('enrollments').select('id').eq('user_id', user.id).eq('program_id', courseId).single()
  if (!enrollment) redirect(`/courses/${courseId}`)

  const { data: day } = await supabase
    .from('study_days').select('id,title,topic').eq('program_id', courseId).eq('day_number', dayNum).single()
  if (!day) notFound()

  const { data: program } = await supabase.from('programs').select('id,name').eq('id', courseId).single()

  const { data: questions } = await supabase
    .from('quiz_questions').select('*').eq('study_day_id', day.id).order('order_index')

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav isAdmin={profile?.is_admin} userEmail={user.email} />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400">
          <p className="text-4xl mb-4">📝</p>
          <p>No quiz questions for Day {dayNum} yet.</p>
          <Link href={`/courses/${courseId}/day/${dayNum}`} className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
            ← Back to lesson
          </Link>
        </div>
      </div>
    )
  }

  const { data: progress } = await supabase
    .from('user_progress').select('*').eq('user_id', user.id).eq('study_day_id', day.id).single()

  const alreadyDone = !!progress?.quiz_completed_at

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin={profile?.is_admin} userEmail={user.email} />

      <div className="max-w-2xl mx-auto w-full px-4 py-8 space-y-6">
        <nav className="text-xs text-slate-400 flex items-center gap-1 flex-wrap">
          <Link href="/courses" className="hover:text-indigo-600">Courses</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/courses/${courseId}`} className="hover:text-indigo-600">{program?.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/courses/${courseId}/day/${dayNum}`} className="hover:text-indigo-600">Day {dayNum}</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Quiz</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Day {dayNum} Quiz</h1>
          <p className="text-slate-500 text-sm">{day.title} · {questions.length} questions</p>
        </div>

        <QuizClient
          questions={questions as QuizQuestion[]}
          userId={user.id}
          programId={courseId}
          courseId={courseId}
          studyDayId={day.id}
          dayNumber={dayNum}
          existingScore={progress?.quiz_score ?? undefined}
          existingMax={progress?.quiz_max_points ?? undefined}
          alreadyDone={alreadyDone}
        />
      </div>
    </div>
  )
}
