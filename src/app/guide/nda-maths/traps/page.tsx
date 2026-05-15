import type { Metadata } from "next";
import ComingSoonStub from "@/app/guide/_components/ComingSoonStub";
import { ROUTES } from "../_data/nda-maths";

export const metadata: Metadata = {
  title: "NDA Mathematics Traps — Coming soon",
  description:
    "Distractor patterns NDA reuses and the last-step verification rules that recover marks. Coming soon as part of the NDA Mathematics strategy guide.",
  alternates: { canonical: "/guide/nda-maths/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default function Traps() {
  return (
    <ComingSoonStub
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      parentLabel="NDA Mathematics"
      parentHref="/guide/nda-maths"
      pageLabel="Traps"
      pageTitle="Why students who know the math still lose marks"
      pageSubtitle="Sign-flip distractors. Quadrant traps. Off-by-2 mistakes. The recurring patterns NDA exploits — and the per-chapter verification rule that catches each."
      comingDescription="The correct-answer positional bias, a chapter-by-difficulty sign-flip heatmap, the per-chapter last-step verification rules, and three worked-trap examples."
      prev={{ href: "/guide/nda-maths/trends", label: "Trends" }}
      next={{ href: "/guide/nda-maths", label: "Back to Overview" }}
    />
  );
}
