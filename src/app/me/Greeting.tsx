"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * "Good evening, Riya" with a quiet "Not you?". The account name can be a
 * parent's (a student who signed in on a parent's Google account), so the
 * student can set the name they are greeted by. Saved by PATCH /api/profile/name.
 */
export default function Greeting({ greeting, name }: { greeting: string; name: string | null }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile/name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not save your name.");
      toast.success("Saved.");
      setEditing(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your name.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {name ? `${greeting}, ${name}` : greeting}
      </h1>
      {editing ? (
        <form onSubmit={save} className="mt-2 flex flex-wrap items-center gap-2">
          <label htmlFor="greet-name" className="sr-only">
            Your first name
          </label>
          <input
            id="greet-name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={60}
            autoComplete="given-name"
            placeholder="Your first name"
            className="h-9 w-48 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" size="sm" variant="brand" disabled={saving || value.trim() === ""}>
            Save
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        name && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-1 rounded text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Not you? Change the name
          </button>
        )
      )}
    </div>
  );
}
