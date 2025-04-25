import React from 'react';
import { ConsultationMode, SortOption } from '../types';
import { ArrowDownAZ, ArrowUpZA, Check } from 'lucide-react';

interface FilterPanelProps {
  specialties: string[];
  filterState: {
    consultationMode: ConsultationMode | null;
    specialties: string[];
    sortBy: SortOption | null;
  };
  onConsultationModeChange: (mode: ConsultationMode | null) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  filterState,
  onConsultationModeChange,
  onSpecialtyChange,
  onSortChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="space-y-6">
        {/* Consultation Mode */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Consultation Mode</h3>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                data-testid="filter-video-consult"
                type="radio"
                className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                checked={filterState.consultationMode === 'Video Consult'}
                onChange={() => onConsultationModeChange('Video Consult')}
              />
              <span className="ml-2 text-gray-700">Video Consult</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                data-testid="filter-in-clinic"
                type="radio"
                className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                checked={filterState.consultationMode === 'In Clinic'}
                onChange={() => onConsultationModeChange('In Clinic')}
              />
              <span className="ml-2 text-gray-700">In Clinic</span>
            </label>
            
            {filterState.consultationMode && (
              <button 
                className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                onClick={() => onConsultationModeChange(null)}
              >
                Clear selection
              </button>
            )}
          </div>
        </div>
        
        {/* Specialties */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Specialties</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {specialties.map((specialty) => (
              <label key={specialty} className="inline-flex items-center w-full">
                <input
                  data-testid={`filter-specialty-${specialty}`}
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  checked={filterState.specialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                />
                <span className="ml-2 text-gray-700">{specialty}</span>
              </label>
            ))}
            
            {filterState.specialties.length > 0 && (
              <button 
                className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                onClick={() => {
                  filterState.specialties.forEach(specialty => {
                    onSpecialtyChange(specialty);
                  });
                }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        
        {/* Sorting */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Sort By</h3>
          <div className="space-y-2">
            <button
              data-testid="sort-fees"
              className={`inline-flex items-center px-3 py-2 border rounded-md text-sm w-full ${
                filterState.sortBy === 'fees'
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSortChange('fees')}
            >
              <ArrowUpZA size={16} className="mr-2" />
              Fees (Low to High)
              {filterState.sortBy === 'fees' && (
                <Check size={16} className="ml-auto" />
              )}
            </button>
            
            <button
              data-testid="sort-experience"
              className={`inline-flex items-center px-3 py-2 border rounded-md text-sm w-full ${
                filterState.sortBy === 'experience'
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSortChange('experience')}
            >
              <ArrowDownAZ size={16} className="mr-2" />
              Experience (High to Low)
              {filterState.sortBy === 'experience' && (
                <Check size={16} className="ml-auto" />
              )}
            </button>
            
            {filterState.sortBy && (
              <button 
                className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                onClick={() => {
                  // Reset sort by using same handler, will toggle it off
                  onSortChange(filterState.sortBy as SortOption);
                }}
              >
                Clear sorting
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;