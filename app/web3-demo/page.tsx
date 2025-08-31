import { WalletInfo } from "@/components/web3/wallet-info"
import { DonationForm } from "@/components/web3/donation-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Coins, Network, Heart } from "lucide-react"

export default function Web3DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-montserrat mb-4">
            Web3 Integration Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of decentralized donations with Suma's Web3 integration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Information */}
          <div className="space-y-6">
            <WalletInfo />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Supported Networks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🔷</span>
                      <span>Ethereum Mainnet</span>
                    </div>
                    <Badge variant="outline">ETH</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🟣</span>
                      <span>Polygon</span>
                    </div>
                    <Badge variant="outline">MATIC</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🔴</span>
                      <span>Optimism</span>
                    </div>
                    <Badge variant="outline">ETH</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🔵</span>
                      <span>Arbitrum</span>
                    </div>
                    <Badge variant="outline">ETH</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Demo */}
          <div className="space-y-6">
            <DonationForm 
              organizationId="demo-1"
              organizationName="Amazon Rainforest Foundation"
              onSuccess={(txHash) => {
                console.log("Donation successful:", txHash)
                // Aquí podrías mostrar una notificación
              }}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">1. Connect Your Wallet</h4>
                  <p className="text-sm text-muted-foreground">
                    Use MetaMask, WalletConnect, or any supported wallet to connect.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">2. Choose Network & Token</h4>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred blockchain network and token for donation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">3. Make Donation</h4>
                  <p className="text-sm text-muted-foreground">
                    Your donation is used to generate interest while keeping your principal intact.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">4. Track Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your donation's impact and the interest generated for environmental causes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Web3 Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Multi-Chain Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for Ethereum, Polygon, Optimism, and Arbitrum networks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Multiple Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Donate using USDC, DAI, WETH, and native tokens on each network.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Sustainable Finance
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your principal stays intact while interest funds environmental projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
