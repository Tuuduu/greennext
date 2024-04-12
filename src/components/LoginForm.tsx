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
            router.replace('/home');
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
        <div className='w-[500px] shadow-lg p-10 rounded-lg border-t-4 border-green-400'>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label className='font-bold text-lg text-center'>GREEN GROUP</label>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Хэрэглэгчийн Имэйл</label>
                    <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Нууц үг</label>
                    <input value={formData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 " />
                        </div>
                        <div className="ml-3 mr-2 text-sm">
                            <label className="text-gray-500 dark:text-gray-300">Сануулах</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Нууц үгээ мартсан</a>
                </div>
                <div className='w-full flex justify-center'>
                    {message ? <p className='bg-red-400 py-1 px-4 rounded-lg shadow-lg text-sm text-gray-50 text-center'>{message}</p> : ""}
                </div>
                <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus-green-800">Нэвтрэх</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Та бүртгэлгүй юу? <Link href={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Бүртгүүлэх</Link>
                </p>
            </form>
        </div>
    )
}
