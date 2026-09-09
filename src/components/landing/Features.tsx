const Features = () => {
  const featureList = [
    {
      title: "AI Screening",
      description:
        "Analyze candidates against the actual requirements of the job with high-precision intelligence.",
      icon: (
        <svg
          className="w-6 h-6 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Smart Matching",
      description:
        "Combine structured data matching with deep semantic AI evaluation to find the absolute best fit.",
      icon: (
        <svg
          className="w-6 h-6 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Save Time",
      description:
        "Screen hundreds of candidates instantly without the tedious overhead of manually reviewing every resume.",
      icon: (
        <svg
          className="w-6 h-6 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="py-20 lg:py-28 bg-gray-50/50 relative overflow-hidden"
    >
      {/* Background subtle glowing accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1254E7]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-[#1254E7] font-semibold text-sm uppercase tracking-wider bg-[#1254E7]/10 px-3.5 py-1.5 rounded-full mb-4">
            Powerful Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why choose <span className="text-[#1254E7]">HireUP</span>?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Streamline your entire recruitment pipeline with next-generation
            tools built for modern teams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#1254E7]/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-[#1254E7]/10 flex items-center justify-center mb-6 group-hover:bg-[#1254E7] group-hover:text-white transition-colors duration-300">
                  {/* Cloned svg wrapper to handle color flip on hover if desired, or keep accent style */}
                  <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1254E7] transition-colors duration-200">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom subtle indicator line */}
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center text-sm font-medium text-[#1254E7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
