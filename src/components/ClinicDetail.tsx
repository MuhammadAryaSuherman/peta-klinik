import { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  CheckCircle2,
  History,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { Clinic, AuditLog, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/clinic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ClinicDetailProps {
  clinic: Clinic;
  onClose: () => void;
}

// Placeholder - will be replaced with API calls
const auditLogs: AuditLog[] = [];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ClinicDetail = ({ clinic, onClose }: ClinicDetailProps) => {
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  
  const clinicAuditLogs = auditLogs.filter((log) => log.clinicId === clinic.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div
          className="relative p-6 text-primary-foreground"
          style={{
            background: `linear-gradient(135deg, ${CATEGORY_COLORS[clinic.category]}, ${CATEGORY_COLORS[clinic.category]}dd)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-medium bg-primary-foreground/20 rounded-full">
              {CATEGORY_LABELS[clinic.category]}
            </span>
            <span className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1",
              clinic.status === 'active' 
                ? "bg-success/20 text-success-foreground" 
                : "bg-destructive/20 text-destructive-foreground"
            )}>
              <CheckCircle2 className="w-3 h-3" />
              {clinic.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
            </span>
          </div>
          
          <h2 className="text-xl font-bold">{clinic.name}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <MapPin className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alamat</p>
                <p className="font-medium">{clinic.address}</p>
                <p className="text-sm text-muted-foreground">
                  {clinic.city}, {clinic.province}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Phone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telepon</p>
                <a 
                  href={`tel:${clinic.phone}`} 
                  className="font-medium text-primary hover:underline"
                >
                  {clinic.phone}
                </a>
              </div>
            </div>

            {clinic.email && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Mail className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${clinic.email}`} 
                    className="font-medium text-primary hover:underline"
                  >
                    {clinic.email}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jam Operasional</p>
                <p className="font-medium">{clinic.operatingHours}</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Layanan Tersedia
            </h3>
            <div className="flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          {clinicAuditLogs.length > 0 && (
            <div>
              <button
                onClick={() => setShowAuditTrail(!showAuditTrail)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="font-semibold flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Riwayat Perubahan
                </span>
                {showAuditTrail ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {showAuditTrail && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  {clinicAuditLogs.map((log) => (
                    <AuditLogItem key={log.id} log={log} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t border-border text-sm text-muted-foreground">
            <p>Dibuat: {formatDate(clinic.createdAt)}</p>
            <p>Terakhir diperbarui: {formatDate(clinic.updatedAt)}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-secondary/30">
          <Button className="w-full" variant="default">
            <ExternalLink className="w-4 h-4 mr-2" />
            Lihat di Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
};

const AuditLogItem = ({ log }: { log: AuditLog }) => {
  const actionLabels = {
    created: 'Dibuat',
    updated: 'Diperbarui',
    deleted: 'Dihapus',
  };

  const actionColors = {
    created: 'text-success',
    updated: 'text-warning',
    deleted: 'text-destructive',
  };

  return (
    <div className="p-3 rounded-lg bg-card border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className={cn('font-medium text-sm', actionColors[log.action])}>
          {actionLabels[log.action]}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDate(log.timestamp)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        Oleh: {log.userName}
      </p>
      {Object.keys(log.changes).length > 0 && (
        <div className="space-y-1">
          {Object.entries(log.changes).map(([field, change]) => (
            <div key={field} className="text-xs">
              <span className="font-medium text-foreground">{field}:</span>
              <span className="text-muted-foreground line-through ml-2">
                {change.old}
              </span>
              <span className="text-foreground ml-2">→ {change.new}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicDetail;
