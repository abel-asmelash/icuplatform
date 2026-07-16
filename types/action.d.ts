import { PaginatedSearchParams } from "./actions";
export interface SignInWithOAuthParams {
  provider: string;
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
}

export interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface createQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}
export interface EditQuestionParams extends createQuestionParams {
  questionId: string;
}
export interface GetQuestionParams {
  questionId: string;
}
export interface GetTagQuestionParams extends Omit<
  PaginatedSearchParams,
  "filter"
> {
  tagId: string;
}
export interface IncrementViewsParams {
  questionId: string;
}
export interface CreateAnswerParams {
  questionId: string;
  content: string;
}
export interface GetAnswersParams extends PaginatedSearchParams {
  questionId: string;
}
export interface RecommendationParams {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
}