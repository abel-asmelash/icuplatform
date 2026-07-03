import { NextResponse } from "next/server";

export type ActionResponse<T = null> =
  | { success: true; data: T; status?: number }
  | {
      success: false;
      error: {
        message: string;
        details?: Record<string, string[]>;
      };
      status?: number;
    };

export type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
export type ErrorResponse = ActionResponse<undefined> & { success: false };
export type APIErrorResponse = NextResponse<ErrorResponse>;
export type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>;

export type RouteParams = {
  params: Promise<{ id: string }>;
};

export interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}
export interface createQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
export interface EditQuestionParams extends createQuestionParams {
  questionId: string;
}

export interface GetQuestionParams {
  questionId: string;
}
 
// add to types/actions.ts
export interface Author {
  _id: string;
  name: string;
  image?: string;
}

export interface PopulatedQuestion {
  _id: string;
  title: string;
  content: string;
  tags: { _id: string; name: string }[];
  views: number;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
}