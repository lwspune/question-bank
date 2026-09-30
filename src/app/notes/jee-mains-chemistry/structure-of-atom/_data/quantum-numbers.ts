import type { SubtopicNote } from "@/app/notes/_types";

export const QUANTUM_NUMBERS_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Quantum Numbers and Electron Counting",
  title: "Quantum Numbers and Electron Counting",
  oneLineDefinition:
    "Four quantum numbers, n, l, mₗ and mₛ, label every electron in an atom. Their allowed values decide how many orbitals and electrons a shell or subshell can hold.",
  whyItMatters:
    "Sixteen PYQs, ten of them multiple choice. Eleven test the allowed values of n, l, mₗ and mₛ, count the orbitals or electrons that share some quantum numbers, or ask for the orbital angular momentum; five name the four quantum numbers of one particular electron. Two ideas cover the page.",
  concepts: [
    // C1 — rules and counting
    {
      kind: "formula" as const,
      slug: "jcatom-qn-rules",
      name: "Allowed values and counting orbitals and electrons",
      intuition:
        "Each quantum number is limited by the one before it. \\(n\\) picks the shell, \\(l\\) runs from 0 to \\(n-1\\), and \\(m_l\\) runs from \\(-l\\) to \\(+l\\). Each orbital holds two electrons of opposite spin. To count electrons that share some quantum numbers, list the subshells that allow them, count the orbitals, then double (or not, if \\(m_s\\) is fixed).",
      definition:
        "- \\(n=1,2,3,\\ldots\\); \\(l=0,1,\\ldots,n-1\\) (s, p, d, f).\n" +
        "- \\(m_l=-l,\\ldots,0,\\ldots,+l\\): \\(2l+1\\) orbitals in a subshell.\n" +
        "- \\(m_s=+\\tfrac12\\) or \\(-\\tfrac12\\).\n" +
        "- Shell \\(n\\): \\(n^2\\) orbitals, \\(2n^2\\) electrons. Subshell: \\(2(2l+1)\\) electrons.\n" +
        "- A fixed \\(m_l\\) occurs once in every subshell with \\(l\\ge|m_l|\\).\n" +
        "- All four fixed: exactly one electron (**Pauli exclusion principle**).\n" +
        "- Orbital angular momentum \\(L=\\sqrt{l(l+1)}\\,\\dfrac{h}{2\\pi}\\). It depends on \\(l\\) only, and is zero for every s orbital.",
      formula: {
        label: "Orbital angular momentum",
        latex: "L=\\sqrt{l(l+1)}\\,\\frac{h}{2\\pi}",
      },
      authoredExample: {
        prompt:
          "How many electrons in an atom can have \\(n=4\\) and \\(m_l=+2\\)? How many of these can also have \\(m_s=+\\tfrac12\\)?",
        steps: [
          "For \\(n=4\\), \\(l=0,1,2,3\\). \\(m_l=+2\\) needs \\(l\\ge2\\), so only \\(l=2\\) (4d) and \\(l=3\\) (4f).",
          "That is 2 orbitals, holding \\(2\\times2=4\\) electrons.",
          "Fixing \\(m_s=+\\tfrac12\\) leaves one electron per orbital: 2.",
        ],
        answer: "4 electrons; 2 with \\(m_s=+\\tfrac12\\).",
      },
      selfCheckExample: {
        prompt:
          "Which set is not allowed? (a) \\(n=2, l=1, m_l=-1\\) (b) \\(n=3, l=0, m_l=0\\) (c) \\(n=2, l=2, m_l=0\\) (d) \\(n=4, l=3, m_l=+3\\)",
        steps: [
          "\\(l\\) can be at most \\(n-1\\).",
          "In (c), \\(n=2\\) allows \\(l=0\\) or 1 only, so \\(l=2\\) is not allowed.",
          "The others keep \\(l\\le n-1\\) and \\(|m_l|\\le l\\).",
        ],
        answer: "(c).",
      },
      practiceSet: [
        { prompt: "Orbitals in the shell \\(n=3\\)?", answer: "9" },
        { prompt: "Electrons in the shell \\(n=5\\)?", answer: "50" },
        { prompt: "Orbital angular momentum of a 3d electron?", answer: "\\(\\sqrt6\\,\\dfrac{h}{2\\pi}\\)" },
        { prompt: "Electrons with \\(n=3\\) and \\(l=1\\)?", answer: "6" },
      ],
      pyqExampleId: "4d99877b-6ec8-4fbd-af31-c04a24f9b256", // 2026 — electrons with n = 5, ml = −1, and with all four fixed
      traps: [
        {
          title: "l stops at n − 1",
          body: "\\(l=n\\) is never allowed. So \\(n=3, l=3\\) and \\(n=2, l=2\\) are invalid sets, whatever \\(m_l\\) is.",
        },
        {
          title: "Angular momentum uses l, not n",
          body: "\\(L=\\sqrt{l(l+1)}\\,h/2\\pi\\). A 2s and a 3s electron both have \\(L=0\\); a 2p electron has \\(\\sqrt2\\,h/2\\pi\\). \\(\\sqrt6\\) belongs to \\(l=2\\).",
        },
      ],
    },

    // C2 — quantum numbers of a named electron
    {
      kind: "formula" as const,
      slug: "jcatom-qn-electron",
      name: "Quantum numbers of a particular electron",
      intuition:
        "To name an electron's quantum numbers, write the configuration and find the subshell the electron sits in. The subshell gives \\(n\\) and \\(l\\). An s electron always has \\(m_l=0\\). For ions, remember that electrons leave from the highest \\(n\\) first, which is not always the last subshell filled.",
      definition:
        "- Subshell \\(\\to\\) \\(n\\) and \\(l\\): 4s is \\(n=4, l=0\\); 3d is \\(n=3, l=2\\).\n" +
        "- The valence electron of an alkali metal is \\(ns^1\\): \\((n,0,0,\\pm\\tfrac12)\\).\n" +
        "- Cations lose electrons from the highest \\(n\\) first: 4s leaves before 3d.\n" +
        "- \"In accordance with the Aufbau principle\" means strict filling order, even for Cr and Cu.",
      authoredExample: {
        prompt: "Find the azimuthal quantum number of the outermost electron of \\(\\mathrm{In^+}\\) (\\(Z=49\\)).",
        steps: [
          "In: \\([\\mathrm{Kr}]4d^{10}5s^25p^1\\).",
          "\\(\\mathrm{In^+}\\) loses the 5p electron: \\([\\mathrm{Kr}]4d^{10}5s^2\\).",
          "The outermost electrons are now 5s, so \\(l=0\\).",
        ],
        answer: "\\(l=0\\).",
      },
      selfCheckExample: {
        prompt: "By the Aufbau order, find \\(n\\) and \\(l\\) of the 21st electron of titanium (\\(Z=22\\)).",
        steps: [
          "\\(1s^22s^22p^63s^23p^6\\) holds 18 electrons; \\(4s^2\\) takes the 19th and 20th.",
          "The 21st goes into 3d.",
        ],
        answer: "\\(n=3\\), \\(l=2\\).",
      },
      practiceSet: [
        { prompt: "Quantum numbers of the valence electron of Cs (\\(Z=55\\))?", answer: "\\(n=6, l=0, m_l=0, m_s=+\\tfrac12\\) (or \\(-\\tfrac12\\))" },
        { prompt: "\\(l\\) of the outermost electron of Al (\\(Z=13\\))?", answer: "\\(l=1\\) (3p)" },
        { prompt: "\\(l\\) of the outermost electron of \\(\\mathrm{Al^+}\\)?", answer: "\\(l=0\\) (3s)" },
        { prompt: "Which subshell loses electrons first when Fe forms \\(\\mathrm{Fe^{2+}}\\)?", answer: "4s" },
      ],
      pyqExampleId: "0d6234ac-9385-419f-8e86-32b435c1807e", // 2026 — quantum numbers of the 19th electron of Cr by Aufbau
      traps: [
        {
          title: "Ions lose the highest-n electrons first",
          body: "\\(\\mathrm{Ga^+}\\) is \\([\\mathrm{Ar}]3d^{10}4s^2\\): the 4p electron left, so the valence electron has \\(l=0\\), not \\(l=1\\).",
        },
        {
          title: "\"By Aufbau\" ignores the exceptions",
          body: "Cr is really \\(3d^54s^1\\), but a question that says \"in accordance with Aufbau\" wants the strict order, where the 19th electron goes into 4s.",
        },
      ],
    },
  ],
};
