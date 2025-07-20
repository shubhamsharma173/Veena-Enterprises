import { CheckCircle, Zap, Wrench, Settings, Sun } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Sun,
      title: 'Solar Panel Installation',
      description: 'Professional installation of high-quality solar panels for residential and commercial properties.',
      features: ['Expert installation team', 'Quality assurance', 'Post-installation support']
    },
    {
      icon: Zap,
      title: 'On-Grid & Off-Grid Systems',
      description: 'Complete solar power solutions including grid-tied and standalone systems.',
      features: ['Grid synchronization', 'Battery backup systems', 'Energy monitoring']
    },
    {
      icon: Settings,
      title: 'Solar Inverters & Batteries',
      description: 'Premium solar inverters and battery systems for optimal energy storage.',
      features: ['High-efficiency inverters', 'Long-life batteries', 'Warranty coverage']
    },
    {
      icon: Wrench,
      title: 'Maintenance & AMC Services',
      description: 'Comprehensive maintenance and Annual Maintenance Contract services.',
      features: ['Regular inspections', 'Performance optimization', '24/7 support']
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solar solutions to meet all your renewable energy needs. 
            From installation to maintenance, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-brand-cream rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-brand-yellow rounded-full mb-4 mx-auto">
                <service.icon className="w-8 h-8 text-brand-darkBlue" />
              </div>
              <h3 className="text-xl font-semibold text-brand-darkBlue mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-brand-darkBlue text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Customized Solar Power Solutions
            </h3>
            <p className="text-lg mb-6">
              Every property is unique. We provide customized solar solutions tailored to your specific needs, 
              energy consumption patterns, and budget requirements.
            </p>
            <a
              href="tel:+919419962911"
              className="bg-brand-yellow text-brand-darkBlue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-flex items-center"
            >
              Get Free Consultation
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 