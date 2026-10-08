import type { SubtopicNote } from "@/app/notes/_types";

const NA = "\\(\\mathrm{Na^+}\\)";
const K = "\\(\\mathrm{K^+}\\)";
const H = "\\(\\mathrm{H^+}\\)";
const CL = "\\(\\mathrm{Cl^-}\\)";

export const IMAT_BIO_HAP_KIDNEY_NOTE: SubtopicNote = {
  subtopicName: "Kidney and Excretion",
  title: "The Kidney, the Nephron and Water Balance",
  oneLineDefinition:
    "The kidney filters the blood under pressure, takes back everything useful, and adjusts how much water it keeps under the control of ADH.",
  whyItMatters:
    "The kidney appears in 2012, 2019, 2020 and twice in 2022: which parts of a nephron contain urea, which parts reabsorb water, what forces water out of the glomerulus, and how a change in ADH changes the urine.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-nephron",
      name: "The nephron: filtration, reabsorption and secretion",
      intuition:
        "The kidney works by throwing almost everything out and then taking back what it wants. High pressure squeezes a large volume of fluid out of the blood; the tubule then reclaims the glucose, salts and most of the water, and what is left becomes urine.",
      definition:
        "Each kidney has about a million **nephrons**. The outer **cortex** holds the glomeruli and the convoluted tubules; the inner **medulla** holds the loops of Henle and the collecting ducts. Urine flows to the renal pelvis, ureter, bladder and urethra.\n" +
        "- **Urea** is made in the **liver** from excess amino acids (deamination) and carried to the kidney in the blood.\n" +
        "- **Ultrafiltration**: the arteriole entering the glomerulus (afferent) is wider than the one leaving it (efferent), so the pressure is high. Small molecules pass into Bowman's capsule; blood cells and large proteins stay in the blood.\n" +
        "- About 180 L of filtrate is made per day but only about 1.5 L of urine, so about 99% of the water is reabsorbed.\n" +
        "- Urea is filtered freely, so it is present in **every part** of the nephron. Its concentration rises along the tubule as water is removed.\n" +
        "- Glucose in the urine means more glucose was filtered than the tubule could reabsorb, as in untreated diabetes.",
      table: {
        columns: ["Region", "What happens", "Water reabsorbed here?"],
        rows: [
          { cells: ["Glomerulus and Bowman's capsule", "Ultrafiltration: water, glucose, amino acids, ions and urea leave the blood", "No: this is filtration, not reabsorption"] },
          { cells: ["Proximal convoluted tubule", `Reabsorbs all glucose and amino acids and most ${NA}; cells have microvilli and many mitochondria`, "Yes, about two thirds of it"] },
          { cells: ["Descending limb of the loop of Henle", "Permeable to water, which leaves into the salty medulla", "Yes"] },
          { cells: ["Ascending limb of the loop of Henle", `Pumps out ${NA} and ${CL}, making the medulla salty; impermeable to water`, "No"] },
          { cells: ["Distal convoluted tubule", `Adjusts ${NA}, ${K} and ${H} (blood pH)`, "Some"] },
          { cells: ["Collecting duct", "Water leaves by osmosis into the salty medulla, controlled by ADH", "Yes, a variable amount"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which substance is normally present in the glomerular filtrate but absent from the urine of a healthy person?",
        options: ["Urea", "Glucose", "Red blood cells", "Plasma albumin", "Sodium ions"],
        steps: [
          "Glucose is small, so it is filtered, but all of it is reabsorbed in the proximal convoluted tubule.",
          "Urea and sodium ions are in both filtrate and urine (A, E). Red cells and albumin are too large to be filtered at all (C, D).",
        ],
        answer: "(B) Glucose",
      },
      practiceSet: [
        { prompt: "In which part of the nephron is all the glucose reabsorbed?", answer: "The proximal convoluted tubule" },
        { prompt: "Which arteriole brings blood into the glomerulus?", answer: "The afferent arteriole" },
        { prompt: "Which organ makes urea?", answer: "The liver" },
        { prompt: "Why is the ascending limb of the loop impermeable to water?", answer: "So the salt it pumps out makes the medulla concentrated without water following it" },
      ],
      traps: [
        {
          title: "Urea is in every part of the nephron",
          body: "Urea is filtered in the glomerulus and is never fully reabsorbed, so the fluid in every region, from the capsule to the collecting duct, contains it. An option naming a region with no urea is wrong.",
        },
        {
          title: "The glomerulus filters; it does not reabsorb",
          body: "Water leaves the blood in the glomerulus. Reabsorption of water happens in the tubules and the collecting duct, so the glomerulus is the one structure not involved in water reabsorption.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hap-filtration-pressure",
      name: "Net filtration pressure in the glomerulus",
      intuition:
        "Three pressures act across the glomerulus. Blood pressure pushes fluid out. The proteins left in the blood pull water back by osmosis, and the fluid already in the capsule pushes back. Filtration happens only while the push out is bigger than the two pushes back.",
      definition:
        "- **Glomerular blood pressure** comes from the contraction of the **left ventricle**, kept high because the efferent arteriole is narrow. It drives filtration.\n" +
        "- **Oncotic pressure**: plasma proteins cannot be filtered, so they stay in the blood and draw water back by osmosis. It opposes filtration.\n" +
        "- **Capsule pressure**: the fluid already in Bowman's capsule pushes back. It opposes filtration.\n" +
        "- If blood pressure falls sharply (for example after heavy bleeding), filtration can stop.",
      formula: {
        label: "Net filtration pressure",
        latex: "P_{\\text{net}} = P_G - (P_C + \\pi_G)",
        symbols: [
          { symbol: "\\(P_G\\)", meaning: "blood pressure in the glomerular capillaries, in mmHg" },
          { symbol: "\\(P_C\\)", meaning: "fluid pressure in Bowman's capsule, in mmHg" },
          { symbol: "\\(\\pi_G\\)", meaning: "oncotic pressure of the plasma proteins, in mmHg" },
        ],
      },
      authoredExample: {
        prompt:
          "In a glomerulus the capillary blood pressure is 55 mmHg, the capsule pressure is 15 mmHg and the oncotic pressure is 30 mmHg. Find the net filtration pressure. What happens if heavy bleeding lowers the capillary pressure to 45 mmHg?",
        steps: [
          "\\(P_{\\text{net}} = 55 - (15 + 30) = 10\\ \\text{mmHg}\\), outward, so filtration happens.",
          "After bleeding: \\(45 - (15 + 30) = 0\\ \\text{mmHg}\\).",
          "With no net push outward, filtration stops and no urine is made.",
        ],
        answer: "10 mmHg; then 0 mmHg, so filtration stops",
      },
      selfCheckExample: {
        prompt:
          "In another glomerulus the capillary blood pressure is 60 mmHg, the capsule pressure is 18 mmHg and the oncotic pressure of the plasma is 32 mmHg. What is the net filtration pressure?",
        options: ["10 mmHg", "74 mmHg", "46 mmHg", "42 mmHg", "110 mmHg"],
        steps: [
          "Both the capsule pressure and the oncotic pressure oppose filtration: \\(60 - (18 + 32) = 10\\ \\text{mmHg}\\).",
          "B treats the oncotic pressure as helping filtration. C treats the capsule pressure as helping. D ignores the oncotic pressure, and E adds all three.",
        ],
        answer: "(A) 10 mmHg",
      },
      practiceSet: [
        { prompt: "Capillary pressure 50 mmHg, capsule pressure 10 mmHg, oncotic pressure 28 mmHg. What is the net filtration pressure?", answer: "12 mmHg", method: "\\(50 - (10 + 28)\\)" },
        { prompt: "A kidney stone raises the capsule pressure from 15 to 25 mmHg, with 55 mmHg capillary and 30 mmHg oncotic pressure. What is the net pressure now?", answer: "0 mmHg, so filtration stops", method: "\\(55 - (25 + 30)\\)" },
        { prompt: "Narrowing the efferent arteriole: does it raise or lower filtration?", answer: "Raises it, because blood pressure in the glomerulus rises" },
      ],
      traps: [
        {
          title: "Blood proteins oppose filtration",
          body: "Plasma proteins stay in the blood and hold water there by osmosis. They pull water back into the capillaries, so they never help water move into the tubule. The only force pushing water out is the blood pressure from the heart.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-osmoregulation",
      name: "Osmoregulation: ADH, aldosterone and the concentration of urine",
      intuition:
        "When the blood gets too concentrated, the brain releases a hormone that makes the collecting ducts leaky to water. Water then flows out of the duct into the salty medulla and back into the blood, leaving a small volume of concentrated urine.",
      definition:
        "- **Osmoreceptors** in the **hypothalamus** detect the water content (water potential) of the blood.\n" +
        "- **ADH** (antidiuretic hormone, also called vasopressin) is **made in the hypothalamus** and **released into the blood from the posterior pituitary**.\n" +
        "- ADH makes the cells of the collecting duct (and the distal tubule) insert **aquaporins**, water channels, into their membranes, so more water is reabsorbed.\n" +
        "- Antidiuretic means less urine. More ADH: small volume of concentrated urine. Less ADH: large volume of dilute urine. The same amount of urea is then dissolved in more water, so its concentration falls.\n" +
        `- **Aldosterone**, from the adrenal cortex, makes the distal tubule and collecting duct reabsorb more ${NA} when blood volume or pressure is low; water follows.\n` +
        "- Alcohol reduces ADH release. A lack of ADH causes **diabetes insipidus**: large volumes of dilute urine.",
      table: {
        columns: ["Situation", "ADH release", "Collecting duct", "Urine"],
        rows: [
          { cells: ["Dehydration, sweating or a salty meal", "Increases", "More aquaporins, more water reabsorbed", "Small volume, concentrated"] },
          { cells: ["Drinking a lot of water", "Decreases", "Fewer aquaporins, less water reabsorbed", "Large volume, dilute"] },
          { cells: ["Alcohol, or a drug that blocks ADH release", "Decreases", "Less water reabsorbed", "Large volume; lower urea concentration"] },
          { cells: ["Damage to the posterior pituitary", "Little or none", "Almost no water reabsorbed there", "Very large volumes of dilute urine"] },
        ],
      },
      selfCheckExample: {
        prompt: "After a long run in the heat without drinking, which statement is correct?",
        options: [
          "Less ADH is released, and the urine is dilute",
          "The glomerulus reabsorbs more water",
          "ADH is released by the kidney",
          "Aldosterone makes the collecting duct impermeable to water",
          "More ADH is released, so the collecting ducts reabsorb more water",
        ],
        steps: [
          "Losing water in sweat makes the blood more concentrated. Osmoreceptors in the hypothalamus respond, the posterior pituitary releases more ADH, and the collecting ducts reabsorb more water.",
          "A is the response to drinking too much. The glomerulus filters and does not reabsorb (B). ADH comes from the pituitary, not the kidney (C). Aldosterone acts on sodium, not by blocking water (D).",
        ],
        answer: "(E) More ADH is released, so the collecting ducts reabsorb more water",
      },
      practiceSet: [
        { prompt: "Where is ADH made, and where is it released into the blood?", answer: "Made in the hypothalamus, released from the posterior pituitary" },
        { prompt: "Which water channels does ADH add to the collecting duct?", answer: "Aquaporins" },
        { prompt: "Which hormone increases sodium reabsorption in the kidney?", answer: "Aldosterone, from the adrenal cortex" },
      ],
      traps: [
        {
          title: "Less ADH means more urine but lower urea concentration",
          body: "If urea production is unchanged, less ADH leaves more water in the urine, so the same urea is more diluted and its concentration falls. The volume rises; the concentration does not.",
        },
      ],
    },
  ],
};
