import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, ZoomControl } from 'react-leaflet';
import { COMMUNES, MAP_CENTER, ZOOM_LEVEL } from './constants';
import { Commune } from './types';
import MapMarker from './components/MapMarker';
import InfoPanel from './components/InfoPanel';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const handleCommuneSelect = (commune: Commune) => {
    setSelectedCommune(commune);
    setIsMobilePanelOpen(true);
  };

  const closePanel = () => {
    setSelectedCommune(null);
    setIsMobilePanelOpen(false);
  };

  // Rough approximation of Iasi boundary for visual effect
  const iasiBoundary: [number, number][] = [
    [47.1800, 27.5500],
    [47.1900, 27.6000],
    [47.1800, 27.6500],
    [47.1500, 27.6600],
    [47.1300, 27.6200],
    [47.1300, 27.5600],
    [47.1500, 27.5200],
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-100 overflow-hidden font-sans">
      
      {/* Map Area */}
      <div className="relative flex-1 h-full z-0">
        
        {/* Overlay Title */}
        <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 max-w-xs pointer-events-none">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">AMTPI</h1>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Zona Metropolitană Iași</p>
          <p className="text-sm text-slate-600">
            Selectează o localitate pentru a vedea traseele.
          </p>
        </div>

        <MapContainer 
          center={MAP_CENTER} 
          zoom={ZOOM_LEVEL} 
          scrollWheelZoom={true} 
          className="h-full w-full outline-none bg-slate-200"
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          
          {/* CartoDB Voyager Tile Layer for a clean, modern look */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Visual Boundary for Iasi City Center (Stylized) */}
          <Polygon 
            positions={iasiBoundary}
            pathOptions={{ 
              color: '#3b82f6', 
              weight: 2, 
              fillColor: '#60a5fa', 
              fillOpacity: 0.05,
              dashArray: '5, 10'
            }} 
          />

          {COMMUNES.map((commune) => (
            <MapMarker 
              key={commune.id} 
              commune={commune} 
              isSelected={selectedCommune?.id === commune.id}
              onClick={handleCommuneSelect}
            />
          ))}
        </MapContainer>
      </div>

      {/* Desktop Sidebar Panel */}
      <div className={`hidden md:block w-[400px] h-full bg-white shadow-2xl z-20 transition-transform duration-300 ease-in-out transform ${selectedCommune ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
        <InfoPanel 
          selectedCommune={selectedCommune} 
          onClose={closePanel}
        />
      </div>

      {/* Mobile Bottom Sheet Panel */}
      <div className={`md:hidden fixed inset-x-0 bottom-0 z-[1000] bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out transform ${selectedCommune && isMobilePanelOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ height: '70vh' }}>
        <div className="w-full h-8 flex items-center justify-center cursor-pointer" onClick={() => setIsMobilePanelOpen(false)}>
          <div className="bg-slate-300 rounded-full w-12 h-1.5" />
        </div>
        <div className="h-[calc(100%-2rem)]">
          <InfoPanel 
            selectedCommune={selectedCommune} 
            onClose={() => setIsMobilePanelOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Toggle Button (Visible only when no selection) */}
      {!selectedCommune && (
        <div className="md:hidden absolute bottom-6 right-6 z-[400]">
          <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Menu size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;