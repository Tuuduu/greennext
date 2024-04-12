"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: string;
    role: string;
    department: string;
}

export default function Login() {

    const router = useRouter()
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
        role: 'manager',
        department: 'Мэдээлэл технологийн алба'
    });

    const formRole = [
        'manager',
        'admin',
    ];

    const formDepartment = [
        'Мэдээлэл технологийн алба',
        'Инженер техникийн алба',
        'Үйл ажиллагааны алба',
    ]


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form data: ", formData);
        if (formData.password != formData.confirmPassword) {
            setMessage("Нууц үг таарахгүй байна.");
        } else {
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
                } else {

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
                    setMessage("Амжилттай бүртгэгдлээ.");
                    alert("Амжилттай бүртгэгдлээ");
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
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            [name]: value === 'role' && name === 'department' ? e.target.value : value
        }));
    };


    return (
        <div className='w-[500px] shadow-lg p-10 rounded-lg border-t-4 border-green-400'>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label className='font-bold text-lg text-center'>GREEN GROUP</label>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Хэрэглэгчийн нэр</label>
                    <input value={formData.username} onChange={handleChange} type="name" name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Хэрэглэгчийн нэр" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Хэрэглэгчийн Имэйл</label>
                    <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Чиг үүрэг</label>
                    <select value={formData.role} onChange={handleChangeSelector} name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value={formRole[0]}>{formRole[0]}</option>
                        <option value={formRole[1]}>{formRole[1]}</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Компани</label>
                    <select value={formData.department} onChange={handleChangeSelector} name="department" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400  focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value={formDepartment[0]}>{formDepartment[0]}</option>
                        <option value={formDepartment[1]}>{formDepartment[1]}</option>
                        <option value={formDepartment[2]}>{formDepartment[2]}</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Нууц үг</label>
                    <input value={formData.password} onChange={handleChange} type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Нууц үгээ баталгаажуулна уу</label>
                    <input value={formData.confirmPassword} onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className='w-full flex justify-center'>
                    {message ? <p className='bg-red-400 py-1 px-4 rounded-lg shadow-lg text-sm text-gray-50 text-center'>{message}</p> : ""}
                </div>
                <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus-green-800">Бүртгүүлэх</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Та бүртгэлтэй юу? <Link href={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Нэвтрэх</Link>
                </p>
            </form>
        </div>
    )
}



// dispatch(login({
//     name: formData.username,
//     email: formData.email,
//     password: formData.password
// }))