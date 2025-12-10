import { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Gift, FileCheck, Users, ClipboardList, CheckCircle, ArrowRight, AlertCircle, HelpCircle, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface DesaData {
  id: number;
  nama: string;
  kecamatan: string;
  kabupaten: string;
  jumlahPenerima: number;
  coordinates: [number, number];
  status: 'selesai' | 'proses' | 'rencana';
  penerimaList: Array<{ nama: string; alamat: string; coordinates: [number, number] }>;
}

const desaData: DesaData[] = [
  {
    id: 1,
    nama: 'Tanjung Rejo',
    kecamatan: 'Percut Sei Tuan',
    kabupaten: 'Deli Serdang',
    jumlahPenerima: 25,
    coordinates: [3.6123, 98.7456],
    status: 'selesai',
    penerimaList: [
      { nama: 'Ahmad Sulaiman', alamat: 'Dusun I', coordinates: [3.6120, 98.7450] },
      { nama: 'Siti Aminah', alamat: 'Dusun II', coordinates: [3.6125, 98.7458] },
      { nama: 'Budi Santoso', alamat: 'Dusun III', coordinates: [3.6128, 98.7462] },
    ],
  },
  {
    id: 2,
    nama: 'Medan Krio',
    kecamatan: 'Sunggal',
    kabupaten: 'Deli Serdang',
    jumlahPenerima: 18,
    coordinates: [3.5789, 98.6234],
    status: 'proses',
    penerimaList: [
      { nama: 'Dewi Lestari', alamat: 'Dusun I', coordinates: [3.5785, 98.6230] },
      { nama: 'Eko Prasetyo', alamat: 'Dusun II', coordinates: [3.5792, 98.6238] },
    ],
  },
  {
    id: 3,
    nama: 'Bandar Khalipah',
    kecamatan: 'Percut Sei Tuan',
    kabupaten: 'Deli Serdang',
    jumlahPenerima: 32,
    coordinates: [3.6345, 98.7789],
    status: 'selesai',
    penerimaList: [
      { nama: 'Rahmat Hidayat', alamat: 'Dusun I', coordinates: [3.6340, 98.7785] },
      { nama: 'Nurul Aini', alamat: 'Dusun II', coordinates: [3.6348, 98.7792] },
    ],
  },
  {
    id: 4,
    nama: 'Padang Bulan',
    kecamatan: 'Medan Baru',
    kabupaten: 'Kota Medan',
    jumlahPenerima: 15,
    coordinates: [3.5678, 98.6543],
    status: 'rencana',
    penerimaList: [
      { nama: 'Joko Widodo', alamat: 'Lingkungan I', coordinates: [3.5675, 98.6540] },
    ],
  },
];

const statusColors = {
  selesai: { fill: '#22c55e', stroke: '#16a34a' },
  proses: { fill: '#eab308', stroke: '#ca8a04' },
  rencana: { fill: '#3b82f6', stroke: '#2563eb' },
};

const statusLabels = {
  selesai: 'Selesai',
  proses: 'Dalam Proses',
  rencana: 'Rencana',
};

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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [kabupatenFilter, setKabupatenFilter] = useState<string>('all');
  const [kecamatanFilter, setKecamatanFilter] = useState<string>('all');
  const [kelurahanFilter, setKelurahanFilter] = useState<string>('all');

  const kabupatenList = useMemo(() => [...new Set(desaData.map(p => p.kabupaten))], []);
  const kecamatanList = useMemo(() => {
    const filtered = kabupatenFilter === 'all' ? desaData : desaData.filter(p => p.kabupaten === kabupatenFilter);
    return [...new Set(filtered.map(p => p.kecamatan))];
  }, [kabupatenFilter]);
  const kelurahanList = useMemo(() => {
    let filtered = desaData;
    if (kabupatenFilter !== 'all') filtered = filtered.filter(p => p.kabupaten === kabupatenFilter);
    if (kecamatanFilter !== 'all') filtered = filtered.filter(p => p.kecamatan === kecamatanFilter);
    return [...new Set(filtered.map(p => p.nama))];
  }, [kabupatenFilter, kecamatanFilter]);

  const filteredDesa = useMemo(() => {
    return desaData.filter((p) => {
      const matchesSearch = !searchQuery || p.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKabupaten = kabupatenFilter === 'all' || p.kabupaten === kabupatenFilter;
      const matchesKecamatan = kecamatanFilter === 'all' || p.kecamatan === kecamatanFilter;
      const matchesKelurahan = kelurahanFilter === 'all' || p.nama === kelurahanFilter;
      return matchesSearch && matchesKabupaten && matchesKecamatan && matchesKelurahan;
    });
  }, [searchQuery, kabupatenFilter, kecamatanFilter, kelurahanFilter]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [3.6, 98.7],
      zoom: 11,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add circles for each desa
    filteredDesa.forEach((desa) => {
      const colors = statusColors[desa.status];
      
      // Village circle
      const circle = L.circle(desa.coordinates, {
        radius: 800,
        color: colors.stroke,
        fillColor: colors.fill,
        fillOpacity: 0.3,
        weight: 2,
      }).addTo(map);

      // Center marker for village
      const centerIcon = L.divIcon({
        html: `
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-white font-bold text-sm" style="background: ${colors.fill}">
            ${desa.jumlahPenerima}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const centerMarker = L.marker(desa.coordinates, { icon: centerIcon }).addTo(map);

      centerMarker.bindPopup(`
        <div class="p-4 min-w-[250px]">
          <h3 class="font-bold text-lg mb-2">${desa.nama}</h3>
          <p class="text-sm mb-1">Kecamatan: ${desa.kecamatan}</p>
          <p class="text-sm mb-1">Kabupaten: ${desa.kabupaten}</p>
          <p class="text-sm mb-2">Jumlah Penerima: ${desa.jumlahPenerima}</p>
          <span class="inline-block px-2 py-1 text-xs font-medium rounded text-white" style="background: ${colors.fill}">
            ${statusLabels[desa.status]}
          </span>
        </div>
      `);

      // When circle is clicked, zoom in and show individual markers
      circle.on('click', () => {
        map.setView(desa.coordinates, 16);
        
        // Add individual recipient markers
        desa.penerimaList.forEach((penerima) => {
          const recipientIcon = L.divIcon({
            html: `
              <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          L.marker(penerima.coordinates, { icon: recipientIcon })
            .addTo(map)
            .bindPopup(`
              <div class="p-3">
                <h4 class="font-bold">${penerima.nama}</h4>
                <p class="text-sm">${penerima.alamat}</p>
              </div>
            `);
        });
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [filteredDesa]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
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

          {/* Map Section */}
          <div className="mb-16 bg-card rounded-2xl border border-border p-6 shadow-lg animate-on-scroll">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Peta Lokasi Penerima BSPS
            </h2>
            
            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari desa..."
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

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4">
              {Object.entries(statusLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: statusColors[key as keyof typeof statusColors].fill }} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <div 
              ref={mapRef} 
              className="w-full h-[500px] rounded-xl overflow-hidden border border-border"
            />
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Klik pada area lingkaran untuk melihat detail penerima bantuan di desa tersebut
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <button 
              onClick={() => document.getElementById('persyaratan')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group text-left"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Persyaratan</h3>
              <p className="text-muted-foreground">Informasi lengkap persyaratan untuk mendaftar program BSPS.</p>
            </button>

            <button 
              onClick={() => document.getElementById('prosedur')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group text-left"
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Prosedur Pendaftaran</h3>
              <p className="text-muted-foreground">Langkah-langkah untuk mengajukan bantuan BSPS.</p>
            </button>

            <button 
              onClick={() => document.getElementById('kriteria')?.scrollIntoView({ behavior: 'smooth' })}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group text-left"
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Kriteria Penerima</h3>
              <p className="text-muted-foreground">Kriteria masyarakat yang berhak menerima BSPS.</p>
            </button>
          </div>

          {/* Requirements */}
          <div id="persyaratan" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Persyaratan Penerima</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border animate-on-scroll" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div id="prosedur" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Prosedur Pendaftaran</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.slice(0, 3).map((step, index) => (
                <div key={step.step} className="relative p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
              {steps.slice(3).map((step, index) => (
                <div key={step.step} className="relative p-6 bg-card rounded-2xl border border-border text-center animate-on-scroll hover:border-primary/30 transition-colors" style={{ transitionDelay: `${(index + 3) * 0.1}s` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kriteria Penerima */}
          <div id="kriteria" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Kriteria Penerima</h2>
            <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Kriteria Utama
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Masyarakat Berpenghasilan Rendah (MBR)</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Memiliki rumah tidak layak huni</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Prioritas Penerima
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Lansia, janda, dan penyandang disabilitas</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Keluarga miskin dengan anak balita</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Korban bencana alam</span>
                    </li>
                  </ul>
                </div>
              </div>
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

      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default PenerimaanBSPS;
