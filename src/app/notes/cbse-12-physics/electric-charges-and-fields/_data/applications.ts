import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Gauss's Law",
  title: "Applications of Gauss's Law",
  oneLineDefinition:
    "Using Gauss's law to find the field of an infinitely long charged wire, an infinite plane sheet and a thin spherical shell, and using these results in problems.",
  whyItMatters:
    "24 questions, nineteen of them from board papers. Deriving one of the three fields is a common long answer: the line charge (2023), the plane sheet (2023, 2024, 2026) and the spherical shell (2024, 2025). The board then asks for the force on a charge near a wire (2023, 2024), the point of zero field near two wires (2025), the field between two charged sheets (2026) and a graph of the field of a shell against distance (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-line-charge",
      name: "Field of an infinitely long charged wire",
      intuition:
        "A long straight wire looks the same from every side and from every point along it, so its field must point straight out from the wire and have the same size all round it at one distance. A cylinder around the wire matches that symmetry, and Gauss's law then gives the field in two lines.",
      definition:
        "- Let the wire have linear charge density λ. By symmetry the field is radial (outward for λ > 0) and has the same size at every point a distance r from the wire.\n" +
        "- **Step 1:** take a cylindrical Gaussian surface of radius r and length l, with the wire along its axis.\n" +
        "- **Step 2:** the field lies along the two flat ends, so they carry no flux. On the curved surface \\(\\vec{E}\\) is along the normal everywhere, so the flux is \\(E \\times 2\\pi rl\\).\n" +
        "- **Step 3:** the charge enclosed is \\(\\lambda l\\). Gauss's law gives \\(E \\times 2\\pi rl = \\dfrac{\\lambda l}{\\varepsilon_0}\\).\n" +
        "- **Step 4:** \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\), or \\(\\vec{E} = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\hat{n}\\), where \\(\\hat{n}\\) is the unit vector pointing radially away from the wire.\n" +
        "- The field falls as \\(1/r\\), more slowly than the \\(1/r^2\\) of a point charge. A charge q near the wire feels \\(F = qE\\).",
      formula: {
        label: "Field of a long charged wire",
        latex: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2\\lambda}{4\\pi\\varepsilon_0 r}",
      },
      authoredExample: {
        prompt: "A long straight wire carries \\(4 \\times 10^{-8}\\) C/m. Find the field 6 cm from it, and the force on an electron placed there.",
        steps: [
          "Given: \\(\\lambda = 4 \\times 10^{-8}\\) C/m, \\(r = 0.06\\) m.",
          "Formula: \\(E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r} = \\dfrac{2 \\times 9 \\times 10^9 \\times \\lambda}{r}\\).",
          "\\(E = \\dfrac{2 \\times 9 \\times 10^9 \\times 4 \\times 10^{-8}}{0.06} = \\dfrac{720}{0.06} = 1.2 \\times 10^4\\) N/C, pointing away from the wire.",
          "Force on the electron: \\(F = eE = 1.6 \\times 10^{-19} \\times 1.2 \\times 10^4 = 1.92 \\times 10^{-15}\\) N, towards the wire.",
        ],
        answer: "\\(1.2 \\times 10^4\\) N/C away from the wire; \\(1.92 \\times 10^{-15}\\) N on the electron, towards the wire",
      },
      selfCheckExample: {
        prompt: "A long charged wire produces a field of \\(3.6 \\times 10^4\\) N/C at a distance of 5 cm. Find its linear charge density.",
        steps: [
          "\\(\\lambda = 2\\pi\\varepsilon_0 rE = \\dfrac{rE}{2 \\times 9 \\times 10^9}\\).",
          "\\(\\lambda = \\dfrac{0.05 \\times 3.6 \\times 10^4}{1.8 \\times 10^{10}} = 1 \\times 10^{-7}\\) C/m.",
        ],
        answer: "\\(1 \\times 10^{-7}\\) C/m",
      },
      practiceSet: [
        { prompt: "How does the field of a long charged wire change when the distance from it is doubled?", answer: "It halves, since \\(E \\propto 1/r\\)" },
        { prompt: "What shape of Gaussian surface is used for a long straight charged wire?", answer: "A cylinder with the wire along its axis" },
        { prompt: "Why do the flat ends of the Gaussian cylinder carry no flux?", answer: "The field is radial, so it lies along the flat ends" },
      ],
      pyqExampleId: "9a357ef1-bc3f-412c-8e6b-cfb04c58ea2e",
      traps: [
        {
          title: "Writing a point charge's formula",
          body: "The field of a wire is \\(\\lambda/(2\\pi\\varepsilon_0 r)\\). Writing \\(4\\pi\\) or \\(r^2\\) mixes it up with the field of a point charge.",
        },
        {
          title: "Skipping the flat ends",
          body: "Say why the flat ends add no flux: \\(\\vec{E}\\) is parallel to them. A derivation that skips this loses a step mark.",
        },
        {
          title: "Looking for zero field between opposite wires",
          body: "Between two wires of opposite sign both fields point the same way and add, so the field cannot be zero there. Look outside the pair, nearer the weaker wire.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-plane-sheet",
      name: "Field of an infinite plane sheet",
      intuition:
        "An infinite sheet looks the same from every point on it, so its field must point straight out from it on both sides. The field does not weaken as you move away, because the sheet has no edge. A small cylinder pushed through the sheet catches flux through both of its flat ends.",
      definition:
        "- Let the sheet have surface charge density σ. By symmetry the field is at right angles to the sheet, pointing away from it on both sides for σ > 0, with the same size at equal distances.\n" +
        "- **Step 1:** take a small cylinder (a pillbox) of cross-section A, its axis at right angles to the sheet and its flat faces on either side of it.\n" +
        "- **Step 2:** the curved surface carries no flux, since \\(\\vec{E}\\) lies along it. Each flat face carries EA outward, so the total flux is 2EA.\n" +
        "- **Step 3:** the charge enclosed is σA. Gauss's law gives \\(2EA = \\dfrac{\\sigma A}{\\varepsilon_0}\\).\n" +
        "- **Step 4:** \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\), or \\(\\vec{E} = \\dfrac{\\sigma}{2\\varepsilon_0}\\hat{n}\\), where \\(\\hat{n}\\) is the unit normal pointing away from the sheet. It does not depend on the distance from the sheet.\n" +
        "- **Two parallel sheets** with +σ and −σ: field σ/ε₀ between them and zero outside. With the same σ on both: zero between them and σ/ε₀ outside.\n" +
        "- Just outside a charged conductor the field is σ/ε₀, twice that of a thin sheet, because the field inside the conductor is zero (taught in the next chapter).",
      formula: {
        label: "Field of a plane sheet, and between two opposite sheets",
        latex: "E = \\frac{\\sigma}{2\\varepsilon_0}\\ (\\text{one sheet}), \\qquad E = \\frac{\\sigma}{\\varepsilon_0}\\ (\\text{between } +\\sigma \\text{ and } -\\sigma)",
      },
      authoredExample: {
        prompt:
          "A large thin sheet carries a surface charge density of \\(1.77 \\times 10^{-7}\\) C/m². Find the field near it, and the force on a proton held 1 cm from it. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) C² N⁻¹ m⁻².",
        steps: [
          "Given: \\(\\sigma = 1.77 \\times 10^{-7}\\) C/m².",
          "Formula: \\(E = \\dfrac{\\sigma}{2\\varepsilon_0}\\).",
          "\\(E = \\dfrac{1.77 \\times 10^{-7}}{2 \\times 8.85 \\times 10^{-12}} = 1 \\times 10^4\\) N/C, away from the sheet. The distance does not enter.",
          "Force on the proton: \\(F = eE = 1.6 \\times 10^{-19} \\times 1 \\times 10^4 = 1.6 \\times 10^{-15}\\) N, away from the sheet.",
        ],
        answer: "\\(1 \\times 10^4\\) N/C; \\(1.6 \\times 10^{-15}\\) N away from the sheet",
      },
      selfCheckExample: {
        prompt:
          "Two large parallel plates carry surface charge densities of \\(+8.85 \\times 10^{-9}\\) C/m² and \\(-8.85 \\times 10^{-9}\\) C/m². Find the field between them and outside them. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) C² N⁻¹ m⁻².",
        steps: [
          "Between the plates the two fields point the same way and add: \\(E = \\dfrac{\\sigma}{\\varepsilon_0} = 1000\\) N/C.",
          "Outside, the two fields are opposite and equal, so they cancel.",
        ],
        answer: "1000 N/C between the plates, from + to −; zero outside",
      },
      practiceSet: [
        { prompt: "Does the field of an infinite charged sheet depend on the distance from it?", answer: "No" },
        { prompt: "Why does the pillbox for a charged sheet have flux through both flat faces?", answer: "The field points away from the sheet on both sides, out through each face" },
        {
          prompt: "How does the field just outside a charged conducting plate compare with that of a thin sheet of the same σ?",
          answer: "It is twice as large: σ/ε₀ against σ/2ε₀",
        },
      ],
      pyqExampleId: "2424f119-506c-4a73-aa7e-4bf9d4ba45f7",
      traps: [
        {
          title: "σ/ε₀ for a thin sheet",
          body: "A thin sheet gives \\(\\sigma/2\\varepsilon_0\\). The value \\(\\sigma/\\varepsilon_0\\) is for the gap between two oppositely charged sheets, or just outside a conductor.",
        },
        {
          title: "Counting one face of the pillbox",
          body: "The pillbox has two flat faces, so the flux is 2EA. Counting only one gives a field twice too large.",
        },
        {
          title: "No figure in the derivation",
          body: "Draw the sheet, the pillbox through it and arrows for \\(\\vec{E}\\) on both sides, and label A and σ. The labelled figure carries a mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-shell",
      name: "Field of a thin spherical shell",
      intuition:
        "A charged shell is the same in every direction, so a sphere about its centre is the right Gaussian surface. Outside, the shell acts as if all its charge sat at the centre. Inside, the sphere you draw holds no charge at all, so the field there is zero.",
      definition:
        "- Let the shell have radius R and uniform surface charge density σ, so its total charge is \\(q = 4\\pi R^2\\sigma\\). By symmetry the field is radial, with the same size at every point a distance r from the centre.\n" +
        "- **Outside (r > R):** take a concentric sphere of radius r. Gauss's law gives \\(E \\times 4\\pi r^2 = \\dfrac{q}{\\varepsilon_0}\\), so \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2} = \\dfrac{\\sigma R^2}{\\varepsilon_0 r^2}\\), as if all the charge were at the centre.\n" +
        "- **Inside (r < R):** the Gaussian sphere encloses no charge, so \\(E \\times 4\\pi r^2 = 0\\) and **E = 0** everywhere inside.\n" +
        "- **Just outside the surface:** \\(E = \\dfrac{\\sigma}{\\varepsilon_0}\\), the same for any radius at the same σ.\n" +
        "- Graph of E against r: zero up to R, its largest value just outside R, then falling as \\(1/r^2\\).\n" +
        "- Outside any charge that is spread with spherical symmetry, only the total charge inside matters.",
      formula: {
        label: "Field of a thin charged shell",
        latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^{2}}\\ (r > R), \\qquad E = 0\\ (r < R)",
      },
      authoredExample: {
        prompt: "A thin spherical shell of radius 0.1 m carries a charge of \\(+5\\) nC. Find the field at 0.05 m, just outside the surface, and at 0.3 m from the centre.",
        steps: [
          "Given: \\(q = 5 \\times 10^{-9}\\) C, \\(R = 0.1\\) m, so \\(\\dfrac{q}{4\\pi\\varepsilon_0} = 9 \\times 10^9 \\times 5 \\times 10^{-9} = 45\\) N m² C⁻¹.",
          "At 0.05 m the point is inside the shell, so \\(E = 0\\).",
          "Just outside, r = 0.1 m: \\(E = \\dfrac{45}{(0.1)^2} = 4500\\) N/C.",
          "At 0.3 m: \\(E = \\dfrac{45}{(0.3)^2} = 500\\) N/C, pointing away from the centre.",
        ],
        answer: "0 inside; 4500 N/C just outside; 500 N/C at 0.3 m",
      },
      selfCheckExample: {
        prompt: "The field 20 cm from the centre of a small charged sphere is 2700 N/C and points towards the centre. Find the charge on the sphere.",
        steps: [
          "Outside, \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q|}{r^2}\\), so \\(|q| = \\dfrac{Er^2}{9 \\times 10^9} = \\dfrac{2700 \\times 0.04}{9 \\times 10^9} = 1.2 \\times 10^{-8}\\) C.",
          "The field points inward, so the charge is negative.",
        ],
        answer: "\\(-1.2 \\times 10^{-8}\\) C, that is −12 nC",
      },
      practiceSet: [
        { prompt: "What is the electric field at the centre of a uniformly charged thin shell?", answer: "Zero" },
        {
          prompt: "Three shells of the same radius carry the same total charge, but split differently between the shell and a small ball at the centre. Compare their fields far outside.",
          answer: "Equal; outside, only the total charge counts",
        },
        { prompt: "On a graph of E against r for a charged thin shell, where is E largest?", answer: "Just outside the surface, at r = R" },
      ],
      pyqExampleId: "0eab8bea-7df0-4b19-a861-ae9cbd95bbb2",
      traps: [
        {
          title: "A field inside the shell",
          body: "Inside a thin charged shell E = 0, not \\(q/(4\\pi\\varepsilon_0 r^2)\\). The Gaussian sphere drawn inside encloses no charge.",
        },
        {
          title: "Drawing the graph wrongly inside",
          body: "On the graph of E against r for a thin shell, E stays at zero right up to R, jumps to its largest value at R, then falls as \\(1/r^2\\). Label both axes and mark R.",
        },
      ],
    },
  ],
};
