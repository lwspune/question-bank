"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileChips from "@/components/ProfileChips";
import { EXAM_REGISTRY, isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import { setExamCookie } from "@/lib/exam/examCookie";
import { STAGES, STAGE_LABELS, type Stage } from "@/lib/profile/onboarding";
import {
  MEDIUMS,
  STREAMS,
  profileCompletion,
  type Medium,
  type Stream,
} from "@/lib/profile/fields";
import type { ProfileRow } from "@/lib/profile/service";

const EXAM_OPTIONS = EXAM_REGISTRY.map((e) => ({ value: e.slug, label: e.displayName }));
const STAGE_OPTIONS = STAGES.map((s) => ({ value: s, label: STAGE_LABELS[s] }));
const MEDIUM_OPTIONS = MEDIUMS.map((m) => ({ value: m, label: m === "hindi" ? "Hindi" : "English" }));
const STREAM_LABELS: Record<Stream, string> = {
  pcm: "Science (PCM)",
  pcb: "Science (PCB)",
  pcmb: "Science (PCMB)",
  commerce: "Commerce",
  arts: "Arts",
};
const STREAM_OPTIONS = STREAMS.map((s) => ({ value: s, label: STREAM_LABELS[s] }));

/**
 * The self-serve /account profile form (Phase 2). Never a gate: every field is
 * optional, saving persists whatever's filled, and a live completion meter
 * nudges without demanding. Mobile is the one field that needs consent when
 * set/changed (DPDP) — its checkbox appears only then.
 */
export default function ProfileForm({ profile }: { profile: ProfileRow }) {
  const router = useRouter();
  const initialMobile = profile.mobile ?? "";

  const [exams, setExams] = useState<ExamSlug[]>(
    profile.targetExams.filter(isExamSlug)
  );
  const [stage, setStage] = useState<Stage | null>((profile.stage as Stage | null) ?? null);
  const [medium, setMedium] = useState<Medium | null>((profile.medium as Medium | null) ?? null);
  const [stream, setStream] = useState<Stream | null>((profile.stream as Stream | null) ?? null);
  const [city, setCity] = useState(profile.city ?? "");
  const [goal, setGoal] = useState(profile.goal ?? "");
  const [mobile, setMobile] = useState(initialMobile);
  const [consent, setConsent] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(profile.whatsappOptIn);
  const [saving, setSaving] = useState(false);

  const meter = profileCompletion({
    mobile: mobile.trim() || null,
    targetExams: exams,
    stage,
    medium,
    stream,
    city: city.trim() || null,
    goal: goal.trim() || null,
  });

  const mobileDirty = mobile.trim() !== initialMobile.trim();
  const needsConsent = mobileDirty && mobile.trim() !== "";

  function toggleExam(v: string) {
    if (!isExamSlug(v)) return;
    setExams((prev) => (prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]));
  }

  async function onSave() {
    if (needsConsent && !consent) {
      toast.error("Please accept the consent to save your mobile number.");
      return;
    }
    setSaving(true);
    const patch: Record<string, unknown> = {
      targetExams: exams,
      stage,
      medium,
      stream,
      city: city.trim() || null,
      goal: goal.trim() || null,
    };
    // Only write mobile when it actually changed to a non-empty value (avoids
    // forcing re-consent for an untouched number; a blank can't unset it).
    if (needsConsent) {
      patch.mobile = mobile.trim();
      patch.consent = true;
    }
    if (whatsappOptIn !== profile.whatsappOptIn) patch.whatsappOptIn = whatsappOptIn;
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
      // Keep the header pill + personalised defaults in sync with the primary exam.
      if (exams[0]) setExamCookie(exams[0]);
      toast.success("Profile saved.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold">Your profile</h2>
        <span className="text-sm tabular-nums text-muted-foreground">
          {meter.percent}% complete
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={meter.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Profile completion"
      >
        <div
          className="h-full rounded-full bg-brand-accent transition-all"
          style={{ width: `${meter.percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Optional — fill what you like, whenever you like. It sharpens what we put
        in front of you. Nothing here is required.
      </p>

      <div className="mt-6 space-y-6">
        <ProfileChips
          legend="Target exam"
          options={EXAM_OPTIONS}
          selected={exams}
          onToggle={toggleExam}
          disabled={saving}
        />
        <ProfileChips
          legend="Your stage"
          options={STAGE_OPTIONS}
          selected={stage ? [stage] : []}
          onToggle={(v) => setStage(stage === v ? null : (v as Stage))}
          disabled={saving}
        />
        <ProfileChips
          legend="Medium"
          options={MEDIUM_OPTIONS}
          selected={medium ? [medium] : []}
          onToggle={(v) => setMedium(medium === v ? null : (v as Medium))}
          disabled={saving}
        />
        <ProfileChips
          legend="Academic stream"
          options={STREAM_OPTIONS}
          selected={stream ? [stream] : []}
          onToggle={(v) => setStream(stream === v ? null : (v as Stream))}
          disabled={saving}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-city">City</Label>
            <Input
              id="profile-city"
              value={city}
              maxLength={80}
              placeholder="e.g. Pune"
              onChange={(e) => setCity(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-goal">Your goal</Label>
            <Input
              id="profile-goal"
              value={goal}
              maxLength={200}
              placeholder="e.g. Clear NDA Sept 2026"
              onChange={(e) => setGoal(e.target.value)}
              disabled={saving}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-mobile">Mobile number</Label>
          <Input
            id="profile-mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={mobile}
            placeholder="10-digit mobile"
            onChange={(e) => setMobile(e.target.value)}
            disabled={saving}
          />
          {needsConsent && (
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={saving}
                className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--brand)]"
              />
              <span>
                I agree to be contacted by PYQ Vault about my preparation and consent to the{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground" target="_blank">
                  privacy policy
                </Link>
                .
              </span>
            </label>
          )}
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={whatsappOptIn}
            onChange={(e) => setWhatsappOptIn(e.target.checked)}
            disabled={saving}
            className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--brand)]"
          />
          <span className="text-muted-foreground">
            Send me a weekly weak-area report on WhatsApp. You can turn this off
            anytime.
          </span>
        </label>
      </div>

      <div className="mt-6">
        <Button type="button" variant="brand" onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </section>
  );
}
