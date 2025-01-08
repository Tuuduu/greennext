"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai"; // Икон нэмсэн

export default function Login() {
  const router = useRouter();

  const buttonStyle =
    "w-full flex items-center justify-center gap-2 text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 transition-all";

  return (
    <div className="bg-gray-50 relative w-full h-screen flex items-center justify-center">
      {/* Админы нэвтрэх хэсэг */}
      <div className="absolute top-5 right-5">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="focus:outline-none flex gap-x-2 text-white bg-green-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
        >
          нэвтрэх
          <AiOutlineArrowRight size={20} />
        </button>
      </div>

      {/* Үндсэн контент */}
      <div className="z-10 backdrop-blur-md bg-white/90 shadow-lg p-10 rounded-lg border-t-4 border-green-400 w-[350px] sm:w-[450px]">
        {/* Лого хэсэг */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 text-white text-xl px-2 font-bold rounded-2xl w-auto h-auto flex items-center justify-center shadow-lg">
            GREEN OFFICE
          </div>
        </div>

        {/* Захиалга үүсгэх товчлуурууд */}
        <h2 className="pb-6 text-center font-bold text-sm lg:text-lg text-gray-700">
          Ажлын захиалга үүсгэх
        </h2>
        <div className="flex flex-col gap-y-4">
          <button
            type="button"
            onClick={() => router.push("/ticket/mta")}
            className={buttonStyle}
          >
            Мэдээлэл технологийн алба
            <AiOutlineArrowRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => router.push("/ticket/ita")}
            className={buttonStyle}
          >
            Инженер техникийн алба
            <AiOutlineArrowRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => router.push("/ticket/ata")}
            className={buttonStyle}
          >
            Үйл ажиллагааны алба
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
