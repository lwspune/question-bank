import type { SubtopicNote } from "@/app/notes/_types";

export const FIELD_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Newton's Law, Gravitational Field and Potential",
  title: "Newton's Law, Gravitational Field and Potential",
  oneLineDefinition:
    "Gravitational forces add as vectors, a sphere or shell acts as a point mass from outside, and potential energy is a sum of −Gm₁m₂/r over every pair.",
  whyItMatters:
    "Twenty PYQs, nineteen of them multiple choice, and three from 2026. Seven add the pulls of several masses, seven ask for the field or potential of a sphere, a shell or a sphere with a cavity, and six ask for potential energy or the work needed to move masses. Six of the twenty come with a figure, so draw the arrangement before you add anything.",
  concepts: [
    // C1 — Newton's law and superposition
    {
      kind: "formula" as const,
      slug: "jpgrav-superposition",
      name: "Newton's law and adding the pulls of several masses",
      intuition:
        "Each mass pulls along the line joining it to the test mass, with a strength \\(Gm_1m_2/r^{2}\\). Several pulls add as vectors. Symmetry does most of the work: equal masses on opposite sides cancel, so look for pairs before you resolve anything.",
      definition:
        "- \\(F = \\dfrac{Gm_1m_2}{r^{2}}\\), attractive, along the line of centres; \\(G = 6.67 \\times 10^{-11}\\ \\text{N m}^{2}/\\text{kg}^{2}\\).\n" +
        "- Forces from several masses add as vectors. Pair masses that sit opposite each other first: only the DIFFERENCE of their pulls survives, along their line.\n" +
        "- Equal masses at the corners of a square, or spread round a full ring, give zero force at the centre.\n" +
        "- On a mass at one corner of a square of side \\(a\\) with equal masses m at the other three: \\(\\left(\\sqrt{2} + \\tfrac{1}{2}\\right)\\dfrac{Gm^{2}}{a^{2}}\\) along the diagonal.\n" +
        "- Splitting a total mass between two bodies: the product \\(m_1m_2\\), and so the force, is largest for an equal split.\n" +
        "- Semicircular wire of mass M and length L, at its centre: \\(R = L/\\pi\\) and \\(F = \\dfrac{2GMm}{\\pi R^{2}} = \\dfrac{2\\pi GMm}{L^{2}}\\).\n" +
        "- Ring of mass M and radius R, on its axis at distance x: \\(E = \\dfrac{GMx}{(R^{2} + x^{2})^{3/2}}\\).",
      formula: {
        label: "Newton's law of gravitation",
        latex: "F = \\frac{Gm_1m_2}{r^{2}} \\qquad \\vec F_{\\text{net}} = \\sum_i \\vec F_i",
      },
      authoredExample: {
        prompt:
          "Three particles of mass 2 kg each sit at the corners of an equilateral triangle of side 1 m. Find the net gravitational force on one of them.",
        steps: [
          "Each of the other two pulls with \\(F = \\dfrac{G \\times 2 \\times 2}{1^{2}} = 4G\\).",
          "The two pulls are along the two sides, which meet at 60°.",
          "The resultant of two equal forces at 60° is \\(2F\\cos 30^{\\circ} = \\sqrt{3}F\\).",
          "\\(\\sqrt{3} \\times 4G = 4\\sqrt{3}\\,G = 6.93 \\times 6.67 \\times 10^{-11} = 4.62 \\times 10^{-10}\\) N, along the bisector of the angle.",
        ],
        answer: "\\(4\\sqrt{3}\\,G \\approx 4.6 \\times 10^{-10}\\) N",
      },
      selfCheckExample: {
        prompt:
          "Two bodies of equal mass m attract each other with a force F. Half the mass of one is moved to the other, and the distance is unchanged. Find the new force.",
        steps: [
          "The masses become \\(\\dfrac{m}{2}\\) and \\(\\dfrac{3m}{2}\\).",
          "Their product is \\(\\dfrac{3m^{2}}{4}\\), against \\(m^{2}\\) before.",
          "The force scales with the product.",
        ],
        answer: "\\(\\dfrac{3F}{4}\\)",
      },
      practiceSet: [
        { prompt: "Masses of 4 kg and 9 kg are 10 m apart. Where between them is the net force on a third mass zero?", answer: "4 m from the 4 kg mass", method: "\\(x/(10 - x) = \\sqrt{4/9}\\)" },
        { prompt: "Four equal masses sit at the corners of a square. Net force on a fifth mass at the centre?", answer: "Zero" },
        { prompt: "Field of a ring of mass M and radius R at a point on its axis at distance R from the centre?", answer: "\\(\\dfrac{GM}{2\\sqrt{2}R^{2}}\\)" },
        { prompt: "Field at the centre of a uniform ring?", answer: "Zero" },
      ],
      pyqExampleId: "df7c5976-8b75-4a02-8984-172a622e5d8b", // 31 Jan 2024: four masses on a square, force on one → side 4L
      traps: [
        {
          title: "Opposite masses leave only their difference",
          body: "Masses M and 3M at opposite corners pull a test mass at the centre in opposite directions. The net pull is G(3M − M)m/r² towards 3M. Do the pairs first, then add the two diagonal results at 90°.",
        },
        {
          title: "A semicircle does not cancel",
          body: "A full ring gives zero force at its centre. A half ring does not: the components along the diameter cancel, but the ones towards the arc add to 2GMm/(πR²).",
        },
        {
          title: "Moving mass between two bodies weakens the pull",
          body: "The total mass stays the same, but the product m₁m₂ falls as the split becomes unequal. An equal split always gives the largest force.",
        },
      ],
    },

    // C2 — field and potential of spheres, shells and cavities
    {
      kind: "formula" as const,
      slug: "jpgrav-field-potential",
      name: "Field and potential of a sphere, a shell and a cavity",
      intuition:
        "Outside a uniform sphere or shell, all its mass acts as if it were at the centre. Inside a shell the pulls cancel, so the field is zero, but the potential is not: it keeps the surface value. Inside a solid sphere only the mass nearer the centre pulls, so the field grows in proportion to r.",
      definition:
        "- Outside (r ≥ R), sphere or shell: \\(E = \\dfrac{GM}{r^{2}}\\), \\(V = -\\dfrac{GM}{r}\\). Dividing, \\(r = \\dfrac{|V|}{E}\\).\n" +
        "- Inside a shell: \\(E = 0\\) and \\(V = -\\dfrac{GM}{R}\\), the same everywhere inside. The potential is constant, not zero.\n" +
        "- Inside a uniform solid sphere: \\(E = \\dfrac{GMr}{R^{3}}\\) and \\(V = -\\dfrac{GM(3R^{2} - r^{2})}{2R^{3}}\\). At the centre \\(V = -\\dfrac{3GM}{2R}\\), which is 1.5 times the surface value.\n" +
        "- Field and potential are linked by \\(V(r_2) - V(r_1) = -\\int_{r_1}^{r_2} E\\,dr\\).\n" +
        "- A cavity: treat it as the whole sphere plus a NEGATIVE sphere of mass \\(M(r/R)^{3}\\) at the cavity's centre. Subtract its pull or potential.\n" +
        "- Potentials are scalars and simply add: a mass at the centre of a shell gives \\(V = -\\dfrac{Gm}{r} - \\dfrac{GM}{R}\\) inside the shell.",
      formula: {
        label: "Uniform sphere of mass M and radius R",
        latex: "r \\ge R:\\ E = \\frac{GM}{r^{2}},\\ V = -\\frac{GM}{r} \\qquad r < R:\\ E = \\frac{GMr}{R^{3}},\\ V = -\\frac{GM(3R^{2} - r^{2})}{2R^{3}}",
      },
      authoredExample: {
        prompt:
          "A uniform solid sphere of mass M and radius R pulls a particle at distance 4R from its centre with force \\(F_1\\). A spherical cavity of radius \\(R/2\\) is cut out; its centre is at \\(R/2\\) from O, on the particle's side. The force becomes \\(F_2\\). Find \\(F_1 : F_2\\).",
        steps: [
          "\\(F_1 = \\dfrac{GMm}{(4R)^{2}} = \\dfrac{GMm}{16R^{2}}\\).",
          "The removed sphere has mass \\(M\\left(\\tfrac{1}{2}\\right)^{3} = \\dfrac{M}{8}\\), and its centre is \\(4R - \\tfrac{R}{2} = \\tfrac{7R}{2}\\) from the particle.",
          "Its pull: \\(\\dfrac{G(M/8)m}{(7R/2)^{2}} = \\dfrac{GMm}{98R^{2}}\\).",
          "\\(F_2 = \\dfrac{GMm}{R^{2}}\\left(\\dfrac{1}{16} - \\dfrac{1}{98}\\right) = \\dfrac{GMm}{R^{2}} \\cdot \\dfrac{49 - 8}{784} = \\dfrac{41}{784}\\dfrac{GMm}{R^{2}}\\).",
          "\\(\\dfrac{F_1}{F_2} = \\dfrac{49/784}{41/784} = \\dfrac{49}{41}\\). It is more than 1, as it must be: removing mass weakens the pull.",
        ],
        answer: "\\(49 : 41\\)",
      },
      selfCheckExample: {
        prompt:
          "Near a planet of radius 4000 km, the gravitational potential at a point is \\(-1.2 \\times 10^{7}\\) J/kg and the field there is 2.4 N/kg. How high above the surface is the point?",
        steps: [
          "\\(r = \\dfrac{|V|}{E} = \\dfrac{1.2 \\times 10^{7}}{2.4} = 5 \\times 10^{6}\\) m \\(= 5000\\) km from the centre.",
          "Height \\(= 5000 - 4000\\) km.",
        ],
        answer: "1000 km",
      },
      practiceSet: [
        { prompt: "The potential on the surface of a uniform solid sphere is V. Potential at its centre?", answer: "\\(\\dfrac{3V}{2}\\)" },
        { prompt: "Field at a point inside a uniform spherical shell?", answer: "Zero" },
        { prompt: "Field at \\(r = R/2\\) inside a uniform solid sphere, in terms of the surface value g?", answer: "\\(\\dfrac{g}{2}\\)" },
        { prompt: "A 20 kg mass sits at the centre of a 40 kg shell of radius 10 m. Potential at 5 m from the centre?", answer: "\\(-8G\\) J/kg", method: "\\(-G\\left(\\tfrac{20}{5} + \\tfrac{40}{10}\\right)\\)" },
      ],
      pyqExampleId: "9d86e807-5f25-4f2e-ae2e-4149b0fed719", // 30 Jan 2024: V and g at a point → height 1600 km
      traps: [
        {
          title: "Zero field inside a shell, not zero potential",
          body: "Inside a uniform shell the field is zero, so the potential does not change. It stays at −GM/R, the surface value. 'Potential is zero inside' is the wrong option.",
        },
        {
          title: "A cavity ratio is always more than 1",
          body: "F₁ (whole sphere) is larger than F₂ (sphere with a hole). If your F₁ : F₂ comes out below 1, you have inverted it, and the inverted ratio is usually one of the options.",
        },
        {
          title: "Measure the cavity's distance to its own centre",
          body: "The negative sphere sits at the cavity's centre, not at O. Check from the figure whether the cavity is on the particle's side or the far side; the distance changes.",
        },
      ],
    },

    // C3 — potential energy of a system and work to move masses
    {
      kind: "formula" as const,
      slug: "jpgrav-potential-energy",
      name: "Potential energy of a system and work to rearrange it",
      intuition:
        "Gravitational potential energy belongs to a pair of masses, and it is negative: it is zero when they are infinitely far apart. A system's energy is the sum over every pair. The work an outside agent does to rearrange the masses slowly is the final energy minus the initial energy.",
      definition:
        "- One pair: \\(U = -\\dfrac{Gm_1m_2}{r}\\).\n" +
        "- A system: add \\(-\\dfrac{Gm_im_j}{r_{ij}}\\) over EVERY pair. Four masses on a square have 4 sides and 2 diagonals; a fifth mass at the centre adds 4 more pairs.\n" +
        "- Work done by an external agent: \\(W = U_f - U_i\\). Spreading masses out needs positive work.\n" +
        "- Lifting m from the surface to height h: \\(\\Delta U = \\dfrac{GMmh}{R(R + h)} = \\dfrac{mgh}{1 + h/R}\\).\n" +
        "- Only for \\(h \\ll R\\) does this reduce to \\(mgh\\). At \\(h = R\\) it is \\(\\tfrac{1}{2}mgR\\); at \\(h = 2R\\), \\(\\tfrac{2}{3}mgR\\); at \\(h = 3R\\), \\(\\tfrac{3}{4}mgR\\).",
      formula: {
        label: "Potential energy",
        latex: "U = -\\sum_{\\text{pairs}} \\frac{Gm_im_j}{r_{ij}} \\qquad \\Delta U_{R \\to R+h} = \\frac{mgh}{1 + h/R}",
      },
      authoredExample: {
        prompt:
          "Masses of 1 kg, 2 kg and 3 kg sit at the corners of an equilateral triangle of side 2 m. They are moved to the corners of a triangle of side 4 m. How much work is needed? Take \\(G = 6.67 \\times 10^{-11}\\ \\text{N m}^{2}/\\text{kg}^{2}\\).",
        steps: [
          "Every pair is one side apart. Sum of the pair products: \\(1 \\times 2 + 2 \\times 3 + 1 \\times 3 = 11\\ \\text{kg}^{2}\\).",
          "\\(U_i = -\\dfrac{11G}{2}\\) and \\(U_f = -\\dfrac{11G}{4}\\).",
          "\\(W = U_f - U_i = -\\dfrac{11G}{4} + \\dfrac{11G}{2} = \\dfrac{11G}{4}\\).",
          "\\(\\dfrac{11}{4} \\times 6.67 \\times 10^{-11} = 1.83 \\times 10^{-10}\\) J. It is positive: pulling attracting masses apart takes work.",
        ],
        answer: "\\(1.83 \\times 10^{-10}\\) J",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg body is raised from the earth's surface to a height equal to the earth's radius. Find the gain in potential energy. Take \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "\\(\\Delta U = \\dfrac{mgh}{1 + h/R}\\) with \\(h = R\\) gives \\(\\dfrac{mgR}{2}\\).",
          "\\(\\dfrac{2 \\times 10 \\times 6.4 \\times 10^{6}}{2} = 6.4 \\times 10^{7}\\) J.",
        ],
        answer: "\\(6.4 \\times 10^{7}\\) J",
      },
      practiceSet: [
        { prompt: "Four equal masses m sit at the corners of a square of side a. Total potential energy?", answer: "\\(-\\dfrac{Gm^{2}}{a}\\left(4 + \\sqrt{2}\\right)\\)" },
        { prompt: "Gain in potential energy when m is raised from the surface to height \\(R/2\\)?", answer: "\\(\\dfrac{mgR}{3}\\)" },
        { prompt: "Potential energy of two 1 kg masses 1 m apart?", answer: "\\(-6.67 \\times 10^{-11}\\) J" },
        { prompt: "Work to separate two masses M, initially r apart, to infinity?", answer: "\\(\\dfrac{GM^{2}}{r}\\)" },
      ],
      pyqExampleId: "3fd65851-4bde-4bef-9b74-d348dff9f44c", // 24 Jan 2026 S1: three masses moved to a bigger triangle → work
      traps: [
        {
          title: "Count the diagonals",
          body: "A square of masses has six pairs, not four. Leaving out the two diagonal pairs is the most common wrong option.",
        },
        {
          title: "mgh fails when h is comparable to R",
          body: "Raising m to height 2R gains (2/3)mgR, not 2mgR. Use mgh/(1 + h/R) unless h is a small fraction of R.",
        },
        {
          title: "Maximum potential energy usually means maximum size",
          body: "Gravitational potential energy is negative. When a question asks when it is 'maximum', it means largest in magnitude, that is, most negative.",
        },
      ],
    },
  ],
};
