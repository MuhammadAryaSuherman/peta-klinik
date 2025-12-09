import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import sumateraMapBg from '@/assets/sumatera-map-bg.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image - Sumatera Map */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sumateraMapBg})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70 dark:from-background/98 dark:via-background/90 dark:to-background/80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-slide-up mb-6">
            Klinik Perumahan &
            <span className="text-primary block mt-2">Kawasan Permukiman</span>
            <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium block mt-4">BP3KP Sumatera II</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up mb-10" style={{ animationDelay: '0.1s' }}>
            Layanan konsultasi dan informasi terpadu untuk perumahan, permukiman, dan kawasan kumuh di wilayah Sumatera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/informasi/kontak"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 group"
            >
              <Phone className="w-5 h-5" />
              Hubungi Kami
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Feature Cards - Display Only */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <FeatureCard
              title="Sebaran Rusun"
              description="Lokasi rusun di Sumatera"
            />
            <FeatureCard
              title="Kawasan Kumuh"
              description="Profil dan penanganan"
            />
            <FeatureCard
              title="Penerima BSPS"
              description="Bantuan perumahan swadaya"
            />
            <FeatureCard
              title="Sosialisasi"
              description="Kegiatan edukasi"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description }: {
  title: string;
  description: string;
}) => (
  <div className="p-5 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg">
    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export default HeroSection;
