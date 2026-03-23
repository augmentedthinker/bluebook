import React, { useEffect, useState } from 'react';
import { Briefcase, BookOpen, Compass } from 'lucide-react';
import { DEFAULT_CONTEXT, getCitationContext, setCitationContext, type CitationContext } from '../services/gemini';

const CONTEXT_OPTIONS: { id: CitationContext; label: string; help: string; icon: React.ReactNode }[] = [
  {
    id: 'litigation',
    label: 'Litigation',
    help: 'Default for Rose: court-facing, practical litigation citations.',
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 'journal',
    label: 'Journal',
    help: 'Academic / law review writing mode.',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'general',
    label: 'General Research',
    help: 'Use when the writing context is mixed or unclear.',
    icon: <Compass className="w-4 h-4" />,
  },
];

export default function ContextSelector() {
  const [context, setContext] = useState<CitationContext>(getCitationContext());

  useEffect(() => {
    const sync = () => setContext(getCitationContext());
    window.addEventListener('bluebook-context-changed', sync);
    return () => window.removeEventListener('bluebook-context-changed', sync);
  }, []);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Writing context</h3>
          <p className="text-sm text-slate-600">The app now defaults to litigation mode instead of assuming law-review writing.</p>
        </div>
        {context === DEFAULT_CONTEXT && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">Default</span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {CONTEXT_OPTIONS.map((option) => {
          const active = option.id === context;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setCitationContext(option.id);
                setContext(option.id);
              }}
              className={`text-left rounded-xl border p-4 transition-all ${
                active
                  ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
              title={option.help}
            >
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                {option.icon}
                <span className="font-medium text-sm">{option.label}</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">{option.help}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
