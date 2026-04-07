const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;

  // Half-circle arc length (180 degrees)
  const arcLength = Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = arcLength * (1 - progress);

  // SVG viewBox sized for a half circle with a bit of padding
  // The circle center is at (50, 50), we show only the bottom half (rotated)
  // We'll use the top half by rotating the SVG -90deg and starting from left

  return (
    <div className="relative w-[100px] h-[58px]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>

        {/* Background half-circle (bottom half of circle centered at 50,50) */}
        <path
          d={describeArc(50, 50, normalizedRadius, 180, 360)}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
        />

        {/* Foreground half-circle */}
        <path
          d={describeArc(50, 50, normalizedRadius, 180, 360)}
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          // Reverse the dash so it fills left-to-right
          style={{ strokeDashoffset: arcLength * (1 - progress) }}
        />
      </svg>

      {/* Score label centered at the bottom of the arc */}
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
        <span className="font-semibold text-sm">{`${score}/100`}</span>
      </div>
    </div>
  );
};

/**
 * Returns an SVG arc path string.
 * startAngle and endAngle are in degrees (0 = right, clockwise).
 */
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

export default ScoreGauge;