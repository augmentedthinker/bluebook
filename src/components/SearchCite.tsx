import React, { useState } from 'react';
import { searchAndCite, SearchResult } from '../services/gemini';
import { Search, Loader2, ExternalLink, FileText, BookOpen } from 'lucide-react';

export default function SearchCite() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
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

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Search className="w-6 h-6 text-indigo-600" />
          Search & Cite
        </h2>
        <p className="text-slate-600 mb-6">
          Search for a legal topic, case name, or statute. The AI will find relevant sources and automatically format them using Bluebook citation rules.
        </p>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => setQuery("Clean Air Act")}
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

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </div>
        )}
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

                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    {result.sourceType}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Summary</h5>
                    <p className="text-slate-700 leading-relaxed">
                      {result.summary}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Bluebook Citation</h5>
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
