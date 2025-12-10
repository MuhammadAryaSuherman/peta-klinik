import { Building, Home, FileSearch, Gift, Palette, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const services = [
  {
    icon: <Building className="w-8 h-8" />,
    title: 'Sebaran Rusun',
    description: 'Informasi lengkap lokasi rusun yang dibangun oleh BP3KP di berbagai wilayah Sumatera.',
    href: '/peta/sebaran-rusun/medan',
    gradient: 'from-primary to-accent',
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Kawasan Kumuh',
    description: 'Profil dan data kawasan kumuh beserta program penanganannya di wilayah kerja.',
    href: '/peta/kawasan-kumuh/medan',
    gradient: 'from-accent to-primary',
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: 'Penerima BSPS',
    description: 'Data penerima Bantuan Stimulan Perumahan Swadaya di seluruh desa.',
    href: '/peta/penerima-bsps/medan',
    gradient: 'from-primary to-accent',
  },
  {
    icon: <FileSearch className="w-8 h-8" />,
    title: 'Penerimaan BSPS',
    description: 'Informasi persyaratan dan prosedur pendaftaran program BSPS.',
    href: '/penerimaan-bsps',
    gradient: 'from-accent to-primary',
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Bank Desain',
    description: 'Koleksi desain rumah dan rusun untuk referensi pembangunan hunian.',
    href: '/bank-desain',
    gradient: 'from-primary to-accent',
  },
  {
    icon: <HelpCircle className="w-8 h-8" />,
    title: 'Konsultasi',
    description: 'Layanan konsultasi gratis seputar perumahan dan permukiman.',
    href: '/informasi/kontak',
    gradient: 'from-accent to-primary',
  },
];

const ServicesSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Layanan Kami
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Solusi Lengkap untuk Kebutuhan Perumahan
          </h2>
          <p className="text-muted-foreground">
            Kami menyediakan berbagai layanan untuk membantu masyarakat dalam mendapatkan informasi dan solusi perumahan yang tepat.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 animate-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                <span>Selengkapnya</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
