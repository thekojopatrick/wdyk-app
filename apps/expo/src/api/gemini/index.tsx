import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY ?? null;
const genAI = new GoogleGenerativeAI(apiKey as never);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: "application/json",
};

async function run() {
  // Choose a model that's appropriate for your use case.
  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

export { run };