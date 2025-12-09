import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const services = [
  {
    title: 'Bank Desain',
    description: 'Koleksi desain rumah dan rusun untuk referensi pembangunan hunian yang ideal.',
    href: '/bank-desain',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    title: 'Penerimaan BSPS',
    description: 'Informasi persyaratan dan prosedur pendaftaran program Bantuan Stimulan Perumahan Swadaya.',
    href: '/penerimaan-bsps',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    title: 'Sosialisasi Klinik PKP',
    description: 'Kegiatan sosialisasi dan edukasi terkait perumahan dan kawasan permukiman.',
    href: '/sosialisasi-klinik-pkp',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    title: 'Sebaran Rusun',
    description: 'Informasi lengkap lokasi rumah susun yang dibangun oleh BP3KP di wilayah Sumatera.',
    href: '/peta/sebaran-rusun/medan',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    title: 'Kawasan Kumuh',
    description: 'Profil dan data kawasan kumuh beserta program penanganannya.',
    href: '/peta/kawasan-kumuh/medan',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    title: 'Konsultasi',
    description: 'Layanan konsultasi gratis seputar perumahan dan permukiman untuk masyarakat.',
    href: '/informasi/kontak',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  },
];

const ServicesSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Layanan Kami
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Solusi Lengkap untuk Kebutuhan Perumahan
          </h2>
          <p className="text-muted-foreground text-lg">
            Kami menyediakan berbagai layanan untuk membantu masyarakat dalam mendapatkan informasi dan solusi perumahan yang tepat.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll hover:-translate-y-2"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-lg font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
