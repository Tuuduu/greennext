'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ContentHeader() {
    // const router = useRouter();
    const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

    // useEffect(() => {
    //     // Зөвхөн router бүрэн бэлэн болсон үед state-г шинэчилнэ
    //     if (router.isReady) {
    //         const slug = (router.query.slug as string) || 'dashboard'; // URL-ийн slug утгыг авах
    //         setActiveTab(slug);
    //     }
    // }, [router.isReady, router.query.slug]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>;
            case 'users':
                return <h2 className="text-xl font-bold text-gray-700">Хэрэглэгчид</h2>;
            case 'tasks':
                return <h2 className="text-xl font-bold text-gray-700">Ажлын захиалга</h2>;
            default:
                return <h2 className="text-xl font-bold text-gray-700">Тохирох зам олдсонгүй!</h2>;
        }
    };

    return (
        <div className="w-full h-auto p-10 bg-gray-50">
            {/* Контентыг харуулах хэсэг */}
            <div className="p-5 bg-white rounded-lg shadow">
                {activeTab ? renderContent() : <h2 className="text-gray-500">Ачаалж байна...</h2>}
            </div>
        </div>
    );
}
