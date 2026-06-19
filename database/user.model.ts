import { Schema, Document, model, models } from "mongoose";

export interface IUser {
  id:string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}
export interface IUserDoc extends IUser, Document{}
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    bio: { type: String },
    image: { type: String, required: false },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
