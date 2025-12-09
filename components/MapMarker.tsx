import React from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Commune } from '../types';

// We import these indirectly via window or global CSS if needed, 
// but since we are using react-leaflet, we construct the Icon manually.

interface MapMarkerProps {
  commune: Commune;
  isSelected: boolean;
  onClick: (commune: Commune) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ commune, isSelected, onClick }) => {
  const map = useMap();

  const handleMarkerClick = () => {
    onClick(commune);
    // Center map slightly offset to accommodate sidebar on desktop or bottom sheet on mobile
    map.flyTo([commune.lat, commune.lng], 13, {
      duration: 1.5
    });
  };

  // Create a custom HTML icon that looks like a modern button
  const customIcon = L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div class="relative group cursor-pointer transition-transform duration-300 ${isSelected ? 'scale-110' : 'hover:scale-110'}">
        <div class="absolute -inset-1 bg-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
        <button class="relative flex items-center shadow-lg bg-white rounded-full px-3 py-1.5 border-2 ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-800'} whitespace-nowrap transform transition-colors">
          <span class="w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-red-500'} mr-2 animate-pulse"></span>
          <span class="font-bold text-sm ${isSelected ? 'text-blue-800' : 'text-slate-800'}">${commune.name}</span>
        </button>
        ${isSelected ? '<div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-600"></div>' : ''}
      </div>
    `,
    iconSize: [120, 40], // Approximate size
    iconAnchor: [60, 20] // Center
  });

  return (
    <Marker 
      position={[commune.lat, commune.lng]} 
      icon={customIcon}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Tooltip direction="top" offset={[0, -20]} opacity={1}>
        Trasee disponibile: {commune.routes.length}
      </Tooltip>
    </Marker>
  );
};

export default MapMarker;