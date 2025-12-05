import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ClinicMap from '@/components/ClinicMap';
import ClinicDetail from '@/components/ClinicDetail';
import MapLegend from '@/components/MapLegend';
import { clinics, provinces, cities } from '@/data/mockData';
import { FilterState, Clinic } from '@/types/clinic';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    provinceId: null,
    cityId: null,
    category: null,
  });

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const matchesSearch =
        !filters.search ||
        clinic.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        clinic.address.toLowerCase().includes(filters.search.toLowerCase());

      const matchesProvince =
        !filters.provinceId || clinic.provinceId === filters.provinceId;

      const matchesCity =
        !filters.cityId || clinic.cityId === filters.cityId;

      const matchesCategory =
        !filters.category || clinic.category === filters.category;

      return matchesSearch && matchesProvince && matchesCity && matchesCategory;
    });
  }, [filters]);

  const handleClinicSelect = useCallback((clinic: Clinic) => {
    setSelectedClinic(clinic);
    setShowDetail(true);
    setIsSidebarOpen(false);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setShowDetail(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        totalClinics={clinics.length}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        filters={filters}
        onFilterChange={setFilters}
        provinces={provinces}
        cities={cities}
        clinics={filteredClinics}
        selectedClinic={selectedClinic}
        onClinicSelect={handleClinicSelect}
      />

      {/* Main Map Area */}
      <main className="fixed top-16 left-0 lg:left-96 right-0 bottom-0">
        <ClinicMap
          clinics={filteredClinics}
          selectedClinic={selectedClinic}
          onClinicSelect={handleClinicSelect}
        />
        <MapLegend />
      </main>

      {/* Detail Modal */}
      {showDetail && selectedClinic && (
        <ClinicDetail clinic={selectedClinic} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Index;
