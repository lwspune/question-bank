"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, Download } from "lucide-react";
import type { LeadGroup } from "@/lib/quiz/leads";
import type { LeadWithQuiz } from "@/lib/quiz/leadsAdmin";

function fmtDate(iso: string): string {
  // Stable, locale-independent (avoids hydration drift): YYYY-MM-DD HH:MM.
  return iso.replace("T", " ").slice(0, 16);
}

function toCsv(leads: LeadWithQuiz[]): string {
  const head = ["name", "mobile", "quiz", "score", "best_score", "attempts", "total", "last_seen", "utm_source"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [l.name, l.mobile, l.quizTitle ?? "", l.score, l.best_score, l.attempts, l.total, fmtDate(l.last_attempt_at), l.utm_source ?? ""]
      .map(esc)
      .join(",")
  );
  return [head.join(","), ...rows].join("\n");
}

export default function LeadsBrowser({ people, leads }: { people: LeadGroup[]; leads: LeadWithQuiz[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return people;
    return people.filter((p) => p.name.toLowerCase().includes(needle) || p.mobile.includes(needle));
  }, [people, q]);

  function exportCsv() {
    const blob = new Blob([toCsv(leads)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (people.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No leads yet. Publish a quiz and share its <code className="rounded bg-muted px-1 py-0.5 text-xs">/quiz/&lt;slug&gt;</code> link.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or mobile…"
          className="h-9 flex-1 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Search leads"
        />
        <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
          <Download className="h-4 w-4" /> CSV
        </button>
        <span className="font-mono text-xs text-muted-foreground">
          {filtered.length} of {people.length}
        </span>
      </div>

      {filtered.map((p) => (
        <PersonRow key={p.mobile} person={p} />
      ))}
    </div>
  );
}

function PersonRow({ person }: { person: LeadGroup }) {
  const leads = person.leads as LeadWithQuiz[];
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate font-medium">{person.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {person.mobile} · {person.quizzes} quiz{person.quizzes === 1 ? "" : "zes"} ·{" "}
            {person.totalAttempts} attempt{person.totalAttempts === 1 ? "" : "s"} · best {person.bestScore} · last {fmtDate(person.lastSeen)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`https://wa.me/${person.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
        </div>
      </summary>
      <ul className="space-y-1 border-t px-4 py-3 text-sm">
        {leads.map((l, i) => (
          <li key={i} className="flex items-center justify-between gap-3">
            <span className="min-w-0 truncate text-muted-foreground">{l.quizTitle ?? "—"}</span>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {l.score}/{l.total} · {l.attempts}× · {fmtDate(l.last_attempt_at)}
              {l.utm_source ? ` · ${l.utm_source}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
