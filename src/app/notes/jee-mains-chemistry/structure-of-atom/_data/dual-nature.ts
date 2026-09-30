import type { SubtopicNote } from "@/app/notes/_types";

export const DUAL_NATURE_ATOM_NOTE: SubtopicNote = {
  subtopicName: "de Broglie Waves and the Uncertainty Principle",
  title: "de Broglie Waves and the Uncertainty Principle",
  oneLineDefinition:
    "A moving particle has a wavelength h/mv, a Bohr orbit holds a whole number of these waves, and the position and momentum of a particle can never both be known exactly.",
  whyItMatters:
    "Fifteen PYQs, eleven of them numerical-answer — the highest share in the chapter. Six find a de Broglie wavelength from mass and speed, kinetic energy or an accelerating voltage; four fit whole waves round a Bohr orbit; five apply Δx·Δp ≥ h/4π. Three ideas cover the page.",
  concepts: [
    // C1 — de Broglie wavelength
    {
      kind: "formula" as const,
      slug: "jcatom-matter-waves",
      name: "de Broglie wavelength",
      intuition:
        "Every moving particle behaves as a wave of wavelength \\(h/p\\). Only momentum matters: two particles with equal momentum have equal wavelength, whatever their masses. For a heavy object the wavelength is far too small to notice. For an electron it is about the size of an atom.",
      definition:
        "- \\(\\lambda=\\dfrac{h}{mv}=\\dfrac{h}{p}\\).\n" +
        "- From kinetic energy: \\(p=\\sqrt{2mK}\\), so \\(\\lambda=\\dfrac{h}{\\sqrt{2mK}}\\).\n" +
        "- A charge \\(q\\) accelerated through \\(V\\): \\(K=qV\\), so \\(\\lambda=\\dfrac{h}{\\sqrt{2mqV}}\\).\n" +
        "- \\(\\lambda\\) against \\(p\\) is a rectangular hyperbola; \\(\\lambda\\) against \\(1/p\\) is a straight line through the origin.\n" +
        "- Cathode rays are electrons. They travel from cathode to anode, and their properties do not depend on the electrode material or the gas.",
      formula: {
        label: "de Broglie relation",
        latex: "\\lambda=\\frac{h}{mv}=\\frac{h}{\\sqrt{2mK}}",
      },
      authoredExample: {
        prompt:
          "An electron is accelerated from rest through 150 V. Find its de Broglie wavelength. (\\(m=9.11\\times10^{-31}\\ \\mathrm{kg}\\), \\(e=1.602\\times10^{-19}\\ \\mathrm{C}\\), \\(h=6.626\\times10^{-34}\\ \\mathrm{J\\,s}\\))",
        steps: [
          "\\(2meV=2\\times9.11\\times10^{-31}\\times1.602\\times10^{-19}\\times150=4.38\\times10^{-47}\\).",
          "\\(p=\\sqrt{4.38\\times10^{-47}}=6.62\\times10^{-24}\\ \\mathrm{kg\\,m\\,s^{-1}}\\).",
          "\\(\\lambda=\\dfrac{6.626\\times10^{-34}}{6.62\\times10^{-24}}=1.00\\times10^{-10}\\ \\mathrm{m}\\).",
        ],
        answer: "About \\(1.0\\ \\mathrm{\\mathring{A}}\\) (\\(10^{-10}\\ \\mathrm{m}\\)).",
      },
      selfCheckExample: {
        prompt: "A ball of mass 0.10 kg moves at \\(20\\ \\mathrm{m\\,s^{-1}}\\). Find its de Broglie wavelength.",
        steps: [
          "\\(p=0.10\\times20=2.0\\ \\mathrm{kg\\,m\\,s^{-1}}\\).",
          "\\(\\lambda=\\dfrac{6.626\\times10^{-34}}{2.0}=3.3\\times10^{-34}\\ \\mathrm{m}\\), far too small to detect.",
        ],
        answer: "\\(3.3\\times10^{-34}\\ \\mathrm{m}\\).",
      },
      practiceSet: [
        {
          prompt:
            "Wavelength of an electron at \\(1.0\\times10^{6}\\ \\mathrm{m\\,s^{-1}}\\) (\\(h=6.6\\times10^{-34}\\), \\(m=9.1\\times10^{-31}\\ \\mathrm{kg}\\))?",
          answer: "About \\(7.3\\times10^{-10}\\ \\mathrm{m}\\)",
        },
        {
          prompt: "An electron and a proton have equal wavelengths. Which has more kinetic energy?",
          answer: "The electron, by a factor \\(m_p/m_e\\approx1836\\)",
          method: "Equal \\(p\\), and \\(K=p^2/2m\\)",
        },
        { prompt: "How does \\(\\lambda\\) depend on the accelerating voltage?", answer: "\\(\\lambda\\propto1/\\sqrt V\\)" },
        { prompt: "Shape of the \\(\\lambda\\) against \\(p\\) graph?", answer: "Rectangular hyperbola" },
      ],
      pyqExampleId: "645a33da-5877-4e29-853e-5b6de9bbe52c", // 2022 — electron speed that matches a neutron's wavelength
      traps: [
        {
          title: "Equal wavelength means equal momentum",
          body: "Equal \\(\\lambda\\) gives \\(m_1v_1=m_2v_2\\), not equal speeds. The lighter particle must move faster by the mass ratio.",
        },
        {
          title: "Work in kg and J",
          body: "Masses in grams or amu, and energies in eV, must be converted first. \\(1\\ \\mathrm{eV}=1.602\\times10^{-19}\\ \\mathrm{J}\\), \\(1\\ \\mathrm{amu}=1.66\\times10^{-27}\\ \\mathrm{kg}\\).",
        },
      ],
    },

    // C2 — waves round a Bohr orbit
    {
      kind: "formula" as const,
      slug: "jcatom-orbit-waves",
      name: "de Broglie waves in a Bohr orbit",
      intuition:
        "Bohr's rule \\(mvr=nh/2\\pi\\) says the same thing as: exactly \\(n\\) electron waves fit round the \\(n\\)-th orbit. So the wavelength is the circumference divided by \\(n\\). Since the radius goes as \\(n^2\\), the wavelength goes as \\(n\\).",
      definition:
        "- \\(2\\pi r_n=n\\lambda\\).\n" +
        "- With \\(r_n=\\dfrac{n^2a_0}{Z}\\): \\(\\lambda_n=\\dfrac{2\\pi na_0}{Z}\\).\n" +
        "- Hydrogen: \\(\\lambda_1=2\\pi a_0\\), \\(\\lambda_2=4\\pi a_0\\), \\(\\lambda_3=6\\pi a_0\\).\n" +
        "- Frequency of the electron wave: \\(\\nu=\\dfrac{v}{\\lambda}=\\dfrac{mv^2}{h}=\\dfrac{2KE}{h}\\).",
      formula: {
        label: "Waves in the n-th orbit",
        latex: "\\lambda_n=\\frac{2\\pi r_n}{n}=\\frac{2\\pi n a_0}{Z}",
      },
      authoredExample: {
        prompt: "Find the de Broglie wavelength of the electron in the second orbit of \\(\\mathrm{He^+}\\), in terms of \\(a_0\\).",
        steps: [
          "\\(r_2=\\dfrac{2^2a_0}{2}=2a_0\\), so the circumference is \\(4\\pi a_0\\).",
          "Two waves fit round it: \\(\\lambda=\\dfrac{4\\pi a_0}{2}=2\\pi a_0\\).",
        ],
        answer: "\\(2\\pi a_0\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the frequency of the de Broglie wave of the electron in the second orbit of hydrogen. (\\(E_1=-2.18\\times10^{-18}\\ \\mathrm{J}\\), \\(h=6.626\\times10^{-34}\\ \\mathrm{J\\,s}\\))",
        steps: [
          "\\(KE_2=\\dfrac{2.18\\times10^{-18}}{4}=5.45\\times10^{-19}\\ \\mathrm{J}\\).",
          "\\(\\nu=\\dfrac{2KE}{h}=\\dfrac{1.09\\times10^{-18}}{6.626\\times10^{-34}}=1.65\\times10^{15}\\ \\mathrm{Hz}\\).",
        ],
        answer: "About \\(1.65\\times10^{15}\\ \\mathrm{Hz}\\).",
      },
      practiceSet: [
        { prompt: "Wavelength in the fifth orbit of H?", answer: "\\(10\\pi a_0\\)" },
        { prompt: "How many electron waves fit round the third orbit?", answer: "3" },
        { prompt: "Wavelength in the first orbit of \\(\\mathrm{Li^{2+}}\\)?", answer: "\\(\\dfrac{2\\pi a_0}{3}\\)" },
        { prompt: "\\(\\lambda\\) in the second orbit of H : \\(\\lambda\\) in the second orbit of \\(\\mathrm{He^+}\\)?", answer: "\\(2:1\\)" },
      ],
      pyqExampleId: "ba0c5f62-bca0-4420-8083-fd50e0ef8d5b", // 2023 — de Broglie wavelength in the third orbit of H
      traps: [
        {
          title: "The wavelength grows as n, not n²",
          body: "The radius goes as \\(n^2\\), but \\(n\\) waves share the circumference. So \\(\\lambda\\propto n\\): the fourth orbit of H has \\(\\lambda=8\\pi a_0\\), not \\(32\\pi a_0\\).",
        },
      ],
    },

    // C3 — uncertainty principle
    {
      kind: "formula" as const,
      slug: "jcatom-uncertainty",
      name: "Heisenberg's uncertainty principle",
      intuition:
        "The more tightly you pin down where a particle is, the less you know about its momentum. The product of the two uncertainties has a floor of \\(h/4\\pi\\). For an electron in a tiny space, the uncertainty in speed becomes huge. For a ball, it is far too small to matter.",
      definition:
        "- \\(\\Delta x\\cdot\\Delta p\\ge\\dfrac{h}{4\\pi}\\), and \\(\\Delta p=m\\Delta v\\).\n" +
        "- Minimum uncertainty in speed: \\(\\Delta v=\\dfrac{h}{4\\pi m\\Delta x}\\).\n" +
        "- If \\(\\Delta x=\\Delta p\\): \\(\\Delta p=\\sqrt{\\dfrac{h}{4\\pi}}\\), so \\(\\Delta v=\\dfrac{1}{2m}\\sqrt{\\dfrac{h}{\\pi}}\\).\n" +
        "- A particle confined to a region takes that region's size as \\(\\Delta x\\).\n" +
        "- It rules out a fixed electron path, so it rules out Bohr's orbits.",
      formula: {
        label: "Uncertainty principle",
        latex: "\\Delta x\\cdot m\\Delta v\\ge\\frac{h}{4\\pi}",
      },
      authoredExample: {
        prompt:
          "An electron is confined to a region \\(1.0\\times10^{-10}\\ \\mathrm{m}\\) wide, about the size of an atom. Find the minimum uncertainty in its speed. (\\(m=9.11\\times10^{-31}\\ \\mathrm{kg}\\), \\(h=6.63\\times10^{-34}\\ \\mathrm{J\\,s}\\))",
        steps: [
          "\\(4\\pi m\\Delta x=12.57\\times9.11\\times10^{-31}\\times1.0\\times10^{-10}=1.145\\times10^{-39}\\).",
          "\\(\\Delta v=\\dfrac{6.63\\times10^{-34}}{1.145\\times10^{-39}}=5.8\\times10^{5}\\ \\mathrm{m\\,s^{-1}}\\).",
        ],
        answer: "About \\(5.8\\times10^{5}\\ \\mathrm{m\\,s^{-1}}\\).",
      },
      selfCheckExample: {
        prompt:
          "A 25 g ball has an uncertainty in speed of \\(0.1\\ \\mathrm{m\\,s^{-1}}\\). Find the minimum uncertainty in its position. (\\(h=6.626\\times10^{-34}\\ \\mathrm{J\\,s}\\))",
        steps: [
          "\\(m=0.025\\ \\mathrm{kg}\\), so \\(4\\pi m\\Delta v=12.566\\times0.025\\times0.1=0.0314\\).",
          "\\(\\Delta x=\\dfrac{6.626\\times10^{-34}}{0.0314}=2.1\\times10^{-32}\\ \\mathrm{m}\\), negligible.",
        ],
        answer: "About \\(2.1\\times10^{-32}\\ \\mathrm{m}\\).",
      },
      practiceSet: [
        { prompt: "Minimum value of \\(\\Delta x\\cdot\\Delta p\\)?", answer: "\\(h/4\\pi\\approx5.27\\times10^{-35}\\ \\mathrm{J\\,s}\\)" },
        {
          prompt: "Electron confined to 1 nm: minimum \\(\\Delta v\\)?",
          answer: "About \\(5.8\\times10^{4}\\ \\mathrm{m\\,s^{-1}}\\)",
          method: "Ten times the region, one tenth the \\(\\Delta v\\)",
        },
        { prompt: "If \\(\\Delta x=\\Delta p\\), what is \\(\\Delta p\\)?", answer: "\\(\\sqrt{h/4\\pi}\\)" },
        { prompt: "Why is the uncertainty negligible for a cricket ball?", answer: "Its large mass makes \\(h/4\\pi m\\Delta x\\) tiny" },
      ],
      pyqExampleId: "ff3ed4c6-7732-448d-bde7-a9ad7378c353", // 2024 — speed uncertainty of an electron inside a nucleus
      traps: [
        {
          title: "Mass in kg",
          body: "\\(h\\) is in J s, so the mass must be in kg. If a question asks for the mass in grams, find it in kg first, then multiply by 1000.",
        },
        {
          title: "Δx = Δp is not Δx = Δv",
          body: "Equal uncertainties in position and momentum give \\(\\Delta v=\\dfrac{1}{2m}\\sqrt{\\dfrac{h}{\\pi}}\\). Setting \\(\\Delta x=\\Delta v\\) instead gives a different, wrong answer.",
        },
      ],
    },
  ],
};
