import Faq from "@/components/faq"

export default function About() {
  return (
    <div className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
            About RetroWave Prints
          </h1>
          <p className="text-xl text-purple-800 max-w-2xl mx-auto">
            We combine nostalgic vaporwave aesthetics with cutting-edge 3D printing technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border-2 border-pink-300">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Story</h2>
            <p className="text-purple-900 mb-4">
              RetroWave Prints was born from a passion for both retro aesthetics and modern technology. We started as a
              small group of designers and engineers who loved the vaporwave movement and wanted to bring those digital
              designs into the physical world.
            </p>
            <p className="text-purple-900">
              Today, we're proud to offer high-quality 3D printed models with that perfect nostalgic feel, delivering a
              piece of the digital past into your physical present.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border-2 border-cyan-300">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Process</h2>
            <p className="text-purple-900 mb-4">
              We use state-of-the-art 3D printers and premium materials to ensure every print captures the essence of
              your design. Our team of designers can help refine your ideas or you can upload your own ready-to-print
              models.
            </p>
            <p className="text-purple-900">
              Each piece is carefully printed, finished, and quality checked before being shipped to ensure you receive
              a product that exceeds your expectations.
            </p>
          </div>
        </div>

        <Faq />
      </div>
    </div>
  )
}
