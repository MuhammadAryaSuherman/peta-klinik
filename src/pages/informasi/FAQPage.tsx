import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { HelpCircle, ChevronDown, Search, Home, FileCheck, Users, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const faqCategories = [
  { id: 'bsps', label: 'BSPS', icon: Home },
  { id: 'rusun', label: 'Rusunawa', icon: FileCheck },
  { id: 'kumuh', label: 'Kawasan Kumuh', icon: Users },
  { id: 'umum', label: 'Umum', icon: Wallet },
];

const faqs = [
  { 
    category: 'bsps',
    q: 'Apa itu BSPS?', 
    a: 'BSPS (Bantuan Stimulan Perumahan Swadaya) adalah program bantuan pemerintah untuk membantu masyarakat berpenghasilan rendah dalam membangun atau memperbaiki rumah agar layak huni. Bantuan ini bersifat stimulan dan tidak perlu dikembalikan.' 
  },
  { 
    category: 'bsps',
    q: 'Bagaimana cara mendaftar BSPS?', 
    a: 'Pendaftaran dilakukan melalui kantor desa atau kelurahan setempat. Calon penerima mengisi formulir, menyerahkan dokumen persyaratan, lalu menunggu proses verifikasi dan seleksi oleh tim.' 
  },
  { 
    category: 'bsps',
    q: 'Apa saja syarat untuk mendapatkan bantuan BSPS?', 
    a: 'Syarat utama: WNI, sudah berkeluarga/berusia 21 tahun, berpenghasilan rendah, memiliki tanah dengan bukti kepemilikan, belum pernah menerima bantuan perumahan pemerintah, dan rumah tidak layak huni atau belum memiliki rumah.' 
  },
  { 
    category: 'bsps',
    q: 'Berapa nilai bantuan BSPS yang diberikan?', 
    a: 'Nilai bantuan bervariasi: Peningkatan Kualitas Rp 17,5 juta, Pembangunan Baru Rp 40 juta. Bantuan disalurkan secara bertahap sesuai progres pembangunan.' 
  },
  { 
    category: 'rusun',
    q: 'Apa itu Rusunawa?', 
    a: 'Rusunawa (Rumah Susun Sederhana Sewa) adalah hunian vertikal yang disediakan pemerintah untuk masyarakat berpenghasilan rendah dengan sistem sewa bulanan yang terjangkau.' 
  },
  { 
    category: 'rusun',
    q: 'Bagaimana cara mengajukan sewa unit Rusunawa?', 
    a: 'Pengajuan dilakukan ke pengelola rusun setempat (biasanya UPT Dinas Perumahan) dengan menyerahkan dokumen KTP, KK, surat keterangan tidak mampu, dan dokumen pendukung lainnya.' 
  },
  { 
    category: 'kumuh',
    q: 'Apa yang dimaksud dengan kawasan kumuh?', 
    a: 'Kawasan kumuh adalah permukiman yang tidak layak huni karena ketidakteraturan bangunan, kepadatan tinggi, serta kualitas bangunan dan sarana prasarana yang tidak memenuhi syarat.' 
  },
  { 
    category: 'kumuh',
    q: 'Program apa saja untuk penanganan kawasan kumuh?', 
    a: 'Program meliputi KOTAKU (Kota Tanpa Kumuh), peningkatan kualitas infrastruktur (jalan, drainase, sanitasi), pembangunan MCK komunal, dan penyediaan air bersih.' 
  },
  { 
    category: 'umum',
    q: 'Dimana lokasi Klinik PKP BP3KP Sumatera II?', 
    a: 'Klinik PKP berlokasi di Jl. Karya Rakyat, Medan, Sumatera Utara. Buka Senin-Jumat pukul 07:30-16:00 WIB (Jumat sampai 16:30).' 
  },
  { 
    category: 'umum',
    q: 'Layanan apa saja yang tersedia di Klinik PKP?', 
    a: 'Layanan meliputi konsultasi teknis pembangunan rumah, informasi program BSPS, bank desain rumah, informasi rusunawa, penanganan kawasan kumuh, dan sosialisasi program perumahan.' 
  },
  { 
    category: 'umum',
    q: 'Apakah layanan Klinik PKP berbayar?', 
    a: 'Tidak, semua layanan konsultasi dan informasi di Klinik PKP diberikan secara GRATIS untuk masyarakat.' 
  },
];

const FAQPage = () => {
  const ref = useScrollAnimation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-2/10" />
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Temukan jawaban atas pertanyaan umum seputar program perumahan dan layanan kami.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-10 animate-on-scroll">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-card border-border"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary/50'
                }`}
              >
                Semua
              </button>
              {faqCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden animate-on-scroll hover:border-primary/30 transition-colors"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{faq.q}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada pertanyaan yang ditemukan.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center py-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 animate-on-scroll">
            <h3 className="text-xl font-bold text-foreground mb-3">Tidak menemukan jawaban?</h3>
            <p className="text-muted-foreground mb-6">Hubungi kami langsung untuk bantuan lebih lanjut.</p>
            <a 
              href="/informasi/kontak"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-hover transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;