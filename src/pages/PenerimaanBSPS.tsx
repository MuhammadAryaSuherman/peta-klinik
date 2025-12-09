import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Gift, FileCheck, Users, ClipboardList, CheckCircle, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const requirements = [
  'Warga Negara Indonesia (WNI)',
  'Sudah berkeluarga atau berusia minimal 21 tahun',
  'Memiliki atau menguasai tanah dengan bukti kepemilikan',
  'Belum pernah menerima bantuan perumahan dari pemerintah',
  'Berpenghasilan rendah (sesuai ketentuan yang berlaku)',
  'Rumah tidak layak huni atau belum memiliki rumah',
];

const steps = [
  { step: 1, title: 'Pendaftaran', description: 'Mengisi formulir pendaftaran di kantor desa atau kelurahan' },
  { step: 2, title: 'Verifikasi', description: 'Tim melakukan verifikasi data dan survei lapangan' },
  { step: 3, title: 'Seleksi', description: 'Penetapan calon penerima berdasarkan kriteria' },
  { step: 4, title: 'Pencairan', description: 'Bantuan disalurkan secara bertahap sesuai progres' },
  { step: 5, title: 'Pembangunan', description: 'Pelaksanaan pembangunan dengan pendampingan' },
  { step: 6, title: 'Serah Terima', description: 'Verifikasi akhir dan serah terima rumah' },
];

const faqs = [
  {
    question: 'Berapa nilai bantuan BSPS yang diberikan?',
    answer: 'Nilai bantuan BSPS bervariasi tergantung jenis bantuan, mulai dari Rp 17,5 juta untuk Peningkatan Kualitas hingga Rp 40 juta untuk Pembangunan Baru.',
  },
  {
    question: 'Apakah bantuan BSPS harus dikembalikan?',
    answer: 'Tidak, bantuan BSPS bersifat stimulan (hibah) dan tidak perlu dikembalikan kepada pemerintah.',
  },
  {
    question: 'Bagaimana cara mengecek status pendaftaran?',
    answer: 'Status pendaftaran dapat dicek melalui kantor desa/kelurahan atau menghubungi kantor BP3KP setempat.',
  },
];

const PenerimaanBSPS = () => {
  const ref = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <Gift className="w-4 h-4" />
              <span>BSPS</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Penerimaan BSPS
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Bantuan Stimulan Perumahan Swadaya (BSPS) untuk masyarakat berpenghasilan rendah dalam memperbaiki atau membangun rumah.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Persyaratan</h3>
              <p className="text-muted-foreground">
                Informasi lengkap persyaratan untuk mendaftar program BSPS.
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Prosedur Pendaftaran</h3>
              <p className="text-muted-foreground">
                Langkah-langkah untuk mengajukan bantuan BSPS.
              </p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Kriteria Penerima</h3>
              <p className="text-muted-foreground">
                Kriteria masyarakat yang berhak menerima BSPS.
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Persyaratan Penerima</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Prosedur Pendaftaran</h2>
            <div className="relative max-w-4xl mx-auto">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent -translate-y-1/2" />
              
              <div className="grid md:grid-cols-3 gap-6">
                {steps.slice(0, 3).map((step, index) => (
                  <div
                    key={step.step}
                    className="relative p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4 relative z-10">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {steps.slice(3).map((step, index) => (
                  <div
                    key={step.step}
                    className="relative p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors"
                    style={{ transitionDelay: `${(index + 3) * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4 relative z-10">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Pertanyaan Umum</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-2xl border border-border animate-on-scroll hover:border-primary/30 transition-colors"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  </div>
                  <p className="text-muted-foreground pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/peta/penerima-bsps/medan"
              className="p-8 bg-gradient-to-r from-primary to-accent rounded-2xl text-primary-foreground animate-on-scroll group hover:shadow-xl transition-shadow"
            >
              <Gift className="w-12 h-12 mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Lihat Penerima BSPS</h3>
              <p className="opacity-80 mb-4">Lihat sebaran penerima BSPS di peta interaktif</p>
              <div className="flex items-center gap-2 font-medium">
                <span>Buka Peta</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <div className="p-8 bg-card rounded-2xl border border-border animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <AlertCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Butuh Bantuan?</h3>
              <p className="text-muted-foreground mb-4">Hubungi kami untuk informasi lebih lanjut tentang program BSPS</p>
              <Link
                to="/informasi/kontak"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-hover transition-colors"
              >
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PenerimaanBSPS;
