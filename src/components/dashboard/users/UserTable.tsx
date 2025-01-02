import { Pagination } from 'antd'
import React from 'react'
import Search from '../content-header/Search';
import { fetchUser } from '@/library/mongoDB/data'


const UserTable = async () => {

    const users = await fetchUser();

    console.log("dataa: ", users)


    return (
        <div className='w-full h-full px-10 bg-gray-50'>
            <div className='transition duration-150 ease-in-out w-full flex flex-col items-center gap-y-6 p-5 bg-white rounded-lg shadow hover:shadow-lg'>
                <div className='w-full flex justify-start items-start'>
                    <Search placeholder='search for a user...' />
                </div>
                <table className="w-full  border-collapse divide-y divide-white">
                    <thead className='border-b-2 border-gray-200'>
                        <tr className=''>
                            <th className="text-gray-700 px-4 py-2 text-left">Name</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Email</th>
                            {/* <th className="text-gray-700 px-4 py-2 text-left">Created at</th> */}
                            <th className="text-gray-700 px-4 py-2 text-left">Role</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Department</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-200'>
                        {users.map((users: any) => (
                            <tr key={users._id} className="">
                                <td className="px-4 py-5 text-gray-700">{users.username}</td>
                                <td className="px-4 py-5 text-gray-700">{users.email}</td>
                                {/* <td className="px-4 py-5 text-gray-700">{users.createAt}</td> */}
                                <td className="px-4 py-5 text-gray-700">{users.role}</td>
                                <td className="px-4 py-5 text-gray-700">{users.department}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Pagination defaultCurrent={1} total={500} pageSizeOptions={[10, 20]} className='' /> */}
            </div>
        </div>
    )
}

export default UserTable;