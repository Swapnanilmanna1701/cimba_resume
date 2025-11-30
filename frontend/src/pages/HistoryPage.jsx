import { useState, useEffect } from 'react';
import { History, RefreshCw, X } from 'lucide-react';
import HistoryCard from '../components/HistoryCard';
import AnalysisResult from '../components/AnalysisResult';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllAnalyses } from '../services/api';

function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const fetchAnalyses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAnalyses();
      setAnalyses(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load analysis history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  if (selectedAnalysis) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedAnalysis(null)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Back to History</span>
        </button>
        <AnalysisResult result={selectedAnalysis} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <History className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        </div>
        <button
          onClick={fetchAnalyses}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading history..." />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalyses}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : analyses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No analyses yet</h2>
          <p className="text-gray-500">
            Your resume analysis history will appear here
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <HistoryCard
              key={analysis.id}
              analysis={analysis}
              onClick={() => setSelectedAnalysis(analysis)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
