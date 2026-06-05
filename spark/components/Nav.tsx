'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, LogOut, LayoutDashboard, BookOpen, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NavProps {
  isAdmin?: boolean
  userEmail?: string
}

export default function Nav({ isAdmin, userEmail }: NavProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 sticky top-0 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center shadow">
            <Zap className="w-4 h-4 text-indigo-900" />
          </div>
          SparkApp
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/courses" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-indigo-100 hover:bg-white/20 transition">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-indigo-100 hover:bg-white/20 transition">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-yellow-300 hover:bg-white/20 transition">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-indigo-100 hover:bg-white/20 transition ml-1"
            title={userEmail}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
