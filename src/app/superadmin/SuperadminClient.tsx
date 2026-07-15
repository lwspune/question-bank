"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Loader2, Plus, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOrgAction, createOrgMemberAction } from "./actions";
import type { OrgStat } from "@/lib/superadmin/admin";
import type { MemberRole } from "@/lib/members/admin";

const MIN_PW = 8;

export default function SuperadminClient({ initialOrgs }: { initialOrgs: OrgStat[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const [newOrgOpen, setNewOrgOpen] = useState(false);
  const [orgName, setOrgName] = useState("");

  // add-member dialog (targets a specific org)
  const [memberFor, setMemberFor] = useState<OrgStat | null>(null);
  const [mName, setMName] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPassword, setMPassword] = useState("");
  const [mRole, setMRole] = useState<MemberRole>("ADMIN");

  async function onCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!orgName.trim()) return toast.error("Give the organization a name.");
    setBusy(true);
    const res = await createOrgAction(orgName);
    setBusy(false);
    if (res.ok) {
      toast.success("Organization created");
      setOrgName("");
      setNewOrgOpen(false);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  function openAddMember(org: OrgStat) {
    setMemberFor(org);
    setMName("");
    setMEmail("");
    setMPassword("");
    setMRole("ADMIN");
  }

  async function onCreateMember(e: React.FormEvent) {
    e.preventDefault();
    if (!memberFor) return;
    if (!mName.trim() || !mEmail.trim() || mPassword.length < MIN_PW) {
      return toast.error(`Name, email and a ${MIN_PW}+ char password are required.`);
    }
    setBusy(true);
    const res = await createOrgMemberAction({
      orgId: memberFor.id,
      name: mName.trim(),
      email: mEmail.trim(),
      password: mPassword,
      role: mRole,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(
        `${mRole === "ADMIN" ? "Admin" : "Teacher"} created for ${memberFor.name}. Share the password with ${mEmail.trim()}.`
      );
      setMemberFor(null);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="brand" onClick={() => setNewOrgOpen(true)}>
          <Plus className="h-4 w-4" aria-hidden />
          New organization
        </Button>
      </div>

      <ul className="divide-y rounded-lg border bg-card">
        {initialOrgs.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-3 p-4">
            <Building2 className="h-5 w-5 text-muted-foreground" aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-medium">{o.name}</span>
                {o.adminCount === 0 && (
                  <Badge variant="outline" className="text-[10px] text-amber-700 dark:text-amber-400">
                    No admin yet
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {o.memberCount} member{o.memberCount === 1 ? "" : "s"}
                {o.adminCount > 0 && (
                  <>
                    {" "}
                    · {o.adminCount} admin{o.adminCount === 1 ? "" : "s"}
                  </>
                )}{" "}
                · {o.questionCount.toLocaleString()} question
                {o.questionCount === 1 ? "" : "s"}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => openAddMember(o)} disabled={busy}>
              <UserPlus className="mr-1 h-3.5 w-3.5" aria-hidden />
              Add admin / teacher
            </Button>
          </li>
        ))}
      </ul>

      {/* New org */}
      <Dialog open={newOrgOpen} onOpenChange={(v) => !busy && setNewOrgOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New organization</DialogTitle>
            <DialogDescription>
              Onboard a school as a tenant. Next, add its admin — they&apos;ll manage
              their own branches, teachers, and papers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onCreateOrg} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="org-name">Organization name</Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. APJ School"
                disabled={busy}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNewOrgOpen(false)} disabled={busy}>
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

      {/* Add member to org */}
      <Dialog open={!!memberFor} onOpenChange={(v) => !v && setMemberFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Add member to {memberFor?.name}
            </DialogTitle>
            <DialogDescription>
              Create an account for this org. An admin manages the org; a teacher
              builds papers for assigned branches. Share the password with them.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onCreateMember} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="mem-name">Name</Label>
              <Input id="mem-name" value={mName} onChange={(e) => setMName(e.target.value)} disabled={busy} autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mem-email">Email (login)</Label>
              <Input id="mem-email" type="email" value={mEmail} onChange={(e) => setMEmail(e.target.value)} disabled={busy} autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mem-pw">Password (min {MIN_PW} chars)</Label>
              <Input id="mem-pw" type="text" value={mPassword} onChange={(e) => setMPassword(e.target.value)} disabled={busy} autoComplete="new-password" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mem-role">Role</Label>
              <Select value={mRole} onValueChange={(v) => setMRole(v as MemberRole)} disabled={busy}>
                <SelectTrigger id="mem-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin — manages the org</SelectItem>
                  <SelectItem value="TEACHER">Teacher — builds papers for branches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setMemberFor(null)} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                Create member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
