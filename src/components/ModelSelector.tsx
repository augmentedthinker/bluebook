import React, { useState, useEffect } from 'react';
import { GeminiModel, getSelectedModel, setSelectedModel } from '../services/gemini';
import { Cpu, ChevronDown } from 'lucide-react';

const MODELS: { id: GeminiModel; name: string; description: string }[] = [
  { 
    id: 'gemini-3.1-pro-preview', 
    name: 'Gemini 3.1 Pro', 
    description: 'Most powerful, best for complex citations.' 
  },
  { 
    id: 'gemini-3-flash-preview', 
    name: 'Gemini 3 Flash', 
    description: 'Fast and efficient, good for simple tasks.' 
  },
  { 
    id: 'gemini-2.5-pro', 
    name: 'Gemini 2.5 Pro', 
    description: 'Balanced performance and reasoning.' 
  },
  { 
    id: 'gemini-2.5-flash', 
    name: 'Gemini 2.5 Flash', 
    description: 'Ultra-fast, lowest latency.' 
  },
];

export default function ModelSelector() {
  const [currentModel, setCurrentModel] = useState<GeminiModel>(getSelectedModel());
  const [isOpen, setIsOpen] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);

  useEffect(() => {
    const handleQuotaError = () => {
      setIsHighlighting(true);
      // Remove highlight after 8 seconds
      setTimeout(() => setIsHighlighting(false), 8000);
    };

    window.addEventListener('gemini-429-error', handleQuotaError);
    return () => window.removeEventListener('gemini-429-error', handleQuotaError);
  }, []);

  const handleSelect = (model: GeminiModel) => {
    setSelectedModel(model);
    setCurrentModel(model);
    setIsOpen(false);
    setIsHighlighting(false);
    // Reload to ensure all services use the new model if they don't use the getter
    // window.location.reload(); 
  };

  const selectedModelData = MODELS.find(m => m.id === currentModel) || MODELS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium transition-all shadow-sm ${
          isHighlighting 
            ? 'border-emerald-500 ring-4 ring-emerald-500/30 animate-pulse text-emerald-700' 
            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <Cpu className={`w-4 h-4 ${isHighlighting ? 'text-emerald-600' : 'text-indigo-600'}`} />
        <span className="hidden sm:inline">{selectedModelData.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${isHighlighting ? 'text-emerald-500' : 'text-slate-400'}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">
            <div className="p-2 border-b border-slate-100 bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Select Model
              </span>
            </div>
            <div className="p-1">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleSelect(model.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex flex-col gap-0.5 ${
                    currentModel === model.id 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-sm font-semibold">{model.name}</span>
                  <span className="text-xs text-slate-500 line-clamp-1">{model.description}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
