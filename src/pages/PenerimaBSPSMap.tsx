import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Home, MapPin, Building2, Calendar, Users, Hammer } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

interface BSPSData {
  id: number;
  nama: string;
  alamat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jumlahUnit: number;
  jumlahTower: number;
  jumlahLantai: number;
  tipe: string;
  tahunPembangunan: number;
  tahunSerahTerima: number;
  unitTerisi: number;
  totalUnit: number;
  kontraktor: string;
  lat: number;
  lng: number;
  status: 'selesai' | 'proses' | 'rencana';
}

// Sample data - 10 koordinat penerima BSPS
const bspsData: BSPSData[] = [
  {
    id: 1,
    nama: 'PP Bidayatussalikin',
    alamat: 'Jl. Purbowinangun',
    desa: 'Ds. Tritis',
    kecamatan: 'Kec. Pakem',
    kabupaten: 'Kab. Sleman',
    provinsi: 'Prov. Di Yogyakarta',
    jumlahUnit: 30,
    jumlahTower: 1,
    jumlahLantai: 3,
    tipe: 'T. Barak',
    tahunPembangunan: 2016,
    tahunSerahTerima: 2020,
    unitTerisi: 30,
    totalUnit: 30,
    kontraktor: 'PT. Hagitasinar Lestarimegah',
    lat: 3.5952,
    lng: 98.6722,
    status: 'selesai'
  },
  {
    id: 2,
    nama: 'Rusun Nelayan Belawan',
    alamat: 'Jl. Gabion',
    desa: 'Kel. Belawan I',
    kecamatan: 'Kec. Medan Belawan',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 48,
    jumlahTower: 2,
    jumlahLantai: 4,
    tipe: 'T. Blok',
    tahunPembangunan: 2018,
    tahunSerahTerima: 2021,
    unitTerisi: 45,
    totalUnit: 48,
    kontraktor: 'PT. Pembangunan Perumahan',
    lat: 3.7752,
    lng: 98.6879,
    status: 'selesai'
  },
  {
    id: 3,
    nama: 'Rusun Pekerja Industri KIM',
    alamat: 'Jl. Industri Raya',
    desa: 'Kel. Mabar',
    kecamatan: 'Kec. Medan Deli',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 60,
    jumlahTower: 2,
    jumlahLantai: 5,
    tipe: 'T. Tower',
    tahunPembangunan: 2019,
    tahunSerahTerima: 2022,
    unitTerisi: 55,
    totalUnit: 60,
    kontraktor: 'PT. Waskita Karya',
    lat: 3.6852,
    lng: 98.7179,
    status: 'selesai'
  },
  {
    id: 4,
    nama: 'Rusun MBR Helvetia',
    alamat: 'Jl. Helvetia Tengah',
    desa: 'Kel. Helvetia Tengah',
    kecamatan: 'Kec. Medan Helvetia',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 36,
    jumlahTower: 1,
    jumlahLantai: 4,
    tipe: 'T. Blok',
    tahunPembangunan: 2020,
    tahunSerahTerima: 2023,
    unitTerisi: 30,
    totalUnit: 36,
    kontraktor: 'PT. Adhi Karya',
    lat: 3.6152,
    lng: 98.6379,
    status: 'selesai'
  },
  {
    id: 5,
    nama: 'Rusun ASN Medan Baru',
    alamat: 'Jl. Jamin Ginting',
    desa: 'Kel. Padang Bulan',
    kecamatan: 'Kec. Medan Baru',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 50,
    jumlahTower: 2,
    jumlahLantai: 5,
    tipe: 'T. Tower',
    tahunPembangunan: 2021,
    tahunSerahTerima: 2024,
    unitTerisi: 40,
    totalUnit: 50,
    kontraktor: 'PT. Hutama Karya',
    lat: 3.5652,
    lng: 98.6522,
    status: 'proses'
  },
  {
    id: 6,
    nama: 'Rusun Mahasiswa USU',
    alamat: 'Jl. Dr. Mansyur',
    desa: 'Kel. Padang Bulan Selayang',
    kecamatan: 'Kec. Medan Selayang',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 80,
    jumlahTower: 3,
    jumlahLantai: 6,
    tipe: 'T. Tower',
    tahunPembangunan: 2017,
    tahunSerahTerima: 2020,
    unitTerisi: 78,
    totalUnit: 80,
    kontraktor: 'PT. Nindya Karya',
    lat: 3.5752,
    lng: 98.6622,
    status: 'selesai'
  },
  {
    id: 7,
    nama: 'Rusun Buruh Tanjung Morawa',
    alamat: 'Jl. Batang Kuis',
    desa: 'Kel. Tanjung Morawa A',
    kecamatan: 'Kec. Tanjung Morawa',
    kabupaten: 'Kab. Deli Serdang',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 42,
    jumlahTower: 1,
    jumlahLantai: 4,
    tipe: 'T. Blok',
    tahunPembangunan: 2022,
    tahunSerahTerima: 2025,
    unitTerisi: 0,
    totalUnit: 42,
    kontraktor: 'PT. Brantas Abipraya',
    lat: 3.5452,
    lng: 98.7779,
    status: 'proses'
  },
  {
    id: 8,
    nama: 'Rusun Pekerja Sunggal',
    alamat: 'Jl. Gatot Subroto',
    desa: 'Kel. Sunggal',
    kecamatan: 'Kec. Medan Sunggal',
    kabupaten: 'Kota Medan',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 32,
    jumlahTower: 1,
    jumlahLantai: 4,
    tipe: 'T. Blok',
    tahunPembangunan: 2023,
    tahunSerahTerima: 2026,
    unitTerisi: 0,
    totalUnit: 32,
    kontraktor: 'PT. Wijaya Karya',
    lat: 3.5952,
    lng: 98.6122,
    status: 'rencana'
  },
  {
    id: 9,
    nama: 'Rusun Nelayan Percut',
    alamat: 'Jl. Pantai Labu',
    desa: 'Kel. Percut',
    kecamatan: 'Kec. Percut Sei Tuan',
    kabupaten: 'Kab. Deli Serdang',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 28,
    jumlahTower: 1,
    jumlahLantai: 3,
    tipe: 'T. Barak',
    tahunPembangunan: 2019,
    tahunSerahTerima: 2022,
    unitTerisi: 28,
    totalUnit: 28,
    kontraktor: 'PT. Pembangunan Perumahan',
    lat: 3.7052,
    lng: 98.7579,
    status: 'selesai'
  },
  {
    id: 10,
    nama: 'Rusun Pekerja Binjai',
    alamat: 'Jl. Soekarno Hatta',
    desa: 'Kel. Binjai Kota',
    kecamatan: 'Kec. Binjai Kota',
    kabupaten: 'Kota Binjai',
    provinsi: 'Prov. Sumatera Utara',
    jumlahUnit: 40,
    jumlahTower: 1,
    jumlahLantai: 4,
    tipe: 'T. Blok',
    tahunPembangunan: 2020,
    tahunSerahTerima: 2023,
    unitTerisi: 38,
    totalUnit: 40,
    kontraktor: 'PT. Adhi Karya',
    lat: 3.6052,
    lng: 98.4879,
    status: 'selesai'
  }
];

