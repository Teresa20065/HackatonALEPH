"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { WalletConnect } from "@/components/web3/wallet-connect"
import { Logo } from "@/components/ui/logo"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useSession, signIn } from "next-auth/react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Logo size="lg" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#how-it-works" className="transition-colors hover:text-primary">
            How it Works
          </Link>
          <Link href="#organizations" className="transition-colors hover:text-primary">
            Organizations
          </Link>

          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <WalletConnect />
          {session ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Button variant="default" size="sm" onClick={() => signIn()}>
              Get Started
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container py-4 space-y-3">
            <Link
              href="#how-it-works"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="#organizations"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Organizations
            </Link>

            <Link
              href="/about"
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
