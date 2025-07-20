import { Award, Shield, Clock, Users } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Government Subsidy Assistance',
      description: 'We help you navigate and apply for government solar subsidies to reduce your investment cost.'
    },
    {
      icon: Shield,
      title: 'High-Quality Panels with Warranty',
      description: 'Premium solar panels with comprehensive warranty coverage for peace of mind.'
    },
    {
      icon: Clock,
      title: 'Cost-Effective & Timely Solutions',
      description: 'Efficient installation and competitive pricing without compromising on quality.'
    },
    {
      icon: Users,
      title: 'Energy Audit & Free Site Inspection',
      description: 'Comprehensive energy audit and free site inspection to optimize your solar solution.'
    }
  ]

  return (
    <section id="why-choose-us" className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-darkBlue mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing the best solar solutions with exceptional service quality 
            and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-brand-darkBlue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-darkBlue rounded-lg p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Join the Green Revolution
          </h3>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Be a part of the sustainable future with Veena Enterprises. 
            Reduce your carbon footprint while saving money on electricity bills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-yellow mb-2">500+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-yellow mb-2">1000+</div>
              <div className="text-sm">Solar Panels Installed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-yellow mb-2">5+</div>
              <div className="text-sm">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 