'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { FlaskConical, CheckCircle2 } from 'lucide-react'
import type { Experiment } from '@/lib/types'

interface Props {
  experiment: Experiment
  userId: string
  programId: string
  studyDayId: string
  isComplete: boolean
}

export default function ExperimentCard({ experiment, userId, programId, studyDayId, isComplete: initial }: Props) {
  const [done, setDone] = useState(initial)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function markComplete() {
    if (done) return
    setLoading(true)
    const { data: existing } = await supabase
      .from('user_progress')
      .select('total_points')
      .eq('user_id', userId)
      .eq('study_day_id', studyDayId)
      .single()

    const currentPts = existing?.total_points ?? 0
    const { error } = await supabase.from('user_progress').upsert({
      user_id: userId,
      program_id: programId,
      study_day_id: studyDayId,
      experiment_completed: true,
      experiment_completed_at: new Date().toISOString(),
      experiment_bonus_points: experiment.bonus_points,
      total_points: currentPts + experiment.bonus_points,
    }, { onConflict: 'user_id,study_day_id' })

    if (error) {
      toast.error('Error saving experiment')
    } else {
      setDone(true)
      toast.success(`Experiment complete! +${experiment.bonus_points} bonus pts 🧪🎉`)
    }
    setLoading(false)
  }

  return (
    <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-amber-600" />
          <h2 className="font-bold text-slate-900">Hands-on Experiment</h2>
          <span className="text-xs font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full">
            +{experiment.bonus_points} BONUS pts
          </span>
        </div>
        {done && <CheckCircle2 className="w-5 h-5 text-green-500" />}
      </div>

      <h3 className="font-semibold text-slate-800 mb-1">{experiment.title}</h3>
      {experiment.description && <p className="text-sm text-slate-600 mb-3">{experiment.description}</p>}

      <button
        onClick={() => setOpen(o => !o)}
        className="text-sm text-amber-700 font-medium hover:underline mb-3"
      >
        {open ? 'Hide instructions ↑' : 'Show instructions ↓'}
      </button>

      {open && (
        <div className="space-y-4 mb-4">
          {experiment.materials.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Materials needed</h4>
              <ul className="space-y-1">
                {experiment.materials.map((m, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{m}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {experiment.steps.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Steps</h4>
              <ol className="space-y-2">
                {experiment.steps.map((s, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {experiment.safety_notes && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              ⚠️ <strong>Safety Note:</strong> {experiment.safety_notes}
            </div>
          )}
        </div>
      )}

      {!done ? (
        <button
          onClick={markComplete}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition disabled:opacity-60"
        >
          {loading ? 'Saving…' : `Mark Experiment Complete (+${experiment.bonus_points} pts)`}
        </button>
      ) : (
        <div className="text-sm font-semibold text-green-700">✅ You completed this experiment and earned bonus points!</div>
      )}
    </section>
  )
}
