import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listAllPlans, readPaywallSettings } from "@/lib/billing/admin";
import PricingAdminClient from "./PricingAdminClient";

export const dynamic = "force-dynamic";

/**
 * /dashboard/pricing — the pass catalogue and the free-mock limit, edited
 * without a deploy. Platform-wide (prices are the same for every org), so
 * superadmin only, like /dashboard/entitlements.
 */
export default async function PricingAdminPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [plans, settings] = await Promise.all([listAllPlans(), readPaywallSettings()]);
  const loadError =
    plans.kind === "error" ? plans.message : settings.kind === "error" ? settings.message : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Pricing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What /pricing sells, and how many mock tests a free account gets. A
            change is live on the next page load. A price change never affects a
            checkout already open, or a pass already bought.
          </p>
        </header>

        <PricingAdminClient
          initialPlans={plans.kind === "ok" ? plans.plans : []}
          initialSettings={settings.kind === "ok" ? settings.settings : { freeMockLimit: null, countsFrom: null }}
          loadError={loadError}
        />
      </main>
    </>
  );
}
