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
  sourceType: string;
  citation: string;
  explanation: string;
  metadata: { key: string; value: string }[];
}

export async function citeSource(text: string): Promise<CitationResult> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
Analyze the following source text.
1. Determine the type of source (e.g., Case, Statute, Law Review Article, Book).
2. Extract the relevant metadata (author, title, volume, reporter, page, year, etc.).
3. Generate the correct Bluebook citation for this source.
4. Provide a brief explanation of the citation format used.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join('\n')}

Source text:
${text}`,
    config: {
      systemInstruction: "You are an expert legal assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. Strictly adhere to its rules for all citations.",
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
                value: { type: Type.STRING }
              },
              required: ["key", "value"]
            },
            description: "Extracted metadata key-value pairs"
          }
        },
        required: ["sourceType", "citation", "explanation", "metadata"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
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
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation.
Search for the following legal topic or specific source: '${query}'.
Find the most relevant legal sources. For each source found:
1. Provide a brief summary.
2. Determine the source type.
3. Generate the correct Bluebook citation.
4. If available, provide a URL to the source.

Use the following reference sources for additional context on legal rules and citation guidelines:
${REFERENCE_URLS.join('\n')}`,
    config: {
      systemInstruction: "You are an expert legal researcher and assistant specializing in the 21st Edition of The Bluebook: A Uniform System of Citation. Strictly adhere to its rules for all citations.",
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
            url: { type: Type.STRING, description: "URL to the source if available" }
          },
          required: ["title", "summary", "sourceType", "citation"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}
