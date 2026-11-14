"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleCheck, Copy, Download, EllipsisVertical, Share, Smartphone, SquarePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { SITE_URL } from "@/lib/brand";
import { installAction, type InstallAction, type InstallPlatform } from "@/lib/install/platform";
import { currentPlatform, hasInstallPrompt, runInstallPrompt, subscribeInstallPrompt } from "@/lib/install/client";

const APP_URL = `${SITE_URL}/app`;

/**
 * The card at the top of /app: the ONE thing this visitor's phone needs
 * (lib/install/platform.ts decides which). The page around it carries every
 * set of steps as static text, so it reads fine before this mounts, without
 * JavaScript, and to a search engine.
 */
export default function InstallCard() {
  const [platform, setPlatform] = useState<InstallPlatform | null>(null);
  const [canPrompt, setCanPrompt] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPlatform(currentPlatform());
    setCanPrompt(hasInstallPrompt());
    return subscribeInstallPrompt(() => setCanPrompt(hasInstallPrompt()));
  }, []);

  if (platform === null) {
    // Same height as the shortest card, so the steps below do not jump on mount.
    return <div className="min-h-[9rem] rounded-xl border bg-card p-5" aria-hidden />;
  }

  const action: InstallAction = installAction(platform, canPrompt);

  async function onInstall() {
    setBusy(true);
    const outcome = await runInstallPrompt();
    setBusy(false);
    if (outcome === "unavailable") return;
    trackFunnel("app_install_click", { outcome, platform: platform ?? "unknown" });
    if (outcome === "accepted") toast.success("Installing PYQ Vault. Look for its icon on your home screen.");
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(APP_URL);
      toast.success("Link copied. Paste it into Chrome or Safari.");
    } catch {
      toast.error(`Could not copy. Type ${APP_URL.replace("https://", "")} into Chrome or Safari.`);
    }
  }

  return (
    <section aria-labelledby="install-card-title" className="rounded-xl border bg-card p-5 sm:p-6">
      {action === "button" && (
        <>
          <CardTitle icon={<Download className="h-5 w-5" aria-hidden />}>Install PYQ Vault</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {platform === "desktop" ? "One click adds it to your computer" : "One tap adds it to your home screen"}. It
            opens in its own window, like any other app.
          </p>
          <Button variant="brand" size="lg" className="mt-4 w-full sm:w-auto" onClick={onInstall} disabled={busy}>
            <Download className="mr-2 h-4 w-4" aria-hidden />
            {busy ? "Opening…" : "Install app"}
          </Button>
        </>
      )}

      {action === "android-steps" && (
        <>
          <CardTitle icon={<Smartphone className="h-5 w-5" aria-hidden />}>Install it from your browser menu</CardTitle>
          <ol className="mt-3 space-y-2 text-sm">
            <Step n={1}>
              Tap the menu <EllipsisVertical className="inline h-4 w-4 align-text-bottom" aria-label="three dots" /> at
              the top right.
            </Step>
            <Step n={2}>
              Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
            </Step>
            <Step n={3}>Tap Install. PYQ Vault appears on your home screen.</Step>
          </ol>
        </>
      )}

      {action === "ios-steps" && (
        <>
          <CardTitle icon={<Smartphone className="h-5 w-5" aria-hidden />}>Add it to your Home Screen</CardTitle>
          <ol className="mt-3 space-y-2 text-sm">
            <Step n={1}>
              Tap Share <Share className="inline h-4 w-4 align-text-bottom" aria-label="the Share button" /> at the
              bottom of the screen (at the top on iPad).
            </Step>
            <Step n={2}>
              Scroll down and tap <strong>Add to Home Screen</strong>{" "}
              <SquarePlus className="inline h-4 w-4 align-text-bottom" aria-hidden />.
            </Step>
            <Step n={3}>Tap Add. PYQ Vault appears on your Home Screen.</Step>
          </ol>
        </>
      )}

      {action === "open-in-browser" && (
        <>
          <CardTitle icon={<Smartphone className="h-5 w-5" aria-hidden />}>Open this page in Chrome or Safari first</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            You are in another app&rsquo;s built-in browser, which cannot install anything. Tap its menu and choose{" "}
            <strong>Open in browser</strong>, or copy the link and paste it into Chrome (Android) or Safari (iPhone).
          </p>
          <Button variant="outline" className="mt-4 w-full sm:w-auto" onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" aria-hidden />
            Copy link
          </Button>
        </>
      )}

      {action === "already" && (
        <>
          <CardTitle icon={<CircleCheck className="h-5 w-5" aria-hidden />}>You&rsquo;re using the app</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            PYQ Vault is installed on this device. Want a reminder when mistakes are waiting to be fixed? Turn it on in{" "}
            <Link href="/account" className="text-brand-accent underline">
              Account
            </Link>
            .
          </p>
        </>
      )}

      {action === "use-phone" && (
        <>
          <CardTitle icon={<Smartphone className="h-5 w-5" aria-hidden />}>Install it on your phone</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Open <strong>www.pyqvault.com/app</strong> on your phone and follow the steps there. On a computer, PYQ
            Vault works best right here in the browser.
          </p>
        </>
      )}
    </section>
  );
}

function CardTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 id="install-card-title" className="flex items-center gap-2 text-lg font-semibold">
      <span className="icon-tile grid h-9 w-9 shrink-0 place-items-center rounded-xl">{icon}</span>
      {children}
    </h2>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand-accent">
        {n}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  );
}
