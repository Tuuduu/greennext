"use client"
import { useRouter } from 'next/navigation';

export default function Login() {



  const router = useRouter();
  const buttonStyle2 = "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
  const buttonStyle1 = "focus:outline-none text-white bg-green-700 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"

  return (
    <div className="bg-gray-50 relative w-full h-screen flex items-center justify-center">
      {/* <Image alt="background image" src={BackgroundImage} width={7500} height={4500} quality={100} className="absolute w-full h-screen object-cover" /> */}
      <div className="z-10 absolute top-5 right-5">
        <button type="button" onClick={() => router.push("/login")} className={buttonStyle1}>Админаар нэвтрэх</button>
      </div>
      <div className="z-10 backdrop-blur-md bg-white/80 shadow-lg p-10 rounded-lg border-t-4 border-green-400">
        <h1 className="pb-10 text-center font-bold text-lg text-gray-700">Ажлын захиалга үүсгэх</h1>
        <div className="flex flex-col gap-y-4">
          <button type="button" onClick={() => router.push("/ticket/mta")} className={buttonStyle2}>Мэдээлэл технологийн алба</button>
          <button type="button" onClick={() => router.push("/ticket/ita")} className={buttonStyle2}>Инженер техникийн алба</button>
          <button type="button" onClick={() => router.push("/ticket/ata")} className={buttonStyle2}>Үйл ажиллагааний алба</button>
        </div>
      </div>
    </div>
  );
}


// const handler = () => {
//   getToggle(!toggle)
//   anime({
//     targets: divRef.current,
//     translateX: toggle ? 250 : 0,
//   })
//   console.log("anime js iig duudaj bna.")
// }


// const [toggle, getToggle] = useState(true)

{/* <div ref={divRef} className="flex flex-col gap-y-4"> */ }

// const divRef = useRef(null);