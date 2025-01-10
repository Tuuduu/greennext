import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Зөвшөөрөгдсөн URL-уудын жагсаалт
const protectedRoutes = ["/home", "/about"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUT_SECRET });

  // Хэрэв токен байхгүй бол хэрэглэгч нэвтрээгүй гэж үзнэ
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // Нэвтрэх хуудас руу чиглүүлнэ
    return NextResponse.redirect(url);
  }

  // Хэрэв нэвтэрсэн бол цааш үргэлжлүүлнэ
  return NextResponse.next();
}

// Зөвхөн хамгаалагдсан замууд дээр middleware-г ажиллуулна
export const config = {
  matcher: protectedRoutes,
};
