"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Globe, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_FILTER,
  KIND_LABELS,
  MAX_NOTE,
  PROSPECT_KINDS,
  PROSPECT_STATUSES,
  SIZE_LABELS,
  STATUS_LABELS,
  callHref,
  filterProspects,
  prospectWhatsappHref,
  sizeBand,
  tallyStatuses,
  type ProspectFilter,
  type ProspectStatus,
  type ProspectView,
} from "@/lib/institutes/prospects";

const selectClass =
  "h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const linkButton =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-2.5 text-xs font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Today in IST as YYYY-MM-DD, to mark follow-ups that are due. */
function todayIst(): string {
  return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

export default function InstitutesList({ initial }: { initial: ProspectView[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<ProspectFilter>(DEFAULT_FILTER);
  const shown = useMemo(() => filterProspects(rows, filter), [rows, filter]);
  const tally = useMemo(() => tallyStatuses(rows), [rows]);
  const today = todayIst();

  const set = <K extends keyof ProspectFilter>(key: K, value: ProspectFilter[K]) =>
    setFilter((f) => ({ ...f, [key]: value }));

  function onSaved(updated: ProspectView) {
    setRows((rs) => rs.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(["new", "contacted", "interested", "won"] as const).map((s) => (
          <div key={s} className="rounded-xl border bg-card p-3">
            <dt className="text-xs text-muted-foreground">{STATUS_LABELS[s]}</dt>
            <dd className="text-xl font-semibold">{tally[s]}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Filters" className="flex flex-wrap items-end gap-3 rounded-xl border bg-card p-4">
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Kind
          <select className={selectClass} value={filter.kind} onChange={(e) => set("kind", e.target.value as ProspectFilter["kind"])}>
            <option value="ours">JEE / NEET / CET + Board</option>
            {PROSPECT_KINDS.map((k) => (
              <option key={k} value={k}>
                {KIND_LABELS[k]}
              </option>
            ))}
            <option value="all">All</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Status
          <select
            className={selectClass}
            value={filter.status}
            onChange={(e) => set("status", e.target.value as ProspectFilter["status"])}
          >
            <option value="active">Open (not Lost or Not a fit)</option>
            {PROSPECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
            <option value="all">All</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Size
          <select className={selectClass} value={filter.size} onChange={(e) => set("size", e.target.value as ProspectFilter["size"])}>
            <option value="all">All sizes</option>
            {(["small", "medium", "large"] as const).map((s) => (
              <option key={s} value={s}>
                {SIZE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          Sort
          <select className={selectClass} value={filter.sort} onChange={(e) => set("sort", e.target.value as ProspectFilter["sort"])}>
            <option value="small-first">Small first, then nearest</option>
            <option value="distance">Nearest first</option>
            <option value="reviews">Most reviews first</option>
          </select>
        </label>
        <label className="flex h-9 items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            checked={filter.noWebsite}
            onChange={(e) => set("noWebsite", e.target.checked)}
          />
          No website
        </label>
      </section>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {shown.length} of {rows.length}.
      </p>

      <ul className="space-y-3">
        {shown.map((r) => (
          <ProspectCard key={r.id} row={r} today={today} onSaved={onSaved} />
        ))}
      </ul>
    </div>
  );
}

function ProspectCard({ row, today, onSaved }: { row: ProspectView; today: string; onSaved: (r: ProspectView) => void }) {
  const [status, setStatus] = useState<ProspectStatus>(row.status);
  const [note, setNote] = useState(row.note ?? "");
  const [followUp, setFollowUp] = useState(row.follow_up ?? "");
  const [saving, setSaving] = useState(false);
  const dirty = status !== row.status || note !== (row.note ?? "") || followUp !== (row.follow_up ?? "");
  const due = !!row.follow_up && row.follow_up <= today && row.status !== "won" && row.status !== "lost" && row.status !== "not_fit";

  const call = callHref(row.phone);
  const wa = prospectWhatsappHref(row.phone);
  const size = sizeBand(row.reviews);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/institute-prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id, status, note, followUp }),
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        toast.error(body?.error ?? "Could not save.");
        return;
      }
      onSaved({ ...row, status, note: note.trim() || null, follow_up: followUp || null, updated_at: new Date().toISOString() });
      toast.success(`Saved ${row.name.split(/[|,]/)[0].trim()}.`);
    } catch {
      toast.error("Could not save. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  const ids = { status: `st-${row.id}`, follow: `fu-${row.id}`, note: `nt-${row.id}` };
  return (
    <li className="rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="min-w-0 flex-1 break-words text-base font-semibold">{row.name}</h2>
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="rounded-full bg-muted px-2 py-0.5">{KIND_LABELS[row.kind]}</span>
          <span className="rounded-full bg-muted px-2 py-0.5">{SIZE_LABELS[size]}</span>
          {due && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">Follow up due</span>}
        </div>
      </div>

      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden />
          {row.rating ?? "No rating"} ({row.reviews} reviews)
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {row.distance_km} km{row.neighborhood ? `, ${row.neighborhood}` : ""}
        </span>
        {row.category && <span>{row.category}</span>}
      </p>
      {row.address && <p className="mt-1 text-xs text-muted-foreground">{row.address}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {call ? (
          <a href={call} className={linkButton} aria-label={`Call ${row.name}`}>
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {row.phone}
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">No phone on Maps</span>
        )}
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={linkButton} aria-label={`WhatsApp ${row.name}`}>
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            WhatsApp
          </a>
        )}
        {row.website && (
          <a href={row.website} target="_blank" rel="noopener noreferrer" className={linkButton} aria-label={`Website of ${row.name}`}>
            <Globe className="h-3.5 w-3.5" aria-hidden />
            Website
          </a>
        )}
        {row.maps_url && (
          <a href={row.maps_url} target="_blank" rel="noopener noreferrer" className={linkButton} aria-label={`${row.name} on Google Maps`}>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Maps
          </a>
        )}
      </div>

      <div className="mt-3 grid gap-2 border-t pt-3 sm:grid-cols-[auto_auto_1fr_auto] sm:items-end">
        <label htmlFor={ids.status} className="flex flex-col gap-1 text-xs text-muted-foreground">
          Status
          <select id={ids.status} className={selectClass} value={status} disabled={saving} onChange={(e) => setStatus(e.target.value as ProspectStatus)}>
            {PROSPECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={ids.follow} className="flex flex-col gap-1 text-xs text-muted-foreground">
          Follow up on
          <input
            id={ids.follow}
            type="date"
            className={selectClass}
            value={followUp}
            disabled={saving}
            onChange={(e) => setFollowUp(e.target.value)}
          />
        </label>
        <label htmlFor={ids.note} className="flex flex-col gap-1 text-xs text-muted-foreground">
          Note
          <input
            id={ids.note}
            type="text"
            className={selectClass}
            value={note}
            maxLength={MAX_NOTE}
            placeholder="e.g. Spoke to owner, wants a demo"
            disabled={saving}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <Button type="button" size="sm" variant="brand" onClick={save} disabled={saving || !dirty}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </li>
  );
}
