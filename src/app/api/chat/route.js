import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    console.log("API Key:", process.env.GEMINI_API_KEY); // Debugging

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("❌ GEMINI_API_KEY is missing. Check your .env.local file.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await model.generateContent([message]); // ✅ Use an array
    const responseText = await result.response.text(); // ✅ Properly extract response

    return Response.json({ response: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      { error: "Error generating response", details: error.message },
      { status: 500 }
    );
  }
}
