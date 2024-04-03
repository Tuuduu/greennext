"use client"
import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
    email: string;
    password: string;
}


export default function LoginForm() {

    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data: ", formData);
        if (!formData.email || !formData.password) {
            setMessage("Хэрэглэгчийн мэдээлэл дутуу байна.");
        };
        try {
            const res = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false
            });
            if (res?.error) {
                setMessage("Имэйл эсвэл нууц үг буруу байна.")
                return;
            }
            router.replace('/dashboard');
        } catch (error) {
            console.log(error);
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
        <div className='grid place-items-center h-screen'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-gray-600'>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" id="inline-full-name">
                                User mail
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                required
                                name="email"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="email"
                                placeholder='mail@greengroup.mn'
                            />
                        </div>

                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                value={formData.password}
                                onChange={handleChange}
                                required
                                name="password"
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                                type="password"
                                placeholder="*******"
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3"></div>
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                Сануулах
                            </span>
                        </label>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3 flex flex-col">
                            <p className='message text-red-600'>{message}</p>
                            <button
                                type="submit"
                                className="shadow bg-yellow-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                {pending ? "Шалгаж байна." : "Нэвтрэх"}
                            </button>
                            <Link className='text-sm mt-3 text-right' href={"/register"}>
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
