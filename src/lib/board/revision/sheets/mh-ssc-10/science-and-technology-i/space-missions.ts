import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 10 Space Missions. Statements
 * checked against the Balbharati text; most-asked years from the board past
 * papers in the bank, 2019-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Space Missions",
  chapterSlug: "space-missions",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 10",
  keyPoints: [
    {
      term: "Two types of space missions",
      text: "1. Putting artificial satellites in orbit around the earth for research and useful applications. 2. Sending spacecraft to outer space to observe objects in the solar system or beyond.",
    },
    {
      term: "Importance of space missions",
      text: "The world has become a global village: instant communication, TV, weather forecasts, navigation, surveillance of the enemy in war, finding fossil fuel and mineral reserves, advance alerts about natural calamities.",
    },
    {
      term: "Natural and artificial satellites",
      text: "A natural satellite is an astronomical object orbiting a planet; the moon is the earth's only one. The first artificial satellite, **Sputnik**, was sent by the Soviet Union in 1957.",
    },
    {
      term: "Types of satellites",
      text: "Weather, communication and broadcast: **INSAT, GSAT** (launcher GSLV). Navigational: **IRNSS** (PSLV). Earth observation: **IRS** (PSLV). Military satellites collect information for security.",
    },
    {
      term: "Critical velocity",
      text: "The tangential velocity given to a satellite at a specific height so that it revolves around the earth. It does not depend on the satellite's mass, and decreases as the height of the orbit increases.",
    },
    {
      term: "High earth orbit",
      text: "Height 35780 km or more. At 35780 km a satellite takes about 24 hours per revolution, like the earth, so it looks stationary: **geosynchronous**. Used for weather and telephone, TV and radio signals.",
    },
    {
      term: "Medium earth orbit",
      text: "Height 2000 km to 35780 km. Geostationary satellites orbit above the equator, so they cannot study the polar regions; elliptical **polar orbits** are used. GPS satellites orbit at about 20,200 km.",
    },
    {
      term: "Low earth orbit",
      text: "Height 180 km to 2000 km; one revolution in about 90 minutes. Used for scientific experiments and atmospheric studies. The International Space Station and the Hubble telescope are here, and so is Swayam, the 1 kg satellite made by COEP students (2016, 515 km).",
    },
    {
      term: "Satellite launch vehicle",
      text: "Places satellites in their orbits. Works on **Newton's third law**: hot gases are forced out of the rear nozzles, and the reaction thrust drives the vehicle up. A Diwali rocket works the same way.",
    },
    {
      term: "Multistage launchers",
      text: "Fuel is most of the weight, so launchers have two or more stages; each empty stage is dropped. ISRO's PSLV and GSLV are examples. The space shuttle (USA) can be reused.",
    },
    {
      term: "Escape velocity",
      text: "To leave the earth's gravity for outer space, a spacecraft needs a minimum velocity of 11.2 km/s. The escape velocity on the moon is less than on the earth.",
    },
    {
      term: "Moon missions",
      text: "The moon is the astronomical object closest to us. Neil Armstrong stepped on it in July 1969. ISRO's **Chandrayaan-1** (2008) discovered water on the moon's surface.",
    },
    {
      term: "Mars mission",
      text: "Mars is the nearest object after the moon. ISRO's **Mangalyaan**, made at minimum expense, was launched in November 2013 and reached Mars orbit in September 2014.",
    },
    {
      term: "Space debris",
      text: "Non-functional satellites, launcher parts and pieces from collisions that revolve around the earth. They can collide with and damage working satellites and spacecraft, so they must be managed.",
    },
  ],
  formulas: [
    {
      label: "Critical velocity",
      latex: "v_c = \\sqrt{\\frac{GM}{R + h}}",
      symbols: [
        { symbol: "R + h", meaning: "radius of the orbit (R = 6400 km)" },
        { symbol: "G, M", meaning: "6.67 × 10⁻¹¹ N m²/kg², 6 × 10²⁴ kg" },
      ],
    },
    { label: "Time for one revolution", latex: "T = \\frac{2\\pi (R + h)}{v}" },
    {
      label: "Satellite at 35780 km: worked values",
      latex: "v \\approx 3.08\\ \\text{km/s} \\qquad T = \\frac{2 \\times 3.14 \\times 42180}{3.08} \\approx 86000\\ \\text{s} \\approx 24\\ \\text{h}",
    },
    { label: "Escape velocity", latex: "v_{esc} = \\sqrt{\\frac{2GM}{R}} \\approx 11.2\\ \\text{km/s (earth)}" },
    {
      label: "Orbit heights above the earth",
      latex: "\\text{LEO: } 180\\text{ to }2000\\ \\text{km} \\qquad \\text{MEO: } 2000\\text{ to }35780\\ \\text{km} \\qquad \\text{HEO: } \\ge 35780\\ \\text{km}",
    },
  ],
  derivations: [
    {
      title: "Critical velocity of a satellite",
      steps: [
        "A satellite of mass \\(m\\) moves at speed \\(v_c\\) in an orbit of radius \\(R + h\\). It needs a centripetal force \\(\\frac{mv_c^2}{R + h}\\).",
        "The earth's gravity provides it: \\(\\frac{mv_c^2}{R + h} = \\frac{GMm}{(R + h)^2}\\).",
        "So \\(v_c = \\sqrt{\\frac{GM}{R + h}}\\): it does not depend on \\(m\\), and it falls as \\(h\\) rises.",
      ],
    },
    {
      title: "Working of a multistage launch vehicle",
      steps: [
        "The fuel burns and the hot gas is forced out through the rear nozzles; the reaction thrust pushes the vehicle up (Newton's third law).",
        "When the first stage's fuel is used up, its empty tank and engine detach and fall into the sea or on unpopulated land.",
        "The next stage fires; with less weight the vehicle gains more speed and finally places the satellite in its orbit.",
      ],
    },
  ],
  diagrams: [
    { title: "Orbit of an artificial satellite", labels: ["earth with radius R", "height h", "orbit radius R + h", "critical velocity vc along the tangent"] },
    { title: "Orbits of satellites", labels: ["low earth orbit (LEO)", "medium earth orbit (MEO)", "high earth orbit (HEO)", "earth"] },
    { title: "Structure of PSLV made by ISRO", labels: ["first stage using solid fuel", "second stage using liquid fuel", "separation of fuel tank"] },
  ],
  mostAsked: [
    { topic: "Types of satellites, their functions, Indian satellite series and launchers (table or chart)", marks: 3, years: [2025, 2024, 2023, 2022, 2020] },
    { topic: "Orbits: why geostationary satellites cannot study polar regions, heights of HEO and MEO, Hubble's orbit", marks: 1, years: [2026, 2025, 2023, 2019] },
    { topic: "Space debris: what it is and why it must be managed", marks: 3, years: [2026, 2024, 2019] },
    { topic: "Satellite launch vehicle: what it is, Newton's third law, the Diwali rocket", marks: 2, years: [2025, 2024, 2022] },
    { topic: "One-mark facts: Sputnik, Swayam, the closest astronomical object (moon)", marks: 1, years: [2023, 2020] },
    { topic: "State the importance of space missions", marks: 3, years: [2022] },
  ],
  mistakes: [
    {
      title: "Naming a launcher as a satellite",
      body: "PSLV and GSLV are **launch vehicles**. INSAT, GSAT, IRS and IRNSS are **satellite series**.",
    },
    {
      title: "Basing the launcher on the wrong law",
      body: "A launch vehicle works on Newton's **third** law of motion (action and reaction), not the second law or gravitation.",
    },
    {
      title: "Using height in place of the orbit radius",
      body: "In \\(v_c\\) and \\(T\\) use \\(R + h\\): for 35780 km, \\(R + h = 6400 + 35780 = 42180\\) km. Keep km with km/s.",
    },
    {
      title: "Thinking a heavier satellite needs a larger critical velocity",
      body: "The satellite's mass cancels out. Only the earth's mass and the orbit radius matter.",
    },
    {
      title: "Mixing up the orbit ranges",
      body: "LEO 180 to 2000 km, MEO 2000 to 35780 km, HEO 35780 km and above. Geosynchronous satellites are at 35780 km.",
    },
  ],
};

export default sheet;
