import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import dbConnect from "@/lib/mongoose";
import { ForbiddenError } from "@/lib/http-error";
import handleError from "@/lib/handlers/error";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/app/types/global";

 

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists",
      );
    }

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
