import { GoogleGenAI, Type } from "@google/genai";
import { REFERENCE_URLS } from "../constants";

export type GeminiModelId =
  | "gemini-3.1-pro-preview"
  | "gemini-3-flash-preview"
  | "gemini-2.5-pro"
  | "gemini-2.5-flash";

export interface ModelOption {
  id: GeminiModelId;
  label: string;
  notes: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "gemini-3.1-pro-preview",
    label: "Gemini 3.1 Pro Preview",
    notes: "Most ambitious option here, but also the most likely to hit preview/capacity turbulence.",
  },
  {
    id: "gemini-3-flash-preview",
    label: "Gemini 3 Flash Preview",
    notes: "Faster preview flash model. Good for comparison against 3.1 Pro.",
  },
  {
    id: "gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
    notes: "Stable higher-intelligence baseline for tougher citation tasks.",
  },
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    notes: "Best first stop for reliability and speed testing.",
  },
];

const MODEL_STORAGE_KEY = "BLUEBOOK_MODEL";
const API_KEY_STORAGE_KEY = "GEMINI_API_KEY";

export function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || process.env.API_KEY || process.env.GEMINI_API_KEY;
}

export function getSelectedModel(): GeminiModelId {
  const stored = localStorage.getItem(MODEL_STORAGE_KEY) as GeminiModelId | null;
  if (stored && MODEL_OPTIONS.some((model) => model.id === stored)) {
    return stored;
  }
  return "gemini-2.5-flash";
}

export function setSelectedModel(model: GeminiModelId) {
  localStorage.setItem(MODEL_STORAGE_KEY, model);
  window.dispatchEvent(new Event("bluebook-model-changed"));
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
      `${model} is currently unavailable or overloaded (503 / demand spike). Your API key may still be valid — try Gemini 2.5 Flash or retry in a moment.`
    );
  }
  return new Error(`${model}: ${message}`);
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

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
Analyze the following source text.
1. Determine the type of source (e.g., Case, Statute, Law Review Article, Book).
2. Extract the relevant metadata (author, title, volume, reporter, page, year, etc.).
3. Generate the correct Bluebook citation for this source.
4. Provide a brief explanation of the citation format used.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join("\n")}

Source text:
${text}`,
      config: {
        systemInstruction:
          "You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. Strictly adhere to its rules for all citations.",
        tools: [{ urlContext: {} } as any],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sourceType: { type: Type.STRING, description: "The type of legal source" },
            citation: { type: Type.STRING, description: "The formatted Bluebook citation" },
            explanation: { type: Type.STRING, description: "Explanation of the citation format" },
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

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
Search for the following legal topic or specific source: '${query}'.
Find the most relevant legal sources. For each source found:
1. Provide a brief summary.
2. Determine the source type.
3. Generate the correct Bluebook citation.
4. If available, provide a URL to the source.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join("\n")}`,
      config: {
        systemInstruction:
          "You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. Strictly adhere to its rules for all citations.",
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
