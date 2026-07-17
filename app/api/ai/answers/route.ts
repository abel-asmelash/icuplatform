import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import { AIAnswerSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/actions";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const bannedWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "idiot",
  "bastard",
  "damn",
  "crap",
  // Dutch equivalents worth including too, given your audience:
  "klote",
  "kut",
  "kanker",
  "lul",
  "eikel",
];
function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase();
  return bannedWords.some((word) => {
    const pattern = new RegExp(`\\b${word}\\b`, "i");
    return pattern.test(normalized);
  });
}
export async function POST(req: Request) {
  const { question, content, userAnswer } = await req.json();
  try {
    const validatedData = AIAnswerSchema.safeParse({
      question,
      content,
      userAnswer,
    });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const textToCheck = [question, content, userAnswer].join(" ");
    if (containsProfanity(textToCheck)) {
      throw new ValidationError({
        userAnswer: [
          "Gebruik alstublieft respectvolle taal in je vraag of antwoord.",
        ],
      });
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Generate a markdown-formatted response to the following Bible/faith question: "${question}".

  Consider the provided context:
  **Context:** ${content}

  Also, prioritize and incorporate the user's answer when formulating your response:
  **User's Answer:** ${userAnswer}

  Prioritize the user's answer only if it is biblically and theologically sound. If it's incomplete, unclear, or theologically inaccurate, improve or correct it gently while keeping the response concise, encouraging, and grounded in Scripture. Where relevant, reference specific Bible verses to support the answer. Avoid denominational bias and keep the tone warm and pastoral. Provide the final answer in markdown format.`,
      system:
        "You are a knowledgeable and compassionate Christian assistant helping members of a church community understand Scripture and grow in faith. Your answers should be biblically grounded, respectful of different Christian traditions, easy to understand for people of varying biblical knowledge, and encouraging in tone. When citing Scripture, use standard verse references (e.g., John 3:16).",
    });
    return NextResponse.json(
      {
        success: true,
        data: text,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("AI generation failed:", error);
    return handleError(error, "api") as APIErrorResponse;
  }
}
