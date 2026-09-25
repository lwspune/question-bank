"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";

/**
 * Starts (or resumes) an attempt, then routes into the runner.
 *
 * On a bilingual paper (MPSC prints Marathi + English) the student picks the
 * language to sit it in first. The choice is the shared page-wide preference,
 * so the runner opens in it — and can still switch mid-test, as the printed
 * booklet lets a candidate read either version at any time.
 */
export default function StartMock({ slug, bilingual = false }: { slug: string; bilingual?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useQuestionLang();

  async function start() {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock/${slug}/start`, { method: "POST" });
      const data = await res.json();
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
  if (!bilingual) return button;
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
    </div>
  );
}
