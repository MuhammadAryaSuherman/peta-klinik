import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Phone, title: 'Telepon', value: '(061) 123-4567', description: 'Senin - Jumat, 08:00 - 16:00' },
  { icon: Mail, title: 'Email', value: 'info@bp3kp-sumut2.go.id', description: 'Respon dalam 1-2 hari kerja' },
  { icon: MapPin, title: 'Alamat', value: 'Jl. Karya Rakyat, Medan', description: 'Sumatera Utara, Indonesia' },
  { icon: Clock, title: 'Jam Operasional', value: 'Senin - Jumat', description: '08:00 - 16:00 WIB' },
];

const KontakPage = () => {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={ref} className="pt-24 pb-16">
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-2/10" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent-2/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 border border-primary/20">
              <MessageSquare className="w-4 h-4" />
              <span>Kontak</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Hubungi Kami
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Tim kami siap membantu Anda dengan pertanyaan seputar perumahan dan kawasan permukiman.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all animate-on-scroll group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{info.title}</h3>
                  <p className="text-primary font-medium mb-1">{info.value}</p>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg animate-on-scroll">
              <h2 className="text-2xl font-bold text-foreground mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                    <Input
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subjek</label>
                  <Input
                    placeholder="Subjek pesan"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                  <Textarea
                    placeholder="Tulis pesan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background resize-none"
                  />
                </div>
                <Button type="submit" className="w-full py-6 text-lg font-semibold">
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6 animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9854654987656!2d98.66!3d3.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzYnMDAuMCJOIDk4wrAzOSczNi4wIkU!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Working Hours */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Jam Operasional
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-foreground">Senin - Kamis</span>
                    <span className="text-primary font-medium">07:30 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-foreground">Jumat</span>
                    <span className="text-primary font-medium">07:30 - 16:30</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-foreground">Sabtu - Minggu</span>
                    <span className="text-destructive font-medium">Tutup</span>
                  </div>
                </div>
                
                {/* Ramadan Hours */}
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Jam Puasa (Ramadhan)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Senin - Kamis</span>
                      <span className="text-primary">08:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Jumat</span>
                      <span className="text-primary">08:00 - 16:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KontakPage;