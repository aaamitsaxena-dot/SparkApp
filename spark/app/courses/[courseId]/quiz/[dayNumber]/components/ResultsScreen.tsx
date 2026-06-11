import Link from 'next/link'

interface Props {
  score: number
  maxScore: number
  streakBest: number
  dayNumber: number
  courseId: string
}

export default function ResultsScreen({ score, maxScore, streakBest, dayNumber, courseId }: Props) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

  const badge = pct >= 90
    ? 'Matter Master'
    : pct >= 70
      ? 'Science Sprinter'
      : 'Curious Explorer'

  return (
    <section className="bg-white rounded-3xl border-2 border-indigo-100 p-8 shadow-sm text-center space-y-5">
      <div className="text-5xl">🏆</div>
      <h2 className="text-3xl font-extrabold text-indigo-900">Quiz Complete!</h2>
      <p className="text-indigo-700 font-semibold">You scored {score}/{maxScore} ({pct}%)</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-3">
          <div className="text-xs text-indigo-500 font-bold">Best Streak</div>
          <div className="text-xl font-extrabold text-indigo-900">{streakBest} 🔥</div>
        </div>
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3">
          <div className="text-xs text-amber-600 font-bold">Badge Unlocked</div>
          <div className="text-sm font-extrabold text-amber-900">{badge}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/courses/${courseId}/day/${dayNumber}`}
          className="flex-1 rounded-2xl border-2 border-indigo-200 py-3 font-bold text-indigo-800 hover:bg-indigo-50"
        >
          Back to Lesson
        </Link>
        <Link
          href={`/courses/${courseId}/day/${dayNumber + 1}`}
          className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 py-3 font-bold text-white"
        >
          Next Day Level
        </Link>
      </div>
    </section>
  )
}
