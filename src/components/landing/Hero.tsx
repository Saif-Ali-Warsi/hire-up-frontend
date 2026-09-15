const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-12 lg:pb-12 bg-[#faf8f5] overflow-hidden">
      {/* Background Decorative Mesh & Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1254E7]/15 via-indigo-400/10 to-amber-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 shadow-sm px-3.5 py-1.5 rounded-full mb-6 ring-1 ring-black/[0.04]">
              <span className="flex h-2 w-2 rounded-full bg-[#1254E7] animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                Next-Gen AI Recruitment Platform
              </span>
              <span className="text-gray-300 font-light">|</span>
              <span className="text-xs font-semibold text-[#1254E7] hover:underline cursor-pointer">
                v2.4 Released →
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Hire better talent. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1254E7] via-blue-600 to-indigo-600">
                10x faster. Zero bias.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              Autonomous candidate screening that parses technical portfolios,
              evaluates semantic fit, and shortlists your top 1% candidates in
              seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-4">
              <a
                href="#get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1254E7] hover:bg-[#0e44be] text-white font-medium text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#1254E7]/20 hover:shadow-xl hover:shadow-[#1254E7]/30 transition-all duration-200 transform hover:-translate-y-0.5 group"
              >
                <span>Screen Candidates Free</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-50/80 text-gray-700 font-medium text-base px-6 py-3.5 rounded-xl border border-gray-200/80 shadow-sm transition-all duration-200 hover:border-gray-300"
              >
                <span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2 text-[#1254E7]">
                  <svg
                    className="w-3.5 h-3.5 translate-x-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>See 2-min Demo</span>
              </a>
            </div>

            {/* Micro reassurance */}
            <p className="text-xs text-gray-500 mb-8">
              No credit card required • Instant setup • Integrates with ATS
            </p>

            {/* Social Proof */}
            <div className="pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
                  alt="Recruiter"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  alt="Recruiter"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face"
                  alt="Recruiter"
                />
                <div className="h-8 w-8 rounded-full bg-blue-100 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-[#1254E7]">
                  +5k
                </div>
              </div>
              <div className="text-xs text-gray-600 text-center sm:text-left">
                <span className="font-semibold text-gray-900">
                  4.9/5 rating
                </span>{" "}
                from 500+ tech recruiting teams
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Preview Card */}
          <div className="lg:col-span-5 relative">
            {/* Floating Top Badge */}
            <div className="absolute -top-5 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-900 leading-tight">
                  Fast-Track Shortlisted
                </p>
                <p className="text-[10px] text-gray-500">
                  Alex Chen • Staff React Eng
                </p>
              </div>
            </div>

            {/* Glowing Accent Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#1254E7]/30 to-indigo-500/30 rounded-3xl blur-xl opacity-60" />

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-2xl p-6 sm:p-7 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                      alt="Candidate"
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-gray-900">
                          Candidate Evaluation
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        Senior Full-Stack Lead • Applied 2h ago
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      98% Fit
                    </div>
                  </div>
                </div>

                {/* AI Summary Highlight */}
                <div className="bg-blue-50/60 border border-blue-100/80 rounded-xl p-3 text-xs text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#1254E7]">
                    AI Verdict:
                  </span>{" "}
                  Exceptional distributed systems background with 6+ years
                  React/Node architecture. High team leadership index.
                </div>

                {/* Progress Breakdown */}
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                      <span>Frontend & React Architecture</span>
                      <span className="font-bold text-gray-900">96%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1254E7] h-full rounded-full transition-all duration-500 w-[96%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                      <span>System Design & Scalability</span>
                      <span className="font-bold text-gray-900">92%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full transition-all duration-500 w-[92%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                      <span>Communication & Culture Fit</span>
                      <span className="font-bold text-gray-900">98%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 w-[98%]" />
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Screened in 0.4s</span>
                  </div>
                  <button className="text-xs font-semibold text-[#1254E7] hover:text-[#0e44be] flex items-center gap-1 group">
                    <span>Full Assessment Dossier</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </button>
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
