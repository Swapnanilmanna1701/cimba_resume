import { Lightbulb, CheckCircle } from 'lucide-react';

function SuggestionsList({ suggestions }) {
  return (
    <div className="w-full">
      <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <span>Improvement Suggestions</span>
      </h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionsList;
