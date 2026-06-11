interface Props {
  open: boolean
  isCorrect: boolean
  explanation?: string
  funFact?: string
  xpEarned: number
  onContinue: () => void
}

export default function FeedbackModal({
  open,
  isCorrect,
  explanation,
  funFact,
  xpEarned,
  onContinue,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-indigo-950/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-indigo-100 shadow-2xl p-6 space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">{isCorrect ? '🎉' : '🙂'}</div>
          <h3 className="text-2xl font-extrabold text-indigo-900">
            {isCorrect ? "Awesome! You're on fire!" : 'Nice try! You got this!'}
          </h3>
          <p className="text-sm text-indigo-600 font-semibold mt-1">
            {isCorrect ? `+${xpEarned} XP earned` : 'No XP this round. Keep going!'}
          </p>
        </div>

        {explanation && (
          <div className="rounded-2xl bg-indigo-50 border border-indigo-200 px-4 py-3 text-sm text-indigo-900">
            <strong>Why:</strong> {explanation}
          </div>
        )}

        {funFact && (
          <div className="rounded-2xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-900">
            <strong>Fun Fact:</strong> {funFact}
          </div>
        )}

        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
