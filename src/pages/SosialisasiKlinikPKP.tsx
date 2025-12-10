import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, Users, FileText, Clock, ArrowRight, Download } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const upcomingEvents = [
  {
    id: 1,
    title: 'Sosialisasi Program BSPS 2024',
    date: '15 Januari 2024',
    time: '09:00 - 12:00 WIB',
    location: 'Aula Kantor Desa Tanjung Rejo',
    participants: 150,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Pelatihan Teknis Konstruksi Rumah',
    date: '22 Januari 2024',
    time: '08:00 - 16:00 WIB',
    location: 'Balai Pelatihan BP3KP Medan',
    participants: 50,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Workshop Bank Desain Rumah',
    date: '28 Januari 2024',
    time: '10:00 - 15:00 WIB',
    location: 'Hotel Grand Mercure Medan',
    participants: 100,
    status: 'upcoming',
  },
];

const materials = [
  { id: 1, title: 'Panduan Program BSPS 2024', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Materi Konstruksi Rumah Tahan Gempa', type: 'PDF', size: '5.1 MB' },
  { id: 3, title: 'Presentasi Kawasan Kumuh', type: 'PPT', size: '8.3 MB' },
  { id: 4, title: 'Formulir Pendaftaran BSPS', type: 'DOC', size: '156 KB' },
];

const stats = [
  { value: '24', label: 'Kegiatan/Tahun' },
  { value: '2,500+', label: 'Peserta' },
  { value: '45', label: 'Desa Terjangkau' },
];

const SosialisasiKlinikPKP = () => {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <BookOpen className="w-4 h-4" />
              <span>Sosialisasi</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Sosialisasi Klinik PKP
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Informasi kegiatan sosialisasi dan edukasi terkait perumahan dan kawasan permukiman di wilayah Sumatera.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Jadwal Kegiatan</h3>
              <p className="text-muted-foreground">
                Informasi jadwal sosialisasi dan pelatihan yang akan datang di berbagai lokasi.
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Lokasi Kegiatan</h3>
              <p className="text-muted-foreground">
                Peta lokasi kegiatan sosialisasi di berbagai daerah wilayah Sumatera.
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Materi Sosialisasi</h3>
              <p className="text-muted-foreground">
                Unduh materi presentasi dan dokumen pendukung kegiatan sosialisasi.
              </p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Kegiatan Mendatang</h2>
              <button className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-md hover:shadow-xl animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.participants} peserta
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors">
                    Daftar Sekarang
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Materi Sosialisasi</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {materials.map((material, index) => (
                <div
                  key={material.id}
                  className={`flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors animate-on-scroll ${
                    index !== materials.length - 1 ? 'border-b border-border' : ''
                  }`}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">{material.type} • {material.size}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Unduh
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-16 bg-gradient-to-r from-primary to-accent rounded-2xl text-primary-foreground animate-on-scroll">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ingin Mengadakan Sosialisasi?</h3>
            <p className="opacity-80 max-w-md mx-auto mb-6">
              Hubungi kami untuk mengundang tim Klinik PKP mengadakan sosialisasi di wilayah Anda.
            </p>
            <button className="px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Hubungi Kami
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SosialisasiKlinikPKP;
