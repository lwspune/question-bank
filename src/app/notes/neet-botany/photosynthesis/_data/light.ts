import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PS_LIGHT_NOTE: SubtopicNote = {
  subtopicName: "Pigments and Light Reaction",
  title: "Pigments and Light Reaction",
  oneLineDefinition:
    "The early experiments on photosynthesis, the leaf pigments and the two photosystems, how electrons flow in the light reaction to make ATP, NADPH and oxygen, and how chemiosmosis makes ATP.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, at least one every year. The reaction centres were asked twice (NEET 2023 and Re-NEET 2026), chemiosmosis twice (NEET 2022 and 2023), and the needs and products of the light reaction twice (both in Re-NEET 2024). Most of them test one NCERT line, so learn the exact words.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbops-history",
      name: "Early experiments and where photosynthesis happens",
      intuition:
        "People worked out photosynthesis one step at a time. First they found that plants change the air, then that light and green parts are needed, then that plants make glucose, and then which colours of light work best. Learn the scientists in this order, with the one thing each showed.",
      definition:
        "What the experiments and the leaf tell us:\n" +
        "- **Half-leaf experiment**: part of a leaf is enclosed in a test tube with cotton soaked in **KOH**, which absorbs CO₂. After light, the starch test shows starch in the **exposed** half only. So **CO₂ is needed** for photosynthesis.\n" +
        "- By the middle of the 19th century the equation was known: CO₂ + H₂O, in light, gives [CH₂O] + O₂.\n" +
        "- The overall equation from van Niel's idea: **6CO₂ + 12H₂O gives C₆H₁₂O₆ + 6H₂O + 6O₂**. Water is **oxidised** and CO₂ is **reduced**.\n" +
        "- **Where**: in the green leaf, inside the **chloroplasts** of the **mesophyll cells**. The chloroplast has **grana**, **stroma lamellae** and the fluid **stroma**. The membranes trap light and make ATP and NADPH; the stroma holds the enzymes that make sugar.",
      table: {
        columns: ["Scientist", "Experiment", "What it showed"],
        rows: [
          { cells: ["Joseph Priestley (1770)", "A candle and a mouse under a bell jar, with and without a mint plant", "Plants restore to the air what breathing animals and burning candles remove. He discovered oxygen in 1774."] },
          { cells: ["Jan Ingenhousz", "The same set-up in sunlight and in the dark; bubbles round an aquatic plant in bright light", "Sunlight is essential, and only the green parts of a plant release oxygen"] },
          { cells: ["Julius von Sachs (1854)", "Studied the green parts of plants", "Green parts make glucose, usually stored as starch; chlorophyll sits in special bodies, later called chloroplasts"] },
          { cells: ["T. W. Engelmann", "Split light with a prism onto the green alga *Cladophora* placed with aerobic bacteria; the bacteria gathered in blue and red light", "The first action spectrum of photosynthesis. It roughly matches the absorption spectra of chlorophyll a and b."] },
          { cells: ["Cornelius van Niel", "Studied purple and green bacteria", "Hydrogen from an oxidisable compound reduces CO₂; the O₂ released comes from H₂O, not from CO₂"] },
        ],
        caption: "Re-NEET 2026 asked for the order: role of air (Priestley), release of oxygen (Ingenhousz), production of glucose (Sachs), absorption spectra of chlorophyll a and b (Engelmann).",
      },
      pyqExampleId: "9f12c679-4a1c-4c2f-9521-ad6e952f8309",
      selfCheckExample: {
        prompt: "One half of a leaf is shut in a test tube with cotton soaked in KOH; the other half stays in open air. The plant is kept in light and both halves are tested with iodine. Which half shows starch, and what does this prove?",
        steps: [
          "KOH absorbs CO₂, so the enclosed half gets no CO₂.",
          "Only the exposed half can photosynthesise and make starch.",
        ],
        answer: "The exposed half shows starch. It proves that CO₂ is needed for photosynthesis.",
      },
      practiceSet: [
        { prompt: "Which green alga did Engelmann use to work out the first action spectrum of photosynthesis?", answer: "*Cladophora*" },
        { prompt: "Who showed that only the green parts of a plant release oxygen?", answer: "Jan Ingenhousz" },
        { prompt: "Which scientist discovered oxygen, in 1774?", answer: "Joseph Priestley" },
        { prompt: "Working with purple and green bacteria, who concluded that the oxygen released in photosynthesis comes from water?", answer: "Cornelius van Niel" },
        { prompt: "In which two colours of light did the bacteria gather most in Engelmann's experiment?", answer: "Blue and red" },
        { prompt: "In which cells of a green leaf does most photosynthesis take place?", answer: "Mesophyll cells (in their chloroplasts)" },
      ],
      traps: [
        {
          title: "Engelmann drew an action spectrum, not an absorption spectrum",
          body: "Engelmann gave the first **action spectrum** of photosynthesis. It only **resembles** the absorption spectra of chlorophyll a and b. Showing that only green parts release oxygen was **Ingenhousz**, not Engelmann.",
        },
        {
          title: "The oxygen comes from water",
          body: "Van Niel showed that the O₂ released comes from **H₂O**, not from CO₂. Water is oxidised; CO₂ is reduced to sugar.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbops-pigments",
      name: "Pigments and photosystems",
      intuition:
        "A green leaf is not green from one pigment. Paper chromatography splits its colour into four pigments. Chlorophyll a does the main job; the other three help by catching more colours of light. In the thylakoid the pigments sit in two groups, the photosystems, and at the heart of each is one special chlorophyll a molecule.",
      definition:
        "What NCERT says about pigments and photosystems:\n" +
        "- **Chlorophyll a** is the **chief pigment**. It absorbs most in the **blue and red** regions, and the rate of photosynthesis is also highest there.\n" +
        "- **Accessory pigments** (chlorophyll b, xanthophylls, carotenoids) absorb light and pass the energy to chlorophyll a. They let a wider range of light be used and **protect chlorophyll a from photo-oxidation**.\n" +
        "- The pigments form two **light harvesting complexes (LHC)**, in **photosystem I (PS I)** and **photosystem II (PS II)**. These are named in the order they were **discovered**, not the order in which they work.\n" +
        "- Each LHC has **hundreds of pigment molecules bound to proteins**. Every pigment in it except **one molecule of chlorophyll a** gathers light; that one molecule is the **reaction centre**.",
      table: {
        columns: ["Pigment or part", "Colour or feature", "Role"],
        rows: [
          { cells: ["Chlorophyll a", "Bright or blue-green", "Chief pigment; forms the reaction centre of both photosystems"] },
          { cells: ["Chlorophyll b", "Yellow-green", "Accessory pigment"] },
          { cells: ["Xanthophylls", "Yellow", "Accessory pigment"] },
          { cells: ["Carotenoids", "Yellow to yellow-orange", "Accessory pigment"] },
          { cells: ["Light harvesting complex", "Hundreds of pigment molecules bound to proteins", "Gathers light and passes its energy to the reaction centre"] },
          {
            cells: ["PS I reaction centre", "Chlorophyll a with its absorption peak at 700 nm (P700)", "Its excited electrons pass on towards NADP⁺"],
            noteAmber: "Re-NEET 2026: the pigment of P700 is chlorophyll a.",
            pyqExampleId: "123ec201-bcdb-43df-8a2c-36cfb55eedaf",
          },
          {
            cells: ["PS II reaction centre", "Chlorophyll a with its absorption maxima at 680 nm (P680)", "Its excited electrons pass down to PS I"],
            noteAmber: "NEET 2023: the PS II reaction centre absorbs most at 680 nm.",
            pyqExampleId: "202197ea-6f48-4ca5-a67b-1ef29e1b63a4",
          },
        ],
      },
      pyqExampleId: "9cabd28a-4fda-4828-ba97-a1c002c13469",
      selfCheckExample: {
        prompt: "A plant had no accessory pigments, only chlorophyll a. Name two ways its photosynthesis would suffer.",
        steps: [
          "Accessory pigments catch light that chlorophyll a misses and pass the energy on.",
          "They also shield chlorophyll a from photo-oxidation.",
        ],
        answer: "It could use a narrower range of light, and its chlorophyll a would be less protected from photo-oxidation.",
      },
      practiceSet: [
        { prompt: "Which pigment is the chief pigment of photosynthesis?", answer: "Chlorophyll a" },
        { prompt: "In which two regions of the spectrum does chlorophyll a absorb most?", answer: "Blue and red" },
        { prompt: "How many molecules of chlorophyll a form the reaction centre of one photosystem?", answer: "One" },
        { prompt: "Are PS I and PS II named in the order they work or the order they were discovered?", answer: "The order they were discovered" },
        { prompt: "Name the three accessory pigments NCERT lists.", answer: "Chlorophyll b, xanthophylls and carotenoids" },
      ],
      traps: [
        {
          title: "Blue-green is chlorophyll a, yellow-green is chlorophyll b",
          body: "On the chromatogram **chlorophyll a** is bright or **blue-green** and **chlorophyll b** is **yellow-green**. Xanthophylls are yellow; carotenoids are yellow to yellow-orange.",
        },
        {
          title: "P700 is PS I, P680 is PS II",
          body: "The **PS I** reaction centre peaks at **700 nm**; the **PS II** reaction centre at **680 nm**. Both are **chlorophyll a**, never chlorophyll b or a carotenoid.",
        },
        {
          title: "PS I does not work first",
          body: "The numbers give the order of **discovery**. In the light reaction electrons go through **PS II first**, then PS I.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbops-light-reaction",
      name: "Electron flow and photophosphorylation",
      intuition:
        "Light knocks electrons out of the reaction centres. In the usual route the electrons go from water to PS II, down a chain of carriers to PS I, and on to NADP⁺. On the way ATP is made. This straight route is non-cyclic. When only PS I works, its electrons come back to it in a loop, and only ATP is made. That loop is cyclic.",
      definition:
        "The light reaction, as NCERT gives it:\n" +
        "- It covers **light absorption, splitting of water, release of oxygen and formation of ATP and NADPH**.\n" +
        "- **PS II** absorbs 680 nm light; its excited electrons go to an acceptor and then down an **electron transport system of cytochromes** to **PS I**. PS I, excited by 700 nm light, passes electrons to another acceptor and then to **NADP⁺**, which becomes **NADPH + H⁺**. Drawn out, this is the **Z scheme**.\n" +
        "- **Splitting of water**: the water-splitting complex is linked to **PS II**, on the **inner side** of the thylakoid membrane. **2H₂O gives 4H⁺ + O₂ + 4e⁻**. Its electrons replace those lost by PS II.\n" +
        "- **Photophosphorylation** is making ATP from ADP and inorganic phosphate in the presence of light.",
      table: {
        columns: ["Point", "Non-cyclic photophosphorylation", "Cyclic photophosphorylation"],
        rows: [
          { cells: ["Photosystems", "PS II and PS I, working in series", "PS I only"] },
          { cells: ["Path of electrons", "Water, PS II, cytochromes, PS I, NADP⁺", "Out of PS I and back to PS I through the electron transport system"] },
          {
            cells: ["What it needs", "Light, water and chlorophyll", "Light on PS I; it also runs when only light beyond 680 nm is available"],
            noteAmber: "Re-NEET 2024: the light reaction needs water, chlorophyll and light, not CO₂ or O₂.",
            pyqExampleId: "d3a41066-ae7b-4de9-854f-b69ed475604c",
          },
          {
            cells: ["Products", "ATP, NADPH + H⁺ and O₂", "ATP only"],
            noteAmber: "Re-NEET 2024: of ATP, NADPH and O₂, only O₂ diffuses out of the chloroplast.",
            pyqExampleId: "f6e90bbb-7a17-41aa-ac64-81f0f1457d04",
          },
          { cells: ["Where", "Grana lamellae, which have both PS I and PS II", "Stroma lamellae, which have PS I but lack PS II and NADP reductase"] },
        ],
      },
      pyqExampleId: "183dc234-9cc9-4100-bb35-948a39abf1b2",
      selfCheckExample: {
        prompt: "Only light of wavelength longer than 680 nm falls on a leaf. Which kind of photophosphorylation can still run, and what does it make?",
        steps: [
          "PS II needs 680 nm light, so it stops; non-cyclic flow needs PS II.",
          "PS I alone can still cycle its electrons.",
        ],
        answer: "Cyclic photophosphorylation; it makes ATP only, with no NADPH and no O₂.",
      },
      practiceSet: [
        { prompt: "In the Z scheme, which photosystem passes its electrons on to NADP⁺?", answer: "PS I" },
        { prompt: "What carries electrons from PS II down to PS I?", answer: "An electron transport system of cytochromes" },
        { prompt: "With which photosystem is the water-splitting complex linked?", answer: "PS II" },
        { prompt: "Write the reaction for the splitting of water in the light reaction.", answer: "2H₂O gives 4H⁺ + O₂ + 4e⁻" },
        { prompt: "What is photophosphorylation?", answer: "Making ATP from ADP and inorganic phosphate in the presence of light" },
      ],
      traps: [
        {
          title: "Cyclic flow uses PS I alone",
          body: "**Cyclic** photophosphorylation uses **PS I only** and makes **ATP only**. Both photosystems work only in the **non-cyclic** route, which makes ATP and NADPH + H⁺.",
        },
        {
          title: "Water splitting belongs to PS II",
          body: "The water-splitting complex is linked to **PS II**, on the **inner side** of the thylakoid membrane. It is not part of PS I.",
        },
        {
          title: "CO₂ is not needed for the light reaction",
          body: "The light reaction needs **light, water and chlorophyll**. **CO₂** is used later, in the Calvin cycle. **O₂** is a **product** of the light reaction, not a need.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbops-chemiosmosis",
      name: "Chemiosmosis and ATP synthase",
      intuition:
        "The light reaction piles up protons (H⁺) inside the thylakoid, in the lumen. Like water behind a dam, they push to get out. Their only way back to the stroma is a channel in ATP synthase, and the flow through it makes ATP. This is the chemiosmotic way of making ATP.",
      definition:
        "Chemiosmosis, as NCERT explains it:\n" +
        "- It needs four things: a **membrane**, a **proton pump**, a **proton gradient** and **ATP synthase**.\n" +
        "- Three things make the gradient: water splitting puts protons into the **lumen**; electron carriers move protons from the **stroma** into the lumen; and **NADP reductase**, on the **stroma side**, uses up protons of the stroma to make NADPH + H⁺.\n" +
        "- So protons fall in the stroma and pile up in the lumen, and the **pH of the lumen drops**.\n" +
        "- **ATP synthase** has two parts. **CF₀** is embedded in the thylakoid membrane and forms a channel for the **facilitated diffusion** of protons. **CF₁** sticks out on the outer surface, facing the stroma.\n" +
        "- When the gradient breaks down, protons flow through CF₀ to the stroma. The energy changes the shape of **CF₁**, and ATP is made.",
      table: {
        columns: ["Step", "What happens", "Effect on protons"],
        rows: [
          { cells: ["Splitting of water", "Happens on the inner side of the membrane", "Protons are added to the lumen"] },
          { cells: ["Electron transport", "A hydrogen carrier takes a proton from the stroma while carrying an electron, and releases it on the inner side", "Protons are moved from the stroma into the lumen"] },
          { cells: ["NADP reductase", "Sits on the stroma side; reduces NADP⁺ to NADPH + H⁺", "Protons are removed from the stroma"] },
          {
            cells: ["Flow through CF₀", "Protons diffuse back through the channel of ATP synthase", "The proton gradient breaks down and releases energy"],
            noteAmber: "NEET 2022: the energy comes from the breakdown of a proton gradient, never an electron gradient.",
            pyqExampleId: "80960206-b9cc-407a-aa18-e452b812f9e9",
          },
          { cells: ["Change in CF₁", "CF₁, facing the stroma, changes shape and makes ATP", "ATP is made in the stroma"] },
        ],
      },
      pyqExampleId: "f49a2437-2bd0-46b2-b682-a9474561e28c",
      selfCheckExample: {
        prompt: "During the light reaction, in which part of the chloroplast do protons build up, and what happens to the pH there?",
        steps: [
          "Water splitting and the electron carriers both release protons on the inner side of the thylakoid membrane.",
          "More protons means a more acidic space.",
        ],
        answer: "In the lumen of the thylakoid; its pH falls.",
      },
      practiceSet: [
        { prompt: "Which part of ATP synthase sticks out into the stroma?", answer: "CF₁" },
        { prompt: "Which part of ATP synthase forms the channel for protons?", answer: "CF₀" },
        { prompt: "On which side of the thylakoid membrane is NADP reductase found?", answer: "The stroma side" },
        { prompt: "By what kind of movement do protons pass through CF₀?", answer: "Facilitated diffusion" },
      ],
      traps: [
        {
          title: "A proton gradient, not an electron gradient",
          body: "ATP is made when a **proton** gradient breaks down. Chemiosmosis needs **ATP synthase**; there is no NADP synthase in it.",
        },
        {
          title: "CF₀ is in the membrane, CF₁ faces the stroma",
          body: "**CF₀** is embedded in the membrane and forms the channel. **CF₁** sticks out towards the **stroma** and is where ATP is made.",
        },
        {
          title: "Protons are pumped in but flow out",
          body: "Protons are moved **into the lumen** to build the gradient. ATP is made as they flow **back out to the stroma** through ATP synthase.",
        },
      ],
    },
  ],
};
