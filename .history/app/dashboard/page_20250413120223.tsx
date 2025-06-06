import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard! You are authenticated.</p>
    </div>
  )
} 