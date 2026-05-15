import type { Metadata } from "next";
import ComingSoonStub from "@/app/guide/_components/ComingSoonStub";
import { ROUTES } from "../_data/nda-maths";

export const metadata: Metadata = {
  title: "NDA Mathematics Compound Tricks — Coming soon",
  description:
    "The 4 compound recipes that own 30% of the NDA Maths HARD pool. Coming soon as part of the NDA Mathematics strategy guide.",
  alternates: { canonical: "/guide/nda-maths/compound-tricks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default function CompoundTricks() {
  return (
    <ComingSoonStub
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      parentLabel="NDA Mathematics"
      parentHref="/guide/nda-maths"
      pageLabel="Compound Tricks"
      pageTitle="4 recipes that own 30% of the HARD pool"
      pageSubtitle="When two principles appear together — AM-GM + GP, ω + Vieta, AM-GM + AP, extrema + log — the question is reliably hard. Drill the recipes, not the silos."
      comingDescription="Each compound gets a full card: paired principles, sample questions from the bank, why the chain is hard, and a one-click drill of every co-occurring question."
      prev={{
        href: "/guide/nda-maths/principles",
        label: "Principles",
      }}
      next={{ href: "/guide/nda-maths/trends", label: "Trends" }}
    />
  );
}
