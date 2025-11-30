import { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AnalysisResult from '../components/AnalysisResult';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeResume } from '../services/api';

function HomePage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setError('Please upload a resume file');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await analyzeResume(resumeFile, jobDescription);
      setResult(response);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResumeFile(null);
    setJobDescription('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {!result ? (
        <>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Analyze Your Resume with AI
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your resume and job description to get an instant AI-powered analysis 
              with a match score and personalized improvement suggestions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FileUpload file={resumeFile} onFileChange={setResumeFile} />
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="mt-8">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                type="submit"
                disabled={!resumeFile || !jobDescription.trim()}
                className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg
                  hover:from-indigo-700 hover:to-purple-700 transition-all
                  disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Analyze Resume</span>
              </button>
            )}
          </form>
        </>
      ) : (
        <>
          <AnalysisResult result={result} />
          <div className="mt-6 text-center">
            <button
              onClick={handleNewAnalysis}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Analyze Another Resume
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
