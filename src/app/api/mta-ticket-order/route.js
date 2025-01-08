import { connectDB } from "@/library/mongoDB/connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";

// POST хүсэлтийг зохицуулна
export async function POST(request) {
  await connectDB();

  try {
    const tickets = await mtaTicket.find({}); // Fetch all tickets

    // Жагсаалтыг буцаах
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Error fetching tickets" },
      { status: 500 }
    );
  }
  
}

// GET хүсэлтийг дэмжихгүй
export async function GET(request) {
  return NextResponse.json(
    { message: "GET request not supported here" },
    { status: 405 }
  );
}
