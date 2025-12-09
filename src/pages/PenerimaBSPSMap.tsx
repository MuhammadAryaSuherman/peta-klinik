import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Home, Search, Filter } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { Input } from '@/components/ui/input';

interface DesaData {
  id: number;
  nama: string;
  kecamatan: string;
  kabupaten: string;
  jumlahPenerima: number;
  status: 'selesai' | 'proses' | 'rencana';
  tahun: number;
  coordinates: [number, number][];
  centerLat: number;
  centerLng: number;
}

// Sample data - 10 desa dengan koordinat polygon
const desaData: DesaData[] = [
  {
    id: 1,
    nama: 'Desa Tanjung Rejo',
    kecamatan: 'Kec. Percut Sei Tuan',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 45,
    status: 'selesai',
    tahun: 2023,
    coordinates: [
      [3.7752, 98.6879],
      [3.7802, 98.6879],
      [3.7802, 98.6929],
      [3.7752, 98.6929],
    ],
    centerLat: 3.7777,
    centerLng: 98.6904,
  },
  {
    id: 2,
    nama: 'Desa Medan Krio',
    kecamatan: 'Kec. Sunggal',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 32,
    status: 'selesai',
    tahun: 2023,
    coordinates: [
      [3.5952, 98.6122],
      [3.6002, 98.6122],
      [3.6002, 98.6172],
      [3.5952, 98.6172],
    ],
    centerLat: 3.5977,
    centerLng: 98.6147,
  },
  {
    id: 3,
    nama: 'Desa Bandar Khalipah',
    kecamatan: 'Kec. Percut Sei Tuan',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 28,
    status: 'proses',
    tahun: 2024,
    coordinates: [
      [3.6852, 98.7179],
      [3.6902, 98.7179],
      [3.6902, 98.7229],
      [3.6852, 98.7229],
    ],
    centerLat: 3.6877,
    centerLng: 98.7204,
  },
  {
    id: 4,
    nama: 'Desa Helvetia',
    kecamatan: 'Kec. Labuhan Deli',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 56,
    status: 'selesai',
    tahun: 2022,
    coordinates: [
      [3.6152, 98.6379],
      [3.6202, 98.6379],
      [3.6202, 98.6429],
      [3.6152, 98.6429],
    ],
    centerLat: 3.6177,
    centerLng: 98.6404,
  },
  {
    id: 5,
    nama: 'Desa Padang Bulan',
    kecamatan: 'Kec. Medan Baru',
    kabupaten: 'Kota Medan',
    jumlahPenerima: 38,
    status: 'proses',
    tahun: 2024,
    coordinates: [
      [3.5652, 98.6522],
      [3.5702, 98.6522],
      [3.5702, 98.6572],
      [3.5652, 98.6572],
    ],
    centerLat: 3.5677,
    centerLng: 98.6547,
  },
  {
    id: 6,
    nama: 'Desa Sei Sikambing',
    kecamatan: 'Kec. Medan Sunggal',
    kabupaten: 'Kota Medan',
    jumlahPenerima: 42,
    status: 'selesai',
    tahun: 2023,
    coordinates: [
      [3.5752, 98.6322],
      [3.5802, 98.6322],
      [3.5802, 98.6372],
      [3.5752, 98.6372],
    ],
    centerLat: 3.5777,
    centerLng: 98.6347,
  },
  {
    id: 7,
    nama: 'Desa Tanjung Morawa',
    kecamatan: 'Kec. Tanjung Morawa',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 67,
    status: 'selesai',
    tahun: 2022,
    coordinates: [
      [3.5452, 98.7779],
      [3.5502, 98.7779],
      [3.5502, 98.7829],
      [3.5452, 98.7829],
    ],
    centerLat: 3.5477,
    centerLng: 98.7804,
  },
  {
    id: 8,
    nama: 'Desa Binjai Kota',
    kecamatan: 'Kec. Binjai Kota',
    kabupaten: 'Kota Binjai',
    jumlahPenerima: 51,
    status: 'rencana',
    tahun: 2025,
    coordinates: [
      [3.6052, 98.4879],
      [3.6102, 98.4879],
      [3.6102, 98.4929],
      [3.6052, 98.4929],
    ],
    centerLat: 3.6077,
    centerLng: 98.4904,
  },
  {
    id: 9,
    nama: 'Desa Percut',
    kecamatan: 'Kec. Percut Sei Tuan',
    kabupaten: 'Kab. Deli Serdang',
    jumlahPenerima: 73,
    status: 'selesai',
    tahun: 2023,
    coordinates: [
      [3.7052, 98.7579],
      [3.7102, 98.7579],
      [3.7102, 98.7629],
      [3.7052, 98.7629],
    ],
    centerLat: 3.7077,
    centerLng: 98.7604,
  },
  {
    id: 10,
    nama: 'Desa Belawan',
    kecamatan: 'Kec. Medan Belawan',
    kabupaten: 'Kota Medan',
    jumlahPenerima: 84,
    status: 'selesai',
    tahun: 2022,
    coordinates: [
      [3.7652, 98.6879],
      [3.7702, 98.6879],
      [3.7702, 98.6929],
      [3.7652, 98.6929],
    ],
    centerLat: 3.7677,
    centerLng: 98.6904,
  },
];

