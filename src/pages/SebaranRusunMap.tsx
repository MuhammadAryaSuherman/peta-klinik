import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeft, Building2, MapPin, Users, Calendar, Phone, Mail, ExternalLink, Search, Filter } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: 16px; height: 16px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface Rusun {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  units: number;
  floors: number;
  yearBuilt: number;
  status: 'aktif' | 'dalam-pembangunan' | 'renovasi';
  contact: {
    phone: string;
    email: string;
  };
  description: string;
}

// Mock data for rusun locations
const rusunData: Record<string, Rusun[]> = {
  'medan': [
    {
      id: '1',
      name: 'Rusunawa Helvetia',
      address: 'Jl. Helvetia Raya No. 50, Medan Helvetia',
      lat: 3.5952,
      lng: 98.6523,
      units: 150,
      floors: 5,
      yearBuilt: 2018,
      status: 'aktif',
      contact: { phone: '(061) 123-4567', email: 'helvetia@bp3kp.go.id' },
      description: 'Rusun untuk masyarakat berpenghasilan rendah di kawasan Helvetia.',
    },
    {
      id: '2',
      name: 'Rusunawa Martubung',
      address: 'Jl. Martubung No. 25, Medan Labuhan',
      lat: 3.7283,
      lng: 98.6789,
      units: 200,
      floors: 6,
      yearBuilt: 2020,
      status: 'aktif',
      contact: { phone: '(061) 234-5678', email: 'martubung@bp3kp.go.id' },
      description: 'Rusun modern dengan fasilitas lengkap untuk nelayan dan pekerja pelabuhan.',
    },
    {
      id: '3',
      name: 'Rusunawa Amplas',
      address: 'Jl. Amplas No. 100, Medan Amplas',
      lat: 3.5452,
      lng: 98.7123,
      units: 120,
      floors: 4,
      yearBuilt: 2019,
      status: 'aktif',
      contact: { phone: '(061) 345-6789', email: 'amplas@bp3kp.go.id' },
      description: 'Rusun yang diperuntukkan bagi mahasiswa dan pekerja muda.',
    },
    {
      id: '4',
      name: 'Rusunawa Belawan',
      address: 'Jl. Pelabuhan No. 15, Medan Belawan',
      lat: 3.7852,
      lng: 98.6845,
      units: 180,
      floors: 5,
      yearBuilt: 2021,
      status: 'dalam-pembangunan',
      contact: { phone: '(061) 456-7890', email: 'belawan@bp3kp.go.id' },
      description: 'Rusun baru yang sedang dalam tahap pembangunan di kawasan pelabuhan.',
    },
    {
      id: '5',
      name: 'Rusunawa Polonia',
      address: 'Jl. Polonia No. 88, Medan Polonia',
      lat: 3.5589,
      lng: 98.6834,
      units: 100,
      floors: 4,
      yearBuilt: 2017,
      status: 'renovasi',
      contact: { phone: '(061) 567-8901', email: 'polonia@bp3kp.go.id' },
      description: 'Rusun yang sedang dalam proses renovasi dan peningkatan fasilitas.',
    },
  ],
  'sumatera-utara': [
    {
      id: '6',
      name: 'Rusunawa Binjai',
      address: 'Jl. Soekarno-Hatta No. 20, Binjai',
      lat: 3.6003,
      lng: 98.4853,
      units: 160,
      floors: 5,
      yearBuilt: 2019,
      status: 'aktif',
      contact: { phone: '(061) 678-9012', email: 'binjai@bp3kp.go.id' },
      description: 'Rusun untuk masyarakat Kota Binjai dan sekitarnya.',
    },
    {
      id: '7',
      name: 'Rusunawa Tebing Tinggi',
      address: 'Jl. Ahmad Yani No. 50, Tebing Tinggi',
      lat: 3.3289,
      lng: 99.1617,
      units: 100,
      floors: 4,
      yearBuilt: 2020,
      status: 'aktif',
      contact: { phone: '(0621) 123-456', email: 'tebingtinggi@bp3kp.go.id' },
      description: 'Rusun untuk pekerja dan masyarakat Kota Tebing Tinggi.',
    },
    {
      id: '8',
      name: 'Rusunawa Pematang Siantar',
      address: 'Jl. Merdeka No. 75, Pematang Siantar',
      lat: 2.9595,
      lng: 99.0687,
      units: 140,
      floors: 5,
      yearBuilt: 2018,
      status: 'aktif',
      contact: { phone: '(0622) 234-567', email: 'siantar@bp3kp.go.id' },
      description: 'Rusun di pusat Kota Pematang Siantar dengan akses mudah.',
    },
  ],
};

const regionCenters: Record<string, { lat: number; lng: number; zoom: number; name: string }> = {
  'medan': { lat: 3.5952, lng: 98.6722, zoom: 12, name: 'Kota Medan' },
  'sumatera-utara': { lat: 3.3000, lng: 99.0000, zoom: 8, name: 'Sumatera Utara' },
};

const statusColors: Record<string, string> = {
  'aktif': '#10b981',
  'dalam-pembangunan': '#f59e0b',
  'renovasi': '#6366f1',
};

const statusLabels: Record<string, string> = {
  'aktif': 'Aktif',
  'dalam-pembangunan': 'Dalam Pembangunan',
  'renovasi': 'Renovasi',
};

