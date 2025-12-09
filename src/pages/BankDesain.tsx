import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Palette, Home, Building2, Download, Eye } from 'lucide-react';

const BankDesain = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Palette className="w-4 h-4" />
              <span>Bank Desain</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Koleksi Desain Rumah & Rusun
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Temukan berbagai desain rumah dan rusun yang dapat menjadi inspirasi untuk pembangunan hunian Anda.
            </p>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Home className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">Desain Rumah</h2>
              <p className="text-muted-foreground mb-6">
                Koleksi desain rumah dengan berbagai tipe dan ukuran yang sesuai dengan kebutuhan keluarga Indonesia.
              </p>
              <p className="text-sm text-muted-foreground">Data akan dimuat dari API</p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Building2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">Desain Rusun</h2>
              <p className="text-muted-foreground mb-6">
                Desain rumah susun yang efisien dan nyaman untuk hunian vertikal di perkotaan.
              </p>
              <p className="text-sm text-muted-foreground">Data akan dimuat dari API</p>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Palette className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Desain Akan Ditampilkan Di Sini</h3>
            <p className="text-muted-foreground">
              Hubungkan ke API backend untuk menampilkan koleksi desain rumah dan rusun.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BankDesain;
