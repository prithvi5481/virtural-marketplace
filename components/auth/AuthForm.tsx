'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import { login, signup } from '@/store/authSlice'

export default function AuthForm() {
  const pathname = usePathname()
  const isSignup = pathname === '/auth/sign-up'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignup) {
        await dispatch(signup({ name, email, password })).unwrap()
      } else {
        await dispatch(login({ email, password })).unwrap()
      }
      router.push('/spaces')
    } catch (err: any) {
      setError(err?.message || (isSignup ? 'Signup failed.' : 'Login failed. Please check your credentials.'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-error-light dark:text-error-dark">{error}</div>}
      {isSignup && (
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border-border-light dark:border-border-dark"
          required
        />
      </div>
      <button type="submit" className="w-full bg-primary-light dark:bg-primary-dark text-white py-2 rounded hover:bg-accent-light dark:hover:bg-accent-dark hover:cursor-pointer">
        {isSignup ? 'Sign Up' : 'Sign In'}
      </button>
      <div className="text-center">
        <button
          type="button"
          className="text-accent-light dark:text-accent-dark hover:underline bg-transparent border-none outline-none cursor-pointer"
          onClick={() => {
            router.push(isSignup ? '/auth/sign-in' : '/auth/sign-up')
          }}
        >
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </form>
  )
}
