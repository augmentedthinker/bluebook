import { GoogleGenAI, Type } from "@google/genai";
import { REFERENCE_URLS } from "../constants";

// Helper function to get the most up-to-date API key
function getApiKey() {
  return localStorage.getItem('GEMINI_API_KEY') || process.env.API_KEY || process.env.GEMINI_API_KEY;
}

// Helper function to create a new AI instance with the current key
function getAI() {
  const key = getApiKey();
  if (!key) {
    throw new Error("No Gemini API Key found. Please provide one in the settings at the top of the app.");
  }
  return new GoogleGenAI({ apiKey: key });
}

export interface CitationResult {
  sourceType: 'case' | 'statute' | 'rule' | 'regulation' | 'secondary_source' | 'unknown';
  rawSourceDescription: string;
  extractedFields: Record<string, string>;
  citation: string;
  explanation: string;
  ambiguities: string[];
  confidence: 'High' | 'Medium' | 'Low';
  referenceRule?: { name: string; url: string };
  modelUsed?: string;
}

const SYSTEM_INSTRUCTION = `You are an expert legal citation engine. Your sole end-user is a practicing litigation attorney based exclusively in Washington, D.C., who specializes in data breach and cybersecurity litigation.

Role & Workflow:
1. Perform structured extraction of legal metadata from the provided source text.
2. Identify potential ambiguities or missing information.
3. Generate a Bluebook citation using Practitioner Rules (Bluepages).
4. Provide a confidence score for the extraction and citation.

Formatting Rules (Practitioner Mode ONLY):
- Format all outputs strictly according to Practitioner Rules (the Bluepages) for court filings.
- NEVER use Academic/Whitepages formatting (e.g., do not use ALL CAPS or LARGE AND SMALL CAPS for statutory codes).
- Use guidelines designated for "Court Documents and Legal Memoranda."
- Provide citations tailored to D.C. and Federal courts.
- Case Names: Use the commonly accepted, concise case name as it appears in the reporter's running head or as widely cited by courts. Omit extraneous corporate parent, subsidiary, or successor names.
- Business Firms: Retain "Inc.", "Ltd.", "L.L.C.", etc., unless the name also contains "Co.", "Corp.", "Ass'n", "Bros.", etc.
- D.C. Court of Appeals: Abbreviate the District of Columbia Court of Appeals as "D.C." in the date parenthetical, not "D.C. Ct. App.".
- Subsequent History: Do not append subsequent history (e.g., "rev'd in part", "aff'd") to case citations unless it is explicitly present in the source text.
- Abbreviations (Table T6): You MUST strictly apply all Bluebook Table T6 abbreviations to case names, with the exception of the word "Office" (do not abbreviate "Office" to "Off.").
- First Word of Party Name (Cases): Do not abbreviate the first word of a party's name in a case citation, even if it appears in Table T6. This exception does NOT apply to institutional authors; always abbreviate the first word of an institutional author if it is in Table T6 (e.g., use "Nat'l" for "National").
- "In re" and MDL Cases: Retain the full formal subject matter title. NEVER omit "U.S.", "United States", or prepositions (e.g., "of") from an "In re" or MDL case name. This is a strict exception to the general rule of omitting "U.S." before government agency names.
- Prepositions: Do not omit the preposition "of" from agency names or case titles (e.g., use "Office of Pers. Mgmt.", not "Office Pers. Mgmt.").
- Statutes (D.C. Code): When citing the current District of Columbia Official Code, omit the year of publication unless citing a historical version.
- Regulations (C.F.R.): When citing the current Code of Federal Regulations, omit the year of publication unless citing a historical version.
- Restatements: When citing Restatements, abbreviate "American Law Institute" as "Am. L. Inst." in the date parenthetical (do NOT use "Am. Law Inst.").
- Authors (Books and Reports): You MUST use individual authors if they are credited in the source text (e.g., "Barbara J. Rothstein, Ronald J. Hedges & Elizabeth C. Wiggins"). NEVER use the institutional author (e.g., "Fed. Jud. Ctr.") if individual authors are provided. If no individual authors are credited, use the institutional author and abbreviate institutional names according to Table T6 and T13, with the following STRICT exceptions: NEVER abbreviate the word "Justice" to "Just.", NEVER abbreviate "Standards" to "Stds." (use "Standards"), NEVER abbreviate "Evidence" to "Evid." (use "Evidence"), and ALWAYS retain "U.S." if it appears in the source text (e.g., "U.S. Dep't of Justice"). Include all subdivisions of the agency (e.g., "U.S. Dep't of Justice, Office of Privacy & Civil Liberties"), but do NOT include the parent agency if the subdivision is well known (e.g., omit "U.S. Dep't of Comm." before "Nat'l Inst. of Standards & Tech.").
- Institutional Authors in Journals: If an institutional author's name is part of the journal's name (e.g., "The Sedona Conf." and "Sedona Conf. J."), omit the institutional author and begin the citation with the title of the article.
- Report Titles: CRITICAL: You MUST extract the exact title from the source text. Do NOT invent, hallucinate, shorten, or update the title based on your external or pre-trained knowledge of the report number. For example, if the source text provides a specific title for NIST SP 800-61r3, use THAT title, NOT "Computer Security Incident Handling Guide" or "Computer Sec. Incident Handling Guide". Include the full title and subtitle exactly as provided in the source text. You MUST abbreviate words in the title of a report or book according to Table T6 (e.g., "Management" to "Mgmt.", "Community" to "Cmty.", "Information" to "Info.", "Systems" to "Sys.", "Organizations" to "Orgs."), and replace the word "and" with an ampersand ("&").
- Report Numbers and Dates: CRITICAL: You MUST extract the exact report number and date from the source text. NEVER omit the report number (e.g., "NIST CSWP 29"). Abbreviate "Special Publication" to "SP" (e.g., "NIST SP 800-122"). Do NOT invent, hallucinate, or update report numbers or dates based on your pre-trained knowledge. If the source text says "Apr. 3, 2025", you MUST output "(Apr. 3, 2025)" and NEVER "(Apr. 2024)" or "(n.d.)". Place the exact report number after the title, separated by a comma. ALWAYS include the date parenthetical at the end of the citation. NEVER drop the date parenthetical, even if a revision number is present. NEVER output "(n.d.)" if a date is provided in the source text. If the report has a revision number (e.g., "Rev. 5" or "r3"), include it as part of the report number before the date parenthetical (e.g., "NIST SP 800-53 Rev. 5 (Sept. 2020)" or "NIST SP 800-61r3 (Apr. 3, 2025)"). If the source text provides both an edition and a specific date (e.g., "2020 ed." and "Oct. 16, 2020"), you MUST include BOTH in separate parentheticals: "(2020 ed.) (Oct. 16, 2020)". NEVER drop the second parenthetical. NEVER drop the month or day.
- CRITICAL: The 'citation' field MUST contain plain text ONLY. Do NOT use markdown formatting (no asterisks, no double asterisks, no backticks, no underscores for emphasis). Legal citations in court filings do not use markdown.

Disclaimer:
This is a research assistant. Citations may contain errors and must be reviewed by a qualified legal professional before use in court filings.`;

