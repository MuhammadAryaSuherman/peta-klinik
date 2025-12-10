import { CheckCircle2, Maximize2, Sparkles, Shield, Droplets, MapPin, Waves } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

import indicatorLuas from '@/assets/indicator-luas.jpg';
import indicatorKebersihan from '@/assets/indicator-kebersihan.jpg';
import indicatorKonstruksi from '@/assets/indicator-konstruksi.jpg';
import indicatorAir from '@/assets/indicator-air.jpg';
import indicatorJalan from '@/assets/indicator-jalan.jpg';
import indicatorDrainase from '@/assets/indicator-drainase.jpg';

const indicators = [
  {
    image: indicatorLuas,
    icon: Maximize2,
    title: 'Luas Rumah Memadai',
    description: 'Luas bangunan minimal 9m² per orang untuk memberikan ruang yang cukup bagi penghuni rumah.',
  },
  {
    image: indicatorKebersihan,
    icon: Sparkles,
    title: 'Kebersihan Terjaga',
    description: 'Kondisi rumah bersih, bebas dari genangan air, sampah, dan hewan berbahaya.',
  },
  {
    image: indicatorKonstruksi,
    icon: Shield,
    title: 'Konstruksi Aman',
    description: 'Struktur bangunan kokoh, atap tidak bocor, dan dinding serta lantai dalam kondisi baik.',
  },
  {
    image: indicatorAir,
    icon: Droplets,
    title: 'Akses Air Bersih',
    description: 'Tersedia akses air bersih yang mudah dijangkau untuk kebutuhan sehari-hari keluarga.',
  },
  {
    image: indicatorJalan,
    icon: MapPin,
    title: 'Akses Jalan',
    description: 'Lokasi rumah dapat dijangkau dengan mudah melalui jalan yang layak dilalui.',
  },
  {
    image: indicatorDrainase,
    icon: Waves,
    title: 'Drainase Baik',
    description: 'Sistem drainase berfungsi dengan baik sehingga tidak terjadi genangan air hujan.',
  },
];

const HousingIndicatorsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Indikator Kelayakan
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Apakah Rumahmu Layak Huni?
          </h2>
          <p className="text-muted-foreground">
            Berikut adalah 6 indikator utama yang menentukan apakah sebuah rumah layak untuk dihuni.
          </p>
        </div>

        {/* Indicators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Image with Icon Overlay */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={indicator.image}
                    alt={indicator.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Icon Badge - Overlapping */}
                  <div className="absolute -bottom-6 left-6 w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-10">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {indicator.title}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {indicator.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HousingIndicatorsSection;
