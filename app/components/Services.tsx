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

        {/* Removed call to action with phone number */}
      </div>
    </section>
  )
} 