"use client";

import { useState } from "react";
import { Download, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { courseLabel, toClassLeadsCsv, type ClassLead } from "@/lib/classes/interest";
import { formatMobile } from "@/lib/students/roster";
import { whatsappHref } from "@/lib/profile/mobile";

/** "16 Nov", in India time. */
function fmtDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
}

/**
 * The class leads list (migration 0265): tap to call or WhatsApp, tick
 * "Called" (POST /api/admin/class-leads), and download what is on screen as a
 * CSV that keeps every digit of the mobile (lib/classes/interest toClassLeadsCsv).
 */
export default function ClassLeadsTable({ leads }: { leads: ClassLead[] }) {
  const [called, setCalled] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(leads.map((l) => [l.id, l.calledAt]))
  );
  const [busy, setBusy] = useState<string | null>(null);

  async function toggle(id: string, on: boolean) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/class-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, called: on }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Could not save.");
      }
      setCalled((c) => ({ ...c, [id]: on ? new Date().toISOString() : null }));
      toast.success(on ? "Marked as called." : "Marked as not called.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(null);
    }
  }

  function downloadCsv() {
    const csv = toClassLeadsCsv(leads.map((l) => ({ ...l, calledAt: called[l.id] ?? null })));
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `class-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded.");
  }

  if (leads.length === 0) {
    return (
      <section className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        No leads yet. They appear here as soon as someone sends the form on /classes.
      </section>
    );
  }

  return (
    <section className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Leads</h2>
        <Button variant="outline" size="sm" onClick={downloadCsv}>
          <Download className="h-4 w-4" aria-hidden /> CSV
        </Button>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="py-1 pr-3 font-medium">Name</th>
              <th scope="col" className="py-1 pr-3 font-medium">Mobile</th>
              <th scope="col" className="py-1 pr-3 font-medium">City</th>
              <th scope="col" className="py-1 pr-3 font-medium">Courses</th>
              <th scope="col" className="py-1 pr-3 font-medium">Asked</th>
              <th scope="col" className="py-1 font-medium">Called</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => {
              const wa = whatsappHref(l.mobile);
              const done = !!called[l.id];
              return (
                <tr key={l.id} className="border-t align-top">
                  <td className="py-2 pr-3">
                    {l.name ?? <span className="text-muted-foreground">No name</span>}
                    {l.email && <div className="text-xs text-muted-foreground">{l.email}</div>}
                  </td>
                  <td className="whitespace-nowrap py-2 pr-3">
                    <div className="tabular-nums">{formatMobile(l.mobile)}</div>
                    <div className="mt-1 flex gap-3 text-xs">
                      <a
                        href={`tel:+${l.mobile}`}
                        className="inline-flex items-center gap-1 rounded text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Call ${l.name ?? formatMobile(l.mobile)}`}
                      >
                        <Phone className="h-3.5 w-3.5" aria-hidden /> Call
                      </a>
                      {wa && (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`WhatsApp ${l.name ?? formatMobile(l.mobile)}`}
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-2 pr-3">{l.isPune ? <strong>{l.city}</strong> : l.city}</td>
                  <td className="py-2 pr-3">{l.courses.map(courseLabel).join(", ")}</td>
                  <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">{fmtDay(l.createdAt)}</td>
                  <td className="py-2">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={done}
                        disabled={busy === l.id}
                        onChange={(e) => toggle(l.id, e.target.checked)}
                        className="h-4 w-4 rounded border-input accent-[var(--brand)]"
                        aria-label={`Called ${l.name ?? formatMobile(l.mobile)}`}
                      />
                      <span className="text-xs text-muted-foreground">{done ? fmtDay(called[l.id]!) : ""}</span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
