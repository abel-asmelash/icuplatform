"use server"

import { ActionResponse, ErrorResponse, PaginatedSearchParams } from "@/types/actions";
import action from "../handlers/action";
import { PaginatedSearchParamsSchema } from "../validations";
import handleError from "../handlers/error";
import User from "@/database/user.model"
 

export async function getUsers(params: PaginatedSearchParams):Promise<ActionResponse<{
    users:User[], isNext: boolean
}>>{
    const validationResult =await action({
        params,
        schema:PaginatedSearchParamsSchema
    })
    if (validationResult instanceof Error){
        return handleError (validationResult) as ErrorResponse
    }
    const {page = 1, pageSize = 10, query,  filter}= params;
    const skip = (Number(page)-1) * pageSize;
    const limit = pageSize;

    const filterQuery = {} as {
      $or?: {
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
      }[];
    };
    if (query) {
      filterQuery.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }
    let sortCriteria = {}
    switch(filter){
        case 'newest':
            sortCriteria = {created: -1}
            break;
            case 'oldest':
            sortCriteria = {created: 1}
            break;
            case 'popular':
            sortCriteria = {reputation: -1}
            break;
         default:
            sortCriteria = {createdAt: -1}
            break;
    }
    try {
        const totalUsers = await User.countDocuments(filterQuery)
        const users = await User.find(filterQuery)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        const isNext = totalUsers > skip + users.length
        return {
            success:  true, data:{users: JSON.parse(JSON.stringify(users)), isNext}
        }
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
}