interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let styles = "";
  let label = "";

  if (score > 70) {
    styles = "bg-green-100 text-green-700 border-green-200";
    label = "Strong";
  } else if (score > 49) {
    styles = "bg-yellow-100 text-yellow-700 border-yellow-200";
    label = "Good Start";
  } else {
    styles = "bg-red-100 text-red-700 border-red-200";
    label = "Needs Work";
  }

  return (
    <div className={`px-3 py-1 rounded-full border w-fit font-medium text-xs animate-in fade-in duration-500 ${styles}`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;