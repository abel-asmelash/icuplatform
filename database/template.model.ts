import { Schema, model, models, Types, ObjectId } from "mongoose";

export interface IQuestion {
  
}

const QuestionSchema = new Schema<IQuestion>(
  {
    
  },
  { timestamps: true },
);

const Question = models?.Account || model<IQuestion>("Account", QuestionSchema);

export default Question;
