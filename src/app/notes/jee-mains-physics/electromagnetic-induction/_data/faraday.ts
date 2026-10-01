import type { SubtopicNote } from "@/app/notes/_types";

export const FARADAY_EMI_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Flux, Faraday's Law and Lenz's Law",
  title: "Magnetic Flux, Faraday's Law and Lenz's Law",
  oneLineDefinition:
    "Flux is NBA cos θ with θ measured from the normal; the induced emf is the rate at which the flux changes, ε = −dΦ/dt, and the induced current always flows so as to oppose that change.",
  whyItMatters:
    "Thirty PYQs, eighteen of them multiple choice, and seven from 2026. Fifteen ask for an emf or a current from a flux that changes, through a field, an area or a flux formula in time; six ask for the charge, heat or power that follows; nine are about the direction of the induced current, or which changes induce an emf at all. Nearly all of them start by writing the flux down.",
  concepts: [
    // C1 — emf from a changing flux
    {
      kind: "formula" as const,
      slug: "jpemi-flux-change",
      name: "Induced emf from a changing magnetic flux",
      intuition:
        "Flux counts the field lines through a loop: the field times the area, times the cosine of the angle between the field and the loop's NORMAL. The emf is how fast that number changes. So find what is changing, the field, the area or the angle, write the flux as a function of time, and differentiate. Only the field component along the normal counts.",
      definition:
        "- \\(\\Phi = NBA\\cos\\theta\\), with \\(\\theta\\) between \\(\\vec B\\) and the normal. Plane perpendicular to B: \\(\\theta = 0\\), full flux. Plane parallel to B: zero flux.\n" +
        "- \\(\\varepsilon = -\\dfrac{d\\Phi}{dt}\\), and the current is \\(I = \\varepsilon/R\\). The minus sign is Lenz's law; for a size, take the magnitude.\n" +
        "- Flux given as a polynomial in t: differentiate, then put in t. A constant term in \\(\\Phi\\) adds nothing.\n" +
        "- Field changing, area fixed: \\(\\varepsilon = NA\\cos\\theta\\,\\dfrac{dB}{dt}\\). On a B–t graph, dB/dt is the slope of the segment. For \\(B = B_0\\sin\\omega t\\), the largest emf is \\(NAB_0\\omega\\cos\\theta\\).\n" +
        "- Field as a vector, loop in a coordinate plane: keep only the component along the loop's normal (a loop in the xy-plane sees only \\(B_z\\)).\n" +
        "- Loop inside a long solenoid: \\(B = \\mu_0 nI\\), and the area is the LOOP's area, not the solenoid's.\n" +
        "- Area changing in a fixed field: a circle with \\(dr/dt\\) gives \\(\\varepsilon = B \\cdot 2\\pi r\\,\\dfrac{dr}{dt}\\). A circle reshaped into a square of the same perimeter loses area, so flux changes.\n" +
        "- A finite change over a time: average emf \\(= \\Delta\\Phi/\\Delta t\\).",
      formula: {
        label: "Flux and Faraday's law",
        latex: "\\Phi = NBA\\cos\\theta \\qquad \\varepsilon = -\\frac{d\\Phi}{dt}",
      },
      authoredExample: {
        prompt:
          "A coil of 100 turns and area \\(30\\ \\text{cm}^{2}\\) has its normal at \\(37^{\\circ}\\) to a uniform field. The field rises steadily from \\(0.1\\ \\text{T}\\) to \\(0.6\\ \\text{T}\\) in \\(0.2\\ \\text{s}\\). Find the induced emf. (Take \\(\\cos 37^{\\circ} = 0.8\\).)",
        steps: [
          "Only the field changes, so \\(\\varepsilon = NA\\cos\\theta\\,\\dfrac{\\Delta B}{\\Delta t}\\).",
          "\\(\\dfrac{\\Delta B}{\\Delta t} = \\dfrac{0.6 - 0.1}{0.2} = 2.5\\ \\text{T/s}\\), and \\(A = 30 \\times 10^{-4} = 3 \\times 10^{-3}\\ \\text{m}^{2}\\).",
          "\\(\\varepsilon = 100 \\times 3 \\times 10^{-3} \\times 0.8 \\times 2.5 = 0.6\\ \\text{V}\\).",
        ],
        answer: "\\(0.6\\ \\text{V}\\)",
      },
      selfCheckExample: {
        prompt:
          "The flux through a circuit of resistance \\(5\\ \\Omega\\) is \\(\\Phi = (2t^{3} - 5t + 7)\\ \\text{Wb}\\), with t in seconds. Find the induced current at \\(t = 2\\ \\text{s}\\).",
        steps: [
          "\\(\\dfrac{d\\Phi}{dt} = 6t^{2} - 5\\); the constant 7 drops out.",
          "At \\(t = 2\\): \\(6 \\times 4 - 5 = 19\\), so \\(|\\varepsilon| = 19\\ \\text{V}\\).",
          "\\(I = 19/5\\).",
        ],
        answer: "\\(3.8\\ \\text{A}\\)",
      },
      practiceSet: [
        { prompt: "A field \\(B = (2t^{2} + t)\\ \\text{T}\\) is normal to a loop of area \\(0.1\\ \\text{m}^{2}\\). Find the emf at \\(t = 1\\ \\text{s}\\).", answer: "\\(0.5\\ \\text{V}\\)", method: "\\(dB/dt = 4t + 1 = 5\\ \\text{T/s}\\), times 0.1." },
        { prompt: "A loop of area \\(0.2\\ \\text{m}^{2}\\) lies in the xy-plane in a field \\(\\vec B = (4t\\,\\hat i + 3t^{2}\\,\\hat k)\\ \\text{T}\\). Find the emf at \\(t = 2\\ \\text{s}\\).", answer: "\\(2.4\\ \\text{V}\\)", method: "Only \\(B_z\\) threads the loop: \\(0.2 \\times 6t = 0.2 \\times 12\\)." },
        { prompt: "A circular loop lies perpendicular to a field of \\(0.5\\ \\text{T}\\). Its radius grows at \\(2\\ \\text{mm/s}\\). Find the emf when the radius is \\(5\\ \\text{cm}\\).", answer: "\\(\\pi \\times 10^{-4}\\ \\text{V} \\approx 0.31\\ \\text{mV}\\)", method: "\\(0.5 \\times 2\\pi \\times 0.05 \\times 0.002\\)." },
        { prompt: "A field \\(B = 0.2\\sin(100t)\\ \\text{T}\\) is along the normal of a loop of area \\(50\\ \\text{cm}^{2}\\). Find the largest emf.", answer: "\\(0.1\\ \\text{V}\\)", method: "\\(AB_0\\omega = 5 \\times 10^{-3} \\times 0.2 \\times 100\\)." },
      ],
      pyqExampleId: "5ca0d90c-f0ef-4f83-82d0-d3c8b4fa402c", // 6 Apr 2026 S2: sinusoidal field, normal at 60°
      traps: [
        {
          title: "Angle measured from the plane",
          body: "The cosine in NBA cos θ takes the angle between the field and the NORMAL. If a question gives the angle between the field and the plane of the loop, the cosine of that angle is the wrong factor: use its sine.",
        },
        {
          title: "Using the solenoid's area for a loop inside it",
          body: "A small loop inside a long solenoid links only the field over its own area. The flux is μ₀nI times the loop's area; the solenoid's larger cross-section does not enter.",
        },
        {
          title: "Putting the time into the flux instead of its derivative",
          body: "The emf at time t is dΦ/dt evaluated at t, not Φ(t) divided by t. Differentiate first, then substitute.",
        },
      ],
    },

    // C2 — charge, heat and power
    {
      kind: "formula" as const,
      slug: "jpemi-charge-power",
      name: "Charge, heat and power from an induced current",
      intuition:
        "The charge that flows depends only on how much the flux changed, never on how fast: a quick change gives a big current for a short time, a slow one a small current for a long time, and the product is the same. Heat and power do depend on the rate, through ε²/R. When the field reverses, the flux goes from +NBA to −NBA, a change of twice NBA.",
      definition:
        "- Charge: \\(Q = \\dfrac{N\\,\\Delta\\Phi}{R}\\) when \\(\\Phi\\) is the flux through one turn. Coil pulled out of the field: \\(\\Delta\\Phi = BA\\). Field reversed or coil flipped through 180°: \\(\\Delta\\Phi = 2BA\\).\n" +
        "- Average emf over a finite change: \\(\\bar\\varepsilon = N\\,\\Delta\\Phi/\\Delta t\\).\n" +
        "- Heat: \\(H = \\displaystyle\\int \\frac{\\varepsilon^{2}}{R}\\,dt\\); for a constant emf, \\(\\varepsilon^{2}t/R\\).\n" +
        "- A sinusoidal emf of amplitude \\(\\varepsilon_0\\): average power \\(\\dfrac{\\varepsilon_0^{2}}{2R}\\), and energy per period is that power times \\(2\\pi/\\omega\\).\n" +
        "- Scaling a short-circuited coil: \\(\\varepsilon \\propto NA\\); its wire's resistance \\(\\propto\\) (wire length)/(wire cross-section) \\(\\propto N\\sqrt{A}/r_w^{2}\\). So \\(P = \\varepsilon^{2}/R \\propto NA^{3/2}r_w^{2}\\).",
      formula: {
        label: "Induced charge and power",
        latex: "Q = \\frac{N\\,\\Delta\\Phi}{R} \\qquad P = \\frac{\\varepsilon^{2}}{R}",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns and area \\(40\\ \\text{cm}^{2}\\) lies with its plane perpendicular to a field of \\(0.8\\ \\text{T}\\). The total resistance of its circuit is \\(5\\ \\Omega\\). Find the charge that flows when (a) the coil is pulled right out of the field, (b) the coil is instead turned through \\(180^{\\circ}\\).",
        steps: [
          "Flux through one turn at the start: \\(BA = 0.8 \\times 40 \\times 10^{-4} = 3.2 \\times 10^{-3}\\ \\text{Wb}\\).",
          "(a) It falls to zero: \\(Q = \\dfrac{50 \\times 3.2 \\times 10^{-3}}{5} = 3.2 \\times 10^{-2}\\ \\text{C}\\).",
          "(b) It goes from \\(+BA\\) to \\(-BA\\), a change of \\(2BA\\), so the charge doubles.",
        ],
        answer: "(a) \\(32\\ \\text{mC}\\), (b) \\(64\\ \\text{mC}\\)",
      },
      selfCheckExample: {
        prompt:
          "The flux through a coil of resistance \\(4\\ \\Omega\\) is \\(\\Phi = (6 - 2t)\\ \\text{Wb}\\). Find the heat produced in the coil until the flux becomes zero.",
        steps: [
          "\\(|\\varepsilon| = |d\\Phi/dt| = 2\\ \\text{V}\\), constant.",
          "The flux reaches zero at \\(t = 3\\ \\text{s}\\).",
          "\\(H = \\varepsilon^{2}t/R = 4 \\times 3/4\\).",
        ],
        answer: "\\(3\\ \\text{J}\\)",
      },
      practiceSet: [
        { prompt: "The flux through a single-turn coil falls from \\(0.6\\ \\text{Wb}\\) to \\(0.1\\ \\text{Wb}\\) in \\(0.25\\ \\text{s}\\). Find the average emf.", answer: "\\(2\\ \\text{V}\\)" },
        { prompt: "A field \\(B = 0.5\\sin(200t)\\ \\text{T}\\) is normal to a loop of area \\(0.1\\ \\text{m}^{2}\\) and resistance \\(2\\ \\Omega\\). Find the average power dissipated.", answer: "\\(25\\ \\text{W}\\)", method: "\\(\\varepsilon_0 = 0.5 \\times 200 \\times 0.1 = 10\\ \\text{V}\\); \\(\\varepsilon_0^{2}/2R = 100/4\\)." },
        { prompt: "A short-circuited coil in a changing field is rewound with the same number of turns and area but with wire of twice the radius. By what factor does the dissipated power change?", answer: "4 times", method: "Same emf, resistance falls to a quarter." },
        { prompt: "A coil of 200 turns and resistance \\(10\\ \\Omega\\) has \\(2 \\times 10^{-3}\\ \\text{Wb}\\) through each turn. Find the charge that flows when that flux falls to zero.", answer: "\\(40\\ \\text{mC}\\)" },
      ],
      pyqExampleId: "f9894d81-5805-4da6-8b82-c5b2ae9b835f", // 13 Apr 2023: field reversed in a wooden-cored coil, charge
      traps: [
        {
          title: "Reversing the field is not 'no change'",
          body: "When a field of size B turns to the opposite direction, the flux goes from +NBA to −NBA. The change is 2NBA, so the charge is twice that of simply removing the field.",
        },
        {
          title: "Charge does not depend on the time taken",
          body: "Q = NΔΦ/R has no time in it. A time given in such a question is there only for the average emf or current, not for the charge.",
        },
        {
          title: "Power of a sinusoidal emf uses half the square of the peak",
          body: "The average of sin² over a cycle is one half, so the mean power is ε₀²/2R. Using ε₀²/R doubles the answer.",
        },
      ],
    },

    // C3 — Lenz's law and which changes induce an emf
    {
      kind: "reference" as const,
      slug: "jpemi-lenz",
      name: "Lenz's law and the direction of the induced current",
      intuition:
        "The induced current makes a field of its own, and that field always fights the CHANGE in flux, not the flux itself. If the flux through a loop is growing, the loop's own field points against it; if it is shrinking, the loop's field points with it, trying to keep it up. The same opposition shows up as a force: a magnet pushed at a loop is repelled, a magnet falling through a metal tube is slowed.",
      definition:
        "- Four steps: (1) which way does the external flux through the loop point? (2) is it growing or shrinking? (3) the induced field points against a growth and along a shrinkage; (4) curl the fingers of the right hand around that field to get the current.\n" +
        "- A field out of the page reverses every direction in the table below.\n" +
        "- An emf needs a CHANGE of flux: a change of B, of area, of angle (rotation) or a reversal of B. Moving a coil through a uniform field, at any speed, changes nothing.\n" +
        "- In a solid conductor the induced currents are eddy currents. They drag on the motion that causes them: a magnet falling in a long copper tube reaches a steady speed, and a swinging metal plate between magnet poles stops quickly.\n" +
        "- Coaxial coils: field of an anticlockwise current points towards the viewer. Moving a coil closer raises its field at a neighbour; moving it away lowers it.",
      table: {
        columns: ["Situation", "What the flux does", "Induced current or effect"],
        rows: [
          { cells: ["Field into the page, increasing", "Flux into the page grows", "Anticlockwise, so its own field points out of the page"] },
          { cells: ["Field into the page, decreasing", "Flux into the page falls", "Clockwise, so its own field points into the page"] },
          { cells: ["North pole pushed towards a loop", "Flux from the magnet grows", "Near face of the loop becomes a north pole; magnet repelled"] },
          { cells: ["North pole pulled away from a loop", "Flux from the magnet falls", "Near face becomes a south pole; magnet attracted back"] },
          { cells: ["Bar magnet passing right through a loop", "Rises as it enters, falls as it leaves", "Two emf pulses of opposite sign, with a gap while it is inside"] },
          { cells: ["Coil moved through a uniform field", "Unchanged", "No emf and no current"] },
          { cells: ["Coil rotated in a uniform field", "Changes with the angle", "Alternating emf"] },
          { cells: ["Field reversed in direction", "Changes by twice BA", "Emf while it reverses"] },
          { cells: ["Magnet dropped down a long copper tube", "Changes in every ring of the tube", "Eddy currents brake it; it falls at a nearly constant speed"], noteAmber: "A non-magnetic bar of the same size falls freely and arrives first." },
        ],
        caption: "The induced current opposes the change in flux, never the flux itself.",
      },
      selfCheckExample: {
        prompt:
          "A wire loop lies flat on a table. The south pole of a bar magnet is moved down towards it from above. Seen from above, which way does the induced current flow?",
        steps: [
          "Field lines enter a south pole, so near the loop the magnet's field points UP.",
          "As the magnet comes closer, that upward flux grows.",
          "The induced field must point down; curling the right hand around a downward field gives a clockwise current seen from above.",
        ],
        answer: "Clockwise, seen from above",
      },
      practiceSet: [
        { prompt: "A long straight wire along the page carries a current to the right. A loop lies in the page below the wire. The current increases. Which way does the loop's current flow?", answer: "Anticlockwise", method: "Below the wire its field points into the page and grows." },
        { prompt: "The north pole of a magnet is pushed along the axis of a light copper ring. Which way does the ring move?", answer: "Away from the magnet", method: "The ring's near face becomes a north pole." },
        { prompt: "A solid aluminium plate and a slotted one swing between the poles of a magnet. Which comes to rest first?", answer: "The solid plate", method: "Slots break up the eddy-current paths." },
        { prompt: "A coil is moved at increasing speed through a region of uniform, steady field, staying fully inside it. Is an emf induced?", answer: "No", method: "The flux through it never changes." },
      ],
      pyqExampleId: "dbd2d390-6de1-4c74-9bef-ed603c64cf26", // 22 Jan 2026 S1: three coaxial coils, direction in the middle one
      traps: [
        {
          title: "Opposing the flux instead of its change",
          body: "A growing flux into the page gives an induced field out of the page, but a shrinking flux into the page gives an induced field INTO the page. The current opposes the change, so it can point the same way as the external field.",
        },
        {
          title: "Motion alone does not induce an emf",
          body: "A coil translated through a uniform, steady field, even with changing speed, keeps the same flux. Only a change of field, area, angle or direction induces an emf.",
        },
        {
          title: "Eddy currents need a conductor",
          body: "An insulator carries no eddy currents, so it feels no magnetic braking. The drag on a falling magnet comes from currents in the metal tube around it.",
        },
      ],
    },
  ],
};
