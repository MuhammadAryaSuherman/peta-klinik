import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const KontakPage = () => {
  const ref = useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h1>
            <p className="text-muted-foreground">Tim kami siap membantu Anda dengan pertanyaan seputar perumahan.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-2xl border border-border animate-on-scroll">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Telepon</h3>
              <p className="text-muted-foreground">(061) 123-4567</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border animate-on-scroll">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">info@bp3kp-sumut2.go.id</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border animate-on-scroll">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Alamat</h3>
              <p className="text-muted-foreground">Jl. Contoh No. 123, Medan, Sumatera Utara</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border animate-on-scroll">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Jam Operasional</h3>
              <p className="text-muted-foreground">Senin - Jumat: 08:00 - 16:00 WIB</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default KontakPage;
