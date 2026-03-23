import React, { useState } from 'react';
import CiteSource from './components/CiteSource';
import SearchCite from './components/SearchCite';
import ReferenceSources from './components/ReferenceSources';
import ApiKeyManager from './components/ApiKeyManager';
import { Scale, Search, PenTool } from 'lucide-react';

type Tab = 'cite' | 'search';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('cite');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-16 py-4 md:py-0">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                Bluebook Citation Assistant
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <ApiKeyManager />
              
              <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {activeTab === 'cite' ? <CiteSource /> : <SearchCite />}
        
        <div className="pt-12 border-t border-slate-200">
          <ReferenceSources />
        </div>
      </main>
    </div>
  );
}
