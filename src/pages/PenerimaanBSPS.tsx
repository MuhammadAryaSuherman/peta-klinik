import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Gift, FileCheck, Users, ClipboardList } from 'lucide-react';

const PenerimaanBSPS = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              <span>BSPS</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Penerimaan BSPS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bantuan Stimulan Perumahan Swadaya (BSPS) untuk masyarakat berpenghasilan rendah dalam memperbaiki rumah.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Persyaratan</h3>
              <p className="text-sm text-muted-foreground">
                Informasi persyaratan untuk mendaftar program BSPS.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Prosedur Pendaftaran</h3>
              <p className="text-sm text-muted-foreground">
                Langkah-langkah untuk mengajukan bantuan BSPS.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Kriteria Penerima</h3>
              <p className="text-sm text-muted-foreground">
                Kriteria masyarakat yang berhak menerima BSPS.
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Gift className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Data Penerimaan BSPS Akan Ditampilkan Di Sini</h3>
            <p className="text-muted-foreground">
              Hubungkan ke API backend untuk menampilkan informasi penerimaan BSPS.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PenerimaanBSPS;
