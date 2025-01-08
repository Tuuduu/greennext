import { connectDB } from "@/library/mongoDB/connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from 'next/navigation'

export async function POST(req) {
  // const session = await getServerSession(authOptions);
  // consol.log("tickets dataa hesegiin session ☺️: ", session);
  await connectDB();
  try {
    const tickets = await mtaTicket.find({}); // Fetch all tickets

    if (tickets.length > 0) {
      return NextResponse.json({ tickets }, { status: 200 }); // Return actual tickets
    } else {
      return NextResponse.json(
        { tickets: [], message: "No tickets found" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Error fetching tickets" },
      { status: 500 }
    );
  }
}
