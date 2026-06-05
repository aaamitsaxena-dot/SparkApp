'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'

interface EnrollButtonProps {
  courseId: string
  isEnrolled: boolean
  userId: string
}

export default function EnrollButton({ courseId, isEnrolled: initialEnrolled, userId }: EnrollButtonProps) {
  const [enrolled, setEnrolled] = useState(initialEnrolled)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleEnroll() {
    setLoading(true)
    const { error } = await supabase.from('enrollments').insert({ user_id: userId, program_id: courseId })
    if (error) {
      toast.error('Could not enroll: ' + error.message)
    } else {
      setEnrolled(true)
      toast.success('Enrolled! Your 30-day plan is ready.')
      router.push(`/courses/${courseId}/plan`)
    }
    setLoading(false)
  }

  if (enrolled) {
    return (
      <div className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
        <BookmarkCheck className="w-4 h-4" />
        Enrolled
      </div>
    )
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition text-sm disabled:opacity-60"
    >
      <BookmarkPlus className="w-4 h-4" />
      {loading ? 'Enrolling…' : 'Enroll Now — Free'}
    </button>
  )
}