const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const SebaranRusunMap = () => {
  const { region } = useParams<{ region: string }>();
  const [selectedRusun, setSelectedRusun] = useState<Rusun | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const regionData = region && regionCenters[region] ? regionCenters[region] : regionCenters['medan'];
  const rusunList = region && rusunData[region] ? rusunData[region] : rusunData['medan'];

  const filteredRusun = useMemo(() => {
    return rusunList.filter((rusun) => {
      const matchesSearch = !searchQuery || 
        rusun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rusun.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || rusun.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rusunList, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 lg:pt-24">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <p className="text-sm text-muted-foreground">Sebaran Rusun</p>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">{regionData.name}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="stat-badge">
                  <Building2 className="w-4 h-4" />
                  <span>{filteredRusun.length} Rusun</span>
                </div>
                <div className="stat-badge">
                  <Users className="w-4 h-4" />
                  <span>{filteredRusun.reduce((acc, r) => acc + r.units, 0)} Unit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
          {/* Sidebar */}
          <div className="w-full lg:w-96 bg-card border-r border-border overflow-y-auto">
            {/* Search & Filter */}
            <div className="p-4 border-b border-border space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari rusun..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setStatusFilter(null)}
                  className={`filter-chip ${!statusFilter ? 'filter-chip-active' : ''}`}
                >
                  Semua
                </button>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter(statusFilter === key ? null : key)}
                    className={`filter-chip ${statusFilter === key ? 'filter-chip-active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rusun List */}
            <div className="p-4 space-y-3">
              {filteredRusun.map((rusun) => (
                <div
                  key={rusun.id}
                  onClick={() => setSelectedRusun(rusun)}
                  className={`clinic-card ${selectedRusun?.id === rusun.id ? 'clinic-card-active' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{rusun.name}</h3>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        <MapPin className="w-3.5 h-3.5 inline mr-1" />
                        {rusun.address}
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-md text-white flex-shrink-0"
                      style={{ backgroundColor: statusColors[rusun.status] }}
                    >
                      {statusLabels[rusun.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {rusun.units} Unit
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {rusun.floors} Lantai
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {rusun.yearBuilt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              center={[regionData.lat, regionData.lng]}
              zoom={regionData.zoom}
              className="w-full h-full"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={[regionData.lat, regionData.lng]} zoom={regionData.zoom} />
              
              {filteredRusun.map((rusun) => (
                <Marker
                  key={rusun.id}
                  position={[rusun.lat, rusun.lng]}
                  icon={createCustomIcon(statusColors[rusun.status])}
                  eventHandlers={{
                    click: () => setSelectedRusun(rusun),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[250px]">
                      <h3 className="font-bold text-foreground text-lg mb-2">{rusun.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{rusun.address}</p>
                      
                      <div className="flex gap-2 mb-3">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-md text-white"
                          style={{ backgroundColor: statusColors[rusun.status] }}
                        >
                          {statusLabels[rusun.status]}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center mb-3">
                        <div className="p-2 bg-secondary rounded-lg">
                          <p className="text-lg font-bold text-primary">{rusun.units}</p>
                          <p className="text-xs text-muted-foreground">Unit</p>
                        </div>
                        <div className="p-2 bg-secondary rounded-lg">
                          <p className="text-lg font-bold text-primary">{rusun.floors}</p>
                          <p className="text-xs text-muted-foreground">Lantai</p>
                        </div>
                        <div className="p-2 bg-secondary rounded-lg">
                          <p className="text-lg font-bold text-primary">{rusun.yearBuilt}</p>
                          <p className="text-xs text-muted-foreground">Tahun</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{rusun.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <a href={`tel:${rusun.contact.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Phone className="w-4 h-4" />
                          {rusun.contact.phone}
                        </a>
                        <a href={`mailto:${rusun.contact.email}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Mail className="w-4 h-4" />
                          {rusun.contact.email}
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg z-[1000]">
              <h4 className="text-sm font-semibold text-foreground mb-3">Legenda</h4>
              <div className="space-y-2">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: statusColors[key] }}
                    />
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRusun && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedRusun(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-6 animate-slide-up max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">{selectedRusun.name}</h2>
              <button onClick={() => setSelectedRusun(null)} className="p-2 hover:bg-secondary rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-muted-foreground mb-4">{selectedRusun.address}</p>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-secondary rounded-xl text-center">
                <p className="text-2xl font-bold text-primary">{selectedRusun.units}</p>
                <p className="text-sm text-muted-foreground">Unit</p>
              </div>
              <div className="p-3 bg-secondary rounded-xl text-center">
                <p className="text-2xl font-bold text-primary">{selectedRusun.floors}</p>
                <p className="text-sm text-muted-foreground">Lantai</p>
              </div>
              <div className="p-3 bg-secondary rounded-xl text-center">
                <p className="text-2xl font-bold text-primary">{selectedRusun.yearBuilt}</p>
                <p className="text-sm text-muted-foreground">Tahun</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">{selectedRusun.description}</p>
            
            <div className="space-y-3">
              <a
                href={`tel:${selectedRusun.contact.phone}`}
                className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-primary/10 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>{selectedRusun.contact.phone}</span>
              </a>
              <a
                href={`mailto:${selectedRusun.contact.email}`}
                className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-primary/10 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>{selectedRusun.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SebaranRusunMap;
