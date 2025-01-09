import { connectDB } from "@/library/mongoDB/connect"; // MongoDB-тэй холбогдох функц
import User from "@/models/userModel"; // Таны өгсөн User модел
import { NextResponse } from "next/server";

// GET хүсэлтээр хэрэглэгчдийн жагсаалтыг авах
export async function GET(request) {
  await connectDB(); // MongoDB-тэй холбогдох

  try {
    const users = await User.find({}); // Бүх хэрэглэгчдийг MongoDB-оос татах
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST хүсэлтээр шинэ хэрэглэгч нэмэх эсвэл дэмжихгүй гэж зааж өгч болно
export async function POST(request) {
  return NextResponse.json(
    { message: "POST request not supported here" },
    { status: 405 }
  );
}
