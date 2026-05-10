import { redirect } from "next/navigation";
import { getSessionMember, getSessionUser } from "@/lib/auth";

export default async function Home() {
  // Admins → their dashboard. Authed-but-orphaned and anon users → public browse.
  const member = await getSessionMember();
  if (member) redirect("/dashboard");

  const user = await getSessionUser();
  if (user) redirect("/dashboard"); // orphan-user state lives on /dashboard
  redirect("/browse");
}
