"use client";

/**
 * "Create student logins": staff make a login for a student who has none,
 * one at a time or as a pasted class list, and get the details to share.
 *
 * Both modes send the same pasted-block shape to /api/batches/students, which
 * re-parses it with the shared helper. The passwords come back ONCE in the
 * response and are never stored, so the result panel says so and offers copy
 * and download before the teacher leaves.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, Download, UserPlus, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  credentialsCsv,
  credentialsText,
  generatePassword,
  parseStudentLines,
  type Credential,
} from "@/lib/batches/studentLogins";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/credentials";

type Mode = "one" | "many";

type Outcome = {
  created: Credential[];
  existing: string[];
  alreadyInBatch: string[];
  failed: { email: string; reason: string }[];
  invalid: { line: string; reason: string }[];
  overflow: number;
  declined: number;
  inviteEmailFailures: number;
};

export default function StudentLoginsCard({ batchId }: { batchId: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("one");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lines, setLines] = useState("");
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  function block(): string {
    // Tabs, so a comma inside a typed name can't shift the columns.
    return mode === "one" ? [name.trim(), email.trim(), password.trim()].join("\t") : lines;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseStudentLines(block());
    if (parsed.valid.length === 0) {
      toast.error(parsed.invalid[0]?.reason ?? "Add a name and an email address.");
      return;
    }
    // A mistyped email gives the login (and our emails) to a stranger, so the
    // teacher reads the addresses back once before anything is created.
    const shown = parsed.valid.slice(0, 15).map((s) => `${s.name}: ${s.email}`);
    const more = parsed.valid.length > 15 ? `\n…and ${parsed.valid.length - 15} more` : "";
    if (
      !confirm(
        `Create logins for these ${parsed.valid.length} student(s)? Check each email is spelt right.\n\n${shown.join("\n")}${more}`
      )
    ) {
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/batches/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, lines: block() }),
      });
      const json = (await res.json().catch(() => ({}))) as Partial<Outcome> & { error?: string };
      if (!res.ok) {
        toast.error(json.error ?? "Could not create the logins.");
        return;
      }
      const result: Outcome = {
        created: json.created ?? [],
        existing: json.existing ?? [],
        alreadyInBatch: json.alreadyInBatch ?? [],
        failed: json.failed ?? [],
        invalid: json.invalid ?? [],
        overflow: json.overflow ?? 0,
        declined: json.declined ?? 0,
        inviteEmailFailures: json.inviteEmailFailures ?? 0,
      };
      setOutcome(result);
      if (result.created.length > 0) {
        toast.success(`${result.created.length} login(s) created and added to this batch.`);
      }
      if (result.existing.length > 0) {
        toast.info(`${result.existing.length} already had a login, so they were sent an invitation.`);
      }
      if (result.failed.length > 0) {
        toast.error(`${result.failed.length} could not be created. See the list below.`);
      }
      setName("");
      setEmail("");
      setPassword("");
      setLines("");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copyAll(rows: Credential[]) {
    try {
      await navigator.clipboard.writeText(credentialsText(rows));
      toast.success("Login details copied.");
    } catch {
      toast.error("Could not copy. Download the sheet instead.");
    }
  }

  function download(rows: Credential[]) {
    const blob = new Blob([credentialsCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `student-logins-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sheet downloaded.");
  }

  return (
    <section className="rounded-xl border bg-card p-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <UserPlus className="h-4 w-4 text-brand-accent" aria-hidden />
        Create student logins
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        For students who have no login yet. Any email works, not just Gmail. They join this
        batch straight away and sign in with the email and password you share. Anyone who
        already has a login gets an invitation instead.
      </p>

      <div className="mt-3 inline-flex rounded-lg border p-0.5" role="group" aria-label="How many students">
        {(["one", "many"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "one" ? "One student" : "Many students"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-3 space-y-3">
        {mode === "one" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="sl-name">Name</Label>
              <Input id="sl-name" value={name} onChange={(e) => setName(e.target.value)} disabled={busy} autoComplete="off" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sl-email">Email</Label>
              <Input
                id="sl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="sl-password">Password</Label>
              <div className="flex gap-2">
                <Input
                  id="sl-password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                  autoComplete="new-password"
                  placeholder={`Leave blank to make one (or type ${MIN_PASSWORD_LENGTH}+ characters)`}
                  className="font-mono"
                />
                <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => setPassword(generatePassword())}>
                  <Wand2 className="h-4 w-4" aria-hidden />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <Label htmlFor="sl-lines">Students, one per line</Label>
            <textarea
              id="sl-lines"
              value={lines}
              onChange={(e) => setLines(e.target.value)}
              rows={6}
              disabled={busy}
              placeholder={"Anita Rao, anita@yahoo.com\nRahul K, rahul@school.edu.in"}
              className="w-full rounded-lg border bg-background p-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p className="text-xs text-muted-foreground">
              Name and email on each line. You can paste two columns straight from a spreadsheet.
              Add a third column to choose a password; otherwise one is made for each student.
              Up to 100 at a time.
            </p>
          </div>
        )}
        <Button type="submit" variant="brand" size="sm" disabled={busy}>
          {busy ? "Creating…" : "Create logins"}
        </Button>
      </form>

      {outcome && <OutcomePanel outcome={outcome} onCopy={copyAll} onDownload={download} />}
    </section>
  );
}

function OutcomePanel({
  outcome,
  onCopy,
  onDownload,
}: {
  outcome: Outcome;
  onCopy: (rows: Credential[]) => void;
  onDownload: (rows: Credential[]) => void;
}) {
  const { created } = outcome;
  return (
    <div className="mt-4 space-y-3 border-t pt-4 text-sm" aria-live="polite">
      {created.length > 0 && (
        <div>
          <p className="font-medium">
            Passwords are shown only now. Copy or download them before you leave this page.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onCopy(created)}>
              <Copy className="h-4 w-4" aria-hidden />
              Copy all
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => onDownload(created)}>
              <Download className="h-4 w-4" aria-hidden />
              Download sheet
            </Button>
          </div>
          <div className="mt-2 overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Email</th>
                  <th className="px-3 py-2 font-medium">Password</th>
                </tr>
              </thead>
              <tbody>
                {created.map((c) => (
                  <tr key={c.email} className="border-t">
                    <td className="px-3 py-2">{c.name}</td>
                    <td className="px-3 py-2 font-mono">{c.email}</td>
                    <td className="px-3 py-2 font-mono">{c.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {outcome.existing.length > 0 && (
        <Note title="Already had a login, so sent an invitation">
          {outcome.existing.join(", ")}
          {outcome.declined > 0 &&
            ` (${outcome.declined} declined this batch before and were not re-invited; share the join code with them)`}
          {outcome.inviteEmailFailures > 0 &&
            `. ${outcome.inviteEmailFailures} invitation email(s) did not send; the invitation still shows on their account page.`}
        </Note>
      )}
      {outcome.alreadyInBatch.length > 0 && (
        <Note title="Already in this batch">{outcome.alreadyInBatch.join(", ")}</Note>
      )}
      {outcome.failed.length > 0 && (
        <Note title="Could not create">
          {outcome.failed.map((f) => `${f.email} (${f.reason})`).join("; ")}
        </Note>
      )}
      {outcome.invalid.length > 0 && (
        <Note title="Lines skipped">
          {outcome.invalid.map((i) => `"${i.line}": ${i.reason}`).join("; ")}
        </Note>
      )}
      {outcome.overflow > 0 && (
        <Note title="Over the limit">{outcome.overflow} line(s) past the first 100 were not created. Send them again.</Note>
      )}
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      <p className="font-medium">{title}</p>
      <p className="mt-1 break-words text-muted-foreground">{children}</p>
    </div>
  );
}
