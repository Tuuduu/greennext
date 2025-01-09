"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileImage from "@/picture/profile_av.jpg";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Профайл зураг */}
      <div className="border-b border-gray-200 pb-6 flex flex-col items-center gap-4">
        <div className="w-24 h-24 border-4 border-green-500 shadow-lg rounded-full overflow-hidden">
          <Image
            alt="Profile image"
            src={profileImage}
            width={100}
            height={100}
            quality={100}
            priority
            className="object-cover"
          />
        </div>
        {/* Хэрэглэгчийн мэдээлэл */}
        <div className="flex flex-col gap-y-1 items-center text-center">
          <h1 className="uppercase text-lg text-gray-700 font-bold">
            {session?.user?.name || "Хэрэглэгчийн нэр"}
          </h1>
          <h2 className="text-sm text-gray-500 font-medium">
            {session?.user?.email || "Хэрэглэгчийн имэйл"}
          </h2>
          <h3 className="uppercase text-xs text-gray-500 font-medium">
            {session?.user?.department || "Хэлтэс/алба"}
          </h3>
        </div>
      </div>
    </div>
  );
}
