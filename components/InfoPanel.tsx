import React, { useState } from 'react';
import { Commune, Route } from '../types';
import { Bus, MapPin, ChevronDown, ChevronUp, Navigation, Sparkles } from 'lucide-react';
import { askTravelAssistant } from '../services/geminiService';

interface InfoPanelProps {
  selectedCommune: Commune | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedCommune, onClose }) => {
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Reset AI state when commune changes
  React.useEffect(() => {
    setAiResponse(null);
    setAiPrompt('');
  }, [selectedCommune]);

  if (!selectedCommune) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-white border-l border-slate-200">
        <Navigation size={64} className="mb-4 text-slate-300" />
        <h3 className="text-xl font-bold text-slate-700">Selectează o localitate</h3>
        <p>Alege o locație de pe hartă pentru a vedea traseele AMTPI disponibile.</p>
      </div>
    );
  }

  const toggleRoute = (id: string) => {
    setExpandedRouteId(expandedRouteId === id ? null : id);
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsLoadingAi(true);
    const response = await askTravelAssistant(aiPrompt, selectedCommune, null);
    setAiResponse(response);
    setIsLoadingAi(false);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-xl md:border-l border-slate-200 overflow-hidden relative z-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">{selectedCommune.name}</h2>
            <div className="flex items-center text-blue-200 mt-1">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">Zona Metropolitană Iași</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-white/80 hover:text-white p-2"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-4">
        
        {/* Routes List */}
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Trasee Disponibile
          </h3>
          <div className="space-y-3">
            {selectedCommune.routes.map((route) => (
              <div 
                key={route.id}
                className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                  expandedRouteId === route.id ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <button
                  onClick={() => toggleRoute(route.id)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-800 font-black text-xl shadow-inner">
                      {route.number}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 leading-tight">{route.name}</div>
                      <div className="text-xs text-slate-500 mt-1">AMTPI</div>
                    </div>
                  </div>
                  {expandedRouteId === route.id ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
                </button>
                
                {expandedRouteId === route.id && (
                  <div className="bg-slate-50 p-4 border-t border-slate-100 animate-fadeIn">
                    <div className="flex items-start space-x-2 text-slate-600 mb-2">
                      <Bus size={16} className="mt-1 shrink-0" />
                      <p className="text-sm">{route.description}</p>
                    </div>
                    <button className="mt-3 w-full py-2 px-4 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                      Vezi orar complet
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles size={18} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800">Asistent Virtual {selectedCommune.name}</h3>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            {aiResponse ? (
               <div className="mb-4">
                 <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                   {aiResponse}
                 </p>
                 <button 
                  onClick={() => setAiResponse(null)}
                  className="text-xs text-blue-600 mt-2 hover:underline"
                 >
                   Întreabă altceva
                 </button>
               </div>
            ) : (
              <form onSubmit={handleAiAsk} className="relative">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`Cum ajung în ${selectedCommune.name}?`}
                  className="w-full pl-3 pr-10 py-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <button 
                  type="submit"
                  disabled={isLoadingAi || !aiPrompt.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoadingAi ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Navigation size={16} />
                  )}
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Powered by Google Gemini. Informațiile pot varia.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoPanel;