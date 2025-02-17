import { NextResponse } from "next/server";
import { connectDB } from "@/library/mongoDB/connect";
import * as excel4node from "excel4node";
import mongoose from "mongoose";
import moment from "moment-timezone";

export async function GET(req: Request) {
  try {
    await connectDB();

    const MtaTickets =
      mongoose.models.MtaTickets ||
      mongoose.model(
        "MtaTickets",
        new mongoose.Schema(
          {
            ticketType: String,
            username: String,
            company: String,
            position: String,
            title: String,
            domain: String,
            description: String,
            phoneNumber: Number,
            status: String,
            modifierUserName: String,
            modifierUserId: String,
            updatedDate: String,
            createdDate: String,
          },
          { collection: "mta-tickets" }
        )
      );

    // ✅ Query параметрүүдийг авах
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get("filter"); // "day", "week", "month", "year"
    const filterValue = searchParams.get("value"); // YYYY-MM-DD

    if (!filterType || !filterValue) {
      return NextResponse.json(
        { error: "Шүүлтүүрийн төрлийг болон огноог зөв оруулна уу." },
        { status: 400 }
      );
    }

    let startDate = moment(filterValue, "YYYY-MM-DD").tz("Asia/Ulaanbaatar");
    let endDate = moment(filterValue, "YYYY-MM-DD").tz("Asia/Ulaanbaatar");

    switch (filterType) {
      case "day":
        endDate = startDate.clone().endOf("day");
        break;
      case "week":
        startDate = startDate.startOf("week");
        endDate = startDate.clone().endOf("week");
        break;
      case "month":
        startDate = startDate.startOf("month");
        endDate = startDate.clone().endOf("month");
        break;
      case "year":
        startDate = startDate.startOf("year");
        endDate = startDate.clone().endOf("year");
        break;
      default:
        return NextResponse.json(
          { error: "Шүүлтүүрийн төрлийг зөв оруулна уу." },
          { status: 400 }
        );
    }

    // ✅ MongoDB Query тохируулах
    const query: any = {
      createdDate: {
        $gte: startDate.format("YYYY-MM-DD HH:mm:ss"),
        $lte: endDate.format("YYYY-MM-DD HH:mm:ss"),
      },
    };

    // ✅ Өгөгдлийг татах
    const tickets = await MtaTickets.find(query).lean();

    if (!tickets || tickets.length === 0) {
      return NextResponse.json(
        { error: "Шүүлтэд тохирох өгөгдөл олдсонгүй." },
        { status: 404 }
      );
    }

    // ✅ Excel файл үүсгэх
    const wb = new excel4node.Workbook();
    const ws = wb.addWorksheet("MTA Tickets");

    // ✅ Header style
    const headerStyle = wb.createStyle({
      font: { bold: true, color: "000000" },
      fill: { type: "pattern", patternType: "solid", fgColor: "4CAF50" },
      alignment: { horizontal: "center" },
      border: {
        left: { style: "thin" },
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
      },
    });

    // ✅ Table style
    const tableStyle = wb.createStyle({
      alignment: { horizontal: "left" },
      border: {
        left: { style: "thin" },
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
      },
    });

    // ✅ Өгөгдлийг форматлах
    const numberedTickets = tickets.map((ticket: any, index: number) => ({
      No: index + 1,
      ...ticket,
      createdDate: moment(ticket.createdDate, "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Ulaanbaatar")
        .format("YYYY-MM-DD HH:mm:ss"),
      updatedDate: moment(ticket.updatedDate, "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Ulaanbaatar")
        .format("YYYY-MM-DD HH:mm:ss"),
    }));

    // ✅ Title нэмэх
    ws.cell(1, 1, 1, Object.keys(numberedTickets[0]).length, true).string(
      `MTA Tickets (${filterType.toUpperCase()} - ${filterValue})`
    );

    // ✅ Header нэмэх
    Object.keys(numberedTickets[0]).forEach((key, colIndex) => {
      ws.cell(2, colIndex + 1)
        .string(key)
        .style(headerStyle);
    });

    // ✅ Өгөгдлийг хүснэгтэд нэмэх
    numberedTickets.forEach((row, rowIndex) => {
      Object.values(row).forEach((value, colIndex) => {
        ws.cell(rowIndex + 3, colIndex + 1)
          .string(String(value))
          .style(tableStyle);
      });
    });

    // ✅ Тайлан үүсгэх огноог Монголын цагийн бүсээр гаргах
    const reportDate = moment()
      .tz("Asia/Ulaanbaatar")
      .format("YYYY-MM-DD HH:mm:ss");
    ws.cell(
      numberedTickets.length + 4,
      1,
      numberedTickets.length + 4,
      Object.keys(numberedTickets[0]).length,
      true
    )
      .string(`Тайланг үүсгэсэн огноо: ${reportDate}`)
      .style(headerStyle);

    // ✅ Баганын өргөнийг тохируулах
    Object.keys(numberedTickets[0]).forEach((_, colIndex) => {
      ws.column(colIndex + 1).setWidth(20);
    });

    // ✅ Excel файлыг буфер болгон хөрвүүлэх
    return new Promise((resolve, reject) => {
      wb.writeToBuffer()
        .then((buffer: any) => {
          resolve(
            new NextResponse(buffer, {
              headers: {
                "Content-Type":
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename=mta_tickets_${filterType}_${filterValue}.xlsx`,
              },
            })
          );
        })
        .catch(reject);
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Excel үүсгэхэд алдаа гарлаа", details: error.message },
      { status: 500 }
    );
  }
}
