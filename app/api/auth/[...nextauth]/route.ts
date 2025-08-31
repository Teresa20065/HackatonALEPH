import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  secret: "suma-dev-secret-key-2024-super-long-and-secure",
  debug: false,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
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
        if (credentials?.address && credentials?.signature) {
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
})

export { handler as GET, handler as POST }
