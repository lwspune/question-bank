import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_SE_EXTRINSIC_NOTE: SubtopicNote = {
  subtopicName: "Intrinsic and Extrinsic Semiconductors",
  title: "Intrinsic and Extrinsic Semiconductors",
  oneLineDefinition:
    "How a pure semiconductor makes electrons and holes in equal numbers, how doping with a pentavalent or trivalent impurity makes n-type and p-type material, where the donor and acceptor levels sit, and the law ne × nh = ni² that links the two carrier counts.",
  whyItMatters:
    "47 questions. Forty-four were set in board papers, and the board has asked this page every year from 2022 to 2026. A numerical on the law ne × nh = ni² came every year from 2023 to 2026, and the NCERT worked example on a silicon crystal of 5 × 10²⁸ atoms per m³ doped at 1 ppm came back in 2024 and again in 2026. A one-mark MCQ on the energy needed to free a donor's fifth electron came every year from 2023 to 2026. The board also asks the differences between intrinsic and extrinsic semiconductors (2022, 2023, 2026), the band diagrams of n-type and p-type material (2022, 2023, 2025, 2026), which dopant makes n-type or p-type silicon, why a doped crystal stays neutral, how carriers form in a pure crystal, and how its conductivity changes with temperature. The textbook adds its worked example and two exercise MCQs on n-type and p-type silicon.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpse-intrinsic",
      name: "Intrinsic semiconductors: electrons and holes",
      intuition:
        "In a pure Si or Ge crystal every atom shares its four valence electrons with four neighbours in covalent bonds. At very low temperature every bond is whole and nothing can move. Heat breaks a few bonds. Each break frees one electron and leaves one gap, the hole, behind. So carriers are always made in pairs, and a pure crystal always has exactly as many holes as free electrons.",
      definition:
        "How charge carriers are created in an intrinsic semiconductor, one step a line:\n" +
        "- Each Si or Ge atom forms covalent bonds with its four nearest neighbours. At low temperature all bonds are intact and there are no free carriers.\n" +
        "- As the temperature rises, thermal energy breaks a few bonds. The electron set free (charge \\(-q\\)) moves through the crystal and carries current.\n" +
        "- The bond it left has a vacancy with an effective charge \\(+q\\). This vacancy is a **hole**, and it behaves as an apparent free particle with positive charge.\n" +
        "- An electron from a neighbouring bond can jump into the hole, so the hole moves to that neighbour's site. In a field, holes move towards the negative potential.\n" +
        "- So \\(n_e = n_h = n_i\\), the **intrinsic carrier concentration**, and the total current is the electron current plus the hole current.\n" +
        "- Electrons and holes also recombine. At equilibrium the rate of generation equals the rate of recombination.\n" +
        "- **At 0 K** the crystal behaves as an insulator: no bonds are broken, and its resistivity is infinitely large. **As temperature rises** more pairs form, so the conductivity rises steeply and the resistance falls. The plot of conductivity against temperature is a curve that rises more and more steeply.",
      formula: {
        label: "Carriers and current in an intrinsic semiconductor",
        latex: "n_e = n_h = n_i \\qquad I = I_e + I_h",
        symbols: [
          { symbol: "\\(n_e\\)", meaning: "number of free electrons per unit volume" },
          { symbol: "\\(n_h\\)", meaning: "number of holes per unit volume" },
          { symbol: "\\(n_i\\)", meaning: "intrinsic carrier concentration" },
          { symbol: "\\(I_e,\\ I_h\\)", meaning: "electron current and hole current" },
        ],
      },
      authoredExample: {
        prompt:
          "In a pure germanium sample there are \\(2.4 \\times 10^{19}\\) free electrons per m³. In an applied field the free electrons carry a current of 3.6 mA and the holes 1.8 mA. Find the hole concentration and the total current.",
        steps: [
          "Given: \\(n_e = 2.4 \\times 10^{19}\\ \\text{m}^{-3}\\), \\(I_e = 3.6\\) mA, \\(I_h = 1.8\\) mA.",
          "Formula: in a pure semiconductor \\(n_h = n_e\\), and \\(I = I_e + I_h\\).",
          "\\(n_h = 2.4 \\times 10^{19}\\ \\text{m}^{-3}\\).",
          "\\(I = 3.6 + 1.8 = 5.4\\) mA.",
        ],
        answer: "\\(n_h = 2.4 \\times 10^{19}\\ \\text{m}^{-3}\\); total current 5.4 mA",
      },
      selfCheckExample: {
        prompt: "Why does a pure silicon crystal at 0 K not conduct at all?",
        steps: ["At 0 K there is no thermal energy, so no covalent bond breaks.", "With no free electrons and no holes, there are no carriers to carry current."],
        answer: "No bonds are broken at 0 K, so there are no free electrons or holes; it behaves as an insulator",
      },
      practiceSet: [
        { prompt: "In an intrinsic semiconductor \\(n_e = 1.5 \\times 10^{16}\\ \\text{m}^{-3}\\). What is \\(n_h\\)?", answer: "\\(1.5 \\times 10^{16}\\ \\text{m}^{-3}\\)" },
        { prompt: "In an electric field, towards which potential do the holes in a semiconductor move?", answer: "Towards the negative potential, in the direction of the field" },
        { prompt: "What is the resistivity of an intrinsic semiconductor at 0 K?", answer: "Infinitely large: it behaves as an insulator" },
      ],
      pyqExampleId: "c48b9e60-5be6-4470-95f5-66e5e973c9d8",
      traps: [
        {
          title: "Saying a hole is not a vacancy",
          body: "A hole IS the vacancy an electron leaves in a covalent bond, with an effective charge \\(+q\\). Board 2025 marked 'a hole is not necessarily a vacancy' as false.",
        },
        {
          title: "Saying the freed electron moves to fill holes",
          body: "Hole motion is a bound electron from a NEIGHBOURING bond jumping into the vacancy. The electron set free moves on its own as a conduction electron.",
        },
        {
          title: "Giving a semiconductor a metal's temperature trend",
          body: "Heating an intrinsic semiconductor makes MORE electron-hole pairs, so its resistance falls. Only for a metal does the resistance rise with temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-doping",
      name: "Doping: n-type and p-type semiconductors",
      intuition:
        "A pure semiconductor has too few carriers at room temperature to be useful, so no device can be built from it. Adding a few atoms of the right impurity per million changes that. A group 15 atom brings one electron more than a bond needs; a group 13 atom brings one too few and leaves a hole. Either way one kind of carrier floods the crystal, while the crystal as a whole stays neutral.",
      definition:
        "- **Doping:** the deliberate addition of a small amount (a few parts per million) of a suitable impurity to a pure semiconductor. The impurity atoms are **dopants**, and the result is an **extrinsic** (doped) semiconductor.\n" +
        "- **Why it is needed:** the conductivity of an intrinsic semiconductor at room temperature is very low, so no important electronic device can be made from it. Doping raises the conductivity many times.\n" +
        "- **Size condition:** the dopant must not distort the lattice, so its atoms must be nearly the same size as Si or Ge. So dopants are chosen from the neighbouring groups 15 and 13.\n" +
        "- **n-type:** a pentavalent atom (As, Sb, P) uses four electrons in bonds; the fifth is very weakly bound and is set free even at room temperature. The dopant **donates** an electron, so it is a **donor**. Electrons are the majority carriers and holes the minority: \\(n_e \\gg n_h\\).\n" +
        "- **p-type:** a trivalent atom (In, B, Al) bonds with only three neighbours, leaving a vacancy, a hole, in the fourth bond. One **acceptor** atom gives one hole. Holes are the majority carriers and electrons the minority: \\(n_h \\gg n_e\\).\n" +
        "- **Fewer minority carriers:** the many majority carriers raise the rate of recombination, so the dopant also reduces the number of minority carriers.\n" +
        "- **Charge neutrality:** a doped crystal stays neutral. Each extra carrier is matched by an equal and opposite charge on the ionised dopant core fixed in the lattice.",
      table: {
        columns: ["Property", "Intrinsic", "n-type", "p-type"],
        rows: [
          {
            cells: ["Made from", "Pure Si or Ge", "Si or Ge doped with a pentavalent impurity (As, Sb, P)", "Si or Ge doped with a trivalent impurity (In, B, Al)"],
            pyqExampleId: "ff8f1f80-3c16-4a86-bb27-eb1d377c00e8",
            noteAmber: "Board 2024 asked which dopant makes n-type silicon: phosphorus, not Al, B or In.",
          },
          { cells: ["Name of the dopant", "No dopant", "Donor", "Acceptor"] },
          { cells: ["Carrier numbers", "\\(n_e = n_h = n_i\\)", "\\(n_e \\gg n_h\\)", "\\(n_h \\gg n_e\\)"] },
          { cells: ["Majority carriers", "Neither: equal numbers", "Electrons", "Holes"] },
          {
            cells: ["Fixed charge left in the lattice", "None", "Positive donor ions", "Negative acceptor ions"],
            pyqExampleId: "45114019-5ab2-4859-84ba-6c876699c2b4",
            noteAmber: "Board 2025 asked, as assertion and reason, why an n-type semiconductor is not negatively charged.",
          },
          { cells: ["Conductivity", "Very low; depends on temperature", "Much higher; set by the doping", "Much higher; set by the doping"] },
          { cells: ["Net charge", "Neutral", "Neutral", "Neutral"] },
        ],
        caption: "Learn the rows in pairs: a 'distinguish' answer must state each point for both kinds.",
      },
      selfCheckExample: {
        prompt: "Germanium is doped with indium. Name the majority carriers, and give the sign of the charge on the indium ion fixed in the lattice.",
        steps: ["Indium is trivalent, so it is an acceptor and the crystal is p-type.", "It has accepted an electron to complete the fourth bond, so its core is negative."],
        answer: "Holes; the indium ion is negative",
      },
      practiceSet: [
        { prompt: "Name two donor impurities for silicon.", answer: "Any two of arsenic, antimony and phosphorus" },
        { prompt: "Why must a dopant atom be nearly the same size as a silicon atom?", answer: "So that it takes a silicon site without distorting the crystal lattice" },
        {
          prompt:
            "Assertion (A): Doping an intrinsic semiconductor raises its conductivity. Reason (R): Each dopant atom supplies a charge carrier that is freed with very little energy. Choose: (A) both true and R explains A; (B) both true and R does not explain A; (C) A true, R false; (D) both false.",
          answer: "(A): both are true and R explains A",
        },
      ],
      pyqExampleId: "641f8f51-12a1-4ba1-8a05-bc0b08a2f7b3",
      traps: [
        {
          title: "Calling p-type material positively charged",
          body: "Holes are the majority carriers in p-type, but every hole is matched by a negative acceptor ion. Both n-type and p-type crystals are electrically neutral.",
        },
        {
          title: "Saying a doped crystal has only one kind of carrier",
          body: "A doped crystal still has a few minority carriers from thermal breaking of bonds. Board 2025 asked the carriers in Ge doped with boron: holes and a FEW electrons, not holes only.",
        },
        {
          title: "A difference stated for one side only",
          body: "'Intrinsic is pure' is half a point. Write both sides: intrinsic is pure with \\(n_e = n_h\\); extrinsic is doped with \\(n_e \\ne n_h\\).",
        },
        {
          title: "Naming the dopant without its valency",
          body: "Say WHY: arsenic is pentavalent, so it donates an electron and gives n-type. The valency is what earns the mark, not the name alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-donor-levels",
      name: "Donor and acceptor levels in the band diagram",
      intuition:
        "Doping adds new energy levels inside the band gap. A donor's loosely held fifth electron sits on a level just under the conduction band, so a tiny push lifts it into that band. An acceptor's level sits just above the valence band, so a valence electron easily hops onto it and leaves a hole behind. That is why a doped crystal is full of carriers at room temperature while the pure crystal is not.",
      definition:
        "- **n-type:** a **donor level** \\(E_D\\) lies slightly below the bottom \\(E_C\\) of the conduction band. The energy to free the donor's fifth electron is about 0.01 eV for Ge and 0.05 eV for Si.\n" +
        "- Compare the energy to jump the whole forbidden band: about 0.72 eV for Ge and 1.1 eV for Si. So at room temperature most donor atoms are ionised, while very few (about \\(10^{12}\\)) Si atoms are. The conduction band electrons come mostly from the donors.\n" +
        "- **p-type:** an **acceptor level** \\(E_A\\) lies slightly above the top \\(E_V\\) of the valence band. A valence electron moves onto it with a very small energy, leaving a hole in the valence band. At room temperature most acceptors are ionised, so the holes come mostly from the impurity.\n" +
        "- **Effect on the effective gap:** with a dopant, a carrier is made with only this small energy instead of the full \\(E_g\\), so the energy needed to make a carrier is much less in both cases.\n" +
        "- **How to draw at T > 0 K:** the valence band at the bottom and the conduction band above, labelled \\(E_V\\), \\(E_C\\) and \\(E_g\\). For n-type, a dashed line \\(E_D\\) just under \\(E_C\\), many electrons (dots) in the conduction band and a few holes in the valence band. For p-type, a dashed line \\(E_A\\) just over \\(E_V\\), many holes (circles) in the valence band and a few electrons in the conduction band.",
      table: {
        columns: ["Feature", "n-type", "p-type"],
        rows: [
          {
            cells: ["New level", "Donor level \\(E_D\\), just below the conduction band", "Acceptor level \\(E_A\\), just above the valence band"],
            pyqExampleId: "9370262a-cc29-4a5c-bb68-a906065c027e",
            noteAmber: "Board 2024 marked 'the donor level is just above the valence band' as false.",
          },
          {
            cells: ["Energy to free the carrier", "About 0.01 eV in Ge, 0.05 eV in Si", "Very small, of the same order"],
            pyqExampleId: "44aba8f1-0673-44c9-8688-d95cd3adc755",
            noteAmber: "Board 2024 and 2026 asked the energy to free the fifth electron in Ge: about 0.01 eV.",
          },
          { cells: ["Carriers at T > 0 K", "Many electrons in the conduction band, few holes", "Many holes in the valence band, few electrons"] },
          {
            cells: ["Effect on the energy needed to make a carrier", "Reduced: only \\(E_C - E_D\\) is needed", "Reduced: only \\(E_A - E_V\\) is needed"],
            pyqExampleId: "89bf1338-8551-4c06-9812-afc6766a0764",
            noteAmber: "Board 2024 asked how the energy gap effectively changes with each kind of dopant.",
          },
          {
            cells: ["What to label on the diagram", "\\(E_C\\), \\(E_D\\), \\(E_V\\), \\(E_g\\), electrons in the conduction band", "\\(E_C\\), \\(E_A\\), \\(E_V\\), \\(E_g\\), holes in the valence band"],
            pyqExampleId: "e3791bd6-605d-4f01-8af7-9b653e7474da",
            noteAmber: "Board 2023 asked the band diagrams of n-type and p-type semiconductors at T > 0 K.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "In which semiconductor is a new level drawn just above the valence band, and what is that level called?",
        steps: ["A trivalent dopant leaves a vacancy that a valence electron can fill with little energy.", "That level sits just above \\(E_V\\)."],
        answer: "p-type; the acceptor level",
      },
      practiceSet: [
        { prompt: "About how much energy frees the fifth electron of a pentavalent atom in germanium?", answer: "About 0.01 eV" },
        {
          prompt: "Why is a doped crystal full of carriers at room temperature when the pure crystal has very few?",
          answer: "The dopant's carriers need only about 0.01 to 0.05 eV to be freed, far less than the band gap of about 0.7 to 1.1 eV",
        },
        { prompt: "Where does the donor level lie in an n-type band diagram?", answer: "Slightly below the bottom of the conduction band" },
      ],
      pyqExampleId: "9097594b-004f-4008-aaf3-d29318c851a7",
      traps: [
        {
          title: "Putting the donor level near the valence band",
          body: "The donor level is just BELOW the conduction band; the acceptor level is just ABOVE the valence band. Swapping them is the usual slip.",
        },
        {
          title: "Using the band gap for the donor energy",
          body: "0.72 eV and 1.1 eV are the band gaps of Ge and Si. Freeing a donor's electron needs only about 0.01 eV (Ge) or 0.05 eV (Si).",
        },
        {
          title: "Unlabelled or empty band diagrams",
          body: "'At T > 0 K' means you must show carriers: electrons in the conduction band for n-type, holes in the valence band for p-type, with \\(E_D\\) or \\(E_A\\) marked. A bare pair of boxes loses the diagram marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpse-mass-action",
      name: "The law ne × nh = ni² for a doped semiconductor",
      intuition:
        "Doping adds lots of one carrier, and the extra carriers meet and recombine with the other kind more often. So when one carrier count goes up, the other comes down, and their product stays fixed at the value for the pure crystal at that temperature. Given any two of the three numbers, you can find the third.",
      definition:
        "- In thermal equilibrium, for any semiconductor at a given temperature: \\(n_e n_h = n_i^2\\).\n" +
        "- In n-type, nearly every donor gives one electron, so \\(n_e \\approx N_D\\), the number of donor atoms per m³. Then \\(n_h = n_i^2 / n_e\\).\n" +
        "- In p-type, \\(n_h \\approx N_A\\), the number of acceptor atoms per m³, and \\(n_e = n_i^2 / n_h\\).\n" +
        "- **1 ppm** means one dopant atom per \\(10^{6}\\) host atoms: \\(N = 10^{-6} \\times\\) the number of host atoms per m³.\n" +
        "- The intrinsic value \\(n_i\\) is given in the question, or is the equal electron and hole count before doping.\n" +
        "- Say which type is formed: if doping raised \\(n_e\\) it is n-type (pentavalent dopant); if it raised \\(n_h\\) it is p-type (trivalent dopant).\n" +
        "- **Units:** \\(1\\ \\text{cm}^{-3} = 10^{6}\\ \\text{m}^{-3}\\).",
      formula: {
        label: "Law of mass action for carriers",
        latex: "n_e\\,n_h = n_i^2 \\qquad n_e \\approx N_D\\ (\\text{n-type}), \\quad n_h \\approx N_A\\ (\\text{p-type})",
        symbols: [
          { symbol: "\\(N_D\\)", meaning: "number of donor atoms per m³" },
          { symbol: "\\(N_A\\)", meaning: "number of acceptor atoms per m³" },
          { symbol: "\\(n_i\\)", meaning: "carrier concentration of the pure crystal at the same temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "A silicon sample with \\(n_i = 2 \\times 10^{16}\\ \\text{m}^{-3}\\) is doped with \\(4 \\times 10^{21}\\) phosphorus atoms per m³. Find the electron and hole concentrations and name the type of semiconductor.",
        steps: [
          "Given: \\(N_D = 4 \\times 10^{21}\\ \\text{m}^{-3}\\), \\(n_i = 2 \\times 10^{16}\\ \\text{m}^{-3}\\).",
          "Phosphorus is pentavalent, so each atom gives one electron: \\(n_e \\approx N_D = 4 \\times 10^{21}\\ \\text{m}^{-3}\\).",
          "Formula: \\(n_h = \\dfrac{n_i^2}{n_e}\\).",
          "\\(n_h = \\dfrac{(2 \\times 10^{16})^2}{4 \\times 10^{21}} = \\dfrac{4 \\times 10^{32}}{4 \\times 10^{21}} = 1 \\times 10^{11}\\ \\text{m}^{-3}\\).",
          "Electrons are the majority carriers, so the sample is n-type.",
        ],
        answer: "\\(n_e = 4 \\times 10^{21}\\ \\text{m}^{-3}\\), \\(n_h = 1 \\times 10^{11}\\ \\text{m}^{-3}\\); n-type",
      },
      selfCheckExample: {
        prompt:
          "A pure semiconductor has \\(n_i = 3 \\times 10^{10}\\ \\text{m}^{-3}\\). After doping, the electron concentration is \\(9 \\times 10^{14}\\ \\text{m}^{-3}\\). Find the hole concentration and the type.",
        steps: ["\\(n_h = \\dfrac{n_i^2}{n_e} = \\dfrac{9 \\times 10^{20}}{9 \\times 10^{14}}\\).", "\\(n_h = 1 \\times 10^{6}\\ \\text{m}^{-3}\\). Electrons are the majority carriers."],
        answer: "\\(1 \\times 10^{6}\\ \\text{m}^{-3}\\); n-type",
      },
      practiceSet: [
        {
          prompt:
            "A Si crystal has \\(5 \\times 10^{28}\\) atoms per m³ and is doped with boron at 2 ppm. Given \\(n_i = 1.5 \\times 10^{16}\\ \\text{m}^{-3}\\), find the hole and electron concentrations.",
          answer: "\\(n_h = 1 \\times 10^{23}\\ \\text{m}^{-3}\\), \\(n_e = 2.25 \\times 10^{9}\\ \\text{m}^{-3}\\)",
        },
        { prompt: "Write \\(3 \\times 10^{12}\\ \\text{cm}^{-3}\\) in \\(\\text{m}^{-3}\\).", answer: "\\(3 \\times 10^{18}\\ \\text{m}^{-3}\\)" },
        {
          prompt: "In a doped semiconductor \\(n_e = 2 \\times 10^{20}\\ \\text{m}^{-3}\\) and \\(n_h = 5 \\times 10^{11}\\ \\text{m}^{-3}\\). Find \\(n_i\\).",
          answer: "\\(n_i = 1 \\times 10^{16}\\ \\text{m}^{-3}\\)",
        },
      ],
      pyqExampleId: "dec8660f-d2bf-4f84-89c9-7f44e1e08637",
      traps: [
        {
          title: "Multiplying instead of dividing",
          body: "The minority count is \\(n_i^2\\) DIVIDED by the majority count. Multiplying gives a number like \\(10^{38}\\ \\text{m}^{-3}\\), more carriers than there are atoms, which the board puts in as a wrong option.",
        },
        {
          title: "Forgetting the cube in the unit change",
          body: "\\(1\\ \\text{cm} = 10^{-2}\\) m, so \\(1\\ \\text{cm}^{-3} = 10^{6}\\ \\text{m}^{-3}\\), not \\(10^{2}\\). Convert before comparing with options given in \\(\\text{m}^{-3}\\).",
        },
        {
          title: "Not naming the type",
          body: "These questions usually also ask the type of semiconductor or dopant. State it with the reason: the carrier that rose is the majority carrier.",
        },
      ],
    },
  ],
};
