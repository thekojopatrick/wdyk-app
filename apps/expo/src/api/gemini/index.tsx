import { Env } from "@env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery } from "@tanstack/react-query";

const apiKey =
  Env.GOOGLE_GEMINI_API_KEY || "AIzaSyBfCwzAh7bYioWPxGlbX49at4FclwDIRq8";

if (!apiKey) {
  throw new Error(
    "Google Gemini API key is not defined in the environment variables",
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig,
});

async function fetchGeminiAPIData() {
  const prompt = `
    List ten words from past National Spelling Bee competitions using this JSON schema:
    {
      "word": "",
      "origin": "",
      "definition": "",
      "partOfSpeech": "",
      "difficulty": ""
    }
    Return: list[object]
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return JSON.parse(response.text()) as {
    word: string;
    origin: string;
    definition: string;
    partOfSpeech: string;
    difficulty: string;
  }[];
}

export function useGeminiAPI() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["geminiAPI"],
    queryFn: fetchGeminiAPIData,
  });

  return { data, isLoading, error };
}
