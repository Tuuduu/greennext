import { connectDB } from "@/library/mongoDB/connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";

export default async function GET(request) {

  await connectDB();
  try {

    const tickets = await mtaTicket.find({}); // Fetch all tickets


    if (tickets) {
      return NextResponse.json({ tickets: true }, { status: 200 });
    } else {
      return NextResponse.json({ tickets: false }, { status: 200 });
    }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
