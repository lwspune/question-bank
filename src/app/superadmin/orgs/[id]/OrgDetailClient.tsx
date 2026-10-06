"use client";

/**
 * One organisation: rename, members (role + add), and delete.
 *
 * The rules live server-side (lib/superadmin/admin.ts + migration 0135); this
 * component only mirrors them so a button that would be refused is not offered.
 * A protected org (the content org) shows why it can't be renamed or deleted.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Lock, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteOrgAction, renameOrgAction, setMemberRoleAction } from "../../actions";
import AddMemberDialog from "../AddMemberDialog";
import type { OrgDetail } from "@/lib/superadmin/admin";
import type { MemberRole } from "@/lib/members/admin";

function formatDate(iso: string | null): string {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function OrgDetailClient({ org, viewerId }: { org: OrgDetail; viewerId: string }) {
  const router = useRouter();
  const [name, setName] = useState(org.name);
  const [renaming, setRenaming] = useState(false);
  const [roleBusy, setRoleBusy] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const c = org.counts;
  const blockedReason = org.deletionProtected
    ? "This is the content organisation. It is protected in the database: it can't be renamed (the mock sync finds it by name) or deleted (that would delete the question bank)."
    : c.questions > 0
      ? `It owns ${c.questions.toLocaleString()} question(s). Deleting it would delete them too.`
      : c.reports > 0
        ? `It has ${c.reports} question or concept report(s). Resolve or remove them first.`
        : null;

  async function onRename(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() === org.name) return;
    setRenaming(true);
    const res = await renameOrgAction(org.id, name);
    setRenaming(false);
    if (res.ok) {
      toast.success("Organization renamed.");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onRole(userId: string, role: MemberRole) {
    setRoleBusy(userId);
    const res = await setMemberRoleAction({ orgId: org.id, userId, role });
    setRoleBusy(null);
    if (res.ok) {
      toast.success(role === "ADMIN" ? "Now an admin." : "Now a teacher.");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onDelete(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);
    const res = await deleteOrgAction(org.id, confirmText);
    setDeleting(false);
    if (res.ok) {
      toast.success(`${org.name} deleted.`);
      router.push("/superadmin/orgs");
    } else {
      toast.error(res.error);
    }
  }

  const stats: [string, number][] = [
    ["Members", org.members.length],
    ["Branches", c.branches],
    ["Batches", c.batches],
    ["Papers", c.papers],
    ["Students in batches", c.enrollments],
    ["Questions", c.questions],
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">{org.name}</h1>
        <p className="text-sm text-muted-foreground">Created {formatDate(org.createdAt)}</p>
        {org.deletionProtected ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Protected: can&apos;t be renamed or deleted.
          </p>
        ) : (
          <form onSubmit={onRename} className="flex flex-wrap items-end gap-2">
            <div className="min-w-0 flex-1 space-y-1.5">
              <Label htmlFor="org-rename">Name</Label>
              <Input id="org-rename" value={name} onChange={(e) => setName(e.target.value)} disabled={renaming} />
            </div>
            <Button type="submit" variant="outline" disabled={renaming || name.trim() === org.name || !name.trim()}>
              {renaming && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Rename
            </Button>
          </form>
        )}
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-card p-4">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>

      <section className="rounded-lg border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
          <h2 className="text-sm font-semibold">Admins and teachers</h2>
          <Button variant="outline" size="sm" onClick={() => setAddOpen(true)}>
            <UserPlus className="h-4 w-4" aria-hidden />
            Add admin / teacher
          </Button>
        </div>
        {org.adminCount === 0 && (
          <p className="flex items-start gap-2 border-b bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            No admin. Nobody here can create branches or assign teachers to them, so a
            teacher can&apos;t make batches. Make someone an admin.
          </p>
        )}
        {org.members.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No members yet.</p>
        ) : (
          <ul className="divide-y">
            {org.members.map((m) => (
              <li key={m.userId} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{m.name ?? m.email}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {m.name ? `${m.email} · ` : ""}Last sign-in {formatDate(m.lastSignInAt)}
                  </div>
                </div>
                <label className="sr-only" htmlFor={`role-${m.userId}`}>
                  Role for {m.name ?? m.email}
                </label>
                <select
                  id={`role-${m.userId}`}
                  value={m.role}
                  disabled={roleBusy !== null || m.userId === viewerId}
                  onChange={(e) => onRole(m.userId, e.target.value as MemberRole)}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="TEACHER">Teacher</option>
                </select>
                {roleBusy === m.userId && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-destructive/40 p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <Trash2 className="h-4 w-4" aria-hidden />
          Delete organisation
        </h2>
        {blockedReason ? (
          <p className="mt-2 text-sm text-muted-foreground">Can&apos;t be deleted. {blockedReason}</p>
        ) : (
          <form onSubmit={onDelete} className="mt-2 space-y-3 text-sm">
            <p>This permanently deletes:</p>
            <ul className="list-disc space-y-0.5 pl-5 text-muted-foreground">
              <li>{c.papers} paper(s) and {c.branches} branch(es)</li>
              <li>{c.batches} batch(es), with {c.enrollments} student enrollment(s) and their assignments</li>
            </ul>
            <p className="text-muted-foreground">
              The {org.members.length} admin/teacher login(s) are kept but lose access to this
              organisation; they become ordinary student accounts. Students keep their accounts and
              results.
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="org-delete-confirm">
                Type <span className="font-semibold">{org.name}</span> to confirm
              </Label>
              <Input
                id="org-delete-confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={deleting}
                autoComplete="off"
              />
            </div>
            <Button type="submit" variant="destructive" disabled={deleting || confirmText.trim() !== org.name}>
              {deleting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Delete organisation
            </Button>
          </form>
        )}
      </section>

      <AddMemberDialog
        org={{ id: org.id, name: org.name }}
        open={addOpen}
        onOpenChange={setAddOpen}
        onAdded={() => router.refresh()}
      />
    </div>
  );
}
