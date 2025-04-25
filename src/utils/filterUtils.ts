import { Doctor, FilterState } from '../types';

export const getUniqueSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialities.forEach(specialty => {
      specialtiesSet.add(specialty.name);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const filterDoctors = (doctors: Doctor[], filterState: FilterState): Doctor[] => {
  let filtered = [...doctors];
  
  // Filter by search term
  if (filterState.searchTerm) {
    const searchTermLower = filterState.searchTerm.toLowerCase();
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTermLower)
    );
  }
  
  // Filter by consultation mode
  if (filterState.consultationMode) {
    filtered = filtered.filter(doctor => {
      if (filterState.consultationMode === 'Video Consult') {
        return doctor.video_consult;
      } else {
        return doctor.in_clinic;
      }
    });
  }
  
  // Filter by specialties
  if (filterState.specialties.length > 0) {
    filtered = filtered.filter(doctor => 
      filterState.specialties.some(specialty => 
        doctor.specialities.some(s => s.name === specialty)
      )
    );
  }
  
  // Sort by selected option
  if (filterState.sortBy) {
    filtered.sort((a, b) => {
      if (filterState.sortBy === 'fees') {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB; // ascending
      } else if (filterState.sortBy === 'experience') {
        const expA = parseInt(a.experience);
        const expB = parseInt(b.experience);
        return expB - expA; // descending
      }
      return 0;
    });
  }
  
  return filtered;
};

export const getNameSuggestions = (doctors: Doctor[], searchTerm: string): string[] => {
  if (!searchTerm) return [];
  
  const searchTermLower = searchTerm.toLowerCase();
  const matches = doctors
    .filter(doctor => doctor.name.toLowerCase().includes(searchTermLower))
    .map(doctor => doctor.name);
  
  // Return up to 3 unique suggestions
  return Array.from(new Set(matches)).slice(0, 3);
};