'use server'

/**
 * AI Content Engine - LLM Wrapper
 * Extracts structured product data from unstructured transcripts.
 */

export async function parseListingIntent(transcript: string) {
  // Simulate LLM processing time
  await new Promise(resolve => setTimeout(resolve, 1500))

  // In production, this would be an OpenAI / Anthropic call
  // For the "Keralakala" experience, we simulate extracting Malayalam-voiced intent
  
  const transcriptLower = transcript.toLowerCase()

  // Simple heuristic parsing for the demo
  let category = 'Handicrafts'
  if (transcriptLower.includes('ആന') || transcriptLower.includes('elephant')) category = 'Wooden Crafts'
  if (transcriptLower.includes('കുട') || transcriptLower.includes('umbrella')) category = 'Traditional'

  let price = 0
  const priceMatch = transcript.match(/(\d+)\s*(രൂപ|rupees|rs)/i)
  if (priceMatch) {
    price = parseInt(priceMatch[1])
  } else {
    price = 1500 // Suggested base price if not mentioned
  }

  // Generate a premium description based on the transcript
  const generatedDescription = `This exquisite piece of ${category} is hand-crafted by master artisans in Kerala. ${transcript.length > 50 ? transcript : 'Reflecting centuries of tradition, it uses locally sourced materials and traditional carving techniques.'}`

  return {
    title: transcript.slice(0, 30) + '...', // Mock title extraction
    description: generatedDescription,
    price: price,
    category: category,
    tags: ['made-in-kerala', 'authentic', category.toLowerCase().replace(' ', '-')],
    suggestedPriceRange: { min: price * 0.9, max: price * 1.2 }
  }
}
