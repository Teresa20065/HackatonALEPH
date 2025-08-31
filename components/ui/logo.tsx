import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <Link href="/" className={cn("flex items-center space-x-3", className)}>
      <div className={cn("flex items-center justify-center", sizeClasses[size])}>
        <img 
          src="/logo.png" 
          alt="Suma Logo" 
          className={cn("rounded-lg", sizeClasses[size])}
        />
      </div>
      {showText && (
        <span className={cn("font-bold font-montserrat", textSizes[size])}>
          Suma
        </span>
      )}
    </Link>
  )
}
