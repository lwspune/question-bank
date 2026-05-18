import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideSideNav, { type SideNavItem } from "./GuideSideNav";

type Breadcrumb = {
  href?: string;
  label: string;
};

type Props = {
  guideTitle: string;
  sideNav: SideNavItem[];
  breadcrumbs: Breadcrumb[];
  children: React.ReactNode;
  /** Landing route — passed through to GuideSideNav so the "Overview" link
   *  doesn't activate on every sub-route. Defaults to the first nav item's
   *  href. */
  landingHref?: string;
};

/**
 * Page shell for every /guide/* route. AppHeader + breadcrumbs + side nav +
 * content. GuideSideNav self-toggles between a Sheet trigger (mobile) and a
 * sticky aside (desktop) based on the lg breakpoint, so it can be rendered
 * once.
 */
export default function GuideShell({
  guideTitle,
  sideNav,
  breadcrumbs,
  children,
  landingHref,
}: Props) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-col gap-4 lg:mt-8 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
          <GuideSideNav
            guideTitle={guideTitle}
            items={sideNav}
            landingHref={landingHref}
          />
          <article className="min-w-0 max-w-3xl">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="inline-flex items-center hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
