import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
      <SearchX size={48} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h2>
      <p className="text-gray-600 mb-6">We couldn't find any doctors matching your search criteria.</p>
      <button 
        onClick={onReset}
        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default EmptyState;