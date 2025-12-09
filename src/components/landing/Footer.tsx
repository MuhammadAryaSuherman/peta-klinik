import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider">BP3KP Sumatera II</p>
                <h3 className="font-bold">Klinik PKP</h3>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Layanan konsultasi dan informasi terpadu untuk perumahan, permukiman, dan kawasan kumuh di wilayah Sumatera.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 bg-sidebar-accent rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-3">
              {[
                { label: 'Sebaran Rusun', href: '/peta/sebaran-rusun/medan' },
                { label: 'Kawasan Kumuh', href: '/peta/kawasan-kumuh/medan' },
                { label: 'Penerima BSPS', href: '/peta/penerima-bsps/medan' },
                { label: 'Bank Desain', href: '/bank-desain' },
                { label: 'Sosialisasi', href: '/sosialisasi-klinik-pkp' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tentang Kami', href: '/informasi/tentang' },
                { label: 'Kontak', href: '/informasi/kontak' },
                { label: 'FAQ', href: '/informasi/faq' },
                { label: 'Kebijakan Privasi', href: '#' },
                { label: 'Syarat & Ketentuan', href: '#' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-sidebar-foreground/70">
                  Jl. Pattimura No. 20, Medan, Sumatera Utara 20152
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+62611234567" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                  (061) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@bp3kp.go.id" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
                  info@bp3kp.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-sidebar-foreground/60">
              © 2024 Klinik PKP - BP3KP Sumatera II. All rights reserved.
            </p>
            <p className="text-sm text-sidebar-foreground/60">
              Kementerian Perumahan dan Kawasan Permukiman Republik Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
