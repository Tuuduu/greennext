import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import ContentHeader from "@/components/dashboard/content-header/ContentHeader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className={'w-full h-screen flex flex-row'}>
            <Sidebar />
            <div className="w-full flex flex-col">
                <ContentHeader />
                {children}
            </div>
        </div>

    );
}