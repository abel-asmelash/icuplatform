import { APIErrorResponse } from "@/app/types/global";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import { UserSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-error";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validationData = UserSchema.safeParse(body);

    if (!validationData.success) {
      throw new ValidationError(validationData.error.flatten().fieldErrors);
    }

    const { email, username } = validationData.data;  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");  
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(validationData.data);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
