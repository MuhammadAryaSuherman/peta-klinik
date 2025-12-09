import { CheckCircle, Ruler, Sparkles, Shield, Droplets, Route, Waves } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const indicators = [
  {
    icon: <Ruler className="w-8 h-8" />,
    title: 'Luas Rumah Memadai',
    description: 'Rumah memiliki luas yang cukup untuk seluruh anggota keluarga sesuai standar kesehatan.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Kebersihan Terjaga',
    description: 'Lingkungan rumah bersih dan memiliki sistem sanitasi yang baik.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Konstruksi Aman',
    description: 'Struktur bangunan kokoh dan aman dari risiko bencana atau kerusakan.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: 'Akses Air Bersih',
    description: 'Tersedia sumber air bersih yang mudah dijangkau untuk kebutuhan sehari-hari.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  },
  {
    icon: <Route className="w-8 h-8" />,
    title: 'Akses Jalan',
    description: 'Lokasi rumah memiliki akses jalan yang baik dan mudah dilalui.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  },
  {
    icon: <Waves className="w-8 h-8" />,
    title: 'Drainase Baik',
    description: 'Sistem drainase berfungsi dengan baik untuk mencegah genangan air.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
];

const HouseIndicatorsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Indikator Kelayakan
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Apakah Rumahmu Layak Huni?
          </h2>
          <p className="text-muted-foreground text-lg">
            Kenali 6 indikator penting yang menentukan kelayakan sebuah rumah tinggal untuk keluarga Anda.
          </p>
        </div>

        {/* Indicators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll hover:-translate-y-2"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={indicator.image}
                  alt={indicator.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute -bottom-6 left-6 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-xl">
                  {indicator.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-10">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-foreground flex-1">
                    {indicator.title}
                  </h3>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {indicator.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseIndicatorsSection;
