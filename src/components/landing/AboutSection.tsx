import { CheckCircle, Target, Eye, Award } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Tentang Kami
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Balai Pelaksana Penyediaan Perumahan
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              BP3KP (Balai Pelaksana Penyediaan Perumahan Kawasan Permukiman) adalah unit pelaksana teknis 
              di bawah Kementerian Perumahan dan Kawasan Permukiman yang bertugas melaksanakan penyediaan 
              perumahan dan pengembangan kawasan permukiman.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Kami hadir untuk memberikan layanan konsultasi dan informasi terpadu kepada masyarakat 
              terkait program-program perumahan, rusun, penanganan kawasan kumuh, dan bantuan perumahan lainnya.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                'Penyediaan data sebaran rusun yang akurat',
                'Profil kawasan kumuh dan program penanganan',
                'Simulasi KPR untuk membantu perencanaan',
                'Bank desain untuk referensi pembangunan',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Vision & Mission Cards */}
          <div className="space-y-6">
            <div className="p-8 bg-card rounded-2xl border border-border shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Visi</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mewujudkan penyediaan perumahan dan permukiman yang layak, terjangkau, dan berkelanjutan 
                bagi seluruh masyarakat Indonesia.
              </p>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Misi</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Meningkatkan akses masyarakat terhadap informasi perumahan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Menyediakan layanan konsultasi yang berkualitas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Mendukung program penanganan kawasan kumuh
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-primary-foreground">
              <div className="flex items-center gap-4">
                <Award className="w-10 h-10" />
                <div>
                  <p className="text-2xl font-bold">10+ Tahun</p>
                  <p className="text-primary-foreground/80">Melayani Masyarakat Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
