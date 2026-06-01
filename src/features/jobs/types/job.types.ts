export interface Job {
  id: number;
  demand_id: number;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  employment_type: string;
  experience_level: string;
  work_mode: string;
  location_city: string;
  location_state: string;
  location_country: string;
  department: string;
  job_category: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  show_salary: boolean;
  posting_status: string;
  meta_title: string;
  meta_description: string;
  published_at: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface JobFilters {
  search?: string;
  work_mode?: string;
  experience_level?: string;
  employment_type?: string;
  department?: string;
  sort?: 'latest' | 'salary_high' | 'salary_low' | 'az';
}

export interface Application {
  id: string;
  jobId: number;
  jobTitle: string;
  jobSlug: string;
  department: string;
  location: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Technical Interview' | 'Offer' | 'Rejected';
  nextStep?: string;
}

export interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  experienceYears: string;
  skills: string[];
  resumeFile?: File;
  gdprConsent: boolean;
  futureOpportunities: boolean;
}

export interface CandidateProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  professionalTitle: string;
  resumeFileName?: string;
  skills: string[];
  preferredLocations: string[];
  salaryExpectation: string;
  workMode: string;
  smartJobAlerts: boolean;
  applicationStatusUpdates: boolean;
  employerMessaging: boolean;
}
