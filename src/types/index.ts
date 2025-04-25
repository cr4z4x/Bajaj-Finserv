export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string | null;
  doctor_introduction: string;
  specialities: Array<{ name: string }>;
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export type ConsultationMode = 'Video Consult' | 'In Clinic';

export type SortOption = 'fees' | 'experience';

export interface FilterState {
  searchTerm: string;
  consultationMode: ConsultationMode | null;
  specialties: string[];
  sortBy: SortOption | null;
}