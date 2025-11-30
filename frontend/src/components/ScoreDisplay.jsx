function ScoreDisplay({ score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-yellow-600';
    if (score >= 40) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`${getScoreBackground(score).includes('green') ? 'text-green-400' : getScoreBackground(score).includes('yellow') ? 'text-yellow-400' : getScoreBackground(score).includes('orange') ? 'text-orange-400' : 'text-red-400'}`} stopColor="currentColor" />
              <stop offset="100%" className={`${getScoreBackground(score).includes('green') ? 'text-green-600' : getScoreBackground(score).includes('yellow') ? 'text-yellow-600' : getScoreBackground(score).includes('orange') ? 'text-orange-600' : 'text-red-600'}`} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
      </div>
      <p className={`mt-4 text-lg font-semibold ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </p>
    </div>
  );
}

export default ScoreDisplay;
