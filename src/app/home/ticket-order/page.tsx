import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TicketsTable from "@/components/ticket-order/TicketTable";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full flex flex-col items-center">
      <TicketsTable />
    </div>
  );
}
