import { FileText, Search, Hammer, CheckCircle, Paintbrush, Home } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const steps = [
  {
    step: 1,
    icon: <FileText className="w-8 h-8" />,
    title: 'Perencanaan',
    description: 'Tentukan kebutuhan, anggaran, dan desain rumah yang sesuai dengan kondisi keluarga.',
  },
  {
    step: 2,
    icon: <Search className="w-8 h-8" />,
    title: 'Survei & Perizinan',
    description: 'Lakukan survei lahan dan urus perizinan yang diperlukan seperti IMB.',
  },
  {
    step: 3,
    icon: <Hammer className="w-8 h-8" />,
    title: 'Pembangunan Struktur',
    description: 'Bangun fondasi, dinding, dan atap dengan material berkualitas dan tahan lama.',
  },
  {
    step: 4,
    icon: <Paintbrush className="w-8 h-8" />,
    title: 'Finishing',
    description: 'Pengerjaan finishing meliputi plester, cat, keramik, dan instalasi.',
  },
  {
    step: 5,
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Pemeriksaan Akhir',
    description: 'Verifikasi kualitas bangunan dan kelengkapan sesuai standar.',
  },
  {
    step: 6,
    icon: <Home className="w-8 h-8" />,
    title: 'Serah Terima',
    description: 'Rumah siap ditempati dengan dokumentasi lengkap.',
  },
];

const BuildingStepsSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
            Panduan Pembangunan
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tahapan Membangun Rumah
          </h2>
          <p className="text-muted-foreground text-lg">
            Ikuti langkah-langkah berikut untuk membangun rumah yang berkualitas dan sesuai standar.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 gap-x-8 gap-y-12">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && index !== 2 && (
                  <div className="absolute top-8 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-gradient-to-r from-primary to-accent hidden lg:block" />
                )}

                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground shadow-xl">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent-secondary text-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="flex gap-4 animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent-secondary text-foreground rounded-full flex items-center justify-center text-xs font-bold shadow">
                    {step.step}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-accent/30" />
                  )}
                </div>

                <div className="pt-2">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingStepsSection;
