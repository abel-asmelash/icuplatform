import { Schema, model, models, Types, Document } from "mongoose";  
 

export interface ITag {
  name: string;
  questions: number;
  description?: string
}

 
export interface ITagDoc extends ITag, Document {
  _id: Types.ObjectId;
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
    description:{type: String, default: ""}
  },
  { timestamps: true },
);

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
