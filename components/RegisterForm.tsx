"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface FormData {
    username: string;
    email: string;
    password: string;
    password2: string;
}

export default function Login() {

    const router = useRouter()
    const [pending, setPending] = useState(false);
    const [dataResponse, setdataResponse] = useState([]);
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        password2: '',
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data: ", formData);
        if (!formData.username || !formData.email || !formData.password) {
            setMessage("Хэрэглэгчийн мэдээлэл дутуу байна.");
            return;
        }
        try {
            const resUserExists = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData.email)
            });
            const { user } = await resUserExists.json();
            if (user) {
                setPending(false);
                setMessage("Бүртгэлтэй хэрэглэгч байна")
            }
        } catch (error) {

        }

        try {
            setPending(true);
            const res = await fetch('/api/register',
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
                setMessage("Амжилттай бүртгэгдлээ.")
                router.push('/login');
            } else {
                setMessage("Бүртгэлтэй хэрэглэгч байна.")
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



    return (
        <div className='pt-20'>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            User Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={formData.username}
                            onChange={handleChange}
                            name="username"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                            placeholder='user name'
                        />
                    </div>
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            User Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                            type="email"
                            placeholder='mail@greengroup.mn'
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                            type="password"
                            placeholder="*******"
                        />
                    </div>
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={formData.password2}
                            onChange={handleChange}
                            name="password"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                            type="password"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" />
                        <span className="text-sm">
                            .....
                        </span>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <p className='message text-red-600'>{message}</p>
                        <button
                            type="submit"
                            className="shadow bg-yellow-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        >
                            {pending ? "Шалгаж байна." : "Бүртгүүлэх"}
                        </button>
                        <Link className='text-sm mt-3 text-right' href={"/login"}>
                            <span className='underline'>Login</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}



// dispatch(login({
//     name: formData.username,
//     email: formData.email,
//     password: formData.password
// }))