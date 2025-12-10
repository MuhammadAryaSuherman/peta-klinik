import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const GenericInfoPage = ({ title, content }: { title: string; content: string }) => {
  const ref = useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
          </div>
          <div className="p-8 bg-card rounded-2xl border border-border animate-on-scroll">
            <p className="text-muted-foreground leading-relaxed">{content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const BahanBangunanPage = () => <GenericInfoPage title="Bahan Bangunan" content="Informasi lengkap mengenai standar bahan bangunan untuk pembangunan rumah layak huni sesuai dengan peraturan yang berlaku." />;
export const KegiatanKRSPage = () => <GenericInfoPage title="Kegiatan KRS" content="Informasi kegiatan Kelompok Rembuk Swadaya (KRS) dalam pendampingan pembangunan rumah masyarakat." />;
export const PerizinanPage = () => <GenericInfoPage title="Perizinan" content="Panduan lengkap mengenai perizinan pembangunan rumah, IMB, dan dokumen legalitas lainnya." />;
export const PeraturanPage = () => <GenericInfoPage title="Peraturan" content="Kumpulan peraturan dan kebijakan terkait perumahan dan kawasan permukiman." />;
