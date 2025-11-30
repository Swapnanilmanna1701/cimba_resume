import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

function FileUpload({ file, onFileChange }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0]);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const removeFile = (e) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Resume (PDF or TXT)
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : file 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
          }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-center space-x-3">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ) : (
          <>
            <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-indigo-500' : 'text-gray-400'}`} />
            <p className="text-gray-600">
              {isDragActive
                ? 'Drop your resume here...'
                : 'Drag and drop your resume, or click to browse'}
            </p>
            <p className="text-sm text-gray-400 mt-2">PDF or TXT up to 10MB</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
