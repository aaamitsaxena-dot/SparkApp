import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/Nav'
import CourseCard from '@/components/CourseCard'
import CourseFilters from './CourseFilters'
import type { Program } from '@/lib/types'

const PAGE_SIZE = 20

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; county?: string; grade?: string; subject?: string; page?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const page = Math.max(1, parseInt(params.page ?? '1', 10))

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
    : { data: null }

  let query = supabase.from('programs').select('*', { count: 'exact' }).eq('is_published', true)
  if (params.state) query = query.eq('state', params.state)
  if (params.county) query = query.eq('county', params.county)
  if (params.grade) query = query.eq('grade', params.grade)
  if (params.subject) query = query.eq('subject', params.subject)
  const { data: programs, count } = await query
    .order('grade').order('name')
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)

  const { data: enrollments } = user
    ? await supabase.from('enrollments').select('program_id').eq('user_id', user.id)
    : { data: [] }
  const enrolledIds = new Set((enrollments ?? []).map((e: { program_id: string }) => e.program_id))

  // Distinct filter values
  const { data: allPrograms } = await supabase.from('programs').select('state,county,grade,subject').eq('is_published', true)
  const states = [...new Set((allPrograms ?? []).map((p: { state: string }) => p.state))].sort()
  const counties = [...new Set((allPrograms ?? []).map((p: { county: string }) => p.county))].sort()
  const grades = [...new Set((allPrograms ?? []).map((p: { grade: string }) => p.grade))].sort()
  const subjects = [...new Set((allPrograms ?? []).map((p: { subject: string }) => p.subject))].sort()

  // Build URL helper preserving filters
  function pageUrl(p: number) {
    const q = new URLSearchParams()
    if (params.state) q.set('state', params.state)
    if (params.county) q.set('county', params.county)
    if (params.grade) q.set('grade', params.grade)
    if (params.subject) q.set('subject', params.subject)
    if (p > 1) q.set('page', String(p))
    const qs = q.toString()
    return `/courses${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Nav isAdmin={profile?.is_admin} userEmail={user.email} />}
      <div className="max-w-6xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">Browse Courses</h1>
        <p className="text-violet-500 font-medium mb-6">30-day fast-track programs aligned to school curricula</p>

        {/* Filters */}
        <CourseFilters
          states={states}
          counties={counties}
          grades={grades}
          subjects={subjects}
          current={{
            state: params.state ?? '',
            county: params.county ?? '',
            grade: params.grade ?? '',
            subject: params.subject ?? '',
          }}
        />

        {programs && programs.length > 0 ? (
          <>
            <p className="text-xs text-violet-400 font-medium mb-4">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, count ?? 0)} of {count ?? 0} program{(count ?? 0) !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {(programs as Program[]).map(program => (
                <CourseCard key={program.id} program={program} isEnrolled={enrolledIds.has(program.id)} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <a
                  href={pageUrl(page - 1)}
                  aria-disabled={page === 1}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition ${
                    page === 1
                      ? 'border-violet-100 text-violet-300 pointer-events-none'
                      : 'border-violet-300 text-violet-700 hover:bg-violet-100'
                  }`}
                >
                  ← Prev
                </a>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <a
                    key={p}
                    href={pageUrl(p)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold border-2 transition ${
                      p === page
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow'
                        : 'border-violet-200 text-violet-700 hover:bg-violet-100'
                    }`}
                  >
                    {p}
                  </a>
                ))}

                <a
                  href={pageUrl(page + 1)}
                  aria-disabled={page === totalPages}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition ${
                    page === totalPages
                      ? 'border-violet-100 text-violet-300 pointer-events-none'
                      : 'border-violet-300 text-violet-700 hover:bg-violet-100'
                  }`}
                >
                  Next →
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-violet-300">
            <p className="font-medium">No programs match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
