'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { QuizQuestion } from '@/lib/types'
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  questions: QuizQuestion[]
  userId: string
  programId: string
  courseId: string
  studyDayId: string
  dayNumber: number
  existingScore?: number
  existingMax?: number
  alreadyDone: boolean
}

type UserAnswers = Record<string, string | string[]>

export default function QuizClient({
  questions,
  userId,
  programId,
  courseId,
  studyDayId,
  dayNumber,
  existingScore,
  existingMax,
  alreadyDone: initial,
}: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [answers, setAnswers] = useState<UserAnswers>({})
  const [submitted, setSubmitted] = useState(initial)
  const [score, setScore] = useState(existingScore ?? 0)
  const [maxPts, setMaxPts] = useState(existingMax ?? questions.reduce((s, q) => s + q.points, 0))
  const [loading, setLoading] = useState(false)
  const [showReview, setShowReview] = useState(initial)

  function setAnswer(qId: string, value: string, type: string) {
    setAnswers(prev => {
      if (type === 'mcq') {
        const current = (prev[qId] as string[]) ?? []
        const already = current.includes(value)
        return { ...prev, [qId]: already ? current.filter(v => v !== value) : [...current, value] }
      }
      return { ...prev, [qId]: value }
    })
  }

  function isCorrect(q: QuizQuestion): boolean {
    const answer = answers[q.id]
    if (!answer) return false
    if (q.question_type === 'mcq') {
      const correct = (q.correct_answer as string[]).sort().join(',')
      const given = [...(answer as string[])].sort().join(',')
      return correct === given
    }
    return (answer as string).toLowerCase() === (q.correct_answer as string).toLowerCase()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const totalMax = questions.reduce((s, q) => s + q.points, 0)
    const earned = questions.filter(q => isCorrect(q)).reduce((s, q) => s + q.points, 0)
    const pct = totalMax > 0 ? Math.round((earned / totalMax) * 100) : 0

    const { data: existing } = await supabase
      .from('user_progress')
      .select('total_points')
      .eq('user_id', userId)
      .eq('study_day_id', studyDayId)
      .single()

    const currentPts = existing?.total_points ?? 5  // lesson pts should already be there
    // Only add quiz points — subtract any previously recorded quiz score to avoid double-adding
    const prevQuizPts = existingScore ?? 0
    const newTotal = currentPts - prevQuizPts + earned

    const { error } = await supabase.from('user_progress').upsert({
      user_id: userId,
      program_id: programId,
      study_day_id: studyDayId,
      quiz_score: earned,
      quiz_max_points: totalMax,
      quiz_completed_at: new Date().toISOString(),
      total_points: newTotal,
    }, { onConflict: 'user_id,study_day_id' })

    if (error) {
      toast.error('Error saving quiz: ' + error.message)
    } else {
      setScore(earned)
      setMaxPts(totalMax)
      setSubmitted(true)
      setShowReview(true)
      toast.success(`Quiz submitted! You scored ${earned}/${totalMax} (${pct}%) 🎯`)
      router.refresh()
    }
    setLoading(false)
  }

  if (showReview) {
    return (
      <div className="space-y-6">
        {/* Score summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 text-center">
          <div className="text-5xl font-extrabold text-indigo-600 mb-1">
            {maxPts > 0 ? Math.round((score / maxPts) * 100) : 0}%
          </div>
          <div className="text-slate-600 text-sm mb-3">{score} / {maxPts} points</div>
          <div className="font-semibold text-slate-900">
            {score === maxPts ? '🏆 Perfect score!' : score >= maxPts * 0.7 ? '⚡ Great job!' : '💪 Keep practicing!'}
          </div>
        </div>

        {/* Per-question review */}
        <div className="space-y-4">
          {questions.map((q, i) => {
            const correct = isCorrect(q)
            const userAns = answers[q.id]
            return (
              <div key={q.id} className={cn(
                'rounded-xl border p-4',
                submitted && correct ? 'border-green-300 bg-green-50/40' : 'border-red-300 bg-red-50/40'
              )}>
                <div className="flex items-start gap-2 mb-3">
                  {correct
                    ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                  <span className="font-medium text-slate-900 text-sm">{i + 1}. {q.question}</span>
                </div>
                <div className="text-xs text-slate-500 mb-1">
                  Your answer: <strong>{Array.isArray(userAns) ? userAns.join(', ') : (userAns ?? 'No answer')}</strong>
                </div>
                {!correct && (
                  <div className="text-xs text-slate-500 mb-1">
                    Correct answer: <strong className="text-green-700">
                      {Array.isArray(q.correct_answer) ? q.correct_answer.join(', ') : q.correct_answer as string}
                    </strong>
                  </div>
                )}
                {q.explanation && (
                  <div className="text-xs text-slate-600 bg-white rounded-lg px-3 py-2 mt-2 border border-slate-100">
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <Link href={`/courses/${courseId}/day/${dayNumber}`}
            className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50 transition">
            ← Back to Lesson
          </Link>
          <Link href={`/courses/${courseId}/plan`}
            className="flex-1 text-center py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-1">
            Study Plan <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((q, i) => (
        <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-semibold text-slate-900 mb-4 text-sm">
            {i + 1}. {q.question}
            <span className="ml-2 text-xs text-indigo-500 font-normal">({q.points} pts)</span>
          </p>

          {q.question_type === 'true_false' && (
            <div className="flex gap-3">
              {['True', 'False'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswer(q.id, opt, 'true_false')}
                  className={cn(
                    'flex-1 py-2.5 rounded-lg border text-sm font-medium transition',
                    answers[q.id] === opt
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {q.question_type === 'single' && (
            <div className="space-y-2">
              {q.options.map(opt => (
                <label
                  key={opt.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition',
                    answers[q.id] === opt.id
                      ? 'bg-indigo-50 border-indigo-400'
                      : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => setAnswer(q.id, opt.id, 'single')}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm text-slate-800">{opt.text}</span>
                </label>
              ))}
            </div>
          )}

          {q.question_type === 'mcq' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-400 mb-2">Select all that apply</p>
              {q.options.map(opt => {
                const selected = ((answers[q.id] as string[]) ?? []).includes(opt.id)
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition',
                      selected ? 'bg-indigo-50 border-indigo-400' : 'border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    <input
                      type="checkbox"
                      value={opt.id}
                      checked={selected}
                      onChange={() => setAnswer(q.id, opt.id, 'mcq')}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-slate-800">{opt.text}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
      >
        {loading ? 'Submitting…' : 'Submit Quiz'}
      </button>
    </form>
  )
}
