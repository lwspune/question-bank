import type { Metadata } from "next";
import ComingSoonStub from "@/app/guide/_components/ComingSoonStub";
import { ROUTES } from "../_data/nda-maths";

export const metadata: Metadata = {
  title: "NDA Mathematics Trends — Coming soon",
  description:
    "How NDA Mathematics has shifted from 2021 to 2026. Coming soon as part of the NDA Mathematics strategy guide.",
  alternates: { canonical: "/guide/nda-maths/trends" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default function Trends() {
  return (
    <ComingSoonStub
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      parentLabel="NDA Mathematics"
      parentHref="/guide/nda-maths"
      pageLabel="Trends"
      pageTitle="NDA Mathematics 2025 is not the NDA Mathematics from 2021"
      pageSubtitle="The big shifts: modulus jumped 4 → 15 in 2023. Vieta declined 13 → 5. Determinants halved. Cube roots of unity appeared post-2022."
      comingDescription="Year-by-year principle frequency tables plus 4 callout cards covering the biggest shifts. The page will recommend practicing 2025 + 2026 papers first."
      prev={{
        href: "/guide/nda-maths/compound-tricks",
        label: "Compound Tricks",
      }}
      next={{ href: "/guide/nda-maths/traps", label: "Traps" }}
    />
  );
}
