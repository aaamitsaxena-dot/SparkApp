'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { QuizQuestion } from '@/lib/types'
import QuizProgressBar from './components/QuizProgressBar'
import QuestionCard from './components/QuestionCard'
import FeedbackModal from './components/FeedbackModal'
import ResultsScreen from './components/ResultsScreen'

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

type UserAnswers = Record<string, string[]>

interface FeedbackState {
  open: boolean
  isCorrect: boolean
  explanation?: string
  funFact?: string
  xpEarned: number
}

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
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(existingScore ?? 0)
  const [maxPts, setMaxPts] = useState(existingMax ?? questions.reduce((s, q) => s + q.points, 0))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>({
    open: false,
    isCorrect: false,
    explanation: undefined,
    funFact: undefined,
    xpEarned: 0,
  })

  function setAnswer(qId: string, value: string, type: string) {
    setAnswers(prev => {
      if (type === 'mcq') {
        const current = prev[qId] ?? []
        const already = current.includes(value)
        return { ...prev, [qId]: already ? current.filter(v => v !== value) : [...current, value] }
      }
      return { ...prev, [qId]: [value] }
    })
  }

  function isCorrect(q: QuizQuestion, qAnswers: UserAnswers): boolean {
    const answer = qAnswers[q.id]
    if (!answer || answer.length === 0) return false
    if (q.question_type === 'mcq') {
      const correct = (q.correct_answer as string[]).sort().join(',')
      const given = [...answer].sort().join(',')
      return correct === given
    }
    return answer[0].toLowerCase() === (q.correct_answer as string).toLowerCase()
  }

  async function finalizeQuiz(qAnswers: UserAnswers) {
    setLoading(true)

    const totalMax = questions.reduce((s, q) => s + q.points, 0)
    const earned = questions.filter(q => isCorrect(q, qAnswers)).reduce((s, q) => s + q.points, 0)
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
      toast.success(`Amazing work! ${earned}/${totalMax} XP (${pct}%)`)
      router.refresh()
    }
    setLoading(false)
  }

  function handleCheckAnswer() {
    const question = questions[currentIndex]
    const selected = answers[question.id] ?? []
    if (selected.length === 0) {
      toast.error('Pick an answer first!')
      return
    }

    const correct = isCorrect(question, answers)
    const xpEarned = correct ? question.points : 0

    setFeedback({
      open: true,
      isCorrect: correct,
      explanation: question.explanation,
      funFact: (question as QuizQuestion & { fun_fact?: string }).fun_fact,
      xpEarned,
    })

    if (correct) {
      setScore(prev => prev + question.points)
      const nextStreak = streak + 1
      setStreak(nextStreak)
      setBestStreak(prev => Math.max(prev, nextStreak))
    } else {
      setStreak(0)
    }
  }

  async function handleContinue() {
    const isLast = currentIndex >= questions.length - 1
    setFeedback(prev => ({ ...prev, open: false }))

    if (isLast) {
      await finalizeQuiz(answers)
      return
    }

    setCurrentIndex(prev => prev + 1)
  }

  if (submitted || initial) {
    return (
      <div className="space-y-4">
        {initial && !submitted && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
            You already completed this quiz. Want to try again and beat your score?
          </div>
        )}
        <ResultsScreen
          score={score}
          maxScore={maxPts}
          streakBest={bestStreak}
          dayNumber={dayNumber}
          courseId={courseId}
        />
      </div>
    )
  }

  const activeQuestion = questions[currentIndex]
  const selected = answers[activeQuestion.id] ?? []

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-white border border-indigo-100 p-4 space-y-3">
        <QuizProgressBar current={currentIndex + 1} total={questions.length} />
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-indigo-700">Score: {score} XP</span>
          <span className="text-orange-600">Streak: {streak} 🔥</span>
        </div>
      </div>

      <QuestionCard
        question={activeQuestion}
        questionNumber={currentIndex + 1}
        selected={selected}
        onSelect={(value) => setAnswer(activeQuestion.id, value, activeQuestion.question_type)}
      />

      <button
        type="button"
        onClick={handleCheckAnswer}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition disabled:opacity-60"
      >
        Check Answer
      </button>

      <FeedbackModal
        open={feedback.open}
        isCorrect={feedback.isCorrect}
        explanation={feedback.explanation}
        funFact={feedback.funFact}
        xpEarned={feedback.xpEarned}
        onContinue={handleContinue}
      />
    </div>
  )
}
