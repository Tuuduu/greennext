"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
    ticketType: string,
    username: string,
    company: string,
    position: string,
    ticketTitle: string,
    description: string,
    phoneNumber: string
}

export default function ItaTicket() {

    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState<FormData>({
        ticketType: '',
        username: '',
        company: '',
        position: '',
        ticketTitle: '',
        description: '',
        phoneNumber: ''
    });

    const ataTicketType = [
        "Цахилгаан", "Бусад"
    ];

    const company = [
        "Грийн Групп", "Грийн ХХК", "Грийн Интернэшнл", "Грийн Фактори", "Грийн Трейд", "Грийн Импекс",
        "Грийн Индастри", "Грийн Дистрбьюшн", "Грийн Прожект", "Грийн Финтек", "Актив Гарден"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data: ", formData);

        try {
            const res = await fetch('/api/ticket/ita',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData),
                });

            if (res.ok) {
                setPending(false);
                const form = e.target as HTMLFormElement;
                form.reset();
                setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
                setFormData({
                    ticketType: '',
                    username: '',
                    company: '',
                    position: '',
                    ticketTitle: '',
                    description: '',
                    phoneNumber: ''
                })
            } else {
                setMessage("Алдаа гарлаа.")
                setPending(false);
            }
        } catch (error) {
            setPending(false)
            console.log(error)
        }
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value === 'ticketType' && name === 'company' ? e.target.value : value
        }));
    };

    return (
        <div className='w-[500px] shadow-lg p-10 rounded-lg border-t-4 border-green-400'>
            <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
                <label className='font-bold text-lg text-center'>ИТА АЖЛЫН ДУУДЛАГА</label>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Дуудлагын төрөл</label>
                    <select value={formData.ticketType} onChange={handleChangeSelector} name="ticketType" id="ticketType" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value={ataTicketType[0]}>{ataTicketType[0]}</option>
                        <option value={ataTicketType[1]}>{ataTicketType[1]}</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Овог, нэр</label>
                    <input value={formData.username} onChange={handleChange} type="text" name="username" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Овог, нэр оруулах" required />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900 ">Ажилладаг компани</label>
                    <select value={formData.company} onChange={handleChangeSelector} name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value={company[0]}>{company[0]}</option>
                        <option value={company[1]}>{company[1]}</option>
                        <option value={company[2]}>{company[2]}</option>
                        <option value={company[3]}>{company[3]}</option>
                        <option value={company[4]}>{company[4]}</option>
                        <option value={company[5]}>{company[5]}</option>
                        <option value={company[6]}>{company[6]}</option>
                        <option value={company[7]}>{company[7]}</option>
                        <option value={company[8]}>{company[8]}</option>
                        <option value={company[9]}>{company[9]}</option>
                        <option value={company[10]}>{company[10]}</option>
                    </select>

                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Албан тушаал</label>
                    <input value={formData.position} onChange={handleChange} type="text" name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Албан тушаал оруулах" required />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Гарчиг</label>
                    <input value={formData.ticketTitle} onChange={handleChange} type="text" name="ticketTitle" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Гарчиг оруулах" required />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Нэмэлт тайлбар</label>
                    <textarea value={formData.description} name="description" id="description" onChange={handleChangeTextArea} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Утасны дугаар</label>
                    <input value={formData.phoneNumber} onChange={handleChange} type="number" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Утасны дугаар оруулах" required />
                </div>


                <div className='w-full flex justify-center'>
                    {message ? <p className={`${message == "Алдаа гарлаа." ? "bg-red-400" : "bg-green-400"} py-1 px-4 rounded-lg shadow-lg text-sm text-gray-50 text-center`}>{message}</p> : ""}
                </div>
                <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus-green-800">ИЛГЭЭХ</button>
            </form>
        </div>
    )
}



// dispatch(login({
//     name: formData.username,
//     email: formData.email,
//     password: formData.password
// }))