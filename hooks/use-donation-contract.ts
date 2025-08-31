"use client"

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { useState } from "react"

// Mock contract ABI - in production, this would be the actual contract ABI
const DONATION_CONTRACT_ABI = [
  {
    name: "donate",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "organizationId", type: "string" },
      { name: "amount", type: "uint256" },
      { name: "protocol", type: "string" },
    ],
    outputs: [{ name: "donationId", type: "uint256" }],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "donationId", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "getUserDonations",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "organizationId", type: "string" },
          { name: "amount", type: "uint256" },
          { name: "interestGenerated", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getInterestGenerated",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "donationId", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const

const DONATION_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" as const

export function useDonationContract() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [userDonations, setUserDonations] = useState([])
  const [interestGenerated, setInterestGenerated] = useState(0)

  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const { data: userDonationsData } = useReadContract({
    address: DONATION_CONTRACT_ADDRESS,
    abi: DONATION_CONTRACT_ABI,
    functionName: "getUserDonations",
    args: [window.ethereum.selectedAddress as `0x${string}`],
  })

  const { data: interestGeneratedData } = useReadContract({
    address: DONATION_CONTRACT_ADDRESS,
    abi: DONATION_CONTRACT_ABI,
    functionName: "getInterestGenerated",
    args: [BigInt(1)], // Example donationId
  })

  useState(() => {
    if (userDonationsData) {
      setUserDonations(userDonationsData)
    }
  }, [userDonationsData])

  useState(() => {
    if (interestGeneratedData) {
      setInterestGenerated(interestGeneratedData)
    }
  }, [interestGeneratedData])

  const donate = async (organizationId: string, amount: string, protocol: string) => {
    try {
      setIsProcessing(true)
      await writeContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: DONATION_CONTRACT_ABI,
        functionName: "donate",
        args: [organizationId, parseEther(amount), protocol],
        value: parseEther(amount),
      })
    } catch (error) {
      console.error("Donation failed:", error)
      setIsProcessing(false)
      throw error
    }
  }

  const withdraw = async (donationId: number, amount: string) => {
    try {
      setIsProcessing(true)
      await writeContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: DONATION_CONTRACT_ABI,
        functionName: "withdraw",
        args: [BigInt(donationId), parseEther(amount)],
      })
    } catch (error) {
      console.error("Withdrawal failed:", error)
      setIsProcessing(false)
      throw error
    }
  }

  return {
    donate,
    withdraw,
    userDonations,
    interestGenerated,
    hash,
    error,
    isPending,
    isConfirming,
    isSuccess,
    isProcessing,
  }
}
