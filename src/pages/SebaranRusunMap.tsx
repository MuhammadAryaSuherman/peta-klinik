import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import { ArrowLeft, Building2, MapPin, Users, Calendar, Phone, Mail, Search, X, Layers } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

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

// Mock data for rusun locations in Medan
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
  'medan': { lat: 3.5952, lng: 98.6722, zoom: 11, name: 'Kota Medan' },
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

const SebaranRusunMap = () => {
  const { region } = useParams<{ region: string }>();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedRusun, setSelectedRusun] = useState<Rusun | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapReady, setMapReady] = useState(false);

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

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapRef.current, {
      center: [regionData.lat, regionData.lng],
      zoom: regionData.zoom,
      zoomControl: true,
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add markers when map is ready and data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for filtered rusun
    filteredRusun.forEach((rusun) => {
      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${statusColors[rusun.status]};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg style="transform: rotate(45deg); width: 14px; height: 14px;" viewBox="0 0 24 24" fill="white">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([rusun.lat, rusun.lng], { icon: customIcon }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 240px; font-family: system-ui, sans-serif;">
          <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${rusun.name}</h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${rusun.address}</p>
          
          <span style="
            display: inline-block;
            padding: 2px 8px;
            font-size: 10px;
            font-weight: 500;
            border-radius: 4px;
            color: white;
            background: ${statusColors[rusun.status]};
            margin-bottom: 8px;
          ">${statusLabels[rusun.status]}</span>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
            <div style="padding: 8px; background: #f3f4f6; border-radius: 6px; text-align: center;">
              <p style="font-size: 16px; font-weight: bold; color: #0d9488;">${rusun.units}</p>
              <p style="font-size: 10px; color: #666;">Unit</p>
            </div>
            <div style="padding: 8px; background: #f3f4f6; border-radius: 6px; text-align: center;">
              <p style="font-size: 16px; font-weight: bold; color: #0d9488;">${rusun.floors}</p>
              <p style="font-size: 10px; color: #666;">Lantai</p>
            </div>
            <div style="padding: 8px; background: #f3f4f6; border-radius: 6px; text-align: center;">
              <p style="font-size: 16px; font-weight: bold; color: #0d9488;">${rusun.yearBuilt}</p>
              <p style="font-size: 10px; color: #666;">Tahun</p>
            </div>
          </div>
          
          <p style="font-size: 12px; color: #666; margin-bottom: 12px;">${rusun.description}</p>
          
          <div style="font-size: 12px;">
            <a href="tel:${rusun.contact.phone}" style="display: flex; align-items: center; gap: 6px; color: #0d9488; text-decoration: none; margin-bottom: 4px;">
              📞 ${rusun.contact.phone}
            </a>
            <a href="mailto:${rusun.contact.email}" style="display: flex; align-items: center; gap: 6px; color: #0d9488; text-decoration: none;">
              ✉️ ${rusun.contact.email}
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      marker.on('click', () => {
        setSelectedRusun(rusun);
      });
    });

  }, [filteredRusun, mapReady]);

  // Update map view when region changes
  useEffect(() => {
    if (mapInstanceRef.current && mapReady) {
      mapInstanceRef.current.setView([regionData.lat, regionData.lng], regionData.zoom);
    }
  }, [regionData, mapReady]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col pt-16 lg:pt-20">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-muted-foreground">Sebaran Rusun</p>
                <h1 className="text-lg font-bold text-foreground">{regionData.name}</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="stat-badge">
                <Building2 className="w-4 h-4" />
                <span>{filteredRusun.length} Rusun</span>
              </div>
              <div className="stat-badge">
                <Users className="w-4 h-4" />
                <span>{filteredRusun.reduce((acc, r) => acc + r.units, 0)} Unit</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg"
              >
                <Layers className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            absolute lg:relative z-20 h-full w-80 lg:w-96 bg-card border-r border-border 
            transition-transform duration-300 flex flex-col
          `}>
            {/* Search & Filter */}
            <div className="p-4 border-b border-border space-y-3 flex-shrink-0">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredRusun.map((rusun) => (
                <div
                  key={rusun.id}
                  onClick={() => {
                    setSelectedRusun(rusun);
                    setSidebarOpen(false);
                    // Pan to marker
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([rusun.lat, rusun.lng], 14);
                    }
                  }}
                  className={`clinic-card ${selectedRusun?.id === rusun.id ? 'clinic-card-active' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm truncate">{rusun.name}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {rusun.address}
                      </p>
                    </div>
                    <span
                      className="px-2 py-0.5 text-[10px] font-medium rounded text-white flex-shrink-0"
                      style={{ backgroundColor: statusColors[rusun.status] }}
                    >
                      {statusLabels[rusun.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {rusun.units} Unit
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {rusun.floors} Lantai
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {rusun.yearBuilt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative z-10">
            <div ref={mapRef} className="w-full h-full" />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg z-[1000]">
              <h4 className="text-xs font-semibold text-foreground mb-2">Legenda</h4>
              <div className="space-y-1.5">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: statusColors[key] }}
                    />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Sidebar Toggle */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg z-[1000]"
              >
                <Layers className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SebaranRusunMap;
