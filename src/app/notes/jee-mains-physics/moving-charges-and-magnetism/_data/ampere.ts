import type { SubtopicNote } from "@/app/notes/_types";

export const AMPERE_MAG_NOTE: SubtopicNote = {
  subtopicName: "Ampere's Law: Thick Wires and Solenoids",
  title: "Ampère's Law: Thick Wires and Solenoids",
  oneLineDefinition:
    "Round any closed loop, the sum of B·dl is μ₀ times the current the loop encloses; with a symmetric shape this gives the field inside and outside a thick wire, a cable and a solenoid in one line.",
  whyItMatters:
    "Twenty-three PYQs, nineteen of them multiple choice, and one from 2026. Thirteen apply Ampère's law to thick conductors: seven are about a solid wire's field inside and outside it, often as a graph, two are coaxial cables, one is a hollow tube, one a ring of rotating charges, and two test the law itself in statements or a match list. Ten are solenoids: four use B = μ₀nI directly, two ask for the magnetic intensity H = nI, two add an iron core, one has an electron circling inside, and one connects four solenoids in a network.",
  concepts: [
    // C1 — thick wire, tube, coaxial cable
    {
      kind: "formula" as const,
      slug: "jpmag-thick-wire",
      name: "Ampère's law for a solid wire, a hollow tube and a coaxial cable",
      intuition:
        "Ampère's law says the field round a closed path is set only by the current passing through that path. For a long round conductor, take a circle centred on the axis: B is the same all round it, so B times 2πr equals μ₀ times the current inside the circle. Inside a solid wire, a smaller circle encloses less current, so the field grows from zero at the axis to a maximum at the surface, then falls as 1/r outside.",
      definition:
        "- Ampère's circuital law: \\(\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{\\text{enc}}\\), for steady currents. It follows from the Biot–Savart law; it is not an independent result.\n" +
        "- Solid wire of radius a, current I spread uniformly: inside, \\(I_{\\text{enc}} = I\\dfrac{r^{2}}{a^{2}}\\), so \\(B = \\dfrac{\\mu_0 I r}{2\\pi a^{2}}\\) (proportional to r, zero on the axis).\n" +
        "- Outside the wire: \\(B = \\dfrac{\\mu_0 I}{2\\pi r}\\). The largest field is at the surface, \\(\\dfrac{\\mu_0 I}{2\\pi a}\\). Outside, the field does not depend on the wire's thickness.\n" +
        "- Hollow tube with the current on its surface: B = 0 inside, \\(\\dfrac{\\mu_0 I}{2\\pi r}\\) outside, a jump at the surface.\n" +
        "- Coaxial cable with equal and opposite currents in the inner wire and the outer shell: an Amperian circle outside both encloses zero net current, so B = 0 outside the cable.\n" +
        "- Charges going round a circle act as a current: current = total charge × revolutions per second. An Amperian loop counts it once if the current passes through the loop once, and zero if it passes in and back out.",
      formula: {
        label: "Ampère's law and a solid wire",
        latex: "\\oint \\vec B \\cdot d\\vec l = \\mu_0 I_{\\text{enc}} \\qquad B_{\\text{in}} = \\frac{\\mu_0 I r}{2\\pi a^{2}},\\quad B_{\\text{out}} = \\frac{\\mu_0 I}{2\\pi r}",
      },
      authoredExample: {
        prompt:
          "A long straight wire of radius 2 mm carries 10 A spread uniformly over its cross-section. Find the field at 0.5 mm, at 2 mm and at 5 mm from the axis. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "Inside (0.5 mm): \\(B = \\dfrac{\\mu_0 I r}{2\\pi a^{2}} = \\dfrac{2 \\times 10^{-7} \\times 10 \\times 5 \\times 10^{-4}}{(2 \\times 10^{-3})^{2}} = 2.5 \\times 10^{-4}\\) T.",
          "At the surface (2 mm): \\(B = \\dfrac{2 \\times 10^{-7} \\times 10}{2 \\times 10^{-3}} = 10^{-3}\\) T, the largest value anywhere.",
          "Outside (5 mm): \\(B = \\dfrac{2 \\times 10^{-7} \\times 10}{5 \\times 10^{-3}} = 4 \\times 10^{-4}\\) T.",
        ],
        answer: "\\(2.5 \\times 10^{-4}\\) T, \\(10^{-3}\\) T and \\(4 \\times 10^{-4}\\) T.",
      },
      selfCheckExample: {
        prompt:
          "A coaxial cable has an inner wire of radius 1 mm carrying 4 A, and a thin outer shell of radius 5 mm carrying 4 A back. Find the field at 3 mm and at 8 mm from the axis. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "At 3 mm the Amperian circle encloses only the inner wire's 4 A: \\(B = \\dfrac{2 \\times 10^{-7} \\times 4}{3 \\times 10^{-3}} \\approx 2.67 \\times 10^{-4}\\) T.",
          "At 8 mm it encloses 4 A one way and 4 A the other: \\(I_{\\text{enc}} = 0\\), so B = 0.",
        ],
        answer: "About \\(2.67 \\times 10^{-4}\\) T at 3 mm; zero at 8 mm.",
      },
      practiceSet: [
        { prompt: "A thin hollow tube of radius 1 cm carries 5 A along its surface. Find the field at 0.5 cm and at 2 cm from the axis. (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)", answer: "Zero; \\(5 \\times 10^{-5}\\) T" },
        { prompt: "Inside a solid wire of radius a with uniform current, at what distance from the axis is the field a quarter of its surface value?", answer: "a/4" },
        { prompt: "A ring carrying 10 charges of 2 μC each rotates at 50π rad/s about its axis. What current does it carry?", answer: "\\(5 \\times 10^{-4}\\) A" },
        { prompt: "A closed loop encloses a wire carrying 3 A up and another carrying 1 A down. Find the line integral of B round it. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(8\\pi \\times 10^{-7} \\approx 2.51 \\times 10^{-6}\\) T m" },
      ],
      pyqExampleId: "3a25277a-ceea-4483-aea5-5b599b6360f3", // 29 Jan 2025: distances where B is half its maximum, inside and outside, [a/2, 2a]
      traps: [
        {
          title: "Inside a solid wire B grows with r",
          body: "Inside a wire with uniform current, B = μ₀Ir/2πa², which rises from zero at the axis. Using μ₀I/2πr inside gives a field that blows up at the axis, the opposite shape.",
        },
        {
          title: "The field outside a coaxial cable is zero",
          body: "With equal and opposite currents in the inner wire and the shell, a circle outside both encloses no net current, so B = 0 there. Between the conductors only the inner current counts.",
        },
        {
          title: "Only enclosed current counts",
          body: "Current flowing just outside an Amperian loop changes B at points on the loop but not the line integral of B round it. The integral is μ₀ times the current that passes through the loop.",
        },
      ],
    },

    // C2 — solenoid and toroid
    {
      kind: "formula" as const,
      slug: "jpmag-solenoid",
      name: "Field inside a solenoid and a toroid",
      intuition:
        "A long, tightly wound solenoid has a strong, uniform field inside along its axis and almost none outside. Ampère's law round a rectangle that runs inside and comes back outside gives B times the length equal to μ₀ times the current through all the turns in that length. So the field depends only on turns per metre and the current, not on the radius.",
      definition:
        "- Long solenoid: \\(B = \\mu_0 n I\\), where n is turns per METRE (n = N/L). Uniform inside, about half that value at the ends, close to zero outside.\n" +
        "- Magnetic intensity: \\(H = nI\\), in A/m. It does not include \\(\\mu_0\\).\n" +
        "- With a core of relative permeability \\(\\mu_r\\): \\(B = \\mu_0\\mu_r n I\\).\n" +
        "- Toroid of N turns, at radius r inside its core: \\(B = \\dfrac{\\mu_0 N I}{2\\pi r}\\); zero outside.\n" +
        "- Identical solenoids give fields in proportion to the current through each, so in a network split the current first.\n" +
        "- Flux through one cross-section is BA; flux linkage of the whole winding is NBA. Read which one a question asks for.",
      formula: {
        label: "Solenoid, intensity, core and toroid",
        latex: "B = \\mu_0 n I \\qquad H = nI \\qquad B = \\mu_0\\mu_r n I \\qquad B_{\\text{toroid}} = \\frac{\\mu_0 N I}{2\\pi r}",
      },
      authoredExample: {
        prompt:
          "A solenoid 50 cm long has 400 turns and carries 3 A. Find (a) n, (b) the field inside, (c) H, and (d) the field if an iron core of relative permeability 200 fills it. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "(a) \\(n = \\dfrac{400}{0.5} = 800\\) turns per metre.",
          "(b) \\(B = 4\\pi \\times 10^{-7} \\times 800 \\times 3 = 9.6\\pi \\times 10^{-4} \\approx 3.02 \\times 10^{-3}\\) T.",
          "(c) \\(H = nI = 2400\\) A/m.",
          "(d) \\(B = \\mu_r \\times 3.02 \\times 10^{-3} = 200 \\times 3.02 \\times 10^{-3} \\approx 0.60\\) T.",
        ],
        answer: "(a) 800 per metre; (b) about 3.02 mT; (c) 2400 A/m; (d) about 0.60 T.",
      },
      selfCheckExample: {
        prompt:
          "A long solenoid has 15 turns per cm. What current gives a field of \\(3\\pi\\) mT inside it? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "Convert: n = 15 per cm = 1500 per metre.",
          "\\(I = \\dfrac{B}{\\mu_0 n} = \\dfrac{3\\pi \\times 10^{-3}}{4\\pi \\times 10^{-7} \\times 1500} = \\dfrac{3 \\times 10^{-3}}{6 \\times 10^{-4}} = 5\\) A.",
        ],
        answer: "5 A",
      },
      practiceSet: [
        { prompt: "A long solenoid has 10 turns per cm and carries 2 A. Find H and B inside. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "H = 2000 A/m; \\(B = 8\\pi \\times 10^{-4} \\approx 2.51\\) mT" },
        { prompt: "The current in a long solenoid is halved and its turns per metre are tripled. By what factor does the field inside change?", answer: "1.5 times" },
        { prompt: "A toroid of 500 turns and mean radius 10 cm carries 1 A. Field inside its core? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(10^{-3}\\) T" },
        { prompt: "How does the field at the end of a long solenoid compare with the field at its middle?", answer: "It is about half" },
      ],
      pyqExampleId: "c4968ee1-dbd1-46a0-aa26-fe83bff51ea4", // 25 Jan 2023: 1200 turns on a 2 m tube, 2 A, magnetic intensity H = 1.2 × 10³ A/m
      traps: [
        {
          title: "Turns per centimetre must become turns per metre",
          body: "In B = μ₀nI, n is per metre. A winding of 20 turns per cm is n = 2000 per metre; leaving it as 20 makes B a hundred times too small.",
        },
        {
          title: "H has no μ₀ in it",
          body: "Magnetic intensity inside a solenoid is H = nI, in A/m. B = μ₀nI is in tesla. A question that asks for magnetic intensity wants H.",
        },
        {
          title: "Flux and flux linkage differ by N",
          body: "The flux through one cross-section of a solenoid is BA. The flux linked with the whole winding is NBA. The two answers differ by the number of turns, and both appear among the options.",
        },
      ],
    },
  ],
};
