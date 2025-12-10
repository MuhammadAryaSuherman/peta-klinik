import { useState, useMemo } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Gift, FileCheck, Users, ClipboardList, CheckCircle, ArrowRight, AlertCircle, HelpCircle, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Penerima {
  id: number;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  tahun: number;
  status: 'selesai' | 'proses' | 'rencana';
}

// Sample data
const penerimaData: Penerima[] = [
  { id: 1, nama: 'Ahmad Sulaiman', desa: 'Tanjung Rejo', kecamatan: 'Percut Sei Tuan', kabupaten: 'Deli Serdang', tahun: 2023, status: 'selesai' },
  { id: 2, nama: 'Siti Aminah', desa: 'Medan Krio', kecamatan: 'Sunggal', kabupaten: 'Deli Serdang', tahun: 2023, status: 'selesai' },
  { id: 3, nama: 'Budi Santoso', desa: 'Bandar Khalipah', kecamatan: 'Percut Sei Tuan', kabupaten: 'Deli Serdang', tahun: 2024, status: 'proses' },
  { id: 4, nama: 'Dewi Lestari', desa: 'Helvetia', kecamatan: 'Labuhan Deli', kabupaten: 'Deli Serdang', tahun: 2022, status: 'selesai' },
  { id: 5, nama: 'Eko Prasetyo', desa: 'Padang Bulan', kecamatan: 'Medan Baru', kabupaten: 'Kota Medan', tahun: 2024, status: 'proses' },
];

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

const statusLabels = {
  selesai: 'Selesai',
  proses: 'Dalam Proses',
  rencana: 'Rencana',
};

const statusColors = {
  selesai: 'bg-green-500',
  proses: 'bg-yellow-500',
  rencana: 'bg-blue-500',
};

const PenerimaanBSPS = () => {
  const ref = useScrollAnimation();
  const [searchQuery, setSearchQuery] = useState('');
  const [kabupatenFilter, setKabupatenFilter] = useState<string>('all');
  const [kecamatanFilter, setKecamatanFilter] = useState<string>('all');
  const [kelurahanFilter, setKelurahanFilter] = useState<string>('all');

  const kabupatenList = useMemo(() => [...new Set(penerimaData.map(p => p.kabupaten))], []);
  const kecamatanList = useMemo(() => {
    const filtered = kabupatenFilter === 'all' ? penerimaData : penerimaData.filter(p => p.kabupaten === kabupatenFilter);
    return [...new Set(filtered.map(p => p.kecamatan))];
  }, [kabupatenFilter]);
  const kelurahanList = useMemo(() => {
    let filtered = penerimaData;
    if (kabupatenFilter !== 'all') filtered = filtered.filter(p => p.kabupaten === kabupatenFilter);
    if (kecamatanFilter !== 'all') filtered = filtered.filter(p => p.kecamatan === kecamatanFilter);
    return [...new Set(filtered.map(p => p.desa))];
  }, [kabupatenFilter, kecamatanFilter]);

  const filteredPenerima = useMemo(() => {
    return penerimaData.filter((p) => {
      const matchesSearch = !searchQuery || p.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKabupaten = kabupatenFilter === 'all' || p.kabupaten === kabupatenFilter;
      const matchesKecamatan = kecamatanFilter === 'all' || p.kecamatan === kecamatanFilter;
      const matchesKelurahan = kelurahanFilter === 'all' || p.desa === kelurahanFilter;
      return matchesSearch && matchesKabupaten && matchesKecamatan && matchesKelurahan;
    });
  }, [searchQuery, kabupatenFilter, kecamatanFilter, kelurahanFilter]);

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

          {/* Penerima BSPS Section */}
          <div className="mb-16 bg-card rounded-2xl border border-border p-6 shadow-lg animate-on-scroll">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Data Penerima BSPS
            </h2>
            
            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={kabupatenFilter} onValueChange={(v) => { setKabupatenFilter(v); setKecamatanFilter('all'); setKelurahanFilter('all'); }}>
                <SelectTrigger><SelectValue placeholder="Kabupaten/Kota" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kabupaten/Kota</SelectItem>
                  {kabupatenList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={kecamatanFilter} onValueChange={(v) => { setKecamatanFilter(v); setKelurahanFilter('all'); }}>
                <SelectTrigger><SelectValue placeholder="Kecamatan" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kecamatan</SelectItem>
                  {kecamatanList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={kelurahanFilter} onValueChange={setKelurahanFilter}>
                <SelectTrigger><SelectValue placeholder="Kelurahan/Desa" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelurahan/Desa</SelectItem>
                  {kelurahanList.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Desa</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Kecamatan</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Kabupaten</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Tahun</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPenerima.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-foreground">{p.nama}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.desa}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.kecamatan}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.kabupaten}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.tahun}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded text-white ${statusColors[p.status]}`}>
                          {statusLabels[p.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Persyaratan</h3>
              <p className="text-muted-foreground">Informasi lengkap persyaratan untuk mendaftar program BSPS.</p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Prosedur Pendaftaran</h3>
              <p className="text-muted-foreground">Langkah-langkah untuk mengajukan bantuan BSPS.</p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Kriteria Penerima</h3>
              <p className="text-muted-foreground">Kriteria masyarakat yang berhak menerima BSPS.</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Persyaratan Penerima</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border animate-on-scroll" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Prosedur Pendaftaran</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.step} className="relative p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Pertanyaan Umum</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-2xl border border-border animate-on-scroll hover:border-primary/30 transition-colors" style={{ transitionDelay: `${index * 0.1}s` }}>
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
          <div className="p-8 bg-card rounded-2xl border border-border animate-on-scroll text-center">
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Butuh Bantuan?</h3>
            <p className="text-muted-foreground mb-6">Hubungi kami untuk informasi lebih lanjut tentang program BSPS</p>
            <Link to="/informasi/kontak" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-colors">
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PenerimaanBSPS;
