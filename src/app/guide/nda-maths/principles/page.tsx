import type { Metadata } from "next";
import ComingSoonStub from "@/app/guide/_components/ComingSoonStub";
import { ROUTES } from "../_data/nda-maths";

export const metadata: Metadata = {
  title: "NDA Mathematics Principles — Coming soon",
  description:
    "The ~70 principles behind every NDA Maths question. Coming soon as part of the NDA Mathematics strategy guide.",
  alternates: { canonical: "/guide/nda-maths/principles" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default function Principles() {
  return (
    <ComingSoonStub
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      parentLabel="NDA Mathematics"
      parentHref="/guide/nda-maths"
      pageLabel="Principles"
      pageTitle="The ~70 atoms behind every question"
      pageSubtitle="A catalog of every principle the bank tests — top 20 with per-principle deep dives, plus the long tail organized by domain."
      comingDescription="Each top-20 principle gets its own page with 3–5 worked examples drawn straight from the bank, plus a one-click drill CTA. The remaining ~50 long-tail principles link directly to /browse."
      prev={{
        href: "/guide/nda-maths/strategy",
        label: "Strategy — Score 100+ in 50 hours",
      }}
      next={{
        href: "/guide/nda-maths/compound-tricks",
        label: "Compound Tricks",
      }}
    />
  );
}
