import type { SubtopicNote } from "@/app/notes/_types";

export const G13_PB_NOTE: SubtopicNote = {
  subtopicName: "Group 13: Periodic Trends and the Inert Pair Effect",
  title: "Group 13: Periodic Trends and the Inert Pair Effect",
  oneLineDefinition:
    "Boron, aluminium, gallium, indium and thallium (ns² np¹) grow down the group with one break at gallium, and the heavier ones keep their s² pair, so thallium prefers +1 to +3.",
  whyItMatters:
    "Twenty-five PYQs, all multiple choice, and three from 2026. Nine test the trends in atomic and ionic radius, ionisation enthalpy, electronegativity and density; seven ask about boron's hard B₁₂ lattice, gallium's long liquid range and the uses of the elements; nine turn on the inert pair effect, from the stability of Tl⁺ to TlI₃, GaAlCl₄ and the most basic oxide.",
  concepts: [
    // C1 — periodic trends
    {
      kind: "reference" as const,
      slug: "jcpb-g13-periodic-trends",
      name: "Group 13 trends in radius, ionisation enthalpy and electronegativity",
      intuition:
        "Down a group the atom normally grows and holds its electrons less tightly. Group 13 breaks this pattern at gallium. Gallium comes just after the ten 3d elements, and d electrons shield the nucleus poorly, so gallium's outer electrons feel a larger nuclear charge. Gallium is therefore slightly SMALLER than aluminium, and its ionisation enthalpy is slightly higher. The same poor shielding by 4f electrons makes thallium's ionisation enthalpy rise again.",
      definition:
        "- **Atomic radius:** \\(\\mathrm{B < Ga < Al < In < Tl}\\). Gallium is smaller than aluminium.\n" +
        "- **\\(\\mathrm{M^{3+}}\\) ionic radius** rises steadily: \\(\\mathrm{B^{3+} < Al^{3+} < Ga^{3+} < In^{3+} < Tl^{3+}}\\). Only the atomic radius has the break.\n" +
        "- **First ionisation enthalpy** is irregular: highest for B, lowest for In, order \\(\\mathrm{In < Al < Ga < Tl < B}\\). The fall from B to Al is large; from Al to Ga there is almost none.\n" +
        "- **Electronegativity** falls from B to Al, then rises slightly: \\(\\mathrm{Al < Ga < In < Tl < B}\\).\n" +
        "- **Density** rises down the group, from B to Tl.\n" +
        "- The trichlorides and tri-iodides are covalent; a small, highly charged \\(\\mathrm{M^{3+}}\\) polarises a large anion.",
      table: {
        columns: ["Element", "Atomic radius (pm)", "M³⁺ radius (pm)", "First ionisation enthalpy (kJ/mol)", "Electronegativity"],
        rows: [
          { cells: ["B", "85", "27", "801", "2.0"] },
          { cells: ["Al", "143", "53.5", "577", "1.5"] },
          { cells: ["Ga", "135", "62.0", "579", "1.6"], noteAmber: "Smaller than Al and with a slightly higher ionisation enthalpy: poor shielding by 3d electrons." },
          { cells: ["In", "167", "80.0", "558", "1.7"] },
          { cells: ["Tl", "170", "88.5", "589", "1.8"] },
        ],
        caption: "NCERT values. Read each column on its own: the atomic radius dips at Ga, the M³⁺ radius does not, and the ionisation enthalpy is lowest at In, not Tl.",
      },
      selfCheckExample: {
        prompt: "Arrange aluminium, gallium and indium in increasing order of atomic radius, and give the reason for gallium's place.",
        steps: [
          "Indium is a period lower than both, so it is the largest.",
          "Gallium follows the ten 3d elements. The 3d electrons shield poorly, so gallium's outer electrons feel a larger nuclear charge and are pulled in.",
          "So gallium is smaller than aluminium.",
        ],
        answer: "Ga < Al < In; poor shielding by the 3d electrons shrinks gallium.",
      },
      practiceSet: [
        { prompt: "Which group 13 element has the lowest first ionisation enthalpy?", answer: "Indium (558 kJ/mol)" },
        { prompt: "Does the ionic radius of \\(\\mathrm{M^{3+}}\\) increase or decrease from \\(\\mathrm{Al^{3+}}\\) to \\(\\mathrm{Ga^{3+}}\\)?", answer: "It increases, from 53.5 to 62.0 pm" },
        { prompt: "Which group 13 element has the highest electronegativity?", answer: "Boron (2.0)" },
        { prompt: "Which is denser, aluminium or thallium?", answer: "Thallium; density rises down the group" },
      ],
      pyqExampleId: "a7870162-1e85-4621-9c7d-a5aaf4dd2b17", // 3 Apr 2025 — which four trend orders are correct
      traps: [
        {
          title: "The atomic radius is not a smooth rise",
          body: "The order \\(\\mathrm{B < Al < Ga < In < Tl}\\) looks natural but is wrong. Gallium is smaller than aluminium, so the correct order is \\(\\mathrm{B < Ga < Al < In < Tl}\\). The \\(\\mathrm{M^{3+}}\\) radius, by contrast, does rise steadily.",
        },
        {
          title: "Thallium does not have the lowest ionisation enthalpy",
          body: "Indium has the lowest first ionisation enthalpy in group 13, 558 kJ/mol. Thallium's is higher, 589 kJ/mol, because its 4f and 5d electrons shield poorly.",
        },
        {
          title: "Electronegativity does not simply fall down group 13",
          body: "It falls from boron (2.0) to aluminium (1.5), then rises a little through gallium, indium and thallium. A statement that it decreases down the whole group is false.",
        },
      ],
    },

    // C2 — physical properties, boron and gallium
    {
      kind: "reference" as const,
      slug: "jcpb-g13-physical",
      name: "Group 13 melting points, boron's lattice and gallium's liquid range",
      intuition:
        "Boron is a non-metal. Its atoms form B₁₂ icosahedra linked into a giant covalent network, so boron is very hard and melts far above the others. The rest are metals. Gallium is the odd one: it melts at 303 K, just above room temperature, yet boils near 2676 K. No other element stays liquid over so wide a range, which is why gallium fills thermometers for high temperatures.",
      definition:
        "- **Boron:** black, very hard, icosahedral \\(\\mathrm{B_{12}}\\) units in a strong covalent lattice; highest melting and boiling points in the group.\n" +
        "- **Boron isotopes:** \\(\\mathrm{^{10}B}\\) about 19% and \\(\\mathrm{^{11}B}\\) about 81%; the abundant one has 6 neutrons.\n" +
        "- **Amorphous boron burns in air** to \\(\\mathrm{B_2O_3}\\), with boron at +3.\n" +
        "- **Melting points:** \\(\\mathrm{B > Al > Tl > In > Ga}\\). Gallium's low value comes from its unusual structure of \\(\\mathrm{Ga_2}\\) pairs.\n" +
        "- **Gallium thermometers** measure high temperatures. Gallium freezes at 303 K, so it cannot read temperatures below that.\n" +
        "- **Uses:** boron fibres in bullet-proof vests and light composites for aircraft; \\(\\mathrm{^{10}B}\\) absorbs neutrons in nuclear control rods; aluminium in alloys, wires and packaging.",
      table: {
        columns: ["Element", "Melting point (K)", "Boiling point (K)", "Density (g/cm³)", "What to remember"],
        rows: [
          { cells: ["B", "2453", "3923", "2.35", "Giant covalent \\(\\mathrm{B_{12}}\\) network: very hard, highest melting point"] },
          { cells: ["Al", "933", "2740", "2.70", "Light metal; made passive by concentrated \\(\\mathrm{HNO_3}\\), which coats it with oxide"] },
          { cells: ["Ga", "303", "2676", "5.90", "Liquid from 303 K to 2676 K, the widest liquid range; used in high-temperature thermometers"], noteAmber: "The lowest melting point in the group, and still a liquid in boiling water." },
          { cells: ["In", "430", "2353", "7.31", "Soft metal that melts above gallium"] },
          { cells: ["Tl", "576", "1730", "11.85", "The densest member of the group"] },
        ],
        caption: "Melting points fall from boron to gallium and then rise a little: B > Al > Tl > In > Ga.",
      },
      selfCheckExample: {
        prompt: "Boron, aluminium and gallium are each held in a furnace at 350 K and then at 900 K. Which of them is a liquid at each temperature?",
        steps: [
          "At 350 K: gallium melts at 303 K and boils near 2676 K, so it is liquid; aluminium (933 K) and boron (2453 K) are solid.",
          "At 900 K: gallium is still liquid; aluminium is still just below its melting point of 933 K; boron is solid.",
        ],
        answer: "Only gallium is liquid at both temperatures.",
      },
      practiceSet: [
        { prompt: "How many neutrons are in the more abundant isotope of boron?", answer: "6 (it is \\(\\mathrm{^{11}B}\\))" },
        { prompt: "What is the oxidation state of boron in the product of burning amorphous boron in air?", answer: "+3, in \\(\\mathrm{B_2O_3}\\)" },
        { prompt: "Why can a gallium thermometer not read 250 K?", answer: "Gallium is solid below 303 K" },
        { prompt: "Which group 13 element has the lowest melting point?", answer: "Gallium, 303 K" },
      ],
      pyqExampleId: "d6b7190d-1afd-4b98-b546-13be5a0a84eb", // 27 Jan 2024 — boron's high melting point and its lattice
      traps: [
        {
          title: "Gallium thermometers are for HIGH temperatures",
          body: "Gallium is useful in thermometers because it stays liquid up to about 2676 K. It freezes at 303 K, so a gallium thermometer cannot measure a low temperature such as the freezing point of brine.",
        },
        {
          title: "Boron's hardness is not metallic bonding",
          body: "Boron is a non-metal. Its high melting point and hardness come from a giant covalent network of \\(\\mathrm{B_{12}}\\) icosahedra, not from metallic bonds.",
        },
      ],
    },

    // C3 — inert pair effect
    {
      kind: "reference" as const,
      slug: "jcpb-g13-inert-pair",
      name: "The inert pair effect in group 13: Tl⁺ is more stable than Tl³⁺",
      intuition:
        "To reach +3 an atom must use both its s electrons and its p electron. Down the group the s pair is held more tightly, because the d and f electrons below it shield poorly, so the heavy elements prefer to keep it and show +1. The +1 state grows more stable from aluminium to thallium. For thallium, +1 is the stable state, so \\(\\mathrm{Tl^{3+}}\\) grabs two electrons to become \\(\\mathrm{Tl^{+}}\\): it is a strong oxidising agent. For aluminium, +3 is the only stable state, and \\(\\mathrm{Al^{3+}}\\) is very hard to reduce.",
      definition:
        "- **Stability of +1:** \\(\\mathrm{Al < Ga < In < Tl}\\). For Tl, +1 is more stable than +3.\n" +
        "- **\\(\\mathrm{Tl^{3+}}\\)** is a powerful oxidising agent; \\(\\mathrm{Al^{3+}}\\) is not easily reduced. \\(\\mathrm{Al^{3+}}\\) and \\(\\mathrm{Tl^{+}}\\) are both stable.\n" +
        "- **Boron** has a very high sum of first three ionisation enthalpies, so it forms only covalent compounds; aluminium forms \\(\\mathrm{Al^{3+}}\\) and is strongly electropositive.\n" +
        "- **\\(\\mathrm{TlI_3}\\)** is \\(\\mathrm{Tl^{+}[I_3]^{-}}\\), like \\(\\mathrm{CsI_3}\\): thallium is +1, because \\(\\mathrm{Tl^{3+}}\\) would oxidise iodide.\n" +
        "- **\\(\\mathrm{GaAlCl_4}\\)** is \\(\\mathrm{Ga^{+}[AlCl_4]^{-}}\\): gallium is +1 and is the cation; every Cl is bonded to Al.\n" +
        "- **Oxides \\(\\mathrm{M_2O_3}\\):** \\(\\mathrm{B_2O_3}\\) acidic, \\(\\mathrm{Al_2O_3}\\) and \\(\\mathrm{Ga_2O_3}\\) amphoteric, \\(\\mathrm{In_2O_3}\\) and \\(\\mathrm{Tl_2O_3}\\) basic.",
      table: {
        columns: ["Element", "More stable oxidation state", "E° for M³⁺ reduction (V)", "How M³⁺ behaves"],
        rows: [
          { cells: ["Al", "+3 only", "\\(-1.66\\) (\\(\\mathrm{Al^{3+}/Al}\\))", "Very stable; hard to reduce"] },
          { cells: ["Ga", "+3", "\\(-0.56\\) (\\(\\mathrm{Ga^{3+}/Ga}\\))", "Stable; +1 appears only in salts such as \\(\\mathrm{GaAlCl_4}\\)"] },
          { cells: ["In", "+3", "\\(-0.34\\) (\\(\\mathrm{In^{3+}/In}\\))", "Stable; \\(\\mathrm{In^{+}}\\) is easily oxidised back to +3"] },
          { cells: ["Tl", "+1", "\\(+1.26\\) (\\(\\mathrm{Tl^{3+}}\\) reduced to \\(\\mathrm{Tl^{+}}\\))", "Strong oxidising agent"], noteAmber: "The positive potential is the inert pair effect in numbers: Tl³⁺ is eager to become Tl⁺." },
        ],
        caption: "A more positive reduction potential means the ion is more easily reduced, so a stronger oxidising agent.",
      },
      selfCheckExample: {
        prompt: "Which is the better reducing agent, \\(\\mathrm{In^{+}}\\) or \\(\\mathrm{Tl^{+}}\\)? Give the reason.",
        steps: [
          "A reducing agent is itself oxidised, here from +1 to +3.",
          "The +1 state grows more stable down the group, so \\(\\mathrm{Tl^{+}}\\) holds on to its electrons more than \\(\\mathrm{In^{+}}\\) does.",
          "\\(\\mathrm{In^{+}}\\) goes to +3 more readily.",
        ],
        answer: "\\(\\mathrm{In^{+}}\\); the +1 state is less stable for indium than for thallium.",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of thallium in \\(\\mathrm{TlI_3}\\)?", answer: "+1; it is \\(\\mathrm{Tl^{+}[I_3]^{-}}\\)" },
        { prompt: "Which is the most basic: \\(\\mathrm{B_2O_3}\\), \\(\\mathrm{Al_2O_3}\\), \\(\\mathrm{Tl_2O_3}\\)?", answer: "\\(\\mathrm{Tl_2O_3}\\)" },
        { prompt: "Arrange Al, Ga, In, Tl by the stability of their +1 state.", answer: "Al < Ga < In < Tl" },
        { prompt: "Why does boron form only covalent compounds?", answer: "The sum of its first three ionisation enthalpies is too high to form \\(\\mathrm{B^{3+}}\\)" },
      ],
      pyqExampleId: "a2890b22-f6cb-4abf-99be-acc8bb05024c", // 7 Apr 2025 — statements on Tl³⁺, Al³⁺ and Tl⁺
      traps: [
        {
          title: "Not every group 13 element has a stable +1 state",
          body: "The +1 state becomes important only for the heavier elements and is truly stable only for thallium. Boron and aluminium show +3; a statement that all group 13 elements show a highly stable +1 state is false.",
        },
        {
          title: "TlI₃ is not thallium(III) iodide",
          body: "Thallium in \\(\\mathrm{TlI_3}\\) is +1. The compound is \\(\\mathrm{Tl^{+}}\\) with the tri-iodide ion \\(\\mathrm{I_3^{-}}\\), because \\(\\mathrm{Tl^{3+}}\\) is a strong enough oxidant to turn iodide into iodine.",
        },
        {
          title: "In GaAlCl₄, gallium is +1",
          body: "The salt is \\(\\mathrm{Ga^{+}[AlCl_4]^{-}}\\). All four chlorines surround aluminium; gallium is the separate cation. Giving gallium +3 would leave the formula unbalanced.",
        },
      ],
    },
  ],
};
