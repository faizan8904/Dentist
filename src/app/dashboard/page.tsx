'use server'


import { headers } from 'next/headers'
import { getProfile } from '@/actions/profile'
import ProfileForm from '@/components/ProfileForm'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const headersList = headers()
  const userId = (await headersList).get('x-user-id')
  
  if (!userId) {
    redirect('/login')
  }

  const user = await getProfile(userId)
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <ProfileForm user={user} />
    </div>
  )
}