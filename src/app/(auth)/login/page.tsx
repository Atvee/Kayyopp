"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, MapPin, Phone, ShieldCheck, Store, User } from "lucide-react"
import { AuthCard } from "@/components/auth/AuthCard"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("9876543210")
  const [role, setRole] = useState<"artisan" | "tourist">("artisan")

  function continueDemo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.localStorage.setItem("kayyopp:demo-session", JSON.stringify({ phone, role, createdAt: new Date().toISOString() }))
    router.push(role === "artisan" ? "/dashboard" : "/discover")
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-2 text-sm font-black text-[#0f766e]">
        <span className="flex size-9 items-center justify-center rounded-lg bg-[#0f766e] text-white">K</span>
        KAYYOPP
      </Link>

      <AuthCard title="Start Demo Session" subtitle="Mobile OTP-ready entry without external auth requirements">
        <form onSubmit={continueDemo} className="space-y-4">
          <label className="block">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Phone number</span>
            <div className="mt-1 flex h-11 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 focus-within:border-[#0f766e] focus-within:ring-4 focus-within:ring-[#0f766e]/10">
              <Phone className="size-4 text-slate-400" />
              <span className="ml-2 border-r border-slate-200 pr-2 text-sm font-bold text-slate-500">+91</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="ml-2 min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
              />
            </div>
          </label>

          <div>
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Role</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("artisan")}
                className={`rounded-lg border p-4 text-left transition ${
                  role === "artisan" ? "border-[#0f766e] bg-[#0f766e]/10" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <Store className="size-5 text-[#0f766e]" />
                <p className="mt-2 font-black text-slate-950">Artisan</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Manage profile and listings</p>
              </button>
              <button
                type="button"
                onClick={() => setRole("tourist")}
                className={`rounded-lg border p-4 text-left transition ${
                  role === "tourist" ? "border-[#b91c1c] bg-[#b91c1c]/10" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <User className="size-5 text-[#b91c1c]" />
                <p className="mt-2 font-black text-slate-950">Tourist</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Discover, book, and buy</p>
              </button>
            </div>
          </div>

          <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0f766e] text-sm font-bold text-white transition hover:bg-[#115e59]">
            Continue
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href="/discover"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <MapPin className="size-4" />
            Browse first
          </Link>
          <Link
            href="/verify/narayanan-wood-studio"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ShieldCheck className="size-4" />
            Verify QR
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
