"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PER_DAY_RANGE, PER_HOUR_RANGE, type ChatSettings } from "@/lib/chat/settings";

/**
 * V's settings (migration 0158): the AI switch, messages per person per hour,
 * and AI answers per day for the whole site. Saved through
 * /api/admin/chat-settings; the next typed question uses them.
 */
export default function ChatSettingsForm({ initial }: { initial: ChatSettings }) {
  const [aiEnabled, setAiEnabled] = useState(initial.aiEnabled);
  const [explainEnabled, setExplainEnabled] = useState(initial.explainEnabled);
  const [planEnabled, setPlanEnabled] = useState(initial.planEnabled);
  const [progressEnabled, setProgressEnabled] = useState(initial.progressEnabled);
  const [perHour, setPerHour] = useState(String(initial.perPersonPerHour));
  const [perDay, setPerDay] = useState(String(initial.aiAnswersPerDay));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/chat-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aiEnabled,
          explainEnabled,
          planEnabled,
          progressEnabled,
          perPersonPerHour: Number(perHour),
          aiAnswersPerDay: Number(perDay),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; settings?: ChatSettings };
      if (!res.ok || json.error || !json.settings) {
        const msg = json.error ?? "Could not save V's settings";
        setError(msg);
        toast.error(msg);
        return;
      }
      setAiEnabled(json.settings.aiEnabled);
      setExplainEnabled(json.settings.explainEnabled);
      setPlanEnabled(json.settings.planEnabled);
      setProgressEnabled(json.settings.progressEnabled);
      setPerHour(String(json.settings.perPersonPerHour));
      setPerDay(String(json.settings.aiAnswersPerDay));
      toast.success("V's settings saved");
    } catch {
      setError("Network error");
      toast.error("Could not save V's settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4 p-4">
      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={aiEnabled}
          onChange={(e) => setAiEnabled(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span>
          Answer typed questions with AI
          <span className="block text-xs text-muted-foreground">
            Off: V gives the fixed reply (&ldquo;Let me get back to your question later&rdquo;).
          </span>
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={explainEnabled}
          onChange={(e) => setExplainEnabled(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span>
          Explain questions (&ldquo;Ask V&rdquo; on question cards)
          <span className="block text-xs text-muted-foreground">
            V explains a question from its stored solution, and each explanation counts as one free answer. Needs the
            AI switch on. Off: the Ask V buttons are hidden.
          </span>
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={planEnabled}
          onChange={(e) => setPlanEnabled(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span>
          Plan the week (when a student types &ldquo;plan my week&rdquo;)
          <span className="block text-xs text-muted-foreground">
            V saves a 7-day plan from the student&apos;s weak chapters, due drill and the exam&apos;s biggest chapters, shown
            as a card inside V that ticks itself. Needs the AI switch on. Off: V does not make plans.
          </span>
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={progressEnabled}
          onChange={(e) => setProgressEnabled(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span>
          &ldquo;How&apos;s my progress&rdquo; button in V
          <span className="block text-xs text-muted-foreground">
            A card of the student&apos;s own numbers: this week&apos;s answers, mistakes fixed, exam covered, mocks, chapters
            and notes read. Uses no AI, so it works with the AI switch off. Off: the button is hidden.
          </span>
        </span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="v-per-hour">Messages per person per hour</Label>
          <Input
            id="v-per-hour"
            type="number"
            inputMode="numeric"
            min={PER_HOUR_RANGE.min}
            max={PER_HOUR_RANGE.max}
            step={1}
            value={perHour}
            onChange={(e) => setPerHour(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Signed in: per account. Signed out: per internet connection.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="v-per-day">AI answers per day, whole site</Label>
          <Input
            id="v-per-day"
            type="number"
            inputMode="numeric"
            min={PER_DAY_RANGE.min}
            max={PER_DAY_RANGE.max}
            step={1}
            value={perDay}
            onChange={(e) => setPerDay(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Resets at midnight India time. After that, the fixed reply. About $0.0005 an answer.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
