import { NextResponse } from "next/server";
import user from "@/models/userModel";
import { connectDB } from "@/library/mongoDB/connect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    const exists = await user.findOne({ email: email });
    if (exists) {
      return NextResponse.json(
        { message: "Хэрэглэгч бүртгэлтэй байна." },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ username, email, password: hashedPassword });
    return NextResponse.json(
      { message: "Хэрэглэгч амжилттай бүртгэгдлээ." },
      { status: 201 }
    );
  } catch (error) {
    console.log("Хэрэглэгч бүртгэх үеийн алдаа: ", error);
    return NextResponse.json(
      { message: "Хэрэглэгч бүртгэх үеийн алдаа" },
      { status: 500 }
    );
  }
}
