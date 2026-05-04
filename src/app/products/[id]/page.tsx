import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Hammer, Package, ShieldCheck, ShoppingBag, Star, WandSparkles } from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { CheckoutPanel } from "@/components/CheckoutPanel"
import { SmartScore } from "@/components/SmartScore"
import { QrCard } from "@/components/verification/QrCard"
import { formatCurrency, getArtisanById, getProductById, getProductsForArtisan, products } from "@/lib/demo-data"

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const artisan = getArtisanById(product.artisanId)
  if (!artisan) notFound()

  const related = getProductsForArtisan(artisan.id).filter((item) => item.id !== product.id)

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <section className="grid gap-4 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/10] bg-slate-100">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#b91c1c]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#b91c1c]">
                    {product.category}
                  </span>
                  {product.verifiedMaterial && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#0f766e]">
                      <ShieldCheck className="size-3.5" />
                      Material verified
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">{product.title}</h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{product.description}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <ShoppingBag className="size-4 text-[#b91c1c]" />
                    <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-500">Price</p>
                    <p className="font-black text-slate-950">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <Package className="size-4 text-[#b91c1c]" />
                    <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-500">Stock</p>
                    <p className="font-black text-slate-950">{product.stock}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <Clock className="size-4 text-[#b91c1c]" />
                    <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-500">Lead time</p>
                    <p className="font-black text-slate-950">{product.leadTime}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <WandSparkles className="size-4 text-[#b91c1c]" />
                    <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-500">Custom</p>
                    <p className="font-black text-slate-950">{product.customOrder ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-slate-950">Artisan Provenance</h2>
              <Link
                href={`/artisans/${artisan.slug}`}
                className="mt-4 grid gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-[#0f766e] sm:grid-cols-[120px_1fr]"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                  <img src={artisan.image} alt={artisan.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-slate-950">{artisan.name}</h3>
                    {artisan.verified && <ShieldCheck className="size-5 text-[#0f766e]" />}
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#b91c1c]">{artisan.craft}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{artisan.bio}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                    <Star className="size-4 fill-[#ca8a04] text-[#ca8a04]" />
                    {artisan.rating} from {artisan.reviewCount} reviews
                  </div>
                </div>
              </Link>
            </section>

            {related.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">More from {artisan.name}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      href={`/products/${item.id}`}
                      key={item.id}
                      className="grid grid-cols-[90px_1fr] gap-3 rounded-lg border border-slate-200 p-3 transition hover:border-[#b91c1c]"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#b91c1c]">{item.category}</p>
                        <h3 className="mt-1 font-black text-slate-950">{item.title}</h3>
                        <p className="mt-2 text-sm font-black text-slate-900">{formatCurrency(item.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <CheckoutPanel product={product} />
            <SmartScore score={artisan.smartScore} compact />
            <QrCard artisan={artisan} />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                <Hammer className="size-4 text-[#0f766e]" />
                Custom Order Brief
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This listing accepts design notes, reference photos, preferred dimensions, and delivery timing. The request is
                captured at checkout and can be routed to WhatsApp or a backend queue.
              </p>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}
