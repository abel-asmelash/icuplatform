"use server";

import Answer, { IAnswer } from "@/database/answer.model";
import { CreateAnswerParams, GetAnswersParams } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/actions";
import action from "./handlers/action";
import { AnswerServerSchema, DeleteAnswerSchema, GetAnswersSchema, ToggleHelpfulSchema} from "./validations";
import handleError from "./handlers/error";
import mongoose from "mongoose";
import { Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import {z} from "zod"

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

export async function getAnswers(params: GetAnswersParams): Promise<
  ActionResponse<{
    answers: Answer[];
    isNext: boolean;
    totalAnswers: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId, page = 1, pageSize = 10, filter } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
// togglehelpful file
export async function toggleHelpful(params: {
  answerId: string;
}): Promise<ActionResponse<{ isHelpful: boolean; helpfulCount: number }>> {
  const validation = await action({
    params,
    schema: ToggleHelpfulSchema,
    authorize: true,
  });

  if (validation instanceof Error) {
    return handleError(validation) as ErrorResponse;
  }

  const { answerId } = validation.params!;
  const userId = validation.session?.user?.id;

  if (!userId) {
    return handleError(new Error("Unauthorized")) as ErrorResponse;
  }

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const alreadyMarked = answer.helpfulBy.some(
      (id: mongoose.Types.ObjectId) => id.toString() === userId,
    );

    if (alreadyMarked) {
      answer.helpfulBy = answer.helpfulBy.filter(
        (id:mongoose.Types.ObjectId) => id.toString() !== userId,
      );
    } else {
      answer.helpfulBy.push(new mongoose.Types.ObjectId(userId));
    }

    await answer.save();

    return {
      success: true,
      data: {
        isHelpful: !alreadyMarked,
        helpfulCount: answer.helpfulBy.length,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
// Delete answer functionality

export async function deleteAnswer(
  params:z.infer<typeof DeleteAnswerSchema>
):Promise<ActionResponse>{
  const validation = await action({
    params,
    schema:DeleteAnswerSchema,
    authorize:true
  })

if(validation instanceof Error){
  return handleError(validation) as ErrorResponse
}
 const {answerId} = validation.params!;
 const userId = validation?.session?.user?.id
 if(!userId){
  return handleError(new Error("Unauthorized")) as ErrorResponse
 }
 const session = await mongoose.startSession()
 session.startTransaction()
 try {
  const answer = await Answer.findById(answerId).session(session)
  if(!answer) throw new Error("Answer not found")
    if(answer.author.toString() !== userId){
      throw new Error("You are not authorized to delete this answer")
    }
    await Question.findByIdAndUpdate(
      answer.question, 
      {$inc:{answers: -1}},
      {session},
    )
    await Answer.findByIdAndDelete(answerId, {session})
    await session.commitTransaction()
    revalidatePath(ROUTES.QUESTION(answer.question.toString()))
    return {success: true}
 } catch (error) {
  await session.abortTransaction()
  return handleError(error) as ErrorResponse
 }finally{
  await session.endSession()
 }
}