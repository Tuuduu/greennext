"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function UserInfo() {

    const router = useRouter();
    const { data: session, } = useSession();
    console.log("session dataa: ", session)

    const handler = () => {
        signOut();
        router.push("/");
    }

    return (
        <div className='grid place-items-center h-screen'>
            <div className='flex flex-col gap-y-3'>
                <div>User name: <span className='font-bold'>{session?.user?.name}</span></div>
                <div>Email: <span className='font-bold'>{session?.user?.email}</span></div>
                <div>Role: <span className='font-bold'>{ }</span></div>
                <div>Department: <span className='font-bold'>{ }</span></div>
                <button onClick={() => handler()} className='bg-red-500 text-gray-200 font-bold px-6 py-2 mt-3'>Log Out</button>
            </div>
        </div>
    )
}
