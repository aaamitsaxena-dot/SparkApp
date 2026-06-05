import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import AdminPublishToggle from './AdminPublishToggle'
import { Plus } from 'lucide-react'
import type { Program } from '@/lib/types'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/admin')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile?.is_admin) redirect('/dashboard')

  const { data: programs } = await supabase
    .from('programs').select('*').order('state').order('grade').order('name')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin userEmail={user.email} />
      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin — Programs</h1>
          <Link href="/admin/programs/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition">
            <Plus className="w-4 h-4" />
            New Program
          </Link>
        </div>

        <div className="space-y-3">
          {(programs ?? []).map((prog: Program) => (
            <div key={prog.id} className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 truncate">{prog.name}</div>
                <div className="text-xs text-slate-400">{prog.grade} · {prog.subject} · {prog.county}, {prog.state}</div>
              </div>
              <AdminPublishToggle programId={prog.id} isPublished={prog.is_published} />
              <Link href={`/admin/programs/${prog.id}`}
                className="text-xs font-medium text-indigo-600 hover:underline shrink-0">
                Edit →
              </Link>
            </div>
          ))}
          {!programs?.length && (
            <div className="text-center py-12 text-slate-400">No programs yet. Create one to get started.</div>
          )}
        </div>
      </div>
    </div>
  )
}
