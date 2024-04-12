import { connectDB } from "@/library/mongoDB/connect";
import ataTicket from "@/models/ticket/ataTicketModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const {
      ticketType,
      username,
      company,
      title,
      position,
      ticketTitle,
      description,
      phoneNumber,
      status,
      modifier,
    } = await req.json();
    ataTicket.create({
      ticketType,
      username,
      company,
      position,
      title,
      ticketTitle,
      description,
      phoneNumber,
      status,
      modifier,
    });
    return NextResponse.json(
      { message: "Дуудлага бүртгэгдлээ" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Дуудлага бүртгэх үеийн алдаа", error);
    return NextResponse.json(
      { message: "Дуудлага бүртгэх үеийн алдаа" },
      {
        status: 500,
      }
    );
  }
}
