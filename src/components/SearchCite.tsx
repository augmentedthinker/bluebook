import React, { useState } from 'react';
import { searchAndCite, SearchResult } from '../services/gemini';
import { Search, Loader2, ExternalLink, FileText, BookOpen, Library, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import QuotaErrorHelper from './QuotaErrorHelper';

export default function SearchCite() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setError(null);
    try {
      const res = await searchAndCite(query);
      setResults(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to search and generate citations.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'High': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Medium': return <HelpCircle className="w-3.5 h-3.5" />;
      case 'Low': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-indigo-600" />
            Search & Cite
          </h2>
          <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
            Assistant Mode
          </div>
        </div>
        
        <p className="text-slate-600 mb-6">
          Search for a legal topic, case name, or statute. The AI will find relevant sources and automatically format them using Bluebook <strong>Practitioner Mode</strong> rules for court filings.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This tool is an automated assistant. Legal citations are complex and may contain errors. Please review all outputs against the official Bluebook and local court rules before filing.
          </p>
        </div>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => setQuery("DC Security Breach Protection Amendment Act of 2019")}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Try an example
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Roe v. Wade' or 'Clean Air Act'"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-sans text-slate-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Search
          </button>
        </form>

        {error && <QuotaErrorHelper error={error} />}
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 px-2">
            <BookOpen className="w-5 h-5 text-slate-500" />
            Search Results ({results.length})
          </h3>
          <div className="grid gap-6">
            {results.map((result, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h4 className="text-xl font-semibold text-slate-900 leading-tight">
                    {result.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${getConfidenceColor(result.confidence)}`}>
                      {getConfidenceIcon(result.confidence)}
                      {result.confidence}
                    </div>
                    {result.url && (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium whitespace-nowrap bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Source
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    {result.sourceType}
                  </span>
                  {result.modelUsed && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wider border border-slate-200">
                      {result.modelUsed}
                    </span>
                  )}
                  {result.referenceRule && (
                    <a
                      href={result.referenceRule.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-colors group"
                    >
                      <Library className="w-3.5 h-3.5 text-emerald-500" />
                      Rule: {result.referenceRule.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>

                <div className="space-y-6">
                  {result.ambiguities && result.ambiguities.length > 0 && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                      <h5 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Needs Verification
                      </h5>
                      <ul className="space-y-1">
                        {result.ambiguities.map((ambiguity, aIdx) => (
                          <li key={aIdx} className="text-rose-800 text-xs flex items-start gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                            {ambiguity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Summary</h5>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {result.summary}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Bluebook Citation (Practitioner Mode)</h5>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-lg font-serif text-slate-900">
                        {result.citation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
