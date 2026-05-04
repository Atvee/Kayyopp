"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, CreditCard, IndianRupee, PackageCheck, QrCode, Send } from "lucide-react"
import { formatCurrency, type Product } from "@/lib/demo-data"

type Order = {
  productId: string
  productTitle: string
  method: "UPI" | "Card"
  name: string
  contact: string
  quantity: number
  total: number
  createdAt: string
}

export function CheckoutPanel({ product }: { product: Product }) {
  const [method, setMethod] = useState<"UPI" | "Card">("UPI")
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const raw = window.localStorage.getItem("kayyopp:last-order")
      if (raw) {
        const saved = JSON.parse(raw) as Order
        if (saved.productId === product.id) setOrder(saved)
      }
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [product.id])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextOrder: Order = {
      productId: product.id,
      productTitle: product.title,
      method,
      name,
      contact,
      quantity,
      total: product.price * quantity,
      createdAt: new Date().toISOString(),
    }
    window.localStorage.setItem("kayyopp:last-order", JSON.stringify(nextOrder))
    setOrder(nextOrder)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <PackageCheck className="size-5 text-[#0f766e]" />
        <h2 className="text-lg font-black text-slate-950">Direct Artisan Checkout</h2>
      </div>
      <p className="mt-1 text-sm text-slate-600">A payment-ready flow for direct sales without middlemen.</p>

      {order ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-emerald-800">
            <CheckCircle2 className="size-4" />
            Order request saved
          </div>
          <p className="mt-2 text-sm text-emerald-900">
            {order.quantity} x {order.productTitle} via {order.method}, total {formatCurrency(order.total)}.
          </p>
          <button
            onClick={() => setOrder(null)}
            className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm"
          >
            Create another request
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(["UPI", "Card"] as const).map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setMethod(item)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-black transition ${
                  method === item
                    ? "border-[#0f766e] bg-[#0f766e]/10 text-[#0f766e]"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item === "UPI" ? <QrCode className="size-4" /> : <CreditCard className="size-4" />}
                {item}
              </button>
            ))}
          </div>

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
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</span>
            <input
              type="number"
              min={1}
              max={Math.max(product.stock, 1)}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
            />
          </label>

          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center justify-between text-sm font-bold text-slate-600">
              <span>Payable to artisan</span>
              <span className="text-xl font-black text-slate-950">{formatCurrency(product.price * quantity)}</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">{product.leadTime}. Demo payment is simulated locally.</p>
          </div>

          <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#b91c1c] text-sm font-bold text-white transition hover:bg-[#991b1b]">
            <IndianRupee className="size-4" />
            Confirm {method} Request
            <Send className="size-4" />
          </button>
        </form>
      )}
    </section>
  )
}
