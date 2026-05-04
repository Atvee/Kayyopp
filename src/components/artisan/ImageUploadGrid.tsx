'use client'

import { useState } from 'react'
import { Camera, X, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadProductImage } from '@/lib/actions/images'

export function ImageUploadGrid({ onImagesChange }: { onImagesChange: (urls: string[]) => void }) {
  const [images, setImages] = useState<{ id: string, url: string, isProcessing: boolean }[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  const updateImages = (nextImages: { id: string, url: string, isProcessing: boolean }[]) => {
    setImages(nextImages)
    onImagesChange(nextImages.map((img) => img.url))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    setUploadError(null)

    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      isProcessing: true,
      file: file
    }))

    updateImages([...images, ...newImages] as Array<{ id: string, url: string, isProcessing: boolean }>)

    // Upload each file to Supabase and update with public URL
    for (const img of newImages) {
      try {
        const publicUrl = await uploadProductImage(img.file)
        setImages(prev => prev.map(p => 
          p.id === img.id ? { ...p, url: publicUrl, isProcessing: false } : p
        ))
      } catch (error) {
        console.error('Upload failed:', error)
        setUploadError('Failed to upload image. Please try again.')
        setImages(prev => prev.filter(p => p.id !== img.id))
      }
    }
  }

  const removeImage = (id: string) => {
    updateImages(images.filter(img => img.id !== id))
  }

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
          {uploadError}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            key={img.id} 
            className="aspect-square relative rounded-3xl overflow-hidden group border-2 border-secondary/5"
          >
            <img src={img.url} alt="Product" className="w-full h-full object-cover" />
            
            <AnimatePresence>
              {img.isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-secondary/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center"
                >
                  <Loader2 className="w-6 h-6 text-white animate-spin mb-2" />
                  <p className="text-[10px] text-white font-bold uppercase tracking-tighter">AI Enhancing...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!img.isProcessing && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-accent/90 text-[8px] font-bold text-white flex items-center gap-1">
                <Sparkles className="w-2 h-2" />
                ENHANCED
              </div>
            )}

            <button 
              onClick={() => removeImage(img.id)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        ))}

        <label className="aspect-square rounded-3xl border-2 border-dashed border-secondary/10 hover:border-primary/30 transition-all cursor-pointer flex flex-col items-center justify-center p-4 text-center gap-2 group">
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
            <Camera className="w-5 h-5 text-secondary/40 group-hover:text-primary/60" />
          </div>
          <span className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest leading-tight">Add Photos</span>
        </label>
      </div>
    </div>
  )
}
