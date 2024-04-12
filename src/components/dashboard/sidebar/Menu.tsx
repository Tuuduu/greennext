"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Menu() {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col items-center mt-8 gap-5">
            <button onClick={() => router.push('/home')} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-4/5">Dashboard</button>
            <button onClick={() => router.push('/home/pages/users')} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-4/5">Хэрэглэгчид</button>
            <button onClick={() => router.push('/home/pages/ticket-order')} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-4/5">Ажлын захиалга</button>
        </div>
    )
}
