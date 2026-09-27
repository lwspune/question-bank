"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, Gem, Loader2 } from "lucide-react";
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
import { SCOPE_ALL } from "@/lib/entitlements/access";
import {
  COMP_SCOPE_OPTIONS,
  canRevokeFromProfile,
  compExpiryIso,
  type ActiveGrant,
} from "@/lib/entitlements/compGrant";

const fieldClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function scopeLabel(scope: string): string {
  return COMP_SCOPE_OPTIONS.find((o) => o.value === scope)?.label ?? scope;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Grant / revoke free premium from a student's profile. Writes through the
 * existing superadmin-only /api/admin/entitlements route (source = comp), then
 * re-renders the dynamic page so the Premium field reflects the change.
 */
export default function PremiumControl({
  email,
  name,
  grants,
}: {
  email: string;
  name: string;
  grants: ActiveGrant[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [grantOpen, setGrantOpen] = useState(false);
  const [toRevoke, setToRevoke] = useState<ActiveGrant | null>(null);

  const [scope, setScope] = useState(SCOPE_ALL);
  const [expiry, setExpiry] = useState("");
  const [note, setNote] = useState("");

  async function onGrant(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await callApi({
      action: "grant",
      email,
      scope,
      expiresAt: compExpiryIso(expiry),
      note: note.trim() || null,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`${scopeLabel(scope)} granted to ${name}.`);
      setGrantOpen(false);
      setScope(SCOPE_ALL);
      setExpiry("");
      setNote("");
      router.refresh();
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
      toast.success(`Access revoked for ${name}.`);
      setToRevoke(null);
      router.refresh();
    } else {
      toast.error(res.error || "Revoke failed");
    }
  }

  const selected = COMP_SCOPE_OPTIONS.find((o) => o.value === scope);

  return (
    <div className="mt-4 space-y-3 border-t pt-4">
      {grants.length > 0 && (
        <ul className="space-y-2">
          {grants.map((g) => (
            <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>
                <span className="font-medium">{scopeLabel(g.scope)}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {g.source} · {g.expiresAt ? `until ${fmtDate(g.expiresAt)}` : "no expiry"}
                </span>
              </span>
              {canRevokeFromProfile(g) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setToRevoke(g)}
                  disabled={busy}
                  aria-label={`Revoke ${scopeLabel(g.scope)} for ${name}`}
                >
                  <Ban className="mr-1.5 h-4 w-4" aria-hidden />
                  Revoke
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      <Button size="sm" variant="brand" onClick={() => setGrantOpen(true)} disabled={busy}>
        <Gem className="mr-1.5 h-4 w-4" aria-hidden />
        {grants.length > 0 ? "Grant more access" : "Grant free premium"}
      </Button>

      <Dialog open={grantOpen} onOpenChange={(v) => !busy && setGrantOpen(v)}>
        <DialogContent>
          <form onSubmit={onGrant} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Grant free premium</DialogTitle>
              <DialogDescription>
                {name} ({email}) gets access without paying. You can revoke it here at any time.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <Label htmlFor="pc-scope">Access</Label>
              <select
                id="pc-scope"
                className={fieldClass}
                value={scope}
                onChange={(ev) => setScope(ev.target.value)}
                disabled={busy}
                aria-describedby="pc-scope-help"
              >
                {COMP_SCOPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <p id="pc-scope-help" className="text-xs text-muted-foreground">
                {selected?.help}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pc-expiry">Expires (optional)</Label>
              <Input
                id="pc-expiry"
                type="date"
                value={expiry}
                onChange={(ev) => setExpiry(ev.target.value)}
                disabled={busy}
                aria-describedby="pc-expiry-help"
              />
              <p id="pc-expiry-help" className="text-xs text-muted-foreground">
                Blank = no expiry (until you revoke).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pc-note">Note (optional)</Label>
              <Input
                id="pc-note"
                placeholder="e.g. Batch 2026 scholarship"
                value={note}
                onChange={(ev) => setNote(ev.target.value)}
                disabled={busy}
                maxLength={200}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setGrantOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy}>
                {busy && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden />}
                Grant access
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!toRevoke} onOpenChange={(v) => !v && !busy && setToRevoke(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke access?</DialogTitle>
            <DialogDescription>
              {toRevoke
                ? `${name} loses ${scopeLabel(toRevoke.scope)} straight away.`
                : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToRevoke(null)} disabled={busy}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onRevoke} disabled={busy}>
              {busy && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden />}
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function callApi(body: unknown): Promise<{ ok?: boolean; error?: string }> {
  try {
    const res = await fetch("/api/admin/entitlements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as { ok?: boolean; error?: string };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
