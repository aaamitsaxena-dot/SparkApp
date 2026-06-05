import Link from 'next/link'
import { MapPin, GraduationCap, BookOpen, ArrowRight } from 'lucide-react'
import type { Program } from '@/lib/types'

interface CourseCardProps {
  program: Program
  enrollmentCount?: number
  userProgress?: number // 0-100
  isEnrolled?: boolean
}

export default function CourseCard({ program, userProgress, isEnrolled }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${program.id}`}
      className="group bg-white rounded-2xl border-2 border-violet-100 hover:border-violet-400 hover:shadow-lg transition-all overflow-hidden flex flex-col"
    >
      <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 h-2" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-indigo-100 text-indigo-800 rounded-full px-2.5 py-0.5">
              <GraduationCap className="w-3 h-3" />{program.grade}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-violet-100 text-violet-800 rounded-full px-2.5 py-0.5">
              <BookOpen className="w-3 h-3" />{program.subject}
            </span>
          </div>
          {isEnrolled && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full px-2.5 py-0.5 shrink-0">✓ Enrolled</span>
          )}
        </div>

        <h3 className="font-extrabold text-indigo-900 text-base mb-1 group-hover:text-violet-700 transition-colors leading-snug">
          {program.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-violet-500 font-medium mb-3">
          <MapPin className="w-3 h-3" />
          {program.county}, {program.state}
        </div>

        {program.description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">{program.description}</p>
        )}

        {isEnrolled && typeof userProgress === 'number' && (
          <div className="mt-auto mb-3">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-indigo-600">Progress</span><span className="text-violet-600">{userProgress}%</span>
            </div>
            <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all" style={{ width: `${userProgress}%` }} />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-violet-400">30-day plan</span>
          <ArrowRight className="w-4 h-4 text-violet-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
