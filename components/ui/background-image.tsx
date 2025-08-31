"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface BackgroundImageProps {
  src: string
  alt: string
  opacity?: number
  className?: string
  children: React.ReactNode
}

export function BackgroundImage({ 
  src, 
  alt, 
  opacity = 0.05, 
  className,
  children 
}: BackgroundImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
        <div 
          className="absolute inset-0 bg-background/80" 
          style={{ opacity: 1 - opacity }}
        />
      </div>
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
