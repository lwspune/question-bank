"use client";

/**
 * Add an admin or teacher to one org (superadmin). Moved out of the old
 * /superadmin org list on 2026-10-06 when each org got its own page.
 *
 * An email that already has a login is LINKED, never given a new password
 * (createMember, linkExistingAccount); the toast then says not to share the
 * password typed here, because it was not set.
 */
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
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
import { createOrgMemberAction } from "../actions";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/credentials";
import type { MemberRole } from "@/lib/members/admin";

export default function AddMemberDialog({
  org,
  open,
  onOpenChange,
  onAdded,
}: {
  org: { id: string; name: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<MemberRole>("ADMIN");

  function reset() {
    setName("");
    setEmail("");
    setPassword("");
    setRole("ADMIN");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < MIN_PASSWORD_LENGTH) {
      return toast.error(`Name, email and a ${MIN_PASSWORD_LENGTH}+ character password are required.`);
    }
    setBusy(true);
    const res = await createOrgMemberAction({
      orgId: org.id,
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    const who = role === "ADMIN" ? "admin" : "teacher";
    toast.success(
      res.linked
        ? `${email.trim()} already had a login. Made ${who} of ${org.name}; their own password is unchanged, so don't share the one typed here.`
        : `${who === "admin" ? "Admin" : "Teacher"} created for ${org.name}. Share the password with ${email.trim()}.`
    );
    reset();
    onOpenChange(false);
    onAdded();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Add member to {org.name}
          </DialogTitle>
          <DialogDescription>
            An admin manages the org; a teacher builds papers for assigned branches.
            Share the password with them. If the email already has a login, it is
            added as it is and keeps its own password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="mem-name">Name</Label>
            <Input id="mem-name" value={name} onChange={(e) => setName(e.target.value)} disabled={busy} autoComplete="off" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mem-email">Email (login)</Label>
            <Input id="mem-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} autoComplete="off" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mem-pw">Password (min {MIN_PASSWORD_LENGTH} characters)</Label>
            <Input id="mem-pw" type="text" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} autoComplete="new-password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mem-role">Role</Label>
            <select
              id="mem-role"
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
              disabled={busy}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="ADMIN">Admin: manages the org</option>
              <option value="TEACHER">Teacher: builds papers for branches</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
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
  );
}
