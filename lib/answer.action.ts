"use server";

import Answer, { IAnswer } from "@/database/answer.model";
import { CreateAnswerParams } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/actions";
import action from "./handlers/action";
import { AnswerServerSchema } from "./validations";
import handleError from "./handlers/error";
import mongoose from "mongoose";
import { Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";

export async function createAnswer(
  params: CreateAnswerParams,
): Promise<ActionResponse<IAnswer>> {
  const validation = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validation instanceof Error) {
    return handleError(validation) as ErrorResponse;
  }

  const { content, questionId } = validation.params!;
  const userId = validation.session?.user?.id;

  if (!userId) {
    return handleError(new Error("Unauthorized")) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const [newAnswer] = await Answer.create(
      [{ author: userId, question: questionId, content }],
      { session },
    );
    if (!newAnswer) throw new Error("Failed to create an answer");

    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answers: 1 } },
      { session },
    );

    await session.commitTransaction();
    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
