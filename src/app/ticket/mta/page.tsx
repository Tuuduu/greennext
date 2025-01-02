import MtaTicket from '@/components/create-ticket/MtaTicket'
import React from 'react'
import timezone from '@/library/moment/moment'

export default function page() {
    return (
        <div className='grid place-items-center h-screen'>
            {timezone()}
            <MtaTicket />
        </div>
    )
}
