import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper to call OpenAI with JSON mode enabled and a specific system prompt.
 */
export async function generateStructuredAI<T>(
  systemPrompt: string,
  userMessage: string
): Promise<T> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // user requested gpt-4.1-mini but standard alias is gpt-4o-mini
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate AI response. Please check your API key and try again.");
  }
}
