/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],
  env: {
    NEXTAUTH_URL: "http://localhost:3001",
    NEXTAUTH_SECRET: "suma-dev-secret-key-2024-super-long-and-secure",
  },
  // Configuraciones para mejorar estabilidad
  experimental: {
    // Mejorar estabilidad de conexiones
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // Configuraciones de compilación
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Configuraciones de webpack
  webpack: (config, { isServer }) => {
    // Mejorar estabilidad de módulos
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}

export default nextConfig
