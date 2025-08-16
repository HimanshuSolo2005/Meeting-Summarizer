// /app/api/summarize/route.js
import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return new Response(
        JSON.stringify({ error: "Transcript is required" }),
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ Groq model
      messages: [
        {
          role: "system",
          content: "You are a helpful AI that summarizes transcripts clearly.",
        },
        {
          role: "user",
          content: `Summarize this transcript:\n\n${transcript}`,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content || "";

    return new Response(JSON.stringify({ summary }), { status: 200 });
  } catch (error) {
    console.error("Groq API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to summarize transcript" }),
      { status: 500 }
    );
  }
}
