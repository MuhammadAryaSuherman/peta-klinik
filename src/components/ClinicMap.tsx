import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Clinic, CATEGORY_COLORS } from '@/types/clinic';

interface ClinicMapProps {
  clinics: Clinic[];
  selectedClinic: Clinic | null;
  onClinicSelect: (clinic: Clinic) => void;
}

const createMarkerIcon = (category: Clinic['category'], isSelected: boolean) => {
  const color = CATEGORY_COLORS[category];
  const size = isSelected ? 40 : 32;
  const borderWidth = isSelected ? 4 : 2;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: ${borderWidth}px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        ${isSelected ? 'animation: pulse 1.5s infinite;' : ''}
      ">
        <svg style="transform: rotate(45deg); width: ${size * 0.5}px; height: ${size * 0.5}px;" viewBox="0 0 24 24" fill="white">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const ClinicMap = ({ clinics, selectedClinic, onClinicSelect }: ClinicMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    clinics.forEach((clinic) => {
      const isSelected = selectedClinic?.id === clinic.id;
      const marker = L.marker([clinic.latitude, clinic.longitude], {
        icon: createMarkerIcon(clinic.category, isSelected),
      });

      marker.on('click', () => {
        onClinicSelect(clinic);
      });

      marker.addTo(map);
      markersRef.current.set(clinic.id, marker);
    });
  }, [clinics, selectedClinic, onClinicSelect]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedClinic) return;

    const marker = markersRef.current.get(selectedClinic.id);
    if (marker) {
      map.flyTo([selectedClinic.latitude, selectedClinic.longitude], 12, {
        duration: 1,
      });
    }
  }, [selectedClinic]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ClinicMap;
