"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import type { MockStartState } from "@/lib/mocks/quota";
import type { PassCta } from "@/lib/billing/plans";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";

/**
 * Starts (or resumes) an attempt, then routes into the runner.
 *
 * On a bilingual paper (MPSC prints Marathi + English) the student picks the
 * language to sit it in first. The choice is the shared page-wide preference,
 * so the runner opens in it — and can still switch mid-test, as the printed
 * booklet lets a candidate read either version at any time.
 *
 * Free-mock limit (migration 0120): past the free mocks, the Start button
 * becomes a Mock Pass card. The page decides from my_mock_quota(); a 402 from
 * the start route (a stale page, a second tab) flips it here too.
 */
export default function StartMock({
  slug,
  bilingual = false,
  startState = { kind: "open" },
  mockPass = null,
}: {
  slug: string;
  bilingual?: boolean;
  startState?: MockStartState;
  /** The pass on sale for unlimited mocks; null = none (the card links to /pricing). */
  mockPass?: PassCta | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useQuestionLang();
  const [state, setState] = useState<MockStartState>(startState);

  async function start() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock/${slug}/start`, { method: "POST" });
      const data = await res.json();
      if (res.status === 402) {
        setState({ kind: "locked", limit: state.kind === "free" ? state.limit : 0 });
        sendActivityOnce(`mock_limit:${slug}`, { kind: "paywall_event", step: "shown", gate: "mock_limit" });
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Could not start the test.");
      if (data.resumed) toast.info("Resuming your in-progress attempt.");
      router.push(`/mock/${slug}/attempt/${data.attemptId}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not start the test.");
      setLoading(false);
    }
  }

  const button = (
    <Button variant="brand" size="lg" className="w-full" onClick={start} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Play className="h-4 w-4" aria-hidden />
      )}
      {loading ? "Starting…" : "Start test"}
    </Button>
  );
  if (state.kind === "locked") return <MockPassCard limit={state.limit} pass={mockPass} />;
  const freeNote =
    state.kind === "free" ? (
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {state.left === 1
          ? "This is your last free mock test."
          : `You have ${state.left} of ${state.limit} free mock tests left.`}
      </p>
    ) : null;
  if (!bilingual) {
    return (
      <div>
        {button}
        {freeNote}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">
          Question language <span lang="mr" className="text-muted-foreground">/ प्रश्नाची भाषा</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          The paper prints every question in Marathi and English. You can switch at any time during the test.
        </p>
        <LanguageSwitch value={lang} onChange={setLang} size="md" className="mt-3" />
      </div>
      {button}
      {freeNote}
    </div>
  );
}

function MockPassCard({ limit, pass }: { limit: number; pass: PassCta | null }) {
  return (
    <div className="rounded-lg border-2 border-brand-accent/40 bg-card p-5 text-center">
      <Lock className="mx-auto h-5 w-5 text-brand-accent" aria-hidden />
      <p className="mt-2 font-semibold">
        {limit > 0 ? `You've used your ${limit} free mock tests` : "You've used your free mock tests"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {pass
          ? `Get the ${pass.label} for unlimited mock tests for ${pass.length}, for ${pass.price}. `
          : "A pass unlocks unlimited mock tests. "}
        Retaking a mock you&apos;ve already started stays free.
      </p>
      <Button asChild variant="brand" size="lg" className="mt-4 w-full">
        <Link href={pass ? `/pricing?plan=${pass.urlKey}` : "/pricing"}>
          {pass ? `Get the ${pass.label}: ${pass.price}` : "See passes"}
        </Link>
      </Button>
    </div>
  );
}
