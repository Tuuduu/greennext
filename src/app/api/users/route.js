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
  await connectDB(); // MongoDB-тэй холбогдох
  try {
    const session = await getServerSession(authOptions); // Нэвтэрсэн хэрэглэгчийн сесс авах

    // Нэвтэрсэн хэрэглэгч байхгүй эсвэл эрх нь admin, superAdmin биш бол
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "superAdmin")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only superAdmins and admins can create users",
        },
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

    // Admin зөвхөн "user" болон "moderator" үүсгэж чадна
    if (
      session.user.role === "admin" &&
      (role === "admin" || role === "superAdmin")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Admins can only create users and moderators",
        },
        { status: 403 }
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

    // Нэвтэрсэн хэрэглэгч байхгүй бол
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    const { user } = session;

    // PUT хүсэлтээс мэдээллийг авах
    const body = await request.json();
    const { _id, password, role, ...updatedFields } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Өөрчлөх гэж буй хэрэглэгчийн мэдээллийг авах
    const targetUser = await User.findById(_id);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Role-тэй холбоотой шалгалтууд
    if (user.role === "user") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Users cannot modify other users",
        },
        { status: 403 }
      );
    }

    if (user.role === "admin") {
      // Admin хэрэглэгч SuperAdmin-ийг өөрчилж болохгүй
      if (targetUser.role === "superAdmin") {
        return NextResponse.json(
          {
            success: false,
            message: "Forbidden: Admins cannot modify superAdmins",
          },
          { status: 403 }
        );
      }

      // Admin хэрэглэгч SuperAdmin болгох өөрчлөлт хийж болохгүй
      if (role === "superAdmin") {
        return NextResponse.json(
          {
            success: false,
            message: "Forbidden: Admins cannot assign users as superAdmin",
          },
          { status: 403 }
        );
      }
    }

    // Password шинэчлэлтийг хийх (хэрэв шинэ нууц үг ирсэн бол)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // Role өөрчлөх гэж байвал зөвшөөрөгдсөн эсэхийг шалгах
    if (role) {
      updatedFields.role = role;
    }

    // Хэрэглэгчийн мэдээллийг шинэчлэх
    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true, // Шинэчлэгдсэн мэдээллийг буцаах
    });

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

    // Нэвтэрсэн хэрэглэгч байхгүй эсвэл superAdmin биш бол хориглох
    if (!session || session.user.role !== "superAdmin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Only superAdmins can delete users",
        },
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

    // Өөрчлөх гэж буй хэрэглэгчийг шалгах
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // superAdmin өөрийгөө устгаж болохгүй
    if (targetUser.role === "superAdmin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: You cannot delete another superAdmin",
        },
        { status: 403 }
      );
    }

    // Хэрэглэгчийг устгах
    await User.findByIdAndDelete(userId);

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
