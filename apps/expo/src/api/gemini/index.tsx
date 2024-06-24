import { Env } from "@env";
import { GoogleGenerativeAI } from "@google/generative-ai";

//'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'

const apiKey = Env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
console.log({ apiKey });

const generationConfig = {
  responseMimeType: "application/json",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig,
});

// const generationConfig = {
//   temperature: 2,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 1024,
//   responseMimeType: "application/json",
// };

async function runGeminiAPI() {
  // Choose a model that's appropriate for your use case.
  const prompt = `List a few popular cookie recipes using this JSON schema:
Recipe = {'recipe_name': str}
Return: list[Recipe]`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const resOutput = response.text();
  console.log({ resOutput });
}

export { runGeminiAPI };
