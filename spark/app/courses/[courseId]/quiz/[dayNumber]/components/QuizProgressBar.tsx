interface Props {
  current: number
  total: number
}

export default function QuizProgressBar({ current, total }: Props) {
  const safeTotal = total > 0 ? total : 1
  const pct = Math.round((current / safeTotal) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
        <span>Progress</span>
        <span>{current}/{total}</span>
      </div>
      <div className="h-3 rounded-full bg-indigo-100 overflow-hidden border border-indigo-200">
        <div
          className="h-full bg-gradient-to-r from-lime-400 via-emerald-400 to-green-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
