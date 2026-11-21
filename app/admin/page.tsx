import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminToken } from "@/lib/server/admin-auth";
import AdminDashboard from "./dashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dala Festival Admin" };
export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return <AdminDashboard />;
}
