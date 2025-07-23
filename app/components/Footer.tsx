'use client'

import { MapPin, Mail } from 'lucide-react'
import { useState } from 'react'

function Modal({ open, onClose, title, content, loading }: { open: boolean, onClose: () => void, title: string, content: string, loading: boolean }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 max-w-2xl w-full rounded-2xl shadow-lg p-0 relative flex flex-col overflow-hidden">
        <div className="sticky top-0 z-10 bg-gray-900 rounded-t-2xl px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-yellow">{title}</h2>
          <button
            className="text-gray-400 hover:text-brand-yellow text-2xl font-bold ml-4"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div
          className="px-6 pb-6 pt-2 overflow-y-auto text-sm text-gray-400 custom-scrollbar"
          style={{ height: '60vh', scrollBehavior: 'smooth' }}
        >
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #18181b;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #3f3f46;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #facc15;
            }
            .custom-scrollbar {
              scrollbar-color: #3f3f46 #18181b;
              scrollbar-width: thin;
            }
          `}</style>
          {loading ? (
            <div className="text-center py-8 text-brand-yellow font-semibold">Loading...</div>
          ) : (
            <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyText, setPrivacyText] = useState('')
  const [termsText, setTermsText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOpenPrivacy = async () => {
    setLoading(true)
    setPrivacyOpen(true)
    const text = await fetch('/policies/privacy-policy.txt').then(r => r.text())
    setPrivacyText(text)
    setLoading(false)
  }
  const handleOpenTerms = async () => {
    setLoading(true)
    setTermsOpen(true)
    const text = await fetch('/policies/terms-and-conditions.txt').then(r => r.text())
    setTermsText(text)
    setLoading(false)
  }

  return (
    <footer className="bg-gray-900 text-white">
      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy" content={privacyText} loading={loading} />
      <Modal open={termsOpen} onClose={() => setTermsOpen(false)} title="Terms and Conditions" content={termsText} loading={loading} />
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
              <button
                className="text-gray-400 hover:text-brand-yellow text-sm transition-colors underline"
                onClick={handleOpenPrivacy}
              >
                Privacy Policy
              </button>
              <button
                className="text-gray-400 hover:text-brand-yellow text-sm transition-colors underline"
                onClick={handleOpenTerms}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 