import { connectDB } from "@/library/mongoDB/connect";
import itaTicket from "@/models/ticket/itaTicketModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  let connection;
  try {
    connection = await connectDB();
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
    itaTicket.create({
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
