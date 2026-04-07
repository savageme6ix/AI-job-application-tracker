interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Logic for dynamic styles and icons based on score
  let bgColor = "from-red-100";
  let icon = "/icons/ats-bad.svg";
  let statusColor = "text-red-700";

  if (score > 69) {
    bgColor = "from-green-100";
    icon = "/icons/ats-good.svg";
    statusColor = "text-green-700";
  } else if (score > 49) {
    bgColor = "from-yellow-100";
    icon = "/icons/ats-warning.svg";
    statusColor = "text-yellow-700";
  }

  return (
    <div className={`w-full max-w-2xl rounded-3xl p-6 bg-gradient-to-br ${bgColor} to-white border border-white/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700`}>
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <img src={icon} alt="ATS Status" className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            ATS Score — <span className={statusColor}>{score}/100</span>
          </h2>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Analysis Overview</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our AI has scanned your resume against the job description. This score represents how well your skills, keywords, and formatting align with the employer's requirements.
          </p>
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/40 p-3 rounded-xl">
              <img 
                src={item.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                alt="icon" 
                className="w-5 h-5 mt-0.5"
              />
              <p className="text-sm text-gray-700">{item.tip}</p>
            </div>
          ))}
        </div>

        {/* Closing Line */}
        <p className="pt-4 text-xs font-medium text-gray-500 italic border-t border-gray-200/50">
          * Improving these areas could significantly increase your chances of getting past automated filters.
        </p>
      </div>
    </div>
  );
};

export default ATS;