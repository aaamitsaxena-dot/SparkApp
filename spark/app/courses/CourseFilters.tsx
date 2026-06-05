'use client'

export default function CourseFilters({
  states, counties, grades, subjects,
  current,
}: {
  states: string[]
  counties: string[]
  grades: string[]
  subjects: string[]
  current: Record<string, string>
}) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const form = e.currentTarget.closest('form') as HTMLFormElement
    form?.submit()
  }

  return (
    <form method="GET" className="flex flex-wrap gap-3 mb-8">
      {[
        { label: 'State', name: 'state', options: states },
        { label: 'County', name: 'county', options: counties },
        { label: 'Grade', name: 'grade', options: grades },
        { label: 'Subject', name: 'subject', options: subjects },
      ].map(f => (
        <select
          key={f.name}
          name={f.name}
          defaultValue={current[f.name] ?? ''}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All {f.label}s</option>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ))}
      {Object.values(current).some(Boolean) && (
        <a href="/courses" className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white hover:bg-slate-50 text-slate-600">
          Clear filters
        </a>
      )}
    </form>
  )
}
