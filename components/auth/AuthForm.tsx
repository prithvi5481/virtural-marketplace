'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import { login, signup } from '@/store/authSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isSignup ? 'Sign Up' : 'Sign In'}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="p-0 h-auto"
          onClick={() => {
            router.push(isSignup ? '/auth/sign-in' : '/auth/sign-up')
          }}
        >
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
      </div>
    </form>
  )
}
