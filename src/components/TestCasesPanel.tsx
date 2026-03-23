import React, { useMemo, useState } from 'react';
import { ClipboardList, Copy, SendHorizontal } from 'lucide-react';
import { setCitationContext, type CitationContext } from '../services/gemini';
import { BLUEBOOK_TEST_SUITE } from '../testSuite';

export default function TestCasesPanel() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BLUEBOOK_TEST_SUITE;
    return BLUEBOOK_TEST_SUITE.filter(
      (item) =>
        item.prompt.toLowerCase().includes(q) ||
        item.expected.toLowerCase().includes(q) ||
        String(item.id).includes(q) ||
        item.context.toLowerCase().includes(q)
    );
  }, [query]);

  const loadIntoCiteSource = (prompt: string, context: CitationContext) => {
    setCitationContext(context);
    window.dispatchEvent(
      new CustomEvent('bluebook-load-test-case', {
        detail: { prompt, context, mode: 'cite' },
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 h-fit">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-indigo-600" />
          Validation suite · 50
        </h2>
        <p className="text-sm text-slate-600">
          Compact manual test cases with expected citations.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter tests..."
        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm mb-4"
      />

      <div className="space-y-3 max-h-[860px] overflow-auto pr-1">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold shrink-0">
                  {item.id}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 capitalize shrink-0">
                  {item.context}
                </span>
              </div>
              <button
                type="button"
                onClick={() => loadIntoCiteSource(item.prompt, item.context)}
                className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0"
                title="Load this prompt into Cite Source"
              >
                <SendHorizontal className="w-3.5 h-3.5" />
                Load
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Input</div>
                <p className="text-sm text-slate-800 leading-relaxed">{item.prompt}</p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Expected</div>
                <p className="text-sm font-serif text-slate-900 leading-relaxed break-words">{item.expected}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(item.prompt)}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border border-slate-200"
              >
                <Copy className="w-3.5 h-3.5" />
                Prompt
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(item.expected)}
                className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border border-slate-200"
              >
                <Copy className="w-3.5 h-3.5" />
                Expected
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
