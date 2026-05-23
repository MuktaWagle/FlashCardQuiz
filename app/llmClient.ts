import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Generate(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    console.log("Raw LLM Response:", result); // Debugging line
    return result.response.text();
}