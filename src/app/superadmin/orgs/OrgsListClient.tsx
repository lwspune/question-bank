"use client";

/**
 * Every organisation, each row opening its own page (/superadmin/orgs/[id]),
 * plus the New organisation dialog. Members, rename and delete live on the org
 * page; this list stays a list.
 */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, ChevronRight, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOrgAction } from "../actions";
import type { OrgStat } from "@/lib/superadmin/admin";

function plural(n: number, word: string) {
  return `${n.toLocaleString()} ${word}${n === 1 ? "" : "s"}`;
}

export default function OrgsListClient({ orgs }: { orgs: OrgStat[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Give the organization a name.");
    setBusy(true);
    const res = await createOrgAction(name);
    setBusy(false);
    if (res.ok) {
      toast.success("Organization created. Add its admin next.");
      setName("");
      setOpen(false);
      router.push(`/superadmin/orgs/${res.id}`);
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="brand" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" aria-hidden />
          New organization
        </Button>
      </div>

      <ul className="divide-y rounded-lg border bg-card">
        {orgs.map((o) => (
          <li key={o.id}>
            <Link
              href={`/superadmin/orgs/${o.id}`}
              prefetch={false}
              className="flex items-center gap-3 p-4 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
            >
              <Building2 className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="truncate font-medium">{o.name}</span>
                  {o.adminCount === 0 && (
                    <Badge variant="outline" className="text-[10px] text-amber-700 dark:text-amber-400">
                      No admin
                    </Badge>
                  )}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {plural(o.memberCount, "member")} · {plural(o.adminCount, "admin")} ·{" "}
                  {plural(o.batchCount, "batch")} · {plural(o.paperCount, "paper")} ·{" "}
                  {plural(o.questionCount, "question")}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={(v) => !busy && setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New organization</DialogTitle>
            <DialogDescription>
              Onboard a school as a tenant. Next, add its admin: they manage their own
              branches, teachers, and papers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onCreate} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="org-name">Organization name</Label>
              <Input
                id="org-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. APJ School"
                disabled={busy}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
