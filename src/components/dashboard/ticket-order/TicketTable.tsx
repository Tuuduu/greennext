import { fetchMtaTicket } from '@/library/mongoDB/data';
import TicketList from './TicketList';

const TicketTable = async () => {

    const ticketData = await fetchMtaTicket();
    const serializedTickets = JSON.parse(JSON.stringify(ticketData));

    return (
        <div className='w-full h-full bg-gray-50'>
            <TicketList ticket={serializedTickets}/>
        </div>
    );
}

export default TicketTable;
