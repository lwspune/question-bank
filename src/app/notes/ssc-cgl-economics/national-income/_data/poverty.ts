import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XNI_POVERTY_NOTE: SubtopicNote = {
  subtopicName: "Poverty, Unemployment and Human Development",
  title: "Poverty, Unemployment and Human Development",
  oneLineDefinition:
    "How India draws its poverty line and the Multidimensional Poverty Index, the kinds of unemployment with examples, and India's neighbours on the Human Development Index.",
  whyItMatters:
    "Twenty-two questions in the bank: 12 from the 2023 shifts, eight from the 2024 shifts and two from the 2025 shifts, and seven of them HARD, more than any other page in this chapter. The hard ones ask an exact figure (the poverty line, an MPI share), so learn the few numbers in the tables exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxnipo-poverty",
      name: "Poverty lines and the MPI",
      intuition:
        "India measures poverty two ways. The old way draws a line in rupees of monthly spending. The new way, the Multidimensional Poverty Index, counts what households lack: health, schooling and living standards.",
      definition:
        "Poverty lines:\n" +
        "- They are set by **monthly per capita (consumption) expenditure**.\n" +
        "- For **2011-12** (Tendulkar method): **Rs 816** a month in villages, **Rs 1,000** in towns.\n" +
        "- **Dadabhai Naoroji** first discussed a poverty line, before independence.\n\n" +
        "The **Multidimensional Poverty Index** (by **NITI Aayog**):\n" +
        "- The **first** (November **2021**): **Bihar** was the poorest State. Urban poverty was **8.81%**.\n" +
        "- The **2023** index: **Kerala** had the lowest share of poor people.\n\n" +
        "**Self-help groups** have done most to raise the economic status of poor rural women.",
      table: {
        columns: ["Measure", "Figure"],
        rows: [
          { cells: ["Poverty line 2011-12, rural", "Rs 816 a month"], pyqExampleId: "502ae38d-96bd-4cc6-85ca-acec4762c11a" },
          { cells: ["Poverty line 2011-12, urban", "Rs 1,000 a month"], pyqExampleId: "7cce6ca2-799d-4bc3-9036-b5952cd2082a" },
          { cells: ["Poorest State, MPI 2021", "Bihar"], pyqExampleId: "0b84df7e-8e34-44f7-adca-a5b0fb94eeea" },
          { cells: ["Urban MPI poverty, 2021", "8.81%"], pyqExampleId: "96d0812d-e12c-47e1-89e3-761049faef3b" },
          { cells: ["Who releases the MPI", "NITI Aayog"], pyqExampleId: "23bdcb97-b537-4a87-924f-dcb884a3de77" },
        ],
      },
      pyqExampleId: "a2fa535c-c234-41a3-8e78-f706731459e2",
      selfCheckExample: {
        prompt: "In the two NITI Aayog poverty indices, which State was poorest in 2021, and which had the fewest poor in 2023?",
        steps: ["The first MPI (2021) found Bihar the poorest State.", "The 2023 MPI found Kerala with the lowest share of poor people."],
        answer: "Bihar (2021); Kerala (2023).",
      },
      practiceSet: [
        { prompt: "On what is India's poverty line based?", answer: "Monthly per capita expenditure" },
        { prompt: "Which body publishes the Multidimensional Poverty Index?", answer: "NITI Aayog" },
        { prompt: "Who first discussed a poverty line for India?", answer: "Dadabhai Naoroji" },
      ],
      traps: [
        {
          title: "MPCE, not MSP",
          body: "The poverty line uses **monthly per capita expenditure**. The **minimum support price** is a farm-price tool and the usual decoy.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxnipo-unemployment",
      name: "Kinds of unemployment",
      intuition:
        "Unemployment comes in kinds, each with a typical example. SSC describes the example and asks the kind, so learn each kind with its picture.",
      definition:
        "The kinds:\n" +
        "- **Seasonal**: work only in some months, as in **farming** or hill **tourism**. Mostly rural.\n" +
        "- **Disguised**: more people on a job than it needs, as on a family farm; taking some away does not cut output.\n" +
        "- **Educated**: the educated cannot find work, often for lack of employable skills. Mostly urban.\n" +
        "- **Structural** and **cyclical**: from long-term change in the economy, and from slumps in the business cycle.\n\n" +
        "Facts:\n" +
        "- The main cause usually given is **fast population growth**. Higher **cropping intensity** reduces rural unemployment.\n" +
        "- A **demographic dividend** comes from a large **working-age (15 to 64)** population.\n" +
        "- The **NREGA** (2005) began in **200** districts in its first phase.",
      table: {
        columns: ["Kind", "Example"],
        rows: [
          { cells: ["Seasonal", "Farm work or hill tourism off-season"], pyqExampleId: "cf8da0ac-3a19-4abe-b295-0f04105a4745" },
          { cells: ["Disguised", "Five people doing a family farm's work of three"] },
          { cells: ["Educated", "Graduates without employable skills"], pyqExampleId: "21fb2049-ab3f-43e4-bc7d-41c8419fa4b3" },
          { cells: ["Cyclical", "Jobs lost in a slump"] },
        ],
      },
      pyqExampleId: "31b81e60-3035-41be-90f4-274ef53b2e46",
      selfCheckExample: {
        prompt: "Six members of a family work a farm that needs four. If two leave, output does not fall. What kind of unemployment is this?",
        steps: ["The two extra workers add nothing to output.", "Work that looks like employment but adds nothing is disguised unemployment."],
        answer: "Disguised unemployment.",
      },
      practiceSet: [
        { prompt: "In which sector is seasonal unemployment most common?", answer: "Agriculture" },
        { prompt: "In how many districts did NREGA start?", answer: "200" },
        { prompt: "What age group gives a demographic dividend?", answer: "The working age, 15 to 64" },
      ],
      traps: [
        {
          title: "Seasonal is rural, educated is urban",
          body: "Seasonal unemployment is mainly **rural** and educated unemployment mainly **urban**. Statements swapping them are false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxnipo-hdi",
      name: "Human development and inequality",
      intuition:
        "The Human Development Index ranks countries by health, education and income. SSC asks how India's neighbours rank and why growth after 1991 widened inequality.",
      definition:
        "The facts:\n" +
        "- The **UNDP** publishes the Human Development Index. In the **2021-22** report: **Sri Lanka 73**, Maldives 90, Bhutan 127, Bangladesh 129, India 132.\n" +
        "- The **2010** report changed the method and added an inequality-adjusted index. India's index rose after 2010, but not because of that change.\n" +
        "- **Globalisation** after 1991 widened inequality because growth went mostly to the **urban, skilled and service** sectors.",
      table: {
        columns: ["Country", "HDI rank 2021-22"],
        rows: [
          { cells: ["Sri Lanka", "73"] },
          { cells: ["Maldives", "90"] },
          { cells: ["Bhutan", "127"] },
          { cells: ["Bangladesh", "129"] },
          { cells: ["India", "132"] },
        ],
      },
      pyqExampleId: "c2907f05-2742-479a-9b5d-46c6765c9053",
      selfCheckExample: {
        prompt: "Order these by HDI rank, best first: Bangladesh, Sri Lanka, Bhutan, Maldives.",
        steps: ["Sri Lanka (73) and Maldives (90) rank highest.", "Bhutan (127) comes before Bangladesh (129)."],
        answer: "Sri Lanka, Maldives, Bhutan, Bangladesh.",
      },
      practiceSet: [
        { prompt: "Which body publishes the Human Development Index?", answer: "The UNDP" },
        { prompt: "Which of India's neighbours ranked highest on the HDI in 2021-22?", answer: "Sri Lanka" },
        { prompt: "Why did inequality rise after 1991?", answer: "Growth went mostly to urban, skilled and service sectors" },
      ],
      traps: [
        {
          title: "A method change is not a cause",
          body: "India's HDI did rise after 2010, and the method was revised in 2010, but the revision did **not** cause the rise.",
        },
      ],
    },
  ],
};
