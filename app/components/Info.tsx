import Image from "next/image";

export default function Info() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/solar-panel.png"
        alt="Solar panels background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      {/* Overlay for readability - exact Figma overlay */}
      <div className="absolute inset-0 bg-figma-bg-infoOverlay z-10" />

      {/* Contact Info Card */}
      <div className="z-20 bg-figma-bg-primary opacity-84 rounded-xl shadow-figma-xl p-8 mx-12 lg:p-12 border border-figma-border-light">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
          <div className="lg:w-3/6 mb-2">
            <span className="inline-block text-sm font-semibold text-figma-blue-text uppercase tracking-wider mb-3">
              Contact Info
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-figma-text-primary leading-tight xl:mb-24">
              We are always happy to assist you
            </h2>
          </div>
          <div className="flex flex-wrap justify-start gap-12 w-full xl:w-3/6 xl:justify-around">
            <div>
              <h3 className="font-semibold text-figma-text-primary text-lg">
                Email Us
              </h3>
              <div className="my-4 w-6 h-[3px] bg-figma-blue-text" />
              <p className="font-semibold text-figma-text-primary mb-2 text-lg">
                info@veenaenterprises.com
              </p>
              <p className="text-figma-text-secondary text-sm mb-1">
                Assistance hours:
              </p>
              <p className="text-figma-text-secondary text-sm">
                Monday - Friday 9 am to 6 pm EST
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-figma-text-primary text-lg">
                Visit Us
              </h3>
              <div className="my-4 w-6 h-[3px] bg-figma-blue-text" />
              <p className="font-semibold text-figma-text-primary mb-2 text-lg">(808) 998-34256</p>
              <p className="text-figma-text-secondary text-sm">
                57, Govind Nagar West,
                <br />
                Amer Road, Jaipur, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
