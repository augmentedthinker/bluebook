import React, { useState, useMemo } from 'react';
import { citeSource, CitationResult } from '../services/gemini';
import { BookOpen, Loader2, FileText, Info, List, Library, ExternalLink, AlertTriangle, CheckCircle2, HelpCircle, Search, Play, Copy, Check } from 'lucide-react';
import { BENCHMARKS, BENCHMARKS_2, BenchmarkCase } from '../data/benchmarks';
import QuotaErrorHelper from './QuotaErrorHelper';

const normalize = (str: string): string => {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'");
};

export default function CiteSource() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkCase | null>(null);
  const [filterText, setFilterText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeBenchmarkSet, setActiveBenchmarkSet] = useState<1 | 2>(1);

  const handleCite = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await citeSource(text);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate citation.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadBenchmark = (b: BenchmarkCase) => {
    setText(b.inputPrompt);
    setSelectedBenchmark(b);
    setResult(null);
    setError(null);
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredBenchmarks = useMemo(() => {
    const currentBenchmarks = activeBenchmarkSet === 1 ? BENCHMARKS : BENCHMARKS_2;
    return currentBenchmarks.filter(b => 
      b.inputPrompt.toLowerCase().includes(filterText.toLowerCase()) ||
      b.expectedCitation.toLowerCase().includes(filterText.toLowerCase()) ||
      b.sourceType.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, activeBenchmarkSet]);

  const comparison = useMemo(() => {
    if (!result || !selectedBenchmark) return null;
    const normalizedGenerated = normalize(result.citation);
    const normalizedExpected = normalize(selectedBenchmark.expectedCitation);
    const isMatch = normalizedGenerated === normalizedExpected;
    return {
      isMatch,
      status: isMatch ? 'Exact Match' : 'Needs Review'
    };
  }, [result, selectedBenchmark]);

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
      case 'High': return <CheckCircle2 className="w-4 h-4" />;
      case 'Medium': return <HelpCircle className="w-4 h-4" />;
      case 'Low': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Citation Workflow (Left) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Ingest & Cite Source
              </h2>
              <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                Assistant Mode
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Paste the text of a legal source below. This assistant will perform a <strong>structured extraction</strong> of metadata before generating a Bluebook citation in <strong>Practitioner Mode</strong>.
            </p>
            
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This tool is an automated assistant. Legal citations are complex and may contain errors. Please review all outputs against the official Bluebook and local court rules before filing.
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (selectedBenchmark && e.target.value !== selectedBenchmark.inputPrompt) {
                    setSelectedBenchmark(null);
                  }
                }}
                placeholder="Paste source text here..."
                className="w-full h-48 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-sans text-slate-700"
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-500">
                  {selectedBenchmark && (
                    <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Benchmark #{selectedBenchmark.id} Active
                    </span>
                  )}
                </div>
                <button
                  onClick={handleCite}
                  disabled={loading || !text.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
                  Extract & Cite
                </button>
              </div>
            </div>

            {error && <QuotaErrorHelper error={error} />}
          </div>

          {result && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
              {/* Comparison Section (If Benchmark Active) */}
              {comparison && selectedBenchmark && (
                <div className={`p-6 rounded-2xl border ${comparison.isMatch ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${comparison.isMatch ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {comparison.isMatch ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      Benchmark Comparison: {comparison.status}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Expected Citation</h4>
                      <p className="text-sm font-serif text-slate-800 p-3 bg-white/50 rounded-lg border border-slate-200/50">
                        {selectedBenchmark.expectedCitation}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Generated Citation</h4>
                      <p className="text-sm font-serif text-slate-800 p-3 bg-white/50 rounded-lg border border-slate-200/50">
                        {result.citation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Section: Citation & Confidence */}
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Generated Citation
                    </h3>
                    <button
                      onClick={() => handleCopy(result.citation)}
                      className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy Citation'}
                    </button>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xl font-serif text-slate-900 leading-relaxed">
                      {result.citation}
                    </p>
                  </div>
                </div>
                
                <div className="md:w-48 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Confidence
                    </h3>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold ${getConfidenceColor(result.confidence)}`}>
                      {getConfidenceIcon(result.confidence)}
                      {result.confidence}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Model Used
                    </h3>
                    <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl border border-slate-200 font-mono text-[10px] uppercase tracking-wider">
                      {result.modelUsed}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      Source Type
                    </h3>
                    <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 font-semibold capitalize">
                      {result.sourceType.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambiguities Section */}
              {result.ambiguities && result.ambiguities.length > 0 && (
                <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl">
                  <h3 className="text-sm font-semibold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Ambiguities / Needs Verification
                  </h3>
                  <ul className="space-y-2">
                    {result.ambiguities.map((ambiguity, idx) => (
                      <li key={idx} className="text-rose-800 text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                        {ambiguity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Extraction Details */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Extracted Fields
                  </h3>
                  <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <tbody className="divide-y divide-slate-200">
                        {Object.entries(result.extractedFields).map(([key, value], idx) => (
                          <tr key={idx}>
                            <th className="px-4 py-3 font-medium text-slate-900 bg-slate-100/50 w-1/3 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </th>
                            <td className="px-4 py-3 text-slate-700">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Source Description
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed italic">
                      "{result.rawSourceDescription}"
                    </p>
                  </div>
                </div>

                {/* Rules & Explanation */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Explanation
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {result.explanation}
                    </p>
                  </div>

                  {result.referenceRule && (
                    <div className="pt-6 border-t border-slate-100">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Library className="w-4 h-4" />
                        Reference Rule (RAG)
                      </h3>
                      <a
                        href={result.referenceRule.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-100 hover:bg-emerald-100 transition-colors group"
                      >
                        {result.referenceRule.name}
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Validation Tester Module (Right) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-8rem)] sticky top-24">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Validation Tester
                </h3>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveBenchmarkSet(1)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeBenchmarkSet === 1 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Set 1
                  </button>
                  <button
                    onClick={() => setActiveBenchmarkSet(2)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${activeBenchmarkSet === 2 ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Set 2
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter benchmarks..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredBenchmarks.map((b) => (
                <div 
                  key={b.id} 
                  className={`p-4 rounded-xl border transition-all group ${selectedBenchmark?.id === b.id ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-slate-100 hover:border-slate-300 bg-slate-50/30'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Test #{b.id} • {b.sourceType.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => handleLoadBenchmark(b)}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Load
                    </button>
                  </div>
                  <p className="text-xs font-medium text-slate-800 mb-2 line-clamp-2">
                    {b.inputPrompt}
                  </p>
                  <div className="p-2 bg-white rounded border border-slate-200/50">
                    <p className="text-[10px] font-serif text-slate-600 line-clamp-1">
                      {b.expectedCitation}
                    </p>
                  </div>
                </div>
              ))}
              {filteredBenchmarks.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500">No benchmarks found.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
              <p className="text-[10px] text-slate-500 text-center uppercase tracking-wider font-semibold">
                {activeBenchmarkSet === 1 ? '50-Case Benchmark Dataset (Set 1)' : '50-Case Benchmark Dataset (Set 2)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
