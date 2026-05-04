'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const role = formData.get('role') as string
  
  if (!['artisan', 'customer'].includes(role)) {
    return { error: 'Invalid role' }
  }

  // Update profile with role and onboarding flag
  const { error } = await supabase
    .from('profiles')
    .update({
      role,
      is_onboarded: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Onboarding error:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  
  // Redirect based on role
  if (role === 'artisan') {
    redirect('/dashboard')
  } else {
    redirect('/marketplace')
  }
}
