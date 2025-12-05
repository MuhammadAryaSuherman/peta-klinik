import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  totalClinics: number;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ totalClinics, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-sidebar-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-sidebar-foreground" />
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                Klinik Indonesia
              </h1>
              <p className="text-xs text-sidebar-accent-foreground">
                Sistem Informasi Fasilitas Kesehatan
              </p>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="stat-badge bg-sidebar-accent text-sidebar-accent-foreground">
            <Activity className="w-4 h-4" />
            <span>{totalClinics} Fasilitas Terdaftar</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
