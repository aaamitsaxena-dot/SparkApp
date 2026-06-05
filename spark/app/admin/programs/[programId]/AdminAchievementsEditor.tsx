'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import type { AchievementLevel } from '@/lib/types'

const DEFAULTS: Omit<AchievementLevel, 'id' | 'program_id' | 'created_at'>[] = [
  { name: 'Rookie', min_points: 0, badge_icon: '🌱', description: 'Just getting started' },
  { name: 'Explorer', min_points: 101, badge_icon: '🔭', description: 'Making progress' },
  { name: 'Achiever', min_points: 301, badge_icon: '⚡', description: 'Halfway there' },
  { name: 'Champion', min_points: 601, badge_icon: '🏅', description: 'Almost at the top' },
  { name: 'Super-Achiever', min_points: 901, badge_icon: '🏆', description: 'Completed the full program!' },
]

export default function AdminAchievementsEditor({ programId, initialLevels }: { programId: string; initialLevels: AchievementLevel[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [levels, setLevels] = useState<AchievementLevel[]>(initialLevels)
  const [loading, setLoading] = useState(false)

  async function seedDefaults() {
    setLoading(true)
    for (const d of DEFAULTS) {
      await supabase.from('achievement_levels').insert({ ...d, program_id: programId })
    }
    toast.success('Default levels added!')
    router.refresh()
    setLoading(false)
  }

  async function deleteLevel(id: string) {
    const { error } = await supabase.from('achievement_levels').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { setLevels(l => l.filter(x => x.id !== id)); toast.success('Deleted') }
  }

  if (levels.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-xl p-5 text-center">
        <p className="text-sm text-slate-400 mb-3">No achievement levels yet</p>
        <button onClick={seedDefaults} disabled={loading}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60">
          <Plus className="w-4 h-4" />
          {loading ? 'Adding…' : 'Add Default Levels (Rookie → Super-Achiever)'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {levels.map(l => (
        <div key={l.id} className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 min-w-[140px]">
          <span className="text-2xl">{l.badge_icon}</span>
          <div>
            <div className="font-semibold text-sm text-slate-900">{l.name}</div>
            <div className="text-xs text-slate-400">{l.min_points}+ pts</div>
          </div>
          <button onClick={() => deleteLevel(l.id)} className="ml-auto text-slate-300 hover:text-red-400 transition">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
