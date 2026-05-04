"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Bot, CalendarCheck, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react"
import { assistantSearch, craftCategories, formatCurrency, getProductsForArtisan, type Artisan } from "@/lib/demo-data"

const prompts = [
  "wood carvers near Kovalam available today",
  "verified bell metal artisan",
  "mural workshop near Fort Kochi this weekend",
]

export function AssistantSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery || prompts[0])

  const results = useMemo(() => assistantSearch(submittedQuery), [submittedQuery])

  function submit(nextQuery = query) {
    const clean = nextQuery.trim()
    if (!clean) return
    setQuery(clean)
    setSubmittedQuery(clean)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0f766e]">
          <Bot className="size-4" />
          Tourist AI Discovery
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Ask naturally, the way a visitor would. This demo uses local matching so it works offline.
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submit()
              }}
              placeholder="Show me Kasavu weavers near Kovalam available this weekend"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
            />
          </label>
          <button
            onClick={() => submit()}
            className="h-11 rounded-lg bg-[#0f766e] px-4 text-sm font-bold text-white transition hover:bg-[#115e59]"
          >
            Search
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => submit(prompt)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#0f766e] hover:text-[#0f766e]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3">
          {results.length === 0 ? (
            <div className="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-500">
              No direct match yet. Try a craft such as {craftCategories.slice(0, 3).join(", ")}.
            </div>
          ) : (
            results.slice(0, 4).map((artisan: Artisan) => {
              const firstProduct = getProductsForArtisan(artisan.id)[0]
              return (
                <Link
                  href={`/artisans/${artisan.slug}`}
                  key={artisan.id}
                  className="grid gap-3 rounded-lg border border-slate-200 p-3 transition hover:border-[#0f766e] hover:bg-slate-50 sm:grid-cols-[88px_1fr]"
                >
                  <div className="h-24 overflow-hidden rounded-lg bg-slate-100 sm:h-full">
                    <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-slate-950">{artisan.name}</h3>
                      {artisan.verified && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#0f766e]/10 px-2 py-1 text-[11px] font-black text-[#0f766e]">
                          <ShieldCheck className="size-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{artisan.craft}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-[#b91c1c]" />
                        {artisan.area}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarCheck className="size-3.5 text-[#b91c1c]" />
                        {artisan.availability.nextSlot}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="size-3.5 text-[#b91c1c]" />
                        From {formatCurrency(firstProduct?.price || 0)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
