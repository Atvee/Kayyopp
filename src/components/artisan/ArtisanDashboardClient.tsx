"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Bot,
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  PackagePlus,
  QrCode,
  Save,
  ShieldCheck,
  Sparkles,
  Store,
  WandSparkles,
} from "lucide-react"
import { AppNav } from "@/components/AppNav"
import { SmartScore } from "@/components/SmartScore"
import { QrCard } from "@/components/verification/QrCard"
import { artisans, craftCategories, formatCurrency, getProductsForArtisan, type Product } from "@/lib/demo-data"

type ProfileDraft = {
  name: string
  craft: string
  location: string
  experience: string
  materials: string
  language: string
  generatedBio: string
}

const defaultArtisan = artisans[0]
const defaultDraft: ProfileDraft = {
  name: defaultArtisan.name,
  craft: defaultArtisan.craft,
  location: defaultArtisan.area,
  experience: defaultArtisan.yearsOfPractice.toString(),
  materials: "Nilambur teak, hand tools, natural polish",
  language: "English",
  generatedBio: defaultArtisan.bio,
}

function parsePrice(text: string) {
  const match = text.match(/(?:rs|rupees|₹)?\s*(\d{3,6})/i)
  return match ? Number(match[1]) : 2500
}

function inferCategory(text: string) {
  const lower = text.toLowerCase()
  return craftCategories.find((category) => lower.includes(category.toLowerCase().split(" ")[0])) || "Wood carving"
}

