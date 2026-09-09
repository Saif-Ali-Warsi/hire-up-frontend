const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create a Job",
      description:
        "Define your ideal job requirements, skills, and criteria in seconds to set the AI evaluation baseline.",
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Upload Resumes",
      description:
        "Easily upload individual or bulk candidate resumes. Our engine instantly processes all formats securely.",
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Get Ranked Candidates",
      description:
        "Let HireUP analyze, match, and rank candidates automatically so you can interview the best talent first.",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f4ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-block text-[#1254E7] font-semibold text-sm uppercase tracking-wider bg-[#1254E7]/10 px-3.5 py-1.5 rounded-full mb-4">
            Simple Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            How <span className="text-[#1254E7]">HireUP</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Transform your hiring workflow in three straightforward steps—no
            complicated setup required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#1254E7]/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top row: Step Number & Icon */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl font-black text-gray-200 group-hover:text-[#1254E7]/20 transition-colors duration-300">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-[#1254E7]/10 flex items-center justify-center group-hover:bg-[#1254E7] group-hover:text-white transition-all duration-300 shadow-sm">
                  <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1254E7] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Accent line indicator */}
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-[#1254E7] transition-colors">
                  Step {step.number} of 03
                </span>
                <div className="w-6 h-1 bg-gray-100 rounded-full group-hover:w-12 group-hover:bg-[#1254E7] transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
