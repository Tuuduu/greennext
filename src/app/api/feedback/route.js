import { connectDB } from "@/library/mongoDB/connect";
import feedbackTicket from "@/models/ticket/feedback";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { feedbackType, title, description, createdDate } = await req.json();
    feedbackTicket.create({
      feedbackType,
      title,
      description,
      createdDate,
    });
    return NextResponse.json(
      { message: "Санал хүсэлт бүртгэгдлээ" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Санал хүсэлт бүртгэх үеийн алдаа", error);
    return NextResponse.json(
      { message: "Санал хүсэлт бүртгэх үеийн алдаа" },
      {
        status: 500,
      }
    );
  }
}
