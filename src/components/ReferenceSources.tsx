import React from 'react';
import { REFERENCE_SOURCES } from '../constants';
import { Library, ExternalLink } from 'lucide-react';

export default function ReferenceSources() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Library className="w-5 h-5 text-indigo-600" />
        Active Reference Sources (RAG)
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        The following legal citation guides and rules are used as context for every citation and search request to ensure maximum accuracy.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REFERENCE_SOURCES.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 transition-all group"
          >
            <span className="text-sm font-medium text-slate-700 truncate pr-2">
              {source.name}
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
