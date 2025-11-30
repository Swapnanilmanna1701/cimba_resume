import { Loader2 } from 'lucide-react';

function LoadingSpinner({ message = 'Analyzing your resume...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
      <p className="mt-2 text-gray-400 text-sm">This may take a few moments</p>
    </div>
  );
}

export default LoadingSpinner;