/**
 * Strips common markdown formatting characters from a string.
 */
function sanitizeCitation(citation: string): string {
  return citation
    .replace(/\*\*/g, '') // Strip bold
    .replace(/\*/g, '')   // Strip italics
    .replace(/__/g, '')   // Strip bold underscores
    .replace(/_/g, '')    // Strip italic underscores
    .replace(/`/g, '')    // Strip backticks
    .trim();
}

/**
 * Extracts JSON from a string that might contain markdown formatting.
 */
function extractJson(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) {
    return match[1];
  }
  const firstCurly = text.indexOf('{');
  const lastCurly = text.lastIndexOf('}');
  const firstSquare = text.indexOf('[');
  const lastSquare = text.lastIndexOf(']');
  
  if (firstCurly !== -1 && lastCurly !== -1 && (firstSquare === -1 || firstCurly < firstSquare)) {
    return text.substring(firstCurly, lastCurly + 1);
  } else if (firstSquare !== -1 && lastSquare !== -1) {
    return text.substring(firstSquare, lastSquare + 1);
  }
  return text;
}

export type GeminiModel = 
  | 'gemini-3.1-pro-preview' 
  | 'gemini-3-flash-preview' 
  | 'gemini-2.5-pro' 
  | 'gemini-2.5-flash';

export const DEFAULT_MODEL: GeminiModel = 'gemini-3-flash-preview';

export function getSelectedModel(): GeminiModel {
  return (localStorage.getItem('SELECTED_GEMINI_MODEL') as GeminiModel) || DEFAULT_MODEL;
}

export function setSelectedModel(model: GeminiModel) {
  localStorage.setItem('SELECTED_GEMINI_MODEL', model);
}

export async function citeSource(text: string, model: GeminiModel = getSelectedModel()): Promise<CitationResult> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the following source text and perform a structured extraction for a D.C. litigator.

Source text:
${text}

Reference URLs for rules:
${REFERENCE_URLS.join('\n')}

IMPORTANT: You MUST return ONLY valid JSON matching this structure:
{
  "sourceType": "case" | "statute" | "rule" | "regulation" | "secondary_source" | "unknown",
  "rawSourceDescription": "string",
  "extractedFields": { "field": "value" },
  "citation": "string",
  "explanation": "string",
  "ambiguities": ["string"],
  "confidence": "High" | "Medium" | "Low",
  "referenceRule": { "name": "string", "url": "string" }
}
Do NOT wrap the response in markdown blocks. Return raw JSON only.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ urlContext: {} } as any]
    }
  });

  const jsonStr = extractJson(response.text || "{}");
  const result = JSON.parse(jsonStr);
  if (result.citation) {
    result.citation = sanitizeCitation(result.citation);
    if (!result.citation.endsWith('.')) {
      result.citation += '.';
    }
  }
  result.modelUsed = model;
  return result;
}

export interface SearchResult {
  title: string;
  summary: string;
  sourceType: string;
  citation: string;
  url?: string;
  confidence: 'High' | 'Medium' | 'Low';
  ambiguities: string[];
  referenceRule?: { name: string; url: string };
  modelUsed?: string;
}

export async function searchAndCite(query: string, model: GeminiModel = getSelectedModel()): Promise<SearchResult[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model,
    contents: `Search for the following legal topic or specific source: '${query}'.
Find the most relevant legal sources. For each source found:
1. Provide a brief summary.
2. Determine the source type.
3. Generate the correct Bluebook citation (Practitioner Mode).
4. Identify potential ambiguities or missing information.
5. Provide a confidence score.
6. If available, provide a URL to the source.
7. Identify the specific reference source used from the provided URLs.

Use the following reference sources for additional context:
${REFERENCE_URLS.join('\n')}

IMPORTANT: You MUST return ONLY a valid JSON array matching this structure:
[
  {
    "title": "string",
    "summary": "string",
    "sourceType": "string",
    "citation": "string",
    "url": "string",
    "confidence": "High" | "Medium" | "Low",
    "ambiguities": ["string"],
    "referenceRule": { "name": "string", "url": "string" }
  }
]
Do NOT wrap the response in markdown blocks. Return raw JSON only.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }, { urlContext: {} } as any],
      toolConfig: { includeServerSideToolInvocations: true }
    }
  });

  const jsonStr = extractJson(response.text || "[]");
  const results = JSON.parse(jsonStr);
  return results.map((res: any) => {
    let citation = res.citation ? sanitizeCitation(res.citation) : '';
    if (citation && !citation.endsWith('.')) {
      citation += '.';
    }
    return {
      ...res,
      citation,
      modelUsed: model
    };
  });
}
