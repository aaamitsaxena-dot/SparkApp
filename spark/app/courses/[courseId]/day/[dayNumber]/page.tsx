import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import MarkLessonComplete from './MarkLessonComplete'
import { ChevronRight } from 'lucide-react'

export default async function DayPage({
  params,
}: {
  params: Promise<{ courseId: string; dayNumber: string }>
}) {
  const { courseId, dayNumber } = await params
  const dayNum = parseInt(dayNumber, 10)
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?next=/courses/${courseId}/day/${dayNumber}`)

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()

  const { data: enrollment } = await supabase
    .from('enrollments').select('id').eq('user_id', user.id).eq('program_id', courseId).single()
  if (!enrollment) redirect(`/courses/${courseId}`)

  const { data: day } = await supabase
    .from('study_days')
    .select('*')
    .eq('program_id', courseId)
    .eq('day_number', dayNum)
    .single()
  if (!day) notFound()

  const { data: program } = await supabase.from('programs').select('id,name').eq('id', courseId).single()

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('study_day_id', day.id)
    .single()

  const isLessonComplete = progress?.is_lesson_complete ?? false
  const quizDone = !!progress?.quiz_completed_at

  const totalDays = 30
  const prevDay = dayNum > 1 ? dayNum - 1 : null
  const nextDay = dayNum < totalDays ? dayNum + 1 : null

  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <Nav isAdmin={profile?.is_admin} userEmail={user.email} />

      <div className="max-w-3xl mx-auto w-full px-4 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-violet-400 flex items-center gap-1 flex-wrap">
          <Link href="/courses" className="hover:text-indigo-600 font-medium">Courses</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/courses/${courseId}`} className="hover:text-indigo-600 font-medium">{program?.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/courses/${courseId}/plan`} className="hover:text-indigo-600 font-medium">Plan</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-indigo-700 font-semibold">Day {dayNum}</span>
        </nav>

        {/* Day header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-9 h-9 rounded-full bg-yellow-400 text-indigo-900 text-sm font-extrabold flex items-center justify-center shadow">
              {dayNum}
            </span>
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Week {day.week_number}</span>
          </div>
          <h1 className="text-2xl font-extrabold mb-1">{day.title}</h1>
          <p className="text-indigo-200 text-sm font-medium">{day.topic}</p>
        </div>

        {/* Overview */}
        {day.overview && (
          <section className="bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-sm">
            <div className="space-y-3">
              {day.overview.split('\n').map((line: string, i: number) => {
                if (line.startsWith('## ')) return (
                  <h2 key={i} className="text-base font-extrabold text-indigo-800 mt-4 first:mt-0">{line.replace('## ', '')}</h2>
                )
                if (line.startsWith('### ')) return (
                  <h3 key={i} className="text-sm font-bold text-indigo-700 mt-3">{line.replace('### ', '')}</h3>
                )
                if (line.startsWith('> ')) return (
                  <blockquote key={i} className="border-l-4 border-violet-400 pl-4 text-sm text-violet-800 italic">{line.replace('> ', '')}</blockquote>
                )
                if (line.startsWith('- ') || line.startsWith('* ')) return (
                  <div key={i} className="flex items-start gap-2 text-sm text-indigo-900 pl-2">
                    <span className="text-violet-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{line.replace(/^[-*] /, '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                  </div>
                )
                if (line.trim() === '') return null
                const boldLine = line.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`)
                return (
                  <p key={i} className="text-sm text-indigo-950 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: boldLine }} />
                )
              })}
            </div>
          </section>
        )}

        {/* Key Concepts + Objectives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(day.key_concepts as string[]).length > 0 && (
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4">
              <h3 className="font-extrabold text-indigo-800 mb-3 text-sm">🔑 Key Concepts</h3>
              <ul className="flex flex-col gap-2">
                {(day.key_concepts as string[]).map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-indigo-900 w-full">
                    <span className="text-violet-500 font-bold shrink-0 mt-0.5">•</span>
                    <span className="block">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(day.learning_objectives as string[]).length > 0 && (
            <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4">
              <h3 className="font-extrabold text-violet-800 mb-3 text-sm">🎯 Learning Objectives</h3>
              <ul className="flex flex-col gap-2">
                {(day.learning_objectives as string[]).map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-violet-900 w-full">
                    <span className="text-purple-500 font-bold shrink-0 mt-0.5">→</span>
                    <span className="block">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Mark lesson complete */}
        <MarkLessonComplete
          userId={user.id}
          programId={courseId}
          studyDayId={day.id}
          isComplete={isLessonComplete}
        />

        {/* Quiz CTA */}
        <section className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-extrabold text-white mb-0.5">
                {quizDone ? '✅ Quiz Completed' : '📝 Test Your Knowledge'}
              </h3>
              <p className="text-sm text-indigo-100">
                {quizDone
                  ? `You scored ${progress?.quiz_score ?? 0} / ${progress?.quiz_max_points ?? 0} points`
                  : 'Take the quiz to earn up to 50 points. Available after lesson.'}
              </p>
            </div>
            <Link
              href={`/courses/${courseId}/quiz/${dayNum}`}
              className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow ${
                quizDone
                  ? 'bg-white/20 border border-white/40 text-white hover:bg-white/30'
                  : 'bg-yellow-400 text-indigo-900 hover:bg-yellow-300'
              }`}
            >
              {quizDone ? 'Review Quiz' : 'Take Quiz →'}
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-violet-100">
          {prevDay ? (
            <Link href={`/courses/${courseId}/day/${prevDay}`}
              className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-indigo-700 transition">
              ← Day {prevDay}
            </Link>
          ) : <div />}
          <Link href={`/courses/${courseId}/plan`}
            className="text-sm font-medium text-violet-400 hover:text-indigo-600 transition">
            Back to Plan
          </Link>
          {nextDay ? (
            <Link href={`/courses/${courseId}/day/${nextDay}`}
              className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-indigo-700 transition">
              Day {nextDay} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
