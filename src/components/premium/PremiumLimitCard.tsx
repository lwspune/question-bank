import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PassCta } from "@/lib/billing/plans";
import { pricingHref } from "@/lib/billing/checkoutReturn";

/**
 * Where a free limit is reached (migration 0134, 2026-10-05): the drill, the
 * projected score. Same shape as the mock start page's pass card, so every
 * limit reads as one product. Name what they've used and what comes back
 * free, never a bare "upgrade". `returnTo` brings them back after paying.
 */
export default function PremiumLimitCard({
  title,
  body,
  pass,
  returnTo,
}: {
  title: string;
  body: string;
  /** null = no pass on sale; the button links to /pricing. */
  pass: PassCta | null;
  returnTo: string;
}) {
  return (
    <div className="rounded-lg border-2 border-brand-accent/40 bg-card p-5 text-center">
      <Lock className="mx-auto h-5 w-5 text-brand-accent" aria-hidden />
      <p className="mt-2 font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{body}</p>
      <Button asChild variant="brand" size="lg" className="mt-4 w-full sm:w-auto">
        <Link href={pricingHref(pass?.urlKey ?? null, returnTo)}>
          {pass ? `Get the ${pass.label}: ${pass.price}` : "See passes"}
        </Link>
      </Button>
    </div>
  );
}
