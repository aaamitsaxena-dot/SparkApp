'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, ChevronDown } from 'lucide-react'

interface Props {
  programId: string
  nextDayNumber: number
}

export default function AdminDayEditor({ programId, nextDayNumber }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    day_number: nextDayNumber,
    week_number: Math.ceil(nextDayNumber / 6),
    title: '',
    topic: '',
    overview: '',
    key_concepts: '',
    learning_objectives: '',
  })

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('study_days').insert({
      program_id: programId,
      day_number: form.day_number,
      week_number: form.week_number,
      title: form.title,
      topic: form.topic,
      overview: form.overview,
      key_concepts: form.key_concepts.split('\n').map(s => s.trim()).filter(Boolean),
      learning_objectives: form.learning_objectives.split('\n').map(s => s.trim()).filter(Boolean),
    })
    if (error) { toast.error(error.message) }
    else { toast.success(`Day ${form.day_number} added!`); setOpen(false); router.refresh() }
    setLoading(false)
  }

  return (
    <div className="border border-dashed border-indigo-300 rounded-xl">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition"
      >
        <Plus className="w-4 h-4" />
        Add Day {nextDayNumber}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <form onSubmit={handleAdd} className="p-4 space-y-3 border-t border-dashed border-indigo-200">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Day Number</label>
              <input type="number" value={form.day_number} min={1} max={30}
                onChange={e => setForm(f => ({ ...f, day_number: +e.target.value, week_number: Math.ceil(+e.target.value / 6) }))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Week</label>
              <input type="number" value={form.week_number} min={1} max={5}
                onChange={e => setForm(f => ({ ...f, week_number: +e.target.value }))}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          {[
            { label: 'Title *', key: 'title', placeholder: 'e.g. Introduction to Matter' },
            { label: 'Topic *', key: 'topic', placeholder: 'e.g. Physical vs Chemical Properties' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
              <input required type="text" value={(form as Record<string, string | number>)[f.key] as string}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Overview</label>
            <textarea value={form.overview} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))} rows={3}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Key Concepts (one per line)</label>
            <textarea value={form.key_concepts} onChange={e => setForm(f => ({ ...f, key_concepts: e.target.value }))} rows={3}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Learning Objectives (one per line)</label>
            <textarea value={form.learning_objectives} onChange={e => setForm(f => ({ ...f, learning_objectives: e.target.value }))} rows={3}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60">
            {loading ? 'Saving…' : 'Add Day'}
          </button>
        </form>
      )}
    </div>
  )
}
