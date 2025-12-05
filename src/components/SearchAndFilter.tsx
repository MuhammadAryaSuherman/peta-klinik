import { Search, MapPin, Building2, X, Filter } from 'lucide-react';
import { FilterState, Province, City, ClinicCategory, CATEGORY_LABELS } from '@/types/clinic';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  provinces: Province[];
  cities: City[];
  totalResults: number;
}

const categories: ClinicCategory[] = [
  'puskesmas',
  'klinik_pratama',
  'klinik_utama',
  'rumah_sakit',
  'balai_kesehatan',
  'posyandu',
];

const SearchAndFilter = ({
  filters,
  onFilterChange,
  provinces,
  cities,
  totalResults,
}: SearchAndFilterProps) => {
  const filteredCities = filters.provinceId
    ? cities.filter((c) => c.provinceId === filters.provinceId)
    : cities;

  const hasActiveFilters =
    filters.search || filters.provinceId || filters.cityId || filters.category;

  const clearFilters = () => {
    onFilterChange({
      search: '',
      provinceId: null,
      cityId: null,
      category: null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari nama klinik atau balai..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="search-input pl-10 pr-10"
        />
        {filters.search && (
          <button
            onClick={() => onFilterChange({ ...filters, search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Province Select */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <select
          value={filters.provinceId || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              provinceId: e.target.value || null,
              cityId: null,
            })
          }
          className="search-input pl-10 appearance-none cursor-pointer"
        >
          <option value="">Semua Provinsi</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name} ({province.clinicCount})
            </option>
          ))}
        </select>
      </div>

      {/* City Select */}
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <select
          value={filters.cityId || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, cityId: e.target.value || null })
          }
          className="search-input pl-10 appearance-none cursor-pointer"
          disabled={!filters.provinceId}
        >
          <option value="">Semua Kota/Kabupaten</option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name} ({city.clinicCount})
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Kategori</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  category: filters.category === category ? null : category,
                })
              }
              className={cn(
                'filter-chip',
                filters.category === category && 'filter-chip-active'
              )}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalResults}</span> hasil
          ditemukan
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
