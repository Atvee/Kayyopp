"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CalendarCheck, MapPin, Search, ShieldCheck, Star } from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { AssistantSearch } from "@/components/AssistantSearch"
import DiscoveryMap from "@/components/map/DiscoveryMap"
import { artisans, craftCategories, pilotLocations, type Artisan } from "@/lib/demo-data"

export default function DiscoverPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [location, setLocation] = useState("All")
  const [presentOnly, setPresentOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [selected, setSelected] = useState<Artisan>(artisans[0])

  const filteredArtisans = useMemo(() => {
    const q = query.trim().toLowerCase()
    return artisans.filter((artisan) => {
      const text = [artisan.name, artisan.craft, artisan.area, artisan.district, artisan.cluster, artisan.bio].join(" ").toLowerCase()
      if (q && !text.includes(q)) return false
      if (category !== "All" && artisan.craft !== category) return false
      if (location !== "All" && artisan.area !== location) return false
      if (presentOnly && !artisan.availability.presentToday) return false
      if (verifiedOnly && !artisan.verified) return false
      return true
    })
  }, [category, location, presentOnly, query, verifiedOnly])

  const visibleArtisans = filteredArtisans.length ? filteredArtisans : artisans

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#0f766e]">
                <MapPin className="size-3.5" />
                Map discovery
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Find artisans by craft, place, and availability</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Explore Kovalam, Fort Kochi, Aranmula, Alappuzha, and nearby craft clusters by craft, trust, and availability.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
              {filteredArtisans.length} matching artisans
            </div>
          </div>
        </header>

        <section className="mt-4 grid gap-4 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search artisan, craft, place"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
                />
              </label>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e]"
                >
                  <option>All</option>
                  {craftCategories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <select
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e]"
                >
                  <option>All</option>
                  {pilotLocations.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mt-3 grid gap-2">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-bold text-slate-700">
                  <input type="checkbox" checked={presentOnly} onChange={(event) => setPresentOnly(event.target.checked)} />
                  Present today
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-bold text-slate-700">
                  <input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} />
                  QR verified
                </label>
              </div>
            </div>

            <div className="space-y-3">
              {filteredArtisans.map((artisan) => (
                <button
                  key={artisan.id}
                  onClick={() => setSelected(artisan)}
                  className={`w-full rounded-lg border p-3 text-left shadow-sm transition ${
                    selected.id === artisan.id ? "border-[#0f766e] bg-white" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate font-black text-slate-950">{artisan.name}</h2>
                        {artisan.verified && <ShieldCheck className="size-4 shrink-0 text-[#0f766e]" />}
                      </div>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#b91c1c]">{artisan.craft}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {artisan.area}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3.5 fill-[#ca8a04] text-[#ca8a04]" />
                          {artisan.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-4">
            <DiscoveryMap artisans={visibleArtisans} selectedId={selected.id} onSelect={setSelected} />

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-950">{selected.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{selected.craft} in {selected.area}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarCheck className="size-3.5 text-[#b91c1c]" />
                      {selected.availability.nextSlot}
                    </span>
                    <span>Smart Score {selected.smartScore.total}/100</span>
                  </div>
                </div>
                <Link
                  href={`/artisans/${selected.slug}`}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-4 text-sm font-bold text-white transition hover:bg-[#115e59]"
                >
                  Open Profile
                </Link>
              </div>
            </div>

            <AssistantSearch initialQuery="verified artisans near Kovalam" />
          </div>
        </section>
      </main>
    </div>
  )
}
