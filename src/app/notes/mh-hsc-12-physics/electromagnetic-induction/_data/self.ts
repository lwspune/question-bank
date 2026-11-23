import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_SELF_NOTE: SubtopicNote = {
  subtopicName: "Self-Inductance and Energy in a Magnetic Field",
  title: "Self-Inductance and Energy in a Magnetic Field",
  oneLineDefinition:
    "Self induction and self inductance, the inductance of a solenoid and a toroid, the energy stored in an inductor, and how inductors combine in series and in parallel.",
  whyItMatters:
    "17 questions. Eight were set in board papers: define self inductance (2025, and with mutual inductance in 2026), explain self and mutual induction (2017), derive the energy stored in the magnetic field of a coil (2023), explain why coils in parallel have less inductance than either coil (2023), add two inductors in series (2022), the unit henry (2024) and the e.m.f. when the current in a coil falls (2024). The textbook adds the inductance of a solenoid, a toroid and a coaxial cable.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-self-inductance",
      name: "Self induction and self inductance",
      intuition:
        "A coil resists any change in its own current. Switch it on and the coil fights the rise; switch it off and it fights the fall. Self inductance is how strongly it fights, much as mass measures how strongly a body resists a change in its velocity. That is why the textbook calls it electrical inertia.",
      definition:
        "- **Self induction:** the production of an induced e.m.f. in a coil because of a change of current in the same coil.\n" +
        "- The flux linkage is proportional to the current: \\(N\\phi \\propto i\\), so \\(N\\phi = Li\\). The constant L is the **self inductance** (coefficient of self induction).\n" +
        "- **Definition 1:** \\(L = \\dfrac{N\\phi}{i}\\), the magnetic flux linked with the coil per unit current in it.\n" +
        "- **Definition 2:** from \\(e = -L\\dfrac{di}{dt}\\), \\(L = \\dfrac{|e|}{di/dt}\\), the induced e.m.f. per unit rate of change of current.\n" +
        "- **Definition 3:** from \\(W = \\frac{1}{2}Li^2\\), L is numerically twice the work done in setting up unit current in the coil.\n" +
        "- **Unit:** the henry, \\(1\\ \\text{H} = 1\\ \\text{V s A}^{-1} = 1\\ \\Omega\\,\\text{s}\\). A coil has 1 H when a current changing at 1 A/s induces 1 V in it.\n" +
        "- L depends only on the geometry of the coil (turns, size, shape) and the material of its core.",
      formula: {
        label: "Self inductance",
        latex: "N\\phi = Li, \\qquad e = -L\\frac{di}{dt}",
      },
      authoredExample: {
        prompt:
          "The current in a coil of self inductance 0.5 H rises steadily from 2 A to 6 A in 0.04 s. Find the magnitude of the induced e.m.f. and state its direction.",
        steps: [
          "Given: \\(L = 0.5\\) H, \\(\\Delta i = 6 - 2 = 4\\) A, \\(\\Delta t = 0.04\\) s.",
          "Formula: \\(|e| = L\\dfrac{\\Delta i}{\\Delta t}\\).",
          "Substitution: \\(\\dfrac{\\Delta i}{\\Delta t} = \\dfrac{4}{0.04} = 100\\) A/s, so \\(|e| = 0.5 \\times 100 = 50\\) V.",
          "The current is rising, so by Lenz's law the e.m.f. acts against the current.",
        ],
        answer: "50 V, acting against the rising current",
      },
      selfCheckExample: {
        prompt:
          "A coil of 500 turns has a self inductance of 25 mH. Find the flux through each turn when the current in it is 2 A.",
        steps: [
          "\\(N\\phi = Li = 25 \\times 10^{-3} \\times 2 = 0.05\\) Wb.",
          "\\(\\phi = \\dfrac{0.05}{500} = 1 \\times 10^{-4}\\) Wb.",
        ],
        answer: "\\(1 \\times 10^{-4}\\) Wb",
      },
      practiceSet: [
        { prompt: "Express one henry in terms of the ohm and the second.", answer: "1 H = 1 Ω s" },
        { prompt: "Why is self inductance called electrical inertia?", answer: "It opposes any change of current, just as mass opposes any change of velocity" },
        { prompt: "An e.m.f. of 12 V is induced in a coil when its current changes at 40 A/s. Find its self inductance.", answer: "\\(12/40 = 0.3\\) H" },
      ],
      pyqExampleId: "0581de20-6d13-4160-ac24-8bb90b6fb331",
      traps: [
        {
          title: "A definition without its formula and unit",
          body: "A 'define' answer earns full marks with the words, the formula \\(L = N\\phi/i\\) (or \\(L = |e|/(di/dt)\\)) and the unit henry. Words alone are thin.",
        },
        {
          title: "Millihenry left as henry",
          body: "Inductances are often given in mH. Multiply by \\(10^{-3}\\) before using \\(e = L\\,di/dt\\), or the e.m.f. comes out a thousand times too large.",
        },
        {
          title: "Self induction mixed up with mutual induction",
          body: "In self induction the e.m.f. appears in the same coil whose current changes; in mutual induction it appears in a neighbouring coil.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-solenoid-inductance",
      name: "Inductance of a solenoid and a toroid",
      intuition:
        "More turns help twice over: each extra turn makes the field stronger, and each turn also catches that field. So the inductance of a solenoid grows as the square of its turns per metre. A toroid is a solenoid bent round into a ring, and the same idea gives its inductance.",
      definition:
        "- **Long solenoid** (n turns per metre, length l, area A, current i): \\(B = \\mu_0 n i\\).\n" +
        "- Flux linkage over length l: \\(N\\phi = (nl)(BA) = \\mu_0 n^2 l A\\,i\\).\n" +
        "- So \\(L = \\dfrac{N\\phi}{i} = \\mu_0 n^2 l A = \\dfrac{\\mu_0 N^2 A}{l}\\). Here Al is the volume inside the solenoid.\n" +
        "- \\(L \\propto n^2\\) and \\(L \\propto d^2\\) for a solenoid of diameter d. \\(\\mu_0\\) can be written in henry per metre.\n" +
        "- **Toroid** (N turns, major radius R, cross-section radius r, with \\(r \\ll R\\)): \\(B = \\dfrac{\\mu_0 N i}{2\\pi R}\\), flux per turn \\(\\pi r^2 B = \\dfrac{\\mu_0 N i r^2}{2R}\\), and comparing \\(e = -N\\,d\\phi/dt\\) with \\(e = -L\\,di/dt\\) gives \\(L = \\dfrac{\\mu_0 N^2 r^2}{2R}\\).",
      formula: {
        label: "Solenoid and toroid",
        latex: "L_{solenoid} = \\frac{\\mu_0 N^2 A}{l}, \\qquad L_{toroid} = \\frac{\\mu_0 N^2 r^2}{2R}",
      },
      authoredExample: {
        prompt:
          "An air-cored solenoid is 50 cm long, has 1000 turns and a cross-sectional area of 4 cm². Find its self inductance, and the e.m.f. induced when its current falls at 100 A/s.",
        steps: [
          "Given: \\(N = 1000\\), \\(l = 0.5\\) m, \\(A = 4 \\times 10^{-4}\\) m², \\(di/dt = 100\\) A/s.",
          "Formula: \\(L = \\dfrac{\\mu_0 N^2 A}{l}\\).",
          "Substitution: \\(L = \\dfrac{4\\pi \\times 10^{-7} \\times (1000)^2 \\times 4 \\times 10^{-4}}{0.5} = 1.0 \\times 10^{-3}\\) H.",
          "E.m.f.: \\(|e| = L\\dfrac{di}{dt} = 1.0 \\times 10^{-3} \\times 100 = 0.10\\) V.",
        ],
        answer: "L = 1.0 mH; e.m.f. 0.10 V",
      },
      selfCheckExample: {
        prompt:
          "A solenoid has a self inductance of 2 mH. Its number of turns is doubled while its length and area stay the same. Find the new self inductance.",
        steps: ["\\(L \\propto N^2\\), so doubling N makes L four times as large.", "New \\(L = 4 \\times 2 = 8\\) mH."],
        answer: "8 mH",
      },
      practiceSet: [
        { prompt: "Two solenoids have the same length and number of turns, but one has twice the diameter of the other. Find the ratio of their self inductances.", answer: "4 : 1, since \\(L \\propto d^2\\)" },
        { prompt: "Write the SI unit of \\(\\mu_0\\) in terms of the henry.", answer: "Henry per metre (H/m)" },
        { prompt: "On what does the self inductance of a coil depend?", answer: "Its geometry (number of turns, size and shape) and the material of its core" },
      ],
      pyqExampleId: "f77be8a5-0261-42e2-914f-3c4714a92909",
      traps: [
        {
          title: "Mixing n and N",
          body: "In \\(L = \\mu_0 n^2 l A\\), n is turns per metre; in \\(L = \\mu_0 N^2 A/l\\), N is the total number of turns. Using N in the first form gives an answer far too large.",
        },
        {
          title: "Length in cm",
          body: "Put the length in metre and the area in m² before substituting. A length left in cm makes L a hundred times wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-magnetic-energy",
      name: "Energy stored in an inductor",
      intuition:
        "While you build up a current in a coil, the coil pushes back with its self-induced e.m.f. The source has to do work against that push. The work is not lost: it is stored in the magnetic field of the coil, and it comes back out when the current is switched off.",
      definition:
        "- **Derivation (board asks this):**\n" +
        "- Step 1: while the current grows, the induced e.m.f. is \\(e = L\\dfrac{di}{dt}\\), opposing the growth.\n" +
        "- Step 2: the work done in moving a charge dq against it is \\(dW = e\\,dq = L\\dfrac{di}{dt}\\,dq = L\\,i\\,di\\), since \\(dq/dt = i\\).\n" +
        "- Step 3: total work as the current grows from 0 to I: \\(W = \\int_0^I L\\,i\\,di = \\dfrac{1}{2}LI^2\\).\n" +
        "- Step 4: this work is stored as energy in the magnetic field, \\(U_B = \\dfrac{1}{2}LI^2\\), just as \\(\\dfrac{q^2}{2C}\\) is stored in a capacitor's electric field.\n" +
        "- **Energy density:** for a solenoid, \\(u_B = \\dfrac{U_B}{Al}\\) with \\(L = \\mu_0 n^2 A l\\) and \\(B = \\mu_0 n I\\) gives \\(u_B = \\dfrac{B^2}{2\\mu_0}\\). This holds for any magnetic field.\n" +
        "- \\(\\frac{1}{2}LI^2\\) plays the part of \\(\\frac{1}{2}mv^2\\): L acts like mass.",
      formula: {
        label: "Energy in an inductor",
        latex: "U_B = \\frac{1}{2}LI^2, \\qquad u_B = \\frac{B^2}{2\\mu_0}",
      },
      authoredExample: {
        prompt:
          "A coil of self inductance 50 mH carries a steady current of 4 A. Find the energy stored in its magnetic field.",
        steps: [
          "Given: \\(L = 50 \\times 10^{-3}\\) H, \\(I = 4\\) A.",
          "Formula: \\(U_B = \\dfrac{1}{2}LI^2\\).",
          "Substitution: \\(U_B = \\dfrac{1}{2} \\times 50 \\times 10^{-3} \\times 4^2 = 0.4\\) J.",
        ],
        answer: "0.4 J",
      },
      selfCheckExample: {
        prompt: "The current in an inductor is doubled. By what factor does the energy stored in it change?",
        steps: ["\\(U_B \\propto I^2\\).", "Doubling I multiplies \\(U_B\\) by \\(2^2 = 4\\)."],
        answer: "It becomes four times as large",
      },
      practiceSet: [
        { prompt: "Find the energy density of a magnetic field of 0.2 T in air (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A).", answer: "\\(\\dfrac{(0.2)^2}{2 \\times 4\\pi \\times 10^{-7}} = 1.59 \\times 10^4\\) J/m³" },
        { prompt: "An inductor stores 2 J of energy when it carries a current of 4 A. Find its self inductance.", answer: "\\(L = 2U/I^2 = 4/16 = 0.25\\) H" },
        { prompt: "The energy \\(\\frac{1}{2}LI^2\\) of an inductor is like which energy of a moving body?", answer: "Its kinetic energy, \\(\\frac{1}{2}mv^2\\)" },
      ],
      pyqExampleId: "0798cf37-7dab-46af-ab1b-42afdcda8321",
      traps: [
        {
          title: "Dropping the half",
          body: "The energy is \\(\\frac{1}{2}LI^2\\), not \\(LI^2\\). The half comes from the integral, because the opposing e.m.f. acts while the current grows from zero.",
        },
        {
          title: "Skipping the integral in the derivation",
          body: "Write \\(dW = L\\,i\\,di\\) and integrate from 0 to I. Jumping from \\(e = L\\,di/dt\\) straight to \\(\\frac{1}{2}LI^2\\) loses the derivation marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-inductor-combination",
      name: "Inductors in series and in parallel",
      intuition:
        "Inductors combine like resistors. In series the same current must change in both, so their oppositions add. In parallel the current has two paths to build up in, so the pair lets the current change faster than either coil alone, which means less inductance.",
      definition:
        "- **Series** (no coupling between the coils): \\(L = L_1 + L_2 + L_3 + \\dots\\). The same current flows through each, so their e.m.f.s add.\n" +
        "- **Parallel:** \\(\\dfrac{1}{L} = \\dfrac{1}{L_1} + \\dfrac{1}{L_2} + \\dfrac{1}{L_3} + \\dots\\). For two coils, \\(L = \\dfrac{L_1 L_2}{L_1 + L_2}\\).\n" +
        "- **Why parallel gives less than either coil:** \\(L = L_1\\left(\\dfrac{L_2}{L_1 + L_2}\\right)\\) and the bracket is less than 1, so \\(L < L_1\\); in the same way \\(L < L_2\\).\n" +
        "- Physically: both coils have the same e.m.f. e across them, so \\(\\dfrac{di_1}{dt} = \\dfrac{e}{L_1}\\) and \\(\\dfrac{di_2}{dt} = \\dfrac{e}{L_2}\\). The total current changes at the sum of these rates, faster than in either coil, so the pair opposes the change less than either coil.",
      formula: {
        label: "Combining inductors",
        latex: "L_s = L_1 + L_2, \\qquad \\frac{1}{L_p} = \\frac{1}{L_1} + \\frac{1}{L_2}",
      },
      authoredExample: {
        prompt:
          "Coils of 30 mH and 60 mH, with no coupling between them, are joined (a) in series and (b) in parallel. Find the equivalent inductance in each case.",
        steps: [
          "Given: \\(L_1 = 30\\) mH, \\(L_2 = 60\\) mH.",
          "(a) Series: \\(L_s = 30 + 60 = 90\\) mH.",
          "(b) Parallel: \\(L_p = \\dfrac{30 \\times 60}{30 + 60} = \\dfrac{1800}{90} = 20\\) mH.",
          "Check: 20 mH is less than both coils, as it must be.",
        ],
        answer: "(a) 90 mH; (b) 20 mH",
      },
      selfCheckExample: {
        prompt: "Three identical coils of 12 mH each are joined in parallel. Find the equivalent inductance.",
        steps: ["\\(\\dfrac{1}{L} = \\dfrac{3}{12}\\).", "\\(L = 4\\) mH."],
        answer: "4 mH",
      },
      practiceSet: [
        { prompt: "Coils of 4 H and 12 H are joined in parallel. Find the equivalent inductance.", answer: "\\(\\dfrac{4 \\times 12}{16} = 3\\) H" },
        { prompt: "Two coils in series have an equivalent inductance of 50 mH. One of them is 20 mH. Find the other.", answer: "30 mH" },
        { prompt: "Is the equivalent inductance of two coils in series larger or smaller than the larger coil?", answer: "Larger: it is their sum" },
      ],
      pyqExampleId: "c33869c5-636b-40fe-bd9d-672e87dd9f17",
      traps: [
        {
          title: "Swapping the series and parallel rules",
          body: "Inductors follow the resistor rules, not the capacitor rules: they add in series. The parallel value is always smaller than the smallest coil.",
        },
        {
          title: "An 'explain why' answered with the formula alone",
          body: "Writing \\(1/L = 1/L_1 + 1/L_2\\) is not an explanation. Show that L is less than each coil, and give the reason: the current can build up through two paths.",
        },
      ],
    },
  ],
};
