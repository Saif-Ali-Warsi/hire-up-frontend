const Features = () => {
  const featureList = [
    {
      badge: "Deep Semantic NLP",
      title: "Context-Aware AI Screening",
      description:
        "Go far beyond raw keyword matching. Our neural engine understands domain context, career progression, and proven impact.",
      icon: (
        <svg
          className="w-5 h-5 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-gray-700">
              Semantic Verification
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full text-[10px]">
              99.2% Accuracy
            </span>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1254E7]" />
                Architecture Leadership
              </span>
              <span className="font-semibold text-gray-900">Validated</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Unconscious Bias Filter
              </span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: "Multidimensional",
      title: "Smart Multi-Vector Matching",
      description:
        "Cross-evaluate technical capabilities, cultural compatibility, and problem-solving depth against your custom benchmark.",
      icon: (
        <svg
          className="w-5 h-5 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700">
            <span>Scorecard Matrix</span>
            <span className="text-[#1254E7] text-[10px]">Top 2% Tier</span>
          </div>
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                <span>Core Engineering Stack</span>
                <span className="font-bold text-gray-900">98%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#1254E7] h-full rounded-full w-[98%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                <span>Domain Experience</span>
                <span className="font-bold text-gray-900">94%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full w-[94%]" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: "Instant Velocity",
      title: "Save 80%+ Recruiting Time",
      description:
        "Eliminate resume screening fatigue. Screen hundreds of applicants in minutes and focus 100% of your energy on interviewing.",
      icon: (
        <svg
          className="w-5 h-5 text-[#1254E7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-700">
              Time-To-Shortlist
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              -84% Hours
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center pt-1">
            <div className="bg-white p-2 rounded-lg border border-stone-200/70 shadow-2xs">
              <div className="text-[10px] text-gray-400 uppercase font-semibold">
                Manual
              </div>
              <div className="text-sm font-extrabold text-gray-500 line-through">
                14.5 hrs
              </div>
            </div>
            <div className="bg-blue-50/70 p-2 rounded-lg border border-blue-200/60 shadow-2xs">
              <div className="text-[10px] text-[#1254E7] uppercase font-semibold">
                With HireUP
              </div>
              <div className="text-sm font-extrabold text-[#1254E7]">
                3.8 mins
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="py-12 lg:py-12 bg-[#faf8f5] relative overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#1254E7]/10 via-indigo-400/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200/80 shadow-2xs px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1254E7] animate-pulse" />
            <span className="text-xs font-semibold text-[#1254E7] tracking-wide uppercase">
              Core Capabilities
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Why Hiring Teams Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1254E7] to-indigo-600">
              HireUP
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Eliminate bias, cut screening cycles down to seconds, and
            consistently connect with the highest-caliber talent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-2xl hover:border-[#1254E7]/35 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Icon & Category Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100/70 flex items-center justify-center group-hover:bg-[#1254E7] transition-all duration-300 shadow-2xs">
                    <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 bg-stone-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2.5 group-hover:text-[#1254E7] transition-colors duration-200">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bottom: Interactive UI Mockup & Link */}
              <div className="mt-auto space-y-4 pt-4 border-t border-stone-100">
                {feature.preview}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-gray-500 group-hover:text-[#1254E7] transition-colors">
                    Explore capability
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-[#1254E7] text-gray-500 group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
