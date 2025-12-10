import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

import serviceBankDesain from '@/assets/service-bank-desain.jpg';
import serviceSosialisasi from '@/assets/service-sosialisasi.jpg';
import serviceBsps from '@/assets/service-bsps.jpg';
import serviceRusun from '@/assets/service-rusun.jpg';
import serviceKumuh from '@/assets/service-kumuh.jpg';
import serviceKonsultasi from '@/assets/service-konsultasi.jpg';

const services = [
  {
    image: serviceRusun,
    title: 'Sebaran Rusun',
    description: 'Informasi lengkap lokasi rusun yang dibangun oleh BP3KP di berbagai wilayah Sumatera.',
    href: '/peta/sebaran-rusun/medan',
  },
  {
    image: serviceKumuh,
    title: 'Kawasan Kumuh',
    description: 'Profil dan data kawasan kumuh beserta program penanganannya di wilayah kerja.',
    href: '/peta/kawasan-kumuh/medan',
  },
  {
    image: serviceBsps,
    title: 'Penerimaan BSPS',
    description: 'Informasi persyaratan dan prosedur pendaftaran program BSPS.',
    href: '/penerimaan-bsps',
  },
  {
    image: serviceBankDesain,
    title: 'Bank Desain',
    description: 'Koleksi desain rumah dan rusun untuk referensi pembangunan hunian.',
    href: '/bank-desain',
  },
  {
    image: serviceSosialisasi,
    title: 'Sosialisasi',
    description: 'Kegiatan sosialisasi dan edukasi terkait perumahan dan permukiman.',
    href: '/sosialisasi-klinik-pkp',
  },
  {
    image: serviceKonsultasi,
    title: 'Konsultasi',
    description: 'Layanan konsultasi gratis seputar perumahan dan permukiman.',
    href: '/informasi/kontak',
  },
];

const ServicesSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-secondary/30" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-all group/btn"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
