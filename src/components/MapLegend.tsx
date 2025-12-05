import { CATEGORY_LABELS, CATEGORY_COLORS, ClinicCategory } from '@/types/clinic';

const categories: ClinicCategory[] = [
  'puskesmas',
  'klinik_pratama',
  'klinik_utama',
  'rumah_sakit',
  'balai_kesehatan',
  'posyandu',
];

const MapLegend = () => {
  return (
    <div className="absolute bottom-6 left-4 lg:left-[calc(24rem+1rem)] z-20 glass-card rounded-xl p-4 animate-slide-up">
      <h4 className="text-sm font-semibold mb-3 text-foreground">Legenda</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {CATEGORY_LABELS[category]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