export default function ArtisanDashboardClient() {
  const [draft, setDraft] = useState<ProfileDraft>(defaultDraft)
  const [saved, setSaved] = useState(false)
  const [listingPrompt, setListingPrompt] = useState("Hand-carved wooden elephant, made from teak, price 5400 rupees")
  const [dashboardProducts, setDashboardProducts] = useState<Product[]>(getProductsForArtisan(defaultArtisan.id))
  const [availability, setAvailability] = useState(defaultArtisan.availability.days)
  const [presentToday, setPresentToday] = useState(defaultArtisan.availability.presentToday)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const rawDraft = window.localStorage.getItem("kayyopp:profile-draft")
      const rawProducts = window.localStorage.getItem("kayyopp:dashboard-products")
      if (rawDraft) setDraft(JSON.parse(rawDraft) as ProfileDraft)
      if (rawProducts) setDashboardProducts(JSON.parse(rawProducts) as Product[])
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [])

  const simulatedScore = useMemo(() => {
    const profile = draft.generatedBio.length > 80 && draft.materials ? 25 : 19
    const activity = availability.length >= 4 && presentToday ? 20 : 15
    const certifications = defaultArtisan.certificates.length > 1 ? 22 : 15
    const reviews = defaultArtisan.smartScore.reviews
    return {
      profile,
      reviews,
      activity,
      certifications,
      total: profile + reviews + activity + certifications,
    }
  }, [availability.length, draft.generatedBio.length, draft.materials, presentToday])

  function generateBio() {
    const bio = `${draft.name} is a ${draft.craft.toLowerCase()} artisan in ${draft.location} with ${draft.experience} years of practice. The work uses ${draft.materials}, and each piece is documented with portfolio photos, availability, and direct visitor contact through KAYYOPP.`
    setDraft((current) => ({ ...current, generatedBio: bio }))
  }

  function saveProfile() {
    window.localStorage.setItem("kayyopp:profile-draft", JSON.stringify(draft))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1500)
  }

  function createListing() {
    const category = inferCategory(listingPrompt)
    const price = parsePrice(listingPrompt)
    const nextProduct: Product = {
      id: `local-${Date.now()}`,
      artisanId: defaultArtisan.id,
      title: listingPrompt.split(",")[0]?.trim() || "New craft listing",
      description: `AI listing draft: ${listingPrompt}. Includes material notes, artisan story, and direct order support.`,
      price,
      category,
      image: defaultArtisan.portfolio[0],
      images: [defaultArtisan.portfolio[0]],
      tags: ["ai-draft", category.toLowerCase().replace(/\s+/g, "-")],
      stock: 1,
      leadTime: "Confirm with artisan",
      customOrder: true,
      verifiedMaterial: true,
    }
    const next = [nextProduct, ...dashboardProducts]
    setDashboardProducts(next)
    window.localStorage.setItem("kayyopp:dashboard-products", JSON.stringify(next))
  }

  function toggleDay(day: string) {
    setAvailability((current) => (current.includes(day) ? current.filter((item) => item !== day) : [...current, day]))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black uppercase tracking-wide text-[#0f766e]">
                <Store className="size-3.5" />
                Artisan workspace
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Create and maintain a digital craft identity</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                A low-friction workspace for profile creation, availability, listings, QR proof, and trust signals.
              </p>
            </div>
            <Link
              href={`/artisans/${defaultArtisan.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0f766e] px-4 text-sm font-bold text-white transition hover:bg-[#115e59]"
            >
              View Public Profile
            </Link>
          </div>
        </header>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-[#0f766e]" />
                <h2 className="text-xl font-black text-slate-950">AI-Assisted Profile Builder</h2>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["name", "Name"],
                  ["craft", "Craft"],
                  ["location", "Location"],
                  ["experience", "Years of practice"],
                  ["materials", "Materials and techniques"],
                  ["language", "Preferred language"],
                ].map(([key, label]) => (
                  <label key={key} className={key === "materials" ? "sm:col-span-2" : ""}>
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</span>
                    <input
                      value={draft[key as keyof ProfileDraft]}
                      onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
                      className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <Sparkles className="size-4 text-[#b91c1c]" />
                  Generated profile story
                </div>
                <textarea
                  value={draft.generatedBio}
                  onChange={(event) => setDraft((current) => ({ ...current, generatedBio: event.target.value }))}
                  rows={4}
                  className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700 outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={generateBio}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0f766e] px-3 text-sm font-bold text-white transition hover:bg-[#115e59]"
                  >
                    <WandSparkles className="size-4" />
                    Generate
                  </button>
                  <button
                    onClick={saveProfile}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Save className="size-4" />
                    {saved ? "Saved" : "Save Draft"}
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-5 text-[#0f766e]" />
                <h2 className="text-xl font-black text-slate-950">Availability Calendar</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`h-10 rounded-lg px-3 text-sm font-black transition ${
                      availability.includes(day)
                        ? "bg-[#0f766e] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <label className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={presentToday} onChange={(event) => setPresentToday(event.target.checked)} />
                Present at stall today
              </label>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <PackagePlus className="size-5 text-[#b91c1c]" />
                <h2 className="text-xl font-black text-slate-950">AI Product Listing</h2>
              </div>
              <textarea
                value={listingPrompt}
                onChange={(event) => setListingPrompt(event.target.value)}
                rows={3}
                className="mt-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700 outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              />
              <button
                onClick={createListing}
                className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-[#b91c1c] px-3 text-sm font-bold text-white transition hover:bg-[#991b1b]"
              >
                <PackagePlus className="size-4" />
                Create Listing Draft
              </button>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {dashboardProducts.map((product) => (
                  <div key={product.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-[#b91c1c]">{product.category}</p>
                    <h3 className="mt-1 font-black text-slate-950">{product.title}</h3>
                    <p className="mt-2 text-sm font-black text-slate-900">{formatCurrency(product.price)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <ImagePlus className="size-5 text-[#0f766e]" />
                <h2 className="text-xl font-black text-slate-950">Portfolio Quality Signals</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-emerald-50 p-4">
                  <CheckCircle2 className="size-5 text-emerald-700" />
                  <p className="mt-3 text-sm font-black text-emerald-900">No duplicate profile found</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4">
                  <CheckCircle2 className="size-5 text-emerald-700" />
                  <p className="mt-3 text-sm font-black text-emerald-900">Portfolio specificity high</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <AlertTriangle className="size-5 text-amber-700" />
                  <p className="mt-3 text-sm font-black text-amber-900">Add certificate photo for Phase 2</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <SmartScore score={simulatedScore} />
            <QrCard artisan={defaultArtisan} />
            <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                <ShieldCheck className="size-4 text-[#0f766e]" />
                Verification Readiness
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Profiles above 90 can apply for blockchain credential review with identity proof, craft certificate, and review history.
              </p>
              <Link
                href={`/verify/${defaultArtisan.slug}`}
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <QrCode className="size-4" />
                Open Verification Page
              </Link>
            </section>
          </aside>
        </section>
      </main>
    </div>
  )
}
