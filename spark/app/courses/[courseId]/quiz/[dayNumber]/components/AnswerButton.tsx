import { cn } from '@/lib/utils'

interface Props {
  text: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export default function AnswerButton({ text, selected, onClick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full text-left rounded-2xl border-2 px-4 py-4 font-semibold text-sm transition',
        'focus:outline-none focus:ring-2 focus:ring-indigo-400',
        selected
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
          : 'bg-white border-indigo-200 text-indigo-900 hover:border-indigo-400 hover:bg-indigo-50',
        disabled && 'opacity-60 cursor-not-allowed'
      )}
    >
      {text}
    </button>
  )
}
