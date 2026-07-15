"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  KeyRound,
  Loader2,
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MIN_PASSWORD_LENGTH, type MemberRole, type MemberRow } from "@/lib/members/admin";

type BranchOption = { id: string; name: string };

type Props = {
  orgName: string;
  callerUserId: string;
  initialMembers: MemberRow[];
  branches: BranchOption[];
  loadError: string | null;
};

type DialogState =
  | { kind: "none" }
  | { kind: "reset"; member: MemberRow; password: string }
  | { kind: "remove"; member: MemberRow }
  | { kind: "branches"; member: MemberRow; selected: string[] };

export default function MembersClient({
  orgName: _orgName,
  callerUserId,
  initialMembers,
  branches,
  loadError,
}: Props) {
  const [members, setMembers] = useState<MemberRow[]>(initialMembers);
  const [busy, setBusy] = useState(false);
  const branchName = (id: string) => branches.find((b) => b.id === id)?.name ?? "—";

  // Add-member form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<MemberRole>("TEACHER");

  const [dialog, setDialog] = useState<DialogState>({ kind: "none" });

  async function refresh() {
    const res = await callMembers({ action: "list" });
    if (res.ok && Array.isArray(res.members)) setMembers(res.members);
  }

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || password.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Name, email and a password of ${MIN_PASSWORD_LENGTH}+ chars are required`);
      return;
    }
    setBusy(true);
    const res = await callMembers({
      action: "create",
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(
        `${role === "ADMIN" ? "Admin" : "Teacher"} created. Share the password with ${email.trim()}.`
      );
      setName("");
      setEmail("");
      setPassword("");
      setRole("TEACHER");
      await refresh();
    } else {
      toast.error(res.error || "Failed to create member");
    }
  }

  async function onReset() {
    if (dialog.kind !== "reset") return;
    if (dialog.password.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }
    setBusy(true);
    const res = await callMembers({
      action: "reset",
      userId: dialog.member.userId,
      newPassword: dialog.password,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`Password reset. Share the new password with ${dialog.member.email}.`);
      setDialog({ kind: "none" });
    } else {
      toast.error(res.error || "Reset failed");
    }
  }

  async function onRemove() {
    if (dialog.kind !== "remove") return;
    setBusy(true);
    const res = await callMembers({
      action: "remove",
      userId: dialog.member.userId,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`${dialog.member.name ?? dialog.member.email} removed from this org`);
      setDialog({ kind: "none" });
      await refresh();
    } else {
      toast.error(res.error || "Remove failed");
    }
  }

  async function onChangeRole(member: MemberRow, newRole: MemberRole) {
    if (newRole === member.role) return;
    setBusy(true);
    const res = await callMembers({
      action: "update_role",
      userId: member.userId,
      role: newRole,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`${member.name ?? member.email} is now ${newRole}`);
      await refresh();
    } else {
      toast.error(res.error || "Role update failed");
    }
  }

  async function onSaveBranches() {
    if (dialog.kind !== "branches") return;
    setBusy(true);
    const res = await callMembers({
      action: "set_branches",
      userId: dialog.member.userId,
      branchIds: dialog.selected,
    });
    setBusy(false);
    if (res.ok) {
      toast.success(`Branches updated for ${dialog.member.name ?? dialog.member.email}`);
      setDialog({ kind: "none" });
      await refresh();
    } else {
      toast.error(res.error || "Couldn't update branches");
    }
  }

  return (
    <div className="space-y-6">
      {loadError && (
        <div
          role="alert"
          className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
        >
          Couldn&apos;t load members: {loadError}. The form still works; the
          list will refresh after you add or change a member.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="h-4 w-4" aria-hidden />
            Add a member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAdd} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="m-name">Name</Label>
              <Input
                id="m-name"
                placeholder="e.g. Navneet Sir"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={busy}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="m-email">Email (login username)</Label>
              <Input
                id="m-email"
                type="email"
                placeholder="teacher@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="m-password">
                Password (min {MIN_PASSWORD_LENGTH} chars)
              </Label>
              <Input
                id="m-password"
                type="text"
                placeholder="Share this with the member"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={busy}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="m-role">Role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as MemberRole)}
                disabled={busy}
              >
                <SelectTrigger id="m-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEACHER">
                    Teacher — builds papers for assigned branches
                  </SelectItem>
                  <SelectItem value="ADMIN">
                    Admin — manages the org (branches, members, papers)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 sm:justify-self-end">
              <Button type="submit" disabled={busy}>
                {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                Add member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Members ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {members.length === 0 ? (
            <p className="p-6 text-sm italic text-muted-foreground">
              No members yet — add one above.
            </p>
          ) : (
            <ul className="divide-y">
              {members.map((m) => {
                const isSelf = m.userId === callerUserId;
                return (
                  <li key={m.userId} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 truncate font-medium">
                        {m.name ?? <span className="italic text-muted-foreground">No name</span>}
                        {isSelf && (
                          <Badge variant="secondary" className="text-[10px]">
                            You
                          </Badge>
                        )}
                        {m.role === "ADMIN" && (
                          <Badge className="gap-1 bg-primary text-[10px] text-primary-foreground">
                            <ShieldCheck className="h-3 w-3" aria-hidden />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {m.email}
                      </div>
                      {m.role === "TEACHER" && (
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          {m.branchIds.length === 0 ? (
                            <span className="text-xs italic text-muted-foreground">
                              No branches assigned
                            </span>
                          ) : (
                            m.branchIds.map((id) => (
                              <Badge key={id} variant="secondary" className="text-[10px]">
                                {branchName(id)}
                              </Badge>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    {m.role === "TEACHER" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDialog({ kind: "branches", member: m, selected: [...m.branchIds] })
                        }
                        disabled={busy || branches.length === 0}
                        title={branches.length === 0 ? "Create a branch first" : "Assign branches"}
                      >
                        <Building2 className="mr-1 h-3.5 w-3.5" aria-hidden />
                        Branches
                      </Button>
                    )}
                    <Select
                      value={m.role}
                      onValueChange={(v) => onChangeRole(m, v as MemberRole)}
                      disabled={busy || isSelf}
                    >
                      <SelectTrigger className="w-[8rem]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TEACHER">Teacher</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDialog({ kind: "reset", member: m, password: "" })
                      }
                      disabled={busy}
                    >
                      <KeyRound className="mr-1 h-3.5 w-3.5" aria-hidden />
                      Reset password
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDialog({ kind: "remove", member: m })}
                      disabled={busy || isSelf}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" aria-hidden />
                      Remove
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={dialog.kind === "reset"}
        onOpenChange={(v) => !v && setDialog({ kind: "none" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription>
              {dialog.kind === "reset"
                ? `Set a new password for ${dialog.member.name ?? dialog.member.email}. Share it with them after saving.`
                : null}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="reset-pw">New password</Label>
            <Input
              id="reset-pw"
              type="text"
              autoComplete="new-password"
              placeholder={`Min ${MIN_PASSWORD_LENGTH} chars`}
              value={dialog.kind === "reset" ? dialog.password : ""}
              onChange={(e) =>
                setDialog((prev) =>
                  prev.kind === "reset" ? { ...prev, password: e.target.value } : prev
                )
              }
              disabled={busy}
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialog({ kind: "none" })}
              disabled={busy}
            >
              Cancel
            </Button>
            <Button onClick={onReset} disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Reset password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog.kind === "remove"}
        onOpenChange={(v) => !v && setDialog({ kind: "none" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from org?</DialogTitle>
            <DialogDescription>
              {dialog.kind === "remove" ? (
                <>
                  <span className="font-medium text-foreground">
                    {dialog.member.name ?? dialog.member.email}
                  </span>{" "}
                  will lose access to this org. Their auth account stays
                  intact in case they belong to other orgs (they don&apos;t
                  today). This action can be reversed by re-adding them
                  with the same email.
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialog({ kind: "none" })}
              disabled={busy}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onRemove}
              disabled={busy}
            >
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog.kind === "branches"}
        onOpenChange={(v) => !v && setDialog({ kind: "none" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign branches</DialogTitle>
            <DialogDescription>
              {dialog.kind === "branches"
                ? `${dialog.member.name ?? dialog.member.email} can build papers only for the branches you select.`
                : null}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-72 space-y-1 overflow-y-auto">
            {branches.map((b) => {
              const checked = dialog.kind === "branches" && dialog.selected.includes(b.id);
              return (
                <label
                  key={b.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={busy}
                    onChange={(e) =>
                      setDialog((prev) => {
                        if (prev.kind !== "branches") return prev;
                        const set = new Set(prev.selected);
                        if (e.target.checked) set.add(b.id);
                        else set.delete(b.id);
                        return { ...prev, selected: Array.from(set) };
                      })
                    }
                  />
                  {b.name}
                </label>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialog({ kind: "none" })} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={onSaveBranches} disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function callMembers(body: unknown): Promise<{ ok?: boolean; error?: string; members?: MemberRow[] }> {
  try {
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as { ok?: boolean; error?: string; members?: MemberRow[] };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
