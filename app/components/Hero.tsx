import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/solar-bg.jpg"
        alt="Solar panels background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      {/* Overlay for readability - exact Figma overlay */}
      <div className="absolute inset-0 bg-figma-bg-heroOverlay z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full mx-auto px-4 sm:px-[6rem] lg:px-[10rem] flex flex-col items-center justify-center text-center">
        <div className="mx-auto px-2 sm:px-[2rem] lg:px-[6rem]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-figma-text-white mb-8 leading-tight drop-shadow-figma-text">
            GO SOLAR, SAVE<br />MONEY, <span className="text-figma-yellow-700 drop-shadow-figma-text">SAVE THE PLANET!</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-figma-text-white/90 mb-10 mx-auto leading-relaxed drop-shadow-figma-text font-normal">
            Be a part of the green revolution with Veena Enterprises, Leading solar panel installation and solar services in Jaipur. Reduce your electricity bills and increase your energy independence.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-5 bg-figma-bg-primary border border-figma-blue-bg text-figma-blue-text ps-4 py-0 pe-2 rounded-full font-semibold text-lg shadow-figma-medium transition-all duration-300 hover:bg-figma-blue-50 hover:shadow-figma-xl transform hover:scale-105"
          >
            <span className='my-2 sm:my-3'>
            Get Started
            </span>
            <span className="-rotate-45 inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-figma-blue-bg">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-figma-text-white" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
} 