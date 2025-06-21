import LoginForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Virtual Co-Working</h1>
        <LoginForm />
      </div>
    </div>
  )
}