import Image from 'next/image'

export default function Stats() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/solar-bg-2.jpg"
        alt="Solar panels background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      {/* Overlay for readability - exact Figma overlay */}
      <div className="absolute inset-0 bg-figma-bg-statsOverlay z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-figma-text-white mb-6 leading-tight drop-shadow-figma-text-lg">
            Join the Green Revolution
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-figma-text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-figma-text">
            Be a part of the sustainable future with Veena Enterprises. Reduce your carbon footprint while saving money on electricity bills.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Stat 1 */}
          <div className="bg-figma-bg-primary rounded-xl p-8 lg:p-10 text-center shadow-figma-xl hover:shadow-figma-dark transition-all duration-300 transform hover:scale-105 border border-figma-border-light">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-figma-blue-text mb-3">
              500+
            </div>
            <div className="text-figma-text-secondary text-lg">
              Happy<br />Customers
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-figma-blue-bg rounded-xl p-8 lg:p-10 text-center shadow-figma-xl hover:shadow-figma-dark transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-3">
              1K+
            </div>
            <div className="text-figma-text-white text-lg">
              Solar Panels<br />Installed
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-figma-bg-primary rounded-xl p-8 lg:p-10 text-center shadow-figma-xl hover:shadow-figma-dark transition-all duration-300 transform hover:scale-105 border border-figma-border-light">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-figma-blue-text mb-3">
              5+
            </div>
            <div className="text-figma-text-secondary text-lg">
              Years of<br />Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 