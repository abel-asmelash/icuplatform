import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function generateTagDescription(tagName: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Write a single, concise sentence (max 20 words) describing the biblical or theological topic "${tagName}" for a church Q&A platform. Do not use markdown, quotes, or a trailing period-less sentence. Just the plain sentence.`,
      system:
        "You are a knowledgeable and respectful Christian assistant writing short topic descriptions for a church community platform. Keep descriptions accurate, denominationally neutral, and easy to understand for people of varying biblical knowledge.",
    });

    return text.trim();
  } catch (error) {
    console.error("Tag description generation failed:", error);
    return "Ontdek onderwerpen en discussies over bijbelstudie en theologie.";
  }
}
