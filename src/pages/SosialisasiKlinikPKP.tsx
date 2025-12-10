import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

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

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Jadwal Kegiatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Informasi jadwal sosialisasi dan pelatihan yang akan datang di berbagai lokasi wilayah Sumatera.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Lokasi Kegiatan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Peta lokasi kegiatan sosialisasi di berbagai daerah wilayah Sumatera II.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-3">Materi Sosialisasi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Unduh materi presentasi dan dokumen pendukung kegiatan sosialisasi PKP.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-16 bg-gradient-to-r from-primary to-accent rounded-2xl text-primary-foreground animate-on-scroll">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ingin Mengadakan Sosialisasi?</h3>
            <p className="opacity-80 max-w-md mx-auto mb-6">
              Hubungi kami untuk mengundang tim Klinik PKP mengadakan sosialisasi di wilayah Anda.
            </p>
            <Link 
              to="/informasi/kontak"
              className="inline-block px-8 py-3.5 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SosialisasiKlinikPKP;
