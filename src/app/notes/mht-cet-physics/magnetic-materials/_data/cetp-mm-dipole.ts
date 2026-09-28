import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-materials";

export const DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Dipole Moment and Bar Magnet",
  title: "Magnetic Dipole Moment",
  oneLineDefinition:
    "A magnet's dipole moment is its pole strength times its length (or magnetisation times volume); in a field B it feels a torque MB sin θ, stores energy −MB cos θ and oscillates with period 2π√(I/MB); an orbiting electron has a moment proportional to its angular momentum, e/2m times L.",
  whyItMatters:
    "10 PYQs, one HARD. Seven are about magnets: the moment of a rod or a bent rod, a magnet cut into pieces, work to turn a magnet, the period of oscillation, and the torque to hold a coil in a solenoid. " +
    "Three are the electron's orbital moment — the gyromagnetic ratio and the Bohr magneton. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mm-magnetic-moment",
      name: "Moment, Torque, Work and Oscillation",
      intuition:
        "The moment M = m × 2l points from S to N. Bending a rod of length L into a semicircle keeps its pole strength but brings the poles to a diameter 2L/π apart, so the moment falls to 2M/π. Cutting a magnet ALONG its axis halves the pole strength and keeps the length; two such halves placed at right angles give a resultant M/√2. Turning a magnet from the field direction through θ takes work MB(1 − cos θ), so 90° takes twice the work of 60°. It oscillates with T = 2π√(I/MB): stronger field or moment, shorter period. Two magnets held together add their moments with like poles together and subtract them with unlike poles together. A current loop is a dipole too: τ = NIAB for a coil whose axis is perpendicular to B.",
      definition:
        "- \\(M = m \\times 2l = \\) magnetisation × volume (5 cm, 1 cm diameter, \\(5.3\\times10^3\\) A/m ⇒ \\(2\\times10^{-2}\\) J/T).\n" +
        "- Bent into a semicircle: \\(\\dfrac{2M}{\\pi}\\). Cut along the axis, halves at 90°: \\(\\dfrac{M}{\\sqrt{2}}\\).\n" +
        "- Work from the field direction: \\(W = MB(1 - \\cos\\theta)\\) (90° : 60° = 2 : 1).\n" +
        "- Oscillation: \\(T = 2\\pi\\sqrt{\\dfrac{I}{MB}}\\); field tripled ⇒ \\(T \\div \\sqrt{3}\\). Magnets \\(2M\\) and \\(M\\) held together: like poles together (moments add) \\(3M\\), unlike poles together \\(M\\) ⇒ \\(T_1 : T_2 = 1 : \\sqrt{3}\\).\n" +
        "- Coil in a solenoid: \\(\\tau = NIAB\\), \\(B = \\mu_0 nI\\).",
      formula: {
        label: "Magnet in a field",
        latex: "\\tau = MB\\sin\\theta, \\qquad W = MB(1 - \\cos\\theta), \\qquad T = 2\\pi\\sqrt{\\frac{I}{MB}}",
      },
      authoredExample: {
        prompt: "A magnet of moment 2 A m² lies along a 0.4 T field. Work to turn it through 90°, and the torque in that position?",
        steps: ["W = MB(1 − cos 90°) = 0.8 J.", "τ = MB sin 90° = 0.8 N m."],
        answer: "0.8 J; 0.8 N m",
      },
      selfCheckExample: {
        prompt: "A bar magnet of moment M is cut into two equal halves across its length. Moment of each half?",
        steps: ["Same pole strength, half the length."],
        answer: "M/2",
      },
      practiceSet: [
        { prompt: "A magnet makes 30 oscillations a minute. The field becomes three times as strong. New period?", answer: "2/√3 s" },
        { prompt: "A rod of moment M is bent into a semicircle. New moment?", answer: "2M/π" },
      ],
      pyqExampleId: "32312866-1905-43cf-a7ed-666234efba3c",
      traps: [
        {
          title: "Keeping the length when a rod is bent",
          body:
            "The moment uses the straight distance between the poles. A rod bent into a semicircle has its poles a diameter 2L/π apart, not L.",
        },
        {
          title: "Subtracting moments of magnets held with like poles together",
          body:
            "Like poles together, the magnets point the same way and the moments ADD: 2M and M give 3M, so the period is SHORTER. Unlike poles together, they subtract to M.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mm-orbital-moment",
      name: "The Orbiting Electron's Moment",
      intuition:
        "An electron circling at frequency f is a current ef around an area πr², so its moment is (e/2m)L: proportional to its angular momentum, pointing opposite to it because the electron is negative. The ratio e/2m is the gyromagnetic ratio; with L = h/2π in the first Bohr orbit the moment is the Bohr magneton eh/4πm.",
      definition:
        "- \\(\\mu = \\dfrac{e}{2m}L\\), directed opposite to L: \\(\\vec{\\mu} = -R\\vec{L}\\) with \\(R = \\dfrac{e}{2m}\\).\n" +
        "- Bohr magneton: \\(\\mu_B = \\dfrac{eh}{4\\pi m} \\approx 9.27\\times10^{-24}\\) A m².",
      formula: {
        label: "Orbital moment",
        latex: "\\mu = \\frac{e}{2m}L, \\qquad \\mu_B = \\frac{eh}{4\\pi m}",
      },
      authoredExample: {
        prompt: "An electron's orbital angular momentum is 2h/2π. Its orbital magnetic moment in Bohr magnetons?",
        steps: ["μ = (e/2m)(2h/2π) = 2 × eh/4πm."],
        answer: "2μ_B",
      },
      selfCheckExample: {
        prompt: "Gyromagnetic ratio of an electron? (e = 1.6 × 10⁻¹⁹ C, m = 9.1 × 10⁻³¹ kg)",
        steps: ["e/2m."],
        answer: "≈ 8.8 × 10¹⁰ C/kg",
      },
      practiceSet: [
        { prompt: "The orbital magnetic moment of an electron is proportional to?", answer: "Its angular momentum" },
      ],
      pyqExampleId: "75267224-1d1a-41cd-abf6-58966490ebcb",
      traps: [
        {
          title: "Writing the gyromagnetic ratio as e/m",
          body:
            "The loop's area and current give μ/L = e/2m — half of e/m.",
        },
        {
          title: "Dropping the minus sign",
          body:
            "The electron is negative, so its orbital moment points OPPOSITE its angular momentum: μ = −(e/2m)L.",
        },
      ],
    },
  ],
  related: [
    { label: "Magnetisation and Susceptibility", href: `${BASE}/cetp-mm-magnetisation` },
    { label: "Magnetic Fields — the moment of a current loop", href: "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current/cetp-mag-moment" },
  ],
};
