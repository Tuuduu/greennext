import { connectDB } from "@/library/mongoDB/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json({ user: true }, { status: 200 });
    } else {
      return NextResponse.json({ user: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return NextResponse.json(
      { message: "Error checking if user exists" },
      { status: 500 }
    );
  }
}
