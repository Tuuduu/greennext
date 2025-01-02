import React from 'react'
import UserTable from '@/components/dashboard/users/UserTable'
// import { useSession } from 'next-auth/react'

export default function page() {

    // const { data: session } = useSession();

    // console.log("session dataa: ", session)

    return (
        <div className='w-full'>
            <UserTable />
        </div>
    )
}
