import { describe, it, expect } from "vitest";
import { pastPapersJsonLd, serializeJsonLd } from "@/lib/mocks/pastPapersJsonLd";

const WWW = "https://www.pyqvault.com";
const INTL = "https://intl.pyqvault.com";

const base = {
  path: "/mock/exam/clat/download",
  name: "CLAT previous year question papers (2022-2026)",
  description: "CLAT previous year question papers from 2022-2026.",
  papers: [
    { title: "CLAT 2026", href: "/mock/clat-2026/paper" },
    { title: "CLAT 2025", href: "/mock/clat-2025/paper" },
  ],
  breadcrumbs: [
    { href: "/mock", label: "Mocks" },
    { href: "/mock/exam/clat", label: "CLAT" },
    { label: "Past papers" },
  ],
  faq: [
    { q: "Does CLAT have negative marking?", a: "Yes: -0.25 for a wrong answer." },
    { q: "Can I download these papers?", a: "Yes." },
  ],
};

type Node = Record<string, unknown>;
const ofType = (nodes: Node[], type: string) => nodes.find((n) => n["@type"] === type) as Node | undefined;

describe("pastPapersJsonLd", () => {
  it("lists every paper, in page order, with absolute links and the page's titles", () => {
    const page = ofType(pastPapersJsonLd(base), "CollectionPage")!;
    expect(page.url).toBe(`${WWW}/mock/exam/clat/download`);
    expect(page.name).toBe(base.name);
    expect(page.description).toBe(base.description);
    const list = page.mainEntity as Node;
    expect(list["@type"]).toBe("ItemList");
    expect(list.numberOfItems).toBe(2);
    expect(list.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "CLAT 2026", url: `${WWW}/mock/clat-2026/paper` },
      { "@type": "ListItem", position: 2, name: "CLAT 2025", url: `${WWW}/mock/clat-2025/paper` },
    ]);
  });

  it("marks up exactly the FAQ the page shows", () => {
    const faq = ofType(pastPapersJsonLd(base), "FAQPage")!;
    expect(faq.mainEntity).toEqual(
      base.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    );
  });

  it("gives the breadcrumb trail from Home to this page", () => {
    const crumbs = ofType(pastPapersJsonLd(base), "BreadcrumbList")!;
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${WWW}/` },
      { "@type": "ListItem", position: 2, name: "Mocks", item: `${WWW}/mock` },
      { "@type": "ListItem", position: 3, name: "CLAT", item: `${WWW}/mock/exam/clat` },
      // The current page has no href in the visible trail: it is the page itself.
      { "@type": "ListItem", position: 4, name: "Past papers", item: `${WWW}/mock/exam/clat/download` },
    ]);
  });

  it("uses the intl origin for an exam that lives on intl.pyqvault.com", () => {
    const nodes = pastPapersJsonLd({
      ...base,
      path: "/mock/exam/imat/download",
      papers: [{ title: "IMAT 2025", href: "/mock/imat-2025/paper" }],
      breadcrumbs: [{ href: "/mock", label: "Mocks" }, { label: "Past papers" }],
    });
    const json = JSON.stringify(nodes);
    expect(json).not.toContain(WWW);
    expect(ofType(nodes, "CollectionPage")!.url).toBe(`${INTL}/mock/exam/imat/download`);
    expect((ofType(nodes, "BreadcrumbList")!.itemListElement as Node[])[0].item).toBe(`${INTL}/`);
  });

  it("an exam with no papers yet gets the trail only: no empty list, no FAQ", () => {
    const nodes = pastPapersJsonLd({ ...base, papers: [] });
    expect(nodes.map((n) => n["@type"])).toEqual(["BreadcrumbList"]);
  });

  it("omits the FAQ when there are no questions", () => {
    const nodes = pastPapersJsonLd({ ...base, faq: [] });
    expect(ofType(nodes, "FAQPage")).toBeUndefined();
  });

  it("every node carries the schema.org context", () => {
    for (const n of pastPapersJsonLd(base)) expect(n["@context"]).toBe("https://schema.org");
  });
});

describe("serializeJsonLd", () => {
  it("cannot close the script tag it sits in", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});
