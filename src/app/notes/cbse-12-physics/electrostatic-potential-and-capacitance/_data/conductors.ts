import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EP_CONDUCTORS_NOTE: SubtopicNote = {
  subtopicName: "Electrostatics of Conductors and Dielectrics",
  title: "Conductors and Dielectrics in an Electric Field",
  oneLineDefinition:
    "Why the field inside a conductor is zero and its charge sits on the surface, what happens when conductors are joined by a wire, and how a dielectric is polarised and changes a capacitor.",
  whyItMatters:
    "20 questions. Eighteen were set in board papers: spheres or shells joined by a wire and the charge, potential, field or charge density on each (every year from 2023 to 2026), the charges on the wall of a cavity and the outer surface of a conductor (2024), the field and potential inside a hollow metal sphere (2025), polar molecules and why a dielectric lowers the field (2023, 2024, 2025), and a dielectric or metal sheet placed in a capacitor (2023, 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpep-conductor",
      name: "A conductor in electrostatics",
      intuition:
        "A metal is full of free electrons. Put it in a field and they rush about until their own field cancels the outside field everywhere inside the metal. Once they stop, the inside field is zero, any extra charge has been pushed out to the surface, and the whole conductor is at one potential.",
      definition:
        "Results NCERT lists for a conductor in electrostatics:\n" +
        "- **Inside a conductor, the field is zero.**\n" +
        "- **At the surface, the field is normal to the surface.** A component along the surface would move the surface charges.\n" +
        "- **No excess charge in the interior:** any excess charge sits on the surface.\n" +
        "- **The potential is the same** throughout the conductor and on its surface.\n" +
        "- **Field just outside:** \\(\\vec{E} = \\dfrac{\\sigma}{\\varepsilon_0}\\hat{n}\\), found with a small pill box as the Gaussian surface.\n" +
        "- **Electrostatic shielding:** inside a charge-free cavity of a conductor the field is zero, whatever the charges outside. A charge q placed inside the cavity induces \\(-q\\) on the cavity wall and an extra \\(+q\\) on the outer surface.",
      formula: {
        label: "Field of a charged conductor",
        latex: "E_{\\text{inside}} = 0, \\qquad \\vec{E}_{\\text{surface}} = \\frac{\\sigma}{\\varepsilon_0}\\hat{n}",
      },
      authoredExample: {
        prompt:
          "A conducting sphere of radius 0.3 m carries a charge of 6 nC. Find (a) the surface charge density, (b) the field just outside the surface, (c) the field at 0.6 m from the centre, (d) the field and the potential at the centre.",
        steps: [
          "(a) \\(\\sigma = \\dfrac{Q}{4\\pi R^2} = \\dfrac{6 \\times 10^{-9}}{4\\pi \\times 0.09} = 5.3 \\times 10^{-9}\\ \\text{C m}^{-2}\\).",
          "(b) \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{R^2} = \\dfrac{9 \\times 10^{9} \\times 6 \\times 10^{-9}}{0.09} = 600\\) N/C, normal to the surface.",
          "(c) \\(E = \\dfrac{9 \\times 10^{9} \\times 6 \\times 10^{-9}}{(0.6)^2} = 150\\) N/C.",
          "(d) At the centre, inside the conductor, \\(E = 0\\). The potential is the same as on the surface: \\(V = \\dfrac{9 \\times 10^{9} \\times 6 \\times 10^{-9}}{0.3} = 180\\) V.",
        ],
        answer: "5.3 × 10⁻⁹ C m⁻²; 600 N/C; 150 N/C; zero field and 180 V at the centre",
      },
      selfCheckExample: {
        prompt: "At a point on the surface of a charged conductor, the surface charge density is \\(8.85 \\times 10^{-7}\\ \\text{C m}^{-2}\\). Find the field just outside it.",
        steps: ["\\(E = \\dfrac{\\sigma}{\\varepsilon_0} = \\dfrac{8.85 \\times 10^{-7}}{8.85 \\times 10^{-12}}\\).", "\\(E = 1 \\times 10^{5}\\) N/C, normal to the surface."],
        answer: "1 × 10⁵ N/C, normal to the surface",
      },
      practiceSet: [
        { prompt: "Where does the excess charge on a conductor sit in electrostatics?", answer: "On its surface" },
        { prompt: "What is the electric field inside a charge-free cavity in a conductor?", answer: "Zero, whatever the charges outside" },
        { prompt: "Why must the electric field at the surface of a charged conductor be normal to the surface?", answer: "A component along the surface would make the surface charges move, which cannot happen in the static state" },
        { prompt: "Is the potential inside a charged hollow metal sphere zero?", answer: "No. It is constant and equal to the potential on the surface" },
      ],
      pyqExampleId: "e238d094-b711-488c-80cb-18234c734799",
      traps: [
        {
          title: "Zero field taken as zero potential",
          body: "Inside a conductor the field is zero, so the potential is constant, equal to its surface value. It is zero only if the conductor is earthed.",
        },
        {
          title: "The wrong charge on the cavity wall",
          body: "A charge q in a cavity always induces exactly \\(-q\\) on the cavity wall, wherever it sits in the cavity. The outer surface then carries the conductor's own charge plus q.",
        },
        {
          title: "Using the sheet formula for a conductor",
          body: "Just outside a conductor \\(E = \\sigma/\\varepsilon_0\\). The formula \\(\\sigma/2\\varepsilon_0\\) is for a thin isolated sheet of charge, not for a conductor's surface.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-wire",
      name: "Conductors joined by a wire",
      intuition:
        "A wire turns two conductors into one, and one conductor has one potential. So charge flows through the wire until both are at the same potential, and the total charge does not change. A small sphere needs less charge to reach that potential, but its charge is packed onto a small area, so its surface density and surface field end up larger.",
      definition:
        "- Joined conductors come to a **common potential**; the **total charge is conserved**.\n" +
        "- An isolated sphere of radius R with charge q: \\(V = \\dfrac{q}{4\\pi\\varepsilon_0 R}\\), so its capacitance is \\(C = 4\\pi\\varepsilon_0 R\\).\n" +
        "- Two spheres far apart, joined by a thin wire: \\(\\dfrac{q_1}{R_1} = \\dfrac{q_2}{R_2}\\), so the charges are in the ratio of the radii.\n" +
        "- Common potential: \\(V = \\dfrac{q_1 + q_2}{4\\pi\\varepsilon_0(R_1 + R_2)}\\).\n" +
        "- Surface charge density and surface field go as \\(1/R\\): \\(\\dfrac{\\sigma_1}{\\sigma_2} = \\dfrac{E_1}{E_2} = \\dfrac{R_2}{R_1}\\). The smaller sphere has the larger density and the stronger field at its surface.\n" +
        "- Charge flows from the sphere at higher potential to the one at lower potential.",
      formula: {
        label: "Spheres joined by a wire",
        latex: "\\frac{q_1}{R_1} = \\frac{q_2}{R_2}, \\qquad \\frac{\\sigma_1}{\\sigma_2} = \\frac{E_1}{E_2} = \\frac{R_2}{R_1}",
      },
      authoredExample: {
        prompt:
          "A metal sphere A of radius 2 cm carries a charge of 10 nC. A second sphere B of radius 8 cm is uncharged. They are far apart and are joined by a thin wire. Find the charge on each, their common potential and the ratio of their surface charge densities.",
        steps: [
          "Given: \\(R_A = 0.02\\) m, \\(R_B = 0.08\\) m, total charge \\(Q = 10\\) nC.",
          "Equal potentials: \\(\\dfrac{q_A}{R_A} = \\dfrac{q_B}{R_B}\\), so \\(q_A : q_B = 2 : 8\\). Hence \\(q_A = 2\\) nC and \\(q_B = 8\\) nC.",
          "Common potential: \\(V = \\dfrac{9 \\times 10^{9} \\times 2 \\times 10^{-9}}{0.02} = 900\\) V.",
          "\\(\\dfrac{\\sigma_A}{\\sigma_B} = \\dfrac{R_B}{R_A} = \\dfrac{8}{2} = 4\\).",
        ],
        answer: "2 nC on A, 8 nC on B; 900 V; σA : σB = 4 : 1",
      },
      selfCheckExample: {
        prompt: "Two metal spheres of radii 1 cm and 4 cm, far apart, are joined by a wire. Find the ratio of the electric fields at their surfaces, small sphere to large.",
        steps: ["\\(\\dfrac{E_1}{E_2} = \\dfrac{R_2}{R_1} = \\dfrac{4}{1}\\)."],
        answer: "4 : 1",
      },
      practiceSet: [
        { prompt: "Two conductors are joined by a wire. Which becomes equal for both: charge or potential?", answer: "Potential" },
        { prompt: "After two spheres are joined, which has the larger surface charge density, the smaller or the larger?", answer: "The smaller sphere" },
        { prompt: "What is the capacitance of an isolated metal sphere of radius 9 cm?", answer: "\\(4\\pi\\varepsilon_0 R = 1 \\times 10^{-11}\\) F, that is 10 pF" },
      ],
      pyqExampleId: "9134ee3f-4bb6-4fd3-86cd-34576adbe66d",
      traps: [
        {
          title: "Sharing the charge equally",
          body: "Joined spheres share the potential, not the charge. Equal charges come only when the spheres are the same size.",
        },
        {
          title: "Charge and density going the same way",
          body: "Charge goes as R, but surface density goes as 1/R. The bigger sphere holds more charge and has the smaller density.",
        },
        {
          title: "Forgetting the starting charge on both",
          body: "When both spheres start charged, add both charges first. Find each starting charge from \\(q = \\sigma \\times 4\\pi R^2\\) if a density is given.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpep-dielectric",
      name: "Dielectrics and polarisation",
      intuition:
        "A dielectric has no free charges, but its molecules become tiny dipoles lined up along the field. Inside the material their charges cancel, but on the two faces a layer of bound charge is left over. These bound charges make a field that opposes the outside field. A conductor cancels the outside field completely; a dielectric only reduces it.",
      definition:
        "- A **non-polar** molecule has its centres of positive and negative charge at the same place, so no permanent dipole moment. In a field its charges are pulled slightly apart: an **induced dipole moment**.\n" +
        "- A **polar** molecule has the two centres apart, so it has a **permanent dipole moment**. With no field the dipoles point every way and the net moment is zero; a field lines them up.\n" +
        "- Either way, a dielectric in a field develops a net dipole moment along the field. **Polarisation** P is the dipole moment per unit volume; for a linear isotropic dielectric \\(\\vec{P} = \\chi_e\\vec{E}\\).\n" +
        "- The bound surface charge density \\(\\sigma_p\\) reduces the field: \\(E = \\dfrac{\\sigma - \\sigma_p}{\\varepsilon_0} = \\dfrac{E_0}{K}\\), so \\(K = \\dfrac{\\sigma}{\\sigma - \\sigma_p}\\).\n" +
        "- The dielectric constant \\(K = \\varepsilon/\\varepsilon_0\\) is always greater than 1.",
      table: {
        columns: ["Point", "Polar molecule", "Non-polar molecule"],
        rows: [
          { cells: ["Centres of positive and negative charge", "Separated", "At the same place"] },
          { cells: ["Permanent dipole moment", "Yes", "No"] },
          {
            cells: ["Examples", "HCl, H₂O", "O₂, H₂"],
            pyqExampleId: "99e9167c-e424-42d2-8d84-6868e655159f",
            noteAmber: "Board 2024 asked which of four molecules is polar: HCl.",
          },
          { cells: ["With no external field", "Dipoles point at random, net dipole moment zero", "No dipole moment at all"] },
          { cells: ["In an external field", "Dipoles turn to line up with the field", "An induced dipole moment appears along the field"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "The plates of a charged capacitor produce a field of \\(6 \\times 10^{4}\\) V/m. A slab of dielectric constant 3 is placed in the gap. Find the field inside the slab.",
        steps: ["\\(E = \\dfrac{E_0}{K} = \\dfrac{6 \\times 10^{4}}{3}\\).", "\\(E = 2 \\times 10^{4}\\) V/m."],
        answer: "2 × 10⁴ V/m",
      },
      practiceSet: [
        { prompt: "Does a dielectric contain free charges?", answer: "No. Its charges are bound to its molecules" },
        { prompt: "Why does the field inside a dielectric fall, but not to zero?", answer: "The bound charges on its faces make an opposing field that only partly cancels the applied field" },
        { prompt: "A dielectric has K = 5. What fraction of the applied field remains inside it?", answer: "One fifth" },
      ],
      pyqExampleId: "7f9c7ea4-c49a-47ce-b587-243376e0797d",
      traps: [
        {
          title: "A polar dielectric with a net moment",
          body: "Without a field, the permanent dipoles of a polar dielectric point at random, so the net dipole moment of the sample is zero.",
        },
        {
          title: "The field of the bound charges",
          body: "Inside the slab, the field of the bound surface charges points against the applied field. That is why the net field falls.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpep-filled",
      name: "A dielectric or a metal sheet in a capacitor",
      intuition:
        "Fill the gap of a capacitor with a dielectric and the field falls K times, so for the same charge the potential difference falls K times and the capacitance rises K times. A metal sheet has no field inside at all, so it simply makes the gap shorter. Either way the capacitance goes up.",
      definition:
        "- Gap completely filled with a dielectric: \\(C = \\dfrac{K\\varepsilon_0 A}{d} = KC_0\\). This is how NCERT defines K: the factor by which the capacitance rises.\n" +
        "- A metal sheet of thickness t (less than d) placed parallel to the plates: \\(C = \\dfrac{\\varepsilon_0 A}{d - t}\\), larger than \\(C_0\\). Where the sheet sits in the gap does not matter.\n" +
        "- A dielectric slab of thickness t: \\(C = \\dfrac{\\varepsilon_0 A}{d - t + t/K}\\). It is worked out on the Capacitors page.\n" +
        "- Slabs one behind the other along the field act as capacitors in series; slabs side by side, each covering part of the plate area, act in parallel.",
      formula: {
        label: "Filled gap and metal sheet",
        latex: "C = KC_0 = \\frac{K\\varepsilon_0 A}{d}, \\qquad C_{\\text{sheet}} = \\frac{\\varepsilon_0 A}{d - t}",
      },
      authoredExample: {
        prompt:
          "An air capacitor has plates of area 0.02 m² that are 4 mm apart. Find its capacitance. Then find it (a) with a metal sheet 1 mm thick placed between the plates, (b) with the gap filled instead by a dielectric of K = 3. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}\\).)",
        steps: [
          "Air: \\(C_0 = \\dfrac{\\varepsilon_0 A}{d} = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{4 \\times 10^{-3}} = 4.43 \\times 10^{-11}\\) F, about 44 pF.",
          "(a) Metal sheet: the gap becomes 3 mm. \\(C = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{3 \\times 10^{-3}} = 5.9 \\times 10^{-11}\\) F, about 59 pF.",
          "(b) Filled with K = 3: \\(C = 3C_0 = 1.33 \\times 10^{-10}\\) F, about 133 pF.",
        ],
        answer: "About 44 pF; 59 pF with the sheet; 133 pF with the dielectric",
      },
      selfCheckExample: {
        prompt: "A capacitor with mica of dielectric constant 6 filling its gap has a capacitance of 30 pF. What is its capacitance when the mica is taken out?",
        steps: ["\\(C_0 = \\dfrac{C}{K} = \\dfrac{30}{6}\\).", "\\(C_0 = 5\\) pF."],
        answer: "5 pF",
      },
      practiceSet: [
        { prompt: "Does moving a metal sheet to a new position between the plates change the capacitance?", answer: "No, only its thickness matters" },
        { prompt: "Two dielectric slabs fill the gap, one behind the other along the field. Are they in series or in parallel?", answer: "In series" },
        { prompt: "Can putting a dielectric between the plates ever lower the capacitance?", answer: "No. K is greater than 1, so the capacitance always rises" },
      ],
      pyqExampleId: "98ea3e5b-60f1-49e8-92ee-f8ef4eb700cb",
      traps: [
        {
          title: "Reading the question backwards",
          body: "If C is the value with the dielectric in place, removing it gives C/K, not KC. Decide first which value the question has given you.",
        },
        {
          title: "Series and parallel slabs swapped",
          body: "If the field lines pass through one slab and then the other, the slabs are in series. If the field lines pass through either one or the other, they are in parallel.",
        },
      ],
    },
  ],
};
