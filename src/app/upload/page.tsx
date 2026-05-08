import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UploadForm from "./UploadForm";

export default async function UploadPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/dashboard");

  const supabase = createSupabaseServerClient();
  const { data: exams } = await supabase
    .from("exams")
    .select("id, name")
    .order("name");

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Upload questions</h1>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
          ← Dashboard
        </Link>
      </div>
      <UploadForm exams={exams ?? []} />
    </main>
  );
}
