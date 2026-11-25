import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_RO_MIRRORS_NOTE: SubtopicNote = {
  subtopicName: "Reflection by Spherical Mirrors",
  title: "Spherical Mirrors and the Mirror Equation",
  oneLineDefinition:
    "The Cartesian sign convention, the mirror equation and magnification for concave and convex mirrors, the nature of the image a mirror forms, and the image of an object lying along the axis.",
  whyItMatters:
    "25 questions, fourteen of them from board papers from 2023 to 2026 (this page had none in 2022). The board asks you to draw the ray diagram and derive the mirror equation (2023, 2025, 2026), find the position and magnification of the image for a concave or convex mirror (2024, 2025, 2026), read the nature of the image from the sign of the magnification (2025), and find the length of the image of a pencil lying along the axis (2025, 2026). The textbook adds deductions from the mirror equation, a jogger seen in a car's side mirror and the turning mirror of a galvanometer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpro-mirror-equation",
      name: "Sign convention and the mirror equation",
      intuition:
        "Every formula in this chapter works only if you measure distances the same way every time. NCERT measures every distance from the pole of the mirror, and takes the direction in which the incident light travels as positive. A real object stands in front of the mirror, against the incident light, so its distance u is negative. Once the signs are right, one equation covers every mirror and every object position.",
      definition:
        "- **Cartesian sign convention:** all distances are measured from the pole P. Distances in the direction of the incident light are positive; distances against it are negative. Heights above the principal axis are positive, below it negative.\n" +
        "- **Focal length:** \\(f = R/2\\). A concave mirror has its focus in front, so f is negative; a convex mirror has it behind, so f is positive.\n" +
        "- **Ray diagram for the derivation (described):** object AB beyond the centre of curvature C of a concave mirror. A ray from A parallel to the axis strikes the mirror at M and passes through F; a ray from A to the pole P reflects at an equal angle. They meet at \\(A'\\), giving the real, inverted image \\(A'B'\\).\n" +
        "- Triangles \\(A'B'F\\) and MPF are similar (MP taken as a straight line for paraxial rays, PM = AB): \\(\\dfrac{B'A'}{BA} = \\dfrac{B'F}{FP}\\).\n" +
        "- Triangles \\(A'B'P\\) and ABP are similar: \\(\\dfrac{B'A'}{BA} = \\dfrac{B'P}{BP}\\).\n" +
        "- So \\(\\dfrac{B'P - FP}{FP} = \\dfrac{B'P}{BP}\\). Put in the signs \\(B'P = -v\\), \\(FP = -f\\), \\(BP = -u\\): \\(\\dfrac{-v + f}{-f} = \\dfrac{-v}{-u}\\).\n" +
        "- Divide by v and rearrange: \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\), the **mirror equation**.\n" +
        "- **Linear magnification:** \\(m = \\dfrac{h'}{h} = -\\dfrac{v}{u}\\).\n" +
        "- A plane mirror turned through an angle θ turns the reflected ray through 2θ.",
      formula: {
        label: "Mirror equation and magnification",
        latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad f = \\frac{R}{2}, \\qquad m = \\frac{h'}{h} = -\\frac{v}{u}",
        symbols: [
          { symbol: "\\(u\\)", meaning: "object distance from the pole, negative for a real object" },
          { symbol: "\\(v\\)", meaning: "image distance from the pole, negative in front of the mirror" },
          { symbol: "\\(f\\)", meaning: "focal length, negative for concave, positive for convex" },
          { symbol: "\\(m\\)", meaning: "linear magnification, negative for an inverted image" },
        ],
      },
      authoredExample: {
        prompt:
          "An object 3 cm tall stands 25 cm in front of a concave mirror of radius of curvature 20 cm. Find the position, size and nature of the image.",
        steps: [
          "Given: \\(u = -25\\) cm, \\(R = -20\\) cm, so \\(f = R/2 = -10\\) cm; \\(h = +3\\) cm.",
          "Formula: \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\), so \\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u}\\).",
          "Substitution: \\(\\dfrac{1}{v} = -\\dfrac{1}{10} + \\dfrac{1}{25} = \\dfrac{-5 + 2}{50} = -\\dfrac{3}{50}\\), so \\(v = -16.7\\) cm.",
          "Magnification: \\(m = -\\dfrac{v}{u} = -\\dfrac{-16.7}{-25} = -0.67\\).",
          "Image height: \\(h' = mh = -0.67 \\times 3 = -2\\) cm.",
          "v is negative, so the image is in front of the mirror and real; m is negative, so it is inverted.",
        ],
        answer: "16.7 cm in front of the mirror; real, inverted, 2 cm tall",
      },
      selfCheckExample: {
        prompt:
          "An object is placed 12 cm in front of a convex mirror of focal length 12 cm. Find the position of the image and the magnification.",
        steps: [
          "\\(f = +12\\) cm, \\(u = -12\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{12} + \\dfrac{1}{12} = \\dfrac{1}{6}\\), so \\(v = +6\\) cm.",
          "\\(m = -\\dfrac{6}{-12} = +0.5\\).",
        ],
        answer: "6 cm behind the mirror; virtual, erect, half the size (m = +0.5)",
      },
      practiceSet: [
        { prompt: "A concave mirror has a radius of curvature of 36 cm. What is its focal length, with its sign?", answer: "\\(-18\\) cm" },
        { prompt: "Under the Cartesian sign convention, what sign does the distance of a real object in front of a mirror carry?", answer: "Negative" },
        { prompt: "A concave mirror forms a real image 50 cm in front of it of an object also 50 cm in front of it. Find its focal length.", answer: "\\(-25\\) cm (the object is at C)" },
        { prompt: "A plane mirror is turned through 5°. Through what angle does the reflected ray turn?", answer: "10°" },
      ],
      pyqExampleId: "c918d730-8a92-4dd4-8f71-f93f1fd9e422",
      traps: [
        {
          title: "Using the formula without stating the sign convention",
          body: "Write one line before the substitution: distances from the pole, along the incident light positive. Then give every distance its sign. A concave mirror's focal length goes in as negative; putting it in as positive turns a real image into a virtual one.",
        },
        {
          title: "A derivation with no labelled ray diagram",
          body: "The ray diagram carries marks. Draw the two rays with arrows, label P, F, C, the object AB and the image \\(A'B'\\), and name the two pairs of similar triangles you use.",
        },
        {
          title: "Reading a real image as positive v",
          body: "For a mirror, a real image forms in front, against the incident light, so its v is negative. Positive v means the image is behind the mirror and virtual.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpro-mirror-images",
      name: "Nature of the image from the signs",
      intuition:
        "The signs in your answer tell you what the image is like, so you never need to guess. Negative v means the image is in front of the mirror, where the light really goes: real. Negative m means it is upside down. A convex mirror can never give a real image of a real object: whatever u you try, v comes out positive and m between 0 and 1.",
      definition:
        "- **v negative:** real image, in front of the mirror. **v positive:** virtual image, behind it.\n" +
        "- **m negative:** inverted. **m positive:** erect. **|m| > 1:** enlarged; **|m| < 1:** diminished. For a single mirror a real image is always inverted and a virtual image always erect.\n" +
        "- **Convex mirror, any real object:** \\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u}\\) with f positive and u negative gives \\(\\dfrac{1}{v} > \\dfrac{1}{f}\\), so \\(0 < v < f\\): the image is virtual, between the pole and the focus, and diminished.\n" +
        "- A plane or convex mirror can give a real image when the light falling on it is already converging, that is, for a virtual object.\n" +
        "- The focal length of a mirror, \\(f = R/2\\), contains no refractive index, so it does not change when the mirror is dipped in a liquid.\n" +
        "- Covering half a mirror still gives the image of the whole object, only less bright.\n" +
        "- **Assertion and reason items** use four codes: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) both false. Judge A and R separately first, then ask whether R is the reason for A.",
      table: {
        columns: ["Object position", "Image position", "Nature of the image"],
        rows: [
          { cells: ["Concave mirror, object at infinity", "At F", "Real, inverted, very small"] },
          { cells: ["Concave mirror, object beyond C", "Between F and C", "Real, inverted, diminished"] },
          { cells: ["Concave mirror, object at C", "At C", "Real, inverted, same size"] },
          {
            cells: ["Concave mirror, object between C and F", "Beyond C", "Real, inverted, enlarged"],
            pyqExampleId: "7aeeb2c2-55eb-4288-a4af-785fdb005b2c",
            noteAmber: "Board 2025 asked which mirror gives \\(m = -2.0\\) and what kind of image it is.",
          },
          { cells: ["Concave mirror, object between F and P", "Behind the mirror", "Virtual, erect, enlarged"] },
          {
            cells: ["Convex mirror, object anywhere", "Behind the mirror, between P and F", "Virtual, erect, diminished"],
            pyqExampleId: "32444cf4-dd70-4a31-a1f1-b64614135e8c",
            noteAmber: "Board 2025 asked you to deduce this from the mirror equation.",
          },
        ],
      },
      pyqExampleId: "7aeeb2c2-55eb-4288-a4af-785fdb005b2c",
      selfCheckExample: {
        prompt: "A mirror forms an image of a real object with magnification +0.4. Is the mirror concave or convex, and what kind of image is it?",
        steps: [
          "m is positive, so the image is erect, and for a single mirror an erect image is virtual.",
          "|m| = 0.4 is less than 1, so the image is diminished.",
          "Only a convex mirror gives a virtual, diminished image of a real object.",
        ],
        answer: "Convex mirror; virtual, erect, diminished image",
      },
      practiceSet: [
        { prompt: "A concave mirror of focal length f is dipped in water. What is its focal length now?", answer: "Still f: a mirror's focal length depends only on R" },
        { prompt: "The lower half of a concave mirror is painted black. Does the image show only half the object?", answer: "No. It shows the whole object, but less bright" },
        { prompt: "Where does a convex mirror form the image of a very distant object?", answer: "At its focus, behind the mirror" },
      ],
      traps: [
        {
          title: "A negative magnification for a convex mirror",
          body: "A convex mirror always gives an erect image of a real object, so its m is always positive and less than 1. A negative m means a concave mirror and a real image.",
        },
        {
          title: "Saying a convex mirror can never give a real image",
          body: "That is true only for a real object. If converging light falls on a plane or convex mirror (a virtual object), the reflected light can meet in front and form a real image. Give this case when the board asks 'can they produce real images under some circumstances?'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-mirror-axial",
      name: "Image of an object lying along the axis",
      intuition:
        "A pencil lying along the principal axis has its two ends at different distances from the mirror, so each end has its own image distance. The image of the pencil runs from the image of one end to the image of the other. Its length is not the object length times m, because the magnification is different at each point; this is why the image of such an object looks stretched or squashed.",
      definition:
        "- Find the object distance of each end, \\(u_1\\) and \\(u_2\\).\n" +
        "- Apply the mirror equation separately to each end: \\(\\dfrac{1}{v_1} = \\dfrac{1}{f} - \\dfrac{1}{u_1}\\) and \\(\\dfrac{1}{v_2} = \\dfrac{1}{f} - \\dfrac{1}{u_2}\\).\n" +
        "- Length of the image \\(= |v_1 - v_2|\\).\n" +
        "- An end placed at the centre of curvature images onto itself, at C.\n" +
        "- The magnification is not uniform along the object, so the image is distorted.",
      formula: {
        label: "Length of the image along the axis",
        latex: "L' = |v_1 - v_2|, \\qquad \\frac{1}{v_{1}} = \\frac{1}{f} - \\frac{1}{u_{1}}, \\quad \\frac{1}{v_{2}} = \\frac{1}{f} - \\frac{1}{u_{2}}",
      },
      authoredExample: {
        prompt:
          "A thin rod 4 cm long lies along the principal axis of a concave mirror of focal length 12 cm, with its nearer end 18 cm from the mirror. Find the length of the image.",
        steps: [
          "Given: \\(f = -12\\) cm. Nearer end \\(u_1 = -18\\) cm; farther end \\(u_2 = -22\\) cm.",
          "Nearer end: \\(\\dfrac{1}{v_1} = -\\dfrac{1}{12} + \\dfrac{1}{18} = \\dfrac{-3 + 2}{36} = -\\dfrac{1}{36}\\), so \\(v_1 = -36\\) cm.",
          "Farther end: \\(\\dfrac{1}{v_2} = -\\dfrac{1}{12} + \\dfrac{1}{22} = \\dfrac{-11 + 6}{132} = -\\dfrac{5}{132}\\), so \\(v_2 = -26.4\\) cm.",
          "Length of the image: \\(|v_1 - v_2| = |-36 + 26.4| = 9.6\\) cm.",
        ],
        answer: "9.6 cm, real and inverted, stretched along the axis",
      },
      selfCheckExample: {
        prompt:
          "A rod 3 cm long lies along the axis of a concave mirror of focal length 15 cm, with one end at the centre of curvature and the rod extending away from the mirror. Find the length of its image.",
        steps: [
          "One end at C: \\(u_1 = -30\\) cm images at \\(v_1 = -30\\) cm.",
          "Other end \\(u_2 = -33\\) cm: \\(\\dfrac{1}{v_2} = -\\dfrac{1}{15} + \\dfrac{1}{33} = -\\dfrac{6}{165}\\), so \\(v_2 = -27.5\\) cm.",
          "Length \\(= 30 - 27.5 = 2.5\\) cm.",
        ],
        answer: "2.5 cm",
      },
      practiceSet: [
        { prompt: "Why is the image of a pen lying along the axis of a concave mirror distorted?", answer: "Its parts are at different distances, so they are magnified by different amounts" },
        { prompt: "One end of a short object lies at the centre of curvature of a concave mirror. Where is the image of that end?", answer: "At the centre of curvature itself" },
      ],
      pyqExampleId: "61da8f02-7e69-4a3b-9659-644be118377b",
      traps: [
        {
          title: "Multiplying the object length by m",
          body: "\\(m = -v/u\\) is for heights at right angles to the axis. For an object along the axis, find the image of each end and subtract.",
        },
        {
          title: "Placing the far end on the wrong side",
          body: "Read the question for which end is given. If the nearer end is at distance x, the farther end is at x plus the length, never x minus it.",
        },
      ],
    },
  ],
};
