import { useEffect, useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { MapPin, Clock, Phone, Mail, Calendar, ExternalLink } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const klinikData = {
  name: 'Klinik PKP BP3KP Sumatera II',
  address: 'Jl. Karya Rakyat No. 123, Medan, Sumatera Utara',
  coordinates: [3.5952, 98.6722] as [number, number],
  phone: '(061) 123-4567',
  email: 'klinikpkp@bp3kp.go.id',
  normalHours: [
    { day: 'Senin - Kamis', hours: '07.30 - 16.00 WIB' },
    { day: 'Jumat', hours: '07.30 - 16.30 WIB' },
    { day: 'Sabtu - Minggu', hours: 'Tutup / Libur' },
  ],
  fastingHours: [
    { day: 'Senin - Kamis', hours: '08.00 - 16.00 WIB' },
    { day: 'Jumat', hours: '08.00 - 16.30 WIB' },
    { day: 'Sabtu - Minggu', hours: 'Tutup / Libur' },
  ],
  services: [
    'Konsultasi Perumahan',
    'Informasi Program BSPS',
    'Bantuan Teknis Pembangunan',
    'Pendampingan Dokumen',
  ],
};

const LokasiKlinikPage = () => {
  const ref = useScrollAnimation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const openInMaps = () => {
    const [lat, lng] = klinikData.coordinates;
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: klinikData.coordinates,
      zoom: 15,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add radius circle
    L.circle(klinikData.coordinates, {
      radius: 200,
      color: 'hsl(191, 79%, 25%)',
      fillColor: 'hsl(191, 79%, 25%)',
      fillOpacity: 0.15,
      weight: 2,
    }).addTo(map);

    // Center marker
    const markerIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-16 h-16 bg-primary/20 rounded-full animate-ping"></div>
          <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [64, 64],
      iconAnchor: [32, 32],
    });

    L.marker(klinikData.coordinates, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-4 min-w-[280px]">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${klinikData.name}</h3>
          <p class="text-sm text-gray-600 mb-3">${klinikData.address}</p>
          <button onclick="window.open('https://www.google.com/maps/search/?api=1&query=${klinikData.coordinates[0]},${klinikData.coordinates[1]}', '_blank')" class="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2" style="background: hsl(191, 79%, 25%)">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Buka di Google Maps
          </button>
        </div>
      `);

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
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-accent-2/20 dark:from-background dark:via-background dark:to-primary/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <MapPin className="w-4 h-4" />
              <span>Lokasi Klinik</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Kunjungi Klinik PKP Kami
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Datang langsung ke kantor kami untuk konsultasi tatap muka dengan tim ahli perumahan dan kawasan permukiman.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Map with Building Image */}
            <div className="space-y-6 animate-on-scroll">
              <div 
                ref={mapRef} 
                className="w-full h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-border"
              />
              
              {/* Open in Maps Button */}
              <button 
                onClick={openInMaps}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Buka Lokasi di Google Maps
              </button>
              
              {/* Building Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Gedung Balai BP3KP</h3>
                    <p className="text-muted-foreground">Tampak Depan Bangunan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-lg animate-on-scroll hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Alamat</h3>
                    <p className="text-muted-foreground">{klinikData.address}</p>
                  </div>
                </div>
              </div>

              {/* Operational Hours - Normal */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-lg animate-on-scroll hover:shadow-xl transition-shadow" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Jam Operasional</h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Hari Biasa</span>
                  </div>
                </div>
                <div className="space-y-3 ml-[4.5rem]">
                  {klinikData.normalHours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="text-foreground font-medium">{item.day}</span>
                      <span className={`text-sm ${item.hours.includes('Tutup') ? 'text-destructive' : 'text-primary font-semibold'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Hours - Fasting */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-lg animate-on-scroll hover:shadow-xl transition-shadow" style={{ transitionDelay: '0.15s' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent-2 to-primary rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Jam Operasional</h3>
                    <span className="text-xs px-2 py-1 bg-accent-2/20 text-accent-2-foreground dark:text-accent-2 rounded-full">Bulan Ramadhan</span>
                  </div>
                </div>
                <div className="space-y-3 ml-[4.5rem]">
                  {klinikData.fastingHours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="text-foreground font-medium">{item.day}</span>
                      <span className={`text-sm ${item.hours.includes('Tutup') ? 'text-destructive' : 'text-primary font-semibold'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-6 bg-card rounded-2xl border border-border shadow-lg animate-on-scroll hover:shadow-xl transition-shadow" style={{ transitionDelay: '0.2s' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">Kontak</h3>
                  </div>
                </div>
                <div className="space-y-3 ml-[4.5rem]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{klinikData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{klinikData.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Available */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-on-scroll">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Layanan yang Tersedia</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {klinikData.services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-secondary/50 dark:bg-secondary rounded-xl">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .custom-marker > div > div:not(.absolute) {
          background: hsl(191, 79%, 25%);
        }
        .custom-marker svg {
          color: white;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LokasiKlinikPage;
