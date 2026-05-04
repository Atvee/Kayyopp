"use client"

import { useEffect, useMemo, useState } from "react"
import QRCode from "qrcode"
import { Copy, QrCode as QrCodeIcon, ShieldCheck } from "lucide-react"
import type { Artisan } from "@/lib/demo-data"

export function QrCard({ artisan }: { artisan: Artisan }) {
  const [qr, setQr] = useState("")
  const [copied, setCopied] = useState(false)
  const relativeUrl = useMemo(() => `/verify/${artisan.slug}`, [artisan.slug])
  const [verificationUrl, setVerificationUrl] = useState(relativeUrl)

  useEffect(() => {
    setVerificationUrl(`${window.location.origin}${relativeUrl}`)
  }, [relativeUrl])

  useEffect(() => {
    setQr("")
    QRCode.toDataURL(verificationUrl, {
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      margin: 1,
      width: 320,
    }).then(setQr)
  }, [verificationUrl])

  async function copy() {
    await navigator.clipboard.writeText(verificationUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <QrCodeIcon className="size-5 text-[#0f766e]" />
          <h2 className="text-lg font-black text-slate-950">Stall QR Verification</h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-[#0f766e]/10 px-2 py-1 text-xs font-black text-[#0f766e]">
          <ShieldCheck className="size-3.5" />
          {artisan.verificationLevel}
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr]">
        <div className="flex min-h-44 items-center justify-center rounded-lg bg-slate-50 p-3">
          {qr ? <img src={qr} alt={`QR code for ${artisan.name}`} className="size-36" /> : <div className="size-36 bg-white" />}
        </div>
        <div>
          <p className="text-sm text-slate-600">
            Print this at the physical stall. Tourists can scan it to verify the artisan profile, portfolio, credentials,
            reviews, and contact options.
          </p>
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs font-mono text-slate-600 break-all">{verificationUrl}</div>
          <button
            onClick={copy}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Copy className="size-4" />
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>
    </section>
  )
}
