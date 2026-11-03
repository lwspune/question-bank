import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 16 Green Chemistry and Nanochemistry. Statements
 * checked against the Balbharati text; most-asked years from the 20 board
 * past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Green Chemistry and Nanochemistry",
  chapterSlug: "green-chemistry-and-nanochemistry",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 16",
  keyPoints: [
    {
      term: "Green chemistry",
      text: "The use of chemistry for pollution prevention by environmentally conscious design of chemical products and processes that reduce or eliminate the use or generation of hazardous substances. The concept was coined by **Paul T. Anastas**, father of green chemistry.",
    },
    {
      term: "Sustainable development",
      text: "Development that meets the needs of the present, without compromising the ability of future generations to meet their own need. It is achieved by adapting the twelve principles of green chemistry.",
    },
    {
      term: "Twelve principles of green chemistry",
      text: "1 Prevention of waste or by-products. 2 Atom economy. 3 Less hazardous chemical synthesis. 4 Designing safer chemicals. 5 Use safer solvents and auxiliaries. 6 Design for energy efficiency. 7 Use of renewable feedstocks. 8 Reduce derivatives. 9 Use of catalysis. 10 Design for degradation. 11 Real-time analysis for pollution prevention. 12 Safer chemistry for accident prevention.",
    },
    {
      term: "Prevention of waste",
      text: "Give priority to preventing waste rather than cleaning it up. Zero waste technology: the waste of one system is raw material for another, e.g. bottom ash of a thermal power station used for cement and bricks.",
    },
    {
      term: "Atom economy",
      text: "A measure of the amount of atoms from the starting materials that are present in the useful products at the end of a chemical process. Good atom economy: most reactant atoms end up in the desired product, so little waste.",
    },
    {
      term: "Safer solvents, safer chemicals, catalysis",
      text: "Use green solvents such as water or supercritical \\(\\ce{CO2}\\) in place of \\(\\ce{CH2Cl2}\\), \\(\\ce{CHCl3}\\), \\(\\ce{CCl4}\\). Adipic acid is now made enzymatically from glucose instead of carcinogenic benzene. Catalysts raise selectivity and cut waste, time and energy.",
    },
    {
      term: "Nanoscience and nanotechnology",
      text: "**Nanoscience**: the study of phenomena and manipulation of materials at atomic, molecular and macromolecular scales, where properties differ significantly from those at a larger scale. **Nanotechnology**: design, characterization, production and application of structures, devices and systems by controlling shape and size at nanometer scale.",
    },
    {
      term: "Nanomaterial",
      text: "A material having structural components with at least one dimension in the nanometer scale, 1-100 nm (\\(1\\ \\text{nm} = 10^{-9}\\ \\text{m}\\)). Larger than single atoms but smaller than bacteria and cells.",
    },
    {
      term: "Dimensions of nanostructures",
      text: "**Zero-dimensional**: all three dimensions in the nanoscale (nanoparticles). **One-dimensional**: two dimensions in the nanoscale (nanowires, nanorods). **Two-dimensional**: one dimension in the nanoscale (thin films).",
    },
    {
      term: "Features of nanoparticles",
      text: "Colour changes (100 gold atoms look red). High surface-to-volume ratio, so faster reaction and greater catalytic activity (Pd, Pt, gold nanoparticles). Melting point falls with size. Cu and Pd clusters are harder. A carbon nanotube can be a conductor or semiconductor.",
    },
    {
      term: "Synthesis of nanomaterials",
      text: "**Bottom up**: components assemble atom by atom, molecule by molecule (colloidal dispersion). **Top down**: bulk material is broken into finer pieces. **Sol-gel process**: wet chemical method based on inorganic polymerization, used for oxide materials.",
    },
    {
      term: "Characterization techniques",
      text: "UV-visible spectroscopy: preliminary confirmation of nanoparticles. **XRD**: particle size, crystal structure, geometry. **SEM**: structure of the surface (morphology). **TEM**: particle size. **FTIR**: absorption by functional groups, binding nature.",
    },
    {
      term: "Applications of nanomaterials",
      text: "**Silver nanoparticles** act as a highly effective bacterial disinfectant and remove E. coli from water. **Carbon black** is used in car tyres to increase their life. **Lotus** leaves are self cleaning (superhydrophobic nanostructures). Sunscreen contains ZnO and \\(\\ce{TiO2}\\) nanoparticles.",
    },
    {
      term: "Advantages and disadvantages of nanotechnology",
      text: "**Advantages**: revolution in electronics and computing; cheaper solar power and efficient energy storage; smart drugs, cure of cancer and diabetes. **Disadvantages**: nano pollution, including air pollution; inhaled nanoparticles can cause lung damage.",
    },
  ],
  formulas: [
    {
      label: "Percent atom economy",
      latex:
        "\\%\\ \\text{atom economy} = \\frac{\\text{formula weight of the desired product}}{\\text{sum of formula weights of all the reactants used}} \\times 100",
    },
    { label: "Nanometer scale", latex: "1\\ \\text{nm} = 10^{-9}\\ \\text{m} \\qquad \\text{nanoscale} = 1 \\text{ to } 100\\ \\text{nm}" },
  ],
  derivations: [
    {
      title: "Calculate the % atom economy of butan-1-ol to 1-bromobutane",
      steps: [
        "\\(\\ce{CH3CH2CH2CH2OH + NaBr + H2SO4 -> CH3CH2CH2CH2Br + NaHSO4 + H2O}\\)",
        "Desired product \\(\\ce{C4H9Br}\\): 137 u. Reactants (4C + 12H + 5O + 1Br + 1Na + 1S): 275 u.",
        "% atom economy = \\(\\frac{137}{275} \\times 100 = 49.82\\%\\) (the book rounds it to 49.81%).",
      ],
    },
    {
      title: "Sol-gel process for the synthesis of nanoparticles",
      steps: [
        "A stable solution of a metal alkoxide (or solvated metal precursor) is made.",
        "Hydrolysis: \\(\\ce{MOR + H2O -> MOH + ROH}\\).",
        "Condensation (gelation): \\(\\ce{MOH + ROM -> M-O-M + ROH}\\), an oxide or alcohol-bridged network (gel).",
        "Aging (gel turns to a solid mass), drying (water and volatile liquids removed), dehydration by heating up to 800 °C.",
      ],
    },
  ],
  diagrams: [
    { title: "Sol-gel process of synthesis of nanoparticles", labels: ["metal alkoxide solution", "hydrolysis and condensation", "sol", "gel", "drying", "dehydration by heating"] },
    { title: "Classification of nanomaterials by dimension", labels: ["0D spheres and clusters", "1D nanofibers, wires and rods", "2D films, plates and networks", "3D nanomaterials"] },
    { title: "Bottom up and top down preparation of nanoparticles", labels: ["bulk material", "top-down: breaking into finer pieces", "bottom-up: atoms and clusters assembling", "nanoparticles"] },
  ],
  mostAsked: [
    { topic: "Applications of nanomaterials: silver nanoparticles as disinfectant, carbon black in tyres, lotus as self cleaning", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Green chemistry: definition, its principles, sustainable development", years: [2026, 2025, 2024, 2023] },
    { topic: "Nanoscience, nanomaterial and one-dimensional nanostructures", years: [2026, 2025, 2024] },
    { topic: "Atom economy: meaning and the formula for % atom economy", years: [2026, 2025] },
    { topic: "Advantages and disadvantages of nanotechnology", years: [2026, 2023, 2022] },
    { topic: "Sol-gel process (hydrolysis reaction) and the technique for the geometry of nanoparticles (XRD)", years: [2024, 2023] },
  ],
  mistakes: [
    {
      title: "Confusing atom economy with yield",
      body: "Atom economy counts the atoms of **all** reactants that reach the desired product. A reaction with 100% yield can still have poor atom economy (about 49.8% for 1-bromobutane).",
    },
    {
      title: "Counting the dimensions the wrong way",
      body: "A one-dimensional nanostructure has **two** dimensions in the nanoscale (nanowire, nanorod); a two-dimensional one has only one (thin film); zero-dimensional has all three (nanoparticle).",
    },
    {
      title: "Naming the wrong technique",
      body: "Geometry and crystal structure: XRD. Surface structure: SEM. Particle size: TEM or XRD. Functional groups: FTIR. First confirmation of nanoparticles: UV-visible.",
    },
    {
      title: "Writing principles without their names",
      body: "The board asks for the principles by name: write the exact name (e.g. Atom economy, Use of catalysis, Design for degradation) and one line of illustration.",
    },
  ],
};

export default sheet;
