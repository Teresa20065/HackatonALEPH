"use client"

import { useAccount, useSwitchChain } from "wagmi"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { mainnet, polygon, sepolia } from "wagmi/chains"

const supportedChains = [
  {
    ...mainnet,
    icon: "🔷",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    ...polygon,
    icon: "🟣",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    ...sepolia,
    icon: "🔧",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
]

export function BlockchainSelector() {
  const { chain, isConnected } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  if (!isConnected) {
    return null
  }

  const currentChain = supportedChains.find((c) => c.id === chain?.id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
          <span>{currentChain?.icon || "⚡"}</span>
          <span className="hidden sm:inline">{currentChain?.name || "Unknown"}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {supportedChains.map((supportedChain) => (
          <DropdownMenuItem
            key={supportedChain.id}
            onClick={() => switchChain({ chainId: supportedChain.id })}
            disabled={isPending || chain?.id === supportedChain.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span>{supportedChain.icon}</span>
              <span>{supportedChain.name}</span>
            </div>
            {chain?.id === supportedChain.id && (
              <Badge variant="secondary" className="text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
