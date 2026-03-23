import { GoogleGenAI, Type } from "@google/genai";
import { REFERENCE_URLS } from "../constants";

export type GeminiModelId = "gemini-3-flash-preview";
export type CitationContext = "litigation" | "journal" | "general";

export const FIXED_MODEL_ID: GeminiModelId = "gemini-3-flash-preview";
export const FIXED_MODEL_LABEL = "Gemini 3 Flash Preview";
export const DEFAULT_CONTEXT: CitationContext = "litigation";

const API_KEY_STORAGE_KEY = "GEMINI_API_KEY";
const CONTEXT_STORAGE_KEY = "BLUEBOOK_CONTEXT";

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || process.env.API_KEY || process.env.GEMINI_API_KEY;
}

export function getSelectedModel(): GeminiModelId {
  return FIXED_MODEL_ID;
}

export function getCitationContext(): CitationContext {
  const stored = localStorage.getItem(CONTEXT_STORAGE_KEY) as CitationContext | null;
  if (stored === "litigation" || stored === "journal" || stored === "general") return stored;
  return DEFAULT_CONTEXT;
}

export function setCitationContext(context: CitationContext) {
  localStorage.setItem(CONTEXT_STORAGE_KEY, context);
  window.dispatchEvent(new Event("bluebook-context-changed"));
}

function getAI() {
  const key = getStoredApiKey();
  if (!key) {
    throw new Error("No Gemini API Key found. Please provide one in the settings at the top of the app.");
  }
  return new GoogleGenAI({ apiKey: key });
}

function parseJson<T>(text: string | undefined, fallback: T): T {
  if (!text) return fallback;
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

function normalizeError(err: any, model: GeminiModelId) {
  const message = err?.message || "Unknown Gemini API error.";
  if (message.includes("503") || /unavailable|overloaded|spikes in demand/i.test(message)) {
    return new Error(
      `${model} is currently unavailable or overloaded (503 / demand spike). Your API key may still be valid — retry in a moment.`
    );
  }
  return new Error(`${model}: ${message}`);
}

function buildContextInstruction(context: CitationContext) {
  switch (context) {
    case "litigation":
      return `The user is a practicing D.C. litigator. Default to litigation-oriented Bluebook conventions and practical court-facing legal writing, not law review formatting, unless the user explicitly asks for academic or journal style. Prefer practical litigation citations and avoid law-review-specific choices when a litigation-facing form is more appropriate.`;
    case "journal":
      return `The user is writing in an academic or law-journal context. Default to law review / journal-oriented Bluebook treatment unless the user explicitly asks for litigation-oriented formatting.`;
    default:
      return `The user is doing general legal research. Follow Bluebook carefully, infer the most likely context from the material, and explain any ambiguity.`;
  }
}

export interface CitationResult {
  sourceType: string;
  citation: string;
  explanation: string;
  metadata: { key: string; value: string }[];
}

export async function citeSource(text: string): Promise<CitationResult> {
  const ai = getAI();
  const model = getSelectedModel();
  const context = getCitationContext();
  const contextInstruction = buildContextInstruction(context);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
${contextInstruction}
Analyze the following source text.
1. Determine the type of source (e.g., Case, Statute, Law Review Article, Book).
2. Extract the relevant metadata (author, title, volume, reporter, page, year, etc.).
3. Generate the correct Bluebook citation for this source.
4. Provide a brief explanation of the citation format used, including any context-sensitive choice you made.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join("\n")}

Source text:
${text}`,
      config: {
        systemInstruction:
          `You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. ${contextInstruction} Strictly adhere to Bluebook rules and be explicit when context affects the answer.`,
        tools: [{ urlContext: {} } as any],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sourceType: { type: Type.STRING, description: "The type of legal source" },
            citation: { type: Type.STRING, description: "The formatted Bluebook citation" },
            explanation: { type: Type.STRING, description: "Explanation of the citation format and context-sensitive choice" },
            metadata: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  key: { type: Type.STRING },
                  value: { type: Type.STRING },
                },
                required: ["key", "value"],
              },
              description: "Extracted metadata key-value pairs",
            },
          },
          required: ["sourceType", "citation", "explanation", "metadata"],
        },
      },
    });

    return parseJson<CitationResult>(response.text, {
      sourceType: "Unknown",
      citation: "",
      explanation: "No explanation returned.",
      metadata: [],
    });
  } catch (err) {
    throw normalizeError(err, model);
  }
}

export interface SearchResult {
  title: string;
  summary: string;
  sourceType: string;
  citation: string;
  url?: string;
}

export async function searchAndCite(query: string): Promise<SearchResult[]> {
  const ai = getAI();
  const model = getSelectedModel();
  const context = getCitationContext();
  const contextInstruction = buildContextInstruction(context);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
${contextInstruction}
Search for the following legal topic or specific source: '${query}'.
Find the most relevant legal sources. For each source found:
1. Provide a brief summary.
2. Determine the source type.
3. Generate the correct Bluebook citation.
4. If available, provide a URL to the source.
5. Favor sources and citation treatment appropriate to the current writing context.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join("\n")}`,
      config: {
        systemInstruction:
          `You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. ${contextInstruction} Strictly adhere to Bluebook rules and prefer context-appropriate sources/citation behavior.`,
        tools: [{ googleSearch: {} }, { urlContext: {} } as any],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Title of the source" },
              summary: { type: Type.STRING, description: "Brief summary of the source" },
              sourceType: { type: Type.STRING, description: "Type of legal source" },
              citation: { type: Type.STRING, description: "Formatted Bluebook citation" },
              url: { type: Type.STRING, description: "URL to the source if available" },
            },
            required: ["title", "summary", "sourceType", "citation"],
          },
        },
      },
    });

    return parseJson<SearchResult[]>(response.text, []);
  } catch (err) {
    throw normalizeError(err, model);
  }
}
