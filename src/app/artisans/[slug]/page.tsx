import Link from "next/link"
import { notFound } from "next/navigation"
import { Award, CalendarDays, Globe2, Languages, MapPin, MessageSquare, ShieldCheck, ShoppingBag, Star } from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { BookingPanel } from "@/components/BookingPanel"
import { SmartScore } from "@/components/SmartScore"
import { QrCard } from "@/components/verification/QrCard"
import { artisans, formatCurrency, getArtisanBySlug, getProductsForArtisan } from "@/lib/demo-data"

export function generateStaticParams() {
  return artisans.map((artisan) => ({ slug: artisan.slug }))
}

export default async function ArtisanProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artisan = getArtisanBySlug(slug)
  if (!artisan) notFound()

  const artisanProducts = getProductsForArtisan(artisan.id)

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="min-h-[340px] bg-slate-100">
              <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {artisan.verified && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#0f766e]">
                    <ShieldCheck className="size-3.5" />
                    {artisan.verificationLevel}
                  </span>
                )}
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black uppercase tracking-wide text-slate-600">
                  Smart Score {artisan.smartScore.total}/100
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">{artisan.name}</h1>
              <p className="mt-2 text-lg font-bold text-[#b91c1c]">{artisan.craft}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{artisan.bio}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <MapPin className="size-4 text-[#0f766e]" />
                    {artisan.cluster}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{artisan.area}, {artisan.district}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CalendarDays className="size-4 text-[#0f766e]" />
                    {artisan.availability.nextSlot}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{artisan.availability.hours}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Languages className="size-4 text-[#0f766e]" />
                    {artisan.languages.join(", ")}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{artisan.yearsOfPractice} years of practice</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Star className="size-4 fill-[#ca8a04] text-[#ca8a04]" />
                    {artisan.rating} from {artisan.reviewCount} reviews
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{artisan.availability.presentToday ? "Present today" : "Next available soon"}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${artisan.contact.whatsapp.replace(/\D/g, "")}`}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0f766e] px-4 text-sm font-bold text-white transition hover:bg-[#115e59]"
                >
                  <MessageSquare className="size-4" />
                  Message
                </a>
                <Link
                  href={`/verify/${artisan.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ShieldCheck className="size-4" />
                  Verify QR
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Craft Story</h2>
              <p className="mt-3 leading-7 text-slate-600">{artisan.story}</p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Portfolio</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {artisan.portfolio.map((image, index) => (
                  <div key={image} className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                    <img src={image} alt={`${artisan.name} portfolio ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-950">Products and Experiences</h2>
                <ShoppingBag className="size-5 text-[#b91c1c]" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {artisanProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="grid grid-cols-[96px_1fr] gap-3 rounded-lg border border-slate-200 p-3 transition hover:border-[#b91c1c]"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-[#b91c1c]">{product.category}</p>
                      <h3 className="mt-1 font-black text-slate-950">{product.title}</h3>
                      <p className="mt-2 text-sm font-black text-slate-900">{formatCurrency(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Credentials</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[...artisan.certificates, ...artisan.awards].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <Award className="size-4 text-[#ca8a04]" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Visitor Reviews</h2>
              <div className="mt-4 space-y-3">
                {artisan.reviews.map((review) => (
                  <div key={`${review.name}-${review.date}`} className="rounded-lg bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-black text-slate-950">{review.name}</h3>
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
            <SmartScore score={artisan.smartScore} />
            <BookingPanel artisan={artisan} />
            <QrCard artisan={artisan} />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                <Globe2 className="size-4 text-[#0f766e]" />
                Public Profile Link
              </div>
              <p className="mt-2 break-all rounded-lg bg-slate-50 p-3 text-xs font-mono text-slate-600">
                /artisans/{artisan.slug}
              </p>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}
