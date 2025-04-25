import React, { useState, useEffect, useCallback } from 'react';
import { Doctor, FilterState, SortOption, ConsultationMode } from '../types';
import { fetchDoctors } from '../api';
import { filterDoctors, getUniqueSpecialties, getNameSuggestions } from '../utils/filterUtils';
import { useQueryParams } from '../hooks/useQueryParams';

import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: '',
    consultationMode: null,
    specialties: [],
    sortBy: null
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Connect to URL query params
  useQueryParams(filterState, setFilterState);
  
  // Fetch doctors data
  const loadDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctor information. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);
  
  // Update suggestions when search term changes
  useEffect(() => {
    if (doctors.length > 0) {
      const newSuggestions = getNameSuggestions(doctors, filterState.searchTerm);
      setSuggestions(newSuggestions);
    }
  }, [doctors, filterState.searchTerm]);
  
  // Apply filters to get filtered doctors
  const filteredDoctors = doctors.length > 0 ? filterDoctors(doctors, filterState) : [];
  
  // Get unique specialties for filter options
  const uniqueSpecialties = getUniqueSpecialties(doctors);
  
  // Handler functions
  const handleSearch = (term: string) => {
    setFilterState(prev => ({ ...prev, searchTerm: term }));
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setFilterState(prev => ({ ...prev, searchTerm: suggestion }));
  };
  
  const handleConsultationModeChange = (mode: ConsultationMode | null) => {
    setFilterState(prev => ({ 
      ...prev, 
      consultationMode: prev.consultationMode === mode ? null : mode 
    }));
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    setFilterState(prev => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty];
        
      return { ...prev, specialties };
    });
  };
  
  const handleSortChange = (sortOption: SortOption) => {
    setFilterState(prev => ({ 
      ...prev, 
      sortBy: prev.sortBy === sortOption ? null : sortOption 
    }));
  };
  
  const resetFilters = () => {
    setFilterState({
      searchTerm: '',
      consultationMode: null,
      specialties: [],
      sortBy: null
    });
  };
  
  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    
    if (error) {
      return <ErrorState message={error} onRetry={loadDoctors} />;
    }
    
    if (filteredDoctors.length === 0) {
      return <EmptyState onReset={resetFilters} />;
    }
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900">Find the Right Doctor</h1>
          <p className="mt-1 text-gray-600">Book appointments with top doctors in your area</p>
        </div>
        
        <div className="mt-6">
          <SearchBar 
            searchTerm={filterState.searchTerm}
            suggestions={suggestions}
            onSearch={handleSearch}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <FilterPanel 
              specialties={uniqueSpecialties}
              filterState={filterState}
              onConsultationModeChange={handleConsultationModeChange}
              onSpecialtyChange={handleSpecialtyChange}
              onSortChange={handleSortChange}
            />
          </div>
          
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
                </p>
                
                {(filterState.searchTerm || 
                   filterState.consultationMode || 
                   filterState.specialties.length > 0 || 
                   filterState.sortBy) && (
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;