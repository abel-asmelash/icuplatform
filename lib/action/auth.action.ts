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
import { signUpSchema, SignInSchema } from "../validations";
import { NotFoundError } from "../http-error";

export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: signUpSchema });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { name, username, email, password } = validationResult.params!;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) throw new Error("User already exists");

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) throw new Error("Username already exists");

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

    // wrap signIn to prevent Auth.js internal throws from swallowing success
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch (signInError) {
      console.log("signIn after signup (may be harmless):", signInError);
    }

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password,
    );
    if (!passwordMatch) throw new Error("password does not match");

     
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch (signInError) {
      console.log("signIn error (may be harmless):", signInError);
    }

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
