import Link from "next/link"
import { Printer, CuboidIcon as Cube, Sparkles } from "lucide-react"

export default function PrintSection() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-cyan-100 py-8 border-b-4 border-pink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <Printer className="h-10 w-10 text-purple-600" />
            <div>
              <h2 className="text-xl font-bold text-purple-800">3D Printed Models</h2>
              <p className="text-purple-600">High-quality custom prints</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Cube className="h-10 w-10 text-pink-500" />
            <div>
              <h2 className="text-xl font-bold text-purple-800">Custom Designs</h2>
              <p className="text-purple-600">Upload your own creations</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Sparkles className="h-10 w-10 text-cyan-500" />
            <div>
              <h2 className="text-xl font-bold text-purple-800">Vaporwave Aesthetic</h2>
              <p className="text-purple-600">Retro-futuristic vibes</p>
            </div>
          </div>

          <Link
            href="/create-print"
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:from-pink-600 hover:to-purple-700 transition-colors duration-200"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  )
}
