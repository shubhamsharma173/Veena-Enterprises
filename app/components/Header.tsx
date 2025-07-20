'use client'

import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-brand-yellow shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-brand-darkBlue font-bold text-2xl">
              VEENA ENTERPRISES
            </div>
            <div className="ml-2 text-brand-darkBlue text-sm font-semibold">
              SOLAR SERVICES
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#home" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
              Home
            </a>
            <a href="#services" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
              Services
            </a>
            <a href="#why-choose-us" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
              Why Choose Us
            </a>
            <a href="#contact" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-brand-darkBlue">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">9419962911</span>
            </div>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-darkBlue hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-brand-darkBlue">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
                Home
              </a>
              <a href="#services" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
                Services
              </a>
              <a href="#why-choose-us" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
                Why Choose Us
              </a>
              <a href="#contact" className="text-brand-darkBlue hover:text-white transition-colors font-medium">
                Contact
              </a>
              <div className="flex items-center text-brand-darkBlue pt-2">
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-semibold">9419962911</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 