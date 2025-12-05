import { cn } from '@/lib/utils';
import SearchAndFilter from './SearchAndFilter';
import ClinicList from './ClinicList';
import { FilterState, Clinic, Province, City } from '@/types/clinic';

interface SidebarProps {
  isOpen: boolean;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  provinces: Province[];
  cities: City[];
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  onClinicSelect: (clinic: Clinic) => void;
}

const Sidebar = ({
  isOpen,
  filters,
  onFilterChange,
  provinces,
  cities,
  clinics,
  selectedClinic,
  onClinicSelect,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => onFilterChange(filters)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 w-full sm:w-96 bg-card border-r border-border z-30',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col p-4 overflow-hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Pencarian & Filter</h2>
            <p className="text-sm text-muted-foreground">
              Temukan fasilitas kesehatan terdekat
            </p>
          </div>
          
          <SearchAndFilter
            filters={filters}
            onFilterChange={onFilterChange}
            provinces={provinces}
            cities={cities}
            totalResults={clinics.length}
          />

          <div className="mt-6 flex-1 overflow-hidden">
            <h3 className="font-semibold mb-3">Daftar Fasilitas</h3>
            <ClinicList
              clinics={clinics}
              selectedClinic={selectedClinic}
              onClinicSelect={onClinicSelect}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
