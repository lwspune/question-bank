import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/electromagnetic-induction";

export const MOTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Motional EMF and Rotating Conductors",
  title: "Motional e.m.f., Magnetic Braking and Rotating Rods",
  oneLineDefinition:
    "A straight conductor of length l moving at speed v across a field B has an e.m.f. Blv between its ends; if it closes a circuit, the current it drives feels a force that opposes the motion, and a rod or disc spinning about one end sweeps out area and develops ½Bωl².",
  whyItMatters:
    "19 PYQs, 4 HARD. Six are Blv itself — an aircraft's wings, a boat's mast, a wire falling from a height, a pendulum's bob; seven are the force and power that follow — the heat produced when a loop is pulled through a field, the work to pull it out, the speed at which a falling loop or rod stops accelerating; six are rotation — a rod about one end, a metal disc, a bicycle wheel, and a coil spinning in a field. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-emi-motional-emf",
      name: "Motional e.m.f. Blv",
      intuition:
        "Charges in a conductor moving across a field feel a magnetic force along the conductor, which piles them at one end: an e.m.f. e = Blv, where l is the length perpendicular to both B and v. Only the component of B across the motion counts — for a horizontal wire falling or a vertical mast moving east it is the horizontal field; for an aircraft's wings it is the vertical one. For a coil leaving a field, l is the side crossing the edge, so a longer side there means a larger e.m.f.",
      definition:
        "- \\(e = Blv\\) with B, l, v mutually perpendicular. Field given as H in A/m: first \\(B = \\mu_0 H\\).\n" +
        "- **Wing tips**: \\(5 \\times 10^{-5} \\times 40 \\times 500 = 1\\) V. **Boat's vertical rod** moving east in a northward horizontal field: \\(Blv\\).\n" +
        "- **Wire falling** from height h: \\(v = \\sqrt{2gh}\\) at the ground, \\(e = B_H l\\sqrt{2gh}\\).\n" +
        "- **Pendulum** of length L through angle θ: the bob's fastest speed is \\(2\\sqrt{gL}\\sin\\frac{\\theta}{2}\\), so \\(e_{\\max} = 2BL\\sqrt{gL}\\sin\\frac{\\theta}{2}\\).\n" +
        "- **Coil leaving a field**: the vertical side does the cutting — rotate the coil so its shorter side is vertical and the e.m.f. falls.",
      formula: {
        label: "Motional e.m.f.",
        latex: "e = Blv",
      },
      authoredExample: {
        prompt: "A 3 m vertical rod on a car moving north at 20 m/s, where the horizontal field is 4 × 10⁻⁵ T pointing north. E.m.f. across the rod?",
        steps: ["v is parallel to B, so no field component lies across the motion.", "e = 0."],
        answer: "Zero",
      },
      selfCheckExample: {
        prompt: "An aircraft with a 40 m wing span flies horizontally at 500 m/s where the vertical field is 5 × 10⁻⁵ T. E.m.f. between the tips?",
        steps: ["e = Blv = 5 × 10⁻⁵ × 40 × 500."],
        answer: "1 V",
      },
      practiceSet: [
        { prompt: "A 10 cm conductor moves at 1 m/s perpendicular to a field of 1000 A/m. E.m.f.?", answer: "40π μV" },
        { prompt: "A boat carries a 2 m vertical rod east at 2 m/s; the horizontal field is 3.6 × 10⁻⁵ T north. E.m.f.?", answer: "0.144 mV" },
      ],
      pyqExampleId: "f2753d35-f5fa-49cc-9382-905cb67f98b3",
      traps: [
        {
          title: "Using the total field instead of the cutting component",
          body:
            "Only the part of B perpendicular to both the rod and its velocity induces an e.m.f. A rod moving along the field lines induces nothing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-motional-force-power",
      name: "Magnetic Braking: Force, Heat and Terminal Speed",
      intuition:
        "Close the circuit and the e.m.f. Blv drives I = Blv/R. That current sits in the field, so it feels F = BIl = B²l²v/R, opposing the motion. Pulling at steady speed means supplying exactly that force, so the heat produced per second is (Blv)²/R. A loop or rod falling through a field speeds up until the braking force equals its weight: mg = B²l²v/R, so v = mgR/(B²l²). Pulling a loop out slowly in time t: e = BA/t, and the work done is e²t/R.",
      definition:
        "- **Current** \\(I = \\dfrac{Blv}{R}\\); **braking force** \\(F = \\dfrac{B^2l^2v}{R}\\).\n" +
        "- **Heat per second** (= power to pull at steady v): \\(P = \\dfrac{B^2l^2v^2}{R}\\).\n" +
        "- **Terminal speed** of a falling loop or rod of mass m: \\(v = \\dfrac{mgR}{B^2l^2}\\).\n" +
        "- **Work to pull a loop out** in time t: \\(e = \\dfrac{BA}{t}\\), \\(W = \\dfrac{e^2}{R}t\\) (25 cm², 40 T, 10 Ω, 1 s ⇒ \\(10^{-3}\\) J).\n" +
        "- **A current loop held by a field**: \\(BIL = Mg\\) with \\(I = \\dfrac{V}{R}\\) gives \\(V = \\dfrac{MgR}{BL}\\).",
      formula: {
        label: "Braking force and terminal speed",
        latex: "F = \\frac{B^2l^2v}{R}, \\qquad v_t = \\frac{mgR}{B^2l^2}",
      },
      authoredExample: {
        prompt: "A 20 cm rod of mass 10 g and resistance 0.5 Ω slides down vertical rails in a 0.5 T horizontal field (g = 10). Terminal speed?",
        steps: ["v = mgR/(B²l²) = 0.01 × 10 × 0.5/(0.25 × 0.04) = 0.05/0.01 = 5 m/s."],
        answer: "5 m/s",
      },
      selfCheckExample: {
        prompt: "A square loop of side L and resistance R is pulled at constant speed v through a field B. Rate of heat production?",
        steps: ["e = BLv, P = e²/R."],
        answer: "B²L²v²/R",
      },
      practiceSet: [
        { prompt: "A long loop of width l, mass m, resistance R falls into a field B. Speed at which it falls freely?", answer: "mgR/(B²l²)" },
        { prompt: "Square loop 25 cm², 10 Ω, in 40 T; pulled out uniformly in 1 s. Work done?", answer: "1.0 × 10⁻³ J" },
      ],
      pyqExampleId: "07b7fce4-b8d5-46f5-8955-8bc0503db78b",
      traps: [
        {
          title: "Forgetting that the braking force grows with speed",
          body:
            "F = B²l²v/R rises as the rod speeds up, which is why a falling rod reaches a terminal speed instead of accelerating at g forever.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-rotating-rod-disc",
      name: "Rotating Rods, Discs, Wheels and Coils",
      intuition:
        "A rod spinning about one end moves faster further out; its average speed is ωl/2, so e = B·l·(ωl/2) = ½Bωl². A disc is a crowd of such radii in parallel — rim to axle it is ½BωR² too; so is a bicycle wheel, however many spokes it has, since they are in parallel. A whole coil turning in a field is different: its flux varies as cos ωt, so its e.m.f. peaks at NBAω and the average power into a resistor is (NBAω)²/(2R).",
      definition:
        "- **Rod about one end**: \\(e = \\tfrac{1}{2}B\\omega l^2\\); with n revolutions per second, \\(\\omega = 2\\pi n\\) ⇒ \\(n = \\dfrac{e}{\\pi Bl^2}\\).\n" +
        "- **Disc or wheel**, rim to axle: \\(\\tfrac{1}{2}B\\omega R^2\\), independent of the number of spokes. The paper's bicycle-wheel answer takes \\(\\omega = 2\\pi F\\), giving \\(B\\pi FR^2\\).\n" +
        "- **Coil rotating**: \\(e_0 = NBA\\omega\\); average power \\(\\dfrac{N^2A^2B^2\\omega^2}{2R}\\).",
      formula: {
        label: "Rotating rod or disc",
        latex: "e = \\tfrac{1}{2}B\\omega l^2",
      },
      authoredExample: {
        prompt: "A 0.5 m rod rotates about one end at 20 rad/s in a 0.4 T field perpendicular to its plane of rotation. E.m.f.?",
        steps: ["e = ½ × 0.4 × 20 × 0.25 = 1 V."],
        answer: "1 V",
      },
      selfCheckExample: {
        prompt: "A metal disc of radius R rotates at ω about its axis in a field B along the axis. E.m.f. between rim and axis?",
        steps: ["Each radius is a rod rotating about one end."],
        answer: "BR²ω/2",
      },
      practiceSet: [
        { prompt: "A rod of length l rotating about one end develops e. Revolutions per second?", answer: "e/(πBl²)" },
        { prompt: "Average power from a coil (N, A, R) rotating at ω in B, over a cycle?", answer: "N²A²B²ω²/(2R)" },
      ],
      pyqExampleId: "15a3301b-8fcb-4336-80b5-5239ae00dd65",
      traps: [
        {
          title: "Multiplying by the number of spokes",
          body:
            "The spokes of a wheel are in parallel between axle and rim, so the e.m.f. is that of one spoke, ½BωR². More spokes carry more current, not more voltage.",
        },
      ],
    },
  ],
  related: [
    { label: "Faraday and Lenz — where Blv comes from", href: `${BASE}/cetp-emi-faraday-lenz` },
    { label: "Mutual Inductance and Generators — the rotating coil in an a.c. generator", href: `${BASE}/cetp-emi-mutual` },
  ],
};
