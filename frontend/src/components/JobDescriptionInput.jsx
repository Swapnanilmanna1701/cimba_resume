import { Briefcase } from 'lucide-react';

function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-4 w-4" />
          <span>Job Description</span>
        </div>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all"
      />
      <p className="text-sm text-gray-400 mt-2">
        Include requirements, responsibilities, and desired skills
      </p>
    </div>
  );
}

export default JobDescriptionInput;
