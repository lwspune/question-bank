import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_RO_LENSES_NOTE: SubtopicNote = {
  subtopicName: "Refraction at Spherical Surfaces and by Lenses",
  title: "Spherical Surfaces, Lenses and Their Combinations",
  oneLineDefinition:
    "Refraction at a single curved surface, the lens maker's formula for a lens in air or in a liquid and for a cut lens, the thin lens formula with magnification and power, and lenses in contact or apart.",
  whyItMatters:
    "93 questions, eighty-one of them from board papers from 2022 to 2026, the most of any page in the chapter. The board asks you to derive the relation for refraction at a spherical surface (2023, 2026) and the lens maker's formula (2026), find the image formed by one curved surface or by a bubble in a glass sphere, find the focal length of a lens in a liquid (every year from 2022 to 2026), say what cutting a lens does to its focal length (2022, 2024, 2025, 2026), use the lens formula and the two-position method (2026), and solve lenses in contact or apart, including the proof that f = f1f2/(f1 + f2) (2026). The textbook adds a lens that vanishes in a liquid and a liquid lens on a plane mirror.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpro-spherical-surface",
      name: "Refraction at a single spherical surface",
      intuition:
        "A lens is two curved surfaces, so first learn what one curved surface does. Light from a point object crosses a curved boundary into a new medium and bends at every point by Snell's law. For rays close to the axis, they all meet again at one point, the image. One relation, with the refractive index of each side, gives where that point is.",
      definition:
        "- **Ray diagram (described):** a convex surface with pole M, centre of curvature C and radius R separates medium \\(n_1\\) (object side) from a denser medium \\(n_2\\). A point object O sits on the axis. One ray goes along the axis; another strikes the surface at N and bends towards the normal NC, meeting the axis at the image I.\n" +
        "- Take the aperture small, so NM is nearly the perpendicular from N to the axis and every angle equals its tangent: \\(\\tan\\angle NOM = \\dfrac{MN}{OM}\\), \\(\\tan\\angle NCM = \\dfrac{MN}{MC}\\), \\(\\tan\\angle NIM = \\dfrac{MN}{MI}\\).\n" +
        "- In triangle NOC, i is the exterior angle: \\(i = \\angle NOM + \\angle NCM\\). Similarly \\(r = \\angle NCM - \\angle NIM\\).\n" +
        "- Snell's law for small angles: \\(n_1 i = n_2 r\\). Substituting gives \\(\\dfrac{n_1}{OM} + \\dfrac{n_2}{MI} = \\dfrac{n_2 - n_1}{MC}\\).\n" +
        "- Signs: \\(OM = -u\\), \\(MI = +v\\), \\(MC = +R\\). So \\(\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}\\).\n" +
        "- \\(n_1\\) is always the medium the light comes FROM and \\(n_2\\) the medium it goes INTO. A surface convex towards the incoming light has R positive; concave towards it, R negative.\n" +
        "- **Bubble in a glass sphere:** the light leaves the glass, so \\(n_1\\) is glass and \\(n_2\\) is air, and the centre of the sphere is on the bubble's side of the surface, so R is negative.",
      formula: {
        label: "Refraction at a spherical surface",
        latex: "\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}",
        symbols: [
          { symbol: "\\(n_1\\)", meaning: "refractive index of the medium the light comes from" },
          { symbol: "\\(n_2\\)", meaning: "refractive index of the medium the light goes into" },
          { symbol: "\\(R\\)", meaning: "radius of curvature, positive if the centre is on the outgoing side" },
        ],
      },
      authoredExample: {
        prompt:
          "A point object in air is 50 cm in front of a convex spherical surface of glass of refractive index 1.6 and radius of curvature 15 cm. Find the position and nature of the image.",
        steps: [
          "Given: \\(n_1 = 1\\), \\(n_2 = 1.6\\), \\(u = -50\\) cm, \\(R = +15\\) cm (convex towards the light).",
          "Formula: \\(\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}\\).",
          "Substitution: \\(\\dfrac{1.6}{v} + \\dfrac{1}{50} = \\dfrac{0.6}{15} = 0.04\\), so \\(\\dfrac{1.6}{v} = 0.04 - 0.02 = 0.02\\).",
          "\\(v = \\dfrac{1.6}{0.02} = +80\\) cm.",
          "v is positive, so the image is inside the glass, on the far side of the surface, where the light really goes.",
        ],
        answer: "A real image 80 cm inside the glass",
      },
      selfCheckExample: {
        prompt:
          "A small air bubble inside a glass sphere of radius 10 cm (refractive index 1.6) is 4 cm from the nearer surface, on a diameter. Where does it appear when seen from outside through that surface?",
        steps: [
          "Light goes from glass to air: \\(n_1 = 1.6\\), \\(n_2 = 1\\), \\(u = -4\\) cm, \\(R = -10\\) cm.",
          "\\(\\dfrac{1}{v} + \\dfrac{1.6}{4} = \\dfrac{1 - 1.6}{-10} = 0.06\\), so \\(\\dfrac{1}{v} = 0.06 - 0.4 = -0.34\\).",
          "\\(v = -2.94\\) cm.",
        ],
        answer: "About 2.9 cm inside the sphere from that surface (virtual), nearer than it really is",
      },
      practiceSet: [
        { prompt: "In the relation for refraction at a spherical surface, which refractive index is written over v?", answer: "That of the medium the light goes into" },
        { prompt: "What is the sign of R for a surface that is concave towards the incoming light?", answer: "Negative" },
        { prompt: "A point source in air faces a convex glass surface (n = 1.6) of radius R. At what distance must it be for the refracted rays inside the glass to be parallel?", answer: "\\(5R/3\\) (from \\(1/u = 0.6/R\\))" },
      ],
      pyqExampleId: "f62a6be6-76b3-4118-b81a-d35d7606e36e",
      traps: [
        {
          title: "Using the lens formula for one surface",
          body: "A single surface is not a thin lens. Use \\(\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}\\); the thin lens formula needs two surfaces.",
        },
        {
          title: "Keeping glass as n2 when light comes out of it",
          body: "For a bubble seen from outside a sphere, the light goes from glass to air, so \\(n_1\\) is the glass. Swapping them puts the image on the wrong side.",
        },
        {
          title: "A derivation with no small-angle step",
          body: "Say that the aperture is small, so the angles may be replaced by their tangents. Without that line, the step from Snell's law to the final relation does not follow and the mark for it is lost.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-lens-maker",
      name: "Lens maker's formula, a lens in a liquid and a cut lens",
      intuition:
        "The focal length of a lens depends on two things: how curved its faces are, and how different its glass is from the medium around it. In a liquid the difference shrinks, so the lens bends light less and its focal length grows. In a liquid of the same refractive index it does nothing at all and seems to vanish. In a liquid denser than the glass, a convex lens even starts to diverge light.",
      definition:
        "- **Derivation outline (double convex lens, NCERT's labels):** lens of index \\(n_2\\) in a medium of index \\(n_1\\). First surface ABC (pole B, centre \\(C_1\\)), second surface ADC (pole D, centre \\(C_2\\)); object O, final image I.\n" +
        "- The first surface alone forms the image \\(I_1\\): \\(\\dfrac{n_1}{OB} + \\dfrac{n_2}{BI_1} = \\dfrac{n_2 - n_1}{BC_1}\\).\n" +
        "- \\(I_1\\) acts as a virtual object for the second surface, which forms I: \\(-\\dfrac{n_2}{DI_1} + \\dfrac{n_1}{DI} = \\dfrac{n_2 - n_1}{DC_2}\\).\n" +
        "- For a thin lens \\(BI_1 = DI_1\\). Adding: \\(\\dfrac{n_1}{OB} + \\dfrac{n_1}{DI} = (n_2 - n_1)\\left(\\dfrac{1}{BC_1} + \\dfrac{1}{DC_2}\\right)\\).\n" +
        "- Object at infinity, so DI = f: \\(\\dfrac{n_1}{f} = (n_2 - n_1)\\left(\\dfrac{1}{BC_1} + \\dfrac{1}{DC_2}\\right)\\).\n" +
        "- Sign convention: \\(BC_1 = +R_1\\), \\(DC_2 = -R_2\\). So \\(\\dfrac{1}{f} = (n_{21} - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\), with \\(n_{21} = n_2/n_1\\). This is the **lens maker's formula**; it holds for a concave lens too.\n" +
        "- **Signs:** a double convex lens has \\(R_1\\) positive and \\(R_2\\) negative; a plane face has R infinite.\n" +
        "- **In a liquid**, use the refractive index of the lens relative to the liquid. The bracket of radii does not change, so divide the formula for the two media to remove it.\n" +
        "- **Cut along the principal axis:** each half keeps both curved faces, so its focal length is unchanged; only its aperture halves.\n" +
        "- **Cut at right angles to the axis:** an equiconvex lens becomes two plano-convex lenses, each of twice the focal length (half the power).\n" +
        "- **Colour:** n is larger for shorter wavelengths, so the power of a lens falls as the wavelength increases.",
      formula: {
        label: "Lens maker's formula",
        latex: "\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad n_{21} = \\frac{n_{\\text{lens}}}{n_{\\text{medium}}}",
      },
      authoredExample: {
        prompt:
          "An equiconvex lens of glass of refractive index 1.6 has both faces of radius 30 cm. Find its focal length in air, and when it is placed in water of refractive index 4/3.",
        steps: [
          "Given: \\(R_1 = +30\\) cm, \\(R_2 = -30\\) cm, so \\(\\dfrac{1}{R_1} - \\dfrac{1}{R_2} = \\dfrac{2}{30} = \\dfrac{1}{15}\\) cm⁻¹.",
          "In air: \\(\\dfrac{1}{f} = (1.6 - 1) \\times \\dfrac{1}{15} = 0.04\\), so \\(f = 25\\) cm.",
          "In water: \\(n_{21} = \\dfrac{1.6}{4/3} = 1.2\\), so \\(\\dfrac{1}{f'} = (1.2 - 1) \\times \\dfrac{1}{15} = \\dfrac{1}{75}\\).",
          "\\(f' = 75\\) cm, still positive, so the lens still converges, but three times more weakly.",
        ],
        answer: "25 cm in air; 75 cm in water (still converging)",
      },
      selfCheckExample: {
        prompt:
          "An equiconvex lens of power +4 D is cut into two equal halves at right angles to its principal axis. What is the power of each half? What would it be if the lens were cut along its axis instead?",
        steps: [
          "Each half at right angles has one curved face and one plane face, so its bracket \\(1/R\\) is half of \\(2/R\\): power +2 D.",
          "A half cut along the axis keeps both curved faces: power +4 D.",
        ],
        answer: "+2 D each; +4 D each if cut along the axis",
      },
      practiceSet: [
        { prompt: "Why does a glass lens become invisible in a liquid of the same refractive index?", answer: "\\(n_{21} = 1\\), so \\(1/f = 0\\): the lens does not bend light at all" },
        { prompt: "Does the power of a lens increase or decrease as the wavelength of light increases?", answer: "It decreases, because n decreases" },
        { prompt: "A convex glass lens is placed in a liquid of higher refractive index than the glass. How does it behave?", answer: "As a diverging lens: \\(n_{21} - 1\\) is negative" },
        { prompt: "For a double convex lens, what are the signs of \\(R_1\\) and \\(R_2\\)?", answer: "\\(R_1\\) positive, \\(R_2\\) negative" },
      ],
      pyqExampleId: "7cc6e037-b707-4053-a97f-3f4c2cf3a120",
      traps: [
        {
          title: "Both radii taken as positive",
          body: "For a double convex lens \\(R_2\\) is negative, so the bracket becomes a SUM, \\(1/R_1 + 1/|R_2|\\). Taking both positive makes an equiconvex lens seem to have no power at all.",
        },
        {
          title: "Using the lens's own n in a liquid",
          body: "In a liquid the formula needs \\(n_{\\text{lens}}/n_{\\text{liquid}}\\), not \\(n_{\\text{lens}}\\). Using the glass value alone gives the same focal length as in air.",
        },
        {
          title: "Halving the focal length when a lens is cut",
          body: "Cutting along the axis changes nothing but the brightness; cutting at right angles DOUBLES the focal length. Neither cut halves it. Say which way the cut is made before you answer.",
        },
        {
          title: "Assertion-reason: two separate judgements",
          body: "Judge the assertion and the reason one at a time before choosing a code. 'The focal length depends only on the radii' is false (it leaves out the refractive index), and a false reason can never be the correct explanation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-lens-formula",
      name: "Thin lens formula, magnification and power",
      intuition:
        "Once you know a lens's focal length, one equation tells you where the image of any object will be, and the ratio v/u tells you how big it is and which way up. A convex lens gives a real, inverted image of an object beyond its focus and a virtual, erect, enlarged one of an object inside it. A concave lens always gives a virtual, erect, smaller image of a real object.",
      definition:
        "- **Thin lens formula:** \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\), with all distances from the optical centre (Cartesian convention). f is positive for a converging lens and negative for a diverging one.\n" +
        "- **Magnification:** \\(m = \\dfrac{h'}{h} = \\dfrac{v}{u}\\). For a lens, a real image has v positive and m negative (inverted); a virtual image has v negative and m positive (erect).\n" +
        "- **Power:** \\(P = \\dfrac{1}{f}\\), with f in metres. Its SI unit is the dioptre: 1 D = 1 m⁻¹, the power of a lens of focal length 1 m. Converging lenses have positive power.\n" +
        "- A beam already converging towards a point beyond the lens is a virtual object: its u is positive.\n" +
        "- A real image exists where the rays meet, whether or not a screen is there; the screen only scatters the light so we can see it.\n" +
        "- **Object and screen a distance D apart:** a sharp image is possible only if \\(D \\geq 4f\\), so the least distance between an object and its real image is 4f. For \\(D > 4f\\) there are two lens positions, a distance d apart, with u and v swapped; one gives an enlarged image, the other a diminished one, and \\(f = \\dfrac{D^2 - d^2}{4D}\\).",
      formula: {
        label: "Thin lens formula, magnification and power",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\qquad m = \\frac{h'}{h} = \\frac{v}{u}, \\qquad P = \\frac{1}{f\\ (\\text{in m})}",
      },
      authoredExample: {
        prompt:
          "An object 4 cm tall is placed 15 cm in front of a convex lens of focal length 10 cm. Find the position, size and nature of the image, and the power of the lens.",
        steps: [
          "Given: \\(u = -15\\) cm, \\(f = +10\\) cm, \\(h = +4\\) cm.",
          "Formula: \\(\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u}\\).",
          "Substitution: \\(\\dfrac{1}{v} = \\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{3 - 2}{30} = \\dfrac{1}{30}\\), so \\(v = +30\\) cm.",
          "\\(m = \\dfrac{v}{u} = \\dfrac{30}{-15} = -2\\), so \\(h' = -2 \\times 4 = -8\\) cm.",
          "Power: \\(P = \\dfrac{1}{0.10\\ \\text{m}} = +10\\) D.",
        ],
        answer: "30 cm behind the lens; real, inverted, 8 cm tall; power +10 D",
      },
      selfCheckExample: {
        prompt: "An object is placed 30 cm in front of a concave lens of focal length 30 cm. Find the position, nature and magnification of the image.",
        steps: [
          "\\(f = -30\\) cm, \\(u = -30\\) cm.",
          "\\(\\dfrac{1}{v} = -\\dfrac{1}{30} - \\dfrac{1}{30} = -\\dfrac{1}{15}\\), so \\(v = -15\\) cm.",
          "\\(m = \\dfrac{-15}{-30} = +0.5\\).",
        ],
        answer: "15 cm in front of the lens; virtual, erect, half the size",
      },
      practiceSet: [
        { prompt: "What is the power of a concave lens of focal length 25 cm?", answer: "\\(-4\\) D" },
        { prompt: "What is the least possible distance between an object and its real image formed by a convex lens of focal length f?", answer: "4f" },
        { prompt: "An object and a screen are 100 cm apart. A convex lens gives a sharp image at two positions 20 cm apart. Find its focal length.", answer: "24 cm" },
        { prompt: "A real image is formed on a screen by a convex lens. Is the image still there if the screen is removed?", answer: "Yes. The rays still meet there; the screen only lets us see it" },
      ],
      pyqExampleId: "4b60d263-ec8d-426b-b7dd-49a9dcf7c2a9",
      traps: [
        {
          title: "Power worked out in centimetres",
          body: "P = 1/f only gives dioptres when f is in metres. A lens of focal length 25 cm has power 1/0.25 = 4 D, not 1/25.",
        },
        {
          title: "Using the mirror's magnification for a lens",
          body: "For a mirror \\(m = -v/u\\); for a lens \\(m = +v/u\\). The minus sign belongs only to the mirror.",
        },
        {
          title: "Calling an erect image real",
          body: "An erect image by a single lens is virtual. If the question says erect and magnified, the lens is convex and the object is inside its focus, so take m positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-combination",
      name: "Lenses in contact and lenses apart",
      intuition:
        "With two lenses, the image made by the first is simply the object for the second. If the lenses touch, that idea collapses into one neat rule: their powers add. If they are apart, you work one lens at a time, remembering to measure every distance from the lens you are using.",
      definition:
        "- **Proof for two thin lenses A and B in contact** (focal lengths \\(f_1\\), \\(f_2\\)):\n" +
        "- Lens A alone forms an image \\(I_1\\) at \\(v_1\\): \\(\\dfrac{1}{v_1} - \\dfrac{1}{u} = \\dfrac{1}{f_1}\\).\n" +
        "- \\(I_1\\) is the object for B. As the lenses touch, its distance from B is also \\(v_1\\): \\(\\dfrac{1}{v} - \\dfrac{1}{v_1} = \\dfrac{1}{f_2}\\).\n" +
        "- Adding: \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}\\). The pair acts as one lens of focal length f with \\(\\dfrac{1}{f} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}\\), that is \\(f = \\dfrac{f_1 f_2}{f_1 + f_2}\\).\n" +
        "- In powers: \\(P = P_1 + P_2 + P_3 + \\dots\\). The total magnification is the product \\(m = m_1 m_2 m_3 \\dots\\).\n" +
        "- **Lenses apart:** find the image formed by the first lens, then measure its distance from the SECOND lens. If it lies beyond the second lens, it is a virtual object with u positive.\n" +
        "- A lens followed by a mirror is solved the same way: the lens's image is the mirror's object.",
      formula: {
        label: "Thin lenses in contact",
        latex: "\\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2}, \\qquad P = P_1 + P_2, \\qquad m = m_1 m_2",
      },
      authoredExample: {
        prompt:
          "An object is 20 cm in front of a convex lens of focal length 15 cm. A second convex lens of focal length 10 cm is placed 80 cm behind the first, on the same axis. Find the position and nature of the final image and the total magnification.",
        steps: [
          "First lens: \\(u_1 = -20\\) cm, \\(f_1 = +15\\) cm. \\(\\dfrac{1}{v_1} = \\dfrac{1}{15} - \\dfrac{1}{20} = \\dfrac{1}{60}\\), so \\(v_1 = +60\\) cm; \\(m_1 = \\dfrac{60}{-20} = -3\\).",
          "This image is \\(80 - 60 = 20\\) cm in front of the second lens: \\(u_2 = -20\\) cm, \\(f_2 = +10\\) cm.",
          "\\(\\dfrac{1}{v_2} = \\dfrac{1}{10} - \\dfrac{1}{20} = \\dfrac{1}{20}\\), so \\(v_2 = +20\\) cm; \\(m_2 = \\dfrac{20}{-20} = -1\\).",
          "Total magnification: \\(m = m_1 m_2 = (-3)(-1) = +3\\).",
        ],
        answer: "Final image 20 cm behind the second lens; real, erect, three times the size",
      },
      selfCheckExample: {
        prompt: "A convex lens of focal length 25 cm is in contact with a concave lens of focal length 50 cm. Find the power and focal length of the combination.",
        steps: ["\\(P = \\dfrac{1}{0.25} + \\dfrac{1}{-0.50} = 4 - 2 = +2\\) D.", "\\(f = \\dfrac{1}{2}\\) m \\(= 50\\) cm, converging."],
        answer: "+2 D; 50 cm, a converging combination",
      },
      practiceSet: [
        { prompt: "Thin lenses of power +7 D and \\(-2\\) D are in contact. Find the focal length of the combination.", answer: "20 cm" },
        { prompt: "Why can the powers of two lenses not simply be added when the lenses are some distance apart?", answer: "The image of the first lens is no longer at the same distance from the second" },
        { prompt: "In a system of two separated lenses, from which lens is the object distance for the second lens measured?", answer: "From the second lens" },
      ],
      pyqExampleId: "6c85bd16-9456-448c-b173-6395798956e0",
      traps: [
        {
          title: "Measuring from the first lens",
          body: "When the lenses are apart, the object distance for the second lens is measured from the second lens. Using the distance from the first lens is the commonest wrong answer.",
        },
        {
          title: "Adding focal lengths",
          body: "Powers add, and so do reciprocals of focal lengths. A 10 cm lens and a 10 cm lens in contact give 5 cm, not 20 cm.",
        },
        {
          title: "Adding magnifications",
          body: "The total magnification of a system is the PRODUCT of the separate magnifications, sign included. Its sign tells you whether the final image is erect or inverted.",
        },
      ],
    },
  ],
};
