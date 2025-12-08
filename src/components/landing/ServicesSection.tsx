import { Building, Home, FileSearch, Calculator, Palette, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Building className="w-8 h-8" />,
    title: 'Sebaran Rusun',
    description: 'Informasi lengkap lokasi rusun yang dibangun oleh BP3KP di berbagai wilayah.',
    href: '/peta/sebaran-rusun/medan',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Kawasan Kumuh',
    description: 'Profil dan data kawasan kumuh beserta program penanganannya.',
    href: '/peta/kawasan-kumuh/medan',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <FileSearch className="w-8 h-8" />,
    title: 'Bantuan SDGs',
    description: 'Program bantuan untuk pembangunan berkelanjutan di bidang perumahan.',
    href: '/peta/sebaran-sdgs',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Calculator className="w-8 h-8" />,
    title: 'Simulasi KPR',
    description: 'Hitung estimasi cicilan dan kemampuan kredit rumah Anda.',
    href: '/info-kpr/simulasi',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Bank Desain',
    description: 'Koleksi desain rumah dan rusun untuk referensi pembangunan.',
    href: '/bank-desain/rumah',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: <HelpCircle className="w-8 h-8" />,
    title: 'Konsultasi',
    description: 'Layanan konsultasi gratis seputar perumahan dan permukiman.',
    href: '/informasi/kontak',
    color: 'from-pink-500 to-rose-500',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
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
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
