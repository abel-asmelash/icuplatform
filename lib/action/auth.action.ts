"use server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { signIn } from "@/auth";
import { AuthCredentials } from "@/app/types/action";
import { ActionResponse, ErrorResponse } from "@/app/types/global";
import Account from "../../database/account.model";
import User from "../../database/user.model";
import handleError from "../handlers/error";
import action from "@/lib/handlers/action";
import { signUpSchema } from "../validations";

export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
   console.log("🚀 signUpWithCredentials called with:", params);
  const validationResult = await action({ params, schema: signUpSchema });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { name, username, email, password } = validationResult.params!;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    console.log("✅ Transaction committed");
    await signIn("credentials", { email, password, redirect: false });
     console.log("✅ signIn called successfully");
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
