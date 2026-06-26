import { NextResponse } from "next/server";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };
type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export type {
  ActionResponse,
  SuccessResponse,
  ErrorResponse,
  APIErrorResponse,
  APIResponse,
  RouteParams,
};
declare global {
  interface Tag {
    _id: string;
    name: string;
  }

  interface Question {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    views: number;
    upvotes: number;
    downvotes: number;
    answers: number;
    author: string;
    createdAt: Date;
    updatedAt: Date;
  }
  type RouteParams = {
    params: Promise<{ id: string }>;
  };
  // types/global.d.ts

  interface GetTagQuestionsParams {
    tagId: string;
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
  }
}
export interface PaginatedSearchParams {
  page?: number
  pageSize?: number
  query?: string
  filter?: string
  sort?: string

}

