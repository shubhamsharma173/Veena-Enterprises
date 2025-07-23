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