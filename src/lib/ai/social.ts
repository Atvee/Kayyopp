'use server'

/**
 * Social Engine - Story & Caption Generator
 * Turns product details into viral-ready social content.
 */

type SocialProductData = {
  title: string
  price: number
  category: string
  tags: string[]
}

export async function generateSocialContent(productData: SocialProductData) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  const { title, price, category, tags } = productData

  const captions = [
    `✨ Discover the soul of Kerala! Our new ${title} is hand-crafted with love in the backwaters. Authentic ${category} piece starting at ₹${price}. #Keralakala #MadeInKerala #ArtisanMade`,
    `Bringing Keralan tradition to your home. 🌿 Check out our latest ${category} - ${title}. Support local artisans. Click the link in bio to shop! #KeralaCrafts #SupportLocal`,
    `Hand-made. Heart-made. Heritage-made. ❤️ Introducing the ${title}. Every piece tells a story of Kerala's heritage. ✨ #KeralaStories #ArtisanPride`
  ]

  const stories = [
    "A journey through Nilambur's teak forests to your home.",
    "Crafted using techniques passed down for 5 generations.",
    "Sustainable, authentic, and uniquely yours."
  ]

  return {
    captions,
    hashtags: ['#Keralakala', '#KeralaArt', '#HandmadeHeritage', ...tags.map((t: string) => `#${t.replace('-', '')}`)],
    storyNarratives: stories,
    suggestedMusic: 'Traditional Kerala Fusion / Instrumental'
  }
}
