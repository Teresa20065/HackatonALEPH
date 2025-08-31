import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Web3Provider } from "@/components/providers/web3-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "Suma - Sustainable Donations Platform",
  description:
    "Donate to environmental causes while keeping your principal intact. Only the interest goes to verified organizations.",
  generator: "Suma",
  keywords: ["donations", "sustainable", "environment", "web3", "defi", "sustainability"],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Suma - Sustainable Donations Platform",
    description: "Donate to environmental causes while keeping your principal intact. Only the interest goes to verified organizations.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${montserrat.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider>
            <AuthProvider>
              <Web3Provider>{children}</Web3Provider>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
