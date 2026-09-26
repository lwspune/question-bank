import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-1-and-2";

export const INDUSTRY_NOTE: SubtopicNote = {
  subtopicName: "Industrial Processes, Minerals, Hydrogen Compounds and Alloys",
  title: "Hydrogen and H₂O₂, the Solvay Process, Minerals and Alloys",
  oneLineDefinition:
    "The chapter's applied facts: how pure hydrogen, water gas and hydrogen peroxide are made, what the Solvay process recycles and leaves behind, and which formula or metal pair a mineral or alloy stands for.",
  whyItMatters:
    "15 PYQs, all EASY or MODERATE, and every one a named fact — hydrogen and H₂O₂ (6), the Solvay process and lime (3), minerals, alloys and uses (6). " +
    "Three tables to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetg12-hydrogen-and-peroxide",
      name: "Dihydrogen, Water Gas and Hydrogen Peroxide",
      intuition:
        "Each method is a pair to learn: the method and what it gives. The purest hydrogen comes from electrolysing warm barium hydroxide solution; steam over hot coke gives water gas, CO + H₂; and the shift reaction then turns the CO into more H₂ over an Fe–Cr catalyst.",
      definition:
        "- **H₂ purer than 99.5%**: electrolysis of **warm aqueous Ba(OH)₂** with Ni electrodes.\n" +
        "- **Water gas**: C + H₂O → **CO + H₂**.\n" +
        "- **Water-gas shift** (~500 °C): CO + H₂O ⇌ CO₂ + H₂, catalyst **Fe–Cr** (iron chromate).\n" +
        "- **Haber process**: Fe catalyst with **Mo** promoter.\n" +
        "- **Merck process for H₂O₂**: **Na₂O₂** + cold dilute H₂SO₄.\n" +
        "- **H₂O₂**: pale blue in the pure state; **miscible with water in all proportions**; strength given in volumes; oxidising AND reducing agent.",
      table: {
        columns: ["Process or fact", "Answer"],
        rows: [
          { cells: ["H₂ with purity > 99.5%", "Electrolysis of warm aq. Ba(OH)₂"], pyqExampleId: "4aaa8efd-4b90-41b9-9b94-d46b94b6278e" },
          { cells: ["Water gas", "**CO + H₂**"], pyqExampleId: "a6d30155-9706-4536-997e-09b40ec275ae" },
          { cells: ["Catalyst for CO + H₂O ⇌ CO₂ + H₂ at 500 °C", "**Fe–Cr**"], pyqExampleId: "57cecff1-aa50-4665-aa87-4edd30d4cd9d" },
          { cells: ["Catalyst in the Haber process", "**Mo/Fe**"], pyqExampleId: "d3378699-e385-4ce9-a9a9-6609c02a9ebc" },
          { cells: ["H₂O₂ by Merck process — starting material", "**Na₂O₂**"], pyqExampleId: "ee8e7dbd-4433-4f08-b472-4c5b191ad188" },
          { cells: ["H₂O₂ and water", "**Miscible** in all proportions"], pyqExampleId: "7890214d-dcbe-46c7-bf97-c4d4cab95fbe" },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT a property of hydrogen peroxide: immiscible in water; pale blue when pure; strength in volumes; both oxidising and reducing?",
        steps: ["H₂O₂ mixes with water completely."],
        answer: "It is immiscible in water",
      },
      pyqExampleId: "57cecff1-aa50-4665-aa87-4edd30d4cd9d",
    },
    {
      kind: "reference" as const,
      slug: "cetg12-solvay-and-lime",
      name: "The Solvay Process and Slaked Lime",
      intuition:
        "Solvay makes sodium carbonate from brine, ammonia and CO₂. The expensive ammonia ends up as NH₄Cl, so slaked lime is added to get it back — which is why calcium chloride is the process's waste product.",
      definition:
        "- NaCl + NH₃ + CO₂ + H₂O → **NaHCO₃**↓ + NH₄Cl; NaHCO₃ is heated to Na₂CO₃.\n" +
        "- **Ammonia recovery**: 2NH₄Cl + Ca(OH)₂ → CaCl₂ + **2NH₃** + 2H₂O.\n" +
        "- **By-product**: **CaCl₂**.\n" +
        "- **CO₂ through lime water**: Ca(OH)₂ + CO₂ → **CaCO₃**↓ (milky).",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Recovered when NH₄Cl meets slaked lime", "**NH₃**"], pyqExampleId: "7c7689fe-caa7-4700-85da-13be0557033f" },
          { cells: ["By-product of the Solvay process", "**Calcium chloride**"], pyqExampleId: "d878161b-5d48-43de-b615-6d04907c5340" },
          { cells: ["CO₂ bubbled through slaked lime", "**CaCO₃** precipitate"], pyqExampleId: "404bd562-ac0c-4d3a-a66b-4434976fba83" },
        ],
      },
      selfCheckExample: {
        prompt: "Which by-product does the Solvay process leave: ammonium carbonate, sodium bicarbonate, calcium chloride, ammonium chloride?",
        steps: ["NH₄Cl is recycled to NH₃ with lime, leaving CaCl₂."],
        answer: "Calcium chloride",
      },
      pyqExampleId: "d878161b-5d48-43de-b615-6d04907c5340",
      traps: [
        {
          title: "Picking ammonium chloride as the by-product",
          body: "NH₄Cl forms, but it is not thrown away — it is treated with lime to get the ammonia back. What remains is CaCl₂.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetg12-minerals-alloys-uses",
      name: "Minerals, Alloys and Uses",
      intuition: "Pure recall: a mineral's formula, an alloy's two metals, and the element each use needs.",
      definition:
        "- **Galena** PbS; zinc blende ZnS; gypsum CaSO₄·2H₂O; baryte BaSO₄.\n" +
        "- **Carnallite** KCl·MgCl₂·**6H₂O**; **cleveite** contains uranium (radioactive), and is a source of helium.\n" +
        "- **Brass** Cu + **Zn**; **bronze** Cu + **Sn** (statues, medals, trophies).\n" +
        "- **Radium** — cancer radiotherapy.",
      table: {
        columns: ["Name", "Composition or use"],
        rows: [
          { cells: ["Galena", "**PbS**"], pyqExampleId: "1ae2d008-3159-4945-bbed-9613918d0b7c" },
          { cells: ["Carnallite", "KCl·MgCl₂·**6H₂O**"], pyqExampleId: "7f15d305-4318-42a5-a2b8-16434970aa70" },
          { cells: ["Cleveite", "Contains **radioactive** uranium"], pyqExampleId: "2a9641cb-a51c-49cc-b7d5-5cc2e7862fd1" },
          { cells: ["Brass", "Cu + **Zn**"], pyqExampleId: "b01d0eac-9ce4-4996-bf0e-7f2dca3df97d" },
          { cells: ["Bronze (trophies)", "Cu + **Sn**"], pyqExampleId: "b10717e1-1cba-4b23-b825-63fb044db27d" },
          { cells: ["Radium", "**Cancer treatment**"], pyqExampleId: "52e9a91a-6fb7-42e0-b8f3-4b56593393d0" },
        ],
      },
      selfCheckExample: {
        prompt: "Moles of water in one mole of carnallite?",
        steps: ["KCl·MgCl₂·6H₂O."],
        answer: "6",
      },
      pyqExampleId: "b01d0eac-9ce4-4996-bf0e-7f2dca3df97d",
      traps: [
        {
          title: "Brass or bronze",
          body: "Brass is copper and ZINC; bronze is copper and TIN. Both are offered together every time.",
        },
      ],
    },
  ],
  related: [
    { label: "Group 1 — sodium peroxide, used in the Merck process", href: `${BASE}/cetg12-group-1` },
  ],
};
