import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_IN_TRADE_NOTE: SubtopicNote = {
  subtopicName: "Exchange Rates and Trade Policy",
  title: "Exchange Rates and Trade Policy",
  oneLineDefinition:
    "Fixed and floating exchange rates, what a weaker rupee does to exports, imports and prices, and India's trade agreements and export schemes.",
  whyItMatters:
    "Eleven CDS questions, three of them in 2025. The effect of a falling currency was asked three times (2017 (II), 2023 (II) and 2025 (I)): exports up, imports down, prices up.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecin-exchange-regimes",
      name: "Exchange rate systems",
      intuition:
        "An exchange rate is the price of one currency in another. A government can fix that price and defend it, or let the market set it, or do something in between. The history runs from gold, to a dollar peg, to the floating rates of today.",
      definition:
        "The systems:\n" +
        "- **Fixed rate**: set by **government decision** and kept there by **government action** (the central bank buys and sells foreign currency to hold it).\n" +
        "- **Floating rate**: set by **demand and supply** in the market, **without** government intervention.\n" +
        "- **Managed float**: market-set, but the central bank steps in to smooth sharp swings. India has had a **market-determined, managed rate since 1993**.\n" +
        "- **Classical gold standard** (to 1914): each currency fixed in terms of **gold**.\n" +
        "- **Bretton Woods** (1944 to the early 1970s): currencies **pegged to the US dollar**, and the dollar to gold at **35 dollars an ounce**. It was a system of **pegged**, not floating, rates.\n" +
        "- **Devaluation** is an official cut in a fixed rate (India in **1966** and **1991**); **depreciation** is a fall set by the market.",
      table: {
        columns: ["System", "Rate set by", "Period"],
        rows: [
          { cells: ["Gold standard", "Fixed in terms of gold", "Up to 1914"] },
          { cells: ["Bretton Woods", "Pegged to the dollar, the dollar to gold", "1944 to the early 1970s"] },
          { cells: ["Floating", "The market alone", "Major currencies since 1973"] },
          { cells: ["Managed float", "The market, with central bank smoothing", "India since 1993"] },
        ],
      },
      pyqExampleId: "62f14828-1421-4155-95cf-5cc4cd7d6306",
      practiceSet: [
        { prompt: "Under Bretton Woods, to which currency were other currencies pegged?", answer: "The US dollar" },
        { prompt: "Since which year has India's rupee been market-determined?", answer: "1993" },
        { prompt: "What is the difference between devaluation and depreciation?", answer: "Devaluation is an official cut in a fixed rate; depreciation is a fall set by the market" },
      ],
      traps: [
        {
          title: "Floating means no intervention",
          body: "If governments buy and sell their currency to hold a rate, the rate is **fixed** or **managed**, not floating. And under the gold standard, rates were fixed in terms of **gold**, not the dollar.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecin-devaluation",
      name: "What a weaker rupee does",
      intuition:
        "When the rupee falls, a foreign buyer needs fewer dollars to buy the same Indian goods, so Indian exports become cheaper abroad. An Indian buyer needs more rupees for the same foreign goods, so imports become dearer at home. Dearer imports, especially oil, push up costs and prices inside India.",
      definition:
        "The effects of a depreciation or devaluation:\n" +
        "- **Exports rise**: Indian goods are **cheaper** in foreign currency.\n" +
        "- **Imports fall**: foreign goods are **dearer** in rupees. Depreciation does **not** make imports cheaper.\n" +
        "- **Domestic inflation rises**: imported inputs and fuel cost more.\n" +
        "- The export gain lasts only if **domestic prices stay constant**. If Indian prices rise as much as the rupee fell, the advantage is wiped out.\n" +
        "- A shock to **crude oil imports** works the same way: **higher input costs and inflation**, a bigger import bill, and a **weaker** rupee.",
      formula: {
        label: "Rupee price of a foreign good",
        latex: "P_{\\text{rupees}} = P_{\\text{dollars}} \\times e",
        symbols: [
          { symbol: "\\(e\\)", meaning: "exchange rate: rupees per dollar" },
        ],
      },
      authoredExample: {
        prompt: "A machine costs 1,000 dollars. The rupee falls from 80 to 88 per dollar. What happens to the machine's price in India, and to the dollar price of an Indian shirt priced at 800 rupees?",
        steps: [
          "Machine before: 1,000 × 80 = 80,000 rupees. After: 1,000 × 88 = 88,000 rupees, 10 per cent dearer.",
          "Shirt before: 800 ÷ 80 = 10 dollars. After: 800 ÷ 88 ≈ 9.09 dollars, cheaper abroad.",
        ],
        answer: "The import costs 10 per cent more in rupees; the export becomes cheaper in dollars.",
      },
      selfCheckExample: {
        prompt: "The rupee rises (appreciates) from 85 to 80 per dollar. What happens to the rupee price of a 50-dollar import?",
        steps: [
          "Before: 50 × 85 = 4,250 rupees.",
          "After: 50 × 80 = 4,000 rupees.",
        ],
        answer: "It falls from 4,250 to 4,000 rupees: a stronger rupee makes imports cheaper.",
      },
      pyqExampleId: "6f80c437-9d46-4a39-9001-fcc6251ca398",
      practiceSet: [
        { prompt: "A 20-dollar import: what does it cost in rupees at 83 rupees per dollar?", answer: "1,660 rupees" },
        { prompt: "For a devaluation to help exports, what must happen to domestic prices?", answer: "They must stay constant" },
        { prompt: "What is the likely short-run effect on the rupee of a sharp rise in the oil import bill?", answer: "It weakens" },
      ],
      traps: [
        {
          title: "A falling rupee makes imports dearer",
          body: "Depreciation **raises** the rupee price of imports. It helps net exports by making **exports cheaper abroad**, not by making imports cheaper.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-trade-policy",
      name: "Trade agreements and export schemes",
      intuition:
        "India signs trade agreements to cut tariffs with partners, and runs schemes to help small and new exporters. Whether an agreement lifts exports depends on more than the tariff cut: the rules for claiming it, the partner's health and safety rules, India's own roads and ports, and the partner's income all matter.",
      definition:
        "The facts:\n" +
        "- **Export gains from an FTA** depend on: the tariff cut **below MFN rates**, the **rules of origin**, **sanitary and phytosanitary** measures, India's **infrastructure**, and the **income** of the partner countries.\n" +
        "- **RCEP** (Regional Comprehensive Economic Partnership): the **10 ASEAN** states and their FTA partners **China, Japan, South Korea, Australia and New Zealand**; signed 2020. **India withdrew in November 2019**, fearing an import surge, above all from China.\n" +
        "- India's newer deals include the **UAE** (CEPA, 2022), **Australia** (ECTA, 2022) and the **EFTA** states (TEPA, 2024).\n" +
        "- India runs a steady **trade surplus with the USA**, its largest export market; with **China** and **Saudi Arabia** it runs **deficits**.\n" +
        "- **Niryat Bandhu** (DGFT): **mentoring** first-generation and new exporters.\n" +
        "- **Districts as Export Hubs** (launched 2019, restated in the **Foreign Trade Policy 2023**): export products identified in **every** district, with logistics and infrastructure support.",
      table: {
        columns: ["Item", "Key fact"],
        rows: [
          {
            cells: ["What FTA export gains depend on", "Tariff cut, rules of origin, SPS rules, home infrastructure, partner income"],
            pyqExampleId: "6848968b-61c0-48e3-b48f-1ffbdd66591c",
          },
          { cells: ["RCEP", "ASEAN plus five partners; India withdrew in 2019"] },
          {
            cells: ["Trade surplus partner", "USA, India's largest export market"],
            pyqExampleId: "8cc2d749-8843-4eb4-b3f7-8472cf329540",
          },
          {
            cells: ["Niryat Bandhu", "Mentoring first-generation exporters"],
            pyqExampleId: "cd9f86c7-1f60-44e7-a302-2db0cc360fbb",
          },
          {
            cells: ["Districts as Export Hubs", "Every district, not a chosen few; 2019"],
            noteAmber: "CDS 2025 (II): limiting DEH to selected districts was the wrong statement.",
            pyqExampleId: "d65da0b4-7bc3-420a-8348-46f1475b646c",
          },
        ],
      },
      pyqExampleId: "ba681bd7-d8e2-43d6-afb9-db13f83a6220",
      selfCheckExample: {
        prompt: "India cuts a tariff for a partner from 10 per cent (the MFN rate) to 4 per cent, but the rules of origin are so strict that few firms can prove their goods qualify. Will exports to India from that partner rise much?",
        steps: [
          "The preference margin is 10 − 4 = 6 points.",
          "A margin helps only goods that can claim it; strict rules of origin keep most goods out.",
        ],
        answer: "Not much: the tariff cut is real, but the rules of origin stop most goods from using it.",
      },
      practiceSet: [
        { prompt: "Which is India's largest export market, with which it runs a trade surplus?", answer: "The USA" },
        { prompt: "Whom does the Niryat Bandhu scheme mentor?", answer: "First-generation and new exporters" },
        { prompt: "Which Foreign Trade Policy restated the Districts as Export Hubs initiative?", answer: "The Foreign Trade Policy 2023" },
        { prompt: "With which country did India sign the CEPA trade deal in 2022?", answer: "The UAE" },
      ],
      traps: [
        {
          title: "Every district, not a few",
          body: "Districts as Export Hubs covers **every** district. A statement that it boosts only selected districts is wrong.",
        },
        {
          title: "Surplus with the USA, deficit with China",
          body: "India sells more to the **USA** than it buys, but buys far more from **China** and **Saudi Arabia** (manufactures and crude oil) than it sells.",
        },
      ],
    },
  ],
};
