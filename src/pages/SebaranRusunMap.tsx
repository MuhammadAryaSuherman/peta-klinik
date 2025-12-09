import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import { ArrowLeft, Building2, MapPin, Users, Search, X, Layers } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

interface Rusun {
  id: string;
  name: string;
  kabupatenKota: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  lat: number;
  lng: number;
  tower: number;
  tipe: string;
  lantai: number;
  unit: number;
}

// Mock data for rusun locations
const rusunData: Record<string, Rusun[]> = {
  'medan': [
    {
      id: '1',
      name: 'Rusun Kejaksaan Tinggi',
      kabupatenKota: 'Medan',
      kecamatan: 'Medan Barat',
      kelurahan: 'Sei Agul',
      address: 'Jl. Karya Rakyat',
      lat: 3.6065,
      lng: 98.6624,
      tower: 1,
      tipe: 'Wisma Suralaya 36',
      lantai: 2,
      unit: 16,
    },
  ],
  'sumatera-utara': [
    {
      id: '2',
      name: 'Rusunawa Binjai',
      kabupatenKota: 'Binjai',
      kecamatan: 'Binjai Utara',
      kelurahan: 'Jati Karya',
      address: 'Jl. Soekarno-Hatta No. 20',
      lat: 3.6003,
      lng: 98.4853,
      tower: 2,
      tipe: 'Tipe 36',
      lantai: 5,
      unit: 160,
    },
  ],
};

const regionCenters: Record<string, { lat: number; lng: number; zoom: number; name: string }> = {
  'medan': { lat: 3.5952, lng: 98.6722, zoom: 11, name: 'Kota Medan' },
  'sumatera-utara': { lat: 3.3000, lng: 99.0000, zoom: 8, name: 'Sumatera Utara' },
};

const SebaranRusunMap = () => {
  const { region } = useParams<{ region: string }>();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedRusun, setSelectedRusun] = useState<Rusun | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  
  // Filters
  const [filterKabKota, setFilterKabKota] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState('');
  const [filterKelurahan, setFilterKelurahan] = useState('');

  const regionData = region && regionCenters[region] ? regionCenters[region] : regionCenters['medan'];
  const rusunList = region && rusunData[region] ? rusunData[region] : rusunData['medan'];

  // Get unique filter options
  const kabKotaOptions = useMemo(() => [...new Set(rusunList.map(r => r.kabupatenKota))], [rusunList]);
  const kecamatanOptions = useMemo(() => {
    const filtered = filterKabKota ? rusunList.filter(r => r.kabupatenKota === filterKabKota) : rusunList;
    return [...new Set(filtered.map(r => r.kecamatan))];
  }, [rusunList, filterKabKota]);
  const kelurahanOptions = useMemo(() => {
    let filtered = rusunList;
    if (filterKabKota) filtered = filtered.filter(r => r.kabupatenKota === filterKabKota);
    if (filterKecamatan) filtered = filtered.filter(r => r.kecamatan === filterKecamatan);
    return [...new Set(filtered.map(r => r.kelurahan))];
  }, [rusunList, filterKabKota, filterKecamatan]);

  const filteredRusun = useMemo(() => {
    return rusunList.filter((rusun) => {
      const matchesSearch = !searchQuery || 
        rusun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rusun.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKabKota = !filterKabKota || rusun.kabupatenKota === filterKabKota;
      const matchesKecamatan = !filterKecamatan || rusun.kecamatan === filterKecamatan;
      const matchesKelurahan = !filterKelurahan || rusun.kelurahan === filterKelurahan;
      return matchesSearch && matchesKabKota && matchesKecamatan && matchesKelurahan;
    });
  }, [rusunList, searchQuery, filterKabKota, filterKecamatan, filterKelurahan]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [regionData.lat, regionData.lng],
      zoom: regionData.zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    const map = mapInstanceRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    filteredRusun.forEach((rusun) => {
      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: hsl(189, 78%, 25%);
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

      const popupContent = `
        <div style="min-width: 280px; font-family: system-ui, sans-serif; padding: 4px;">
          <h3 style="font-weight: bold; font-size: 15px; margin-bottom: 8px; color: #0E5B73;">${rusun.name}</h3>
          
          <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; color: #666;">Kabupaten/Kota</td><td style="padding: 4px 0; font-weight: 500;">${rusun.kabupatenKota}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Kecamatan</td><td style="padding: 4px 0; font-weight: 500;">${rusun.kecamatan}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Kelurahan</td><td style="padding: 4px 0; font-weight: 500;">${rusun.kelurahan}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Alamat</td><td style="padding: 4px 0; font-weight: 500;">${rusun.address}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Koordinat</td><td style="padding: 4px 0; font-weight: 500;">${rusun.lat.toFixed(4)}N; ${rusun.lng.toFixed(4)}E</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Tower</td><td style="padding: 4px 0; font-weight: 500;">${rusun.tower}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Tipe</td><td style="padding: 4px 0; font-weight: 500;">${rusun.tipe}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Lantai</td><td style="padding: 4px 0; font-weight: 500;">${rusun.lantai}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Unit</td><td style="padding: 4px 0; font-weight: 500;">${rusun.unit}</td></tr>
          </table>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 320 });

      marker.on('click', () => {
        setSelectedRusun(rusun);
      });
    });

  }, [filteredRusun, mapReady]);

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
              <Link to="/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
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
                <span>{filteredRusun.reduce((acc, r) => acc + r.unit, 0)} Unit</span>
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-secondary rounded-lg">
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
              
              {/* Filter Dropdowns */}
              <select
                value={filterKabKota}
                onChange={(e) => { setFilterKabKota(e.target.value); setFilterKecamatan(''); setFilterKelurahan(''); }}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Semua Kabupaten/Kota</option>
                {kabKotaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              
              <select
                value={filterKecamatan}
                onChange={(e) => { setFilterKecamatan(e.target.value); setFilterKelurahan(''); }}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Semua Kecamatan</option>
                {kecamatanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              
              <select
                value={filterKelurahan}
                onChange={(e) => setFilterKelurahan(e.target.value)}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Semua Kelurahan</option>
                {kelurahanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Rusun List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredRusun.map((rusun) => (
                <div
                  key={rusun.id}
                  onClick={() => {
                    setSelectedRusun(rusun);
                    setSidebarOpen(false);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([rusun.lat, rusun.lng], 14);
                    }
                  }}
                  className={`clinic-card ${selectedRusun?.id === rusun.id ? 'clinic-card-active' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">{rusun.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {rusun.kelurahan}, {rusun.kecamatan}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{rusun.unit} Unit</span>
                    <span>{rusun.lantai} Lantai</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative z-10">
            <div ref={mapRef} className="w-full h-full" />

            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg z-[1000]">
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
