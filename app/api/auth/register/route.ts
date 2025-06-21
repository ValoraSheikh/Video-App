import { connectToDatabase } from "@/lib/db";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 400 }
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { messsage: "User registered Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Registration", error);

    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
