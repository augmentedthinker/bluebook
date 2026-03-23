import React, { useEffect, useState } from 'react';
import { citeSource, CitationResult } from '../services/gemini';
import { BookOpen, Loader2, FileText, Info, List } from 'lucide-react';

export default function CiteSource() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ prompt?: string; mode?: string }>;
      if (custom.detail?.mode === 'cite' && custom.detail?.prompt) {
        setText(custom.detail.prompt);
        setResult(null);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('bluebook-load-test-case', handler as EventListener);
    return () => window.removeEventListener('bluebook-load-test-case', handler as EventListener);
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Ingest & Cite Source
        </h2>
        <p className="text-slate-600 mb-6">
          Paste source text or load a validation-suite prompt below. The AI will analyze it, determine the source type, and generate a Bluebook citation.
        </p>

        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setText("The case of Brown versus Board of Education of Topeka, decided by the Supreme Court of the United States in 1954, can be found in volume 347 of the United States Reports starting on page 483.")}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              Try an example
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste source text here..."
            className="w-full h-48 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none font-sans text-slate-700"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCite}
              disabled={loading || !text.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
              Generate Citation
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Bluebook Citation
            </h3>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xl font-serif text-slate-900 leading-relaxed">
                {result.citation}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Explanation
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {result.explanation}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                Source Type: {result.sourceType}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <List className="w-4 h-4" />
                Extracted Metadata
              </h3>
              <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-slate-200">
                    {result.metadata.map((item, idx) => (
                      <tr key={idx}>
                        <th className="px-4 py-3 font-medium text-slate-900 bg-slate-100/50 w-1/3">
                          {item.key}
                        </th>
                        <td className="px-4 py-3 text-slate-700">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
