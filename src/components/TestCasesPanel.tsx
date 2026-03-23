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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-600" />
            Validation suite · 50 cases
          </h2>
          <p className="text-slate-600 max-w-3xl">
            This is now a real test harness surface: each case has a concrete input prompt, an expected citation, and a one-click way to load that prompt into the app.
          </p>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by case, statute, citation, number, or context..."
          className="w-full md:w-96 px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
        />
      </div>

      <div className="space-y-4 max-h-[950px] overflow-auto pr-1">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-semibold">
                    {item.id}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 capitalize">
                    {item.context}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Input prompt</h3>
                  <p className="text-slate-800 leading-relaxed">{item.prompt}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Expected citation</h3>
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-lg font-serif text-slate-900 break-words">{item.expected}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 lg:w-52">
                <button
                  type="button"
                  onClick={() => loadIntoCiteSource(item.prompt, item.context)}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                >
                  <SendHorizontal className="w-4 h-4" />
                  Load into Cite Source
                </button>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(item.prompt)}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy prompt
                </button>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(item.expected)}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-200"
                >
                  <Copy className="w-4 h-4" />
                  Copy expected
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
