"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function runGeminiAi(message: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a helpful assistant for an image generator website. If user is asking about the image generation features, you answer them in maximum 50 character long reply. All you need to know is: This app is free to use at the start and can generate images using ai for free. Users can download freely generated images. They must be logged in.",
          },
        ],
      },

      {
        role: "model",
        parts: [
          {
            text: "🍅Free AI image generation, download your creations!\nLogin required. \n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(message);
  const response = result.response;
  console.log(result.response.text());
  return response.text();
}
