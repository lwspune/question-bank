import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, FileSpreadsheet, Inbox } from "lucide-react";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import Pagination from "@/app/browse/Pagination";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { listUploads, DEFAULT_PAGE_SIZE } from "@/lib/uploads/listUploads";
import type { RecentUpload } from "@/lib/dashboard/activity";

export const metadata = {
  title: "Uploads",
};

type PageProps = {
  searchParams: { page?: string };
};

export default async function UploadsIndexPage({ searchParams }: PageProps) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/dashboard");

  const pageSize = DEFAULT_PAGE_SIZE;
  const requested = Number.parseInt(searchParams.page ?? "1", 10);
  const requestedPage =
    Number.isFinite(requested) && requested > 0 ? requested : 1;

  const supabase = createSupabaseServerClient();
  const { items, total } = await listUploads(supabase, member.orgId, {
    page: requestedPage,
    pageSize,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Uploads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total === 0
              ? "No uploads yet."
              : `${total} upload${total === 1 ? "" : "s"} · ${member.orgName}`}
          </p>
        </header>

        {total === 0 ? (
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Inbox className="h-5 w-5 text-muted-foreground" aria-hidden />
              </div>
              <CardTitle>No uploads yet</CardTitle>
              <CardDescription>
                Once you upload an Excel batch from{" "}
                <Link href="/upload" className="underline">
                  /upload
                </Link>
                , it will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ) : (
          <UploadList items={items} />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={(p) => (p === 1 ? "/uploads" : `/uploads?page=${p}`)}
          />
        )}
      </main>
    </>
  );
}

function UploadList({ items }: { items: RecentUpload[] }) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {items.map((u) => (
        <li key={u.id}>
          <Link
            href={`/uploads/${u.id}`}
            className="group flex items-center gap-4 p-4 transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none"
            aria-label={`Open upload ${u.filename}`}
          >
            <FileSpreadsheet
              className="h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{u.filename}</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-700 dark:text-emerald-400">
                  +{u.inserted} added
                </span>
                {u.skipped > 0 && (
                  <span>
                    {" · "}
                    {u.skipped} skipped
                  </span>
                )}
                {u.status === "FAILED" && (
                  <span className="text-destructive"> · failed</span>
                )}
              </p>
            </div>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {timeAgo(u.createdAt)}
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.round(diffMs / 60_000);
  const hr = Math.round(diffMs / 3_600_000);
  const day = Math.round(diffMs / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (Math.abs(min) < 60) return rtf.format(-min, "minute");
  if (Math.abs(hr) < 24) return rtf.format(-hr, "hour");
  if (Math.abs(day) < 30) return rtf.format(-day, "day");
  const months = Math.round(day / 30);
  return rtf.format(-months, "month");
}
