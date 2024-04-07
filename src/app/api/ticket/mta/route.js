import { connectDB } from "@/library/mongoDB/connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const {
      ticketType,
      username,
      company,
      position,
      ticketTitle,
      domain,
      description,
      phoneNumber,
    } = await req.json();
    mtaTicket.create({
      ticketType,
      username,
      company,
      position,
      ticketTitle,
      domain,
      description,
      phoneNumber,
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
