import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-24 lg:py-32 bg-figma-bg-secondary"
    >
      <div className="mx-auto px-4 sm:px-[6rem] lg:px-[10rem]">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-16 lg:mb-20 gap-6">
          <span className="inline-block text-nowrap text-lg font-semibold text-figma-blue-text uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="w-4/5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-figma-text-primary leading-tight">
            We are committed to providing the{" "}
            <span className="text-figma-blue-text">best solar solutions</span>{" "}
            with exceptional service quality and customer satisfaction.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] rounded-xl overflow-hidden shadow-figma-xl">
              <Image
                src="/why-choose-us.png"
                alt="Solar worker"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Right: Numbered Features */}
          <div className="space-y-8 lg:space-y-10">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-figma-blue-bg text-figma-text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-figma-medium">
                01
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-figma-text-primary mb-3">
                  Government Subsidy Assistance
                </h3>
                <p className="text-figma-text-secondary leading-relaxed">
                  We help you navigate and apply for government solar subsidies
                  to reduce your investment cost and maximize your savings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-figma-blue-bg text-figma-text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-figma-medium">
                02
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-figma-text-primary mb-3">
                  High-Quality Panels with Warranty
                </h3>
                <p className="text-figma-text-secondary leading-relaxed">
                  Premium solar panels with comprehensive warranty coverage for
                  peace of mind and long-term reliability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-figma-blue-bg text-figma-text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-figma-medium">
                03
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-figma-text-primary mb-3">
                  Cost-Effective & Timely Solutions
                </h3>
                <p className="text-figma-text-secondary leading-relaxed">
                  Efficient installation and competitive pricing without
                  compromising on quality or service excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
