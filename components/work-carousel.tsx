"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const works = [
  {
    id: 1,
    title: "Retro Sunset Palm",
    description: "Classic vaporwave palm tree with sunset backdrop",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Wireframe Bust",
    description: "Minimalist wireframe sculpture with neon accents",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Digital Mountains",
    description: "Low-poly mountain range with grid overlay",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Glitch Cube",
    description: "Distorted cube with glitch effect texturing",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function WorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-16 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
            Our Previous Work
          </h2>
          <p className="text-xl text-purple-800 max-w-2xl mx-auto">
            Check out some of our favorite 3D printed creations with that perfect vaporwave aesthetic.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-xl border-4 border-cyan-300">
            <div className="relative h-[400px] md:h-[500px]">
              {works.map((work, index) => (
                <div
                  key={work.id}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image src={work.image || "/placeholder.svg"} alt={work.title} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/80 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold">{work.title}</h3>
                    <p className="text-lg">{work.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-purple-800 p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-purple-800 p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/create-print"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-md shadow-lg hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 transform hover:scale-105"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  )
}
