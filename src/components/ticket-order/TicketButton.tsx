import React from 'react'

export default function TicketButton(value: any) {

    console.log("data: ",value)
  return (
    <div>
         <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus-green-800">Хадгалах</button>
    </div>
  )
}
