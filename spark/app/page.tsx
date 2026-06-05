import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Zap, BookOpen, Target, Star, ArrowRight } from 'lucide-react'
import CourseCard from '@/components/CourseCard'
import Nav from '@/components/Nav'
import type { Program } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const { data: profile } = user
    ? await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
    : { data: null }

  const { data: enrollments } = user
    ? await supabase.from('enrollments').select('program_id').eq('user_id', user.id)
    : { data: [] }

  const enrolledIds = new Set((enrollments ?? []).map((e: { program_id: string }) => e.program_id))

  return (
    <div className="flex flex-col min-h-screen">
      {user && <Nav isAdmin={profile?.is_admin} userEmail={user.email} />}

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Fast-track learning for ambitious students
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Master any course in<br className="hidden sm:block" />{' '}
            <span className="text-yellow-300">30 days</span>
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
            Structured study plans aligned to your school&apos;s curriculum — with quizzes,
            experiments, and achievement levels. Perfect for summer break or anytime you want to get ahead.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link href="/courses" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
                Browse Courses <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
                  Get started free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/auth/login" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 border-b border-violet-800">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: BookOpen, label: 'Course Programs', value: programs?.length ?? 0 },
            { icon: Target, label: 'Days Per Plan', value: 30 },
            { icon: Star, label: 'Achievement Levels', value: 5 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <Icon className="w-5 h-5 text-yellow-300 mx-auto mb-1" />
              <div className="text-3xl font-extrabold text-yellow-300">{value}</div>
              <div className="text-sm text-indigo-200 mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-indigo-900">Available Programs</h2>
          <Link href="/courses" className="text-sm text-violet-600 font-bold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {programs && programs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(programs as Program[]).slice(0, 6).map(program => (
              <CourseCard
                key={program.id}
                program={program}
                isEnrolled={enrolledIds.has(program.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-violet-300">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No courses available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Achievement preview */}
      <section className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 border-t border-orange-300 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-orange-900 mb-2">Earn Achievement Levels 🏆</h2>
          <p className="text-orange-800 mb-6 text-sm font-medium">
            Complete lessons, ace quizzes, and do experiments to earn points and climb the ranks
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: '🌱', name: 'Rookie', pts: '0+', bg: 'bg-green-100 border-green-300' },
              { icon: '🔭', name: 'Explorer', pts: '101+', bg: 'bg-blue-100 border-blue-300' },
              { icon: '⚡', name: 'Achiever', pts: '301+', bg: 'bg-indigo-100 border-indigo-300' },
              { icon: '🏅', name: 'Champion', pts: '601+', bg: 'bg-violet-100 border-violet-300' },
              { icon: '🏆', name: 'Super-Achiever', pts: '901+', bg: 'bg-yellow-100 border-yellow-400' },
            ].map(l => (
              <div key={l.name} className={`rounded-2xl border-2 ${l.bg} px-4 py-3 text-center min-w-[100px] shadow-sm`}>
                <div className="text-3xl mb-1">{l.icon}</div>
                <div className="font-extrabold text-sm text-slate-900">{l.name}</div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{l.pts} pts</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

