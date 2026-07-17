declare global {
  interface Tag {
    _id: string;
    name: string;
    questions?: number;
  }
  interface Author {
    _id: string;
    name: string;
    image?: string;
  }

  interface PopulatedQuestion {
    _id: string;
    title: string;
    content: string;
    tags: Tag[];
    views: number;
    upvotes: number;
    downvotes: number;
    answers: number;
    author: Author;
    createdAt: string;
    updatedAt: string;
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

  interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
  }

  interface GetTagQuestionsParams {
    tagId: string;
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
  }

  interface GetQuestionParams {
    questionId: string;
  }
}
interface Answer {
  _id: string;
  author: Author;
  content: string;
  createdAt: Date;
  helpfulBy: string[];
}
interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
}
interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}
