'use client'
import { signOut } from 'next-auth/react'

export default function SignoutButton() {


    return (
        <div className="w-full flex flex-col items-center pb-5">
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-white bg-green-600 shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-4/5">Гарах</button>
        </div>
    )
}
