import { Schema, model, models, Types, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  answers: number;
  author: Types.ObjectId;
  upvotes: number;
  helpfulBy: Types.ObjectId[];
}

export interface IQuestionDoc extends IQuestion, Document {
  _id: Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: Number, default: 0 },
    helpfulBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
