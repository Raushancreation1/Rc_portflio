import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message || '').trim();
    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    // If Gemini key exists, use Gemini
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a helpful assistant for a developer portfolio website. Keep replies concise and helpful.\nUser: ${message}`;
        const result = await model.generateContent(prompt);
        const reply = result.response.text() || "I'm here to help with your portfolio.";
        return NextResponse.json({ ok: true, reply });
      } catch (err) {
        // Fall through to rules-based reply on failure
      }
    }

    // Rules-based fallback reply (no key or error)
    const lower = message.toLowerCase();
    let fallback = "Thanks for your message! I'm a demo chat bot. How can I assist with your portfolio?";
    if (lower.includes('project') || lower.includes('portfolio')) {
      fallback = 'You can explore my projects in the My Projects section. Want me to highlight a specific stack like Next.js or MongoDB?';
    } else if (lower.includes('contact') || lower.includes('hire')) {
      fallback = 'Great! Use the contact section to reach out, or share your requirements here.';
    } else if (lower.includes('next') || lower.includes('next.js')) {
      fallback = 'This site is built with Next.js, TypeScript, and Tailwind CSS. I can tell you more about the stack if you like.';
    } else if (lower.includes('mongodb') || lower.includes('database')) {
      fallback = 'Data is stored in MongoDB via Mongoose. I can walk you through the API endpoints if you want.';
    } else if (lower.includes('hello') || lower.includes('hi')) {
      fallback = 'Hello! How can I help you today?';
    }
    return NextResponse.json({ ok: true, reply: fallback });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
