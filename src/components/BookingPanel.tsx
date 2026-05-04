"use client"

import { useEffect, useState } from "react"
import { CalendarDays, CheckCircle2, MessageSquare, Send } from "lucide-react"
import { getBookingSlotsForArtisan, type Artisan } from "@/lib/demo-data"

type Booking = {
  artisanId: string
  artisanName: string
  slotId: string
  slotLabel: string
  name: string
  contact: string
  message: string
  createdAt: string
}

export function BookingPanel({ artisan }: { artisan: Artisan }) {
  const slots = getBookingSlotsForArtisan(artisan.id)
  const [slotId, setSlotId] = useState(slots[0]?.id || "")
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")
  const [confirmed, setConfirmed] = useState<Booking | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const raw = window.localStorage.getItem("kayyopp:last-booking")
      if (raw) {
        const booking = JSON.parse(raw) as Booking
        if (booking.artisanId === artisan.id) setConfirmed(booking)
      }
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [artisan.id])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const slot = slots.find((item) => item.id === slotId)
    if (!slot) return
    const booking: Booking = {
      artisanId: artisan.id,
      artisanName: artisan.name,
      slotId: slot.id,
      slotLabel: slot.label,
      name,
      contact,
      message,
      createdAt: new Date().toISOString(),
    }
    window.localStorage.setItem("kayyopp:last-booking", JSON.stringify(booking))
    setConfirmed(booking)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <CalendarDays className="size-5 text-[#0f766e]" />
        <h2 className="text-lg font-black text-slate-950">Book a Visit</h2>
      </div>
      <p className="mt-1 text-sm text-slate-600">Send a simple request to meet the artisan at their stall or workshop.</p>

      {confirmed ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-emerald-800">
            <CheckCircle2 className="size-4" />
            Booking request saved
          </div>
          <p className="mt-2 text-sm text-emerald-900">
            {confirmed.name || "Visitor"} requested <strong>{confirmed.slotLabel}</strong>. The demo stores this locally and can
            be wired to SMS/WhatsApp later.
          </p>
          <button
            onClick={() => setConfirmed(null)}
            className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm"
          >
            Make another request
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slot</span>
            <select
              value={slotId}
              onChange={(event) => setSlotId(event.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
            >
              {slots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.label} ({slot.seats} seats)
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Phone or email</span>
              <input
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
                className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Message</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              placeholder="I would like to see the carving process and discuss a custom piece."
              className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
            />
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={`https://wa.me/${artisan.contact.whatsapp.replace(/\D/g, "")}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageSquare className="size-4" />
              WhatsApp
            </a>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0f766e] text-sm font-bold text-white transition hover:bg-[#115e59]">
              <Send className="size-4" />
              Request Visit
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
