import React from 'react';
import { ClipboardList } from 'lucide-react';

const TEST_CASES = [
  {
    title: 'Case citation test',
    description: 'Brown v. Board of Education style case citation extraction from narrative source text.',
  },
  {
    title: 'Statute citation test',
    description: 'A federal statute snippet like the Clean Air Act or 42 U.S.C. section references.',
  },
  {
    title: 'Journal article test',
    description: 'A law review article citation to make sure journal mode behaves differently from litigation mode.',
  },
  {
    title: 'Context-sensitive comparison',
    description: 'Run the same source once in Litigation mode and once in Journal mode to inspect whether citation choices or explanation meaningfully shift.',
  },
];

export default function TestCasesPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-indigo-600" />
        Validation checklist
      </h2>
      <p className="text-slate-600 mb-5">
        A simple test set for checking whether the app behaves like a litigation-first citation assistant instead of a generic Bluebook toy.
      </p>

      <div className="grid gap-3">
        {TEST_CASES.map((item, index) => (
          <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 shrink-0 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
