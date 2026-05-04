'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoiceButtonProps {
  isRecording: boolean
  isLoading?: boolean
  onStart: () => void
  onStop: () => void
  className?: string
}

export function VoiceButton({ isRecording, isLoading, onStart, onStop, className }: VoiceButtonProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary rounded-full"
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={isRecording ? onStop : onStart}
        disabled={isLoading}
        className={cn(
          "relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90",
          isRecording 
            ? "bg-destructive text-white" 
            : "bg-primary text-white hover:bg-primary/90",
          isLoading && "bg-muted text-muted-foreground"
        )}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : isRecording ? (
          <Square className="w-8 h-8 fill-current" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </button>

      {isRecording && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-10 whitespace-nowrap text-secondary font-bold text-sm tracking-wide"
        >
          Listening...
        </motion.p>
      )}
    </div>
  )
}
