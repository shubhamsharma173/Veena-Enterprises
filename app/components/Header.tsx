'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="mx-auto px-4 sm:px-[6rem] lg:px-[10rem]">
        <div className="flex justify-between items-center py-6 sm:py-8">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <div className="text-figma-text-white font-bold text-xl sm:text-2xl leading-tight drop-shadow-figma-text-lg">
              VEENA ENTERPRISES
            </div>
            <div className="text-figma-text-white text-xs font-semibold tracking-widest mt-1 drop-shadow-figma-text">
              SOLAR SERVICES
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-10">
            <a href="#home" className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium text-sm xl:text-base drop-shadow-figma-text">
              Home
            </a>
            <a href="#services" className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium text-sm xl:text-base drop-shadow-figma-text">
              Services
            </a>
            <a href="#why-choose-us" className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium text-sm xl:text-base drop-shadow-figma-text">
              Why Choose Us
            </a>
            <a href="#contact" className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium text-sm xl:text-base drop-shadow-figma-text">
              Contact
            </a>
          </nav>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-figma-text-white hover:text-figma-yellow-700 transition-colors p-2 drop-shadow-figma-text"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-figma-text-white/20 bg-figma-bg-dark/90 backdrop-blur-sm rounded-b-xl shadow-figma-xl">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#why-choose-us"
                className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose Us
              </a>
              <a
                href="#contact"
                className="text-figma-text-white hover:text-figma-yellow-700 transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 