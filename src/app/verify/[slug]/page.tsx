import Link from "next/link"
import { notFound } from "next/navigation"
import { BadgeCheck, CalendarCheck, Fingerprint, LockKeyhole, ShieldCheck, Star } from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { SmartScore } from "@/components/SmartScore"
import { QrCard } from "@/components/verification/QrCard"
import { artisans, getArtisanBySlug } from "@/lib/demo-data"

export function generateStaticParams() {
  return artisans.map((artisan) => ({ slug: artisan.slug }))
}

export default async function VerifyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artisan = getArtisanBySlug(slug)
  if (!artisan) notFound()

  const credentialId = `KAY-${artisan.id.toUpperCase().replace("ART-", "")}-${artisan.smartScore.total}-2026`

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-black uppercase tracking-wide text-emerald-200">
                <ShieldCheck className="size-3.5" />
                Verification record
              </span>
              <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-white">
                {artisan.verificationLevel}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight">{artisan.name}</h1>
            <p className="mt-2 text-sm font-semibold text-slate-300">{artisan.craft} · {artisan.area}, {artisan.district}</p>
          </div>

          <div className="grid gap-4 p-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <Fingerprint className="size-5 text-[#0f766e]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Artisan ID</p>
                  <p className="mt-1 text-sm font-black text-slate-950">{credentialId}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <CalendarCheck className="size-5 text-[#0f766e]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Timestamp</p>
                  <p className="mt-1 text-sm font-black text-slate-950">2026-05-04</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <LockKeyhole className="size-5 text-[#0f766e]" />
                  <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">Ledger status</p>
                  <p className="mt-1 text-sm font-black text-slate-950">{artisan.verified ? "Anchored" : "Eligible review"}</p>
                </div>
              </div>

              <SmartScore score={artisan.smartScore} />

              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-lg font-black text-slate-950">Verified Details</h2>
                <div className="mt-4 grid gap-3">
                  {[...artisan.certificates, ...artisan.awards].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                      <BadgeCheck className="size-4 text-[#0f766e]" />
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-lg font-black text-slate-950">Recent Trust Signals</h2>
                <div className="mt-4 space-y-3">
                  {artisan.reviews.map((review) => (
                    <div key={`${review.name}-${review.date}`} className="rounded-lg bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-black text-slate-950">{review.name}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-700">
                          <Star className="size-4 fill-[#ca8a04] text-[#ca8a04]" />
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <div className="overflow-hidden rounded-lg bg-slate-100">
                <img src={artisan.image} alt={artisan.name} className="h-56 w-full object-cover" />
              </div>
              <QrCard artisan={artisan} />
              <Link
                href={`/artisans/${artisan.slug}`}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0f766e] text-sm font-bold text-white transition hover:bg-[#115e59]"
              >
                Open Full Profile
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
