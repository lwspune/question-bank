"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { BrandingParts } from "@/lib/export/branding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SELLABLE_SCOPES,
  formatRupees,
  planLengthLabel,
  validatePlan,
  type Plan,
  type PlanInput,
} from "@/lib/billing/plans";
import type { PaywallLimit, PaywallSettings } from "@/lib/billing/paywallSettings";

type Props = {
  initialPlans: Plan[];
  initialSettings: PaywallSettings;
  loadError: string | null;
};

/** The dialog's form state: strings, so a half-typed price is not "invalid" yet. */
type Draft = {
  id: string;
  label: string;
  blurb: string;
  perks: string;
  urlKey: string;
  rupees: string;
  durationDays: string;
  scope: string;
  sortOrder: string;
  active: boolean;
  isNew: boolean;
};

const SCOPE_HELP: Record<string, string> = {
  mocks: "Unlimited mock tests past the free limit, plus question paper + answer key PDF downloads.",
  teacher: "Retired ₹499 pass. Covers the same as the Premium Pass.",
};

const fieldClass =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function toDraft(p: Plan | null): Draft {
  return p
    ? {
        id: p.id,
        label: p.label,
        blurb: p.blurb,
        perks: p.perks.join("\n"),
        urlKey: p.urlKey,
        rupees: String(p.amountPaise / 100),
        durationDays: p.durationDays === null ? "" : String(p.durationDays),
        scope: p.scope,
        sortOrder: String(p.sortOrder),
        active: p.active,
        isNew: false,
      }
    : {
        id: "",
        label: "",
        blurb: "",
        perks: "",
        urlKey: "",
        rupees: "",
        durationDays: "365",
        scope: SELLABLE_SCOPES[0],
        sortOrder: "10",
        active: true,
        isNew: true,
      };
}

function fromDraft(d: Draft): PlanInput & { active: boolean } {
  const rupees = Number(d.rupees);
  return {
    id: d.id.trim(),
    label: d.label,
    blurb: d.blurb,
    perks: d.perks.split("\n").map((s) => s.trim()).filter(Boolean),
    urlKey: d.urlKey.trim(),
    amountPaise: Number.isFinite(rupees) ? Math.round(rupees * 100) : NaN,
    currency: "INR",
    durationDays: d.durationDays.trim() === "" ? null : Number(d.durationDays),
    scope: d.scope,
    sortOrder: Number(d.sortOrder),
    active: d.active,
  };
}

