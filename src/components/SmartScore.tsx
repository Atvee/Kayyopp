import { Award, BadgeCheck, BarChart3, Clock, Star } from "lucide-react"
import type { SmartScore as SmartScoreType } from "@/lib/demo-data"
import { scoreLabel } from "@/lib/demo-data"

const parts = [
  { key: "profile", label: "Profile", max: 25, icon: BadgeCheck },
  { key: "reviews", label: "Reviews", max: 30, icon: Star },
  { key: "activity", label: "Activity", max: 20, icon: Clock },
  { key: "certifications", label: "Credentials", max: 25, icon: Award },
] as const

export function SmartScore({ score, compact = false }: { score: SmartScoreType; compact?: boolean }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <BarChart3 className="size-4 text-[#0f766e]" />
            Smart Verification Score
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{scoreLabel(score.total)}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-slate-950">{score.total}</div>
          <div className="text-xs font-bold text-slate-500">/100</div>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${score.total}%` }} />
      </div>

      {!compact && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {parts.map((part) => {
            const value = score[part.key]
            return (
              <div key={part.key} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <part.icon className="size-3.5 text-[#b91c1c]" />
                    {part.label}
                  </div>
                  <span className="text-xs font-black text-slate-950">
                    {value}/{part.max}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-[#b91c1c]" style={{ width: `${(value / part.max) * 100}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
