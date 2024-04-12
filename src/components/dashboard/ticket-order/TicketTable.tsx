import { Ticket } from '@/types/ticketorder'; // Adjust the import path as necessary
import { Pagination } from 'antd';

const TicketTable = async () => {

    // try {
    //     const response = await fetch('api/mta-ticket-order');
    //     console.log("Dataa: ", response)
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch data');
    //     }
    //     // Process response
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    //     // Handle error
    // }

    return (
        <div className='w-full h-screen px-10 bg-gray-50'>
            <div className='transition duration-150 ease-in-out w-full flex flex-col items-center gap-y-6 p-5 bg-white rounded-lg shadow hover:shadow-lg'>
                <table className="w-full  border-collapse divide-y divide-white">
                    <thead className='border-b-2 border-gray-200'>
                        <tr className=''>
                            <th className="text-gray-700 px-4 py-2 text-left">№</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Төрөл</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Гарчиг</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Нэр</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Компани</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Албан тушаал</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Үүсгэсэн</th>
                            <th className="text-gray-700 px-4 py-2 text-left">Статус</th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y divide-gray-200'>
                        {/* {tickets.map((ticket) => (
                            <tr key={ticket._id} className="">
                                <td className="px-4 py-5 text-gray-700">{ }</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.ticketType}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.title}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.username}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.company}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.position}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.createdAt}</td>
                                <td className="px-4 py-5 text-gray-700">{ticket.status}</td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
                <Pagination defaultCurrent={1} total={500} pageSizeOptions={[10, 20]} className='' />
            </div>
        </div>
    );
}

export default TicketTable;