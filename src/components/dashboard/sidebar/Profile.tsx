"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileImage from "@/picture/profile_av.jpg";
import { Session } from "next-auth";

export default function Profile() {
  const { data: session } = useSession() as { data: Session | null };

  return (
    <div className="w-full flex flex-col items-center p-6">
      {/* Профайл зураг */}
      <div className="border-b border-gray-300 dark:border-gray-700 pb-6 flex flex-col items-center gap-4">
        <div className="w-28 h-28 border-4 border-green-500 shadow-lg rounded-full overflow-hidden">
          <Image
            alt="Profile image"
            src={profileImage}
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
            {session?.user?.firstName ?? "Нэр оруулаагүй"}
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {session?.user?.workingPart ?? "Имэйл оруулаагүй"}
          </h2>
          <h3 className="uppercase text-xs text-gray-500 dark:text-gray-400 font-medium">
            {session?.user?.employment ?? "Алба тодорхойгүй"}
          </h3>
        </div>
      </div>
    </div>
  );
}
