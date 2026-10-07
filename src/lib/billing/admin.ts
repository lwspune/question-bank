/**
 * Pass-catalogue admin (the /dashboard/pricing page). Service-role writes,
 * because public.plans and paywall_settings carry no write policy by design;
 * the route guard (requireSuperadmin) is the access control. Mirrors
 * src/lib/entitlements/admin.ts.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { BrandingParts } from "@/lib/export/branding";
import { validatePlan, type Plan, type PlanInput } from "./plans";
import { PLAN_COLUMNS, rowToPlan, type PlanRow } from "./plansQuery";
import {
  nextPaywallSettings,
  type PaywallSettings,
  type PaywallSettingsInput,
} from "./paywallSettings";

/** paywall_settings columns ↔ PaywallSettings fields, in one place. */
const SETTINGS_COLUMNS = {
  free_mock_limit: "freeMockLimit",
  counts_from: "countsFrom",
  free_chapter_test_limit: "freeChapterTestLimit",
  chapter_tests_counts_from: "chapterTestsCountsFrom",
  free_drill_per_day: "freeDrillPerDay",
  free_reveals_per_day: "freeRevealsPerDay",
  free_save_limit: "freeSaveLimit",
  projection_trial_days: "projectionTrialDays",
  mock_papers_per_day: "mockPapersPerDay",
  brand_watermark: "brandWatermark",
  brand_site_url: "brandSiteUrl",
  brand_name_line: "brandNameLine",
} as const satisfies Record<string, keyof PaywallSettings>;

type SettingsColumn = keyof typeof SETTINGS_COLUMNS;
const COLUMN_LIST = Object.keys(SETTINGS_COLUMNS).join(", ");

type Err = { kind: "error"; message: string };

export async function listAllPlans(): Promise<{ kind: "ok"; plans: Plan[] } | Err> {
  const { data, error } = await createSupabaseAdminClient()
    .from("plans")
    .select(PLAN_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) return { kind: "error", message: error.message };
  return { kind: "ok", plans: ((data ?? []) as PlanRow[]).map(rowToPlan) };
}

export type UpsertPlanResult =
  | { kind: "ok" }
  | { kind: "invalid"; field: keyof PlanInput; message: string }
  | Err;

/**
 * Create or update a plan. The url_key is fixed once the row exists — four
 * CTAs link by it — so an update ignores an incoming change to it.
 */
export async function upsertPlan(input: PlanInput & { active: boolean }): Promise<UpsertPlanResult> {
  const v = validatePlan(input);
  if (!v.ok) return { kind: "invalid", field: v.field, message: v.message };
  const admin = createSupabaseAdminClient();
  const { data: existing, error: readErr } = await admin
    .from("plans")
    .select("url_key")
    .eq("id", input.id)
    .maybeSingle();
  if (readErr) return { kind: "error", message: readErr.message };
  const row = {
    id: input.id,
    label: input.label.trim(),
    blurb: input.blurb.trim(),
    perks: input.perks.map((p) => p.trim()),
    url_key: existing ? (existing.url_key as string) : input.urlKey,
    amount_paise: input.amountPaise,
    currency: input.currency,
    duration_days: input.durationDays,
    scope: input.scope,
    active: input.active,
    sort_order: input.sortOrder,
    updated_at: new Date().toISOString(),
  };
  const { error } = await admin.from("plans").upsert(row, { onConflict: "id" });
  if (error) return { kind: "error", message: error.message };
  return { kind: "ok" };
}

export async function setPlanActive(id: string, active: boolean): Promise<{ kind: "ok" } | Err> {
  const { error } = await createSupabaseAdminClient()
    .from("plans")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { kind: "error", message: error.message };
  return { kind: "ok" };
}

export async function readPaywallSettings(): Promise<{ kind: "ok"; settings: PaywallSettings } | Err> {
  const { data, error } = await createSupabaseAdminClient()
    .from("paywall_settings")
    .select(COLUMN_LIST)
    .eq("id", true)
    .single();
  if (error) return { kind: "error", message: error.message };
  const row = data as unknown as Record<SettingsColumn, number | string | boolean | null>;
  const settings = {} as Record<keyof PaywallSettings, number | string | boolean | null>;
  for (const [col, field] of Object.entries(SETTINGS_COLUMNS) as [SettingsColumn, keyof PaywallSettings][]) {
    settings[field] = row[col];
  }
  return { kind: "ok", settings: settings as PaywallSettings };
}

export async function savePaywallSettings(
  input: PaywallSettingsInput
): Promise<{ kind: "ok"; settings: PaywallSettings } | { kind: "invalid"; message: string } | Err> {
  const current = await readPaywallSettings();
  if (current.kind !== "ok") return current;
  const decided = nextPaywallSettings(current.settings, input, new Date().toISOString());
  if (!decided.ok) return { kind: "invalid", message: decided.message };
  const { error } = await createSupabaseAdminClient()
    .from("paywall_settings")
    .update({
      ...Object.fromEntries(
        (Object.entries(SETTINGS_COLUMNS) as [SettingsColumn, keyof PaywallSettings][]).map(([col, field]) => [
          col,
          decided.next[field],
        ])
      ),
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);
  if (error) return { kind: "error", message: error.message };
  return { kind: "ok", settings: decided.next };
}

/** The three download-branding switches (migration 0138), saved together. */
export async function saveBrandingSettings(
  parts: BrandingParts
): Promise<{ kind: "ok"; settings: PaywallSettings } | Err> {
  const { error } = await createSupabaseAdminClient()
    .from("paywall_settings")
    .update({
      brand_watermark: parts.watermark,
      brand_site_url: parts.siteUrl,
      brand_name_line: parts.nameLine,
      updated_at: new Date().toISOString(),
    })
    .eq("id", true);
  if (error) return { kind: "error", message: error.message };
  return readPaywallSettings();
}
