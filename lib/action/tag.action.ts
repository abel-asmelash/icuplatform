import { ActionResponse, ErrorResponse, PaginatedSearchParams } from "../../types/global";
import handleError from "../handlers/error";
import { GetTagQuestionsSchema, PaginatedSearchParamsSchema } from "../validations";
import Tag from "@/database/tag.model"
import action from "../handlers/action"
import  Question  from "@/database/question.model";
 


export const getTags = async (
  params: PaginatedSearchParams,
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,  
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  const filterQuery: Record<string, unknown> = {};
  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }]; 
  }

  let sortCriteria = {};
  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };  
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;  
    default:
      break;
  }

   try {
    const totalTags = await Tag.countDocuments(filterQuery)
    const tags = await Tag.find(filterQuery).sort(sortCriteria).skip(skip).limit(limit);
    const isNext = totalTags > skip + tags.length
    return {success: true, data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
    }}

   } catch (error) {
    return handleError(error) as ErrorResponse
   }
};
 

export const GetTagQuestions = async (
  params: GetTagQuestionsParams,
): Promise<ActionResponse<{ tag: Tag;  question: Question[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {tagId,  page = 1, pageSize = 10, query} = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

 

  

  try {
    const tag = await Tag.findById(tagId)
    if(!tag) throw new Error("Tag not found")
     const filterQuery: Record<string, unknown> = {};
  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }
    const totalQuestions = await Tag.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
       .select('_id title views answers upvots downvotes author createAt')
      .populate([
        {path: 'author', select: 'name image'},
        {path: "tags", select: "name"}
      ])
      .skip(skip)
      .limit(limit);
    const isNext = totalQuestions > skip + questions.length;
    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        question: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
 