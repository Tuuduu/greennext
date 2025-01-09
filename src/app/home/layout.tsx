import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import ContentHeader from "@/components/dashboard/content-header/ContentHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-row bg-gray-50">
      {/* Sidebar хэсэг */}
      <Sidebar />

      {/* Main Content хэсэг */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* Content Header хэсэг */}
        <ContentHeader />

        {/* Main Content (Children) */}
        <div className="flex-1 overflow-auto bg-white shadow-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
