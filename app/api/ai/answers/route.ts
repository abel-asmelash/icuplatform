import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import { AIAnswerSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/actions";
import {groq} from "@ai-sdk/groq";
import {generateText} from "ai";
import {  NextResponse } from "next/server";


export async function POST(req:Request){
    const {question, content} = await req.json()
    try {
        const validatedData = AIAnswerSchema.safeParse({question, content})
        if(!validatedData.success){
         throw new ValidationError(validatedData.error.flatten().fieldErrors)
        }
        const { text } = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          prompt: `Generate a response to the following question:${question}. Base it on the provided content: ${content} `,
          system:
            "You are a welcoming, compassionate, and helpful ministry assistant. Provide informative, encouraging, and respectful responses in markdown format. Use appropriate markdown syntax for headings, bullet points, and text emphasis where necessary to make the answer clear and easy to read. If quoting scripture, format it beautifully using blockquotes or italicized text.",
        });
        return NextResponse.json({
            success:true, data:text
        }, {status:200})
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse
    }
}