import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Palette, Download, Eye, Search, BedDouble, Bath, Maximize2, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const categories = [
  { id: 'all', label: 'Semua Tipe' },
  { id: 'rumah-36', label: 'Tipe 36' },
  { id: 'rumah-45', label: 'Tipe 45' },
  { id: 'rumah-54', label: 'Tipe 54' },
  { id: 'rusun', label: 'Rusun' },
];

const designs = [
  { 
    id: 1, 
    title: 'Rumah Tipe 36 Minimalis', 
    category: 'rumah-36', 
    image: '/placeholder.svg',
    bedrooms: 2,
    bathrooms: 1,
    area: 36,
    carport: false,
    previewImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
  { 
    id: 2, 
    title: 'Rumah Tipe 45 Modern', 
    category: 'rumah-45', 
    image: '/placeholder.svg',
    bedrooms: 2,
    bathrooms: 1,
    area: 45,
    carport: true,
    previewImages: ['/placeholder.svg', '/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
  { 
    id: 3, 
    title: 'Rumah Tipe 54 Tropis', 
    category: 'rumah-54', 
    image: '/placeholder.svg',
    bedrooms: 3,
    bathrooms: 2,
    area: 54,
    carport: true,
    previewImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
  { 
    id: 4, 
    title: 'Rusun Blok A', 
    category: 'rusun', 
    image: '/placeholder.svg',
    bedrooms: 2,
    bathrooms: 1,
    area: 36,
    carport: false,
    previewImages: ['/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
  { 
    id: 5, 
    title: 'Rumah Tipe 36 Compact', 
    category: 'rumah-36', 
    image: '/placeholder.svg',
    bedrooms: 2,
    bathrooms: 1,
    area: 36,
    carport: false,
    previewImages: ['/placeholder.svg', '/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
  { 
    id: 6, 
    title: 'Rumah Tipe 45 Klasik', 
    category: 'rumah-45', 
    image: '/placeholder.svg',
    bedrooms: 3,
    bathrooms: 1,
    area: 45,
    carport: true,
    previewImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    pdfUrl: '/sample.pdf',
  },
];

const BankDesain = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDesign, setPreviewDesign] = useState<typeof designs[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useScrollAnimation();

  const filteredDesigns = designs.filter((design) => {
    const matchesCategory = activeCategory === 'all' || design.category === activeCategory;
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (design: typeof designs[0]) => {
    setPreviewDesign(design);
    setCurrentImageIndex(0);
  };

  const handleDownloadPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  const nextImage = () => {
    if (previewDesign) {
      setCurrentImageIndex((prev) => 
        prev < previewDesign.previewImages.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (previewDesign) {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : previewDesign.previewImages.length - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-background to-accent-2/20 dark:from-background dark:via-primary/5 dark:to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10 animate-on-scroll">
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

          {/* Search & Filter - Compact */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-on-scroll">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari desain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-card">
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Design Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredDesigns.map((design, index) => (
              <div
                key={design.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all shadow-md hover:shadow-xl animate-on-scroll group"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <img src={design.image} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg mb-3">{design.title}</h3>
                  
                  {/* Facilities */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BedDouble className="w-4 h-4 text-primary" />
                      <span>{design.bedrooms} Kamar Tidur</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bath className="w-4 h-4 text-primary" />
                      <span>{design.bathrooms} Kamar Mandi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Maximize2 className="w-4 h-4 text-primary" />
                      <span>{design.area} m²</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="w-4 h-4 text-primary" />
                      <span>{design.carport ? 'Ada Carport' : 'Tanpa Carport'}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handlePreview(design)}
                      className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button 
                      onClick={() => handleDownloadPdf(design.pdfUrl)}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Unduh PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDesigns.length === 0 && (
            <div className="text-center py-16 bg-card rounded-2xl border border-border animate-on-scroll">
              <Palette className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Tidak Ada Desain Ditemukan</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Coba ubah filter atau kata kunci pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Preview Dialog with Carousel */}
      <Dialog open={!!previewDesign} onOpenChange={() => setPreviewDesign(null)}>
        <DialogContent className="max-w-4xl bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">{previewDesign?.title}</DialogTitle>
          </DialogHeader>
          {previewDesign && (
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                <img 
                  src={previewDesign.previewImages[currentImageIndex]} 
                  alt={`Preview ${currentImageIndex + 1}`} 
                  className="w-full h-full object-contain"
                />
                
                {/* Navigation Arrows */}
                {previewDesign.previewImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Dots Indicator */}
              {previewDesign.previewImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {previewDesign.previewImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentImageIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                Gambar preview tidak dapat diunduh. Gunakan tombol "Unduh PDF" untuk mendapatkan dokumen lengkap.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankDesain;
