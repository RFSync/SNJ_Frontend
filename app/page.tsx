import Hero from "@/components/hero"
import PrintSection from "@/components/print-section"
import WorkCarousel from "@/components/work-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PrintSection />
      <WorkCarousel />
    </div>
  )
}
