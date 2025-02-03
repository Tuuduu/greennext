import { connectDB } from "@/library/mongoDB/connect"; // MongoDB-тэй холбогдох функц
import User from "@/models/userModel"; // User модел
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // NextAuth-н сесс авах
import { authOptions } from "@/library/nextauth/AuthOptions"; // NextAuth тохиргоо
import bcrypt from "bcrypt"; // bcrypt-ийг импортлох

// GET хүсэлтээр хэрэглэгчдийн жагсаалтыг авах
export async function GET() {
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

    const { role, workingPart } = session.user; // Сессээс role болон workingPart утгыг авах

    // Role байхгүй эсвэл буруу тохиолдолд алдаа буцаах
    if (!role) {
      return NextResponse.json(
        { success: false, message: "Role not found in session" },
        { status: 400 }
      );
    }

    // Role-д тулгуурлан шүүлт хийх
    let filter = {};
    if (role === "superAdmin") {
      filter = {}; // Admin бүх хэрэглэгчийн жагсаалт авах
    } else if (role === "user" || role === "admin") {
      if (!workingPart) {
        return NextResponse.json(
          {
            success: false,
            message: "WorkingPart is required for manager role",
          },
          { status: 400 }
        );
      }
      filter = { workingPart }; // Manager зөвхөн өөрийн workingPart-ийн хэрэглэгчдийг авах
    } else {
      return NextResponse.json(
        { success: false, message: "Forbidden: Insufficient permissions" },
        { status: 403 }
      );
    }

    // MongoDB дээр шүүлт хийж хэрэглэгчдийн жагсаалтыг авах
    const users = await User.find(filter, "-password"); // Password-ийг хасаж харуулах

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST хүсэлтээр шинэ хэрэглэгч нэмэх
export async function POST(request) {
  // request-ийг параметрээр хүлээж авна
  await connectDB(); // MongoDB-тэй холбогдох
  try {
    const session = await getServerSession(authOptions); // Нэвтэрсэн хэрэглэгчийн сесс авах

    // Нэвтэрсэн хэрэглэгч admin эсэхийг шалгах
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only admins can create users" },
        { status: 403 }
      );
    }

    const body = await request.json(); // request-ээс JSON өгөгдлийг уншина
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      workingPart,
      department,
      employment,
      permissions,
    } = body;

    // Шаардлагатай талбаруудыг шалгах
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !role ||
      !workingPart ||
      !department ||
      !employment
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Давхардсан email шалгах
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Password hash хийх
    const hashedPassword = await bcrypt.hash(password, 10);

    // Хэрэглэгч үүсгэх
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      workingPart,
      department,
      employment,
      permissions: permissions || [], // Permissions хүлээж авах эсвэл хоосон массив
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user: ", error);
    return NextResponse.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
}

// PUT хүсэлтээр хэрэглэгч засварлах
export async function PUT(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    // Нэвтэрсэн хэрэглэгч admin эсэхийг шалгах
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only admins can update users" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { _id, ...updatedFields } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true, // Update хийсний дараа шинэ утгыг буцаах
    });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user: ", error);
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}

// DELETE хүсэлтээр хэрэглэгч устгах
export async function DELETE(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    // Нэвтэрсэн хэрэглэгч admin эсэхийг шалгах
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only admins can delete users" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id"); // URL-аас ID авах

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user: ", error);
    return NextResponse.json(
      { success: false, message: "Error deleting user" },
      { status: 500 }
    );
  }
}
