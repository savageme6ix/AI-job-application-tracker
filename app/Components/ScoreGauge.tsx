const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  
  // Half-circle circumference calculation
  const circumference = Math.PI * normalizedRadius;
  
  // Calculate how much of the half-circle to fill
  const progress = Math.min(Math.max(score, 0), 100) / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-[150px] h-[85px] flex items-end justify-center overflow-hidden">
      <svg
        height="150px"
        width="150px"
        viewBox="0 0 100 100"
        className="absolute top-0"
      >
        {/* Define the Resumind Gradient */}
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5171FF" />
            <stop offset="100%" stopColor="#FF97AD" />
          </linearGradient>
        </defs>

        {/* Background Semi-Circle (Gray track) */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          // Rotate 180deg to make it an arch
          transform="rotate(180 50 50)"
        />

        {/* Progress Semi-Circle (Gradient) */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(180 50 50)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Score Label centered at the bottom of the arch */}
      <div className="flex flex-col items-center mb-1 z-10">
        <span className="text-2xl font-bold text-gray-800">{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
          ATS Score
        </span>
      </div>
    </div>
  );
};

export default ScoreGauge;