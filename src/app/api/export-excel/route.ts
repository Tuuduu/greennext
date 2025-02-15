import { NextResponse } from "next/server";
import { connectDB } from "@/library/mongoDB/connect";
import * as XLSX from "xlsx";
import mongoose from "mongoose";

export async function GET() {
  try {
    // 🔹 MongoDB холболт үүсгэх
    await connectDB();

    // 🔹 "mta-tickets" коллекшний модель үүсгэх
    const mtaTicketSchema = new mongoose.Schema(
      {
        ticketType: String,
        username: String,
        title: String,
        description: String,
        modifierUserName: String,
        createdDate: String,
        updatedDate: String,
        company: String,
        phoneNumber: Number,
        status: String,
        modifierUserId: String,
      },
      { collection: "mta-tickets" } // 🔥 Энэ коллекшнийг оноож өгсөн
    );

    const MtaTickets =
      mongoose.models.MtaTickets ||
      mongoose.model("MtaTickets", mtaTicketSchema);

    // 🔹 "mta-tickets" коллекшноос өгөгдөл авах
    const tickets = await MtaTickets.find().lean();

    if (!tickets || tickets.length === 0) {
      return NextResponse.json(
        { error: "MTA Tickets коллекшнд өгөгдөл олдсонгүй." },
        { status: 404 }
      );
    }

    console.log("MTA Tickets өгөгдөл:", tickets); // ✅ Debug хийхэд хэрэгтэй

    // 🔹 Дугаар нэмэх ба `_id`-г хасах
    const numberedTickets = tickets.map((ticket: any, index: number) => {
      const { _id, ...rest } = ticket; // 🔥 `_id`-г устгаж байгаа
      return {
        No: index + 1, // Дугаар нэмэх
        ...rest, // Бусад өгөгдлүүдийг үлдээх
      };
    });

    // 🔹 Excel хүснэгтэд хөрвүүлэх
    const worksheet = XLSX.utils.json_to_sheet([]);

    // 🔹 Гарчиг нэмэх
    const title = "ГРИЙН ДИСТРИБЬЮШН ХХК-ИЙН КОМПЬЮТЕРЫН БҮРТГЭЛ";
    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });

    // 🔹 Толгойн мөрийг нэмэх
    const headers = Object.keys(numberedTickets[0]);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A3" });

    // 🔹 Өгөгдлийг хүснэгтэнд нэмэх
    XLSX.utils.sheet_add_json(worksheet, numberedTickets, {
      origin: "A4",
      skipHeader: true,
    });

    // 🔹 Гарчигт стиль тохируулах
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
    ];
    worksheet["A1"].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" },
    };

    // 🔹 AutoFilter тохируулах
    worksheet["!autofilter"] = {
      ref: `A3:${String.fromCharCode(65 + headers.length - 1)}3`,
    };

    // 🔹 Баганын өргөн тохируулах
    worksheet["!cols"] = headers.map(() => ({ wch: 20 }));

    // 🔹 Excel Workbook үүсгэх
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MTA Tickets");

    // 🔹 Excel файл Buffer болгон хөрвүүлэх
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // 🔹 Excel татахад тохиромжтой header тохиргоо
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=mta_tickets_report.xlsx",
      },
    });
  } catch (error: any) {
    console.error("Excel үүсгэх алдаа:", error);
    return NextResponse.json(
      { error: "Excel тайлан үүсгэхэд алдаа гарлаа", details: error.message },
      { status: 500 }
    );
  }
}
