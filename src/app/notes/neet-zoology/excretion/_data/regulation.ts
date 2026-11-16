import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EX_REGULATION_NOTE: SubtopicNote = {
  subtopicName: "Regulation of Kidney Function",
  title: "Regulation of Kidney Function",
  oneLineDefinition:
    "How ADH, the juxta glomerular apparatus with the renin-angiotensin mechanism, and ANF from the heart control water loss, blood pressure and GFR.",
  whyItMatters:
    "Four questions from 2023 to 2026, two of them in NEET 2026: the renin-angiotensin events in order, and where the JGA forms. NEET 2023 and Re-NEET 2024 asked what ADH and ANF do.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoex-adh",
      name: "ADH and the osmoreceptors",
      intuition:
        "When you sweat a lot or drink little, sensors in the body notice the fluid loss. They make the brain send out a hormone that tells the kidney to hold on to water, so you pass less urine. When you drink plenty, the sensors switch off and the hormone stops.",
      definition:
        "Kidney function is controlled by **hormonal feedback** involving the **hypothalamus**, the **JGA** and, to a certain extent, the **heart**.\n\n" +
        "**Osmoreceptors** are activated by changes in **blood volume, body fluid volume and ionic concentration**.\n" +
        "- An **excessive loss of fluid** from the body **activates** these receptors. They stimulate the **hypothalamus** to release **antidiuretic hormone (ADH), or vasopressin, from the neurohypophysis**.\n" +
        "- ADH **facilitates water reabsorption from the latter parts of the tubule**, so it **prevents diuresis**.\n" +
        "- An **increase in body fluid volume** **switches off** the osmoreceptors and suppresses ADH release, completing the feedback.\n" +
        "- ADH also has a **constrictory effect on blood vessels**. This **raises blood pressure**, which can raise the glomerular blood flow and so the **GFR**.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          { cells: ["Trigger", "Excessive loss of body fluid activates the osmoreceptors"] },
          { cells: ["Release", "The hypothalamus has ADH (vasopressin) released from the neurohypophysis"] },
          { cells: ["Effect on the tubule", "More water reabsorbed from the latter parts of the tubule; diuresis prevented"] },
          { cells: ["Effect on blood vessels", "Constriction, so blood pressure rises and GFR can rise"] },
          { cells: ["Switching off", "A rise in body fluid volume switches off the osmoreceptors; ADH release is suppressed"] },
        ],
      },
      pyqExampleId: "23ddef42-1f6a-4a19-8c4d-8b280c985d98",
      selfCheckExample: {
        prompt: "A student drinks two litres of water quickly. What happens to the osmoreceptors and to ADH release?",
        steps: [
          "The body fluid volume rises.",
          "A rise in body fluid volume switches off the osmoreceptors, so ADH release is suppressed and more urine is passed.",
        ],
        answer: "The osmoreceptors are switched off and ADH release is suppressed.",
      },
      practiceSet: [
        { prompt: "What is the other name of the antidiuretic hormone?", answer: "Vasopressin" },
        { prompt: "Which three changes activate the osmoreceptors?", answer: "Changes in blood volume, body fluid volume and ionic concentration" },
        { prompt: "How does ADH raise blood pressure?", answer: "By its constrictory effect on blood vessels" },
        { prompt: "Which three parts of the body take part in the hormonal regulation of kidney function?", answer: "The hypothalamus, the JGA and, to a certain extent, the heart" },
      ],
      traps: [
        {
          title: "Fluid loss switches the osmoreceptors on",
          body: "An **excessive loss** of body fluid **activates** the osmoreceptors. It is a **rise** in body fluid volume that **switches them off**.",
        },
        {
          title: "ADH comes from the neurohypophysis",
          body: "ADH (vasopressin) is released from the **neurohypophysis**, the posterior pituitary, on a signal from the **hypothalamus**. It is not an adenohypophysis hormone.",
        },
        {
          title: "ADH can raise GFR",
          body: "By constricting blood vessels ADH **raises blood pressure**, which can **increase** glomerular blood flow and **GFR**. A statement that ADH lowers GFR is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-raas",
      name: "The JGA and the renin-angiotensin mechanism",
      intuition:
        "The JGA is a pressure sensor where the tubule touches its own incoming arteriole. If filtration falls, it releases an enzyme that starts a chain: a hormone that squeezes blood vessels, then another that makes the tubule keep salt and water. Pressure and filtration climb back up.",
      definition:
        "The **juxta glomerular apparatus (JGA)** is a special sensitive region formed by cellular modifications in the **distal convoluted tubule and the afferent arteriole** at the place where they touch.\n\n" +
        "The renin-angiotensin mechanism, in order:\n" +
        "- A **fall** in glomerular blood flow, glomerular blood pressure or **GFR** activates the **JG cells** to release **renin**.\n" +
        "- Renin converts **angiotensinogen** in the blood to **angiotensin I** and further to **angiotensin II**.\n" +
        "- **Angiotensin II**, a **powerful vasoconstrictor**, raises the glomerular blood pressure and so the GFR.\n" +
        "- Angiotensin II also activates the **adrenal cortex** to release **aldosterone**.\n" +
        "- **Aldosterone** causes **reabsorption of Na⁺ and water from the distal parts of the tubule**.\n" +
        "- This also leads to an **increase in blood pressure and GFR**.",
      table: {
        columns: ["Order", "Event"],
        rows: [
          { cells: ["1", "GFR (or glomerular blood flow or pressure) falls and activates the JG cells"] },
          { cells: ["2", "Renin converts angiotensinogen to angiotensin I, then angiotensin II"] },
          { cells: ["3", "Angiotensin II constricts vessels and makes the adrenal cortex release aldosterone"] },
          { cells: ["4", "Aldosterone causes reabsorption of Na⁺ and water from the distal parts of the tubule"] },
          { cells: ["5", "Blood pressure and GFR rise"] },
          {
            cells: ["Where the JGA forms", "Distal convoluted tubule and afferent arteriole, where they touch"],
            noteAmber: "NEET 2026: the JGA is formed by the DCT and the afferent arteriole of the same nephron; PCT and efferent arteriole were the wrong options.",
            pyqExampleId: "365f2986-5508-4f4c-b2b5-4bb8df619a04",
          },
        ],
      },
      pyqExampleId: "961386c8-26ec-4c85-b7eb-7e57b4fce0e5",
      selfCheckExample: {
        prompt: "In the renin-angiotensin mechanism, which gland releases aldosterone, and on which part of the tubule does aldosterone act?",
        steps: [
          "Angiotensin II activates the adrenal cortex to release aldosterone.",
          "Aldosterone causes reabsorption of Na⁺ and water from the distal parts of the tubule.",
        ],
        answer: "The adrenal cortex; the distal parts of the tubule.",
      },
      practiceSet: [
        { prompt: "Which cells release renin?", answer: "The JG cells of the juxta glomerular apparatus" },
        { prompt: "On which blood protein does renin act?", answer: "Angiotensinogen" },
        { prompt: "Which form of angiotensin is the powerful vasoconstrictor?", answer: "Angiotensin II" },
        { prompt: "What change activates the JG cells to release renin?", answer: "A fall in glomerular blood flow, glomerular blood pressure or GFR" },
      ],
      traps: [
        {
          title: "Aldosterone is from the adrenal cortex",
          body: "Angiotensin II makes the **adrenal cortex** release aldosterone. The adrenal medulla is not part of this mechanism.",
        },
        {
          title: "Renin is not the vasoconstrictor",
          body: "**Renin** converts angiotensinogen to angiotensin I. The **powerful vasoconstrictor** is **angiotensin II**.",
        },
        {
          title: "The JGA joins the DCT and the afferent arteriole",
          body: "The JGA forms where the **distal convoluted tubule** touches the **afferent arteriole**. Not the PCT, and not the efferent arteriole.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-anf",
      name: "ANF and the hormones compared",
      intuition:
        "The renin-angiotensin chain pushes blood pressure up. Something must stop it overshooting. When extra blood stretches the upper chambers of the heart, the heart itself releases a hormone that widens blood vessels and brings the pressure down.",
      definition:
        "An **increase in blood flow to the atria** of the heart can cause the release of **Atrial Natriuretic Factor (ANF)**.\n" +
        "- ANF causes **vasodilation** (dilation of blood vessels) and so **decreases blood pressure**.\n" +
        "- So the ANF mechanism acts as a **check on the renin-angiotensin mechanism**.\n\n" +
        "Learn the four controllers side by side: where each comes from and which way it moves blood pressure.",
      table: {
        columns: ["Hormone", "Source", "Effect"],
        rows: [
          { cells: ["ADH (vasopressin)", "Neurohypophysis, on a signal from the hypothalamus", "Water reabsorbed from the latter parts of the tubule; vessels constrict, blood pressure rises"] },
          { cells: ["Renin", "JG cells of the JGA", "Starts angiotensin I and II formation, so glomerular blood pressure and GFR rise"] },
          { cells: ["Aldosterone", "Adrenal cortex", "Na⁺ and water reabsorbed from the distal parts of the tubule; blood pressure and GFR rise"] },
          { cells: ["ANF", "Atria of the heart, when blood flow to them rises", "Vasodilation, so blood pressure falls; a check on renin-angiotensin"] },
        ],
      },
      pyqExampleId: "f08555ae-c543-4de4-a96d-311e378be701",
      selfCheckExample: {
        prompt: "Angiotensin II pushes blood pressure up. Which hormone acts as a check on the renin-angiotensin mechanism, and where does it come from?",
        steps: [
          "An increase in blood flow to the atria of the heart releases Atrial Natriuretic Factor (ANF).",
          "ANF dilates blood vessels and lowers blood pressure, so it checks the renin-angiotensin mechanism.",
        ],
        answer: "ANF, from the atria of the heart.",
      },
      practiceSet: [
        { prompt: "Does aldosterone raise or lower blood pressure?", answer: "It raises blood pressure, and GFR with it" },
        { prompt: "What does ANF do to blood pressure?", answer: "It decreases blood pressure" },
        { prompt: "What is the full name of ANF?", answer: "Atrial Natriuretic Factor" },
        { prompt: "Which hormone causes reabsorption of Na⁺ and water from the distal parts of the tubule?", answer: "Aldosterone" },
      ],
      traps: [
        {
          title: "ANF dilates, it does not constrict",
          body: "**ANF** causes **vasodilation** and **lowers** blood pressure. Constriction is the work of **angiotensin II** and **ADH**.",
        },
        {
          title: "ANF opposes renin-angiotensin",
          body: "ANF is a **check on** the renin-angiotensin mechanism. It does not help it raise blood pressure or GFR.",
        },
      ],
    },
  ],
};
