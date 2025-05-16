import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use server-only env variable (no NEXT_PUBLIC_)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing Gemini API key in environment" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `
You are an expert coding assistant. Your task is to provide clear, concise, and well-structured code solutions with comments and best practices. Avoid unnecessary explanations.

Problem / Request:
${prompt}

Please provide the complete code solution and comments where appropriate.
    `.trim();

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const text = await result.response.text();

    return new Response(JSON.stringify({ output: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const err = error as { message: string; status?: number };
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.status || 500,
    });
  }
}

interface ApiError {
  message: string;
  status?: number;
}
