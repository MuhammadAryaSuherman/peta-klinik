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
    checklist: [
      'Luas bangunan minimal 9m² per orang',
      'Ruang cukup untuk aktivitas keluarga',
      'Ventilasi udara memadai',
    ],
  },
  {
    image: indicatorKebersihan,
    icon: Sparkles,
    title: 'Kebersihan Terjaga',
    checklist: [
      'Bebas dari genangan air',
      'Tidak ada tumpukan sampah',
      'Bebas hewan berbahaya',
    ],
  },
  {
    image: indicatorKonstruksi,
    icon: Shield,
    title: 'Konstruksi Aman',
    checklist: [
      'Struktur bangunan kokoh',
      'Atap tidak bocor',
      'Dinding dan lantai kondisi baik',
    ],
  },
  {
    image: indicatorAir,
    icon: Droplets,
    title: 'Akses Air Bersih',
    checklist: [
      'Sumber air bersih tersedia',
      'Jarak sumber air terjangkau',
      'Kualitas air layak konsumsi',
    ],
  },
  {
    image: indicatorJalan,
    icon: MapPin,
    title: 'Akses Jalan',
    checklist: [
      'Jalan dapat dilalui kendaraan',
      'Akses mudah ke fasilitas umum',
      'Kondisi jalan layak',
    ],
  },
  {
    image: indicatorDrainase,
    icon: Waves,
    title: 'Drainase Baik',
    checklist: [
      'Saluran air berfungsi baik',
      'Tidak ada genangan saat hujan',
      'Limbah tersalur dengan benar',
    ],
  },
];

const HousingIndicatorsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-secondary/40 dark:from-background dark:via-primary/5 dark:to-background" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--accent-2) / 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-2/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  
                  {/* Icon Badge - Fully Visible */}
                  <div className="absolute bottom-4 left-6 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform z-10">
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                    {indicator.title}
                  </h3>
                  <ul className="space-y-2">
                    {indicator.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
