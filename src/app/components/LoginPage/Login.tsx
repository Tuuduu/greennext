import React from 'react'
import { useEffect, useState } from 'react'

interface FormData {
    email: string;
    password: string;
}

export default function Login() {

    const [dataResponse, setdataResponse] = useState([]);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    useEffect(() => {
        async function getPageData() {
            const apiUrlEndpoint = 'http://localhost:3000/api/user';
            const response = await fetch(apiUrlEndpoint);
            const res = await response.json();
            console.log("dataaaa: ", res);
            setdataResponse(res[0].user_name);
        }
        getPageData();
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form dataaa: ", formData)
    }



    return (
        <div className=''>
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
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" id="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-password"
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
                    <div className="md:w-2/3">
                        <button
                            type="submit"
                            className="shadow bg-yellow-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        >
                            нэвтрэх
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
