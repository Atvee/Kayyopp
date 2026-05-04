import Link from "next/link"
import { LayoutDashboard, Map, Search, Store } from "lucide-react"

const links = [
  { href: "/discover", label: "Discover", icon: Map },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/dashboard", label: "Artisan Desk", icon: LayoutDashboard },
]

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="KAYYOPP home">
          <span className="flex size-10 items-center justify-center rounded-lg bg-[#0f766e] text-sm font-black text-white">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight text-slate-950">KAYYOPP</span>
            <span className="hidden text-xs font-semibold text-slate-500 sm:block">Create. Connect. Sell.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/discover"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:flex"
          >
            <Search className="size-4" />
            Find Artisans
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-[#b91c1c] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#991b1b]"
          >
            Join
          </Link>
        </div>
      </div>
    </header>
  )
}
