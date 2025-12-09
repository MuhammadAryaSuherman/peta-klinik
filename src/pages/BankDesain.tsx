import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Palette, Home, Building2, Download, Eye, Filter, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'rumah-36', label: 'Rumah Tipe 36' },
  { id: 'rumah-45', label: 'Rumah Tipe 45' },
  { id: 'rumah-54', label: 'Rumah Tipe 54' },
  { id: 'rusun', label: 'Rusun' },
];

const designs = [
  { id: 1, title: 'Rumah Tipe 36 Minimalis', category: 'rumah-36', image: '/placeholder.svg', downloads: 234 },
  { id: 2, title: 'Rumah Tipe 45 Modern', category: 'rumah-45', image: '/placeholder.svg', downloads: 189 },
  { id: 3, title: 'Rumah Tipe 54 Tropis', category: 'rumah-54', image: '/placeholder.svg', downloads: 156 },
  { id: 4, title: 'Rusun Blok A', category: 'rusun', image: '/placeholder.svg', downloads: 312 },
  { id: 5, title: 'Rumah Tipe 36 Compact', category: 'rumah-36', image: '/placeholder.svg', downloads: 278 },
  { id: 6, title: 'Rumah Tipe 45 Klasik', category: 'rumah-45', image: '/placeholder.svg', downloads: 145 },
];

const BankDesain = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useScrollAnimation();

  const filteredDesigns = designs.filter((design) => {
    const matchesCategory = activeCategory === 'all' || design.category === activeCategory;
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <Palette className="w-4 h-4" />
              <span>Bank Desain</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Koleksi Desain Rumah & Rusun
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Temukan berbagai desain rumah dan rusun yang dapat menjadi inspirasi untuk pembangunan hunian Anda.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-on-scroll">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari desain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Desain Rumah</h2>
              <p className="text-muted-foreground mb-6">
                Koleksi desain rumah dengan berbagai tipe dan ukuran yang sesuai dengan kebutuhan keluarga Indonesia.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all shadow-lg hover:shadow-xl animate-on-scroll group" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Desain Rusun</h2>
              <p className="text-muted-foreground mb-6">
                Desain rumah susun yang efisien dan nyaman untuk hunian vertikal di perkotaan.
              </p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Design Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDesigns.map((design, index) => (
              <div
                key={design.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all shadow-md hover:shadow-xl animate-on-scroll group"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <img src={design.image} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white/90 text-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white transition-colors">
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary-hover transition-colors">
                        <Download className="w-4 h-4" />
                        Unduh
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{design.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{design.category.replace('-', ' ')}</span>
                    <span className="text-primary font-medium">{design.downloads} unduhan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          <div className="text-center py-16 bg-card rounded-2xl border border-border animate-on-scroll">
            <Palette className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Desain Akan Ditampilkan Di Sini</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Hubungkan ke API backend untuk menampilkan koleksi lengkap desain rumah dan rusun.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BankDesain;
