'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Zap, Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-800 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-sm w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-indigo-900 mb-2">Account created!</h2>
          <p className="text-slate-600 text-sm">Your account for <strong>{email}</strong> is ready. Sign in to get started!</p>
          <Link href="/auth/login" className="mt-6 inline-block text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition">Sign in now →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-800 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-400 mb-4 shadow-lg">
            <Zap className="w-9 h-9 text-indigo-900" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">SparkApp</h1>
          <p className="text-indigo-200 mt-2 text-base">Create your student account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border-0 p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-indigo-900 mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-500 text-sm text-indigo-950 font-medium bg-indigo-50 placeholder-indigo-300"
                placeholder="Alex Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-900 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-500 text-sm text-indigo-950 font-medium bg-indigo-50 placeholder-indigo-300"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-900 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-500 text-sm text-indigo-950 font-medium bg-indigo-50 placeholder-indigo-300 pr-10"
                  placeholder="Min 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 font-medium">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm transition shadow-md disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
