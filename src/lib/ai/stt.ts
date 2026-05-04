'use server'

/**
 * Speech-to-Text Service Wrapper
 * Optimized for Malayalam transcriptions.
 * In production, this would call a Supabase Edge Function 
 * that utilizes OpenAI Whisper or Google Speech-to-Text.
 */
export async function transcribeAudio(audioBlob: Blob) {
  void audioBlob
  // Simulate network delay for production feel
  await new Promise(resolve => setTimeout(resolve, 2000))

  // For development/demonstration, we return a mock transcript
  // In a real scenario, this would be the output of an Edge Function
  const mockTranscripts = [
    "ഞാൻ തടിയിൽ കൊത്തിയ ആനയെ വിൽക്കാൻ ആഗ്രഹിക്കുന്നു. ഇതിന്റെ വില അയ്യായിരം രൂപയാണ്. വെട്ടുകല്ലിൽ തീർത്ത കലാരൂപമാണിത്.",
    "This is a hand-carved wooden elephant from Nilambur teak. Price is 5000 rupees. Very high quality.",
    "എനിക്ക് ഒരു ആനയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യണം."
  ]

  // Simulate picking a relevant transcript for demo
  return {
    transcript: mockTranscripts[0],
    language: 'ml-IN',
    confidence: 0.98
  }
}
