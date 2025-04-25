import { useEffect } from 'react';
import { ConsultationMode, FilterState, SortOption } from '../types';

export const useQueryParams = (
  filterState: FilterState,
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
) => {
  // Update URL when filter state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filterState.searchTerm) {
      params.set('search', filterState.searchTerm);
    }
    
    if (filterState.consultationMode) {
      params.set('mode', filterState.consultationMode);
    }
    
    if (filterState.specialties.length > 0) {
      params.set('specialties', filterState.specialties.join(','));
    }
    
    if (filterState.sortBy) {
      params.set('sort', filterState.sortBy);
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }, [filterState]);
  
  // Initialize filter state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const searchTerm = params.get('search') || '';
    const consultationMode = params.get('mode') as ConsultationMode | null;
    const specialties = params.get('specialties')?.split(',') || [];
    const sortBy = params.get('sort') as SortOption | null;
    
    setFilterState({
      searchTerm,
      consultationMode,
      specialties,
      sortBy
    });
  }, [setFilterState]);
};