"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Ban, Infinity as InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCOPE_ALL } from "@/lib/entitlements/access";
import type { EntitlementAdminRow } from "@/lib/entitlements/admin";

type Props = {
  initialRows: EntitlementAdminRow[];
  loadError: string | null;
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isActive(row: EntitlementAdminRow): boolean {
  if (row.status !== "active") return false;
  if (!row.expiresAt) return true;
  return new Date(row.expiresAt).getTime() > Date.now();
}

export default function EntitlementsClient({ initialRows, loadError }: Props) {
  const [rows, setRows] = useState<EntitlementAdminRow[]>(initialRows);
  const [busy, setBusy] = useState(false);

  // Grant form
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState(SCOPE_ALL);
  const [expiry, setExpiry] = useState(""); // yyyy-mm-dd or ""
  const [note, setNote] = useState("");

  const [toRevoke, setToRevoke] = useState<EntitlementAdminRow | null>(null);

  async function refresh() {
    const res = await callApi({ action: "list" });
    if (res.ok && Array.isArray(res.rows)) setRows(res.rows);
  }

  async function onGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    setBusy(true);
    // Turn a yyyy-mm-dd into end-of-day UTC ISO so the grant covers the chosen day.
    const expiresAt = expiry ? new Date(`${expiry}T23:59:59Z`).toISOString() : null;
    const res = await callApi({
      action: "grant",
      email: email.trim(),
      scope: scope.trim() || SCOPE_ALL,
      expiresAt,
      note: note.trim() || null,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`Access granted to ${email.trim()}.`);
      setEmail("");
      setScope(SCOPE_ALL);
      setExpiry("");
      setNote("");
      await refresh();
    } else {
      toast.error(res.error || "Failed to grant access");
    }
  }

  async function onRevoke() {
    if (!toRevoke) return;
    setBusy(true);
    const res = await callApi({ action: "revoke", id: toRevoke.id });
    setBusy(false);
    if (res.ok) {
      toast.success(`Access revoked for ${toRevoke.email}.`);
      setToRevoke(null);
      await refresh();
    } else {
      toast.error(res.error || "Revoke failed");
    }
  }

  return (
    <div className="space-y-6">
      {loadError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
        >
          Couldn&apos;t load grants: {loadError}. The form still works; the list
          refreshes after you grant access.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Grant access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onGrant} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="e-email">Student email</Label>
              <Input
                id="e-email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={busy}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-scope">Scope</Label>
              <Input
                id="e-scope"
                value={scope}
                onChange={(ev) => setScope(ev.target.value)}
                disabled={busy}
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">
                <code>all</code> = full premium. Leave as-is unless granting a
                single item.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-expiry">Expires (optional)</Label>
              <Input
                id="e-expiry"
                type="date"
                value={expiry}
                onChange={(ev) => setExpiry(ev.target.value)}
                disabled={busy}
              />
              <p className="text-xs text-muted-foreground">
                Blank = no expiry (until you revoke).
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-note">Note (optional)</Label>
              <Input
                id="e-note"
                placeholder="e.g. Batch 2026 scholarship"
                value={note}
                onChange={(ev) => setNote(ev.target.value)}
                disabled={busy}
                autoComplete="off"
              />
            </div>
            <div className="sm:col-span-2 sm:justify-self-end">
              <Button type="submit" disabled={busy}>
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                Grant access
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grants ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="p-6 text-sm italic text-muted-foreground">
              No access grants yet — grant one above.
            </p>
          ) : (
            <ul className="divide-y">
              {rows.map((r) => {
                const active = isActive(r);
                return (
                  <li key={r.id} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 truncate font-medium">
                        {r.email}
                        {active ? (
                          <Badge className="gap-1 bg-primary text-[10px] text-primary-foreground">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] capitalize">
                            {r.status === "active" ? "expired" : r.status}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {r.source}
                        </Badge>
                        {r.scope !== SCOPE_ALL && (
                          <Badge variant="outline" className="text-[10px]">
                            {r.scope}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          {r.expiresAt ? (
                            `Expires ${formatDate(r.expiresAt)}`
                          ) : (
                            <>
                              <InfinityIcon className="h-3 w-3" aria-hidden /> No
                              expiry
                            </>
                          )}
                        </span>
                        <span>Granted {formatDate(r.grantedAt)}</span>
                        {r.note && <span className="italic">“{r.note}”</span>}
                      </div>
                    </div>
                    {active && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setToRevoke(r)}
                        disabled={busy}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Ban className="mr-1 h-3.5 w-3.5" aria-hidden />
                        Revoke
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!toRevoke} onOpenChange={(v) => !v && setToRevoke(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke access?</DialogTitle>
            <DialogDescription>
              {toRevoke ? (
                <>
                  <span className="font-medium text-foreground">
                    {toRevoke.email}
                  </span>{" "}
                  will immediately lose premium access. The grant is kept for
                  audit (marked revoked), not deleted. You can grant again later.
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToRevoke(null)} disabled={busy}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onRevoke} disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function callApi(
  body: unknown
): Promise<{ ok?: boolean; error?: string; rows?: EntitlementAdminRow[] }> {
  try {
    const res = await fetch("/api/admin/entitlements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as {
      ok?: boolean;
      error?: string;
      rows?: EntitlementAdminRow[];
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
