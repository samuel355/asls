import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to ASLS</h1>
      <p>Please sign in to access your dashboard.</p>
    </div>
  )
}
