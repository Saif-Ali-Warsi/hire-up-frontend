const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      badge: "Fast Setup",
      title: "Define Role & Criteria",
      description:
        "Input your job spec, required technical stack, and must-have competencies. HireUP calibrates an AI scoring rubric in seconds.",
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700">
            <span>Target Skills</span>
            <span className="text-[#1254E7] bg-blue-50 px-2 py-0.5 rounded-md">
              Auto-calibrated
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-medium bg-white px-2 py-1 rounded-md border border-stone-200 text-gray-700 shadow-2xs">
              React 19
            </span>
            <span className="text-[10px] font-medium bg-white px-2 py-1 rounded-md border border-stone-200 text-gray-700 shadow-2xs">
              TypeScript
            </span>
            <span className="text-[10px] font-medium bg-white px-2 py-1 rounded-md border border-stone-200 text-gray-700 shadow-2xs">
              5+ Yrs Exp
            </span>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      badge: "Bulk Parsing",
      title: "Upload Any Resumes",
      description:
        "Drag & drop 5 or 5,000 resumes. Our parsing engine reads PDFs, Word docs, and portfolios with zero manual formatting.",
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3.5 border border-stone-200/60 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-gray-700 truncate max-w-[140px]">
              chen_staff_eng.pdf
            </span>
            <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
              Parsed
            </span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#1254E7] h-full rounded-full w-full animate-pulse" />
          </div>
          <p className="text-[10px] text-gray-500">
            24 resumes processed in 1.8s
          </p>
        </div>
      ),
    },
    {
      number: "03",
      badge: "Actionable",
      title: "Ranked Shortlist Ready",
      description:
        "Receive unbiased candidate rankings with match confidence scores, evidence snippets, and ready-to-use interview questions.",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      preview: (
        <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-200/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                #1
              </span>
              <span className="text-[11px] font-bold text-gray-800">
                Alex Chen
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              98% Match
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-stone-200/60 pt-1.5">
            <span>Leadership: 10/10</span>
            <span className="text-[#1254E7] font-semibold">Fast-track →</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-12 lg:py-12 bg-[#faf8f5] relative overflow-hidden"
    >
      {/* Background Decorative Mesh Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-400/10 via-indigo-300/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200/80 shadow-2xs px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1254E7] animate-pulse" />
            <span className="text-xs font-semibold text-[#1254E7] tracking-wide uppercase">
              Autonomous Pipeline
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1254E7] to-indigo-600">
              HireUP
            </span>{" "}
            Automates Screening
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Move from a cluttered inbox of unparsed resumes to an
            interview-ready shortlist in less than three minutes.
          </p>
        </div>

        {/* Steps Grid with Desktop Connector Line */}
        <div className="relative">
          {/* Subtle Desktop Connector Track */}
          <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-stone-200 pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-2xl hover:border-[#1254E7]/30 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Subtle Glow Backdrop on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />

                {/* Top Section: Step Number, Badge, and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-2xl bg-stone-100 group-hover:bg-[#1254E7] text-gray-700 group-hover:text-white font-extrabold text-sm flex items-center justify-center transition-colors duration-300 shadow-2xs">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        {step.badge}
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2.5 group-hover:text-[#1254E7] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Section: Interactive UI Preview */}
                <div className="mt-auto pt-4 border-t border-stone-100">
                  {step.preview}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
