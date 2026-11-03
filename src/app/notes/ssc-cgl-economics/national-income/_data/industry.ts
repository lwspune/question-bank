import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XNI_INDUSTRY_NOTE: SubtopicNote = {
  subtopicName: "Industrial Policy and Reforms",
  title: "Industrial Policy and Reforms",
  oneLineDefinition:
    "India's industrial policies from 1948 to 1980, the 1991 reforms with licensing, foreign investment and disinvestment, and the schemes and zones that promote manufacturing.",
  whyItMatters:
    "Thirty-three questions in the bank, the most on any page in this chapter, and 17 come from the 2025 shifts, many of them assertion-reason pairs. Learn the 1956 and 1991 policies side by side: most statements describe one of them and get one detail wrong.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxniin-policies",
      name: "Industrial policies, 1948 to 1980",
      intuition:
        "After independence the state took the lead in industry because private firms lacked capital. The 1956 policy set the pattern for 35 years: big industries for the state, licences for the rest.",
      definition:
        "In order:\n" +
        "- **1948**: the **first** Industrial Policy Resolution of independent India.\n" +
        "- **1956**: the **socialist pattern** of society, aiming at **growth with equity**. Industries were sorted into **three schedules**: **A** (**17** industries reserved for the **state**), B (mixed) and C (private). The public sector held the **commanding heights**, and **licences** kept private production under government control.\n" +
        "- **1977**: a **tiny** sector, with an investment limit of Rs 1 lakh. **1980**: raised to **Rs 2 lakh**; aims included employment, exports and consumer protection.\n\n" +
        "Background: at independence the main obstacle was a **lack of capital**; the well-run industries were **steel and cotton**. Small units are told from large ones by their **investment**.",
      table: {
        columns: ["Policy", "Remember for"],
        rows: [
          { cells: ["1948", "The first industrial policy"] },
          { cells: ["1956", "Three schedules; 17 in Schedule A; state-led"], pyqExampleId: "9e1af060-d3cc-4b58-ad24-7e4476e1e551" },
          { cells: ["1977", "Tiny sector created (Rs 1 lakh)"] },
          { cells: ["1980", "Tiny-sector limit raised to Rs 2 lakh"], pyqExampleId: "f363b6e8-6eb6-427e-9d67-7dd11e99cbcd" },
        ],
      },
      pyqExampleId: "939de2b8-72ac-4b9b-8b32-848961a69378",
      selfCheckExample: {
        prompt: "Into how many schedules did the 1956 policy divide industry, and what was special about Schedule A?",
        steps: ["It created three schedules: A, B and C.", "Schedule A listed 17 industries reserved for the state."],
        answer: "Three; Schedule A's 17 industries were for the state alone.",
      },
      practiceSet: [
        { prompt: "What was the main obstacle to industry at independence?", answer: "A lack of capital" },
        { prompt: "What was the central theme of the 1956 policy?", answer: "State control of the commanding heights" },
        { prompt: "On what basis are small-scale units told from large ones?", answer: "The amount of investment" },
      ],
      traps: [
        {
          title: "1980 did not seek maximum foreign investment",
          body: "The 1980 policy's aims were employment, exports, capacity use and consumer protection. **Maximum foreign investment** belongs to **1991**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxniin-reforms",
      name: "The 1991 reforms and after",
      intuition:
        "In July 1991 India dismantled most of the licence system and opened to foreign money. Learn what was abolished, what was kept, and the words for selling and freeing public companies.",
      definition:
        "The **New Industrial Policy** of **July 1991**:\n" +
        "- **Liberalisation, privatisation and globalisation**. It touched **all three** sectors.\n" +
        "- It **abolished licensing** for nearly all industries. A short list kept it: **alcohol, cigarettes, explosives**, defence and hazardous chemicals.\n" +
        "- It opened India to **foreign investors**; automatic approval of foreign investment followed (up to **74%** in nine categories by 1997). Its aim was not to raise domestic savings.\n\n" +
        "After 1991:\n" +
        "- **Disinvestment**: selling government shares in public firms. A **minority sale** passes part of a firm to private hands. Critics call it selling the family silver.\n" +
        "- **Navratnas** (1997): public enterprises given more **autonomy** to perform better.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Licence still needed after 1991", "Alcohol, cigarettes, explosives"] },
          { cells: ["Minority sale", "Part of a public firm sold to private owners"], pyqExampleId: "7cfa5fde-55d7-47fd-8029-35b7cec27e9b" },
          { cells: ["Navratna", "Public enterprise given autonomy"], pyqExampleId: "e1bd2efc-b44e-4f3a-8360-9efdd46ed2cb" },
          { cells: ["Year of reforms", "1991"], pyqExampleId: "ef16425b-f68b-47fd-b4eb-675667bff211" },
        ],
      },
      pyqExampleId: "584dfa3e-59bc-4091-ae56-d2fe3d869c56",
      selfCheckExample: {
        prompt: "A statement says licensing was brought back after 1991 to check private monopolies. Is it right?",
        steps: ["The 1991 policy abolished licensing for nearly all industries.", "It was not reimposed to check monopolies."],
        answer: "No: licensing was abolished, not brought back.",
      },
      practiceSet: [
        { prompt: "In which year did India's economic reforms begin?", answer: "1991" },
        { prompt: "Which three words make up LPG?", answer: "Liberalisation, privatisation, globalisation" },
        { prompt: "What does Navratna status give a public enterprise?", answer: "Greater autonomy" },
      ],
      traps: [
        {
          title: "Disinvestment is not criticised for monopoly",
          body: "Disinvestment is criticised as **selling public assets**, not for creating public-sector monopolies. That reason is the false half.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxniin-schemes",
      name: "Ownership, zones and schemes",
      intuition:
        "A few schemes and zones exist to boost manufacturing, and SSC asks what each is for. Ownership types come up too: public, private and joint.",
      definition:
        "Ownership: **public** (**BHEL**), **private** (TISCO), **joint** (public and private together).\n\n" +
        "Zones and schemes:\n" +
        "- **Special Economic Zones** (Act of 2005): **tax and duty concessions** for businesses.\n" +
        "- **Make in India** (2014): **manufacturing**.\n" +
        "- **Production Linked Incentive (PLI)**: incentives on extra sales, to **boost domestic manufacturing** and investment.\n" +
        "- **PM MITRA** parks (Budget 2021-22): the **textile** industry.\n" +
        "- **MSMED Act, 2006**: to promote **micro, small and medium** enterprises.",
      table: {
        columns: ["Scheme", "For"],
        rows: [
          { cells: ["Special Economic Zones", "Tax and duty concessions"], pyqExampleId: "22e70d34-0da0-4267-bbdd-e8d7b4a32d50" },
          { cells: ["Make in India", "Manufacturing"], pyqExampleId: "662a8c57-04ae-45f8-86e9-36b77a908230" },
          { cells: ["PM MITRA", "Textiles"], pyqExampleId: "8f6a7a11-53e1-49e1-9b78-48749af887a8" },
          { cells: ["MSMED Act, 2006", "Micro, small and medium enterprises"], pyqExampleId: "d545a12c-7939-4ec1-b9ba-8e3262e2e914" },
        ],
      },
      pyqExampleId: "509d304a-ffff-4383-a04c-d3247393b419",
      selfCheckExample: {
        prompt: "Match each to its sector: PM MITRA, Make in India. Choose from textiles and manufacturing in general.",
        steps: ["PM MITRA parks are for the textile industry.", "Make in India promotes manufacturing in general."],
        answer: "PM MITRA: textiles. Make in India: manufacturing.",
      },
      practiceSet: [
        { prompt: "Is BHEL public or private?", answer: "Public" },
        { prompt: "What does a joint sector industry mean?", answer: "Owned jointly by the public and private sectors" },
        { prompt: "What is the aim of the PLI scheme?", answer: "To boost domestic manufacturing and investment" },
      ],
      traps: [
        {
          title: "TISCO is private",
          body: "**TISCO** (Tata Steel) is **private**. BHEL and SAIL are public sector.",
        },
      ],
    },
  ],
};
