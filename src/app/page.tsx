"use client"
import Image from "next/image";
import BackgroundImage from "@/picture/LoginPage/Greengroup.jpg"
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function Login() {

  const [toggle, getToggle] = useState(true)
  const router = useRouter();
  const buttonStyle2 = "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
  const buttonStyle1 = "focus:outline-none text-white bg-green-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Image alt="background image" src={BackgroundImage} width={7500} height={4500} quality={100} className="absolute w-full h-screen object-cover" />
      <div className="z-10 w-full h-full bg-white flex flex-col gap-y-10 justify-center items-center rounded-lg shadow-2xl bg-opacity-100">
        <div className="flex flex-col gap-y-4">
          <button type="button" className={buttonStyle2}>Мэдээлэл технологийн алба</button>
          <button type="button" className={buttonStyle2}>Инженер техникийн алба</button>
          <button type="button" className={buttonStyle2}>Үйл ажиллагааний алба</button>
        </div>
        <div>
          <button type="button" onClick={() => router.push("/login")} className={buttonStyle1}>Админаар нэвтрэх</button>
        </div>
      </div>
    </div>
  );
}
