'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function loginWithPhone(formData: FormData) {
  const supabase = await createClient()
  const phone = formData.get('phone') as string
  
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone,
    options: {
      shouldCreateUser: true,
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function loginWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  return { url: data.url }
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createClient()

  const phone = formData.get('phone') as string
  const token = formData.get('token') as string

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/onboarding')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

type ProfileUpdate = {
  full_name?: string
  phone_number?: string
  role?: 'artisan' | 'customer' | 'admin'
  avatar_url?: string
  bio?: string
  is_onboarded?: boolean
}

export async function updateProfile(data: ProfileUpdate) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
}
