import type { SubtopicNote } from "@/app/notes/_types";

export const BORON_PB_NOTE: SubtopicNote = {
  subtopicName: "Boron and Aluminium Compounds",
  title: "Boron and Aluminium Compounds",
  oneLineDefinition:
    "Borax, boric acid, diborane and borazine, and the boron and aluminium halides: electron-deficient compounds that accept electron pairs, with boron limited to four bonds and aluminium able to reach six.",
  whyItMatters:
    "Twenty-one PYQs, twenty of them multiple choice, and one from 2026. Nine are about borax and boric acid: the true formula of borax, the borax bead colours and why boric acid is a weak Lewis acid; seven about diborane and borazine, their bonds, shapes and preparation; five about boron and aluminium halides as Lewis acids: back-bonding in BF₃, the covalency of boron and the octahedral aluminium ion in water.",
  concepts: [
    // C1 — borax and boric acid
    {
      kind: "formula" as const,
      slug: "jcpb-borax-boric-acid",
      name: "Borax, the borax bead test and boric acid",
      intuition:
        "Borax is usually written \\(\\mathrm{Na_2B_4O_7\\cdot 10H_2O}\\), but its true formula is \\(\\mathrm{Na_2[B_4O_5(OH)_4]\\cdot 8H_2O}\\): two of the four borons are tetrahedral and two are trigonal. On strong heating it melts to a clear glass of sodium metaborate and boric anhydride. The boric anhydride combines with a metal oxide to give a coloured metaborate, which is the borax bead test. Boric acid looks like a triprotic acid but is not a proton donor at all: boron has an empty p orbital, so \\(\\mathrm{B(OH)_3}\\) takes a hydroxide ion from water, and the water left behind releases the \\(\\mathrm{H^{+}}\\).",
      definition:
        "- **True formula of borax:** \\(\\mathrm{Na_2[B_4O_5(OH)_4]\\cdot 8H_2O}\\).\n" +
        "- **Borax in water is alkaline:** \\(\\mathrm{Na_2B_4O_7 + 7H_2O \\rightarrow 2NaOH + 4H_3BO_3}\\); a strong base with a weak acid.\n" +
        "- **Borax bead:** \\(\\mathrm{Na_2B_4O_7 \\xrightarrow{\\Delta} 2NaBO_2 + B_2O_3}\\), then \\(\\mathrm{B_2O_3 + MO \\rightarrow M(BO_2)_2}\\).\n" +
        "- **Copper:** in the non-luminous (oxidising) flame, blue-green copper(II) metaborate \\(\\mathrm{Cu(BO_2)_2}\\); in the luminous (reducing) flame, colourless copper(I) metaborate \\(\\mathrm{CuBO_2}\\) or red copper metal.\n" +
        "- **Cobalt:** blue \\(\\mathrm{Co(BO_2)_2}\\).\n" +
        "- **Boric acid** is a weak, monobasic Lewis acid. In the solid, planar \\(\\mathrm{B(OH)_3}\\) units are joined into layers by hydrogen bonds, which is why it is a solid while \\(\\mathrm{BF_3}\\) is a gas.",
      formula: {
        label: "Borax bead and boric acid",
        latex:
          "\\mathrm{Na_2B_4O_7 \\xrightarrow{\\Delta} 2NaBO_2 + B_2O_3} \\qquad \\mathrm{B(OH)_3 + 2H_2O \\rightarrow [B(OH)_4]^{-} + H_3O^{+}}",
      },
      authoredExample: {
        prompt:
          "A borax bead is touched to a trace of copper sulphate and heated first in the non-luminous flame and then in the luminous flame. Write the reactions and give the colour and the oxidation state of copper each time.",
        steps: [
          "Heating borax gives the glassy bead: \\(\\mathrm{Na_2B_4O_7 \\rightarrow 2NaBO_2 + B_2O_3}\\).",
          "Non-luminous (oxidising) flame: \\(\\mathrm{CuSO_4 \\rightarrow CuO + SO_3}\\), then \\(\\mathrm{CuO + B_2O_3 \\rightarrow Cu(BO_2)_2}\\), copper(II) metaborate, blue-green; copper is +2.",
          "Luminous (reducing) flame: carbon reduces it, \\(\\mathrm{2Cu(BO_2)_2 + 2NaBO_2 + C \\rightarrow 2CuBO_2 + Na_2B_4O_7 + CO}\\); copper(I) metaborate is colourless and copper is +1.",
          "With more reduction the bead turns red-brown from copper metal.",
        ],
        answer: "Oxidising flame: blue-green \\(\\mathrm{Cu(BO_2)_2}\\), Cu +2. Reducing flame: colourless \\(\\mathrm{CuBO_2}\\), Cu +1.",
      },
      selfCheckExample: {
        prompt: "Boric acid has the formula \\(\\mathrm{H_3BO_3}\\). Is it a proton donor, how many \\(\\mathrm{H^{+}}\\) does one molecule effectively give, and what ion does boron end up in?",
        steps: [
          "Boron has an empty 2p orbital, so \\(\\mathrm{B(OH)_3}\\) accepts \\(\\mathrm{OH^{-}}\\) from a water molecule: it is a Lewis acid, not a proton donor.",
          "\\(\\mathrm{B(OH)_3 + 2H_2O \\rightarrow [B(OH)_4]^{-} + H_3O^{+}}\\): one \\(\\mathrm{H_3O^{+}}\\) per molecule.",
        ],
        answer: "A Lewis acid, monobasic, giving the tetrahedral ion \\(\\mathrm{[B(OH)_4]^{-}}\\).",
      },
      practiceSet: [
        { prompt: "What colour does a borax bead give with a cobalt salt?", answer: "Blue, from \\(\\mathrm{Co(BO_2)_2}\\)" },
        { prompt: "Is an aqueous solution of borax acidic, neutral or basic?", answer: "Basic; it hydrolyses to NaOH and boric acid" },
        { prompt: "Why is boric acid a solid while boron trifluoride is a gas at room temperature?", answer: "Boric acid's layers are held by hydrogen bonds" },
        { prompt: "How many water molecules of crystallisation does borax have in its true formula?", answer: "8" },
      ],
      pyqExampleId: "2dfd1ae3-a01e-42ef-94c1-96e32921ebf4", // 13 Apr 2023 — x + y + z in the true formula of borax
      traps: [
        {
          title: "Cupric metaborate is blue-green, not colourless",
          body: "In the oxidising flame copper gives blue-green copper(II) metaborate, \\(\\mathrm{Cu(BO_2)_2}\\). The colourless one is copper(I) metaborate, \\(\\mathrm{CuBO_2}\\), formed in the reducing (luminous) flame.",
        },
        {
          title: "Boric acid is monobasic, not tribasic",
          body: "The three OH groups in \\(\\mathrm{B(OH)_3}\\) do not ionise. Boric acid accepts one hydroxide ion from water, so it releases one \\(\\mathrm{H^{+}}\\) per molecule and is a weak acid.",
        },
      ],
    },

    // C2 — diborane and borazine
    {
      kind: "reference" as const,
      slug: "jcpb-diborane-borazine",
      name: "Structure and preparation of diborane and borazine",
      intuition:
        "Diborane, \\(\\mathrm{B_2H_6}\\), has only twelve valence electrons, too few for eight ordinary bonds. It makes do with four normal B–H bonds at the ends and two hydrogens that each bridge both borons, holding them with one pair of electrons spread over three atoms. These three-centre two-electron bonds are the 'banana bonds'. Borazine, \\(\\mathrm{B_3N_3H_6}\\), made by heating diborane with ammonia, has no such bonds: it is a flat ring of alternating B and N with delocalised electrons, called inorganic benzene.",
      definition:
        "- **Lab preparation:** \\(\\mathrm{2NaBH_4 + I_2 \\rightarrow B_2H_6 + 2NaI + H_2}\\).\n" +
        "- **Other routes:** \\(\\mathrm{4BF_3 + 3LiAlH_4 \\rightarrow 2B_2H_6 + 3LiF + 3AlF_3}\\); industrially \\(\\mathrm{2BF_3 + 6NaH \\xrightarrow{450\\,K} B_2H_6 + 6NaF}\\).\n" +
        "- **Lithium aluminium hydride:** \\(\\mathrm{4LiH + AlCl_3 \\rightarrow LiAlH_4 + 3LiCl}\\) (aluminium chloride is the dimer \\(\\mathrm{Al_2Cl_6}\\)).\n" +
        "- **Diborane is a Lewis acid:** with trimethylamine it gives \\(\\mathrm{Me_3N \\rightarrow BH_3}\\), where boron is tetrahedral.\n" +
        "- **Borazine:** \\(\\mathrm{3B_2H_6 + 6NH_3 \\rightarrow 3[BH_2(NH_3)_2]^{+}[BH_4]^{-} \\xrightarrow{\\Delta} 2B_3N_3H_6 + 12H_2}\\).",
      table: {
        columns: ["Feature", "Diborane, B₂H₆", "Borazine, B₃N₃H₆"],
        rows: [
          { cells: ["Shape", "Non-planar: the two \\(\\mathrm{BH_2}\\) ends lie in one plane, the two bridging H above and below it", "Planar six-membered ring of alternating B and N"] },
          { cells: ["Bonds", "Four terminal 2-centre-2-electron B–H bonds and two bridging 3-centre-2-electron B–H–B bonds", "Only ordinary 2-centre-2-electron bonds, with π electrons delocalised round the ring"], noteAmber: "Banana bonds belong to diborane, never to borazine." },
          { cells: ["Hybridisation of boron", "About \\(sp^3\\)", "\\(sp^2\\)"] },
          { cells: ["Bond angles and lengths", "Terminal H–B–H 122°, bridge H–B–H 97°; terminal B–H 119 pm, bridging B–H 134 pm", "All six B–N bonds equal in length"] },
          { cells: ["With water", "\\(\\mathrm{B_2H_6 + 6H_2O \\rightarrow 2B(OH)_3 + 6H_2}\\)", "\\(\\mathrm{B_3N_3H_6 + 9H_2O \\rightarrow 3B(OH)_3 + 3NH_3 + 3H_2}\\)"] },
          { cells: ["Acid-base nature", "Lewis acid; split by bases such as \\(\\mathrm{NMe_3}\\)", "Polar B–N bonds make it more reactive than benzene"] },
        ],
        caption: "The terminal H–B–H angle is wider than the bridge angle, so the terminal bonds have more s character and less p character.",
      },
      selfCheckExample: {
        prompt: "In diborane, how many B–H bonds are ordinary two-electron bonds between two atoms, and how many electrons in total hold the two bridging hydrogens?",
        steps: [
          "The four terminal B–H bonds are ordinary 2-centre-2-electron bonds.",
          "Each of the two B–H–B bridges is one 3-centre-2-electron bond, so the bridges use 2 × 2 = 4 electrons.",
        ],
        answer: "Four ordinary B–H bonds; four electrons in the two bridges.",
      },
      practiceSet: [
        { prompt: "Which reagent oxidises sodium borohydride to diborane in the laboratory?", answer: "Iodine" },
        { prompt: "What is the geometry around boron in the adduct of \\(\\mathrm{BH_3}\\) with trimethylamine?", answer: "Tetrahedral" },
        { prompt: "Which two compounds are heated together to make borazine?", answer: "Diborane and ammonia" },
        { prompt: "Which two reactants give lithium aluminium hydride?", answer: "Lithium hydride and aluminium chloride" },
      ],
      pyqExampleId: "7e4d69a1-47c0-430e-acd0-77f0d009a664", // 13 Apr 2023 — the incorrect statement about borazine
      traps: [
        {
          title: "Diborane has two 3-centre bonds, not four",
          body: "Of the eight B–H links in \\(\\mathrm{B_2H_6}\\), four are ordinary terminal bonds. The four bridging links make just two 3-centre-2-electron bonds, one for each bridging hydrogen.",
        },
        {
          title: "Diborane is not planar and its boron is not sp²",
          body: "The two bridging hydrogens sit above and below the plane of the four terminal hydrogens, and each boron is roughly \\(sp^3\\). The flat, \\(sp^2\\) molecule is borazine.",
        },
        {
          title: "BH₃ is a Lewis acid, not a Lewis base",
          body: "Boron in \\(\\mathrm{BH_3}\\) has only six electrons and an empty p orbital, so it accepts an electron pair, for example from \\(\\mathrm{NMe_3}\\). It has no lone pair to donate.",
        },
      ],
    },

    // C3 — Lewis acidity and covalency of boron and aluminium
    {
      kind: "reference" as const,
      slug: "jcpb-boron-lewis-acid",
      name: "Boron and aluminium halides as Lewis acids: back-bonding and maximum covalency",
      intuition:
        "A boron trihalide has only six electrons round boron, so it accepts a lone pair: it is a Lewis acid. A filled p orbital on each halogen can also push electron density back into boron's empty 2p orbital. This back-bonding works best when the orbitals are the same size, 2p with 2p, so it is strongest in \\(\\mathrm{BF_3}\\) and weakens as the halogen grows. Boron has no d orbitals, so it can form at most four bonds. Aluminium can use its 3d orbitals and reach six, as in \\(\\mathrm{[AlF_6]^{3-}}\\) and \\(\\mathrm{[Al(H_2O)_6]^{3+}}\\).",
      definition:
        "- **Back-bonding** \\(p\\pi\\)–\\(p\\pi\\) is strongest in \\(\\mathrm{BF_3}\\): \\(\\mathrm{BF_3 > BCl_3 > BBr_3 > BI_3}\\).\n" +
        "- **Lewis acid strength** runs the other way, \\(\\mathrm{BF_3 < BCl_3 < BBr_3 < BI_3}\\), because back-bonding fills boron's empty orbital.\n" +
        "- **Maximum covalency of boron is 4:** its valence shell has only 2s and 2p orbitals. So \\(\\mathrm{BF_6^{3-}}\\) and \\(\\mathrm{[B(H_2O)_6]^{3+}}\\) do not exist.\n" +
        "- **Group 13 trihalides are covalent** and hydrolyse in water. \\(\\mathrm{BCl_3}\\) gives boric acid and \\(\\mathrm{[B(OH)_4]^{-}}\\); \\(\\mathrm{AlCl_3}\\) in acidified water gives the octahedral ion \\(\\mathrm{[Al(H_2O)_6]^{3+}}\\), in which aluminium is \\(sp^3d^2\\).",
      table: {
        columns: ["Species", "Covalency of the central atom", "Shape", "Why"],
        rows: [
          { cells: ["\\(\\mathrm{BF_3}\\)", "3", "Trigonal planar", "Electron deficient; back-bonding from F partly fills boron's empty p orbital"] },
          { cells: ["\\(\\mathrm{[BF_4]^{-}}\\)", "4 (oxidation state still +3)", "Tetrahedral", "Fluoride donates a pair into boron's empty orbital"] },
          { cells: ["\\(\\mathrm{BF_6^{3-}}\\)", "Would need 6", "Does not exist", "Boron has no d orbitals, so four bonds is its limit"], noteAmber: "The reason NCERT gives is the missing d orbitals." },
          { cells: ["\\(\\mathrm{[AlF_6]^{3-}}\\)", "6", "Octahedral", "Aluminium uses its 3d orbitals"] },
          { cells: ["\\(\\mathrm{[Al(H_2O)_6]^{3+}}\\)", "6", "Octahedral, \\(sp^3d^2\\)", "Formed when aluminium chloride dissolves in acidified water"] },
          { cells: ["\\(\\mathrm{Al_2Cl_6}\\)", "4", "Two tetrahedra sharing an edge of two bridging Cl", "Each aluminium completes its octet through a chlorine lone pair"] },
        ],
        caption: "Covalency counts the bonds round the atom; it is not the oxidation state. Boron is +3 in both BF₃ and [BF₄]⁻.",
      },
      selfCheckExample: {
        prompt: "Give the covalency and the oxidation state of aluminium in \\(\\mathrm{[AlF_6]^{3-}}\\), and explain why boron cannot form the same ion.",
        steps: [
          "Six fluorides bond to aluminium, so its covalency is 6.",
          "Oxidation state: \\(x + 6(-1) = -3\\), so \\(x = +3\\).",
          "Boron's valence shell has no d orbitals, so it cannot hold more than four electron pairs.",
        ],
        answer: "Covalency 6, oxidation state +3; boron's maximum covalency is 4.",
      },
      practiceSet: [
        { prompt: "What is the covalency of boron in \\(\\mathrm{[BF_4]^{-}}\\)?", answer: "4" },
        { prompt: "Which is the strongest Lewis acid: \\(\\mathrm{BF_3}\\), \\(\\mathrm{BCl_3}\\) or \\(\\mathrm{BBr_3}\\)?", answer: "\\(\\mathrm{BBr_3}\\)" },
        { prompt: "What is the shape of the ion formed by aluminium chloride in acidified water?", answer: "Octahedral, \\(\\mathrm{[Al(H_2O)_6]^{3+}}\\)" },
        { prompt: "Does \\(\\mathrm{BCl_3}\\) form \\(\\mathrm{[B(H_2O)_6]^{3+}}\\) in water?", answer: "No; boron cannot exceed four bonds" },
      ],
      pyqExampleId: "dbdf3251-1def-4dd9-b9f3-71870551ac60", // 2021 Paper 20 — the boron halide with the strongest back donation
      traps: [
        {
          title: "Strongest back-bonding means weakest Lewis acid",
          body: "Back-bonding is strongest in \\(\\mathrm{BF_3}\\) because boron's 2p and fluorine's 2p orbitals are the same size. That filling of boron's empty orbital makes \\(\\mathrm{BF_3}\\) the WEAKEST Lewis acid of the boron trihalides, not the strongest.",
        },
        {
          title: "Covalency 4 does not mean oxidation state +4",
          body: "In \\(\\mathrm{[BF_4]^{-}}\\) boron forms four bonds, but its oxidation state is \\(x + 4(-1) = -1\\), so \\(x = +3\\).",
        },
      ],
    },
  ],
};
