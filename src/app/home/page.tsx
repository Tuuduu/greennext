import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TicketsTable from '@/components/dashboard/ticket-order/TicketTable';
import { GetServerSideProps } from 'next';


export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/')
    }


    return (
        <div className='w-full h-screen bg-gray-50 flex flex-col items-center'>
            Dashboard
        </div>
    )
}
