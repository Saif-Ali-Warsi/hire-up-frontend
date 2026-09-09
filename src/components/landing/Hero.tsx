const Hero = () => {
  return (
    <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-36 bg-gradient-to-b from-gray-50/50 via-white to-white overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#1254E7]/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust Tag / Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1254E7]/10 border border-[#1254E7]/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#1254E7] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#1254E7] tracking-wide">
                Next-Gen AI Recruitment Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
              Hire better. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1254E7] to-indigo-600">
                Faster. Smarter.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              AI-powered candidate screening that helps forward-thinking
              recruiters find and evaluate the right people in a fraction of the
              time.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1254E7] hover:bg-[#0f46c2] text-white font-semibold text-base px-8 py-4 rounded-xl shadow-xl shadow-[#1254E7]/25 transition-all duration-200 transform hover:-translate-y-0.5 group"
              >
                <span>Screen Candidates</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base px-6 py-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2 text-[#1254E7]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Social Proof Mini-Banner */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-[#1254E7] text-white flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  AS
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                  MK
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gray-800 text-white flex items-center justify-center font-bold text-xs">
                  +
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center sm:text-left">
                Trusted by{" "}
                <span className="font-bold text-gray-900">
                  500+ modern hiring teams
                </span>{" "}
                worldwide.
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative frame shadow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#1254E7] to-indigo-600 rounded-2xl blur-xl opacity-20 animate-pulse" />

              {/* Card Container */}
              <div className="relative bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1254E7]/10 flex items-center justify-center text-[#1254E7] font-bold">
                      AI
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        Candidate Match Score
                      </div>
                      <div className="text-xs text-gray-500">
                        Senior React Engineer Role
                      </div>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    98% Match
                  </span>
                </div>

                {/* Simulated progress list */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Technical Skills Match</span>
                      <span className="text-[#1254E7]">95%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1254E7] h-full rounded-full w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Experience Requirement</span>
                      <span className="text-[#1254E7]">100%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1254E7] h-full rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Semantic AI Evaluation</span>
                      <span className="text-[#1254E7]">92%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1254E7] h-full rounded-full w-[92%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Screened in 0.4 seconds
                  </span>
                  <span className="text-xs font-bold text-[#1254E7] hover:underline cursor-pointer">
                    View Report →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
