import React, { useEffect } from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';

interface QuotaErrorHelperProps {
  error: string;
}

export default function QuotaErrorHelper({ error }: QuotaErrorHelperProps) {
  const isQuotaError = error.includes('429') || error.toLowerCase().includes('resource exhausted');

  useEffect(() => {
    if (isQuotaError) {
      window.dispatchEvent(new CustomEvent('gemini-429-error'));
    }
  }, [isQuotaError]);

  return (
    <div className="mt-6 space-y-4">
      {/* Original technical error */}
      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm font-mono break-all">{error}</div>
      </div>

      {/* Helper box for 429 */}
      {isQuotaError && (
        <div className="p-5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Next Steps: Quota Exhausted</h3>
          </div>
          <ul className="space-y-2 text-sm ml-7 list-disc">
            <li><strong>Try switching to a different model</strong> using the selector at the top of the page (e.g., switch to a Flash model).</li>
            <li>Try your request again a bit later if the model's quota has temporarily run out.</li>
            <li>Your API key is likely still valid, just currently rate-limited for this specific model.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
