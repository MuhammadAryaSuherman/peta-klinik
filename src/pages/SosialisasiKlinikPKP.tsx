import { useEffect, useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const sosialisasiLocations = [
  { name: 'Deli Serdang', coordinates: [3.4012, 98.9458] as [number, number], date: '15 Jan 2024', peserta: 150 },
  { name: 'Kota Medan', coordinates: [3.5952, 98.6722] as [number, number], date: '22 Jan 2024', peserta: 200 },
  { name: 'Langkat', coordinates: [3.7688, 98.2738] as [number, number], date: '5 Feb 2024', peserta: 120 },
  { name: 'Serdang Bedagai', coordinates: [3.2678, 99.0158] as [number, number], date: '12 Feb 2024', peserta: 100 },
  { name: 'Binjai', coordinates: [3.6001, 98.4854] as [number, number], date: '20 Feb 2024', peserta: 80 },
];

const beritaSosialisasi = [
  {
    id: 1,
    title: 'Sosialisasi Program BSPS di Desa Tanjung Rejo',
    image: '/placeholder.svg',
    date: '15 Januari 2024',
    description: 'Tim Klinik PKP BP3KP Sumatera II mengadakan sosialisasi program Bantuan Stimulan Perumahan Swadaya (BSPS) di Desa Tanjung Rejo, Kecamatan Percut Sei Tuan.',
  },
  {
    id: 2,
    title: 'Workshop Teknis Pembangunan Rumah Layak Huni',
    image: '/placeholder.svg',
    date: '22 Januari 2024',
    description: 'Workshop teknis tentang standar pembangunan rumah layak huni sesuai dengan ketentuan yang berlaku bagi masyarakat penerima bantuan.',
  },
  {
    id: 3,
    title: 'Edukasi Perizinan Bangunan untuk Masyarakat',
    image: '/placeholder.svg',
    date: '5 Februari 2024',
    description: 'Kegiatan edukasi tentang pentingnya perizinan bangunan dan cara mengurus IMB untuk rumah tinggal.',
  },
];

const jadwalKegiatan = [
  {
    id: 1,
    title: 'Sosialisasi BSPS Tahun 2024',
    date: '25 Februari 2024',
    time: '09:00 - 12:00 WIB',
    location: 'Aula Kantor Camat Percut Sei Tuan',
    type: 'Sosialisasi',
  },
  {
    id: 2,
    title: 'Workshop Konstruksi Rumah Sederhana',
    date: '2 Maret 2024',
    time: '08:00 - 16:00 WIB',
    location: 'Balai Desa Helvetia',
    type: 'Workshop',
  },
  {
    id: 3,
    title: 'Konsultasi Publik Program PKP',
    date: '10 Maret 2024',
    time: '10:00 - 14:00 WIB',
    location: 'Gedung Serbaguna Medan',
    type: 'Konsultasi',
  },
];

const SosialisasiKlinikPKP = () => {
  const ref = useScrollAnimation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [3.5, 98.7],
      zoom: 9,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    sosialisasiLocations.forEach((loc) => {
      const markerIcon = L.divIcon({
        html: `
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker(loc.coordinates, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-foreground mb-2">${loc.name}</h3>
            <p class="text-sm text-muted-foreground mb-1">Tanggal: ${loc.date}</p>
            <p class="text-sm text-muted-foreground">Peserta: ${loc.peserta} orang</p>
          </div>
        `);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            <div 
              ref={mapRef} 
              className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-border"
            />
          </div>

          {/* Berita Sosialisasi */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center animate-on-scroll">
              Berita Sosialisasi
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaSosialisasi.map((berita, index) => (
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
                    <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                      {berita.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {berita.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Kegiatan */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center animate-on-scroll">
              Jadwal Kegiatan Mendatang
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {jadwalKegiatan.map((jadwal, index) => (
                <div 
                  key={jadwal.id}
                  className="bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all animate-on-scroll flex flex-col md:flex-row md:items-center gap-4"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex flex-col items-center justify-center text-primary-foreground">
                    <Calendar className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{jadwal.type}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-2">{jadwal.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{jadwal.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{jadwal.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{jadwal.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
        .custom-marker > div {
          background: hsl(var(--primary));
        }
        .custom-marker svg {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SosialisasiKlinikPKP;
