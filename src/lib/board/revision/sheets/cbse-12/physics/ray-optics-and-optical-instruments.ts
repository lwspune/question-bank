import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 9 Ray Optics and Optical Instruments. Statements
 * checked against the NCERT text (definitions are the book's own wording);
 * most-asked years from all 209 CBSE board past-paper questions in the bank,
 * 2022-2026. The two-positions (displacement) method, asked in 2025 and 2026,
 * is not taught in the book.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Ray Optics and Optical Instruments",
  chapterSlug: "ray-optics-and-optical-instruments",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 9",
  keyPoints: [
    {
      term: "Cartesian sign convention",
      text: "All distances are measured from the pole of the mirror or the optical centre of the lens. Distances in the direction of the incident light are positive, those opposite to it negative. Heights upwards are positive, downwards negative.",
    },
    {
      term: "Spherical mirrors",
      text: "Focal length \\(f = \\frac{R}{2}\\); concave mirror f negative, convex mirror f positive. A convex mirror always gives a virtual, erect, diminished image. A plane or convex mirror can give a real image only of a virtual object (rays converging on it).",
    },
    {
      term: "Laws of refraction (Snell's law)",
      text: "(i) The incident ray, the refracted ray and the normal at the point of incidence lie in the same plane. (ii) The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant: \\(\\frac{\\sin i}{\\sin r} = n_{21}\\).",
    },
    {
      term: "Refractive index, speed and colour",
      text: "\\(n = \\frac{c}{v}\\) and \\(n_{21} = \\frac{v_1}{v_2}\\): optical density is the ratio of the speeds of light. \\(n_{21}\\) depends on the wavelength: violet has a larger n (and a smaller speed in glass) than red. On refraction the frequency stays the same; speed and wavelength change.",
    },
    {
      term: "Apparent depth and slab",
      text: "Viewed near the normal, apparent depth = real depth \\(\\div\\) n, so a tank bottom looks raised. Through a parallel-sided slab the emergent ray is parallel to the incident ray: no deviation, only a lateral shift.",
    },
    {
      term: "Total internal reflection",
      text: "The critical angle \\(i_c\\) is the angle of incidence for which the angle of refraction is 90°. For \\(i > i_c\\) no refraction is possible and all light is reflected. Conditions: light goes from a denser to a rarer medium, and the angle of incidence exceeds the critical angle. \\(n_{12} = \\frac{1}{\\sin i_c}\\).",
    },
    {
      term: "Uses of total internal reflection",
      text: "Prisms that bend rays by 90° or 180° or invert an image; brilliance of diamond (\\(i_c \\approx 24.4^\\circ\\)); mirage; optical fibres: a core of higher refractive index than the cladding, so light undergoes repeated total internal reflections with no appreciable loss. Used as a light pipe to examine internal organs, and for signals.",
    },
    {
      term: "Refraction at a spherical surface",
      text: "For a small aperture, object in medium \\(n_1\\) and image in medium \\(n_2\\): \\(\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}\\). It is the basis of the lens maker's formula.",
    },
    {
      term: "Lens maker's formula",
      text: "\\(\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)\\). It is useful to design lenses of desired focal length. In a liquid, \\(n_{21}\\) is lens over liquid, so f increases; if the liquid's index exceeds the glass's, a convex lens diverges; if equal, the lens disappears.",
    },
    {
      term: "Power of a lens",
      text: "A measure of the convergence or divergence a lens introduces: \\(P = \\frac{1}{f}\\) with f in metres. SI unit dioptre: 1 D = 1 m\\(^{-1}\\), the power of a lens of focal length 1 m. Positive for a converging lens, negative for a diverging lens.",
    },
    {
      term: "Lenses in contact",
      text: "Thin lenses in contact: \\(\\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\ldots\\) and \\(P = P_1 + P_2 + \\ldots\\); total magnification \\(m = m_1m_2\\ldots\\). For lenses apart, the image by the first lens is the object for the second.",
    },
    {
      term: "Prism and minimum deviation",
      text: "The angle between the emergent ray and the incident ray is the angle of deviation \\(\\delta\\). It depends on the angle of incidence. At minimum deviation \\(D_m\\), \\(i = e\\), \\(r_1 = r_2 = \\frac{A}{2}\\) and the refracted ray inside the prism is parallel to its base. A thin prism: \\(D_m = (n - 1)A\\).",
    },
    {
      term: "Microscopes",
      text: "Simple microscope: a converging lens of small focal length giving an erect, magnified, virtual image. Compound microscope: the objective forms a real, inverted, magnified image near the eyepiece's focus; the eyepiece forms the final virtual, inverted image. Both lenses have short focal lengths. Image at infinity is viewed by a relaxed eye.",
    },
    {
      term: "Telescopes",
      text: "Objective of large focal length and much larger aperture than the eyepiece. Light gathering power depends on the area of the objective; resolving power also on its diameter. Reflecting telescope (concave mirror objective): no chromatic aberration, lighter, supported over its entire back surface.",
    },
  ],
  formulas: [
    { label: "Mirror equation", latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} \\qquad f = \\frac{R}{2} \\qquad m = \\frac{h'}{h} = -\\frac{v}{u}" },
    { label: "Snell's law", latex: "n_1\\sin i = n_2\\sin r \\qquad n_{21} = \\frac{n_2}{n_1} = \\frac{v_1}{v_2} \\qquad n = \\frac{c}{v}" },
    { label: "Apparent depth", latex: "h_{\\text{apparent}} = \\frac{h_{\\text{real}}}{n} \\qquad \\text{shift} = t\\left(1 - \\frac{1}{n}\\right)" },
    { label: "Lateral shift in a slab", latex: "d = \\frac{t\\sin(i - r)}{\\cos r}" },
    { label: "Critical angle", latex: "\\sin i_c = \\frac{1}{n_{12}} = \\frac{n_{\\text{rarer}}}{n_{\\text{denser}}}" },
    { label: "Bulb at depth h in a liquid", latex: "r = h\\tan i_c = \\frac{h}{\\sqrt{n^2 - 1}} \\qquad \\text{Area} = \\frac{\\pi h^2}{n^2 - 1}" },
    { label: "Refraction at a spherical surface", latex: "\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}" },
    { label: "Lens maker's formula", latex: "\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)" },
    {
      label: "Lens in a liquid",
      latex: "\\frac{1}{f_l} = \\left(\\frac{n_g}{n_l} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) \\qquad \\frac{f_l}{f_a} = \\frac{n_g - 1}{\\frac{n_g}{n_l} - 1}",
    },
    { label: "Thin lens formula", latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\qquad m = \\frac{h'}{h} = \\frac{v}{u}" },
    { label: "Power and lenses in contact", latex: "P = \\frac{1}{f\\text{ (m)}} \\qquad \\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2} \\qquad P = P_1 + P_2 \\qquad m = m_1m_2" },
    { label: "Two positions of a lens", latex: "f = \\frac{D^2 - d^2}{4D} \\qquad d = \\sqrt{D(D - 4f)} \\qquad D \\geq 4f" },
    { label: "Prism", latex: "r_1 + r_2 = A \\qquad \\delta = i + e - A" },
    { label: "Refractive index of a prism", latex: "n_{21} = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)} \\qquad D_m = (n_{21} - 1)A \\text{ (thin prism)}" },
    { label: "Simple microscope", latex: "m = 1 + \\frac{D}{f} \\text{ (near point)} \\qquad m = \\frac{D}{f} \\text{ (infinity)} \\qquad D = 25\\text{ cm}" },
    {
      label: "Compound microscope",
      latex: "m = m_om_e \\qquad m = \\frac{L}{f_o}\\left(1 + \\frac{D}{f_e}\\right) \\text{ (near point)} \\qquad m = \\frac{L}{f_o}\\cdot\\frac{D}{f_e} \\text{ (infinity)}",
      symbols: [{ symbol: "\\(L\\)", meaning: "tube length: second focal point of objective to first focal point of eyepiece" }],
    },
    { label: "Telescope (normal adjustment)", latex: "m = \\frac{\\beta}{\\alpha} = \\frac{f_o}{f_e} \\qquad \\text{length} = f_o + f_e" },
  ],
  derivations: [
    {
      title: "Mirror equation for a concave mirror (real image), and magnification",
      steps: [
        "Object AB beyond C; rays parallel to the axis and through F meet at A′: image A′B′. Paraxial rays, so \\(MP\\) is taken as a straight line.",
        "Triangles A′B′F and MPF: \\(\\frac{B'A'}{PM} = \\frac{B'F}{FP}\\), with \\(PM = AB\\). Triangles A′B′P and ABP: \\(\\frac{B'A'}{BA} = \\frac{B'P}{BP}\\).",
        "So \\(\\frac{B'P - FP}{FP} = \\frac{B'P}{BP}\\). With signs \\(B'P = -v\\), \\(FP = -f\\), \\(BP = -u\\): \\(\\frac{v - f}{f} = \\frac{v}{u}\\).",
        "Divide by v: \\(\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}\\). Magnification \\(m = \\frac{h'}{h} = -\\frac{v}{u}\\).",
      ],
    },
    {
      title: "Show that a convex mirror always forms a virtual, diminished image",
      steps: [
        "For a convex mirror f is positive and a real object has u negative.",
        "\\(\\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u} = \\frac{1}{f} + \\frac{1}{|u|} > 0\\): v is positive, the image is behind the mirror, virtual.",
        "\\(\\frac{1}{v} > \\frac{1}{|u|}\\), so \\(v < |u|\\) and \\(m = -\\frac{v}{u}\\) lies between 0 and 1: erect and diminished.",
      ],
    },
    {
      title: "Refraction at a spherical surface: relation between u, v, n1, n2 and R",
      steps: [
        "Object O in medium \\(n_1\\), image I in \\(n_2\\), centre C; ray OM refracts along MI. Small angles: \\(\\tan\\angle MOC = \\frac{MN}{OM}\\) and so on.",
        "In the triangles: \\(i = \\angle MOC + \\angle MCO\\), \\(r = \\angle MCO - \\angle MIC\\).",
        "Snell's law for small angles: \\(n_1 i = n_2 r\\), giving \\(\\frac{n_1}{OM} + \\frac{n_2}{MI} = \\frac{n_2 - n_1}{MC}\\).",
        "With \\(OM = -u\\), \\(MI = +v\\), \\(MC = +R\\): \\(\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}\\).",
      ],
    },
    {
      title: "Lens maker's formula and the thin lens formula",
      steps: [
        "First surface (radius \\(R_1\\)) forms image \\(I_1\\) of O: \\(\\frac{n_2}{v_1} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R_1}\\).",
        "\\(I_1\\) is a virtual object for the second surface (\\(R_2\\)): \\(\\frac{n_1}{v} - \\frac{n_2}{v_1} = \\frac{n_1 - n_2}{R_2}\\). For a thin lens the distances are measured from the same point.",
        "Add: \\(\\frac{n_1}{v} - \\frac{n_1}{u} = (n_2 - n_1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)\\).",
        "Object at infinity gives v = f: \\(\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)\\); hence \\(\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}\\).",
      ],
    },
    {
      title: "Focal length of two thin lenses in contact",
      steps: [
        "Lens A forms image \\(I_1\\) of O: \\(\\frac{1}{v_1} - \\frac{1}{u} = \\frac{1}{f_1}\\).",
        "\\(I_1\\) is the object for lens B (optical centres coincide): \\(\\frac{1}{v} - \\frac{1}{v_1} = \\frac{1}{f_2}\\).",
        "Add: \\(\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f_1} + \\frac{1}{f_2}\\), so \\(\\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2}\\) and \\(P = P_1 + P_2\\).",
      ],
    },
    {
      title: "Refractive index of a prism in terms of A and the angle of minimum deviation",
      steps: [
        "Quadrilateral AQNR has right angles at Q and R, so \\(A + \\angle QNR = 180^\\circ\\); triangle QNR gives \\(r_1 + r_2 = A\\).",
        "Total deviation \\(\\delta = (i - r_1) + (e - r_2) = i + e - A\\).",
        "At minimum deviation \\(i = e\\), \\(r_1 = r_2 = r\\): \\(r = \\frac{A}{2}\\) and \\(i = \\frac{A + D_m}{2}\\).",
        "\\(n_{21} = \\frac{\\sin i}{\\sin r} = \\frac{\\sin\\frac{A + D_m}{2}}{\\sin\\frac{A}{2}}\\). Thin prism: \\(D_m = (n_{21} - 1)A\\).",
      ],
    },
    {
      title: "Critical angle and refractive index; area through which light from a bulb in a tank emerges",
      steps: [
        "At \\(i = i_c\\) the refracted ray grazes the surface: \\(n_1\\sin i_c = n_2\\sin 90^\\circ\\), so \\(\\sin i_c = \\frac{n_2}{n_1}\\); from a medium into air, \\(n = \\frac{1}{\\sin i_c}\\).",
        "Bulb at depth h: light leaves only within a circle of radius \\(r = h\\tan i_c\\).",
        "\\(\\tan i_c = \\frac{1}{\\sqrt{n^2 - 1}}\\), so the area is \\(\\frac{\\pi h^2}{n^2 - 1}\\).",
      ],
    },
    {
      title: "Magnifying power of a compound microscope",
      steps: [
        "Objective: linear magnification \\(m_o = \\frac{h'}{h} = \\frac{L}{f_o}\\), L the tube length.",
        "The first image is near the eyepiece's focus; the eyepiece acts as a simple microscope: \\(m_e = 1 + \\frac{D}{f_e}\\) (near point) or \\(\\frac{D}{f_e}\\) (infinity).",
        "\\(m = m_om_e = \\frac{L}{f_o}\\left(1 + \\frac{D}{f_e}\\right)\\) or \\(\\frac{L}{f_o}\\cdot\\frac{D}{f_e}\\): both focal lengths should be small.",
      ],
    },
    {
      title: "Magnifying power of an astronomical telescope in normal adjustment",
      steps: [
        "The objective forms a real, inverted image of height h at its second focal point; the object subtends \\(\\alpha \\approx \\frac{h}{f_o}\\).",
        "This image is at the eyepiece's focus, so the final image is at infinity and subtends \\(\\beta \\approx \\frac{h}{f_e}\\).",
        "\\(m = \\frac{\\beta}{\\alpha} = \\frac{f_o}{f_e}\\); length of the tube \\(= f_o + f_e\\).",
      ],
    },
    {
      title: "Two positions of a lens for a fixed object and screen",
      steps: [
        "Object and screen a distance D apart; u and v can be interchanged, so a sharp image forms at two lens positions a distance d apart.",
        "\\(|u| + v = D\\) and \\(v - |u| = d\\): \\(v = \\frac{D + d}{2}\\), \\(|u| = \\frac{D - d}{2}\\).",
        "\\(\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{|u|}\\) gives \\(f = \\frac{D^2 - d^2}{4D}\\). A real image needs \\(D \\geq 4f\\); one image is enlarged, the other diminished.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Compound microscope (image at the near point)",
      labels: ["object AB just beyond fo", "objective and eyepiece", "real, inverted image A′B′ near Fe", "final virtual image at distance D", "tube length L"],
    },
    {
      title: "Astronomical refracting telescope in normal adjustment",
      labels: ["parallel rays from a distant object at angle α", "objective (large fo) and eyepiece (small fe)", "real image at the common focus", "final image at infinity, angle β"],
    },
    {
      title: "Reflecting telescope (Cassegrain)",
      labels: ["concave primary mirror (objective)", "convex secondary mirror", "hole in the primary mirror", "eyepiece"],
    },
    {
      title: "Refraction through a triangular prism and the deviation curve",
      labels: ["angle of prism A, normals at both faces", "angles i, r1, r2 and e", "angle of deviation δ", "δ against i: a curve with minimum Dm at i = e"],
    },
    {
      title: "Total internal reflection and the optical fibre",
      labels: ["rays from a point in the denser medium", "critical angle: refracted ray along the surface", "core and cladding", "repeated total internal reflections"],
    },
    {
      title: "Image by a concave mirror (object beyond C)",
      labels: ["pole P, focus F, centre C", "ray parallel to the axis and ray through F", "real, inverted image A′B′", "distances u, v and f with signs"],
    },
  ],
  mostAsked: [
    { topic: "Refraction at a plane surface and total internal reflection: refractive index, apparent depth, critical angle, a bulb in a tank, optical fibre", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Lens maker's formula: derive it, lens in a liquid, a lens cut into two, radius from power", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Thin lenses: lens formula, combination of lenses in contact or apart, power of a combination, two positions of a lens", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Prism: trace the ray, deviation and minimum deviation, refractive index from A and the minimum deviation, total reflection in a prism", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Astronomical (refracting) and reflecting telescope: ray diagram, magnifying power, length, advantages of a reflector", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Compound microscope: ray diagram, magnifying power at the near point and at infinity, or a numerical", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Spherical mirrors: ray diagram, mirror equation and magnification, or a numerical", years: [2026, 2025, 2024, 2023] },
    { topic: "Refraction at a spherical surface: derive the relation between u and v, or a numerical (air bubble in a glass sphere)", years: [2026, 2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Dropping the signs",
      body: "Concave mirror and concave lens: f negative; real object: u negative. A real image has negative m for a mirror and for a lens; a virtual erect image has positive m. A convex mirror gives positive m, never negative.",
    },
    {
      title: "Lens and mirror in a liquid",
      body: "A lens's focal length grows in a liquid (it depends on \\(\\frac{n_g}{n_l}\\)); a convex lens in a liquid of higher index diverges. A mirror's focal length does not change in a liquid: reflection does not depend on the medium.",
    },
    {
      title: "Cutting a lens the wrong way",
      body: "Cut along the principal axis: each half keeps focal length f. Cut perpendicular to it (an equiconvex lens into two plano-convex halves): each has \\(2f\\) and power \\(\\frac{P}{2}\\); the two put back in contact give P again.",
    },
    {
      title: "Critical angle errors",
      body: "Total internal reflection needs denser to rarer. Violet has a larger n than red, so a smaller critical angle: if yellow is just totally reflected, blue and green are too, red is not. At \\(i = i_c\\) the angle of reflection is \\(i_c\\), less than 90°.",
    },
    {
      title: "Prism at minimum deviation",
      body: "Here \\(r = \\frac{A}{2}\\) and \\(i = e\\), and the ray inside is parallel to the base. For a prism of \\(n = \\sqrt{2}\\) and \\(A = 60^\\circ\\): \\(D_m = 30^\\circ\\). Do not use \\(D_m = (n - 1)A\\) unless the prism is thin.",
    },
    {
      title: "Power in cm, and the final image",
      body: "\\(P = \\frac{1}{f}\\) needs f in metres: f = 20 cm gives 5 D. The final image of a compound microscope and of an astronomical telescope is inverted.",
    },
  ],
};

export default sheet;
