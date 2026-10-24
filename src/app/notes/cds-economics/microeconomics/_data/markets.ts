import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MI_MARKETS_NOTE: SubtopicNote = {
  subtopicName: "Market Structures and Economic Systems",
  title: "Market Structures and Economic Systems",
  oneLineDefinition:
    "The four market forms and how to tell them apart, the rule a profit-making firm follows, and the kinds of firms and economic systems CDS names.",
  whyItMatters:
    "Eleven CDS questions. Monopolistic competition alone was asked directly in 2019 (I), 2021 (II) and 2022 (I), and all four market forms were matched in 2020 (I), so the comparison table is the first thing to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmi-market-forms",
      name: "The four market structures",
      intuition:
        "Markets differ in two ways: how many sellers there are, and whether their products are the same or different. Many sellers of an identical good gives perfect competition. One seller gives monopoly. Many sellers of slightly different brands gives monopolistic competition. A few big sellers, each watching the others, gives oligopoly.",
      definition:
        "The four forms:\n" +
        "- **Perfect competition**: very many firms, a **homogeneous** product, free entry and exit. Each firm is a **price taker**: the demand for its own output is **perfectly elastic**.\n" +
        "- **Monopoly**: **one** seller, no close substitute, strong **barriers to entry**. The firm is a **price maker**.\n" +
        "- **Monopolistic competition**: **many** buyers and sellers of **differentiated** products (brands that are close but not perfect substitutes), free entry. Each firm has a little price-setting power. Example: **soaps**, toothpaste.\n" +
        "- **Oligopoly**: a **few** sellers of similar products. Each firm's decision depends on its rivals' (**interdependence**). Examples: cars, telecom.",
      table: {
        columns: ["Market form", "Sellers and product", "Example"],
        rows: [
          { cells: ["Perfect competition", "Many sellers, identical product", "A vegetable or grain market (close to it)"] },
          {
            cells: ["Monopolistic competition", "Many sellers, differentiated product", "Branded soaps"],
            noteAmber: "Asked directly three times: CDS 2019 (I) defined it, 2021 (II) asked for an example (soaps), 2022 (I) for its features.",
            pyqExampleId: "7a1731a8-9666-4199-8301-46a739c84718",
          },
          {
            cells: ["Oligopoly", "Few sellers, similar products", "Car makers, telecom companies"],
            noteAmber: "CDS 2020 (I) matched all four market forms with their features.",
            pyqExampleId: "c6d3f336-519e-4995-8473-975a940a6d31",
          },
          { cells: ["Monopoly", "One seller, no close substitute", "Indian Railways"] },
        ],
      },
      pyqExampleId: "71d51e9c-ee0f-4ef2-be3e-53289c22ca19",
      selfCheckExample: {
        prompt: "A town has three cement companies. When one cuts its price, the other two cut theirs within a week. Which market form is this, and which feature does the price war show?",
        steps: [
          "Only a few sellers of a similar product points to oligopoly.",
          "Each company reacts to the others' price, which is interdependence.",
        ],
        answer: "Oligopoly; the price war shows interdependence in decision-making.",
      },
      practiceSet: [
        { prompt: "Which market form has a single seller of a good with no close substitute?", answer: "Monopoly" },
        { prompt: "Which market form is shown by many brands of toothpaste, each a little different?", answer: "Monopolistic competition" },
        { prompt: "Does monopolistic competition have barriers to entry?", answer: "No. Firms can enter and leave freely." },
        { prompt: "In which market form does each firm watch and react to its rivals' decisions?", answer: "Oligopoly" },
      ],
      traps: [
        {
          title: "Differentiated means monopolistic competition",
          body: "**Many** sellers with **identical** goods is perfect competition; **many** sellers with **similar but not identical** (branded) goods is **monopolistic** competition. Barriers to entry and homogeneous products are **not** features of monopolistic competition.",
        },
        {
          title: "Few sellers is oligopoly, not imperfect competition",
          body: "'Imperfect competition' is the umbrella for every form except perfect competition. When a question describes a **few** sellers, the precise answer is **oligopoly**; when it describes **many** sellers of differentiated goods, it is **monopolistic competition**.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmi-firm-equilibrium",
      name: "How a firm chooses its output",
      intuition:
        "A firm keeps making one more unit as long as that unit brings in more than it costs. It stops where the extra revenue equals the extra cost. A firm in perfect competition gets the same market price for every unit, so it produces until marginal cost rises to the price. A monopolist must cut its price to sell more, so it stops sooner and charges more than marginal cost.",
      definition:
        "The rules:\n" +
        "- **Profit is greatest where MR = MC** (marginal revenue equals marginal cost), and **MC must be rising** there. On the falling part of MC, producing more still adds profit.\n" +
        "- **Perfect competition**: price = average revenue = MR, so the firm produces where **P = MC**.\n" +
        "- **Short run**: the firm stays open only if **P ≥ average variable cost** (AVC). Below that it shuts down.\n" +
        "- **Long run**: free entry and exit push **P = average cost** (minimum AC), so firms earn only **normal profit**.\n" +
        "- A perfectly competitive firm produces the **socially best** output, since price equals marginal cost.\n" +
        "- **Monopoly**: MR is below price, so at MR = MC the price is **above MC**. The monopolist produces **less than the efficient output** and causes a **deadweight loss**.",
      formula: {
        label: "Profit-maximising output",
        latex: "MR = MC \\ (\\text{MC rising}) \\qquad \\text{perfect competition: } P = MR = MC",
        symbols: [
          { symbol: "\\(MR\\)", meaning: "marginal revenue: extra revenue from one more unit" },
          { symbol: "\\(MC\\)", meaning: "marginal cost: extra cost of one more unit" },
          { symbol: "\\(P\\)", meaning: "market price" },
        ],
      },
      authoredExample: {
        prompt: "A firm in perfect competition sells at ₹30 a unit. Its marginal cost of the 1st to 5th units is ₹40, ₹25, ₹20, ₹30 and ₹45. How many units should it make?",
        steps: [
          "The 2nd and 3rd units cost less than ₹30 each, so they add to profit.",
          "At the 4th unit, MC = ₹30 = price, and MC is rising (from ₹20 to ₹30).",
          "The 5th unit costs ₹45, more than the ₹30 it brings in, so it lowers profit.",
          "Check: the five units add −10, +5, +10, 0 and −15 to profit, so stopping at 4 keeps every gain.",
        ],
        answer: "4 units, where price equals a rising marginal cost.",
      },
      selfCheckExample: {
        prompt: "A monopolist makes 100 units, where its marginal revenue and marginal cost are both ₹50, and sells them at ₹80 each. Is its output efficient?",
        steps: [
          "Efficiency needs price to equal marginal cost.",
          "Here price (₹80) is above marginal cost (₹50), so buyers value one more unit more than it costs to make.",
        ],
        answer: "No. The monopolist produces too little; output is below the efficient level.",
      },
      pyqExampleId: "32beff43-0069-40de-a100-d300f295ad12",
      practiceSet: [
        { prompt: "What does the demand curve facing a single perfectly competitive firm look like?", answer: "A horizontal line: perfectly elastic at the market price" },
        { prompt: "At what output does any firm earn the greatest profit?", answer: "Where marginal revenue equals marginal cost" },
        { prompt: "Is a monopolist a price taker or a price maker?", answer: "A price maker" },
        { prompt: "Does a monopolist produce more or less than the socially efficient output?", answer: "Less" },
      ],
      traps: [
        {
          title: "MR = MC is not enough: MC must be rising",
          body: "Marginal cost can equal marginal revenue twice, once while MC is falling and once while it is rising. Only the **rising** point gives the most profit, so a statement that **MC falls at equilibrium** is wrong.",
        },
        {
          title: "Monopoly is not efficient",
          body: "A monopolist sets price **above** marginal cost and restricts output. 'Monopoly produces an efficient level of output' is a wrong match; it is **perfect competition** that reaches the socially best output.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmi-firms-systems",
      name: "Firms and economic systems",
      intuition:
        "Who owns the factories, and who decides what gets made? Under capitalism, private owners decide through markets. Under socialism, the state owns and plans. Most countries, India among them, mix the two. Within the private sector, the joint-stock company lets thousands of shareholders own one business without risking more than their shares.",
      definition:
        "The terms:\n" +
        "- **Capitalist economy**: production for the **market**, productive wealth held **privately**, resources allocated by **market prices**.\n" +
        "- **Socialist (command) economy**: resources allocated by central **planning**. Planning is **not** a feature of capitalism.\n" +
        "- **Mixed economy**: public and private sectors side by side, as in India.\n" +
        "- **Social market economy**: free markets with strong welfare and rules, developed in **West Germany** in the 1950s (Ludwig Erhard).\n" +
        "- **Joint-stock company**: a separate **legal entity**, **limited liability** of shareholders, management by a board **elected by shareholders**, and **collective ownership** by all the shareholders.\n" +
        "- **Unicorn**: a **privately held start-up** valued at over **US$ 1 billion**.",
      table: {
        columns: ["Term", "Key feature"],
        rows: [
          {
            cells: ["Capitalism", "Private ownership and allocation by markets"],
            noteAmber: "CDS 2022 (II): planning is the feature NOT associated with a capitalist economy.",
            pyqExampleId: "a48ffd93-8c22-466e-8539-9905c3f3e2c5",
          },
          { cells: ["Socialism", "State ownership and central planning"] },
          {
            cells: ["Social market economy", "Free markets with welfare, from West Germany in the 1950s"],
            noteAmber: "CDS 2022 (II): the idea emerged in Germany.",
            pyqExampleId: "7b9d6cbc-74aa-4baf-96cf-65b4a021697e",
          },
          {
            cells: ["Joint-stock company", "Legal entity, limited liability, elected management, collective ownership"],
            noteAmber: "CDS 2019 (I): all four of these features were correct.",
            pyqExampleId: "3436df1d-3edb-409a-a49c-eca06572410c",
          },
          {
            cells: ["Unicorn", "Privately held start-up valued over US$ 1 billion"],
            noteAmber: "CDS 2022 (I).",
            pyqExampleId: "b7ed56da-0878-40fa-b742-615dadd3a0c1",
          },
        ],
      },
      pyqExampleId: "a48ffd93-8c22-466e-8539-9905c3f3e2c5",
      practiceSet: [
        { prompt: "What is the minimum valuation for a privately held start-up to be called a unicorn?", answer: "US$ 1 billion" },
        { prompt: "In which country did the idea of the social market economy emerge in the 1950s?", answer: "(West) Germany" },
        { prompt: "How far is a shareholder of a joint-stock company liable for its debts?", answer: "Only up to the value of his or her shares: limited liability" },
        { prompt: "What is an economy with both a public and a private sector, as in India, called?", answer: "A mixed economy" },
      ],
      traps: [
        {
          title: "Planning belongs to socialism",
          body: "Allocating resources by a central **plan** is the mark of a **socialist** or command economy. A capitalist economy allocates through **markets** and private ownership.",
        },
        {
          title: "A unicorn is private, not listed or public sector",
          body: "The word means a **privately held** start-up worth over US$ 1 billion. It has nothing to do with merging public sector companies or foreign collaborations.",
        },
      ],
    },
  ],
};
