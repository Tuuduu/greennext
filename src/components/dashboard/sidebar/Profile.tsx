"use client"
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import profileImage from '@/picture/profile_av.jpg'

export default function Profile() {

    const { data: session } = useSession();

    return (
        <div className='w-full flex flex-col  items-center p-2'>
            <div className='border-b border-gray-100 pb-5 flex flex-col items-center gap-5'>
                <div className='w-20 h-auto border-4 shadow-md border-white rounded-full overflow-hidden'>
                    <Image
                        alt='profile image'
                        src={profileImage}
                        width={100}
                        height={100}
                        quality={100}
                        priority
                        className='' />
                </div>
                <div className='flex flex-col gap-y-1 pb-2 items-center'>
                    <h1 className='uppercase text-md text-gray-600 font-bold'>{session?.user?.name}</h1>
                    <h1 className='text-sm text-gray-600 font-bold'>{session?.user?.email}</h1>
                    <h1 className='uppercase text-[10px] text-gray-600 font-bold'>{session?.user?.department}</h1>
                </div>
            </div>
        </div>
    )
}
