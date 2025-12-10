import { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, Clock, ArrowRight, Filter, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface SosialisasiEvent {
  id: number;
  name: string;
  coordinates: [number, number];
  date: string;
  peserta: number;
  alamat: string;
  status: 'selesai' | 'mendatang';
  images: string[];
}

const sosialisasiLocations: SosialisasiEvent[] = [
  { id: 1, name: 'Deli Serdang', coordinates: [3.4012, 98.9458], date: '2024-01-15', peserta: 150, alamat: 'Aula Kecamatan Percut Sei Tuan', status: 'selesai', images: ['/placeholder.svg', '/placeholder.svg'] },
  { id: 2, name: 'Kota Medan', coordinates: [3.5952, 98.6722], date: '2024-01-22', peserta: 200, alamat: 'Gedung Serbaguna Medan', status: 'selesai', images: ['/placeholder.svg', '/placeholder.svg'] },
  { id: 3, name: 'Langkat', coordinates: [3.7688, 98.2738], date: '2024-02-05', peserta: 120, alamat: 'Balai Desa Stabat', status: 'selesai', images: ['/placeholder.svg', '/placeholder.svg'] },
  { id: 4, name: 'Serdang Bedagai', coordinates: [3.2678, 99.0158], date: '2024-02-12', peserta: 100, alamat: 'Kantor Camat Sei Rampah', status: 'selesai', images: ['/placeholder.svg', '/placeholder.svg'] },
  { id: 5, name: 'Binjai', coordinates: [3.6001, 98.4854], date: '2024-02-20', peserta: 80, alamat: 'Aula Kota Binjai', status: 'selesai', images: ['/placeholder.svg', '/placeholder.svg'] },
  { id: 6, name: 'Tebing Tinggi', coordinates: [3.3289, 99.1625], date: '2024-12-25', peserta: 0, alamat: 'Gedung Balai Kota Tebing Tinggi', status: 'mendatang', images: [] },
  { id: 7, name: 'Pematang Siantar', coordinates: [2.9595, 99.0687], date: '2025-01-10', peserta: 0, alamat: 'Aula Pemerintah Kota', status: 'mendatang', images: [] },
];

const beritaSosialisasi = [
  {
    id: 1,
    title: 'Sosialisasi Program BSPS di Desa Tanjung Rejo',
    image: '/placeholder.svg',
    date: '15 Januari 2024',
    month: '2024-01',
    description: 'Tim Klinik PKP BP3KP Sumatera II mengadakan sosialisasi program Bantuan Stimulan Perumahan Swadaya (BSPS) di Desa Tanjung Rejo, Kecamatan Percut Sei Tuan.',
  },
  {
    id: 2,
    title: 'Workshop Teknis Pembangunan Rumah Layak Huni',
    image: '/placeholder.svg',
    date: '22 Januari 2024',
    month: '2024-01',
    description: 'Workshop teknis tentang standar pembangunan rumah layak huni sesuai dengan ketentuan yang berlaku bagi masyarakat penerima bantuan.',
  },
  {
    id: 3,
    title: 'Edukasi Perizinan Bangunan untuk Masyarakat',
    image: '/placeholder.svg',
    date: '5 Februari 2024',
    month: '2024-02',
    description: 'Kegiatan edukasi tentang pentingnya perizinan bangunan dan cara mengurus IMB untuk rumah tinggal.',
  },
  {
    id: 4,
    title: 'Sosialisasi Rumah Tahan Gempa',
    image: '/placeholder.svg',
    date: '18 Februari 2024',
    month: '2024-02',
    description: 'Edukasi kepada masyarakat tentang konstruksi rumah tahan gempa dan standar keamanan bangunan.',
  },
];

const jadwalKegiatan = sosialisasiLocations.filter(e => e.status === 'mendatang');

const SosialisasiKlinikPKP = () => {
  const ref = useScrollAnimation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [beritaFilter, setBeritaFilter] = useState('all');
  const [jadwalFilter, setJadwalFilter] = useState('all');

  const months = useMemo(() => {
    const uniqueMonths = [...new Set(beritaSosialisasi.map(b => b.month))];
    return uniqueMonths.sort().reverse();
  }, []);

  const filteredBerita = useMemo(() => {
    if (beritaFilter === 'all') return beritaSosialisasi;
    return beritaSosialisasi.filter(b => b.month === beritaFilter);
  }, [beritaFilter]);

  const filteredJadwal = useMemo(() => {
    if (jadwalFilter === 'all') return jadwalKegiatan;
    const [year, month] = jadwalFilter.split('-');
    return jadwalKegiatan.filter(j => {
      const eventDate = new Date(j.date);
      return eventDate.getFullYear().toString() === year && 
             (eventDate.getMonth() + 1).toString().padStart(2, '0') === month;
    });
  }, [jadwalFilter]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [3.2, 99.0],
      zoom: 8,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    sosialisasiLocations.forEach((loc) => {
      const isUpcoming = loc.status === 'mendatang';
      const markerColor = isUpcoming ? '#eab308' : '#0E5B73';
      
      const markerIcon = L.divIcon({
        html: `
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style="background: ${markerColor}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const formattedDate = new Date(loc.date).toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      });

      L.marker(loc.coordinates, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-4 min-w-[280px] bg-white dark:bg-slate-800">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-1 text-xs font-medium rounded-full ${isUpcoming ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                ${isUpcoming ? 'Mendatang' : 'Selesai'}
              </span>
            </div>
            <h3 class="font-bold text-lg mb-2 text-slate-900">${loc.name}</h3>
            <div class="space-y-2 text-sm text-slate-600">
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${formattedDate}
              </p>
              ${!isUpcoming ? `<p class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                ${loc.peserta} Peserta
              </p>` : ''}
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${loc.alamat}
              </p>
            </div>
          </div>
        `);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const formatMonthLabel = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-2/10" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <BookOpen className="w-4 h-4" />
              <span>Sosialisasi</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Sosialisasi Klinik PKP
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Informasi kegiatan sosialisasi dan edukasi terkait perumahan dan kawasan permukiman di wilayah Sumatera
            </p>
          </div>

          {/* Map Section */}
          <div className="mb-16 animate-on-scroll">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Lokasi Kegiatan Sosialisasi
            </h2>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Selesai</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">Mendatang</span>
              </div>
            </div>
            
            <div 
              ref={mapRef} 
              className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border"
            />
          </div>

          {/* Jadwal Kegiatan Mendatang - Moved up and prominent */}
          <div className="mb-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20 animate-on-scroll">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Jadwal Kegiatan Mendatang
              </h2>
              <Select value={jadwalFilter} onValueChange={setJadwalFilter}>
                <SelectTrigger className="w-[200px] bg-card">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Bulan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jadwal</SelectItem>
                  <SelectItem value="2024-12">Desember 2024</SelectItem>
                  <SelectItem value="2025-01">Januari 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredJadwal.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredJadwal.map((jadwal, index) => {
                  const eventDate = new Date(jadwal.date);
                  return (
                    <div 
                      key={jadwal.id}
                      className="bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all flex gap-4"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-2xl font-bold">{eventDate.getDate()}</span>
                        <span className="text-xs">{eventDate.toLocaleDateString('id-ID', { month: 'short' })}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Sosialisasi
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">Sosialisasi BSPS - {jadwal.name}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>09:00 - 12:00 WIB</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{jadwal.alamat}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Tidak ada jadwal kegiatan pada bulan yang dipilih.
              </div>
            )}
          </div>

          {/* Berita Sosialisasi */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground animate-on-scroll">
                Berita Sosialisasi
              </h2>
              <div className="flex items-center gap-3 animate-on-scroll">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={beritaFilter} onValueChange={setBeritaFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Berita</SelectItem>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{formatMonthLabel(month)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBerita.map((berita, index) => (
                <div 
                  key={berita.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all animate-on-scroll group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={berita.image} 
                      alt={berita.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-primary mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{berita.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {berita.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {berita.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredBerita.length === 0 && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada berita pada bulan yang dipilih.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center py-12 bg-card rounded-2xl border border-border animate-on-scroll">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ingin Mengadakan Sosialisasi?</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Hubungi kami untuk mengundang tim Klinik PKP mengadakan sosialisasi di wilayah Anda.
            </p>
            <Link 
              to="/informasi/kontak"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-hover transition-colors"
            >
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 12px;
        }
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default SosialisasiKlinikPKP;