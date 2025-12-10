import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const TentangPage = () => {
  const ref = useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tentang BP3KP Sumatera II</h1>
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto animate-on-scroll">
            <p className="text-muted-foreground leading-relaxed">BP3KP Sumatera II adalah unit pelaksana teknis di bawah Kementerian Perumahan dan Kawasan Permukiman yang bertugas melaksanakan penyediaan perumahan dan pengembangan kawasan permukiman di wilayah Sumatera.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">Klinik PKP hadir untuk memberikan layanan konsultasi dan informasi terpadu kepada masyarakat terkait program-program perumahan, rusun, penanganan kawasan kumuh, dan bantuan perumahan lainnya.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default TentangPage;
