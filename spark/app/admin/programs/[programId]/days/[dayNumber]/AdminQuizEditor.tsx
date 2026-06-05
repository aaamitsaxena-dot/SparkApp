'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import type { QuizQuestion, QuestionType } from '@/lib/types'

export default function AdminQuizEditor({ studyDayId, initialQuestions }: { studyDayId: string; initialQuestions: QuizQuestion[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    question: '',
    question_type: 'single' as QuestionType,
    options: [{ id: 'a', text: '' }, { id: 'b', text: '' }, { id: 'c', text: '' }, { id: 'd', text: '' }],
    correct_answer: '',
    explanation: '',
    points: 10,
  })

  function updateOption(idx: number, text: string) {
    setForm(f => { const opts = [...f.options]; opts[idx] = { ...opts[idx], text }; return { ...f, options: opts } })
  }

  async function addQuestion(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const validOptions = form.options.filter(o => o.text.trim())
    const correctAnswer = form.question_type === 'mcq'
      ? form.correct_answer.split(',').map(s => s.trim()).filter(Boolean)
      : form.correct_answer
    const { data, error } = await supabase.from('quiz_questions').insert({
      study_day_id: studyDayId,
      question: form.question,
      question_type: form.question_type,
      options: form.question_type === 'true_false' ? [] : validOptions,
      correct_answer: correctAnswer,
      explanation: form.explanation,
      points: form.points,
      order_index: questions.length,
    }).select().single()
    if (error) toast.error(error.message)
    else { setQuestions(q => [...q, data as QuizQuestion]); setShowForm(false); toast.success('Question added'); router.refresh() }
    setLoading(false)
  }

  async function deleteQuestion(id: string) {
    const { error } = await supabase.from('quiz_questions').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { setQuestions(q => q.filter(x => x.id !== id)); toast.success('Deleted') }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900">Quiz Questions ({questions.length})</h2>
        <button onClick={() => setShowForm(s => !s)}
          className="inline-flex items-center gap-1 text-sm text-indigo-600 font-medium hover:underline">
          <Plus className="w-4 h-4" />{showForm ? 'Cancel' : 'Add Question'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addQuestion} className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Question *</label>
            <textarea required value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
              rows={2} className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
              <select value={form.question_type} onChange={e => setForm(f => ({ ...f, question_type: e.target.value as QuestionType, correct_answer: '' }))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="single">Single Choice</option>
                <option value="mcq">Multiple Choice</option>
                <option value="true_false">True / False</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Points</label>
              <input type="number" value={form.points} min={1} onChange={e => setForm(f => ({ ...f, points: +e.target.value }))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {form.question_type !== 'true_false' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">Options (a–d)</label>
              {form.options.map((opt, i) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 w-5">{opt.id}.</span>
                  <input type="text" value={opt.text} onChange={e => updateOption(i, e.target.value)}
                    placeholder={`Option ${opt.id}`}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Correct Answer *
              {form.question_type === 'true_false' && ' (True or False)'}
              {form.question_type === 'single' && ' (option id: a, b, c, or d)'}
              {form.question_type === 'mcq' && ' (comma-separated ids: a,c)'}
            </label>
            <input required type="text" value={form.correct_answer}
              onChange={e => setForm(f => ({ ...f, correct_answer: e.target.value }))}
              placeholder={form.question_type === 'true_false' ? 'True' : form.question_type === 'mcq' ? 'a,c' : 'a'}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Explanation (shown after answer)</label>
            <textarea value={form.explanation} onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} rows={2}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-60">
            {loading ? 'Adding…' : 'Add Question'}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {questions.map((q, i) => (
          <div key={q.id} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg px-3 py-2.5">
            <span className="text-xs font-bold text-slate-400 mt-0.5">{i + 1}.</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 line-clamp-2">{q.question}</div>
              <div className="text-xs text-slate-400">{q.question_type} · {q.points} pts</div>
            </div>
            <button onClick={() => deleteQuestion(q.id)} className="text-slate-300 hover:text-red-400 transition shrink-0 mt-0.5">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
