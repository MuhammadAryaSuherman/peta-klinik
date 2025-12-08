import { ArrowRight, Building2, MapPin, Users, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
              <Building2 className="w-4 h-4" />
              <span>Kementerian Perumahan & Kawasan Permukiman</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              Klinik Perumahan &
              <span className="text-primary block mt-2">Kawasan Permukiman</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Layanan konsultasi dan informasi terpadu untuk perumahan, permukiman, dan kawasan kumuh di Indonesia. 
              Temukan solusi hunian yang tepat untuk Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/peta/sebaran-rusun/medan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20"
              >
                <MapPin className="w-5 h-5" />
                Lihat Peta Sebaran
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/informasi/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border border-border"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div>
                <p className="text-3xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground mt-1">Unit Rusun</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">34</p>
                <p className="text-sm text-muted-foreground mt-1">Provinsi</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">5K+</p>
                <p className="text-sm text-muted-foreground mt-1">Konsultasi</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={<MapPin className="w-6 h-6" />}
                title="Sebaran Rusun"
                description="Lihat lokasi rusun di seluruh Indonesia"
                delay="0s"
              />
              <FeatureCard
                icon={<Building2 className="w-6 h-6" />}
                title="Kawasan Kumuh"
                description="Profil dan penanganan kawasan kumuh"
                delay="0.1s"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Bantuan SDGs"
                description="Program bantuan pembangunan berkelanjutan"
                delay="0.2s"
              />
              <FeatureCard
                icon={<FileCheck className="w-6 h-6" />}
                title="Simulasi KPR"
                description="Hitung kemampuan kredit rumah Anda"
                delay="0.3s"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) => (
  <div
    className="p-6 bg-card rounded-2xl border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      {icon}
    </div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default HeroSection;
