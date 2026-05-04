"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Filter, IndianRupee, MapPin, Search, ShieldCheck, ShoppingBag, SlidersHorizontal, Star } from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { craftCategories, formatCurrency, pilotLocations, type Artisan, type Product } from "@/lib/demo-data"

type ProductWithArtisan = Product & { artisan: Artisan }

export default function MarketplaceClient({ initialProducts }: { initialProducts: ProductWithArtisan[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [location, setLocation] = useState("All")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [customOnly, setCustomOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return initialProducts.filter((product) => {
      const text = [product.title, product.description, product.category, product.tags.join(" "), product.artisan.name, product.artisan.area]
        .join(" ")
        .toLowerCase()
      if (q && !text.includes(q)) return false
      if (category !== "All" && product.category !== category) return false
      if (location !== "All" && product.artisan.area !== location) return false
      if (verifiedOnly && !product.artisan.verified) return false
      if (customOnly && !product.customOrder) return false
      return true
    })
  }, [category, customOnly, initialProducts, location, query, verifiedOnly])

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-[#b91c1c]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#b91c1c]">
                <ShoppingBag className="size-3.5" />
                Direct artisan sales
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Marketplace</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Product-first listings connected to artisan identity, QR verification, booking, and custom order flows.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
              {filteredProducts.length} of {initialProducts.length} listings shown
            </div>
          </div>
        </header>

        <section className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
            <div className="flex items-center gap-2 text-sm font-black text-slate-950">
              <SlidersHorizontal className="size-4 text-[#0f766e]" />
              Filters
            </div>

            <label className="relative mt-4 block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search crafts"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Craft</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              >
                <option>All</option>
                {craftCategories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Location</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              >
                <option>All</option>
                {pilotLocations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} />
                Verified artisan only
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={customOnly} onChange={(event) => setCustomOnly(event.target.checked)} />
                Accepts custom orders
              </label>
            </div>
          </aside>

          <div>
            {filteredProducts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
                <Filter className="mx-auto size-8 text-slate-400" />
                <p className="mt-3 text-sm font-bold text-slate-500">No listings match the selected filters.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[#b91c1c]"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
                      {product.artisan.verified && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[11px] font-black text-[#0f766e] shadow-sm">
                          <ShieldCheck className="size-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-[#b91c1c]">{product.category}</p>
                      <h2 className="mt-1 text-lg font-black text-slate-950">{product.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5 text-[#b91c1c]" />
                          {product.artisan.area}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3.5 fill-[#ca8a04] text-[#ca8a04]" />
                          {product.artisan.rating}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-xs font-bold text-slate-500">{product.artisan.name}</p>
                          <p className="text-xl font-black text-slate-950">{formatCurrency(product.price)}</p>
                        </div>
                        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-[#b91c1c] text-white">
                          <IndianRupee className="size-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
