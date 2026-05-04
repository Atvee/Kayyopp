'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import QRCode from 'qrcode'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const productData = {
    artisan_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    category: formData.get('category') as string,
    tags: (formData.get('tags') as string).split(','),
    image_urls: (formData.get('imageUrls') as string).split(','),
    created_at: new Date().toISOString()
  }

  const { data: product, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  return product
}

export async function generateProductQR(productId: string) {
  // Generate a URL for the specific product listing page
  const url = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products/${productId}`
  
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      color: {
        dark: '#C14B3A', // Primary Keralakala color
        light: '#FAFAF8' // Background color
      },
      width: 400,
      margin: 2
    })
    return qrDataUrl
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getArtisanProducts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('artisan_id', user.id)
    .order('created_at', { ascending: false })

  return products || []
}

export async function getAllProducts() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      profiles (
        full_name
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return products || []
}
