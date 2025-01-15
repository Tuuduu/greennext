import { connectDB } from "@/library/mongoDB/connect"; // MongoDB-тэй холбогдох функц
import User from "@/models/userModel"; // User модел
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // NextAuth-н сесс авах
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // NextAuth тохиргоо

// GET хүсэлтээр хэрэглэгчдийн жагсаалтыг авах
export async function GET(request) {
  await connectDB(); // MongoDB-тэй холбогдох

  try {
    const session = await getServerSession(authOptions); // Нэвтэрсэн хэрэглэгчийн сесс авах

    // Нэвтэрсэн хэрэглэгч байхгүй тохиолдолд Unauthorized алдаа
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No user session found" },
        { status: 401 }
      );
    }

    const { workingPart } = session.user; // Сессээс `workingPart` утгыг авах

    // `workingPart` байхгүй тохиолдолд алдаа буцаах
    if (!workingPart) {
      return NextResponse.json(
        { success: false, message: "workingPart not found in session" },
        { status: 400 }
      );
    }

    // `workingPart` утгаар MongoDB дээр шүүлт хийх
    const users = await User.find({ workingPart: workingPart }); // MongoDB `part` талбарын шүүлт

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
