"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Zap, Heart } from "lucide-react"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"

export function HeroSection() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,145,178,0.05)_25%,rgba(8,145,178,0.05)_50%,transparent_50%,transparent_75%,rgba(8,145,178,0.05)_75%)] bg-[length:60px_60px]" />

      <div className="container relative mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Floating Icons */}
          <div className="relative mb-8">
            <div className="absolute -top-4 left-1/4 animate-bounce">
              <div className="rounded-full bg-primary/10 p-3">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="absolute -top-2 right-1/4 animate-bounce delay-300">
              <div className="rounded-full bg-secondary/10 p-3">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="absolute top-4 left-1/3 animate-bounce delay-700">
              <div className="rounded-full bg-accent/10 p-2">
                <Heart className="h-4 w-4 text-accent" />
              </div>
            </div>
          </div>

          <h1 className="text-balance font-montserrat text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Donate{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sustainably
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Keep your capital, donate the interest. Support verified environmental organizations while your principal
            remains intact and grows through sustainable DeFi protocols.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {session ? (
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" onClick={() => signIn()} className="group">
                Start Donating
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">$2.4M+</div>
              <div className="text-sm text-muted-foreground">Total Donated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">15+</div>
              <div className="text-sm text-muted-foreground">Verified Organizations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">8.5%</div>
              <div className="text-sm text-muted-foreground">Average APY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
