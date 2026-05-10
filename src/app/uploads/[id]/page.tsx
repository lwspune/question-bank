import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, FileSpreadsheet, Inbox } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { Badge } from "@/components/ui/badge";
import { getUploadDetail } from "@/lib/upload/uploadDetail";
import UploadHeaderActions from "./UploadHeaderActions";
import QuestionListItem from "./QuestionListItem";
import PyqMetadataControl from "./PyqMetadataControl";

type PageProps = { params: { id: string } };

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export default async function UploadDetailPage({ params }: PageProps) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/dashboard");

  const supabase = createSupabaseServerClient();
  const result = await getUploadDetail(supabase, params.id, member.orgId);

  if (result.kind === "not_found") notFound();
  if (result.kind === "forbidden") redirect("/dashboard");

  const { job, questions, pyqMetadata } = result;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to dashboard
          </Link>
        </div>

        <header className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-md bg-muted p-2.5">
              <FileSpreadsheet
                className="h-5 w-5 text-muted-foreground"
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {job.filename}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span>{fmtDateTime(job.createdAt)}</span>
                <span aria-hidden>·</span>
                <Badge
                  variant={job.status === "FAILED" ? "destructive" : "secondary"}
                >
                  {STATUS_LABEL[job.status] ?? job.status}
                </Badge>
                <span aria-hidden>·</span>
                <span className="text-emerald-700">+{job.inserted} added</span>
                {job.skipped > 0 && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{job.skipped} skipped</span>
                  </>
                )}
              </p>
            </div>
            <UploadHeaderActions
              jobId={job.id}
              filename={job.filename}
              questionCount={questions.length}
            />
          </div>

          {questions.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <PyqMetadataControl
                jobId={job.id}
                questionCount={questions.length}
                current={pyqMetadata}
              />
            </div>
          )}
        </header>

        {questions.length === 0 ? (
          <EmptyState skipped={job.skipped} />
        ) : (
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {questions.length} question{questions.length === 1 ? "" : "s"}{" "}
              from this upload
            </h2>
            <ul className="divide-y rounded-lg border bg-card">
              {questions.map((q) => (
                <QuestionListItem key={q.id} question={q} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

function EmptyState({ skipped }: { skipped: number }) {
  const reason =
    skipped > 0
      ? `All ${skipped} row${skipped === 1 ? "" : "s"} in this upload matched questions already in the bank, so nothing new was added.`
      : "This upload added no questions.";
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-card px-6 py-12 text-center">
      <Inbox className="h-8 w-8 text-muted-foreground" aria-hidden />
      <p className="max-w-md text-sm text-muted-foreground">{reason}</p>
    </div>
  );
}

function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
