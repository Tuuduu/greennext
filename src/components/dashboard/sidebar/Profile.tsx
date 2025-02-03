"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileImage from "@/picture/profile_av.jpg";
import { Session } from "next-auth";

// 🔹 Custom User төрлийг тодорхойлох
interface CustomUser {
  userId: string;
  firstName?: string;
  workingPart?: string;
  employment?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  department?: string;
}

// 🔹 Custom Session тодорхойлох (Session дотор CustomUser-ийг оруулж өгнө)
interface CustomSession extends Session {
  user: CustomUser;
}

export default function Profile() {
  // 🔹 Custom Session-г ашиглаж TypeScript алдааг арилгах
  const { data: session } = useSession() as { data: CustomSession | null };

  return (
    <div className="w-full flex flex-col items-center p-6">
      {/* Профайл зураг */}
      <div className="border-b border-gray-300 dark:border-gray-700 pb-6 flex flex-col items-center gap-4">
        <div className="w-28 h-28 border-4 border-green-500 shadow-lg rounded-full overflow-hidden">
          <Image
            alt="Profile image"
            src={session?.user?.image || profileImage} // 🔹 Хэрэв profile зураг байхгүй бол default зураг ашиглана
            width={112}
            height={112}
            quality={100}
            priority
            className="object-cover"
          />
        </div>

        {/* Хэрэглэгчийн мэдээлэл */}
        <div className="flex flex-col gap-y-1 items-center text-center">
          <h1 className="uppercase text-xl font-bold text-gray-800 dark:text-white">
            {session?.user?.firstName ??
              session?.user?.name ??
              "Нэр оруулаагүй"}
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {session?.user?.workingPart ?? "Ажил эрхлэлт оруулаагүй"}
          </h2>
          <h3 className="uppercase text-xs text-gray-500 dark:text-gray-400 font-medium">
            {session?.user?.employment ?? "Алба тодорхойгүй"}
          </h3>
        </div>
      </div>
    </div>
  );
}
