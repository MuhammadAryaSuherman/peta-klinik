import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Building2, MapPin, Home, Info, Palette, LogIn, BookOpen, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

interface SubMenuItem {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Kondisi Perumahan',
    icon: <Home className="w-4 h-4" />,
    subItems: [
      {
        label: 'Sebaran Rusun',
        subItems: [
          { label: 'Medan', href: '/peta/sebaran-rusun/medan' },
          { label: 'Sumatera Utara', href: '/peta/sebaran-rusun/sumatera-utara' },
        ],
      },
      {
        label: 'Profil Kawasan Kumuh',
        subItems: [
          { label: 'Medan', href: '/peta/kawasan-kumuh/medan' },
          { label: 'Sumatera Utara', href: '/peta/kawasan-kumuh/sumatera-utara' },
        ],
      },
      {
        label: 'Penerima Bantuan BSPS',
        subItems: [
          { label: 'Medan', href: '/peta/penerima-bsps/medan' },
          { label: 'Sumatera Utara', href: '/peta/penerima-bsps/sumatera-utara' },
        ],
      },
    ],
  },
  {
    label: 'Bank Desain',
    icon: <Palette className="w-4 h-4" />,
    href: '/bank-desain',
  },
  {
    label: 'Sosialisasi Klinik PKP',
    icon: <BookOpen className="w-4 h-4" />,
    href: '/sosialisasi-klinik-pkp',
  },
  {
    label: 'Penerimaan BSPS',
    icon: <Gift className="w-4 h-4" />,
    href: '/penerimaan-bsps',
  },
  {
    label: 'Informasi',
    icon: <Info className="w-4 h-4" />,
    subItems: [
      { label: 'Tentang Kami', href: '/informasi/tentang' },
      { label: 'Kontak', href: '/informasi/kontak' },
      { label: 'FAQ', href: '/informasi/faq' },
    ],
  },
];

const DropdownMenu = ({ item, isOpen, onMouseEnter, onMouseLeave }: {
  item: MenuItem;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  if (item.href) {
    return (
      <Link
        to={item.href}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        setActiveSubMenu(null);
      }}
    >
      <button
        className={cn(
          "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
          "hover:bg-primary/10 hover:text-primary",
          isOpen && "bg-primary/10 text-primary"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
        {item.subItems && <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />}
      </button>

      {isOpen && item.subItems && (
        <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-xl shadow-xl py-2 min-w-[220px]">
            {item.subItems.map((subItem, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => subItem.subItems && setActiveSubMenu(subItem.label)}
                onMouseLeave={() => !subItem.subItems && setActiveSubMenu(null)}
              >
                {subItem.href ? (
                  <Link
                    to={subItem.href}
                    className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span>{subItem.label}</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors">
                    <span>{subItem.label}</span>
                    {subItem.subItems && <ChevronDown className="w-4 h-4 -rotate-90" />}
                  </div>
                )}

                {activeSubMenu === subItem.label && subItem.subItems && (
                  <div className="absolute left-full top-0 ml-1 z-50 animate-fade-in">
                    <div className="bg-card border border-border rounded-xl shadow-xl py-2 min-w-[180px]">
                      {subItem.subItems.map((nestedItem, nestedIdx) => (
                        <Link
                          key={nestedIdx}
                          to={nestedItem.href}
                          className="flex items-center px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 mr-2 text-primary" />
                          <span>{nestedItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] lg:text-xs text-muted-foreground font-medium uppercase tracking-wider">BP3KP Sumatera II</p>
              <h1 className="text-sm lg:text-base font-bold text-foreground">Klinik PKP</h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <DropdownMenu
                key={item.label}
                item={item}
                isOpen={openMenu === item.label}
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/informasi/kontak"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg"
            >
              Hubungi Kami
            </Link>
            <Link
              to="/login"
              className="p-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
              title="Login"
            >
              <LogIn className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <MobileMenuItem key={item.label} item={item} onClose={() => setIsMobileMenuOpen(false)} />
            ))}
            <div className="flex gap-2 pt-4">
              <Link
                to="/informasi/kontak"
                className="flex-1 px-5 py-3 bg-primary text-primary-foreground text-center text-sm font-semibold rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hubungi Kami
              </Link>
              <Link
                to="/login"
                className="p-3 bg-secondary text-secondary-foreground rounded-lg border border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const MobileMenuItem = ({ item, onClose }: { item: MenuItem; onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);

  if (item.href) {
    return (
      <Link
        to={item.href}
        onClick={onClose}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b border-border/50"
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          {item.icon}
          <span>{item.label}</span>
        </div>
        {item.subItems && (
          <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
        )}
      </button>

      {isExpanded && item.subItems && (
        <div className="pb-2 pl-4 space-y-1">
          {item.subItems.map((subItem, idx) => (
            <div key={idx}>
              {subItem.href ? (
                <Link
                  to={subItem.href}
                  onClick={onClose}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {subItem.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setExpandedSubItem(expandedSubItem === subItem.label ? null : subItem.label)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-muted-foreground"
                  >
                    <span>{subItem.label}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", expandedSubItem === subItem.label && "rotate-180")} />
                  </button>
                  {expandedSubItem === subItem.label && subItem.subItems && (
                    <div className="pl-4 space-y-1">
                      {subItem.subItems.map((nestedItem, nestedIdx) => (
                        <Link
                          key={nestedIdx}
                          to={nestedItem.href}
                          onClick={onClose}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <MapPin className="w-3 h-3 text-primary" />
                          {nestedItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
