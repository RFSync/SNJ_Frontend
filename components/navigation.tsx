"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b-2 border-pink-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-transparent bg-clip-text">
                RetroWave Prints
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-purple-800 hover:text-pink-500 px-3 py-2 text-lg font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-purple-800 hover:text-pink-500 px-3 py-2 text-lg font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-purple-800 hover:text-pink-500 px-3 py-2 text-lg font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/create-print"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md font-medium hover:from-purple-700 hover:to-pink-600 transition-colors duration-200"
            >
              Create Print
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-800 hover:text-pink-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-paper border-b-2 border-pink-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-purple-800 hover:text-pink-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-purple-800 hover:text-pink-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-purple-800 hover:text-pink-500 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/create-print"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Create Print
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
