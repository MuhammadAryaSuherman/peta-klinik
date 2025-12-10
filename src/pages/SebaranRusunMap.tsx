import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import { ArrowLeft, Building2, MapPin, Users, Layers, Search } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Rusun {
  id: string;
  name: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  lat: number;
  lng: number;
  units: number;
  tower: number;
  type: string;
  floors: number;
  yearBuilt: number;
  yearHandover: number;
  unitsFilled: number;
  contractor: string;
}

// Only 1 data as requested
const rusunData: Rusun[] = [
  {
    id: '1',
    name: 'Rusun Kejaksaan Tinggi',
    kabupaten: 'Medan',
    kecamatan: 'Medan Barat',
    kelurahan: 'Sei Agul',
    address: 'Jl. Karya Rakyat',
    lat: 3.6065,
    lng: 98.6624,
    units: 16,
    tower: 1,
    type: 'Wisma Suralaya 36',
    floors: 2,
    yearBuilt: 2016,
    yearHandover: 2020,
    unitsFilled: 16,
    contractor: 'PT. Hagitasinar Lestarimegah',
  },
];

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
  const [kabupatenFilter, setKabupatenFilter] = useState<string>('all');
  const [kecamatanFilter, setKecamatanFilter] = useState<string>('all');
  const [kelurahanFilter, setKelurahanFilter] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const regionData = region && regionCenters[region] ? regionCenters[region] : regionCenters['medan'];

  const kabupatenList = useMemo(() => [...new Set(rusunData.map(r => r.kabupaten))], []);
  const kecamatanList = useMemo(() => {
    const filtered = kabupatenFilter === 'all' ? rusunData : rusunData.filter(r => r.kabupaten === kabupatenFilter);
    return [...new Set(filtered.map(r => r.kecamatan))];
  }, [kabupatenFilter]);
  const kelurahanList = useMemo(() => {
    let filtered = rusunData;
    if (kabupatenFilter !== 'all') filtered = filtered.filter(r => r.kabupaten === kabupatenFilter);
    if (kecamatanFilter !== 'all') filtered = filtered.filter(r => r.kecamatan === kecamatanFilter);
    return [...new Set(filtered.map(r => r.kelurahan))];
  }, [kabupatenFilter, kecamatanFilter]);

  const filteredRusun = useMemo(() => {
    return rusunData.filter((rusun) => {
      const matchesSearch = !searchQuery || 
        rusun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rusun.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKabupaten = kabupatenFilter === 'all' || rusun.kabupaten === kabupatenFilter;
      const matchesKecamatan = kecamatanFilter === 'all' || rusun.kecamatan === kecamatanFilter;
      const matchesKelurahan = kelurahanFilter === 'all' || rusun.kelurahan === kelurahanFilter;
      return matchesSearch && matchesKabupaten && matchesKecamatan && matchesKelurahan;
    });
  }, [searchQuery, kabupatenFilter, kecamatanFilter, kelurahanFilter]);

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

  // Add markers when map is ready
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
            background: hsl(191, 79%, 25%);
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
        <div style="min-width: 300px; font-family: system-ui, sans-serif;">
          <div style="background: linear-gradient(135deg, hsl(191, 79%, 25%), hsl(195, 85%, 21%)); color: white; padding: 12px 16px; margin: -8px -8px 12px -8px; border-radius: 4px 4px 0 0;">
            <h3 style="font-weight: bold; font-size: 14px; margin: 0;">${rusun.name}</h3>
          </div>
          <div style="padding: 0 8px 8px 8px; font-size: 12px; color: #64748b;">
            <p style="margin-bottom: 8px;"><strong style="color: #1e293b;">Alamat:</strong> ${rusun.address}, Kel. ${rusun.kelurahan}, Kec. ${rusun.kecamatan}, ${rusun.kabupaten}</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
              <div><strong style="color: #1e293b;">Jumlah Unit:</strong> ${rusun.units}</div>
              <div><strong style="color: #1e293b;">Jumlah Tower:</strong> ${rusun.tower}</div>
              <div><strong style="color: #1e293b;">Jumlah Lantai:</strong> ${rusun.floors}</div>
              <div><strong style="color: #1e293b;">Tipe:</strong> ${rusun.type}</div>
              <div><strong style="color: #1e293b;">Tahun Pembangunan:</strong> ${rusun.yearBuilt}</div>
              <div><strong style="color: #1e293b;">Tahun Serah Terima:</strong> ${rusun.yearHandover}</div>
              <div><strong style="color: #1e293b;">Unit Terisi:</strong> ${rusun.unitsFilled} / ${rusun.units}</div>
            </div>
            <p style="margin-top: 8px;"><strong style="color: #1e293b;">Kontraktor:</strong> ${rusun.contractor}</p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 350 });

      marker.on('mouseover', function() {
        this.openPopup();
      });

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
                <span>{filteredRusun.reduce((acc, r) => acc + r.units, 0)} Unit</span>
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
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} absolute lg:relative z-20 h-full w-80 lg:w-96 bg-card border-r border-border transition-transform duration-300 flex flex-col`}>
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
              
              <Select value={kabupatenFilter} onValueChange={(v) => { setKabupatenFilter(v); setKecamatanFilter('all'); setKelurahanFilter('all'); }}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Kabupaten/Kota" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kabupaten/Kota</SelectItem>
                  {kabupatenList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
              
              <Select value={kecamatanFilter} onValueChange={(v) => { setKecamatanFilter(v); setKelurahanFilter('all'); }}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Kecamatan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kecamatan</SelectItem>
                  {kecamatanList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
              
              <Select value={kelurahanFilter} onValueChange={setKelurahanFilter}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Kelurahan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelurahan</SelectItem>
                  {kelurahanList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
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
                  <h3 className="font-semibold text-foreground text-sm">{rusun.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {rusun.kelurahan}, {rusun.kecamatan}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{rusun.units} Unit</span>
                    <span>{rusun.floors} Lantai</span>
                  </div>
                </div>
              ))}
            </div>
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
