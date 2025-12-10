import { ClipboardList, Search, FileCheck, Wallet, Hammer, Home } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const steps = [
  {
    icon: ClipboardList,
    step: 1,
    title: 'Perencanaan',
    description: 'Tentukan kebutuhan, lokasi, dan anggaran pembangunan rumah Anda.',
  },
  {
    icon: Search,
    step: 2,
    title: 'Survey Lokasi',
    description: 'Periksa kondisi tanah, akses jalan, dan ketersediaan utilitas.',
  },
  {
    icon: FileCheck,
    step: 3,
    title: 'Perizinan',
    description: 'Urus IMB dan dokumen perizinan yang diperlukan untuk pembangunan.',
  },
  {
    icon: Wallet,
    step: 4,
    title: 'Pendanaan',
    description: 'Siapkan dana atau ajukan KPR/bantuan BSPS jika memenuhi syarat.',
  },
  {
    icon: Hammer,
    step: 5,
    title: 'Konstruksi',
    description: 'Lakukan pembangunan sesuai gambar teknis dan standar konstruksi.',
  },
  {
    icon: Home,
    step: 6,
    title: 'Serah Terima',
    description: 'Periksa hasil pembangunan dan lakukan serah terima rumah.',
  },
];

const BuildingStepsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Panduan Pembangunan
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Bagaimana Tahapan Membangun Rumah?
          </h2>
          <p className="text-muted-foreground">
            Ikuti langkah-langkah berikut untuk membangun rumah impian Anda dengan terencana dan aman.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="relative animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                    {/* Step Number with Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent-2 rounded-full flex items-center justify-center text-accent-2-foreground font-bold text-sm shadow">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingStepsSection;
