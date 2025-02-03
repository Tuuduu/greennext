import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/library/nextauth/AuthOptions";
import UserTable from "@/components/dashboard/users/UserTable";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <UserTable />
    </div>
  );
}
