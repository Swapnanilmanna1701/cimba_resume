import { FileText, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Resume Reviewer</span>
          </Link>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Analyze
            </Link>
            <Link
              to="/history"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/history'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
