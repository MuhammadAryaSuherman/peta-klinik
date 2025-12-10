import { ArrowRight, Building2, MapPin, Users, Gift } from 'lucide-react';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in backdrop-blur-sm border border-primary/20">
              <Building2 className="w-4 h-4" />
              <span>BP3KP Sumatera II</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              Klinik Perumahan &
              <span className="text-primary block mt-2">Kawasan Permukiman</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Layanan konsultasi dan informasi terpadu untuk perumahan, permukiman, dan kawasan kumuh di wilayah Sumatera. 
              Temukan solusi hunian yang tepat untuk Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/peta/penerima-bsps/medan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20 group"
              >
                <MapPin className="w-5 h-5" />
                Lihat Peta Sebaran
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/informasi/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border border-border backdrop-blur-sm"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground mt-1">Unit Rusun</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-bold text-primary">10</p>
                <p className="text-sm text-muted-foreground mt-1">Provinsi</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-bold text-primary">5K+</p>
                <p className="text-sm text-muted-foreground mt-1">Penerima BSPS</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<MapPin className="w-6 h-6" />}
                title="Sebaran Rusun"
                description="Lihat lokasi rusun di wilayah Sumatera"
                delay="0s"
                href="/peta/sebaran-rusun/medan"
              />
              <FeatureCard
                icon={<Building2 className="w-6 h-6" />}
                title="Kawasan Kumuh"
                description="Profil dan penanganan kawasan kumuh"
                delay="0.1s"
                href="/peta/kawasan-kumuh/medan"
              />
              <FeatureCard
                icon={<Gift className="w-6 h-6" />}
                title="Penerima BSPS"
                description="Bantuan stimulan perumahan swadaya"
                delay="0.2s"
                href="/peta/penerima-bsps/medan"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Sosialisasi"
                description="Kegiatan edukasi dan sosialisasi"
                delay="0.3s"
                href="/sosialisasi-klinik-pkp"
              />
            </div>
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

const FeatureCard = ({ icon, title, description, delay, href }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  href: string;
}) => (
  <Link
    to={href}
    className="p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group animate-slide-up block"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Link>
);

export default HeroSection;