export default function PricingAdminClient({ initialPlans, initialSettings, loadError }: Props) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [settings, setSettings] = useState<PaywallSettings>(initialSettings);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);


  async function refresh() {
    const res = await callApi({ action: "list" });
    if (res.ok) {
      if (Array.isArray(res.plans)) setPlans(res.plans as Plan[]);
      if (res.settings) setSettings(res.settings as PaywallSettings);
    }
  }

  async function onSavePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    const plan = fromDraft(draft);
    const v = validatePlan(plan);
    if (!v.ok) {
      toast.error(v.message);
      return;
    }
    setBusy(true);
    const res = await callApi({ action: "upsert", plan });
    setBusy(false);
    if (res.ok) {
      toast.success(`${plan.label} saved.`);
      setDraft(null);
      await refresh();
    } else {
      toast.error(res.error || "Could not save the plan.");
    }
  }

  async function onToggleActive(p: Plan) {
    setBusy(true);
    const res = await callApi({ action: "setActive", id: p.id, active: !p.active });
    setBusy(false);
    if (res.ok) {
      toast.success(p.active ? `${p.label} is off sale.` : `${p.label} is on sale.`);
      await refresh();
    } else {
      toast.error(res.error || "Could not update the plan.");
    }
  }

  async function saveBranding(parts: BrandingParts): Promise<void> {
    setBusy(true);
    const res = await callApi({ action: "saveBranding", ...parts });
    setBusy(false);
    if (res.ok) {
      toast.success("Download branding saved. It applies to the next download.");
      await refresh();
      return;
    }
    toast.error(res.error || "Could not save the branding.");
  }

  async function saveLimit(which: PaywallLimit, enabled: boolean, limit: number): Promise<boolean> {
    setBusy(true);
    const res = await callApi({ action: "saveSettings", which, enabled, limit });
    setBusy(false);
    if (res.ok) {
      const row = LIMIT_ROWS.find((r) => r.which === which)!;
      toast.success(enabled ? `${row.label}: ${limit}.` : `${row.label}: off.`);
      await refresh();
      return true;
    }
    toast.error(res.error || "Could not save the limit.");
    return false;
  }

  return (
    <div className="space-y-6">
      {loadError && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
          Could not load: {loadError}
        </p>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Passes</CardTitle>
          <Button size="sm" onClick={() => setDraft(toDraft(null))} disabled={busy}>
            <Plus className="h-4 w-4" aria-hidden /> New pass
          </Button>
        </CardHeader>
        <CardContent>
          {plans.length === 0 ? (
            <p className="text-sm text-muted-foreground">No passes yet.</p>
          ) : (
            <ul className="divide-y">
              {plans.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-medium">
                      {p.label}
                      <Badge variant={p.active ? "default" : "secondary"}>
                        {p.active ? "on sale" : "off sale"}
                      </Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatRupees(p.amountPaise)} / {planLengthLabel(p)} · scope{" "}
                      <code>{p.scope}</code> · <code>/pricing?plan={p.urlKey}</code> · id{" "}
                      <code>{p.id}</code>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDraft(toDraft(p))}
                    disabled={busy}
                    aria-label={`Edit ${p.label}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onToggleActive(p)} disabled={busy}>
                    {p.active ? "Take off sale" : "Put on sale"}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What a free account gets</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {LIMIT_ROWS.filter((row) => !row.appliesToAll).map((row) => (
            <LimitRow key={row.which} row={row} settings={settings} busy={busy} onSave={saveLimit} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Downloads</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {LIMIT_ROWS.filter((row) => row.appliesToAll).map((row) => (
            <LimitRow key={row.which} row={row} settings={settings} busy={busy} onSave={saveLimit} />
          ))}
          <BrandingSwitches settings={settings} busy={busy} onSave={saveBranding} />
        </CardContent>
      </Card>

      <Dialog open={draft !== null} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {draft && (
            <form onSubmit={onSavePlan} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{draft.isNew ? "New pass" : `Edit ${draft.label}`}</DialogTitle>
                <DialogDescription>
                  {draft.isNew
                    ? "The id and URL key cannot be changed later."
                    : "Price, length and copy can change any time. The id and URL key are fixed."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="plan-id">Id</Label>
                  <Input
                    id="plan-id"
                    value={draft.id}
                    onChange={(e) => setDraft({ ...draft, id: e.target.value })}
                    placeholder="mock-pass-3m"
                    disabled={!draft.isNew}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plan-url-key">URL key</Label>
                  <Input
                    id="plan-url-key"
                    value={draft.urlKey}
                    onChange={(e) => setDraft({ ...draft, urlKey: e.target.value })}
                    placeholder="mocks"
                    disabled={!draft.isNew}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="plan-label">Label</Label>
                <Input
                  id="plan-label"
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label htmlFor="plan-rupees">Price (₹)</Label>
                  <Input
                    id="plan-rupees"
                    type="number"
                    min={1}
                    step={1}
                    value={draft.rupees}
                    onChange={(e) => setDraft({ ...draft, rupees: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plan-days">Days (blank = lifetime)</Label>
                  <Input
                    id="plan-days"
                    type="number"
                    min={1}
                    step={1}
                    value={draft.durationDays}
                    onChange={(e) => setDraft({ ...draft, durationDays: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="plan-sort">Order</Label>
                  <Input
                    id="plan-sort"
                    type="number"
                    step={1}
                    value={draft.sortOrder}
                    onChange={(e) => setDraft({ ...draft, sortOrder: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="plan-scope">What it unlocks</Label>
                <select
                  id="plan-scope"
                  value={draft.scope}
                  onChange={(e) => setDraft({ ...draft, scope: e.target.value })}
                  className={fieldClass}
                >
                  {SELLABLE_SCOPES.map((s) => (
                    <option key={s} value={s}>
                      {s} — {SCOPE_HELP[s] ?? ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="plan-blurb">Blurb</Label>
                <Input
                  id="plan-blurb"
                  value={draft.blurb}
                  onChange={(e) => setDraft({ ...draft, blurb: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="plan-perks">Perks (one per line, up to 6)</Label>
                <textarea
                  id="plan-perks"
                  value={draft.perks}
                  onChange={(e) => setDraft({ ...draft, perks: e.target.value })}
                  rows={4}
                  className={fieldClass}
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
                  className="h-4 w-4 rounded border-input"
                />
                On sale
              </label>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDraft(null)} disabled={busy}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                  Save
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

async function callApi(body: unknown): Promise<{ ok: boolean; error?: string; [k: string]: unknown }> {
  try {
    const res = await fetch("/api/admin/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string; [k: string]: unknown };
    return { ...json, ok: res.ok && !json.error };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

/**
 * One free limit on the admin page (paywall_settings, migrations 0120 + 0134).
 * Off = no limit and no number quoted. Mocks and chapter tests count from the
 * day they are switched on; the others need no date.
 */
type LimitRowSpec = {
  which: PaywallLimit;
  label: string;
  unit: string;
  field: keyof PaywallSettings;
  since?: keyof PaywallSettings;
  suggested: number;
  checkbox: string;
  /** Limits everyone, pass holders and staff too (shown in the Downloads card). */
  appliesToAll?: true;
};

const LIMIT_ROWS: LimitRowSpec[] = [
  {
    which: "mocks",
    label: "Free mock tests",
    unit: "full mocks",
    field: "freeMockLimit",
    since: "countsFrom",
    suggested: 3,
    checkbox: "Limit how many different full mocks a free account can start",
  },
  {
    which: "chapterTests",
    label: "Free chapter tests",
    unit: "chapter tests",
    field: "freeChapterTestLimit",
    since: "chapterTestsCountsFrom",
    suggested: 5,
    checkbox: "Limit how many different chapter tests a free account can start (counted apart from mocks)",
  },
  {
    which: "drill",
    label: "Fix your mistakes",
    unit: "questions a day",
    field: "freeDrillPerDay",
    suggested: 15,
    checkbox: "Limit drill questions a free account can answer each day (5 = one set)",
  },
  {
    which: "reveals",
    label: "Answers a day",
    unit: "answers a day",
    field: "freeRevealsPerDay",
    suggested: 50,
    checkbox: "Limit answers a signed-in free account can open each day (bank, board, guides)",
  },
  {
    which: "saves",
    label: "Saved questions",
    unit: "saved questions",
    field: "freeSaveLimit",
    suggested: 100,
    checkbox: "Limit how many questions a free account can save",
  },
  {
    which: "projection",
    label: "Projected score",
    unit: "days free after reveal",
    field: "projectionTrialDays",
    suggested: 7,
    checkbox: "Free for a number of days after the student reveals it, then Premium Pass only",
  },
  {
    which: "paperDownloads",
    label: "Past-paper downloads",
    unit: "papers a day",
    field: "mockPapersPerDay",
    suggested: 5,
    checkbox: "Limit how many different past papers ANY account (pass holders and staff) can download each day; a paper's answer key is free",
    appliesToAll: true,
  },
];

function LimitRow({
  row,
  settings,
  busy,
  onSave,
}: {
  row: LimitRowSpec;
  settings: PaywallSettings;
  busy: boolean;
  onSave: (which: PaywallLimit, enabled: boolean, limit: number) => Promise<boolean>;
}) {
  const current = settings[row.field] as number | null;
  const [enabled, setEnabled] = useState(current !== null);
  const [limit, setLimit] = useState(String(current ?? row.suggested));
  const id = `limit-${row.which}`;
  const since = row.since ? (settings[row.since] as string | null) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void onSave(row.which, enabled, Number(limit));
      }}
      className="space-y-3 py-4 first:pt-0 last:pb-0"
    >
      <p className="text-sm font-medium">{row.label}</p>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {row.checkbox}
      </label>
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <Label htmlFor={id}>{row.unit}</Label>
          <Input
            id={id}
            type="number"
            min={0}
            step={1}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            disabled={!enabled}
            className="w-28"
          />
        </div>
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
          Save
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {current === null
          ? "Off: unlimited for everyone, and the site quotes no number."
          : since
            ? `On since ${new Date(since).toLocaleDateString("en-IN", { dateStyle: "medium" })}: ones started before then do not count. Changing the number keeps that date; switching off and on again resets it.`
            : row.appliesToAll
              ? `On: ${current} ${row.unit}, for every account, pass holders and staff included.`
              : `On: ${current} ${row.unit}. Pass holders and staff are never limited.`}
      </p>
    </form>
  );
}

/**
 * The three download-branding switches (migration 0138). They only remove
 * pieces from a branded (pass or free) download; staff downloads are never
 * branded whatever they say.
 */
const BRANDING_SWITCHES: { key: keyof BrandingParts; label: string }[] = [
  { key: "watermark", label: "Watermark: a light diagonal “PYQ Vault” behind every page" },
  { key: "siteUrl", label: "Site address: “www.pyqvault.com” in every page footer (page numbers always print)" },
  { key: "nameLine", label: "Name line: “PYQ Vault” above the paper title (PDF only)" },
];

function BrandingSwitches({
  settings,
  busy,
  onSave,
}: {
  settings: PaywallSettings;
  busy: boolean;
  onSave: (parts: BrandingParts) => Promise<void>;
}) {
  const [parts, setParts] = useState<BrandingParts>({
    watermark: settings.brandWatermark,
    siteUrl: settings.brandSiteUrl,
    nameLine: settings.brandNameLine,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void onSave(parts);
      }}
      className="space-y-3 py-4 first:pt-0 last:pb-0"
    >
      <p className="text-sm font-medium">Branding on student downloads</p>
      {BRANDING_SWITCHES.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={parts[key]}
            onChange={(e) => setParts({ ...parts, [key]: e.target.checked })}
            className="h-4 w-4 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {label}
        </label>
      ))}
      <Button type="submit" disabled={busy}>
        {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
        Save
      </Button>
      <p className="text-xs text-muted-foreground">
        Applies to Premium Pass and free downloads from the next file on. Institute staff downloads are never branded.
      </p>
    </form>
  );
}
