import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { ArrowLeft, Gift, MapPin, Search, Layers, X, Users, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

interface DesaData {
  id: string;
  namaDesa: string;
  kabupatenKota: string;
  kecamatan: string;
  kelurahan: string;
  lat: number;
  lng: number;
  jumlahPenerima: number;
  tahun: number;
  status: 'selesai' | 'proses' | 'rencana';
}

const desaData: DesaData[] = [
  { id: '1', namaDesa: 'Desa Tanjung Rejo', kabupatenKota: 'Deli Serdang', kecamatan: 'Percut Sei Tuan', kelurahan: 'Tanjung Rejo', lat: 3.6234, lng: 98.7567, jumlahPenerima: 45, tahun: 2024, status: 'selesai' },
  { id: '2', namaDesa: 'Desa Medan Estate', kabupatenKota: 'Deli Serdang', kecamatan: 'Percut Sei Tuan', kelurahan: 'Medan Estate', lat: 3.6156, lng: 98.7234, jumlahPenerima: 32, tahun: 2024, status: 'proses' },
  { id: '3', namaDesa: 'Desa Sunggal', kabupatenKota: 'Deli Serdang', kecamatan: 'Sunggal', kelurahan: 'Sunggal', lat: 3.5789, lng: 98.5678, jumlahPenerima: 28, tahun: 2024, status: 'selesai' },
  { id: '4', namaDesa: 'Desa Helvetia', kabupatenKota: 'Deli Serdang', kecamatan: 'Labuhan Deli', kelurahan: 'Helvetia', lat: 3.6012, lng: 98.6234, jumlahPenerima: 55, tahun: 2024, status: 'proses' },
  { id: '5', namaDesa: 'Desa Amplas', kabupatenKota: 'Medan', kecamatan: 'Medan Amplas', kelurahan: 'Amplas', lat: 3.5452, lng: 98.7123, jumlahPenerima: 40, tahun: 2024, status: 'rencana' },
];

const statusColors: Record<string, string> = {
  'selesai': '#10b981',
  'proses': '#f59e0b',
  'rencana': '#6366f1',
};

const statusLabels: Record<string, string> = {
  'selesai': 'Selesai',
  'proses': 'Dalam Proses',
  'rencana': 'Rencana',
};

const PenerimaanBSPS = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [selectedDesa, setSelectedDesa] = useState<DesaData | null>(null);
  
  // Filters
  const [filterKabKota, setFilterKabKota] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState('');
  const [filterKelurahan, setFilterKelurahan] = useState('');

  // Get unique filter options
  const kabKotaOptions = useMemo(() => [...new Set(desaData.map(d => d.kabupatenKota))], []);
  const kecamatanOptions = useMemo(() => {
    const filtered = filterKabKota ? desaData.filter(d => d.kabupatenKota === filterKabKota) : desaData;
    return [...new Set(filtered.map(d => d.kecamatan))];
  }, [filterKabKota]);
  const kelurahanOptions = useMemo(() => {
    let filtered = desaData;
    if (filterKabKota) filtered = filtered.filter(d => d.kabupatenKota === filterKabKota);
    if (filterKecamatan) filtered = filtered.filter(d => d.kecamatan === filterKecamatan);
    return [...new Set(filtered.map(d => d.kelurahan))];
  }, [filterKabKota, filterKecamatan]);

  const filteredData = useMemo(() => {
    return desaData.filter((desa) => {
      const matchesSearch = !searchQuery || 
        desa.namaDesa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desa.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKabKota = !filterKabKota || desa.kabupatenKota === filterKabKota;
      const matchesKecamatan = !filterKecamatan || desa.kecamatan === filterKecamatan;
      const matchesKelurahan = !filterKelurahan || desa.kelurahan === filterKelurahan;
      return matchesSearch && matchesKabKota && matchesKecamatan && matchesKelurahan;
    });
  }, [searchQuery, filterKabKota, filterKecamatan, filterKelurahan]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [3.5952, 98.6722],
      zoom: 10,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
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

    filteredData.forEach((desa) => {
      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: ${statusColors[desa.status]};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg style="transform: rotate(45deg); width: 16px; height: 16px;" viewBox="0 0 24 24" fill="white">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([desa.lat, desa.lng], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="min-width: 260px; font-family: system-ui, sans-serif; padding: 4px;">
          <h3 style="font-weight: bold; font-size: 15px; margin-bottom: 8px; color: #0E5B73;">${desa.namaDesa}</h3>
          <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 500; border-radius: 6px; color: white; background: ${statusColors[desa.status]}; margin-bottom: 10px;">${statusLabels[desa.status]}</span>
          
          <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; color: #666;">Kabupaten/Kota</td><td style="padding: 4px 0; font-weight: 500;">${desa.kabupatenKota}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Kecamatan</td><td style="padding: 4px 0; font-weight: 500;">${desa.kecamatan}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Kelurahan</td><td style="padding: 4px 0; font-weight: 500;">${desa.kelurahan}</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Jumlah Penerima</td><td style="padding: 4px 0; font-weight: 500;">${desa.jumlahPenerima} KK</td></tr>
            <tr><td style="padding: 4px 0; color: #666;">Tahun</td><td style="padding: 4px 0; font-weight: 500;">${desa.tahun}</td></tr>
          </table>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      marker.on('click', () => {
        setSelectedDesa(desa);
      });
    });

  }, [filteredData, mapReady]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col pt-16 lg:pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-primary-foreground rounded-full text-sm font-medium">
                <Gift className="w-4 h-4" />
                <span>BSPS</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">Penerimaan BSPS</h1>
            <p className="text-primary-foreground/80">Peta sebaran penerima Bantuan Stimulan Perumahan Swadaya</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="container mx-auto flex flex-wrap items-center gap-4">
            <div className="stat-badge">
              <Home className="w-4 h-4" />
              <span>{filteredData.length} Desa</span>
            </div>
            <div className="stat-badge">
              <Users className="w-4 h-4" />
              <span>{filteredData.reduce((acc, d) => acc + d.jumlahPenerima, 0)} Penerima</span>
            </div>
            <div className="flex-1" />
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-secondary rounded-lg">
              <Layers className="w-5 h-5" />
            </button>
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
            {/* Filters */}
            <div className="p-4 border-b border-border space-y-3 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari desa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <select
                value={filterKabKota}
                onChange={(e) => { setFilterKabKota(e.target.value); setFilterKecamatan(''); setFilterKelurahan(''); }}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
              >
                <option value="">Semua Kabupaten/Kota</option>
                {kabKotaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              
              <select
                value={filterKecamatan}
                onChange={(e) => { setFilterKecamatan(e.target.value); setFilterKelurahan(''); }}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
              >
                <option value="">Semua Kecamatan</option>
                {kecamatanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              
              <select
                value={filterKelurahan}
                onChange={(e) => setFilterKelurahan(e.target.value)}
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
              >
                <option value="">Semua Kelurahan</option>
                {kelurahanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredData.map((desa) => (
                <div
                  key={desa.id}
                  onClick={() => {
                    setSelectedDesa(desa);
                    setSidebarOpen(false);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([desa.lat, desa.lng], 14);
                    }
                  }}
                  className={`clinic-card ${selectedDesa?.id === desa.id ? 'clinic-card-active' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{desa.namaDesa}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {desa.kecamatan}, {desa.kabupatenKota}
                      </p>
                    </div>
                    <span
                      className="px-2 py-0.5 text-[10px] font-medium rounded text-white flex-shrink-0"
                      style={{ backgroundColor: statusColors[desa.status] }}
                    >
                      {statusLabels[desa.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{desa.jumlahPenerima} Penerima</span>
                    <span>Tahun {desa.tahun}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map */}
          <div className="flex-1 relative z-10">
            <div ref={mapRef} className="w-full h-full" />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg z-[1000]">
              <h4 className="text-xs font-semibold text-foreground mb-2">Legenda</h4>
              <div className="space-y-1.5">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[key] }} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

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

export default PenerimaanBSPS;
