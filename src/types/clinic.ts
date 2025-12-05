export interface Clinic {
  id: string;
  name: string;
  address: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  latitude: number;
  longitude: number;
  phone: string;
  email?: string;
  category: ClinicCategory;
  services: string[];
  operatingHours: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export type ClinicCategory = 
  | 'puskesmas'
  | 'klinik_pratama'
  | 'klinik_utama'
  | 'rumah_sakit'
  | 'balai_kesehatan'
  | 'posyandu';

export interface Province {
  id: string;
  name: string;
  clinicCount: number;
}

export interface City {
  id: string;
  name: string;
  provinceId: string;
  clinicCount: number;
}

export interface FilterState {
  search: string;
  provinceId: string | null;
  cityId: string | null;
  category: ClinicCategory | null;
}

export interface AuditLog {
  id: string;
  clinicId: string;
  action: 'created' | 'updated' | 'deleted';
  changes: Record<string, { old: string; new: string }>;
  userId: string;
  userName: string;
  timestamp: string;
}

export const CATEGORY_LABELS: Record<ClinicCategory, string> = {
  puskesmas: 'Puskesmas',
  klinik_pratama: 'Klinik Pratama',
  klinik_utama: 'Klinik Utama',
  rumah_sakit: 'Rumah Sakit',
  balai_kesehatan: 'Balai Kesehatan',
  posyandu: 'Posyandu',
};

export const CATEGORY_COLORS: Record<ClinicCategory, string> = {
  puskesmas: '#0d9488',
  klinik_pratama: '#0891b2',
  klinik_utama: '#6366f1',
  rumah_sakit: '#dc2626',
  balai_kesehatan: '#059669',
  posyandu: '#f59e0b',
};
