'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewProgramPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', subject: '', grade: '', state: '', county: '', district: '', description: '', source_url: '',
  })

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.from('programs').insert({ ...form, is_published: false }).select().single()
    if (error) { toast.error(error.message); setLoading(false) }
    else { toast.success('Program created!'); router.push(`/admin/programs/${data.id}`) }
  }

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div key={key}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        value={(form as Record<string, string>)[key]}
        onChange={e => set(key, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin" className="text-sm text-indigo-600 hover:underline">← Admin</Link>
        <span className="text-slate-400">/</span>
        <span className="text-sm text-slate-700">New Program</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create Program</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        {field('Program Name *', 'name', 'text', 'e.g. Grade 8 Science AAC')}
        <div className="grid grid-cols-2 gap-4">
          {field('Subject *', 'subject', 'text', 'Science')}
          {field('Grade *', 'grade', 'text', 'Grade 8')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field('State *', 'state', 'text', 'Texas')}
          {field('County *', 'county', 'text', 'Fort Bend County')}
        </div>
        {field('District', 'district', 'text', 'Fort Bend ISD')}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brief description of this program..."
          />
        </div>
        {field('Source Plan URL', 'source_url', 'url', 'https://...')}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Program'}
          </button>
          <Link href="/admin" className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
