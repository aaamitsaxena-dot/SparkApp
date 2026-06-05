'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function AdminPublishToggle({ programId, isPublished }: { programId: string; isPublished: boolean }) {
  const [published, setPublished] = useState(isPublished)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function toggle() {
    setLoading(true)
    const { error } = await supabase.from('programs').update({ is_published: !published }).eq('id', programId)
    if (error) { toast.error(error.message) }
    else { setPublished(p => !p); toast.success(published ? 'Unpublished' : 'Published') }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs font-semibold px-3 py-1 rounded-full transition shrink-0 ${
        published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </button>
  )
}
