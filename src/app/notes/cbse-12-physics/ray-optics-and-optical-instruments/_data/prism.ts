import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_RO_PRISM_NOTE: SubtopicNote = {
  subtopicName: "Refraction Through a Prism",
  title: "Refraction Through a Prism",
  oneLineDefinition:
    "The path of a ray through a prism and its angle of deviation, minimum deviation and the refractive index of the prism, thin prisms, and rays that graze or are totally reflected at the second face.",
  whyItMatters:
    "28 questions, twenty-six of them from board papers from 2022 to 2026. The board asks you to trace a ray through a prism and prove that the deviation is i + e − A (2022, 2024), derive the refractive index in terms of the prism angle and the angle of minimum deviation (2023, 2026), find the minimum deviation or the refractive index when the ray passes symmetrically (every year), compare thin prisms of two glasses (2025), and find the angle of incidence for which the ray just grazes or is just totally reflected at the second face (2022 to 2026). The textbook adds a prism dipped in water.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpro-deviation",
      name: "Path of a ray and the angle of deviation",
      intuition:
        "A ray passing through a prism bends twice, once at each face, and both bends turn it the same way, towards the base. The total turning is the angle of deviation. It depends on how steeply the ray enters: as the angle of incidence grows, the deviation first falls, reaches a smallest value, and then rises again.",
      definition:
        "- **Ray diagram (described):** prism ABC with refracting angle A. Ray PQ meets face AB at Q with angle of incidence i and refracts at \\(r_1\\); it travels to R on face AC, meets it at \\(r_2\\), and emerges along RS at angle e. Draw the normals at Q and R meeting at N. Produce the incident and emergent rays to meet; the angle between them is the deviation δ.\n" +
        "- In the quadrilateral AQNR the angles at Q and R are right angles, so \\(\\angle A + \\angle QNR = 180^\\circ\\).\n" +
        "- In the triangle QNR, \\(r_1 + r_2 + \\angle QNR = 180^\\circ\\). Comparing: \\(r_1 + r_2 = A\\).\n" +
        "- The deviation is the sum of the deviations at the two faces: \\(\\delta = (i - r_1) + (e - r_2)\\), so \\(\\delta = i + e - A\\).\n" +
        "- **Graph of δ against i:** δ falls, reaches a minimum \\(D_m\\), then rises. Every value of δ other than the minimum occurs for two angles of incidence, i and e interchanged, because the path can be traced back.",
      formula: {
        label: "Prism relations",
        latex: "r_1 + r_2 = A, \\qquad \\delta = i + e - A",
      },
      authoredExample: {
        prompt:
          "A ray enters a prism of refracting angle 60° at an angle of incidence of 50° and leaves at an angle of emergence of 40°. Find the angle of deviation.",
        steps: [
          "Given: \\(A = 60^\\circ\\), \\(i = 50^\\circ\\), \\(e = 40^\\circ\\).",
          "Formula: \\(\\delta = i + e - A\\).",
          "Substitution: \\(\\delta = 50^\\circ + 40^\\circ - 60^\\circ = 30^\\circ\\).",
        ],
        answer: "30°",
      },
      selfCheckExample: {
        prompt:
          "For a prism of angle 60°, a ray incident at 55° is deviated by 40°. At what other angle of incidence is the deviation also 40°?",
        steps: [
          "Angle of emergence: \\(e = \\delta + A - i = 40^\\circ + 60^\\circ - 55^\\circ = 45^\\circ\\).",
          "Reversing the path swaps i and e, so the same deviation occurs for \\(i = 45^\\circ\\).",
        ],
        answer: "45°",
      },
      practiceSet: [
        { prompt: "In a prism, what is \\(r_1 + r_2\\) equal to?", answer: "The angle of the prism, A" },
        { prompt: "Describe the graph of the angle of deviation against the angle of incidence.", answer: "It falls to a minimum, the angle of minimum deviation, and then rises" },
        { prompt: "A ray falls normally on one face of a prism of angle 30°. What is its angle of incidence on the second face?", answer: "30°, since \\(r_1 = 0\\)" },
      ],
      pyqExampleId: "83b92bb4-388f-497e-8ed1-48c73594b828",
      traps: [
        {
          title: "A ray diagram with no normals or arrows",
          body: "The proof rests on the normals at both faces meeting at N. Draw them, mark i, \\(r_1\\), \\(r_2\\), e and δ, and put arrows on the rays. The diagram carries marks of its own.",
        },
        {
          title: "Drawing the graph without its minimum",
          body: "Label the axes (δ against i) and mark the lowest point of the curve as \\(D_m\\). A straight line or an unlabelled curve does not earn the graph's mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-min-deviation",
      name: "Minimum deviation and the refractive index",
      intuition:
        "At minimum deviation the ray goes through the prism symmetrically: it enters and leaves at the same angle, and inside the prism it runs parallel to the base. That symmetry makes both inner angles equal to half the prism angle, and Snell's law at the first face then gives the refractive index from two angles you can measure.",
      definition:
        "- At \\(\\delta = D_m\\): \\(i = e\\) and \\(r_1 = r_2 = r\\); the ray inside is parallel to the base.\n" +
        "- From \\(r_1 + r_2 = A\\): \\(2r = A\\), so \\(r = A/2\\).\n" +
        "- From \\(\\delta = i + e - A\\): \\(D_m = 2i - A\\), so \\(i = \\dfrac{A + D_m}{2}\\).\n" +
        "- Snell's law at the first face, \\(n_{21} = \\dfrac{\\sin i}{\\sin r}\\), gives \\(n_{21} = \\dfrac{\\sin\\left[(A + D_m)/2\\right]}{\\sin(A/2)}\\).\n" +
        "- **Thin prism** (small A): the sines may be replaced by the angles, so \\(D_m = (n_{21} - 1)A\\). Thin prisms deviate light only a little, and the deviation goes with \\(n - 1\\), not with n.\n" +
        "- **In a liquid**, \\(n_{21}\\) is the prism's index relative to the liquid, which is smaller, so \\(D_m\\) decreases.\n" +
        "- n is larger for violet than for red, so violet has the larger minimum deviation.",
      formula: {
        label: "Refractive index of a prism",
        latex: "n_{21} = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}, \\qquad D_m = (n_{21} - 1)A \\ \\ (\\text{thin prism})",
      },
      authoredExample: {
        prompt:
          "A prism of refracting angle 60° gives an angle of minimum deviation of 38°. Find the angle of incidence at minimum deviation and the refractive index of the prism.",
        steps: [
          "Given: \\(A = 60^\\circ\\), \\(D_m = 38^\\circ\\).",
          "Angle of incidence: \\(i = \\dfrac{A + D_m}{2} = \\dfrac{60^\\circ + 38^\\circ}{2} = 49^\\circ\\).",
          "Formula: \\(n = \\dfrac{\\sin\\left[(A + D_m)/2\\right]}{\\sin(A/2)}\\).",
          "Substitution: \\(n = \\dfrac{\\sin 49^\\circ}{\\sin 30^\\circ} = \\dfrac{0.755}{0.5} = 1.51\\).",
        ],
        answer: "i = 49°; n = 1.51",
      },
      selfCheckExample: {
        prompt: "A thin prism of angle 5° is made of glass of refractive index 1.6. Find the deviation it produces.",
        steps: ["\\(D_m = (n - 1)A = 0.6 \\times 5^\\circ = 3^\\circ\\)."],
        answer: "3°",
      },
      practiceSet: [
        { prompt: "At minimum deviation, how does the ray travel inside an equilateral prism?", answer: "Parallel to the base" },
        { prompt: "A prism of angle 60° has refractive index \\(\\sqrt{3}\\). Find its angle of minimum deviation.", answer: "60°" },
        { prompt: "A glass prism is dipped in water. Does its angle of minimum deviation increase or decrease?", answer: "It decreases" },
      ],
      pyqExampleId: "165da4ca-f42c-42bd-abfa-f1dabea39b04",
      traps: [
        {
          title: "Forgetting to halve the angles",
          body: "The formula has \\((A + D_m)/2\\) on top and \\(A/2\\) below. Writing \\(\\sin(A + D_m)/\\sin A\\) is a different relation (it is the one for normal incidence), and the answer comes out wrong.",
        },
        {
          title: "Comparing thin prisms by n instead of n minus 1",
          body: "For a thin prism \\(D_m = (n - 1)A\\). To compare two glasses, take the ratio of \\((n - 1)\\), not of n; the ratio of n understates the change.",
        },
        {
          title: "Using the formula without minimum deviation",
          body: "The formula holds only when the ray passes symmetrically. If the question does not say 'minimum deviation' or 'symmetrically' or 'parallel to the base', use \\(\\delta = i + e - A\\) and Snell's law at each face instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-prism-tir",
      name: "Grazing emergence and total internal reflection in a prism",
      intuition:
        "Inside a prism, the two inner angles always add up to A. So if you make the ray enter more steeply, it meets the second face less steeply, and the other way round. At one particular angle of incidence the ray meets the second face exactly at the critical angle: it just grazes out along the face, and for any smaller angle of incidence it is trapped by total internal reflection.",
      definition:
        "- **Just grazes, or just totally reflected, at the second face:** \\(r_2 = i_c\\) with \\(\\sin i_c = 1/n\\). Then \\(r_1 = A - i_c\\), and Snell's law at the first face gives \\(\\sin i = n\\sin(A - i_c)\\).\n" +
        "- For angles of incidence smaller than this, \\(r_1\\) is smaller, \\(r_2\\) is larger than \\(i_c\\), and the ray is totally reflected at the second face.\n" +
        "- **Normal incidence on the first face:** \\(r_1 = 0\\), so \\(r_2 = A\\). The ray comes out if \\(A < i_c\\), grazes if \\(A = i_c\\), and is totally reflected if \\(A > i_c\\).\n" +
        "- Normal incidence with a deviation δ: \\(e = A + \\delta\\), so \\(n = \\dfrac{\\sin(A + \\delta)}{\\sin A}\\).\n" +
        "- **Second face silvered, ray retraces its path:** the ray meets the silvered face normally, so \\(r_2 = 0\\), \\(r_1 = A\\) and \\(\\sin i = n\\sin A\\).",
      formula: {
        label: "Ray just totally reflected at the second face",
        latex: "r_2 = i_c, \\quad r_1 = A - i_c, \\quad \\sin i = n\\sin(A - i_c)",
      },
      authoredExample: {
        prompt:
          "A ray falls normally on one face of a prism of refracting angle 37° and leaves the other face deviated by 16°. Find the refractive index of the prism. (Take sin 37° = 0.6 and sin 53° = 0.8.)",
        steps: [
          "Given: \\(A = 37^\\circ\\), \\(\\delta = 16^\\circ\\), normal incidence so \\(i = 0\\) and \\(r_1 = 0\\).",
          "Inside: \\(r_2 = A - r_1 = 37^\\circ\\).",
          "Deviation: \\(\\delta = i + e - A\\), so \\(e = \\delta + A - i = 16^\\circ + 37^\\circ - 0 = 53^\\circ\\).",
          "Snell's law at the second face: \\(n = \\dfrac{\\sin e}{\\sin r_2} = \\dfrac{\\sin 53^\\circ}{\\sin 37^\\circ} = \\dfrac{0.8}{0.6} = 1.33\\).",
        ],
        answer: "n = 4/3, about 1.33",
      },
      selfCheckExample: {
        prompt:
          "A prism of refracting angle 50° is made of glass whose critical angle is 40°. A ray falls normally on one face. Does it come out of the second face?",
        steps: [
          "Normal incidence: \\(r_1 = 0\\), so the ray meets the second face at \\(r_2 = A = 50^\\circ\\).",
          "\\(50^\\circ > 40^\\circ\\), the critical angle.",
        ],
        answer: "No. It is totally reflected at the second face",
      },
      practiceSet: [
        { prompt: "A ray falls normally on one face of a prism of angle 45° and refractive index 1.5. Does it come out of the second face?", answer: "No: it meets that face at 45°, more than the critical angle of 41.8°" },
        { prompt: "What is the angle of emergence when the emergent ray grazes the second face of a prism?", answer: "90°" },
        { prompt: "The second face of a prism of angle A is silvered and a ray retraces its path. What is the angle of refraction at the first face?", answer: "A" },
      ],
      pyqExampleId: "ec27c818-f547-4f95-99ef-8259b97f3648",
      traps: [
        {
          title: "Putting the critical angle at the first face",
          body: "Total internal reflection happens at the SECOND face, where the ray goes from glass to air. Set \\(r_2 = i_c\\), never \\(r_1 = i_c\\).",
        },
        {
          title: "Saying a larger angle of incidence traps the light",
          body: "It is the other way round. Since \\(r_1 + r_2 = A\\), a smaller angle of incidence makes \\(r_2\\) larger, so the light is trapped for angles of incidence BELOW the value you found.",
        },
      ],
    },
  ],
};
