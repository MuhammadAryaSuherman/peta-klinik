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
    step: 'AKHIR',
    title: 'Tahap Akhir',
    description: 'Pemeriksaan bangunan, Mengurus SLF.',
  },
];

const BuildingStepsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 lg:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-2/20 via-background to-secondary/40 dark:from-primary/5 dark:via-background dark:to-accent/5" />
        <div className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(30deg, hsl(var(--primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary) / 0.05) 87.5%, hsl(var(--primary) / 0.05)), linear-gradient(150deg, hsl(var(--primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary) / 0.05) 87.5%, hsl(var(--primary) / 0.05)), linear-gradient(30deg, hsl(var(--primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary) / 0.05) 87.5%, hsl(var(--primary) / 0.05)), linear-gradient(150deg, hsl(var(--primary) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary) / 0.05) 87.5%, hsl(var(--primary) / 0.05)), linear-gradient(60deg, hsl(var(--accent-2) / 0.08) 25%, transparent 25.5%, transparent 75%, hsl(var(--accent-2) / 0.08) 75%, hsl(var(--accent-2) / 0.08)), linear-gradient(60deg, hsl(var(--accent-2) / 0.08) 25%, transparent 25.5%, transparent 75%, hsl(var(--accent-2) / 0.08) 75%, hsl(var(--accent-2) / 0.08))`,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          }}
        />
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-on-scroll">
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

        {/* Steps Grid with Connected Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical timeline line for the entire grid */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-green-500 rounded-full transform -translate-x-1/2 z-0" />
          
          {/* Steps */}
          <div className="relative z-10 space-y-6">
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              const isLast = item.step === 'AKHIR';
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-6 animate-on-scroll ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group inline-block w-full max-w-md ${isEven ? 'md:ml-auto' : 'md:mr-auto'} ${isLast ? 'ring-2 ring-green-500/50' : ''}`}>
                      <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-14 h-14 ${isLast ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-primary to-accent'} rounded-xl flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div className={isEven ? 'md:text-right' : ''}>
                          <span className={`text-xs font-bold ${isLast ? 'text-green-500' : 'text-primary'}`}>
                            {typeof item.step === 'number' ? `Langkah ${item.step}` : item.step}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`text-muted-foreground text-sm ${isEven ? 'md:text-right' : ''}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Point */}
                  <div className="hidden md:flex items-center justify-center relative z-20">
                    <div className={`w-10 h-10 ${isLast ? 'bg-green-500' : 'bg-primary'} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-background`}>
                      {typeof item.step === 'number' ? item.step : '✓'}
                    </div>
                  </div>

                  {/* Empty space for layout */}
                  <div className="flex-1 hidden md:block" />
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