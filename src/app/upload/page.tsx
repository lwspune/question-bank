import { redirect } from "next/navigation";
import { getSessionMember, getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import UploadForm from "./UploadForm";

export default async function UploadPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  // Adding content is superadmin-only (migration 0056).
  if (!(await getSessionSuperadmin())) redirect("/dashboard");

  const supabase = createSupabaseServerClient();
  const { data: exams } = await supabase
    .from("exams")
    .select("id, name")
    .order("name");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Upload questions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add questions to your bank from an Excel file.
          </p>
        </header>
        <UploadForm exams={exams ?? []} />
      </main>
    </>
  );
}
