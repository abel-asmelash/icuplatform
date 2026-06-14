import { APIErrorResponse } from "@/app/types/global";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/database/user.model";
import { UserSchema } from "@/lib/validations";

// GET /api/users/[id]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) throw new NotFoundError("User");

    await dbConnect();
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) throw new NotFoundError("User");

    await dbConnect();
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 }); // 204 No Content shouldn't have a body
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT /api/users/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) throw new NotFoundError("User");

    await dbConnect();
    const body = await request.json();
    const validationData = UserSchema.parse(body);
    const updatedUser = await User.findByIdAndUpdate(id, validationData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
