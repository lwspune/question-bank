import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_OP_GROWTH_NOTE: SubtopicNote = {
  subtopicName: "Population Attributes and Growth",
  title: "Population Attributes and Growth",
  oneLineDefinition:
    "What a population has that a single organism does not: birth and death rates, sex ratio, age pyramids and density, how density changes, the exponential and logistic models of population growth, and the adaptations that let organisms live in their habitat.",
  whyItMatters:
    "Eleven NEET questions: five EASY and six MODERATE. Five were on logistic growth, and the Verhulst-Pearl equation or its K came up in NEET 2024, NEET 2025 and NEET 2026. Exponential growth was asked twice: the base e in NEET 2021 and a sum with equal birth and death rates in Re-NEET 2026. Adaptations were asked once, as a match in NEET 2021, and none since.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboop-attributes",
      name: "Population attributes and age pyramids",
      intuition:
        "One lotus plant is born and dies once. A pond of lotus plants has a birth rate, a death rate, a ratio of males to females and a mix of young and old. These belong to the group, not to any single member, and they tell us whether the group will grow or shrink.",
      definition:
        "Population attributes in NCERT:\n" +
        "- A **population** has attributes that an individual organism does not: **birth rate**, **death rate**, **sex ratio** and **age distribution**.\n" +
        "- Birth and death rates are given **per capita**, that is per member of the population.\n" +
        "- **Sex ratio**: for example, 60 percent of the population are females and 40 percent males.\n" +
        "- **Age pyramid**: a plot of the percentage of individuals in each age group (pre-reproductive, reproductive and post-reproductive). For humans it shows males and females in one diagram. Its shape shows whether the population is **expanding**, **stable** or **declining**.\n" +
        "- **Population size** (population density, N) need not be a head count. For 200 *Parthenium* plants against one huge banyan tree with a large canopy, **per cent cover** or **biomass** is a more meaningful measure.\n" +
        "- Total numbers can be hard to count, as for bacteria in a petri dish. Then **relative density** is enough: the number of fish caught per trap. Tiger census in national parks and tiger reserves uses **pug marks** and **fecal pellets**.",
      table: {
        columns: ["Age pyramid", "Its age mix", "What it says about the population"],
        rows: [
          {
            cells: ["Expanding", "Pre-reproductive individuals are the largest group, then reproductive, then post-reproductive", "A growing population"],
            noteAmber: "NEET 2023: the expanding pyramid has the largest share of pre-reproductive individuals, followed by reproductive and post-reproductive.",
            pyqExampleId: "afed32de-5876-43c5-9667-8510f3916b1c",
          },
          { cells: ["Stable", "Pre-reproductive and reproductive groups are about the same size", "A population that is neither growing nor shrinking"] },
          { cells: ["Declining", "Pre-reproductive individuals are fewer than reproductive ones", "A shrinking population"] },
        ],
      },
      pyqExampleId: "afed32de-5876-43c5-9667-8510f3916b1c",
      selfCheckExample: {
        prompt: "A country has 20 percent of its people in the pre-reproductive age group, 50 percent in the reproductive group and 30 percent in the post-reproductive group. Which age pyramid does it have, and what is likely to happen to its population?",
        steps: [
          "Compare the young with the reproductive adults: 20 percent against 50 percent.",
          "Fewer pre-reproductive than reproductive individuals gives the declining pyramid.",
          "Fewer young people will join the reproductive group later, so the population will shrink.",
        ],
        answer: "A declining age pyramid; the population is likely to shrink.",
      },
      practiceSet: [
        { prompt: "Which four attributes does a population have that a single organism does not?", answer: "Birth rate, death rate, sex ratio and age distribution" },
        { prompt: "For one huge banyan tree, which measures of population size are more meaningful than a count?", answer: "Per cent cover or biomass" },
        { prompt: "Which two signs are used to count tigers in national parks and tiger reserves?", answer: "Pug marks and fecal pellets" },
        { prompt: "The number of fish caught per trap measures which kind of density?", answer: "Relative density" },
        { prompt: "A population is 60 percent female and 40 percent male. Which attribute does this describe?", answer: "Sex ratio" },
      ],
      traps: [
        {
          title: "A stable pyramid has equal young and adults",
          body: "In a **stable** pyramid the **pre-reproductive** and **reproductive** groups are about equal. A pyramid whose pre-reproductive group is the **largest** is **expanding**, not stable.",
        },
        {
          title: "Population size is not always a head count",
          body: "Where one plant is huge, like a banyan tree, NCERT uses **per cent cover** or **biomass**. Where counting is impossible, **relative density** such as fish per trap is enough.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nboop-density",
      name: "Birth rate, death rate and change in density",
      intuition:
        "A population is like a class register. New students join by birth or by moving in, and others leave by death or by moving away. Add what comes in, take away what goes out, and you have next year's size. Birth and death rates are these numbers divided by the size of the population.",
      definition:
        "How density changes, in NCERT:\n" +
        "- Four basic processes change population density: **natality** (births, B) and **immigration** (I) add to it; **mortality** (deaths, D) and **emigration** (E) take away from it.\n" +
        "- Immigration is the number of individuals of the **same species** that came into the habitat from elsewhere; emigration is the number that **left** the habitat.\n" +
        "- If N is the density at time t, the density at time t + 1 is \\(N_{t+1} = N_t + [(B + I) - (D + E)]\\). Density **increases** when \\(B + I\\) is more than \\(D + E\\), and falls otherwise.\n" +
        "- Under normal conditions **births and deaths** are the most important factors. Immigration matters under special conditions, for example when a **new habitat is just being colonised**.\n" +
        "- **Per capita birth rate** = number born in a period ÷ population at the start. NCERT: a pond had 20 lotus plants last year and 8 new plants were added by reproduction, so the birth rate is \\(8/20 = 0.4\\) offspring per lotus per year.\n" +
        "- **Per capita death rate** = number that died in a period ÷ population. NCERT: 4 of 40 fruit flies in a laboratory population died in a week, so the death rate is \\(4/40 = 0.1\\) individuals per fruit fly per week.",
      formula: {
        label: "Change in population density",
        latex: "N_{t+1} = N_t + [(B + I) - (D + E)]",
        symbols: [
          { symbol: "\\(N_t\\)", meaning: "population density at time t" },
          { symbol: "\\(N_{t+1}\\)", meaning: "population density at time t + 1" },
          { symbol: "\\(B\\)", meaning: "number of births" },
          { symbol: "\\(I\\)", meaning: "number of immigrants" },
          { symbol: "\\(D\\)", meaning: "number of deaths" },
          { symbol: "\\(E\\)", meaning: "number of emigrants" },
        ],
      },
      authoredExample: {
        prompt: "A herd of 500 deer has 60 births, 40 deaths, 20 deer moving in and 10 moving out in one year. Find the per capita birth rate, the per capita death rate and the size of the herd after the year.",
        steps: [
          "Birth rate: \\(60/500 = 0.12\\) offspring per deer per year.",
          "Death rate: \\(40/500 = 0.08\\) individuals per deer per year.",
          "Next year: \\(N_{t+1} = 500 + [(60 + 20) - (40 + 10)] = 500 + 80 - 50 = 530\\).",
        ],
        answer: "Birth rate 0.12, death rate 0.08 per deer per year; the herd grows to 530.",
      },
      pyqExampleId: "748b1243-1867-4c32-b383-53e7dc6d3759",
      selfCheckExample: {
        prompt: "A pond had 20 lotus plants last year. Reproduction added 8 new plants this year. What is the per capita birth rate, with its unit?",
        steps: [
          "Per capita birth rate = number born ÷ starting population.",
          "\\(8/20 = 0.4\\).",
        ],
        answer: "0.4 offspring per lotus per year.",
      },
      practiceSet: [
        { prompt: "Name the four basic processes that change population density.", answer: "Natality, mortality, immigration and emigration" },
        { prompt: "Under normal conditions, which two processes matter most for population density?", answer: "Births and deaths" },
        { prompt: "When does immigration become important for population density?", answer: "Under special conditions, such as when a new habitat is just being colonised" },
        { prompt: "A population of 1,000 has 50 births, 20 immigrants, 30 deaths and 10 emigrants in a year. What is its size at the end of the year?", answer: "1,030: \\(1000 + (50 + 20) - (30 + 10)\\)" },
        { prompt: "Which two of B, I, D and E reduce population density?", answer: "D (deaths) and E (emigrants)" },
      ],
      traps: [
        {
          title: "A per capita rate is divided by the population",
          body: "A death rate is the number that died **divided by the population**: 4 deaths in 40 flies is 0.1 per fly per week, not 4.",
        },
        {
          title: "Immigrants add, emigrants take away",
          body: "Density rises when **births plus immigrants** exceed **deaths plus emigrants**. Putting emigrants on the adding side reverses the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nboop-exponential",
      name: "Exponential growth",
      intuition:
        "If food and space never ran out, every population would keep multiplying, and the more members it had, the faster it would add new ones. Plot its numbers against time and the line curves sharply upward like the letter J.",
      definition:
        "Exponential growth in NCERT:\n" +
        "- It happens when **resources** (food and space) are **unlimited**. Each species then realises its full innate potential to grow in number, as Darwin noted with natural selection.\n" +
        "- If b is the per capita birth rate and d the per capita death rate, the rate of change is \\(\\dfrac{dN}{dt} = (b - d) \\times N\\). Writing \\(r = b - d\\) gives \\(\\dfrac{dN}{dt} = rN\\).\n" +
        "- **r** is the **intrinsic rate of natural increase**, an important parameter for judging how any biotic or abiotic factor affects population growth. NCERT values: **Norway rat 0.015**, **flour beetle 0.12**, and **India in 1981, 0.0205**.\n" +
        "- The integral form is \\(N_t = N_0\\,e^{rt}\\), where e is the **base of natural logarithms** (2.71828).\n" +
        "- Plotting N against time gives a **J shaped** curve. A species growing exponentially under unlimited resources can reach enormous numbers in a short time.",
      formula: {
        label: "Exponential growth, integral form",
        latex: "N_t = N_0\\,e^{rt}",
        symbols: [
          { symbol: "\\(N_t\\)", meaning: "population density after time t" },
          { symbol: "\\(N_0\\)", meaning: "population density at time zero" },
          { symbol: "\\(r\\)", meaning: "intrinsic rate of natural increase, b minus d" },
          { symbol: "\\(t\\)", meaning: "time" },
          { symbol: "\\(e\\)", meaning: "the base of natural logarithms, 2.71828" },
        ],
      },
      authoredExample: {
        prompt: "A population of 2,000 insects has a per capita birth rate of 0.05 and a per capita death rate of 0.03 per day, with unlimited food. Find r and how fast the population is growing right now.",
        steps: [
          "\\(r = b - d = 0.05 - 0.03 = 0.02\\) per day.",
          "\\(\\dfrac{dN}{dt} = rN = 0.02 \\times 2000 = 40\\).",
        ],
        answer: "r = 0.02 per day; the population is growing by 40 insects a day.",
      },
      pyqExampleId: "b064f4ba-da2a-4e7e-87c9-48f8f65614af",
      selfCheckExample: {
        prompt: "A bacterial population of 500 cells has r = 0.1 per hour and unlimited nutrients. How fast is it growing at this moment, and what shape will its growth curve take?",
        steps: [
          "With unlimited resources the growth is exponential: \\(\\dfrac{dN}{dt} = rN\\).",
          "\\(0.1 \\times 500 = 50\\) cells per hour.",
          "Exponential growth plots as a J shaped curve.",
        ],
        answer: "50 cells per hour, on a J shaped curve.",
      },
      practiceSet: [
        { prompt: "What is r called in the exponential growth equation?", answer: "The intrinsic rate of natural increase" },
        { prompt: "What value of r does NCERT give for the Norway rat?", answer: "0.015" },
        { prompt: "What value of r does NCERT give for the flour beetle?", answer: "0.12" },
        { prompt: "What was the r value for the human population of India in 1981?", answer: "0.0205" },
        { prompt: "Exponential growth assumes what about the resources available?", answer: "That they are unlimited" },
      ],
      traps: [
        {
          title: "r is births minus deaths",
          body: "\\(r = b - d\\), the per capita birth rate **minus** the per capita death rate. When b equals d, r is zero and the population stays the same size: \\(e^0 = 1\\).",
        },
        {
          title: "e is the base of natural logarithms",
          body: "In \\(N_t = N_0\\,e^{rt}\\), e is the **base of natural logarithms**, about 2.71828. There are no geometric or exponential logarithms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nboop-logistic",
      name: "Logistic growth and carrying capacity",
      intuition:
        "Real habitats run short of food and space. A population starts slowly, speeds up, then slows down as it gets crowded, and finally levels off at the largest number the habitat can support. That ceiling is the carrying capacity, K, and the curve looks like a stretched letter S.",
      definition:
        "Logistic growth in NCERT:\n" +
        "- No population has unlimited resources for long, so there is competition among its members and the fittest survive and reproduce.\n" +
        "- A habitat can support only a certain maximum number of a species, its **carrying capacity (K)**.\n" +
        "- A population with limited resources shows a **lag phase**, then **acceleration** and **deceleration**, and finally an **asymptote** when N reaches K.\n" +
        "- N plotted against time gives a **sigmoid** (S shaped) curve. This is **Verhulst-Pearl logistic growth**: \\(\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right)\\).\n" +
        "- Resources for growth of most animal populations are **finite** and become limiting sooner or later, so the **logistic model is considered more realistic** than the exponential one.\n" +
        "- In the NCERT figure, curve **a** (J shaped) is exponential growth when responses are not limiting the growth, and curve **b** (S shaped, levelling at K) is logistic growth when they are limiting.",
      formula: {
        label: "Verhulst-Pearl logistic growth",
        latex: "\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right)",
        symbols: [
          { symbol: "\\(N\\)", meaning: "population density at time t" },
          { symbol: "\\(r\\)", meaning: "intrinsic rate of natural increase" },
          { symbol: "\\(K\\)", meaning: "carrying capacity" },
        ],
      },
      authoredExample: {
        prompt: "A habitat has a carrying capacity of 1,000 for a beetle species with r = 0.2 per week. How fast does the population grow when N is 250, and when N reaches 1,000?",
        steps: [
          "At N = 250: \\(\\dfrac{K - N}{K} = \\dfrac{1000 - 250}{1000} = 0.75\\).",
          "\\(\\dfrac{dN}{dt} = 0.2 \\times 250 \\times 0.75 = 37.5\\) beetles a week.",
          "At N = 1,000: \\(\\dfrac{K - N}{K} = 0\\), so \\(\\dfrac{dN}{dt} = 0\\).",
        ],
        answer: "37.5 beetles a week at N = 250; zero growth once N reaches K = 1,000.",
      },
      pyqExampleId: "a61feed9-1af7-4f4f-87b5-3580262aa992",
      selfCheckExample: {
        prompt: "A fish population of 600 lives in a lake with a carrying capacity of 800 and r = 0.5 per year. Using the logistic equation, how fast is it growing, and would it grow faster or slower with unlimited resources?",
        steps: [
          "\\(\\dfrac{K - N}{K} = \\dfrac{800 - 600}{800} = 0.25\\).",
          "\\(\\dfrac{dN}{dt} = 0.5 \\times 600 \\times 0.25 = 75\\) fish a year.",
          "With unlimited resources, \\(\\dfrac{dN}{dt} = rN = 300\\), so it would grow faster.",
        ],
        answer: "75 fish a year; with unlimited resources it would grow faster, at 300 a year.",
      },
      practiceSet: [
        { prompt: "List the phases of logistic growth in order.", answer: "Lag phase, acceleration, deceleration and the asymptote" },
        { prompt: "What is the shape of the logistic growth curve?", answer: "Sigmoid (S shaped)" },
        { prompt: "At which population density does the logistic curve reach its asymptote?", answer: "When N reaches the carrying capacity K" },
        { prompt: "In the NCERT population growth figure, which curve shows growth when responses are not limiting?", answer: "Curve a, the J shaped exponential curve" },
        { prompt: "Which two scientists are named in the logistic growth equation?", answer: "Verhulst and Pearl" },
      ],
      traps: [
        {
          title: "The bracket is (K minus N) over K",
          body: "The logistic factor is \\(\\dfrac{K - N}{K}\\) and it multiplies \\(rN\\). Options with \\(\\dfrac{K - N}{N}\\), \\(\\dfrac{K + N}{K}\\), \\(\\dfrac{K}{K - N}\\) or a missing N are wrong.",
        },
        {
          title: "K is carrying capacity, r is the growth rate",
          body: "**K** is the **carrying capacity**. **r** is the **intrinsic rate of natural increase**. Neither is population density, which is **N**.",
        },
        {
          title: "J is exponential, S is logistic",
          body: "The **J shaped** curve belongs to **exponential** growth with unlimited resources; the **S shaped** curve that levels off at K belongs to **logistic** growth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboop-adaptations",
      name: "Adaptations to the environment",
      intuition:
        "A population lives in its habitat because its members can cope with it. A seal in icy water, a rat in a desert with no water to drink and a lizard in the hot sand each carry some trick, in body shape, in how the body works or in what the animal does, that keeps it alive there.",
      definition:
        "Adaptations in NCERT:\n" +
        "- An **adaptation** is any attribute of an organism (morphological, physiological or behavioural) that enables it to survive and reproduce in its habitat.\n" +
        "- **Allen's rule:** mammals from colder climates generally have **shorter ears and limbs**, to keep heat loss low. Aquatic mammals such as **seals** in polar seas also have a thick layer of fat (**blubber**) below the skin that insulates them.\n" +
        "- **Physiological:** the **kangaroo rat** of North American deserts meets its water needs by the **internal oxidation of fat** (water is a by-product) and can **concentrate its urine**, so it spends very little water on removing wastes.\n" +
        "- **Behavioural:** **desert lizards** lack the physiological ability mammals have to deal with heat. They keep their body temperature fairly constant by behaviour: they **bask in the sun** when their body temperature drops, and **move into shade** when it gets too hot.\n" +
        "- **At great depths:** many marine invertebrates and fish live deep in the ocean, where the pressure can be more than **100 times** normal atmospheric pressure.\n" +
        "- People living at high altitudes in the Himalayas have a **higher red blood cell count** than people of the plains.",
      table: {
        columns: ["Kind of adaptation", "NCERT example", "What it does"],
        rows: [
          {
            cells: ["Allen's rule", "Polar seal; mammals of cold climates", "Shorter ears and limbs keep heat loss low"],
            noteAmber: "NEET 2021: Allen's rule with the polar seal, physiological with the kangaroo rat, behavioural with the desert lizard, biochemical with the marine fish at depth.",
            pyqExampleId: "cffc7cb8-085f-4111-8a5a-0fa4ca746276",
          },
          { cells: ["Physiological", "Kangaroo rat", "Water from fat oxidation; very concentrated urine"] },
          { cells: ["Behavioural", "Desert lizard", "Basks in the sun when cold, moves into shade when hot"] },
          { cells: ["Biochemical", "Marine fish at great depths", "Lives under pressure over 100 times that at the surface"] },
        ],
      },
      pyqExampleId: "cffc7cb8-085f-4111-8a5a-0fa4ca746276",
      selfCheckExample: {
        prompt: "A desert lizard lies on a sunny rock in the morning and hides under a bush at noon. Is this a physiological or a behavioural adaptation, and why does the lizard need it?",
        steps: [
          "The lizard changes where it is, not how its body works: that is behaviour.",
          "NCERT says desert lizards lack the physiological ability mammals have to deal with high temperatures.",
          "So they keep their body temperature fairly constant by moving between sun and shade.",
        ],
        answer: "A behavioural adaptation; it keeps the body temperature fairly constant without a physiological way to do so.",
      },
      practiceSet: [
        { prompt: "What does the thick layer of fat under the skin of a polar seal do?", answer: "It insulates the seal (blubber) and cuts heat loss" },
        { prompt: "Where does the kangaroo rat get its water, given that it hardly drinks?", answer: "From the internal oxidation of fat, where water is a by-product" },
        { prompt: "Why do people living high in the Himalayas have a higher red blood cell count?", answer: "It is an adaptation to the thin air at high altitude, carrying more oxygen" },
        { prompt: "Name the three kinds of attribute NCERT counts as adaptations.", answer: "Morphological, physiological and behavioural" },
      ],
      traps: [
        {
          title: "Allen's rule is about short extremities",
          body: "**Allen's rule** says mammals of **colder** climates have **shorter** ears and limbs, to keep heat loss low. Longer ears belong to mammals of hot climates, where losing heat helps.",
        },
        {
          title: "The desert lizard's trick is behaviour, not physiology",
          body: "The **kangaroo rat** is NCERT's **physiological** example (fat oxidation, concentrated urine). The **desert lizard** is the **behavioural** one: it moves between sun and shade.",
        },
      ],
    },
  ],
};
