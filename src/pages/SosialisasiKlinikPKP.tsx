import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Calendar, MapPin, Users, FileText } from 'lucide-react';

const SosialisasiKlinikPKP = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Sosialisasi</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sosialisasi Klinik PKP
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Informasi kegiatan sosialisasi dan edukasi terkait perumahan dan kawasan permukiman.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Jadwal Kegiatan</h3>
              <p className="text-sm text-muted-foreground">
                Informasi jadwal sosialisasi dan pelatihan yang akan datang.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Lokasi Kegiatan</h3>
              <p className="text-sm text-muted-foreground">
                Peta lokasi kegiatan sosialisasi di berbagai daerah.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Materi Sosialisasi</h3>
              <p className="text-sm text-muted-foreground">
                Unduh materi presentasi dan dokumen pendukung.
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Data Sosialisasi Akan Ditampilkan Di Sini</h3>
            <p className="text-muted-foreground">
              Hubungkan ke API backend untuk menampilkan jadwal dan informasi sosialisasi.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SosialisasiKlinikPKP;
