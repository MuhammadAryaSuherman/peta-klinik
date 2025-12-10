import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'Apa itu BSPS?', a: 'BSPS adalah Bantuan Stimulan Perumahan Swadaya untuk masyarakat berpenghasilan rendah.' },
  { q: 'Bagaimana cara mendaftar BSPS?', a: 'Pendaftaran dilakukan melalui kantor desa atau kelurahan setempat.' },
  { q: 'Apa syarat mendapatkan bantuan?', a: 'WNI, berpenghasilan rendah, memiliki tanah, dan belum pernah menerima bantuan serupa.' },
];

const FAQPage = () => {
  const ref = useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 animate-on-scroll">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">FAQ</h1>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-card rounded-2xl border border-border animate-on-scroll">
                <div className="flex items-start gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                </div>
                <p className="text-muted-foreground pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default FAQPage;
