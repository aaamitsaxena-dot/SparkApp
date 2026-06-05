'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { Experiment } from '@/lib/types'

export default function AdminExperimentEditor({ studyDayId, initialExperiment }: { studyDayId: string; initialExperiment: Experiment | null }) {
  const router = useRouter()
  const supabase = createClient()
  const [exp, setExp] = useState<Experiment | null>(initialExperiment)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(!initialExperiment)
  const [form, setForm] = useState({
    title: initialExperiment?.title ?? '',
    description: initialExperiment?.description ?? '',
    materials: initialExperiment?.materials.join('\n') ?? '',
    steps: initialExperiment?.steps.join('\n') ?? '',
    safety_notes: initialExperiment?.safety_notes ?? '',
    bonus_points: initialExperiment?.bonus_points ?? 25,
  })

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const payload = {
      study_day_id: studyDayId,
      title: form.title,
      description: form.description,
      materials: form.materials.split('\n').map(s => s.trim()).filter(Boolean),
      steps: form.steps.split('\n').map(s => s.trim()).filter(Boolean),
      safety_notes: form.safety_notes,
      bonus_points: form.bonus_points,
    }

    if (exp) {
      const { error } = await supabase.from('experiments').update(payload).eq('id', exp.id)
      if (error) toast.error(error.message)
      else { toast.success('Experiment updated'); setEdit(false); router.refresh() }
    } else {
      const { data, error } = await supabase.from('experiments').insert(payload).select().single()
      if (error) toast.error(error.message)
      else { setExp(data as Experiment); toast.success('Experiment added'); setEdit(false); router.refresh() }
    }
    setLoading(false)
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900">Experiment {exp ? '(1)' : '(none)'}</h2>
        {!edit && <button onClick={() => setEdit(true)} className="text-sm text-indigo-600 font-medium hover:underline">Edit</button>}
      </div>

      {edit ? (
        <form onSubmit={save} className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
          {[
            { label: 'Title *', key: 'title', type: 'text' as const, rows: 0 },
            { label: 'Description', key: 'description', type: 'textarea' as const, rows: 2 },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
              {f.type === 'text'
                ? <input required type="text" value={(form as Record<string, string | number>)[f.key] as string}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                : <textarea value={(form as Record<string, string | number>)[f.key] as string}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} rows={f.rows}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />}
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Materials (one per line)</label>
            <textarea value={form.materials} onChange={e => setForm(f => ({ ...f, materials: e.target.value }))} rows={4}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Steps (one per line)</label>
            <textarea value={form.steps} onChange={e => setForm(f => ({ ...f, steps: e.target.value }))} rows={5}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Safety Notes</label>
            <input type="text" value={form.safety_notes} onChange={e => setForm(f => ({ ...f, safety_notes: e.target.value }))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bonus Points</label>
            <input type="number" value={form.bonus_points} min={1}
              onChange={e => setForm(f => ({ ...f, bonus_points: +e.target.value }))}
              className="w-32 px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition disabled:opacity-60">
              {loading ? 'Saving…' : 'Save Experiment'}
            </button>
            {exp && <button type="button" onClick={() => setEdit(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm hover:bg-slate-50 transition">
              Cancel
            </button>}
          </div>
        </form>
      ) : exp ? (
        <div className="bg-white border border-amber-200 rounded-xl p-4">
          <div className="font-semibold text-slate-900 mb-1">{exp.title}</div>
          <div className="text-xs text-slate-500 mb-2">{exp.materials.length} materials · {exp.steps.length} steps · {exp.bonus_points} bonus pts</div>
          {exp.description && <p className="text-sm text-slate-600">{exp.description}</p>}
        </div>
      ) : null}
    </section>
  )
}
