import type { SubtopicNote } from "@/app/notes/_types";

export const LEWIS_BOND_NOTE: SubtopicNote = {
  subtopicName: "Lewis Structures, Formal Charge and the Octet Rule",
  title: "Lewis Structures, Formal Charge and the Octet Rule",
  oneLineDefinition:
    "A Lewis structure shares out every valence electron as bond pairs and lone pairs; from it you read the lone-pair count, each atom's formal charge and whether the octet rule holds.",
  whyItMatters:
    "Nineteen PYQs, twelve of them multiple choice, and six from 2026. Eight count valence electrons, lone pairs or formal charges from a Lewis structure; six sort molecules by how they break the octet rule; five test Lewis acids and bases. Three ideas cover the page.",
  concepts: [
    // C1 — counting electrons, lone pairs and formal charge
    {
      kind: "formula" as const,
      slug: "jcbond-lewis-count",
      name: "Counting lone pairs and formal charge",
      intuition:
        "Every valence electron in a Lewis structure is either in a bond or in a lone pair. So once you know the total and the number of bonds, the lone pairs follow by subtraction. Formal charge is bookkeeping: it compares the electrons an atom owns in the structure with the electrons it brought.",
      definition:
        "- Total valence electrons: add the group valence electrons of every atom, add one for each negative charge, subtract one for each positive charge.\n" +
        "- Each bond (single, double or triple counts as 1, 2 or 3 bonds) uses 2 electrons.\n" +
        "- Lone pairs in the whole species \\(= \\dfrac{\\text{total valence electrons} - 2 \\times \\text{bonds}}{2}\\).\n" +
        "- Formal charge on an atom \\(= V - L - \\tfrac{1}{2}S\\): \\(V\\) valence electrons of the free atom, \\(L\\) its lone-pair electrons, \\(S\\) the electrons in its bonds.\n" +
        "- The formal charges add up to the charge on the species.\n" +
        "- Read the question: 'lone pairs in the molecule' counts every atom; 'lone pairs on the central atom' counts one atom only.",
      formula: {
        label: "Lone pairs and formal charge",
        latex:
          "\\text{lone pairs} = \\frac{N_{\\text{valence}} - 2\\,n_{\\text{bonds}}}{2} \\qquad \\text{FC} = V - L - \\tfrac{1}{2}S",
      },
      authoredExample: {
        prompt:
          "Draw the Lewis structure of the nitrate ion, \\(\\mathrm{NO_3^-}\\). How many lone pairs does the ion carry, and what is the formal charge on each atom?",
        steps: [
          "Valence electrons: N gives 5, three O give \\(3 \\times 6 = 18\\), the charge adds 1. Total \\(= 24\\).",
          "Nitrogen makes one \\(\\mathrm{N{=}O}\\) and two \\(\\mathrm{N{-}O}\\) bonds: 4 bonds, 8 electrons.",
          "Lone pairs \\(= (24 - 8)/2 = 8\\): 2 on the doubly bonded O, 3 on each singly bonded O, none on N.",
          "N: \\(5 - 0 - \\tfrac{1}{2}(8) = +1\\). Double-bonded O: \\(6 - 4 - \\tfrac{1}{2}(4) = 0\\). Each single-bonded O: \\(6 - 6 - \\tfrac{1}{2}(2) = -1\\).",
          "Check: \\(+1 + 0 - 1 - 1 = -1\\), the charge on the ion.",
        ],
        answer: "8 lone pairs, all on oxygen; N is \\(+1\\), the \\(\\mathrm{=O}\\) is 0 and each \\(\\mathrm{-O}\\) is \\(-1\\).",
      },
      selfCheckExample: {
        prompt:
          "Draw the Lewis structure of carbon monoxide. How many lone pairs does it have, and what are the formal charges on C and O?",
        steps: [
          "Valence electrons: \\(4 + 6 = 10\\).",
          "A triple bond \\(\\mathrm{C{\\equiv}O}\\) uses 6 electrons, so \\((10 - 6)/2 = 2\\) lone pairs remain, one on each atom.",
          "C: \\(4 - 2 - \\tfrac{1}{2}(6) = -1\\). O: \\(6 - 2 - \\tfrac{1}{2}(6) = +1\\).",
        ],
        answer: "2 lone pairs; C is \\(-1\\) and O is \\(+1\\).",
      },
      practiceSet: [
        { prompt: "How many valence electrons does \\(\\mathrm{SO_4^{2-}}\\) have?", answer: "32" },
        { prompt: "How many lone pairs are there in the whole \\(\\mathrm{H_2O_2}\\) molecule?", answer: "4, two on each oxygen" },
        { prompt: "What is the formal charge on N in \\(\\mathrm{NH_4^+}\\)?", answer: "\\(+1\\)" },
        { prompt: "How many lone pairs are there in the whole \\(\\mathrm{HCN}\\) molecule?", answer: "1, on nitrogen" },
      ],
      pyqExampleId: "34fa710a-5843-408c-be79-2dffa9c75570", // 2026 — most lone pairs among HNO3, H2SO4, NF3, O3, then its bond angle
      traps: [
        {
          title: "Count every atom, not just the centre",
          body: "Most of a molecule's lone pairs sit on the outer atoms. In \\(\\mathrm{NF_3}\\) nitrogen has one lone pair but each fluorine has three, so the molecule has 10. Check whether the question asks for the whole molecule or the central atom.",
        },
        {
          title: "The charge changes the electron count",
          body: "An anion has extra electrons and a cation has fewer. Forgetting the charge of \\(\\mathrm{NO_2^-}\\) gives 17 electrons instead of 18, and a half lone pair, which is the sign that something is wrong.",
        },
      ],
    },

    // C2 — the octet rule and its exceptions
    {
      kind: "reference" as const,
      slug: "jcbond-octet-rule",
      name: "The octet rule and its three exceptions",
      intuition:
        "Atoms tend to bond until each has eight electrons around it, like a noble gas. Three kinds of molecule break the rule: some centres stop short of eight, some species have an odd number of electrons, and atoms from period 3 onwards can hold more than eight.",
      definition:
        "- Count the electrons around the central atom: 2 for every bond pair (a double bond counts twice) and 2 for every lone pair.\n" +
        "- Incomplete octet: fewer than eight, usually Be (4), B and Al (6).\n" +
        "- Odd-electron species: an odd total of valence electrons, so one electron is unpaired and some atom cannot have eight.\n" +
        "- Expanded octet: more than eight, possible only for period 3 and heavier atoms, which have d orbitals to use.\n" +
        "- Electron-deficient molecules such as \\(\\mathrm{B_2H_6}\\) have too few electrons for every bond to be a normal pair; its bridges are three-centre two-electron bonds.",
      table: {
        columns: ["Type", "Electrons on the central atom", "Examples"],
        rows: [
          { cells: ["Obeys the octet rule", "8", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{CCl_4}\\), \\(\\mathrm{NH_3}\\), \\(\\mathrm{SiF_4}\\), \\(\\mathrm{H_2S}\\)"] },
          { cells: ["Incomplete octet", "4 for Be, 6 for B and Al", "\\(\\mathrm{BeF_2}\\), \\(\\mathrm{BeH_2}\\) (4); \\(\\mathrm{BF_3}\\), \\(\\mathrm{BCl_3}\\), \\(\\mathrm{AlCl_3}\\) (6)"] },
          { cells: ["Electron deficient", "Bridging B–H–B bonds hold 2 electrons over 3 atoms", "\\(\\mathrm{B_2H_6}\\); \\(\\mathrm{BCl_3}\\) is also called electron deficient"] },
          { cells: ["Odd-electron species", "An odd total: NO 11, NO₂ 17, ClO₂ 19", "\\(\\mathrm{NO}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{ClO_2}\\)"], noteAmber: "These are also the paramagnetic oxides: an odd electron cannot pair." },
          { cells: ["Expanded octet", "10 or 12 (14 in IF₇)", "\\(\\mathrm{PCl_5}\\), \\(\\mathrm{SF_4}\\) (10); \\(\\mathrm{SF_6}\\), \\(\\mathrm{H_2SO_4}\\), \\(\\mathrm{SO_3}\\) (12); \\(\\mathrm{IF_7}\\) (14)"] },
        ],
        caption: "Only period 3 and heavier atoms can expand the octet; N, O and F never do.",
      },
      selfCheckExample: {
        prompt:
          "How many of these break the octet rule: \\(\\mathrm{SiCl_4}\\), \\(\\mathrm{BCl_3}\\), \\(\\mathrm{NO}\\), \\(\\mathrm{SF_6}\\), \\(\\mathrm{H_2O}\\), \\(\\mathrm{PF_5}\\), \\(\\mathrm{NCl_3}\\)?",
        steps: [
          "\\(\\mathrm{SiCl_4}\\), \\(\\mathrm{H_2O}\\) and \\(\\mathrm{NCl_3}\\) have eight electrons on the central atom.",
          "\\(\\mathrm{BCl_3}\\): 6 on B, incomplete. \\(\\mathrm{NO}\\): 11 valence electrons, odd.",
          "\\(\\mathrm{SF_6}\\): 12 on S. \\(\\mathrm{PF_5}\\): 10 on P. Both expanded.",
        ],
        answer: "4: \\(\\mathrm{BCl_3}\\), \\(\\mathrm{NO}\\), \\(\\mathrm{SF_6}\\) and \\(\\mathrm{PF_5}\\).",
      },
      practiceSet: [
        { prompt: "How many electrons surround Be in \\(\\mathrm{BeCl_2}\\)?", answer: "4" },
        { prompt: "Is \\(\\mathrm{ClO_2}\\) an odd-electron molecule?", answer: "Yes, 19 valence electrons" },
        { prompt: "How many electrons surround S in \\(\\mathrm{H_2SO_4}\\)?", answer: "12" },
        { prompt: "Can nitrogen expand its octet, as in a supposed \\(\\mathrm{NCl_5}\\)?", answer: "No; it has no 2d orbitals, so NCl₅ does not exist" },
      ],
      pyqExampleId: "2b317946-a843-43b6-8ba9-a20a20cf071a", // 2024 — count the exceptions to the octet rule in a list of twelve
      traps: [
        {
          title: "Sulphur acids and oxides are expanded",
          body: "Drawn with S=O double bonds, S in \\(\\mathrm{H_2SO_4}\\) and \\(\\mathrm{SO_3}\\) has 12 electrons and S in \\(\\mathrm{SO_2}\\) has 10. JEE keys count all three as expanded octets, so do not call them octet-obeying.",
        },
        {
          title: "Odd electrons mean an exception, even with a small atom",
          body: "\\(\\mathrm{NO}\\) and \\(\\mathrm{NO_2}\\) contain only period 2 atoms, yet they break the rule because 11 and 17 cannot be shared out as complete pairs. Check the total before looking at the central atom.",
        },
      ],
    },

    // C3 — Lewis acids and bases
    {
      kind: "reference" as const,
      slug: "jcbond-lewis-acids",
      name: "Lewis acids and Lewis bases",
      intuition:
        "A Lewis acid accepts an electron pair and a Lewis base donates one. So an electron-poor centre with an empty orbital is an acid, and a centre that still holds a lone pair is a base. The Lewis structure tells you which one you have.",
      definition:
        "- Lewis acid: an incomplete octet or a vacant orbital, such as B in \\(\\mathrm{BF_3}\\) (\\(sp^2\\), empty p orbital) or Al in \\(\\mathrm{AlCl_3}\\).\n" +
        "- Lewis base: a lone pair on the central atom, such as N in \\(\\mathrm{NF_3}\\) or \\(\\mathrm{NH_3}\\) (\\(sp^3\\)), S in \\(\\mathrm{SF_4}\\), Cl in \\(\\mathrm{ClF_3}\\).\n" +
        "- A central atom with no lone pair, such as P in \\(\\mathrm{PCl_5}\\), cannot act as a Lewis base.\n" +
        "- Boron halides: acid strength \\(\\mathrm{BI_3 > BBr_3 > BCl_3 > BF_3}\\). The small F atom feeds its lone pair back into boron's empty p orbital (\\(p\\pi\\)–\\(p\\pi\\) back-bonding), which makes \\(\\mathrm{BF_3}\\) the weakest acid.\n" +
        "- Water accepting or giving a proton is Brønsted behaviour, not Lewis behaviour.",
      table: {
        columns: ["Species", "Role", "Reason"],
        rows: [
          { cells: ["\\(\\mathrm{BF_3}\\), \\(\\mathrm{BCl_3}\\)", "Lewis acid", "B has 6 electrons and an empty p orbital; \\(sp^2\\), trigonal planar"] },
          { cells: ["\\(\\mathrm{AlCl_3}\\)", "Lewis acid", "Al has 6 electrons; it dimerises to \\(\\mathrm{Al_2Cl_6}\\) to fill the gap"] },
          { cells: ["\\(\\mathrm{BI_3}\\)", "Strongest boron halide acid", "Back-bonding from large I into B is weakest"] },
          { cells: ["\\(\\mathrm{NH_3}\\), \\(\\mathrm{NF_3}\\)", "Lewis base", "One lone pair on N; \\(sp^3\\), pyramidal"] },
          { cells: ["\\(\\mathrm{SF_4}\\), \\(\\mathrm{ClF_3}\\)", "Lewis base", "One lone pair on S; two on Cl"] },
          { cells: ["\\(\\mathrm{PCl_5}\\)", "Not a Lewis base", "All five P electrons are in bonds; no lone pair"], noteAmber: "PCl₅ can accept a pair (forming PCl₆⁻), but it cannot donate one." },
        ],
        caption: "An empty orbital makes an acid; a lone pair on the central atom makes a base.",
      },
      selfCheckExample: {
        prompt: "Which is the stronger Lewis acid, \\(\\mathrm{BCl_3}\\) or \\(\\mathrm{BBr_3}\\)? Give the reason.",
        steps: [
          "Both have boron with six electrons and an empty p orbital.",
          "Back-donation from the halogen fills that orbital. It is stronger from the smaller Cl atom, whose p orbital matches boron's size better.",
          "So boron in \\(\\mathrm{BBr_3}\\) stays more electron poor.",
        ],
        answer: "\\(\\mathrm{BBr_3}\\), because back-bonding from Br is weaker.",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{AlCl_3}\\) a Lewis acid or a Lewis base?", answer: "Lewis acid" },
        { prompt: "What is the hybridisation of N in \\(\\mathrm{NF_3}\\), a Lewis base?", answer: "\\(sp^3\\)" },
        { prompt: "Which boron halide is the weakest Lewis acid?", answer: "\\(\\mathrm{BF_3}\\)" },
        { prompt: "Water gives a proton to \\(\\mathrm{NH_3}\\). Is that Lewis or Brønsted acid behaviour?", answer: "Brønsted" },
      ],
      pyqExampleId: "dc060f40-5d94-465c-957c-af24663b39f9", // 2026 — an EF3 Lewis acid and an EF3 Lewis base: hybridisations
      traps: [
        {
          title: "Electronegativity does not rank the boron halides",
          body: "F is the most electronegative halogen, so \\(\\mathrm{BF_3}\\) looks like it should be the strongest acid. It is the weakest, because back-bonding from F fills boron's empty orbital. The order is \\(\\mathrm{BI_3 > BBr_3 > BCl_3 > BF_3}\\).",
        },
        {
          title: "Amphoteric water is a Brønsted idea",
          body: "Water acts as an acid with \\(\\mathrm{NH_3}\\) and as a base with \\(\\mathrm{H_2S}\\) by passing protons. An assertion that this is explained by the Lewis concept is false.",
        },
      ],
    },
  ],
};
