import { connectDB } from "@/library/mongoDB/connect";
import ataTicket from "@/models/ticket/ataTicketModel";
import itaTicket from "@/models/ticket/itaTicketModel";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  await connectDB();

  try {
    // Session мэдээллийг авах
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized: No user session found" },
        { status: 401 }
      );
    }

    const { workingPart } = session.user; // Session-оос workingPart авах

    if (!workingPart) {
      return NextResponse.json(
        { message: "workingPart not found in session" },
        { status: 400 }
      );
    }

    let tickets;

    // workingPart-д тохируулан шүүлт хийх
    switch (workingPart) {
      case "Мэдээлэл технологийн алба":
        tickets = await mtaTicket.find({});
        break;
      case "Инженер техникийн алба":
        tickets = await itaTicket.find({});
        break;
      case "Үйл ажиллагааны алба":
        tickets = await ataTicket.find({});
        break;
      default:
        return NextResponse.json(
          { message: "Invalid workingPart" },
          { status: 400 }
        );
    }

    // Зөвхөн тохирох загвараас өгөгдөл буцаах
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { message: "Error fetching tickets" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    { message: "GET request not supported here" },
    { status: 405 }
  );
}
