'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import type { Resource, ResourceType } from '@/lib/types'

const RESOURCE_TYPES: ResourceType[] = ['video', 'article', 'interactive', 'pdf', 'website']

export default function AdminResourcesEditor({ studyDayId, initialResources }: { studyDayId: string; initialResources: Resource[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', url: '', resource_type: 'video' as ResourceType, source: '', description: '' })

  async function addResource(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.from('resources')
      .insert({ ...form, study_day_id: studyDayId, order_index: resources.length })
      .select().single()
    if (error) toast.error(error.message)
    else { setResources(r => [...r, data as Resource]); setShowForm(false); toast.success('Resource added'); router.refresh() }
    setLoading(false)
  }

  async function deleteResource(id: string) {
    const { error } = await supabase.from('resources').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { setResources(r => r.filter(x => x.id !== id)); toast.success('Deleted') }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900">Resources ({resources.length})</h2>
        <button onClick={() => setShowForm(s => !s)}
          className="inline-flex items-center gap-1 text-sm text-indigo-600 font-medium hover:underline">
          <Plus className="w-4 h-4" />{showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addResource} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3 mb-4">
          {[
            { label: 'Title *', key: 'title', type: 'text', placeholder: 'Khan Academy: Matter' },
            { label: 'URL *', key: 'url', type: 'url', placeholder: 'https://...' },
            { label: 'Source *', key: 'source', type: 'text', placeholder: 'Khan Academy' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
              <input required type={f.type} value={(form as Record<string, string>)[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
            <select value={form.resource_type} onChange={e => setForm(f => ({ ...f, resource_type: e.target.value as ResourceType }))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60">
            {loading ? 'Adding…' : 'Add Resource'}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {resources.map(r => (
          <div key={r.id} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-3 py-2.5">
            <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5 shrink-0">{r.resource_type}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{r.title}</div>
              <div className="text-xs text-slate-400 truncate">{r.source} · {r.url}</div>
            </div>
            <button onClick={() => deleteResource(r.id)} className="text-slate-300 hover:text-red-400 transition shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
