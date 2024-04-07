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
    domain: string,
    description: string,
    phoneNumber: string
}

export default function MtaTicket() {

    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState<FormData>({
        ticketType: '',
        username: '',
        company: '',
        position: '',
        ticketTitle: '',
        domain: '',
        description: '',
        phoneNumber: ''
    });

    const ticketType = [
        "Компьютер", "Принтер", "Имэйл", "Сүлжээ", "Камер",
        "Дотоод утас", "Цаг бүртгэл", "WiFi утасгүй сүлжээ", "Бусад"
    ];

    const company = [
        "Грийн Групп", "Грийн ХХК", "Грийн Интернэшнл", "Грийн Фактори", "Грийн Трейд", "Грийн Импекс",
        "Грийн Индастри", "Грийн Дистрбьюшн", "Грийн Прожект", "Грийн Финтек", "Актив Гарден"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data: ", formData);
        try {
            setPending(true);
            const res = await fetch('/api/ticket/mta',
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
                // router.push("/")
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
            [name]: value === 'ticketType' || name === 'company' ? e.target.value : value
        }));
    };

    return (
        <div className='w-[500px] shadow-lg p-10 rounded-lg border-t-4 border-green-400'>
            <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
                <label className='font-bold text-lg text-center'>МТА АЖЛЫН ДУУДЛАГА</label>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Дуудлагын төрөл</label>
                    <select value={formData.ticketType} onChange={handleChangeSelector} name="ticketType" id="ticketType" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value={ticketType[0]}>{ticketType[0]}</option>
                        <option value={ticketType[1]}>{ticketType[1]}</option>
                        <option value={ticketType[2]}>{ticketType[2]}</option>
                        <option value={ticketType[3]}>{ticketType[3]}</option>
                        <option value={ticketType[4]}>{ticketType[4]}</option>
                        <option value={ticketType[5]}>{ticketType[5]}</option>
                        <option value={ticketType[6]}>{ticketType[6]}</option>
                        <option value={ticketType[7]}>{ticketType[7]}</option>
                        <option value={ticketType[8]}>{ticketType[8]}</option>
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
                    <label className="block mb-1 text-sm font-medium text-gray-900">Компьютерын дугаар</label>
                    <input value={formData.domain} onChange={handleChange} type="text" name="domain" id="domain" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="GRN001 гэх мэт" required />
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