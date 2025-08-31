export interface User {
  id: string
  email?: string
  walletAddress?: string
  name?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Organization {
  id: string
  name: string
  description: string
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
  createdAt: Date
}

export interface Donation {
  id: string
  userId: string
  organizationId: string
  amount: number
  interestGenerated: number
  blockchain: "ethereum" | "polygon" | "solana"
  transactionHash: string
  status: "pending" | "confirmed" | "failed"
  createdAt: Date
}

export interface UserPortfolio {
  totalDonated: number
  totalInterestGenerated: number
  totalInterestDonated: number
  availableToWithdraw: number
  donations: Donation[]
}

export interface NotificationSettings {
  goalReached: boolean
  monthlyReport: boolean
  newOpportunities: boolean
}

export interface ImpactMetrics {
  treesPlanted: number
  carbonOffset: number
  peopleHelped: number
  waterSaved: number
  energyGenerated: number
}

export interface Notification {
  id: string
  type: "goal_reached" | "interest_generated" | "new_opportunity" | "milestone"
  title: string
  message: string
  timestamp: Date
  read: boolean
  organizationName?: string
  amount?: number
}
