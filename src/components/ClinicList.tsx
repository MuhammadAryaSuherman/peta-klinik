import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Clinic, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/clinic';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClinicListProps {
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  onClinicSelect: (clinic: Clinic) => void;
}

const ClinicList = ({ clinics, selectedClinic, onClinicSelect }: ClinicListProps) => {
  if (clinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Tidak Ada Hasil</h3>
        <p className="text-sm text-muted-foreground">
          Coba ubah filter pencarian Anda
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-420px)] pr-2">
      <div className="space-y-3">
        {clinics.map((clinic, index) => (
          <div
            key={clinic.id}
            onClick={() => onClinicSelect(clinic)}
            className={cn(
              'clinic-card animate-fade-in',
              selectedClinic?.id === clinic.id && 'clinic-card-active'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[clinic.category] }}
                  />
                  <span className="text-xs font-medium text-muted-foreground truncate">
                    {CATEGORY_LABELS[clinic.category]}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground truncate mb-2">
                  {clinic.name}
                </h3>
                
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{clinic.operatingHours}</span>
                  </div>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
            
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
              {clinic.services.slice(0, 3).map((service) => (
                <span key={service} className="category-badge">
                  {service}
                </span>
              ))}
              {clinic.services.length > 3 && (
                <span className="category-badge bg-muted text-muted-foreground">
                  +{clinic.services.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ClinicList;
