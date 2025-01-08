"use client";
import moment from 'moment';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react';
import TicketButton from './TicketButton';

interface TicketData {
    id: string;
    status: string;
    [key: string]: any; // Хэрэв нэмэлт талбарууд байвал
}

interface FormData {
    status: string;
}

export default function TicketChangeStatus(ticketData: TicketData) {

    const { data: session } = useSession();
    const dataId = ticketData.value.ticketData._id
    const date = moment();
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState<FormData>({
        status: 'Шинэ',
    });

    const status = ["Шинэ", "Хаасан", "Хүлээгдэж буй", "Хоошлуулсан"];

    const handleChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setMessage(""); // Clear previous messages

        try {
            const res = await fetch('/api/mta-ticket-order/ticket-config/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: dataId,
                    updates: {
                        status: formData.status,
                        updatedDate: date,
                        modifierUserName: session?.user.name,
                        modifierUserId: session?.user.userId,
                    },
                }),
            });

            if (res.ok) {
                setMessage("Ажлын захиалга амжилттай бүртгэгдлээ.");
            } else {
                setMessage("Алдаа гарлаа. Та дахин оролдоно уу.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Сүлжээний алдаа гарлаа.");
        } finally {
            setPending(false);
        }
    };

    return (
        <div>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <select
                    value={formData.status}
                    onChange={handleChangeSelector}
                    name="status"
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    {status.map((s, index) => (
                        <option key={index} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <TicketButton value={formData} />
            </form>
        </div>
    );
}
