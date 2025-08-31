export const CONTRACTS = {
  DONATION_POOL: {
    address: "0x1234567890123456789012345678901234567890" as const,
    abi: [
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
    ] as const,
  },

  DEFI_PROTOCOLS: {
    AAVE: {
      name: "Aave",
      address: "0xabcdef1234567890abcdef1234567890abcdef12" as const,
      apy: 8.5,
    },
    COMPOUND: {
      name: "Compound",
      address: "0x567890abcdef1234567890abcdef1234567890ab" as const,
      apy: 7.2,
    },
    YEARN: {
      name: "Yearn Finance",
      address: "0x9876543210fedcba9876543210fedcba98765432" as const,
      apy: 9.1,
    },
  },
} as const

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  SEPOLIA: 11155111,
} as const
