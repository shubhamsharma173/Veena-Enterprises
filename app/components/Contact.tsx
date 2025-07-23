import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-brand-darkBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Contact Us Today!
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to go solar? Get in touch with us for a free consultation and quote. 
            Our expert team is here to help you make the switch to renewable energy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-brand-yellow">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                {/* Only keep phone in the form, not here */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand-darkBlue" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Visit Us</h4>
                    <address className="not-italic text-gray-300">
                      <div>57, Govind Nagar West,</div>
                      <div>Amer Road, Jaipur 302002</div>
                      <div>Rajasthan, India</div>
                    </address>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-brand-darkBlue" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Business Hours</h4>
                    <div className="text-gray-300">
                      <div>Monday - Sunday: 9:00 AM - 6:00 PM</div>
                      <div className="text-sm mt-1">24/7 Emergency Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-brand-yellow">
              Request Free Quote
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                  placeholder="Tell us about your solar requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-yellow text-brand-darkBlue py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        {/* Removed call to action with phone number */}
      </div>
    </section>
  )
} 