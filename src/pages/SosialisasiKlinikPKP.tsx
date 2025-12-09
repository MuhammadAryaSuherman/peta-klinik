import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, Users, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const SosialisasiKlinikPKP = () => {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 border border-primary/20">
                <BookOpen className="w-4 h-4" />
                <span>Sosialisasi</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Sosialisasi Klinik PKP
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Kegiatan edukasi dan sosialisasi terkait perumahan dan kawasan permukiman untuk masyarakat di wilayah Sumatera.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 -mt-8">
            <div className="p-8 bg-card rounded-2xl border border-border shadow-xl hover:shadow-2xl transition-all animate-on-scroll group hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Jadwal Kegiatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Informasi jadwal sosialisasi dan pelatihan yang akan datang di berbagai lokasi wilayah Sumatera.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border shadow-xl hover:shadow-2xl transition-all animate-on-scroll group hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Lokasi Kegiatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Peta lokasi kegiatan sosialisasi di berbagai daerah yang menjangkau seluruh wilayah kerja.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border shadow-xl hover:shadow-2xl transition-all animate-on-scroll group hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Peserta & Masyarakat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Terbuka untuk seluruh masyarakat yang ingin mendapatkan informasi tentang perumahan.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative py-16 mb-16 rounded-3xl overflow-hidden animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80')] bg-cover bg-center opacity-20" />
            
            <div className="relative z-10 text-center px-4">
              <Users className="w-16 h-16 mx-auto mb-6 text-primary-foreground opacity-80" />
              <h3 className="text-3xl font-bold text-primary-foreground mb-4">
                Ingin Mengadakan Sosialisasi?
              </h3>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
                Hubungi kami untuk mengundang tim Klinik PKP mengadakan sosialisasi di wilayah Anda.
              </p>
              <Link
                to="/informasi/kontak"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SosialisasiKlinikPKP;
