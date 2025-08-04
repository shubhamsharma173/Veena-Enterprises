import Image from "next/image";
import { Zap, Wrench, Settings, Sun } from "lucide-react";

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-24 lg:py-32 bg-figma-bg-primary"
    >
      <div className="mx-auto px-4 sm:px-[6rem] lg:px-[10rem]">
        {/* Header */}
        <span className="inline-block text-sm font-semibold text-figma-blue-text uppercase tracking-wider mb-3">
          Our Services
        </span>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 lg:mb-20 gap-6">
          <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-semibold text-figma-text-primary leading-tight">
            Power Your <span className="text-figma-blue-text">Home</span> with
            Solar Energy
          </h2>
          <div className="max-w-lg text-figma-text-secondary lg:text-lg">
            Comprehensive solar solutions to meet all your renewable energy
            needs. From installation to maintenance, we've got you covered.
          </div>
        </div>

        <div className="my-5 flex w-5/6 flex-wrap sm:flex-nowrap gap-3 justify-between">
          {/* Service 1 - Solar Panel Installation */}
          <div className="bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-3 min-w-[252px] max-h-[307px] rounded-[13px] p-5 my-2 lg:p-6 hover:shadow-figma-medium transition-all duration-300">
            <div className="w-10 h-10 bg-figma-blue-bg rounded-full flex items-center justify-center mb-4">
              <Sun className="w-5 h-5 text-figma-text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-figma-text-primary mb-3">
              Solar Panel Installation
            </h3>
            <p className="text-figma-text-secondary text-sm leading-relaxed">
              Professional installation of high-quality solar panels for
              residential and commercial properties with expert craftsmanship.
            </p>
          </div>

          {/* (Image Card) */}
          <div className="hidden xl-custom:block bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-7 min-w-[462px] max-h-[307px] rounded-[13px] p-0 my-2 hover:shadow-figma-medium transition-all duration-300">
            <div className="relative h-full">
              <Image
                src="/service-house.jpg"
                alt="House with solar panels"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-[13px]"
              />
            </div>
          </div>

          {/* Service 2 - On-Grid & Off-Grid Systems */}
          <div className="bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-3 min-w-[252px] max-h-[307px] rounded-[13px] p-5 my-2 lg:p-6 hover:shadow-figma-medium transition-all duration-300">
            <div className="w-10 h-10 bg-figma-blue-bg rounded-full flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-figma-text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-figma-text-primary mb-3">
              On-Grid & Off-Grid Systems
            </h3>
            <p className="text-figma-text-secondary text-sm leading-relaxed">
              Complete solar power solutions including grid-tied and standalone
              systems for maximum energy independence.
            </p>
          </div>
        </div>
        <div className="my-5 flex w-5/6 flex-wrap sm:flex-nowrap gap-3 justify-between xl-custom:justify-self-end">
          {/* Service 3 - Solar Inverters & Batteries */}
          <div className="bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-3 min-w-[252px] max-h-[307px] rounded-[13px] p-5 my-2 lg:p-6 hover:shadow-figma-medium transition-all duration-300">
            <div className="w-10 h-10 bg-figma-blue-bg rounded-full flex items-center justify-center mb-4">
              <Settings className="w-5 h-5 text-figma-text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-figma-text-primary mb-3">
              Solar Inverters & Batteries
            </h3>
            <p className="text-figma-text-secondary text-sm leading-relaxed">
              Premium solar inverters and battery systems for optimal energy
              storage and efficient power conversion.
            </p>
          </div>

          {/* (Image Card) */}
          <div className="hidden xl-custom:block bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-7 min-w-[462px] max-h-[307px] rounded-[13px] p-0 my-2 hover:shadow-figma-medium transition-all duration-300">
            <div className="relative h-full">
              <Image
                src="/service-solarfarm.png"
                alt="House with solar panels"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-[13px]"
              />
            </div>
          </div>

          {/* Service 4 - Maintenance & AMC Services */}
          <div className="bg-gradient-to-b from-[#F6F6F6] to-[#EBEBEB] grow-3 min-w-[252px] max-h-[307px] rounded-[13px] p-5 my-2 lg:p-6 hover:shadow-figma-medium transition-all duration-300">
            <div className="w-10 h-10 bg-figma-blue-bg rounded-full flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5 text-figma-text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-figma-text-primary mb-3">
              Maintenance & AMC Services
            </h3>
            <p className="text-figma-text-secondary text-sm leading-relaxed">
              Comprehensive maintenance and Annual Maintenance Contract services
              to ensure optimal system performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
