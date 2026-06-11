import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import EnrollButton from './EnrollButton'
import { MapPin, GraduationCap, BookOpen, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react'
import type { StudyDay } from '@/lib/types'

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/courses/' + courseId)

  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()

  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('id', courseId)
    .single()

  if (!program) notFound()
  if (!program.is_published && !profile?.is_admin) notFound()

  const { data: days } = await supabase
    .from('study_days')
    .select('id,day_number,week_number,title,topic')
    .eq('program_id', courseId)
    .order('day_number')

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('program_id', courseId)
    .single()

  const { data: levels } = await supabase
    .from('achievement_levels')
    .select('*')
    .eq('program_id', courseId)
    .order('min_points')

  const isEnrolled = !!enrollment

  // Group days by week
  const weeks: Record<number, StudyDay[]> = {}
  for (const day of (days ?? []) as StudyDay[]) {
    if (!weeks[day.week_number]) weeks[day.week_number] = []
    weeks[day.week_number].push(day)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav isAdmin={profile?.is_admin} userEmail={user.email} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-medium bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />{program.grade}
            </span>
            <span className="text-xs font-medium bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />{program.subject}
            </span>
            <span className="text-xs font-medium bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />{program.county}, {program.state}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
          {program.description && <p className="text-indigo-100 text-base max-w-2xl">{program.description}</p>}
          {program.district && <p className="text-indigo-200 text-sm mt-1">{program.district}</p>}
          <div className="flex items-center gap-4 mt-6">
            <EnrollButton courseId={courseId} isEnrolled={isEnrolled} userId={user.id} />
            {isEnrolled && (
              <Link href={`/courses/${courseId}/plan`}
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition text-sm">
                <Calendar className="w-4 h-4" />
                Go to Study Plan
              </Link>
            )}
            {program.source_url && (
              <a href={program.source_url} target="_blank" rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white text-sm flex items-center gap-1 transition">
                Source plan <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 py-10 space-y-10">
        {/* What you'll earn */}
        {levels && levels.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Achievement Levels</h2>
            <div className="flex flex-wrap gap-3">
              {levels.map((level: { id: string; badge_icon: string; name: string; min_points: number; description?: string }) => (
                <div key={level.id} className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center min-w-[110px]">
                  <div className="text-2xl mb-1">{level.badge_icon}</div>
                  <div className="font-semibold text-sm text-slate-900">{level.name}</div>
                  <div className="text-xs text-slate-400">{level.min_points}+ pts</div>
                  {level.description && <div className="text-xs text-slate-500 mt-1">{level.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 30-Day plan overview */}
        {Object.keys(weeks).length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">30-Day Plan Overview</h2>
            <div className="space-y-6">
              {Object.entries(weeks).map(([weekNum, weekDays]) => (
                <div key={weekNum}>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Week {weekNum}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {weekDays.map(day => (
                      <div key={day.id} className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 flex items-start gap-2.5">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center">
                          {day.day_number}
                        </span>
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-slate-900 truncate">{day.title}</div>
                          <div className="text-xs text-slate-400 truncate">{day.topic}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How it works */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '📖', title: 'Read the Lesson', desc: 'Each day covers a focused topic with key concepts and learning objectives. Mark it complete to earn 5 points.' },
              { icon: '✅', title: 'Take the Quiz', desc: 'Multiple choice, single choice, and true/false questions test your understanding. Earn up to 50 points per day.' },
              { icon: '📈', title: 'Track Progress', desc: 'Follow your 30-day plan, complete daily lessons, and monitor your growth with clear milestones.' },
            ].map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
