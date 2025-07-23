import { Phone, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="text-brand-yellow font-bold text-2xl">
                VEENA ENTERPRISES
              </div>
              <div className="ml-2 text-brand-yellow text-sm font-semibold">
                SOLAR SERVICES
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Leading solar panel installation and solar services in Jaipur. 
              We help you go green while saving money on your electricity bills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-yellow">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-yellow">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Solar Panel Installation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  On-Grid & Off-Grid Systems
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Solar Inverters & Batteries
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  Maintenance & AMC Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-brand-yellow mr-3" />
              <div>
                <div className="font-semibold">Visit Us</div>
                <div className="text-gray-300">57, Govind Nagar West, Amer Road, Jaipur</div>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-brand-yellow mr-3" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-300">info@veenaenterprises.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Veena Enterprises Solar Services. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 