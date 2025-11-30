import { Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import ScoreDisplay from './ScoreDisplay';
import SuggestionsList from './SuggestionsList';

function AnalysisResult({ result }) {
  const downloadReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229);
    doc.text('AI Resume Analysis Report', pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 35, { align: 'center' });
    
    if (result.resumeFileName) {
      doc.text(`Resume: ${result.resumeFileName}`, pageWidth / 2, 42, { align: 'center' });
    }
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 50, pageWidth - 20, 50);
    
    doc.setFontSize(48);
    doc.setTextColor(result.matchScore >= 70 ? '#16a34a' : result.matchScore >= 50 ? '#ca8a04' : '#dc2626');
    doc.text(`${result.matchScore}%`, pageWidth / 2, 80, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Match Score', pageWidth / 2, 90, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Improvement Suggestions:', 20, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    
    let yPos = 125;
    result.suggestions.forEach((suggestion, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${suggestion}`, pageWidth - 40);
      lines.forEach(line => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 20, yPos);
        yPos += 7;
      });
      yPos += 5;
    });
    
    if (result.fullAnalysis) {
      yPos += 10;
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(79, 70, 229);
      doc.text('Overall Analysis:', 20, yPos);
      yPos += 15;
      
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      const analysisLines = doc.splitTextToSize(result.fullAnalysis, pageWidth - 40);
      analysisLines.forEach(line => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 20, yPos);
        yPos += 7;
      });
    }
    
    doc.save(`resume-analysis-${Date.now()}.pdf`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
        <button
          onClick={downloadReport}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </button>
      </div>
      
      {result.resumeFileName && (
        <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-50 rounded-lg">
          <FileText className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">{result.resumeFileName}</span>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <ScoreDisplay score={result.matchScore} />
        </div>
        
        <div>
          <SuggestionsList suggestions={result.suggestions} />
        </div>
      </div>
      
      {result.fullAnalysis && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Analysis</h3>
          <p className="text-gray-700 leading-relaxed">{result.fullAnalysis}</p>
        </div>
      )}
    </div>
  );
}

export default AnalysisResult;
