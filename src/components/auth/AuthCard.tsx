'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export function AuthCard({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-3xl font-black text-slate-950">{title}</h1>
          {subtitle && <p className="text-sm font-medium leading-6 text-slate-600">{subtitle}</p>}
        </div>
        {children}
      </Card>
      <div className="mt-6 text-center text-xs font-black uppercase tracking-wide text-slate-400">
        KAYYOPP · Made in Kerala
      </div>
    </motion.div>
  )
}
