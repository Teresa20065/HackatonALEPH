import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "suma-dev-secret-key-2024-super-long-and-secure",
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Implement email/password authentication
        if (credentials?.email && credentials?.password) {
          // Mock user for development
          return {
            id: "1",
            email: credentials.email,
            name: credentials.email.split("@")[0],
          }
        }
        return null
      },
    }),
    CredentialsProvider({
      id: "wallet",
      name: "Wallet",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        // TODO: Implement wallet signature verification
        if (credentials?.address && credentials?.signature) {
          // Mock wallet user for development
          return {
            id: credentials.address,
            walletAddress: credentials.address,
            name: `${credentials.address.slice(0, 6)}...${credentials.address.slice(-4)}`,
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.walletAddress = (user as any).walletAddress
      }
      return token
    },
    async session({ session, token }) {
      if (token.walletAddress) {
        ;(session.user as any).walletAddress = token.walletAddress
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
}
