/**
 * Content for /guide/nda-chemistry/traps.
 *
 * NDA Chemistry distractor shapes — bucketed by the skill strand they affect
 * (Recall / Rule / Calculate). Each trap: a mechanic (how it works), a fix
 * (the verification habit), and a worked-example UUID from the live bank
 * (where one is available).
 *
 * Different from Physics traps (which are about formula misapplication —
 * sign-flip, unit mix, ratio inversion) and English traps (near-synonym
 * semantic shapes). Chemistry distractors are about IDENTITY CONFUSION —
 * which compound is which, which acid comes from which fruit, which oxide
 * type is which, which is the reducing agent vs oxidising agent. The lever
 * is precise-recall + exact rule-application; verification habit = always
 * state the property/role explicitly before picking an option.
 */

export type TrapBucket = "recall" | "rule" | "calculate";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  bucket: TrapBucket;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // ──────── Recall traps ────────
  {
    id: "acid-source-swap",
    title: "Acid-from-fruit/food source swap",
    bucket: "recall",
    affects: ["acids-bases-and-salts", "carbon-and-its-compounds"],
    mechanic:
      "Distractors swap the well-known acid sources — citric in tomatoes (wrong, that's oxalic), lactic in lemons (wrong, that's citric), acetic in milk (wrong, that's lactic). The trap relies on candidates remembering 'fruit + acid' as one fused fact rather than two paired facts.",
    fix: "Memorise the source ↔ acid pairings as a table, not as bullets. Drill /common-compounds → 'Household acids' cluster. The 8 most-tested: citric=lemons/oranges, oxalic=tomatoes/spinach, lactic=sour milk/muscle, acetic=vinegar, malic=apples, tartaric=grapes, formic=ant sting, HCl=gastric juice.",
    exampleQuestionId: "f6a97e5d-483f-413a-90fd-0beebe94b584",
  },
  {
    id: "diamond-graphite-property-swap",
    title: "Diamond vs graphite property swap",
    bucket: "recall",
    affects: ["carbon-and-its-compounds"],
    mechanic:
      "Both are pure carbon, but their electronic structure is opposite. Distractors say 'diamond conducts electricity' (wrong — that's graphite, sp² delocalised π e⁻) or 'diamond is the more thermodynamically stable form' (wrong — graphite is, despite diamond being harder + denser).",
    fix: "Two facts cold: (a) Diamond INSULATOR (sp³, no free e⁻), Graphite CONDUCTOR (sp², delocalised π). (b) GRAPHITE is thermodynamically more stable; diamond is metastable at STP. Both are pure C — the difference is bonding, not composition.",
    exampleQuestionId: "026fe00b-4845-4f21-baef-28158b2a8263",
  },
  {
    id: "scientist-discovery-pair",
    title: "Scientist–discovery pair swap (atomic-model history)",
    bucket: "recall",
    affects: ["atomic-structure-and-periodic-classification"],
    mechanic:
      "Standard match-list format. Rutherford = quantised orbits (WRONG — Bohr). Bohr = plum pudding (WRONG — Thomson). Dalton = nuclear model (WRONG — Rutherford). Chadwick = electron (WRONG — J.J. Thomson). One pair is correct, others swapped to test exact recall.",
    fix: "Memorise the 4-step history: Dalton (1808) indivisible atom → Thomson (1897) plum pudding + electron → Rutherford (1909) nuclear model from gold-foil + alpha-scattering → Bohr (1913) quantised orbits. Chadwick (1932) discovered the NEUTRON separately. Each scientist gets ONE main contribution.",
  },
  {
    id: "alloy-composition-swap",
    title: "Alloy composition swap",
    bucket: "recall",
    affects: ["metals-and-non-metals", "industrial-and-applied-chemistry"],
    mechanic:
      "Brass = Cu + Sn (WRONG — that's bronze). Bronze = Cu + Zn (WRONG — that's brass). Stainless steel without chromium (WRONG — Cr is essential). German silver contains silver (WRONG — it doesn't). Distractors swap the metals or remove an essential one.",
    fix: "Lock the 4 cardinal alloys: Brass = Cu + Zn. Bronze = Cu + Sn. Stainless steel = Fe + Cr (≥10.5%) + Ni. Solder = Pb + Sn. German silver = Cu + Zn + Ni (no actual Ag). Drill /common-compounds → 'Alloys' cluster to cement the pairings.",
    exampleQuestionId: "2b794abf-d393-4665-b4ac-0b481df22f4d",
  },
  {
    id: "antiseptic-disinfectant-swap",
    title: "Antiseptic vs disinfectant role swap",
    bucket: "recall",
    affects: ["chemistry-in-everyday-life"],
    mechanic:
      "Both kill microbes, but at different intensities. Antiseptic = SAFE for living tissue (Dettol, iodine tincture, hydrogen peroxide). Disinfectant = too strong for skin, surface-only (phenol, bleach, formaldehyde). Distractors treat them as interchangeable or swap examples.",
    fix: "Tag each example by use-site: 'Where would I apply this?' Skin → antiseptic. Surface/floor/bathroom → disinfectant. Phenol on skin = wrong (caustic). Dettol on floor = wasteful but not wrong. The categories overlap chemically; the distinction is concentration + safety.",
  },

  // ──────── Rule traps ────────
  {
    id: "periodic-trend-direction-reversal",
    title: "Periodic-trend direction reversal",
    bucket: "rule",
    affects: ["atomic-structure-and-periodic-classification"],
    mechanic:
      "ACROSS a period: atomic radius DECREASES, IE/EN INCREASE. DOWN a group: radius INCREASES, IE/EN DECREASE. Distractor flips one direction — 'atomic radius increases across a period' is the standard wrong option. Easy to flip when prepping at speed.",
    fix: "Picture the period as 'nuclear charge winning': more protons pulling tighter as you go across → radius ↓, IE ↑, EN ↑. Going DOWN adds a shell → radius ↑, outer e⁻ further from nucleus → IE ↓, EN ↓. Test the direction with a worked example (Li vs F, Na vs Cs) before committing.",
    exampleQuestionId: "5202ef1f-276e-44e2-9f99-0a27097e2be5",
  },
  {
    id: "reducing-vs-oxidising-agent-flip",
    title: "Reducing vs oxidising agent identity flip",
    bucket: "rule",
    affects: ["chemical-reactions"],
    mechanic:
      "REDUCING agent gets OXIDISED (donates e⁻; its ox-state goes UP). OXIDISING agent gets REDUCED (accepts e⁻; ox-state goes DOWN). Distractor swaps the roles — 'Zn is reduced in Zn + CuSO₄' (wrong, Zn is oxidised). Easy to flip if you don't write out the electron flow.",
    fix: "Write LEO RGO above the equation: Loss of Electrons = Oxidation; Reduction = Gain. Assign ox-states before + after. Whichever element INCREASES is oxidised → its source is the REDUCING agent. The 'agent' description is OPPOSITE to what happens TO the species.",
    exampleQuestionId: "8e5c3a7c-968d-49fb-8b11-d063d7aab9e9",
  },
  {
    id: "oxide-classification-error",
    title: "Oxide classification — basic/acidic/amphoteric mix-up",
    bucket: "rule",
    affects: ["acids-bases-and-salts"],
    mechanic:
      "Metal oxide (Na₂O, MgO) = BASIC. Non-metal oxide (CO₂, SO₃) = ACIDIC. Some metal oxides are AMPHOTERIC (Al₂O₃, ZnO, PbO) — react with BOTH acid and base. A few are NEUTRAL (CO, NO, N₂O, H₂O). Distractor places Al₂O₃ as 'basic only' (wrong — amphoteric) or CO as 'acidic' (wrong — neutral).",
    fix: "Two checks: (1) Is the central element a METAL or non-metal? Metal → start with 'basic'; non-metal → 'acidic.' (2) Is it on the short amphoteric list (Al, Zn, Pb, Sn, Be)? Then upgrade to 'amphoteric.' Special neutral cases: CO, NO, N₂O, H₂O — memorise as a 4-item list.",
    exampleQuestionId: "94f12fff-7957-4fe2-9e0d-d231d3aaf0b6",
  },
  {
    id: "hardness-type-removal-swap",
    title: "Hardness type — boiling 'works for permanent' fallacy",
    bucket: "rule",
    affects: ["hydrogen-and-water"],
    mechanic:
      "Temporary hardness (Ca(HCO₃)₂, Mg(HCO₃)₂) → removed by BOILING (bicarbonate decomposes to insoluble carbonate). Permanent hardness (CaSO₄, MgSO₄, CaCl₂, MgCl₂) → NOT removed by boiling (sulphates and chlorides are heat-stable). Distractor lists boiling as a fix for permanent.",
    fix: "Anion test: if the calcium/magnesium counterion is BICARBONATE (HCO₃⁻), boiling works. If it's sulphate, chloride, or nitrate, boiling does nothing — need ion-exchange, lime-soda, or distillation. Drill the 4 permanent-hardness salts as a cluster.",
    exampleQuestionId: "a8897c5d-36f9-440f-838b-e19e74656fc8",
  },
  {
    id: "lewis-vs-arrhenius-base",
    title: "Lewis vs Arrhenius base — NH₃ misclassification",
    bucket: "rule",
    affects: ["acids-bases-and-salts"],
    mechanic:
      "Arrhenius base = releases OH⁻ DIRECTLY in water (NaOH, KOH). Brønsted base = ACCEPTS H⁺ (broader; includes NH₃ because it forms NH₄⁺). Lewis base = donates e⁻ pair (broadest). NH₃ is Brønsted + Lewis but NOT Arrhenius — distractor labels it Arrhenius because it's basic in water (indirectly).",
    fix: "For each base candidate, ask the strictest test: does it have OH⁻ in its formula? If yes → Arrhenius. If no but it accepts H⁺ → Brønsted only. NH₃ has no OH⁻ — it's Brønsted, not Arrhenius. Same logic for Lewis acids (AlCl₃, BF₃, FeCl₃, Cu²⁺) — no H⁺ donor at all, but accept e⁻ pair.",
    exampleQuestionId: "06bbf436-8993-4aa3-88ff-964c53e5e1dd",
  },
  {
    id: "ionic-vs-covalent-en-cutoff",
    title: "Ionic vs covalent — wrong EN-cutoff",
    bucket: "rule",
    affects: ["chemical-bonding"],
    mechanic:
      "ΔEN > 1.7 → ionic; < 1.7 → covalent (rough cutoff). Distractor uses a wrong threshold (e.g. 0.5 or 1.0) or labels HCl ionic (ΔEN = 3.0 − 2.1 = 0.9 → COVALENT despite high polarity). HF, H₂O, NH₃ all have ΔEN > 0.5 but are covalent.",
    fix: "Memorise that hydrogen bonds with non-metals are COVALENT (even if polar). The 1.7 cutoff isolates the typical metal-non-metal cases (NaCl, MgO). Borderline cases (AlCl₃, BeCl₂, HgCl₂) act covalent despite metal-non-metal pairing — Fajans' rules.",
  },

  // ──────── Calculate traps ────────
  {
    id: "equivalent-weight-polyprotic",
    title: "Equivalent weight — polyprotic acid mis-division",
    bucket: "calculate",
    affects: ["mole-concept-and-stoichiometry"],
    mechanic:
      "Equivalent weight = molar mass / basicity (for an acid). H₂SO₄ basicity 2 → 98/2 = 49. H₃PO₄ basicity 3 → 98/3 ≈ 32.7. Oxalic acid C₂H₂O₄·2H₂O molar mass = 126; basicity 2 → 63. Distractor uses molar mass directly (98 for H₂SO₄, 126 for oxalic) — forgetting the divide.",
    fix: "Count replaceable H⁺ first (basicity). For acids: HCl=1, H₂SO₄=2, H₃PO₄=3, CH₃COOH=1 (only one carboxylic H is acidic), H₂C₂O₄=2. For bases: count OH⁻. For salts: count total +ve charge. Then divide molar mass by that number.",
    exampleQuestionId: "6ba46ed2-9561-4bb2-9849-ab894c7769be",
  },
  {
    id: "mole-mass-formula-vs-empirical",
    title: "Mole calculation — molecular formula vs atom count",
    bucket: "calculate",
    affects: ["mole-concept-and-stoichiometry"],
    mechanic:
      "0.5 mol N₂ has mass 0.5 × 28 = 14 g. But the atoms-of-nitrogen count is 0.5 × 2 × N_A = 1 mol of N atoms = 6.022×10²³ atoms. Distractor uses 28 in atom-counting questions or 14 in molecule-counting questions — swaps molecule mass for atom mass.",
    fix: "Read the question's noun carefully: 'molecules of N₂' or 'atoms of N'? Diatomic gas N₂ has 2 N atoms per molecule. mol N atoms = 2 × mol N₂. Same for O₂, H₂, Cl₂. For C₆H₁₂O₆ (glucose): 1 mol contains 6 mol C atoms + 12 mol H + 6 mol O.",
    exampleQuestionId: "c5ddc56b-34ec-4126-9c50-d678db2d9dd8",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  recall: TRAP_SHAPES.filter((t) => t.bucket === "recall"),
  rule: TRAP_SHAPES.filter((t) => t.bucket === "rule"),
  calculate: TRAP_SHAPES.filter((t) => t.bucket === "calculate"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
