"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileImage from "@/picture/profile_av.jpg";
import { Session } from "next-auth";

// 🔹 Custom User төрлийг тодорхойлох
interface CustomUser {
  userId: string;
  firstName: string;
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
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto flex flex-col items-center p-2 sm:p-2 lg:p-4 xl:p-4">
      {/* Профайл зураг */}
      <div className="border-b border-gray-300 dark:border-gray-700 pb-6 flex flex-col items-center gap-4 w-full">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 xl:w-22 xl:h-22 2xl:w-28 2xl:h-28 border-4 border-green-500 shadow-lg rounded-full overflow-hidden transition-transform transform hover:scale-105">
          <Image
            alt="Profile image"
            src={session?.user?.image || profileImage} // 🔹 Хэрэв profile зураг байхгүй бол default зураг ашиглана
            width={144}
            height={144}
            quality={100}
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* Хэрэглэгчийн мэдээлэл */}
        <div className="flex flex-col gap-y-1 items-center text-center w-full">
          <h1 className="uppercase text-sd sm:text-sm md:text-lg  2xl:text-xl font-bold text-gray-800 dark:text-white">
            {session?.user?.firstName ??
              session?.user?.name ??
              "Нэр оруулаагүй"}
          </h1>
          <h2 className="text-[10px] sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md text-gray-600 dark:text-gray-400 font-medium">
            {session?.user?.workingPart ?? "Ажил эрхлэлт оруулаагүй"}
          </h2>
          <h2 className="uppercase text-[8px] sm:text-[10px] md:text-xs lg:text-md xl:text-md 2xl:text-md text-gray-500 dark:text-gray-400 font-medium">
            {session?.user?.employment ?? "Алба тодорхойгүй"}
          </h2>
        </div>
      </div>
    </div>
  );
}
