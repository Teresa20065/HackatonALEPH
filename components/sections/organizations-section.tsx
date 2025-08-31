import { OrganizationCard } from "@/components/cards/organization-card"
import { mockOrganizations } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function OrganizationsSection() {
  return (
    <section id="organizations" className="py-24 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/Naturaleza.png"
          alt="Nature Conservation Background"
          fill
          className="object-cover opacity-5"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-montserrat mb-4">Featured Organizations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Support verified environmental organizations making real impact around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockOrganizations.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group bg-transparent">
            View All Organizations
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
