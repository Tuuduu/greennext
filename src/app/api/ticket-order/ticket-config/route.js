import { connectDB } from "@/library/mongoDB/connect";
import mtaTicket from "@/models/ticket/mtaTicketModel";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    // MongoDB холболт
    await connectDB();

    // Хүсэлтийн өгөгдөл унших
    const { id, updates } = await req.json();

    if (!id || !updates) {
      return NextResponse.json(
        { message: "ID болон шинэчлэлтийн өгөгдөл шаардлагатай" },
        { status: 400 }
      );
    }

    // Шинэчлэгдсэн огноог нэмэх
    const updatesWithDate = {
      ...updates,
    };

    // Өгөгдөл шинэчлэх
    const updatedTicket = await mtaTicket.findByIdAndUpdate(
      id,
      updatesWithDate,
      {
        new: true, // Шинэчлэх үйлдлийн дараах өгөгдлийг буцаана
        runValidators: true, // Шалгуур (validation)-ийг ажиллуулна
      }
    );

    if (!updatedTicket) {
      return NextResponse.json(
        { message: "Тухайн ID-тай өгөгдөл олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Өгөгдөл амжилттай шинэчлэгдлээ", updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    console.error("Өгөгдөл шинэчлэх алдаа:", error);
    return NextResponse.json(
      { message: "Өгөгдөл шинэчлэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