const statusColors = {
  selesai: '#10b981',
  proses: '#f59e0b',
  rencana: '#6366f1'
};

const statusLabels = {
  selesai: 'Selesai',
  proses: 'Dalam Proses',
  rencana: 'Rencana'
};

const PenerimaBSPSMap = () => {
  const { region } = useParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [selectedItem, setSelectedItem] = useState<BSPSData | null>(null);

  const regionName = region === 'medan' ? 'Medan' : 'Sumatera Utara';

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Fix Leaflet default icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    map.current = L.map(mapContainer.current).setView([3.5952, 98.6722], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers
    bspsData.forEach((item) => {
      const color = statusColors[item.status];
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([item.lat, item.lng], { icon }).addTo(map.current!);

      const popupContent = `
        <div style="min-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="background: linear-gradient(135deg, ${color}, ${color}dd); color: white; padding: 12px 16px; margin: -8px -8px 12px -8px; border-radius: 4px 4px 0 0;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${item.nama}</h3>
            <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: rgba(255,255,255,0.2); border-radius: 4px; font-size: 11px;">${statusLabels[item.status]}</span>
          </div>
          <div style="padding: 0 8px 8px 8px;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
              <strong>Alamat:</strong> ${item.alamat}, ${item.desa}, ${item.kecamatan}, ${item.kabupaten}, ${item.provinsi} (${item.jumlahUnit} Unit/TB.${item.jumlahTower}/${item.tipe}/LT.${item.jumlahLantai})
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
              <div><strong>Jumlah Unit:</strong> ${item.jumlahUnit}</div>
              <div><strong>Jumlah Tower:</strong> ${item.jumlahTower}</div>
              <div><strong>Jumlah Lantai:</strong> ${item.jumlahLantai}</div>
              <div><strong>Tipe:</strong> ${item.tipe} m²</div>
              <div><strong>Tahun Pembangunan:</strong> ${item.tahunPembangunan}</div>
              <div><strong>Tahun Serah Terima:</strong> ${item.tahunSerahTerima}</div>
              <div style="grid-column: span 2;"><strong>Unit Terisi:</strong> ${item.unitTerisi} / ${item.totalUnit}</div>
              <div style="grid-column: span 2;"><strong>Kontraktor:</strong> ${item.kontraktor}</div>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 350,
        className: 'custom-popup'
      });

      marker.on('click', () => setSelectedItem(item));
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-card border-r border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
            <h1 className="text-xl font-bold text-foreground">Penerima Bantuan BSPS</h1>
            <p className="text-sm text-muted-foreground">{regionName}</p>
          </div>

          {/* Legend */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Status</h3>
            <div className="space-y-2">
              {Object.entries(statusLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: statusColors[key as keyof typeof statusColors] }}
                  />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {bspsData.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  map.current?.setView([item.lat, item.lng], 14);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedItem?.id === item.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 bg-card'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: statusColors[item.status] }}
                  />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{item.nama}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.kecamatan}, {item.kabupaten}</p>
                    <p className="text-xs text-primary mt-1">{item.jumlahUnit} Unit</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </div>

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
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
