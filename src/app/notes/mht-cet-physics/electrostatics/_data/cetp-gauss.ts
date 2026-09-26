import type { SubtopicNote } from "@/app/notes/_types";

export const GAUSS_NOTE: SubtopicNote = {
  subtopicName: "Gauss's Law and Electric Flux",
  title: "Gauss's Law and Electric Flux",
  oneLineDefinition:
    "The total electric flux out of any closed surface equals the charge inside divided by ε₀ — whatever the surface's size or shape — and for symmetric charge the same law gives the field in one line.",
  whyItMatters:
    "20 PYQs, none HARD: this is the chapter's most reliable marks. Two in three ask only 'what is the flux?', and the answer never depends on the surface's size. " +
    "The rest ask for the field of a symmetric body — sphere, sheet, cylinder, or the surface of a conductor.",
  concepts: [
    // 1 — flux and Gauss's law
    {
      kind: "formula" as const,
      slug: "cetp-gauss-flux",
      name: "Electric Flux and Gauss's Law",
      intuition:
        "Flux counts field lines crossing a surface. Every line leaving a charge must cross any closed surface around it once, however big or odd the surface — so the total flux out depends only on the charge inside. Charges outside send lines in and out again and add nothing.",
      definition:
        "- \\(\\phi = \\oint \\vec E\\cdot d\\vec A = \\dfrac{q_{\\text{enclosed}}}{\\varepsilon_0}\\); unit V m (= N m² C⁻¹).\n" +
        "- Net flux = flux leaving − flux entering: \\(q = \\varepsilon_0(\\phi_2 - \\phi_1)\\).\n" +
        "- Growing the surface (a bigger sphere, an inflating balloon) with the same charge inside leaves \\(\\phi\\) unchanged.\n" +
        "- Charge at the centre of a cube: each face carries \\(\\dfrac{q}{6\\varepsilon_0}\\), two opposite faces \\(\\dfrac{q}{3\\varepsilon_0}\\).\n" +
        "- Closed cylinder with charge inside and flux \\(\\phi\\) through the curved face: each flat end carries \\(\\dfrac{1}{2}\\left(\\dfrac{q}{\\varepsilon_0} - \\phi\\right)\\).\n" +
        "- Charged sphere of surface density \\(\\sigma\\), radius \\(r\\): \\(q = 4\\pi r^2\\sigma\\), \\(\\phi = \\dfrac{4\\pi r^2 \\sigma}{\\varepsilon_0}\\). Watch diameter versus radius.",
      formula: {
        label: "Gauss's law",
        latex: "\\oint \\vec E\\cdot d\\vec A = \\frac{q_{\\text{enc}}}{\\varepsilon_0}",
      },
      authoredExample: {
        prompt: "A conducting sphere of diameter 10 cm carries \\(8.85\\,\\mu\\text{C m}^{-2}\\) on its surface. Total flux leaving it? (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\))",
        steps: [
          "Radius 0.05 m, so \\(q = 4\\pi(0.05)^2 \\times 8.85 \\times 10^{-6}\\).",
          "\\(\\phi = \\dfrac{q}{\\varepsilon_0} = 4\\pi \\times 0.0025 \\times \\dfrac{8.85 \\times 10^{-6}}{8.85 \\times 10^{-12}} = 4\\pi \\times 0.0025 \\times 10^{6} \\approx 3.14 \\times 10^{4}\\ \\text{V m}\\).",
        ],
        answer: "\\(\\approx 3.14 \\times 10^{4}\\) V m",
      },
      selfCheckExample: {
        prompt: "Charges of \\(5\\), \\(-2\\) and \\(3\\,\\mu\\)C lie inside a closed surface and \\(7\\,\\mu\\)C lies just outside. Net outward flux?",
        steps: ["Only the enclosed charge counts: \\(5 - 2 + 3 = 6\\,\\mu\\)C."],
        answer: "\\(\\dfrac{6 \\times 10^{-6}}{\\varepsilon_0}\\) V m",
      },
      practiceSet: [
        { prompt: "Charge \\(q\\) at the centre of a cube: flux through one face?", answer: "\\(\\dfrac{q}{6\\varepsilon_0}\\)" },
        { prompt: "The radius of the Gaussian sphere around a point charge is tripled. New flux?", answer: "Unchanged" },
        { prompt: "Flux entering a closed surface is 20 V m and flux leaving is 50 V m. Charge inside?", answer: "\\(30\\varepsilon_0\\) C" },
        { prompt: "A charge outside a closed surface: its contribution to the net flux?", answer: "Zero" },
      ],
      pyqExampleId: "cfa052b2-a3aa-48bf-b409-8823b540c5e2",
      traps: [
        {
          title: "Subtracting the wrong way round",
          body:
            "Gauss's law counts OUTWARD flux as positive, so the net flux is leaving minus entering: \\(q = \\varepsilon_0(\\phi_2 - \\phi_1)\\). The options pair both orders with both \\(\\varepsilon_0\\) placements — fix the order first, then multiply.",
        },
      ],
    },

    // 2 — fields from Gauss's law
    {
      kind: "formula" as const,
      slug: "cetp-gauss-fields",
      name: "Fields of Spheres, Sheets, Cylinders and Conductors",
      intuition:
        "Pick a surface that matches the symmetry, so the field has one value over it; then Gauss's law gives the field at once. Outside any spherical charge the field is as if the whole charge sat at the centre. Inside a conductor it is zero, and just outside it points straight out.",
      definition:
        "- **Sphere or shell of total charge \\(Q\\), outside (\\(r \\ge R\\)):** \\(E = \\dfrac{kQ}{r^2}\\). With surface density \\(\\sigma\\): \\(E = \\dfrac{\\sigma R^2}{\\varepsilon_0 r^2}\\), \\(r\\) measured from the CENTRE.\n" +
        "- **Inside a conductor or a hollow shell:** \\(E = 0\\).\n" +
        "- **Uniform solid sphere of density \\(\\rho\\):** \\(E = \\dfrac{\\rho r}{3\\varepsilon_0}\\) inside, \\(\\dfrac{\\rho R}{3\\varepsilon_0}\\) on the surface.\n" +
        "- **Infinite sheet:** \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\), independent of distance. **Just outside a conductor:** \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\), normal to the surface.\n" +
        "- **Long charged cylinder:** outside \\(E \\propto \\dfrac{1}{r}\\) (\\(\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\)); inside a uniformly charged one \\(E \\propto r\\).\n" +
        "- **Sphere \\(+3Q\\) inside a shell \\(-Q\\):** between them only the inner charge counts: \\(E = \\dfrac{3Q}{4\\pi\\varepsilon_0 r^2}\\).",
      formula: {
        label: "Three results to recall",
        latex: "E_{\\text{sheet}} = \\frac{\\sigma}{2\\varepsilon_0}, \\qquad E_{\\text{conductor}} = \\frac{\\sigma}{\\varepsilon_0}, \\qquad E_{\\text{solid sphere}}(r \\le R) = \\frac{\\rho r}{3\\varepsilon_0}",
      },
      authoredExample: {
        prompt: "A charge of \\(8.85 \\times 10^{-7}\\) C is spread over a large sheet of area 2 m². Field near it?",
        steps: [
          "\\(\\sigma = \\dfrac{8.85 \\times 10^{-7}}{2} = 4.425 \\times 10^{-7}\\ \\text{C m}^{-2}\\).",
          "\\(E = \\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{4.425 \\times 10^{-7}}{2 \\times 8.85 \\times 10^{-12}} = 2.5 \\times 10^{4}\\ \\text{N C}^{-1}\\), at any distance.",
        ],
        answer: "\\(2.5 \\times 10^{4}\\ \\text{N C}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A uniformly charged solid sphere has density \\(\\rho\\) and radius \\(R\\). Field at \\(r = R/2\\)?",
        steps: ["Inside: \\(E = \\dfrac{\\rho r}{3\\varepsilon_0} = \\dfrac{\\rho R}{6\\varepsilon_0}\\)."],
        answer: "\\(\\dfrac{\\rho R}{6\\varepsilon_0}\\)",
      },
      practiceSet: [
        { prompt: "Field just outside a conductor with surface density \\(\\sigma\\), and its direction?", answer: "\\(\\dfrac{\\sigma}{\\varepsilon_0}\\), normal to the surface" },
        { prompt: "Sphere of radius 0.2 m, \\(\\sigma = 2\\,\\mu\\text{C m}^{-2}\\). Field 0.2 m from its surface?", answer: "\\(\\dfrac{5 \\times 10^{-7}}{\\varepsilon_0}\\ \\text{V m}^{-1}\\) (\\(r = 0.4\\) m)" },
        { prompt: "How does the field inside a uniformly charged long cylinder vary with distance from the axis?", answer: "\\(E \\propto r\\)" },
        { prompt: "Field inside a charged hollow conducting sphere?", answer: "Zero" },
      ],
      pyqExampleId: "b50cb143-1596-4d16-ba5e-f1191a16e3ac",
      traps: [
        {
          title: "Distance from the surface is not distance from the centre",
          body:
            "'0.2 m from a point on the surface' of a 0.1 m sphere puts the point 0.3 m from the centre. The field formula uses the distance from the centre; the other reading lands on an option too.",
        },
        {
          title: "Sheet versus conductor",
          body:
            "A thin sheet of charge sends half its field each way: \\(\\frac{\\sigma}{2\\varepsilon_0}\\). A conductor has field only on its outside: \\(\\frac{\\sigma}{\\varepsilon_0}\\). The paper offers both with both directions.",
        },
      ],
    },
  ],
  related: [
    { label: "Coulomb's Law and Field — where these fields come from", href: "/notes/mht-cet-physics/electrostatics/cetp-coulomb-field" },
    { label: "Electric Potential — the same bodies, as potentials", href: "/notes/mht-cet-physics/electrostatics/cetp-potential" },
  ],
};
