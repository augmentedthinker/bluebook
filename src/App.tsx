import React, { useEffect, useState } from 'react';
import CiteSource from './components/CiteSource';
import SearchCite from './components/SearchCite';
import ReferenceSources from './components/ReferenceSources';
import ApiKeyManager from './components/ApiKeyManager';
import ModelSelector from './components/ModelSelector';
import { getSelectedModel, MODEL_OPTIONS, type GeminiModelId } from './services/gemini';
import { Scale, Search, PenTool } from 'lucide-react';

type Tab = 'cite' | 'search';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('cite');
  const [selectedModel, setSelectedModelState] = useState<GeminiModelId>(getSelectedModel());

  useEffect(() => {
    const sync = () => setSelectedModelState(getSelectedModel());
    window.addEventListener('bluebook-model-changed', sync);
    return () => window.removeEventListener('bluebook-model-changed', sync);
  }, []);

  const currentModel = MODEL_OPTIONS.find((model) => model.id === selectedModel);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    Bluebook Citation Assistant
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5 break-words">
                    Active model: <span className="font-semibold text-slate-700">{currentModel?.label}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <ModelSelector />
                <ApiKeyManager />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-slate-600 max-w-3xl">
                Toggle models to compare reliability and behavior. If one model throws a 503 demand-spike error, switch to another without leaving the app.
              </p>

              <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab('cite')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'cite'
                      ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span className="hidden md:inline">Cite Source</span>
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'search'
                      ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Search & Cite</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {activeTab === 'cite' ? <CiteSource /> : <SearchCite />}

        <div className="pt-12 border-t border-slate-200">
          <ReferenceSources />
        </div>
      </main>
    </div>
  );
}
