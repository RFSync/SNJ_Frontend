import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-100 to-pink-100 border-b-4 border-cyan-300">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 text-transparent bg-clip-text">
              Retro Vibes,
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-transparent bg-clip-text mt-2">
              Modern Prints
            </span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl md:text-2xl text-purple-800">
            Turn your digital dreams into physical reality with our vaporwave-inspired 3D printing service.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/create-print"
              className="px-8 py-3 border-2 border-purple-600 bg-purple-600 text-white font-medium rounded-md shadow-lg hover:bg-purple-700 hover:border-purple-700 transition-all duration-200 transform hover:-translate-y-1"
            >
              Create Your Print
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border-2 border-pink-500 text-pink-500 font-medium rounded-md shadow-lg hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
            >
              Browse Designs
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-grid-sunset opacity-70"></div>
    </div>
  )
}
