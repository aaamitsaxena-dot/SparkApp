import type { QuizQuestion } from '@/lib/types'
import AnswerButton from './AnswerButton'

interface Props {
  question: QuizQuestion
  questionNumber: number
  selected: string[]
  onSelect: (value: string) => void
}

export default function QuestionCard({ question, questionNumber, selected, onSelect }: Props) {
  return (
    <section className="bg-white rounded-3xl border-2 border-indigo-100 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-bold">
          Question {questionNumber}
        </span>
        <span className="text-xs font-bold text-green-700">+{question.points} XP</span>
      </div>

      <h2 className="text-xl font-extrabold text-indigo-950 leading-tight">{question.question}</h2>

      <div className="space-y-3">
        {question.question_type === 'true_false' && ['True', 'False'].map(opt => (
          <AnswerButton
            key={opt}
            text={opt}
            selected={selected.includes(opt)}
            onClick={() => onSelect(opt)}
          />
        ))}

        {(question.question_type === 'single' || question.question_type === 'mcq') && question.options.map(opt => (
          <AnswerButton
            key={opt.id}
            text={opt.text}
            selected={selected.includes(opt.id)}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>

      {question.question_type === 'mcq' && (
        <p className="text-xs text-indigo-500 font-semibold">Pick all that are correct.</p>
      )}
    </section>
  )
}
