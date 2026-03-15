"use client"

import { Zap, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "전기차 보조금" },
  { href: "/hydrogen", label: "수소차 보조금" },
  { href: "/ev-comparison", label: "전기차 비교" },
  { href: "/board", label: "게시판" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="p-1.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
            <Zap className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black tracking-tighter text-emerald-600">전기차 보조금</span>
            <span className="text-[10px] font-bold text-emerald-600/70 tracking-tight">EV SUBSIDY CALCULATOR</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-emerald-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="ml-2 rounded-xl bg-emerald-600 text-white px-5 py-2 text-sm font-bold shadow-lg hover:scale-105 hover:bg-emerald-700 transition-all"
          >
            보조금 계산하기
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-bold text-foreground hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-emerald-600 text-white px-5 py-3 text-sm font-bold text-center hover:bg-emerald-700 transition-colors"
            >
              보조금 계산하기
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
