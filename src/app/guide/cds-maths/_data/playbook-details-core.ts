/**
 * Deep-dives for the Cornerstone and Quick-Win playbooks of /guide/cds-maths. Counts quoted here are
 * from the live bank as of OVERVIEW.asOf and match CHAPTER_TABLE.
 */
import type { PlaybookDetail } from "./types";

export const CORE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  trigonometry: {
    slug: "trigonometry",
    trigger: "Ratios of an acute angle, an identity to simplify, or a value given for one expression and asked for another.",
    story: [
      "The largest chapter in the bank (227 questions) and the one that has grown most: 8.8 questions a paper in 2016-2020, 13.0 on the six 2024-2026 papers. It is Class 10 trigonometry — acute angles, standard values, identities — not the Class 11 general-angle chapter.",
      "Its HARD is pooled. Maximum and minimum values (37 questions, 35% HARD) and eliminating θ (34 questions, 47%) hold 29 of the chapter's 46 HARD questions. The other eight subtopics run between 0% and 18% HARD, so the chapter rewards doing them first.",
    ],
    subSkills: [
      { name: "Standard values and ratios", description: "Degree and radian values, and the six ratios read off a right triangle." },
      { name: "Identities", description: "sin²θ + cos²θ = 1 and its two relatives, used to simplify and prove." },
      { name: "The reciprocal pairs", description: "sec θ + tan θ and sec θ − tan θ multiply to 1; the same for cosec θ and cot θ." },
      { name: "Complementary angles", description: "sin(90° − θ) = cos θ and its companions, which collapse long products." },
      { name: "Maximum and minimum", description: "a sin θ + b cos θ lies between −√(a² + b²) and +√(a² + b²); x + 1/x ≥ 2." },
      { name: "Eliminating θ", description: "Given x and y in terms of θ, square and add (or multiply) to remove θ." },
    ],
    traps: [
      { name: "Impossible values", description: "sin θ = 1.2 or sec θ = 0.5 has no solution; options built on them are distractors." },
      { name: "The reciprocal pair", description: "If sec θ + tan θ = p, then sec θ − tan θ = 1/p, not −p." },
      { name: "Degrees and radians mixed", description: "A radian value placed beside degree options, one of which matches the radian number." },
    ],
    relatedSlugs: ["heights", "triangles", "algebraic-identities"],
  },
  "number-system": {
    slug: "number-system",
    trigger: "Divisibility, remainders, factors, HCF and LCM, unit digits, or a digit puzzle.",
    story: [
      "223 questions, level with Trigonometry on recent papers at 13 a paper (up from 9.8 in 2016-2020). It is twelve subtopics of whole-number reasoning, and almost every question has one short route if you know the right rule.",
      "Its HARD (16%) is spread rather than pooled: remainders by congruence, divisibility by factorisation, HCF laws and division each carry some. Primes, HCF and LCM applications and irrational numbers have never set a HARD question. There is no page to leave for last — own the chapter.",
    ],
    subSkills: [
      { name: "Divisibility rules", description: "By 3, 4, 8, 9, 11 and composites through their co-prime factors." },
      { name: "Factors and trailing zeros", description: "Divisor count from prime powers; trailing zeros of n! from powers of 5." },
      { name: "HCF and LCM", description: "HCF × LCM = product of two numbers; remainder recipes for 'leaves remainder r in each case'." },
      { name: "Remainders", description: "Reduce the base mod n, then use cyclicity or (a ± 1)ⁿ." },
      { name: "Unit digits", description: "Powers cycle in blocks of four; take the exponent mod 4." },
    ],
    traps: [
      { name: "HCF × LCM for three numbers", description: "The product rule holds for two numbers only." },
      { name: "Divisibility by a product needs co-prime factors", description: "Divisible by 3 and by 9 is only divisible by 9, not 27; divisible by 2 and by 4 need not be divisible by 8. Test 12 as 3 × 4, not 2 × 6." },
      { name: "1 is neither prime nor composite", description: "Counting it in either set shifts the answer by one." },
    ],
    relatedSlugs: ["polynomials", "surds-indices", "logarithms"],
  },
  "mensuration-2d": {
    slug: "mensuration-2d",
    trigger: "Area or perimeter of a plane figure, a wheel's revolutions, or a shaded region between shapes.",
    story: [
      "197 questions, steady at about 9.4 a paper. Most of it is formula application: triangle areas, quadrilaterals, circles and sectors. Wheels, arcs and re-bent wires are nearly free (4-6% HARD).",
      "The HARD sits in three pages: touching circles (13 questions, 62% HARD), combined and shaded regions (40%) and inscribed figures (34%). These are set-up problems — the formula is easy once you see which shapes make up the region.",
    ],
    subSkills: [
      { name: "Triangles and quadrilaterals", description: "Heron's formula, the equilateral √3/4 a², rhombus and trapezium areas." },
      { name: "Circles, arcs and sectors", description: "Sector = θ/360 × πr², arc = θ/360 × 2πr." },
      { name: "Wheels and rings", description: "Revolutions = distance ÷ circumference." },
      { name: "Inscribed and circumscribed figures", description: "A square in a circle has diagonal = diameter; a circle in a triangle has r = area ÷ semi-perimeter." },
      { name: "Shaded regions", description: "The shaded area is a whole minus the pieces; touching circles give a triangle minus three sectors." },
    ],
    traps: [
      { name: "Diameter for radius", description: "A 14 cm diameter circle used as r = 14." },
      { name: "The gap between three circles", description: "The three 60° sectors add to half a circle, not a whole one." },
      { name: "Perimeter of a sector", description: "Arc length plus TWO radii." },
    ],
    relatedSlugs: ["mensuration-3d", "circles", "triangles"],
  },
  "mensuration-3d": {
    slug: "mensuration-3d",
    trigger: "Volume or surface area of a solid, melting one solid into others, or water rising in a vessel.",
    story: [
      "171 questions, falling from 8.1 a paper in 2016-2020 to 6.7 in 2024-2026. Eight of its ten subtopics are under 20% HARD: it is a formula chapter with one expensive page.",
      "Solids inside solids (15 questions, 53% HARD) — the largest cone in a cube, the sphere inside a cylinder — is the pool. Scaling (32%) asks how volume changes when every length changes; the answer is the cube of the length factor.",
    ],
    subSkills: [
      { name: "Cuboids and cubes", description: "Volume, surface area and the space diagonal √(l² + b² + h²)." },
      { name: "Cylinders, cones and spheres", description: "Curved and total surface areas; volumes πr²h, ⅓πr²h, ⁴⁄₃πr³." },
      { name: "Melting and recasting", description: "Volume is conserved; count pieces as total volume ÷ one piece." },
      { name: "Water displacement", description: "The rise in level × base area = volume immersed." },
      { name: "Scaling", description: "Lengths × k means areas × k² and volumes × k³." },
    ],
    traps: [
      { name: "Curved or total surface area", description: "A cylinder's total surface adds 2πr² to the curved 2πrh." },
      { name: "Hollow or solid hemisphere", description: "A solid hemisphere's surface is 3πr², not 2πr²." },
      { name: "Doubling the radius doubles the volume", description: "It multiplies it by 8 for a sphere and by 4 for a cylinder of the same height." },
    ],
    relatedSlugs: ["mensuration-2d", "ratio"],
  },
  triangles: {
    slug: "triangles",
    trigger: "A triangle with sides, angles, medians, altitudes or similar parts given.",
    story: [
      "151 questions, about seven a paper and steady. The altitude to the hypotenuse is 27 questions with no HARD at all — the single cheapest page in the geometry block.",
      "The expensive pages are small: triangle inequalities and the sine and cosine rules are about half HARD but hold only 16 questions between them; medians and Apollonius (43%) and the centres of a triangle (31%) cost more per question than the rest.",
    ],
    subSkills: [
      { name: "Angles and the exterior angle", description: "Angle sum 180°; an exterior angle equals the two opposite interior angles." },
      { name: "Pythagoras and its converse", description: "Test a² + b² against c² to classify a triangle as acute, right or obtuse." },
      { name: "The altitude to the hypotenuse", description: "h² = pq and h = ab/c for the altitude on the hypotenuse." },
      { name: "Similarity and areas", description: "Areas of similar triangles are in the ratio of the squares of their sides." },
      { name: "Medians and centres", description: "Apollonius: AB² + AC² = 2(AD² + BD²); the centroid divides a median 2 : 1." },
    ],
    traps: [
      { name: "Area ratio as side ratio", description: "Similar triangles with sides 2 : 3 have areas 4 : 9." },
      { name: "Triangle inequality at equality", description: "Sides 3, 4, 7 make no triangle — the sum must EXCEED the third side." },
      { name: "Centroid and circumcentre", description: "Only in an equilateral triangle do the centres coincide." },
    ],
    relatedSlugs: ["circles", "quadrilaterals", "mensuration-2d"],
  },
  statistics: {
    slug: "statistics",
    trigger: "A table of data, a frequency distribution, or a question about mean, median or mode.",
    story: [
      "80 questions and rising: 3.8 a paper in 2016-2020, 5.0 in 2024-2026. At 8% HARD it is the cheapest chapter of any size in the bank, and four of its six subtopics have never set a HARD question.",
      "The HARD it has is in grouped data: the median and mode formulas for class intervals. The rest is reading a table correctly and knowing which average suits which data.",
    ],
    subSkills: [
      { name: "Presenting data", description: "Scales of measurement, and which chart suits which data." },
      { name: "Frequency tables", description: "Cumulative frequency and class marks." },
      { name: "Mean and its properties", description: "Adding c to every value adds c to the mean; deviations from the mean sum to zero." },
      { name: "Median and mode", description: "Ungrouped: the middle value; grouped: l + ((n/2 − cf)/f) × h." },
    ],
    traps: [
      { name: "Median of an even count", description: "The average of the two middle values, after sorting." },
      { name: "Class width", description: "Use the true width of the class, not the difference of the printed limits of a discontinuous table." },
    ],
    relatedSlugs: ["averages", "data-interpretation"],
  },
  ratio: {
    slug: "ratio",
    trigger: "Quantities shared in a ratio, incomes and savings, variation, partnership or mixing two things.",
    story: [
      "76 questions, about 3.6 a paper, at 9% HARD. Ratio and proportion and direct and inverse variation have never set a HARD question; partnership and mixtures carry what little there is.",
      "Almost every question falls to one move: write each quantity as a multiple of one unknown k.",
    ],
    subSkills: [
      { name: "Sharing in a ratio", description: "A sum in the ratio a : b : c gives shares a/(a+b+c) of the total." },
      { name: "Ratios in stories", description: "Incomes, expenditures and savings, or ages before and after." },
      { name: "Equal ratios", description: "If a/b = c/d = k, write a = bk, c = dk." },
      { name: "Variation", description: "x varies as y: x = ky; inversely: xy = k." },
      { name: "Alligation", description: "Two mixtures at prices a and b make price m in the ratio (b − m) : (m − a)." },
    ],
    traps: [
      { name: "Ratio after a change", description: "Adding the same number to both terms changes the ratio." },
      { name: "Partnership by time", description: "Profit is shared in the ratio of capital × time, not capital alone." },
    ],
    relatedSlugs: ["percentage", "averages", "tsd"],
  },
  tsd: {
    slug: "tsd",
    trigger: "Speeds, times and distances: trains, boats, races, clocks or two people moving.",
    story: [
      "75 questions, about 3.5 a paper, at 13% HARD. Average speed and speed-time ratios are the largest page (22 questions at 5% HARD); boats and streams has never set a HARD question.",
      "Two ideas carry the chapter: total distance over total time, and relative speed as a sum (towards each other) or a difference (same direction).",
    ],
    subSkills: [
      { name: "Average speed", description: "Total distance ÷ total time; equal distances at u and v give 2uv/(u + v)." },
      { name: "Relative speed", description: "Add speeds for approaching objects, subtract for the same direction." },
      { name: "Trains", description: "A train passing an object covers its own length plus the object's." },
      { name: "Boats and streams", description: "Boat = (down + up)/2, stream = (down − up)/2." },
      { name: "Clocks", description: "The hands separate at 5.5° a minute." },
    ],
    traps: [
      { name: "Average of the speeds", description: "(u + v)/2 is wrong when equal DISTANCES are covered." },
      { name: "Unit conversion", description: "km/h to m/s is × 5/18." },
    ],
    relatedSlugs: ["time-work", "ratio"],
  },
  percentage: {
    slug: "percentage",
    trigger: "A percentage, a profit or loss, a discount, or two changes one after another.",
    story: [
      "50 questions, about 2.4 a paper, and only three HARD questions in the chapter. The one way to lose marks here is taking a percentage of the wrong base.",
    ],
    subSkills: [
      { name: "Percentage of a base", description: "x% more than y is y(1 + x/100); y is then less than x by x/(100 + x) × 100%." },
      { name: "Successive change", description: "Changes of a% and b% combine to a + b + ab/100." },
      { name: "Profit and loss", description: "On cost price; selling price = CP × (1 + p/100)." },
      { name: "Discount", description: "On marked price; successive discounts multiply." },
    ],
    traps: [
      { name: "The wrong base", description: "A 20% rise followed by a 20% fall is a 4% fall, not zero." },
      { name: "Profit on selling price", description: "Profit % is on cost unless the question says otherwise." },
    ],
    relatedSlugs: ["ratio", "interest", "averages"],
  },
  "data-interpretation": {
    slug: "data-interpretation",
    trigger: "A table, pie chart, bar graph or paragraph of data with several questions on it.",
    story: [
      "52 questions, falling from 2.6 to 1.7 a paper, and only one HARD question in the whole chapter. Every question is arithmetic on data you are given.",
      "Questions come in sets on one table or chart, so reading it carefully once pays for several answers.",
    ],
    subSkills: [
      { name: "Tables", description: "Percentages and changes between rows or columns." },
      { name: "Pie charts", description: "Angle ÷ 360 is the share; compare charts only through actual counts." },
      { name: "Bar and line graphs", description: "Read values, then compare year on year." },
      { name: "Caselets", description: "Build the table from the paragraph first." },
    ],
    traps: [
      { name: "Comparing shares across charts", description: "25% of one total and 25% of another are different counts." },
      { name: "Percentage change base", description: "Change is measured against the earlier value." },
    ],
    relatedSlugs: ["statistics", "percentage"],
  },
  averages: {
    slug: "averages",
    trigger: "A mean, a change in mean when someone joins or leaves, or groups combined.",
    story: [
      "47 questions, about two a paper, at 9% HARD. Every question reduces to the total: mean × count.",
    ],
    subSkills: [
      { name: "Sum and mean", description: "Total = mean × count; work with totals, not means." },
      { name: "Weighted averages", description: "Combined mean = Σ nᵢ x̄ᵢ ÷ Σ nᵢ." },
      { name: "Consecutive numbers", description: "The mean of an arithmetic run is its middle term." },
    ],
    traps: [
      { name: "Average of averages", description: "Two class means are combined by class sizes, not averaged directly." },
    ],
    relatedSlugs: ["statistics", "ratio"],
  },
  "time-work": {
    slug: "time-work",
    trigger: "People or pipes finishing a job alone and together.",
    story: [
      "46 questions, falling from 2.7 a paper in 2016-2020 to 1.3 in 2024-2026, at 7% HARD. Man-days and mixed gangs have never set a HARD question.",
      "Work in rates (1/n of the job a day) or in man-days — never add days directly.",
    ],
    subSkills: [
      { name: "Work rates", description: "Rates add: together A and B finish in ab/(a + b) days." },
      { name: "Man-days", description: "Men × days (× hours) is constant for one job." },
      { name: "Mixed gangs", description: "Convert women or boys to men-equivalents first." },
      { name: "Pipes", description: "A filling pipe is a positive rate, a leak negative." },
    ],
    traps: [
      { name: "Adding days", description: "A in 4 days and B in 6 days finish together in 2.4 days, not 5." },
    ],
    relatedSlugs: ["tsd", "ratio"],
  },
  interest: {
    slug: "interest",
    trigger: "Money lent or borrowed over time, simple or compound.",
    story: [
      "34 questions, about two a paper on recent papers, at 15% HARD. Simple interest is nearly free; compound interest carries most of the HARD, usually through the difference between the two.",
    ],
    subSkills: [
      { name: "Simple interest", description: "SI = PRT/100." },
      { name: "Compound interest", description: "A = P(1 + r/100)ⁿ; half-yearly halves the rate and doubles n." },
      { name: "CI − SI", description: "For two years the difference is P(r/100)²." },
    ],
    traps: [
      { name: "Amount or interest", description: "Options include both A and A − P." },
    ],
    relatedSlugs: ["percentage"],
  },
};
