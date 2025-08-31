"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Trees, Users, Droplets, Zap, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useSession, signIn } from "next-auth/react"
import { useAccount } from "wagmi"
import { DonationFlow } from "@/components/web3/donation-flow"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

// Tipos extendidos para la página de detalle
interface Goal {
  id: string
  title: string
  description: string
  coverImage?: string
  targetAmount: number
  currentAmount: number
  chains: ("ethereum" | "polygon" | "solana")[]
  impactMetrics?: {
    treesPlanted?: number
    carbonOffset?: number
    peopleHelped?: number
    waterSaved?: number
  }
}

interface ExtendedOrganization {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  image: string
  category: string
  fundingGoal: number
  currentFunding: number
  interestRate: number
  impactMetrics: {
    treesPlanted?: number
    carbonOffset?: number
    peopleHelped?: number
    waterSaved?: number
  }
  verified: boolean
  tags?: string[]
  goals: Goal[]
  createdAt: Date
}

// Datos mock extendidos
const mockExtendedOrganizations: ExtendedOrganization[] = [
  {
    id: "1",
    slug: "amazon-rainforest-foundation",
    name: "Amazon Rainforest Foundation",
    description: "Protecting and preserving the Amazon rainforest through sustainable practices and indigenous community support.",
    longDescription: "The Amazon Rainforest Foundation is dedicated to preserving the world's largest tropical rainforest, home to millions of species and indigenous communities. Our mission is to protect this vital ecosystem through sustainable practices, community engagement, and innovative conservation strategies. We work directly with local communities to develop sustainable livelihoods that protect the forest while providing economic opportunities. Our projects include reforestation initiatives, wildlife protection programs, and sustainable agriculture training. By investing in our foundation, you're not just supporting environmental conservation - you're helping to preserve a global treasure that affects climate patterns worldwide and sustains countless species and human communities.",
    image: "/amazon-rainforest-conservation.png",
    category: "Forest Conservation",
    fundingGoal: 500000,
    currentFunding: 342000,
    interestRate: 0.08,
    impactMetrics: {
      treesPlanted: 15000,
      carbonOffset: 2500,
      peopleHelped: 850,
    },
    verified: true,
    tags: ["Biodiversity", "Indigenous Rights", "Climate Action"],
    goals: [
      {
        id: "1",
        title: "Reforestation Initiative",
        description: "Plant 50,000 native trees in deforested areas",
        coverImage: "/amazon-rainforest-conservation.png",
        targetAmount: 200000,
        currentAmount: 150000,
        chains: ["ethereum", "polygon"],
        impactMetrics: {
          treesPlanted: 15000,
          carbonOffset: 1200,
        }
      },
      {
        id: "2",
        title: "Community Training Program",
        description: "Train 500 local farmers in sustainable agriculture",
        targetAmount: 150000,
        currentAmount: 120000,
        chains: ["ethereum", "solana"],
        impactMetrics: {
          peopleHelped: 350,
        }
      },
      {
        id: "3",
        title: "Wildlife Protection",
        description: "Establish protected corridors for endangered species",
        targetAmount: 150000,
        currentAmount: 72000,
        chains: ["polygon"],
        impactMetrics: {
          carbonOffset: 800,
        }
      }
    ],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "solar-villages-initiative",
    name: "Solar Villages Initiative",
    description: "Bringing clean solar energy to remote villages while creating local jobs and sustainable communities.",
    longDescription: "The Solar Villages Initiative is transforming rural communities by bringing clean, renewable energy to areas that have been left behind by traditional energy infrastructure. We don't just install solar panels - we build entire sustainable energy ecosystems that include local job creation, technical training, and community ownership models. Our approach ensures that communities become self-sufficient in energy production while creating economic opportunities that keep young people in their villages. We've already helped over 50 villages across three continents transition to clean energy, reducing carbon emissions by thousands of tons annually while improving quality of life for thousands of people.",
    image: "/solar-panels-village-community.png",
    category: "Renewable Energy",
    fundingGoal: 750000,
    currentFunding: 425000,
    interestRate: 0.09,
    impactMetrics: {
      peopleHelped: 1200,
      carbonOffset: 3200,
    },
    verified: true,
    tags: ["Clean Energy", "Rural Development", "Job Creation"],
    goals: [
      {
        id: "1",
        title: "Solar Microgrid Installation",
        description: "Install solar microgrids in 25 remote villages",
        targetAmount: 400000,
        currentAmount: 250000,
        chains: ["ethereum", "polygon"],
        impactMetrics: {
          peopleHelped: 800,
          carbonOffset: 2000,
        }
      },
      {
        id: "2",
        title: "Technical Training Center",
        description: "Build and staff training centers for solar technicians",
        targetAmount: 200000,
        currentAmount: 125000,
        chains: ["ethereum"],
        impactMetrics: {
          peopleHelped: 400,
        }
      },
      {
        id: "3",
        title: "Energy Storage Solutions",
        description: "Deploy battery storage systems for 24/7 power",
        targetAmount: 150000,
        currentAmount: 50000,
        chains: ["polygon", "solana"],
        impactMetrics: {
          carbonOffset: 1200,
        }
      }
    ],
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    slug: "ocean-cleanup-project",
    name: "Ocean Cleanup Project",
    description: "Removing plastic waste from oceans and developing sustainable alternatives to single-use plastics.",
    longDescription: "The Ocean Cleanup Project is tackling one of the most pressing environmental challenges of our time: ocean plastic pollution. We combine innovative technology with community action to remove existing plastic waste while preventing new pollution from entering our oceans. Our approach includes deploying advanced cleanup systems in ocean gyres, developing biodegradable alternatives to single-use plastics, and working with coastal communities to implement waste management systems. We've already removed over 100,000 tons of plastic from the ocean and prevented countless more from entering marine ecosystems. Our work not only protects marine life but also helps preserve the ocean's ability to regulate global climate and provide food security for millions of people.",
    image: "/ocean-cleanup-plastic-waste-removal.png",
    category: "Ocean Conservation",
    fundingGoal: 1000000,
    currentFunding: 680000,
    interestRate: 0.07,
    impactMetrics: {
      waterSaved: 50000,
      carbonOffset: 1800,
    },
    verified: true,
    tags: ["Marine Life", "Plastic Reduction", "Coastal Communities"],
    goals: [
      {
        id: "1",
        title: "Ocean Cleanup Systems",
        description: "Deploy 10 advanced cleanup systems in ocean gyres",
        targetAmount: 500000,
        currentAmount: 400000,
        chains: ["ethereum", "polygon"],
        impactMetrics: {
          waterSaved: 30000,
          carbonOffset: 1000,
        }
      },
      {
        id: "2",
        title: "Biodegradable Alternatives",
        description: "Develop and market sustainable packaging solutions",
        targetAmount: 300000,
        currentAmount: 200000,
        chains: ["ethereum", "solana"],
        impactMetrics: {
          carbonOffset: 500,
        }
      },
      {
        id: "3",
        title: "Community Waste Management",
        description: "Implement waste systems in 100 coastal communities",
        targetAmount: 200000,
        currentAmount: 80000,
        chains: ["polygon"],
        impactMetrics: {
          waterSaved: 20000,
          carbonOffset: 300,
        }
      }
    ],
    createdAt: new Date("2024-01-20"),
  },
]

