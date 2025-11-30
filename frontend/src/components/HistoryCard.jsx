import { FileText, Calendar, TrendingUp } from 'lucide-react';

function HistoryCard({ analysis, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-700';
    if (score >= 60) return 'bg-yellow-100 text-yellow-700';
    if (score >= 40) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 truncate max-w-[200px]">
              {analysis.resumeFileName || 'Resume'}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(analysis.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.matchScore)}`}>
          {analysis.matchScore}%
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="h-4 w-4" />
          <span>{analysis.suggestions?.length || 0} suggestions available</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
