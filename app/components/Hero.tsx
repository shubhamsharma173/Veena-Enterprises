import { Sun, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-brand-yellow to-brand-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-darkBlue mb-6">
              GO SOLAR, SAVE MONEY,{' '}
              <span className="text-brand-green">SAVE THE PLANET!</span>
            </h1>
            <p className="text-xl text-brand-darkBlue mb-8 leading-relaxed">
              Be a part of the green revolution with Veena Enterprises. 
              Leading solar panel installation and solar services in Jaipur. 
              Reduce your electricity bills and increase your energy independence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+919419962911"
                className="bg-brand-darkBlue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 9419962911
              </a>
              <a
                href="#services"
                className="border-2 border-brand-darkBlue text-brand-darkBlue px-8 py-4 rounded-lg font-semibold hover:bg-brand-darkBlue hover:text-white transition-colors flex items-center justify-center"
              >
                Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-brand-darkBlue rounded-full flex items-center justify-center shadow-2xl">
                <Sun className="w-32 h-32 text-brand-yellow" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-green text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm font-semibold">Government</div>
                <div className="text-lg font-bold">Subsidy Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Phone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
} 