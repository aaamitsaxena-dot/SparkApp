'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { CheckCircle2, Circle } from 'lucide-react'

interface Props {
  userId: string
  programId: string
  studyDayId: string
  isComplete: boolean
}

export default function MarkLessonComplete({ userId, programId, studyDayId, isComplete: initial }: Props) {
  const [done, setDone] = useState(initial)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleMark() {
    if (done) return
    setLoading(true)
    const { error } = await supabase.from('user_progress').upsert({
      user_id: userId,
      program_id: programId,
      study_day_id: studyDayId,
      is_lesson_complete: true,
      lesson_completed_at: new Date().toISOString(),
      total_points: 5,
    }, { onConflict: 'user_id,study_day_id' })

    if (error) {
      toast.error('Error saving progress')
    } else {
      setDone(true)
      toast.success('Lesson marked complete! +5 pts 🎉')
    }
    setLoading(false)
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${done ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
      {done ? (
        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
      ) : (
        <Circle className="w-6 h-6 text-slate-300 shrink-0" />
      )}
      <div className="flex-1">
        <div className="font-semibold text-sm text-slate-900">
          {done ? 'Lesson Completed!' : 'Mark Lesson as Complete'}
        </div>
        <div className="text-xs text-slate-500">
          {done ? 'You earned +5 points for this lesson' : 'Complete the reading and resources above, then mark done to earn 5 points'}
        </div>
      </div>
      {!done && (
        <button
          onClick={handleMark}
          disabled={loading}
          className="shrink-0 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Mark Complete (+5 pts)'}
        </button>
      )}
    </div>
  )
}
