"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { setTeacherRequestStatusAction } from "./actions";
import type { TeacherRequest, TeacherRequestStatus } from "@/lib/teacherAccess/service";

const STATUSES: TeacherRequestStatus[] = ["new", "contacted", "provisioned", "declined"];

const STATUS_LABEL: Record<TeacherRequestStatus, string> = {
  new: "New",
  contacted: "Contacted",
  provisioned: "Provisioned",
  declined: "Declined",
};

const STATUS_CLASS: Record<TeacherRequestStatus, string> = {
  new: "bg-brand/10 text-brand-accent border-brand/30",
  contacted: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400",
  provisioned: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-400",
  declined: "bg-muted text-muted-foreground border-input",
};

export default function TeacherRequests({ initial }: { initial: TeacherRequest[] }) {
  const [rows, setRows] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const openCount = rows.filter((r) => r.status === "new").length;

  function onStatus(id: string, status: TeacherRequestStatus) {
    setBusyId(id);
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    startTransition(async () => {
      const res = await setTeacherRequestStatusAction(id, status);
      setBusyId(null);
      if (!res.ok) {
        setRows(prev); // revert
        toast.error(res.error);
      } else {
        toast.success(`Marked ${STATUS_LABEL[status].toLowerCase()}`);
      }
    });
  }

  return (
    <section className="space-y-3">
      <header>
        <h2 className="text-lg font-semibold tracking-tight">
          Teacher access requests
          {openCount > 0 && (
            <span className="ml-2 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-accent">
              {openCount} new
            </span>
          )}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Leads from <code>/request-access</code>. Onboard the org + provision the
          teacher above, then mark the request <em>provisioned</em>.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          No requests yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{r.name}</span>
                    {r.institute && (
                      <span className="text-sm text-muted-foreground">· {r.institute}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {r.email && (
                      <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {r.email}
                      </a>
                    )}
                    {r.mobile && (
                      <a href={`tel:${r.mobile}`} className="inline-flex items-center gap-1 hover:text-foreground">
                        <Phone className="h-3.5 w-3.5" aria-hidden />
                        {r.mobile}
                      </a>
                    )}
                    {r.city && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {r.city}
                      </span>
                    )}
                  </div>
                  {r.message && (
                    <p className="max-w-prose text-sm text-muted-foreground">{r.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[r.status]}`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                  <label className="sr-only" htmlFor={`status-${r.id}`}>
                    Set status for {r.name}
                  </label>
                  <select
                    id={`status-${r.id}`}
                    value={r.status}
                    disabled={pending && busyId === r.id}
                    onChange={(e) => onStatus(r.id, e.target.value as TeacherRequestStatus)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
