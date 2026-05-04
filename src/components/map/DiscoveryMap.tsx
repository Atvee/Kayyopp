"use client"

import Link from "next/link"
import { CalendarCheck, MapPin, Navigation, ShieldCheck, Star } from "lucide-react"
import type { Artisan } from "@/lib/demo-data"

export default function DiscoveryMap({
  artisans,
  selectedId,
  onSelect,
}: {
  artisans: Artisan[]
  selectedId?: string
  onSelect: (artisan: Artisan) => void
}) {
  const selected = artisans.find((artisan) => artisan.id === selectedId) || artisans[0]

  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-0 map-grid bg-[#edf7f4]" />
      <div className="absolute inset-0 opacity-80">
        <svg viewBox="0 0 700 760" className="h-full w-full" role="img" aria-label="Stylized Kerala discovery map">
          <path
            d="M409 43C360 96 337 139 347 178c12 46 69 61 75 108 6 46-43 82-38 130 5 47 57 73 53 119-3 40-45 61-59 101-19 55 16 94-7 126-27 37-106 24-155-14-71-56-66-151-39-231 21-63 59-110 70-180 12-76-13-123 15-181 25-52 80-84 147-113Z"
            fill="#dff3ec"
            stroke="#0f766e"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M300 89c-5 62 23 95 40 135 26 62-19 114-2 172 15 53 61 75 49 131-12 54-69 74-71 129"
            fill="none"
            stroke="#0f766e"
            strokeWidth="3"
            strokeDasharray="10 12"
            opacity="0.55"
          />
          <path
            d="M164 516c95-19 157-10 231 36"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="3"
            strokeDasharray="8 11"
            opacity="0.5"
          />
        </svg>
      </div>

      {artisans.map((artisan) => {
        const isSelected = artisan.id === selected?.id
        return (
          <button
            key={artisan.id}
            onClick={() => onSelect(artisan)}
            className={`absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 bg-white shadow-lg transition ${
              isSelected ? "border-[#b91c1c] text-[#b91c1c] scale-110" : "border-[#0f766e] text-[#0f766e] hover:scale-105"
            }`}
            style={{ left: `${artisan.coordinates.x}%`, top: `${artisan.coordinates.y}%` }}
            aria-label={`Select ${artisan.name}`}
          >
            <MapPin className="size-5 fill-current text-current" />
          </button>
        )
      })}

      <div className="absolute left-4 top-4 z-20 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-600">
          <span className="size-2 rounded-full bg-emerald-500" />
          {artisans.filter((artisan) => artisan.availability.presentToday).length} active today
        </div>
      </div>

      {selected && (
        <div className="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur md:left-auto md:w-[360px]">
          <div className="flex gap-3">
            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-slate-950">{selected.name}</h3>
                {selected.verified && <ShieldCheck className="size-4 text-[#0f766e]" />}
              </div>
              <p className="mt-1 text-sm font-bold text-slate-600">{selected.craft}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5 fill-[#ca8a04] text-[#ca8a04]" />
                  {selected.rating}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarCheck className="size-3.5 text-[#b91c1c]" />
                  {selected.availability.nextSlot}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selected.coordinates.lat},${selected.coordinates.lng}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Navigation className="size-4" />
              Directions
            </a>
            <Link
              href={`/artisans/${selected.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0f766e] text-sm font-bold text-white transition hover:bg-[#115e59]"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