const statusColors = {
  selesai: { fill: '#0E5B73', stroke: '#084C61' },
  proses: { fill: '#D5C58A', stroke: '#C4B47A' },
  rencana: { fill: '#6366f1', stroke: '#4F46E5' },
};

const statusLabels = {
  selesai: 'Selesai',
  proses: 'Dalam Proses',
  rencana: 'Rencana',
};

const PenerimaBSPSMap = () => {
  const { region } = useParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [selectedDesa, setSelectedDesa] = useState<DesaData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const regionName = region === 'medan' ? 'Medan' : 'Sumatera Utara';

  const filteredData = desaData.filter((desa) => {
    const matchesSearch = desa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         desa.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || desa.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Fix Leaflet default icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    map.current = L.map(mapContainer.current).setView([3.5952, 98.6722], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.current);

    // Add polygons for each desa
    desaData.forEach((desa) => {
      const colors = statusColors[desa.status];
      
      // Create polygon
      const polygon = L.polygon(desa.coordinates as L.LatLngExpression[], {
        color: colors.stroke,
        fillColor: colors.fill,
        fillOpacity: 0.6,
        weight: 2,
      }).addTo(map.current!);

      // Popup content
      const popupContent = `
        <div style="min-width: 280px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
          <div style="background: linear-gradient(135deg, ${colors.fill}, ${colors.stroke}); color: white; padding: 12px 16px; margin: -8px -8px 12px -8px; border-radius: 4px 4px 0 0;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${desa.nama}</h3>
            <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: rgba(255,255,255,0.2); border-radius: 4px; font-size: 11px;">${statusLabels[desa.status]}</span>
          </div>
          <div style="padding: 0 8px 8px 8px;">
            <div style="display: grid; gap: 8px; font-size: 13px; color: #64748b;">
              <div><strong style="color: #1e293b;">Kecamatan:</strong> ${desa.kecamatan}</div>
              <div><strong style="color: #1e293b;">Kabupaten:</strong> ${desa.kabupaten}</div>
              <div><strong style="color: #1e293b;">Jumlah Penerima:</strong> <span style="color: ${colors.fill}; font-weight: 600;">${desa.jumlahPenerima} KK</span></div>
              <div><strong style="color: #1e293b;">Tahun:</strong> ${desa.tahun}</div>
            </div>
          </div>
        </div>
      `;

      polygon.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'custom-popup'
      });

      // Hover effects
      polygon.on('mouseover', function() {
        this.setStyle({ fillOpacity: 0.8, weight: 3 });
        this.openPopup();
      });

      polygon.on('mouseout', function() {
        this.setStyle({ fillOpacity: 0.6, weight: 2 });
      });

      polygon.on('click', () => setSelectedDesa(desa));
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleDesaClick = (desa: DesaData) => {
    setSelectedDesa(desa);
    map.current?.setView([desa.centerLat, desa.centerLng], 14);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 lg:w-96 bg-card border-r border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
            <h1 className="text-xl font-bold text-foreground">Penerima Bantuan BSPS</h1>
            <p className="text-sm text-muted-foreground">{regionName}</p>
          </div>

          {/* Search & Filter */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari desa atau kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                Semua
              </button>
              {Object.entries(statusLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilterStatus(key)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    filterStatus === key
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Keterangan Warna</h3>
            <div className="space-y-2">
              {Object.entries(statusLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded border-2"
                    style={{ 
                      backgroundColor: statusColors[key as keyof typeof statusColors].fill,
                      borderColor: statusColors[key as keyof typeof statusColors].stroke 
                    }}
                  />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredData.map((desa) => (
              <button
                key={desa.id}
                onClick={() => handleDesaClick(desa)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedDesa?.id === desa.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/30 bg-card hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-4 h-4 rounded mt-0.5 flex-shrink-0 border-2"
                    style={{ 
                      backgroundColor: statusColors[desa.status].fill,
                      borderColor: statusColors[desa.status].stroke 
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm truncate">{desa.nama}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{desa.kecamatan}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium text-primary">{desa.jumlahPenerima} Penerima</span>
                      <span className="text-xs text-muted-foreground">{desa.tahun}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-border bg-secondary/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {desaData.reduce((acc, d) => acc + d.jumlahPenerima, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Penerima BSPS</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </div>

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
        }
        .custom-popup .leaflet-popup-content {
          margin: 8px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default PenerimaBSPSMap;