// Función para obtener organización por slug
function getOrganizationBySlug(slug: string): ExtendedOrganization | undefined {
  return mockExtendedOrganizations.find(org => org.slug === slug)
}

// Componente GrowingTree con animación de crecimiento
function GrowingTree({ percentage, size = "default" }: { percentage: number; size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "w-12 h-12",
    default: "w-16 h-16", 
    large: "w-24 h-24"
  }

  const getTreeStage = (percentage: number) => {
    if (percentage >= 100) {
      return "bloom" // Flor completa
    } else if (percentage >= 75) {
      return "mature" // Árbol maduro
    } else if (percentage >= 50) {
      return "growing" // Árbol en crecimiento
    } else if (percentage >= 25) {
      return "sapling" // Árbol joven
    } else {
      return "seed" // Semilla
    }
  }

  const getTreeSVG = (stage: string) => {
    switch (stage) {
      case "bloom":
        return `
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Tronco -->
            <path d="M50 80 L50 60" stroke="#8b4513" stroke-width="4" fill="none"/>
            <!-- Flores principales -->
            <circle cx="50" cy="50" r="15" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
            <circle cx="35" cy="40" r="8" fill="#fbbf24"/>
            <circle cx="65" cy="40" r="8" fill="#fbbf24"/>
            <circle cx="40" cy="60" r="8" fill="#fbbf24"/>
            <circle cx="60" cy="60" r="8" fill="#fbbf24"/>
            <!-- Pétalos -->
            <path d="M50 70 Q30 50 50 30 Q70 50 50 70" fill="#22c55e"/>
            <path d="M20 50 Q40 30 60 30 Q80 50 60 70 Q40 70 20 50" fill="#22c55e"/>
            <!-- Hojas adicionales -->
            <path d="M30 45 Q45 35 50 45 Q55 35 70 45" fill="#16a34a"/>
            <path d="M25 55 Q40 65 50 55 Q60 65 75 55" fill="#16a34a"/>
          </svg>
        `
      case "mature":
        return `
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Tronco -->
            <path d="M50 80 L50 55" stroke="#8b4513" stroke-width="4" fill="none"/>
            <!-- Copa principal -->
            <circle cx="50" cy="35" r="25" fill="#22c55e"/>
            <!-- Capas de hojas -->
            <circle cx="35" cy="45" r="18" fill="#16a34a"/>
            <circle cx="65" cy="45" r="18" fill="#16a34a"/>
            <circle cx="50" cy="25" r="20" fill="#15803d"/>
            <!-- Hojas individuales -->
            <path d="M45 30 Q50 25 55 30" fill="#16a34a"/>
            <path d="M40 40 Q45 35 50 40" fill="#16a34a"/>
            <path d="M60 40 Q55 35 50 40" fill="#16a34a"/>
          </svg>
        `
      case "growing":
        return `
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Tronco -->
            <path d="M50 80 L50 60" stroke="#8b4513" stroke-width="3" fill="none"/>
            <!-- Copa en desarrollo -->
            <circle cx="50" cy="45" r="20" fill="#22c55e"/>
            <circle cx="45" cy="50" r="12" fill="#16a34a"/>
            <circle cx="55" cy="50" r="12" fill="#16a34a"/>
            <!-- Brotes -->
            <path d="M50 35 Q45 30 50 25 Q55 30 50 35" fill="#16a34a"/>
            <path d="M50 25 Q48 22 50 20 Q52 22 50 25" fill="#15803d"/>
          </svg>
        `
      case "sapling":
        return `
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Tronco delgado -->
            <path d="M50 80 L50 65" stroke="#8b4513" stroke-width="2" fill="none"/>
            <!-- Primeras hojas -->
            <path d="M50 65 Q45 60 50 55 Q55 60 50 65" fill="#22c55e"/>
            <path d="M50 55 Q48 52 50 50 Q52 52 50 55" fill="#16a34a"/>
            <!-- Brotes pequeños -->
            <circle cx="50" cy="52" r="6" fill="#15803d"/>
          </svg>
        `
      default: // seed
        return `
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Semilla -->
            <ellipse cx="50" cy="60" rx="12" ry="8" fill="#8b4513"/>
            <ellipse cx="50" cy="55" rx="8" ry="12" fill="#a0522d"/>
            <circle cx="50" cy="50" r="6" fill="#654321"/>
            <!-- Brote inicial -->
            <path d="M50 55 Q48 52 50 50 Q52 52 50 55" fill="#22c55e" opacity="0.7"/>
          </svg>
        `
    }
  }

  const stage = getTreeStage(percentage)
  const svgContent = getTreeSVG(stage)

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center relative`}>
      <div 
        className="w-full h-full transition-all duration-1000 ease-in-out"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      
      {/* Indicador de porcentaje */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="text-xs font-medium text-muted-foreground bg-white/80 px-2 py-1 rounded-full shadow-sm">
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  )
}

// Componente GoalGarden actualizado para usar GrowingTree
function GoalGarden({ percentage }: { percentage: number }) {
  return <GrowingTree percentage={percentage} size="default" />
}

// Componente GoalCard
function GoalCard({ goal, onDonate }: { goal: Goal; onDonate: (goal: Goal) => void }) {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100

  const getChainIcon = (chain: string) => {
    switch (chain) {
      case "ethereum":
        return "🔷"
      case "polygon":
        return "🟣"
      case "solana":
        return "🟡"
      default:
        return "🔷"
    }
  }

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case "treesPlanted":
        return `${value.toLocaleString()} trees`
      case "peopleHelped":
        return `${value.toLocaleString()} people`
      case "waterSaved":
        return `${value.toLocaleString()}L water`
      case "carbonOffset":
        return `${value.toLocaleString()}t CO₂`
      default:
        return value.toString()
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {goal.coverImage && (
        <div className="relative h-32">
          <Image 
            src={goal.coverImage} 
            alt={goal.title} 
            fill 
            className="object-cover" 
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">{goal.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {goal.description}
            </p>
          </div>
          <GoalGarden percentage={percentage} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(percentage)}%</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-2"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>${goal.currentAmount.toLocaleString()}</span>
            <span>${goal.targetAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Chains */}
        <div className="flex flex-wrap gap-2">
          {goal.chains.map((chain) => (
            <Badge key={chain} variant="outline" className="text-xs">
              {getChainIcon(chain)} {chain}
            </Badge>
          ))}
        </div>

        {/* Impact Metrics */}
        {goal.impactMetrics && (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(goal.impactMetrics).map(([key, value]) => {
              if (!value) return null
              const Icon = getImpactIcon(key)
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{formatMetricValue(key, value)}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Donate Button for Individual Goal */}
        <Button 
          onClick={() => onDonate(goal)} 
          className="w-full bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white"
          size="sm"
        >
          Donate to this Goal
        </Button>
      </CardContent>
    </Card>
  )
}

// Función auxiliar para obtener íconos de impacto
function getImpactIcon(metric: string) {
  switch (metric) {
    case "treesPlanted":
      return Trees
    case "peopleHelped":
      return Users
    case "waterSaved":
      return Droplets
    case "carbonOffset":
      return Zap
    default:
      return Trees
  }
}

// Función auxiliar para formatear métricas
function formatMetricValue(key: string, value: number) {
  switch (key) {
    case "treesPlanted":
      return `${value.toLocaleString()} trees`
    case "peopleHelped":
      return `${value.toLocaleString()} people`
    case "waterSaved":
      return `${value.toLocaleString()}L water`
    case "carbonOffset":
      return `${value.toLocaleString()}t CO₂`
    default:
      return value.toString()
  }
}

export default function OrganizationDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [organization, setOrganization] = useState<ExtendedOrganization | null>(null)
  const [showDonationFlow, setShowDonationFlow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  
  const { data: session } = useSession()
  const { isConnected } = useAccount()

  useEffect(() => {
    let isMounted = true

    const loadOrganization = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Simular delay para evitar problemas de conexión
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const org = getOrganizationBySlug(slug)
        
        if (isMounted) {
          if (org) {
            setOrganization(org)
          } else {
            setError("Organization not found")
          }
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load organization")
          setIsLoading(false)
        }
      }
    }

    if (slug) {
      loadOrganization()
    }

    return () => {
      isMounted = false
    }
  }, [slug])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-muted-foreground">Loading organization...</h2>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-muted-foreground mb-4">
              {error || "Organization not found"}
            </h1>
            <Link href="/" className="text-primary hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const fundingPercentage = (organization.currentFunding / organization.fundingGoal) * 100

  const handleDonate = (goal?: Goal) => {
    if (!session) {
      signIn()
      return
    }

    if (!isConnected) {
      console.log("Please connect your wallet")
      return
    }

    // Si se pasa una meta específica, la guardamos en el estado para el flujo de donación
    if (goal) {
      setSelectedGoal(goal)
    } else {
      setSelectedGoal(null) // Donación a la organización principal
    }
    
    setShowDonationFlow(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Organizations
        </Link>

        {/* Header de Organización */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Imagen y Badges */}
          <div className="lg:col-span-1">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src={organization.image} 
                alt={organization.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {organization.verified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                  {organization.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {organization.name}
              </h1>
              
              {organization.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {organization.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-lg text-gray-700 leading-relaxed">
                {organization.longDescription}
              </p>
            </div>

            {/* Progreso de Financiamiento */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Funding Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  {/* Árbol creciendo */}
                  <div className="flex-shrink-0">
                    <GrowingTree percentage={fundingPercentage} size="large" />
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{Math.round(fundingPercentage)}%</span>
                    </div>
                    <Progress 
                      value={fundingPercentage} 
                      className="h-3"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={fundingPercentage}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>${organization.currentFunding.toLocaleString()}</span>
                      <span>${organization.fundingGoal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* APY */}
                <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg border border-green-200">
                  <span className="text-sm text-muted-foreground">Expected APY</span>
                  <span className="font-bold text-2xl text-green-600">
                    {(organization.interestRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </Card>

            {/* Métricas de Impacto Global */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Global Impact</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(organization.impactMetrics).map(([key, value]) => {
                  if (!value) return null
                  const Icon = getImpactIcon(key)
                  return (
                    <div key={key} className="text-center p-4 bg-gradient-to-br from-green-50 to-amber-50 rounded-lg border border-green-200">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold text-lg text-gray-900">
                        {formatMetricValue(key, value)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Sección de Jardines (Metas) */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Goal Gardens</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each goal represents a specific project within our organization. Watch them grow from seeds to blooming success as funding progresses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {organization.goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onDonate={handleDonate} 
              />
            ))}
          </div>
        </div>

        {/* CTA Donar */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-green-50 to-amber-50 border-0 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your principal stays safe while the generated interest supports these vital environmental projects. 
              Join us in creating a sustainable future.
            </p>
            <Button 
              onClick={() => handleDonate()} 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white px-8 py-3 text-lg"
            >
              {!session ? "Sign In to Donate" : !isConnected ? "Connect Wallet" : "Donate Interest"}
            </Button>
          </Card>
        </div>
      </div>

      {/* Dialog de Donación */}
      <Dialog open={showDonationFlow} onOpenChange={setShowDonationFlow}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make a Sustainable Donation</DialogTitle>
            <DialogDescription>
              Your principal stays safe while interest supports the cause
            </DialogDescription>
          </DialogHeader>
          <DonationFlow organization={organization} goal={selectedGoal} onClose={() => setShowDonationFlow(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}