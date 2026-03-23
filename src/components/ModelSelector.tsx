import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';
import { MODEL_OPTIONS, getSelectedModel, setSelectedModel, type GeminiModelId } from '../services/gemini';

export default function ModelSelector() {
  const [model, setModel] = useState<GeminiModelId>(getSelectedModel());

  useEffect(() => {
    const sync = () => setModel(getSelectedModel());
    window.addEventListener('bluebook-model-changed', sync);
    return () => window.removeEventListener('bluebook-model-changed', sync);
  }, []);

  const current = MODEL_OPTIONS.find((option) => option.id === model);

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner max-w-full">
      <div className="pl-2 text-slate-500">
        <Cpu className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <label htmlFor="modelSelector" className="sr-only">Gemini model</label>
        <select
          id="modelSelector"
          value={model}
          onChange={(e) => {
            const next = e.target.value as GeminiModelId;
            setSelectedModel(next);
            setModel(next);
          }}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 max-w-[220px] sm:max-w-[260px]"
          title={current?.notes}
        >
          {MODEL_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
