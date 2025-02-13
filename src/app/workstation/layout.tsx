import Sidebar from "@/components/workstation/sidebar/Sidebar";
import ContentHeader from "@/components/workstation/content-header/ContentHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-row bg-gradient-to-r from-blue-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar хэсэг */}
      <div className="shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content хэсэг */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* Content Header хэсэг */}
        <div className="sticky top-0 z-10 pt-4 2xl:pt-6 px-6">
          <ContentHeader />
        </div>

        {/* Main Content (Children) */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
