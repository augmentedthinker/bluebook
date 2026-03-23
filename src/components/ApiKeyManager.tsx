import React, { useState, useEffect } from 'react';
import { Key, Check, ShieldCheck, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const getStoredApiKey = () => localStorage.getItem('GEMINI_API_KEY') || '';

export default function ApiKeyManager() {
  const [key, setKey] = useState(getStoredApiKey());
  const [saved, setSaved] = useState(false);
  const [hasPlatformKey, setHasPlatformKey] = useState(false);

  useEffect(() => {
    const checkPlatformKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasPlatformKey(hasKey);
      }
    };
    checkPlatformKey();
  }, []);

  const handleSave = () => {
    localStorage.setItem('GEMINI_API_KEY', key);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Trigger a custom event so other components know the key changed
    window.dispatchEvent(new Event('apikey-changed'));
  };

  const handleSelectPlatformKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasPlatformKey(true);
      window.dispatchEvent(new Event('apikey-changed'));
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Platform Key Status */}
      <button
        onClick={handleSelectPlatformKey}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
          hasPlatformKey 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
        }`}
        title="Select a paid API key from Google Cloud for higher limits"
      >
        <ShieldCheck className={`w-3.5 h-3.5 ${hasPlatformKey ? 'text-emerald-600' : 'text-amber-600'}`} />
        {hasPlatformKey ? 'Platform Key Active' : 'Select Paid Key'}
      </button>

      {/* Manual Key Input */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
        <div className="pl-2">
          <Key className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Custom API Key..."
          className="bg-transparent border-none focus:ring-0 text-xs w-36 placeholder:text-slate-400 py-1"
        />
        <button
          onClick={handleSave}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            saved 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm border border-slate-200'
          }`}
        >
          {saved ? <Check className="w-3 h-3" /> : 'Save'}
        </button>
      </div>

      <a 
        href="https://ai.google.dev/gemini-api/docs/billing" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-indigo-600 transition-colors"
        title="Billing Documentation"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
