import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  IndianRupee,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { AssistantSearch } from "@/components/AssistantSearch"
import { SmartScore } from "@/components/SmartScore"
import { artisans, formatCurrency, getProductsForArtisan, platformPillars, products } from "@/lib/demo-data"

const stats = [
  { label: "Pilot artisans", value: artisans.length.toString(), icon: Users },
  { label: "Bookable visits", value: "5", icon: CalendarCheck },
  { label: "Direct listings", value: products.length.toString(), icon: PackageCheck },
  { label: "Verified profiles", value: artisans.filter((artisan) => artisan.verified).length.toString(), icon: ShieldCheck },
]

export default function Home() {
  const featuredArtisans = artisans.slice(0, 3)
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#0f766e]">
                    KAYYOPP pilot
                  </span>
                  <span className="rounded-md bg-[#b91c1c]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#b91c1c]">
                    Kerala artisan discovery
                  </span>
                </div>
                <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Create, connect, and sell through one verified artisan identity.
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                  Structured profiles, location discovery, bookings, direct commerce, AI assistance, and Smart
                  Verification Scores for Kerala craft communities.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/discover"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0f766e] px-4 text-sm font-bold text-white transition hover:bg-[#115e59]"
                  >
                    Open Discovery
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Artisan Workspace
                  </Link>
                </div>
              </div>

              <AssistantSearch />
            </div>

            <aside className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <stat.icon className="size-5 text-[#0f766e]" />
                      <span className="text-2xl font-black text-slate-950">{stat.value}</span>
                    </div>
                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[16/10] bg-slate-100">
                  <img
                    src="/images/hero-workshop.svg"
                    alt="Kerala craft tools and handmade objects"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                    <Sparkles className="size-4 text-[#b91c1c]" />
                    Physical stalls, digital identity
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    QR profiles bridge the artisan stall with verified portfolios, direct enquiries, and tourist reviews.
                  </p>
                </div>
              </div>

              <SmartScore score={artisans[0].smartScore} compact />
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Featured Artisans</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">Profiles include story, score, availability, products, and QR proof.</p>
            </div>
            <Link href="/discover" className="text-sm font-black text-[#0f766e] hover:underline">
              View map
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {featuredArtisans.map((artisan) => {
              const firstProduct = getProductsForArtisan(artisan.id)[0]
              return (
                <Link
                  href={`/artisans/${artisan.slug}`}
                  key={artisan.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[#0f766e]"
                >
                  <div className="aspect-[16/10] bg-slate-100">
                    <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-950">{artisan.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-slate-600">{artisan.craft}</p>
                      </div>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">
                        {artisan.smartScore.total}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-[#b91c1c]" />
                        {artisan.area}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3.5 fill-[#ca8a04] text-[#ca8a04]" />
                        {artisan.rating} ({artisan.reviewCount})
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="size-3.5 text-[#b91c1c]" />
                        From {formatCurrency(firstProduct.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {platformPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xl font-black text-slate-950">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Direct Sales</h2>
              <p className="mt-1 text-sm font-medium text-slate-600">Product listings support orders, custom requests, and provenance checks.</p>
            </div>
            <Link href="/marketplace" className="text-sm font-black text-[#0f766e] hover:underline">
              Open marketplace
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => {
              const artisan = artisans.find((item) => item.id === product.artisanId)!
              return (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[#b91c1c]"
                >
                  <div className="aspect-square bg-slate-100">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-wide text-[#b91c1c]">{product.category}</p>
                    <h3 className="mt-1 font-black text-slate-950">{product.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{artisan.name}</p>
                    <p className="mt-3 text-xl font-black text-slate-950">{formatCurrency(product.price)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
