import { ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32 bg-figma-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form */}
        <div className="bg-figma-bg-card rounded-xl shadow-figma-xl p-8 lg:p-12 border border-figma-border-light">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-figma-blue-text uppercase tracking-wider mb-3">
              Get Started
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-figma-text-primary leading-tight mb-8">
              Get in touch with us.<br />We're here to assist you.
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-figma-text-primary mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-figma-border-medium text-figma-text-primary placeholder-figma-text-muted focus:outline-none focus:ring-2 focus:ring-figma-blue-bg focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-figma-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-figma-border-medium text-figma-text-primary placeholder-figma-text-muted focus:outline-none focus:ring-2 focus:ring-figma-blue-bg focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-figma-text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-figma-border-medium text-figma-text-primary placeholder-figma-text-muted focus:outline-none focus:ring-2 focus:ring-figma-blue-bg focus:border-transparent transition-colors resize-none"
                  placeholder="Message"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-figma-blue-bg hover:bg-figma-blue-800 text-figma-text-white px-8 py-4 rounded-full font-semibold text-lg shadow-figma-xl transition-all duration-300 hover:shadow-figma-dark transform hover:scale-105"
              >
                Leave us a Message
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 