import type { SubtopicNote } from "@/app/notes/_types";

export const MOMENT_OF_INERTIA_NOTE: SubtopicNote = {
  subtopicName: "Moment of Inertia and Radius of Gyration",
  title: "Moment of Inertia and Radius of Gyration",
  oneLineDefinition:
    "Moment of inertia I = Σmr² measures how hard a body is to spin up — it depends on the mass AND on how far that mass sits from the axis; the radius of gyration k is the single distance at which all the mass would give the same I.",
  whyItMatters:
    "23 PYQs, six HARD — all six rebuild a body (melt it, recast it, bend a rod into a ring) or scale one made of the same material, and ask for the new I. " +
    "The rest compare standard bodies of the same mass, or ask for a radius of gyration. Know the six standard results cold and every question is a ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-standard-mi",
      name: "Moment of Inertia of Standard Bodies",
      intuition:
        "The further the mass is from the axis, the larger I. A ring keeps all its mass at the rim (MR²); a disc spreads it inward (MR²/2); a solid sphere spreads it through the volume (2MR²/5). For the same mass and radius, the hollow body always beats the solid one.",
      definition:
        "- Ring about its axis: \\(MR^2\\); about a diameter: \\(\\dfrac{MR^2}{2}\\).\n" +
        "- Disc (or solid cylinder) about its axis: \\(\\dfrac{MR^2}{2}\\); disc about a diameter: \\(\\dfrac{MR^2}{4}\\). Annular disc: \\(\\dfrac{M}{2}(R_1^2 + R_2^2)\\).\n" +
        "- Solid sphere about a diameter: \\(\\dfrac{2}{5}MR^2\\); thin spherical shell: \\(\\dfrac{2}{3}MR^2\\).\n" +
        "- Rod about its centre: \\(\\dfrac{ML^2}{12}\\); about an end: \\(\\dfrac{ML^2}{3}\\). Square plate about a perpendicular central axis: \\(\\dfrac{Ma^2}{6}\\).\n" +
        "- Semicircular wire about its diameter: same as the full ring's \\(\\dfrac{MR^2}{2}\\), with \\(R = \\dfrac{L}{\\pi}\\).\n" +
        "- Same torque on a disc and a ring of equal mass and radius: the disc (smaller I) gains angular speed faster.",
      formula: {
        label: "Definition",
        latex: "I = \\sum m_i r_i^2, \\qquad I_{\\text{ring}} = MR^2,\\; I_{\\text{disc}} = \\tfrac{1}{2}MR^2,\\; I_{\\text{sphere}} = \\tfrac{2}{5}MR^2",
      },
      authoredExample: {
        prompt: "A solid sphere and a thin spherical shell have the same mass and radius. Ratio of their moments of inertia about a diameter?",
        steps: ["\\(\\dfrac{2}{5} : \\dfrac{2}{3} = 6 : 10 = 3 : 5\\)."],
        answer: "3 : 5",
      },
      selfCheckExample: {
        prompt: "An annular disc of mass 4 kg has inner and outer radii 2 m and 4 m. Moment of inertia about its axis?",
        steps: ["\\(\\dfrac{4}{2}(4 + 16) = 40\\) kg m²."],
        answer: "40 kg m²",
      },
      practiceSet: [
        { prompt: "Same mass and radius: which has more I about a diameter, a solid or a hollow sphere?", answer: "The hollow sphere" },
        { prompt: "Thin wire of mass M, length L, bent into a semicircle: I about its diameter?", answer: "\\(\\dfrac{ML^2}{2\\pi^2}\\)" },
        { prompt: "Same torque on a disc and a ring of equal M and R: which spins up faster?", answer: "The disc" },
      ],
      pyqExampleId: "a40ae63a-f401-4f20-a767-6a834439cc63",
      traps: [
        {
          title: "'Same material' does not mean 'same radius'",
          body:
            "A solid sphere and a hollow one of the same MASS and material cannot have the same radius: the hollow one is bigger, so \\(I_h > I_s\\) even more clearly than the standard formulas suggest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-radius-of-gyration",
      name: "Radius of Gyration",
      intuition:
        "Squash all of a body's mass into a thin ring of radius k and it would have the same moment of inertia: I = Mk². So k is just √(I/M), and comparing k's is comparing I's with the mass divided out.",
      definition:
        "- \\(k = \\sqrt{\\dfrac{I}{M}}\\).\n" +
        "- Ring about its axis: \\(k = R\\); disc about its axis: \\(\\dfrac{R}{\\sqrt{2}}\\); disc about a diameter: \\(\\dfrac{R}{2}\\); solid sphere: \\(R\\sqrt{\\dfrac{2}{5}}\\); rod about an end: \\(\\dfrac{L}{\\sqrt{3}}\\).\n" +
        "- Disc to ring, same M and R: \\(k_d : k_r = 1 : \\sqrt{2}\\). Disc, axis versus diameter: \\(\\sqrt{2} : 1\\).\n" +
        "- Four equal particles at the corners of a square of side L, central perpendicular axis: \\(k = \\dfrac{L}{\\sqrt{2}}\\) — the distance of each from the centre.",
      formula: {
        label: "Radius of gyration",
        latex: "I = Mk^2 \\;\\Rightarrow\\; k = \\sqrt{\\frac{I}{M}}",
      },
      authoredExample: {
        prompt: "Radius of gyration of a solid sphere of radius 10 cm about a diameter?",
        steps: ["\\(k = R\\sqrt{\\dfrac{2}{5}} = 10 \\times 0.632 \\approx 6.3\\) cm."],
        answer: "≈ 6.3 cm",
      },
      selfCheckExample: {
        prompt: "A thin rod of length L: radius of gyration about one end?",
        steps: ["\\(I = \\dfrac{ML^2}{3}\\), so \\(k = \\dfrac{L}{\\sqrt{3}}\\)."],
        answer: "\\(\\dfrac{L}{\\sqrt{3}}\\)",
      },
      practiceSet: [
        { prompt: "k of a disc about a diameter?", answer: "\\(\\dfrac{R}{2}\\)" },
        { prompt: "k of a ring about its axis?", answer: "R" },
        { prompt: "Ratio of k for a disc about its axis to k about a diameter?", answer: "\\(\\sqrt{2} : 1\\)" },
      ],
      pyqExampleId: "7fc55d6e-26b6-4556-92b7-0bcf82db2da6",
      traps: [
        {
          title: "Comparing I and reporting it as k",
          body:
            "The disc-to-ring ratio of I is 1 : 2, but of k it is \\(1 : \\sqrt{2}\\) — k is a square root. Both ratios are offered.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mi-scaling",
      name: "Rebuilt Bodies: Recasting, Bending and Scaling",
      intuition:
        "When a body is melted and recast, or a rod is bent into a ring, the MASS stays and the shape changes. Find the new radius from volume (or length), then put it into the new body's formula. For bodies made of the same stuff, the mass itself scales with size, so I climbs steeply with radius.",
      definition:
        "- Same wire, loops of radius R: \\(M \\propto R\\), \\(I = MR^2 \\propto R^3\\). \\(\\dfrac{I_P}{I_Q} = 27 \\Rightarrow \\dfrac{R_P}{R_Q} = 3\\).\n" +
        "- Same material and thickness, discs: \\(M \\propto R^2\\), \\(I \\propto R^4\\). Same mass and thickness, different densities: \\(I \\propto \\dfrac{1}{d}\\).\n" +
        "- Equal-mass spheres of densities \\(\\rho_A, \\rho_B\\): \\(\\dfrac{I_B}{I_A} = \\left(\\dfrac{\\rho_A}{\\rho_B}\\right)^{2/3}\\).\n" +
        "- Disc of thickness \\(\\dfrac{R}{6}\\) recast into a sphere: \\(r = \\dfrac{R}{2}\\), \\(I_{\\text{sphere}} = \\dfrac{I}{5}\\). One sphere into \\(n\\) equal ones: each \\(\\dfrac{I}{n^{5/3}}\\) — 27 spheres give \\(\\dfrac{I}{243}\\).\n" +
        "- Rod (\\(\\dfrac{ML^2}{12}\\) about its centre) bent into a ring of radius \\(\\dfrac{L}{2\\pi}\\): about a diameter \\(\\dfrac{ML^2}{8\\pi^2}\\), a ratio \\(\\dfrac{I_{\\text{ring}}}{I_{\\text{rod}}} = \\dfrac{3}{2\\pi^2}\\).",
      formula: {
        label: "Scaling for the same material",
        latex: "\\text{loop: } I \\propto R^3, \\qquad \\text{disc (same thickness): } I \\propto R^4",
      },
      authoredExample: {
        prompt: "Two loops are made from the same wire, radii in the ratio 1 : 2. Ratio of their moments of inertia about their axes?",
        steps: ["\\(I \\propto R^3\\): \\(1 : 8\\)."],
        answer: "1 : 8",
      },
      selfCheckExample: {
        prompt: "One solid sphere is recast into 64 equal spheres. Moment of inertia of each about a diameter, in terms of the original I?",
        steps: ["Each has mass \\(\\dfrac{M}{64}\\) and radius \\(\\dfrac{R}{4}\\): \\(\\dfrac{1}{64} \\times \\dfrac{1}{16} = \\dfrac{1}{1024}\\)."],
        answer: "\\(\\dfrac{I}{1024}\\)",
      },
      practiceSet: [
        { prompt: "Discs of the same material and thickness, radii R and 3R. Ratio of I?", answer: "1 : 81" },
        { prompt: "A rod bent into a ring: I about the ring's axis over I of the rod about its centre?", answer: "\\(\\dfrac{3}{\\pi^2}\\)" },
        { prompt: "Loop Q (radius nr) has 4 times the I of loop P (radius r), same wire. n?", answer: "\\(2^{2/3}\\)" },
      ],
      pyqExampleId: "c9587147-7ca6-4bd2-8f9b-32fc168299e8",
      traps: [
        {
          title: "Keeping the radius when the material fixes the mass",
          body:
            "For loops of the same wire, \\(I \\propto R^3\\), not \\(R^2\\) — the bigger loop also has more wire. A ratio of 27 in I is 3 in radius; answering \\(\\sqrt{27}\\) forgets the mass.",
        },
      ],
    },
  ],
  related: [
    { label: "Parallel and Perpendicular Axis Theorems", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-axis-theorems" },
    { label: "Rotational Kinetic Energy and Rolling", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-rolling" },
  ],
};
