import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import ContentHeader from "@/components/dashboard/content-header/ContentHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-row bg-gradient-to-r from-blue-100 via-gray-50 to-white">
      {/* Sidebar хэсэг */}
      <div className="shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content хэсэг */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* Content Header хэсэг */}
        <div className="sticky top-0 z-10 pt-6 px-6">
          <ContentHeader />
        </div>

        {/* Main Content (Children) */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
