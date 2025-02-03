import { connectDB } from "@/library/mongoDB/connect";
import feedbackTicket from "@/models/ticket/feedback";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { company, feedbackType, title, description, createdDate } =
      await req.json();
    await feedbackTicket.create({
      company,
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

export async function GET() {
  try {
    await connectDB();
    const feedbacks = await feedbackTicket.find({});
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.log("Санал хүсэлтүүдийг татах үеийн алдаа", error);
    return NextResponse.json(
      { message: "Санал хүсэлтүүдийг татах үеийн алдаа" },
      {
        status: 500,
      }
    );
  }
}
