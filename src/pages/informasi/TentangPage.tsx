import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Building2, Target, Eye, Users, Award, Shield, CheckCircle } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Integritas', description: 'Menjalankan tugas dengan jujur dan bertanggung jawab' },
  { icon: Users, title: 'Kolaboratif', description: 'Bekerja sama dengan berbagai pihak untuk hasil terbaik' },
  { icon: Award, title: 'Profesional', description: 'Memberikan layanan dengan standar kualitas tinggi' },
  { icon: Target, title: 'Inovatif', description: 'Terus berinovasi dalam pelayanan masyarakat' },
];

const achievements = [
  'Melayani 10 provinsi di wilayah Sumatera',
  'Lebih dari 5.000 penerima bantuan BSPS',
  'Membangun 150+ unit rusunawa',
  'Menangani 50+ kawasan kumuh',
  'Menyelenggarakan 100+ kegiatan sosialisasi',
];

const TentangPage = () => {
  const ref = useScrollAnimation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-2/10" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <Building2 className="w-4 h-4" />
              <span>Tentang Kami</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              BP3KP Sumatera II
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Balai Penyediaan Perumahan dan Pengembangan Kawasan Permukiman Sumatera II adalah unit pelaksana 
              teknis di bawah Kementerian Perumahan dan Kawasan Permukiman yang bertugas melaksanakan penyediaan 
              perumahan dan pengembangan kawasan permukiman di wilayah Sumatera.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-on-scroll hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mewujudkan rumah layak huni bagi masyarakat Indonesia yang terjangkau dan berkelanjutan, 
                serta menciptakan kawasan permukiman yang nyaman, aman, dan produktif di wilayah Sumatera.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-on-scroll hover:shadow-xl transition-shadow" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Misi</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Meningkatkan akses masyarakat terhadap hunian layak</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Mengembangkan kawasan permukiman yang berkualitas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Memberikan pelayanan prima kepada masyarakat</span>
                </li>
              </ul>
            </div>
          </div>

          {/* About Klinik PKP */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 mb-16 border border-primary/20 animate-on-scroll">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Klinik Perumahan & Kawasan Permukiman
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Klinik PKP hadir sebagai wadah pelayanan terpadu yang memberikan konsultasi, informasi, 
                dan pendampingan kepada masyarakat terkait program-program perumahan. Kami menyediakan 
                berbagai layanan mulai dari konsultasi teknis pembangunan rumah, informasi bantuan BSPS, 
                hingga penanganan kawasan kumuh.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">10</div>
                  <div className="text-muted-foreground">Provinsi Dilayani</div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-muted-foreground">Penerima BSPS</div>
                </div>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Unit Rusun</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 animate-on-scroll">
              Nilai-Nilai Kami
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-2xl border border-border p-6 text-center shadow-lg hover:shadow-xl hover:border-primary/30 transition-all animate-on-scroll group"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-lg animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Pencapaian Kami
            </h2>
            <div className="max-w-2xl mx-auto">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 py-4 border-b border-border last:border-0 animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-foreground text-lg">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TentangPage;