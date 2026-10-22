import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_WO_DEMOCRACY_NOTE: SubtopicNote = {
  subtopicName: "Democracy, Totalitarianism and the State",
  title: "Democracy, Totalitarianism and the State",
  oneLineDefinition:
    "The models of democracy, what makes a State secular, how totalitarian rule differs from ordinary dictatorship, how power is centralised or spread, and the basic words of political analysis.",
  whyItMatters:
    "Eight CDS questions: one EASY, six MODERATE and one HARD, three of them from CDS 2024 (I). Almost every one is a \"which is NOT correct\" item, so you need each idea's full description, not one word of it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolwo-democracy",
      name: "Models of democracy and the secular State",
      intuition:
        "Thinkers agree that democracy means rule by the people, but they disagree on why it is good. One camp says the vote is a shield: it lets citizens stop the government from harming them. Another says taking part in politics is good in itself, because it makes people better citizens. " +
        "Secularism answers a different question: how the State treats religion.",
      definition:
        "The models CDS asks about:\n" +
        "- **Classical democracy** (ancient Athens): citizens decide laws themselves, directly, in an assembly.\n" +
        "- **Protective democracy** (John Locke, Jeremy Bentham, James Mill): the vote is a **device for protection** against government. It is happy with **formal equality** (one person, one vote), asks for little participation and sits easily with **laissez-faire** capitalism.\n" +
        "- **Developmental democracy** (Jean-Jacques Rousseau, J. S. Mill): **participation is valuable in itself**, because it develops the citizen's mind and character.\n" +
        "- A **secular State** rejects **theocracy** (rule by religious authority), keeps the State **separate from religion**, and works to prevent religious conflict. Secularism is about the State and religion, so a State can be secular **without being a democracy**.",
      table: {
        columns: ["Idea", "Linked with", "What it says"],
        rows: [
          { cells: ["Classical democracy", "Ancient Athens", "Citizens make the laws directly in an assembly"] },
          {
            cells: ["Protective democracy", "Locke, Bentham, James Mill", "The vote protects citizens from government; formal equality is enough"],
          },
          {
            cells: ["Developmental democracy", "Rousseau, J. S. Mill", "Taking part in politics is good in itself and improves the citizen"],
          },
          {
            cells: ["Secular State", "Separation of State and religion", "No theocracy, no State religion, religious harmony; democracy is not part of the definition"],
            noteAmber: "CDS 2020 (II): 'a State must be democratic to be secular' was the statement that is not a character of a secular State.",
            pyqExampleId: "8c5fa645-4ff5-4dcf-a698-19ae090a8986",
          },
        ],
      },
      pyqExampleId: "f6bcc7b6-5ed1-4cdc-8007-52a0f3b6d899",
      selfCheckExample: {
        prompt: "In ancient Athens the citizens met in an assembly and voted on the laws themselves, with no elected lawmakers in between. Which model of democracy is this?",
        steps: [
          "The people decide directly; nobody represents them.",
          "Direct rule by citizens in an assembly is the Athenian pattern.",
        ],
        answer: "Classical democracy.",
      },
      practiceSet: [
        { prompt: "Name two thinkers linked with protective democracy.", answer: "John Locke and Jeremy Bentham (James Mill also)" },
        { prompt: "What is a State ruled by religious authority under religious law called?", answer: "A theocracy" },
        { prompt: "Can a State be secular without being a democracy?", answer: "Yes. Secularism is about separating the State from religion, not about elections" },
        { prompt: "Name two thinkers linked with developmental democracy.", answer: "Jean-Jacques Rousseau and J. S. Mill" },
      ],
      traps: [
        {
          title: "Participation for its own sake is developmental",
          body: "Protective democracy wants citizens to vote so they can guard themselves; it does not call participation essential. The view that taking part is good in itself belongs to **developmental** democracy (Rousseau, J. S. Mill).",
        },
        {
          title: "Secular does not mean democratic",
          body: "A secular State separates religion from the State and rejects theocracy. Whether it holds elections is a separate question, so 'must be democratic' is not part of being secular.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-totalitarian",
      name: "Totalitarian, authoritarian and autocratic rule",
      intuition:
        "An ordinary dictator wants to control politics: no rival parties, no free elections. A totalitarian State wants to control everything: what you read, what your children learn, what you believe, even how you spend a holiday. Nothing is left outside the State.",
      definition:
        "The marks of **totalitarianism** (Carl Friedrich and Zbigniew Brzezinski listed six):\n" +
        "- an **official ideology** everyone must accept;\n" +
        "- a **one-party State**, usually led by one leader;\n" +
        "- a system of **terror** through a secret police;\n" +
        "- a **monopoly of mass communication** (press, radio, film);\n" +
        "- a monopoly of weapons;\n" +
        "- central control of the economy.\n\n" +
        "It **abolishes civil society**: no independent unions, clubs, churches or press. It reaches into **personal life** as well as political life. That is what makes it different from **autocracy** and **authoritarianism**, which control political power but leave much of private life alone. Standard examples: **Nazi Germany** and **Stalin's Soviet Union**.",
      table: {
        columns: ["Kind of rule", "What the State controls", "Example"],
        rows: [
          { cells: ["Autocracy", "Political power, held by one ruler", "An absolute monarch such as a Tsar of Russia"] },
          { cells: ["Authoritarianism", "Political power; much of private life and society is left alone", "A military regime that bans parties"] },
          {
            cells: ["Totalitarianism", "Everything: politics, beliefs, family, work and leisure; civil society abolished", "Nazi Germany, Stalin's Soviet Union"],
            noteAmber: "CDS 2021 (II): the wrong statement was that it takes political freedom but leaves personal freedom alone.",
            pyqExampleId: "022c69f5-a77a-4eec-9111-20982f4f269f",
          },
        ],
      },
      pyqExampleId: "36861aef-77dd-4461-b236-7e8fb6ccaf42",
      selfCheckExample: {
        prompt: "A regime bans every rival party but lets churches, clubs and private businesses carry on as long as they keep out of politics. Is it totalitarian or authoritarian? Why?",
        steps: [
          "It controls political power only.",
          "A totalitarian State would also take over churches, clubs and private life.",
        ],
        answer: "Authoritarian, because private life and society are left alone.",
      },
      practiceSet: [
        { prompt: "Which two scholars listed six marks of a totalitarian State?", answer: "Carl Friedrich and Zbigniew Brzezinski" },
        { prompt: "Name two regimes usually given as examples of totalitarianism.", answer: "Nazi Germany and Stalin's Soviet Union" },
        { prompt: "Through what does a totalitarian State spread fear among its people?", answer: "Terror, through a secret police" },
        { prompt: "What does a totalitarian State force everyone to accept?", answer: "One official ideology" },
      ],
      traps: [
        {
          title: "Totalitarian rule takes personal freedom too",
          body: "Taking political freedom is what every dictatorship does. Totalitarian rule goes further and controls personal life: belief, family, work and leisure.",
        },
        {
          title: "Totalitarianism is not just another word for autocracy",
          body: "Autocracy and authoritarianism control political power. Totalitarianism also abolishes civil society, so the three are not the same thing.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-centralisation",
      name: "Centralisation, decentralisation and delegation",
      intuition:
        "Power can sit at the top or be spread out. Keeping it at the centre makes a country act as one; spreading it lets people run their own affairs. Delegation is how a boss shares work: authority goes down, but the boss still answers for the result.",
      definition:
        "The three terms:\n" +
        "- **Centralisation**: power stays with the central authority. Merits claimed: **national unity**, **uniformity** of rules and **prosperity** through large-scale planning.\n" +
        "- **Decentralisation**: power is spread to lower levels. Merits claimed: **liberty**, participation and government close to the people. India's **73rd and 74th Amendments (1992)** decentralised power to panchayats and municipalities.\n" +
        "- **Delegation**: a superior passes **part of his authority** to a subordinate. Authority goes **downward**, the superior **keeps the responsibility**, and the delegated work stays open to **supervision and review**. It is a way of dividing authority inside an organisation, not an abdication.",
      table: {
        columns: ["Term", "Meaning", "Merit claimed"],
        rows: [
          { cells: ["Centralisation", "Power held at the centre", "National unity, uniformity, prosperity"] },
          { cells: ["Decentralisation", "Power spread to lower levels", "Liberty, participation, local control"] },
          {
            cells: ["Delegation", "Superior passes authority down to a subordinate", "Work is divided; the superior still answers for it"],
            noteAmber: "CDS 2017 (II): delegation is not an abdication of responsibility, and it never passes authority upward.",
            pyqExampleId: "1c3acb91-b94a-4fbc-9bf6-e2245a284d5d",
          },
        ],
      },
      pyqExampleId: "50345122-93f2-4e02-9153-7d0a2f699dff",
      selfCheckExample: {
        prompt: "A district collector lets a tehsildar sign certain orders but still answers to the government for every one of them. Is this delegation or an abdication of responsibility?",
        steps: [
          "Authority has moved down from the collector to the tehsildar.",
          "The collector still answers for the orders, so responsibility has not been given away.",
        ],
        answer: "Delegation.",
      },
      practiceSet: [
        { prompt: "What is the opposite of centralisation?", answer: "Decentralisation" },
        { prompt: "Is authority given by delegation open to supervision and review?", answer: "Yes. The superior keeps checking how it is used" },
        { prompt: "Which two amendments of 1992 decentralised power in India?", answer: "The 73rd (panchayats) and 74th (municipalities) Amendments" },
        { prompt: "Under decentralisation, which bodies gain power?", answer: "The lower levels, such as panchayats and municipalities" },
      ],
      traps: [
        {
          title: "Liberty is the case for spreading power",
          body: "Centralisation is defended for unity, uniformity and prosperity. Liberty is the merit claimed for **decentralisation**, because power close to the people is harder to abuse.",
        },
        {
          title: "Delegation goes down, never up",
          body: "Delegation passes authority from a higher to a lower authority. 'From a lower authority to a higher one' describes nothing in this idea.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolwo-approaches",
      name: "Approaches and words of world politics",
      intuition:
        "Political science asks two kinds of question. One is about facts: what happens, and why. The other is about values: what should happen. A few more words keep coming back when the subject turns to the wider world: hard and soft power, globalisation, the Washington Consensus and autarky.",
      definition:
        "The terms:\n" +
        "- **Empirical approach**: studies what **is**, by observation and evidence. It tries to be **value-free**.\n" +
        "- **Normative approach**: asks what **ought to be**. It is **value-laden** by nature.\n" +
        "- **Hard power**: getting your way by **threats, force or payment**. States use it, and so can **non-state actors** such as armed groups.\n" +
        "- **Soft power** (a term of **Joseph Nye**): getting your way by **attraction**, through culture, values and ideas.\n" +
        "- **Globalisation** has **economic, cultural and political** sides; it is not only economic.\n" +
        "- **Washington Consensus** (John Williamson, 1989): a free-market package of **liberalisation, privatisation and deregulation**, with a smaller role for the State in the market.\n" +
        "- **Autarky**: economic **self-sufficiency**, a country trading as little as possible.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Empirical approach", "Studies what is; aims to be value-free"] },
          { cells: ["Normative approach", "Asks what ought to be; value-laden"] },
          { cells: ["Hard power", "Coercion by threat, force or payment; used by States and non-state actors"] },
          { cells: ["Soft power", "Attraction through culture and values (Joseph Nye)"] },
          {
            cells: ["Washington Consensus", "Liberalise, privatise, deregulate; less State in the market"],
            noteAmber: "CDS 2024 (I): calling it a policy of intervention in the market was one of the two wrong statements.",
            pyqExampleId: "da3a3e8a-f84a-4478-959e-148efb2a3baa",
          },
          { cells: ["Autarky", "Economic self-sufficiency"] },
        ],
      },
      pyqExampleId: "a6ecb625-05e1-4b4d-9bdb-6f1d88a401e9",
      selfCheckExample: {
        prompt: "A country wins friends abroad through its films, yoga and universities rather than its army or its money. What kind of power is it using, and who named it?",
        steps: [
          "It is not threatening, forcing or paying anyone.",
          "It is attracting others through its culture.",
        ],
        answer: "Soft power, a term of Joseph Nye.",
      },
      practiceSet: [
        { prompt: "What does autarky mean?", answer: "Economic self-sufficiency" },
        { prompt: "Name the three main policies of the Washington Consensus.", answer: "Liberalisation, privatisation and deregulation" },
        { prompt: "Is globalisation only an economic process?", answer: "No. It has cultural and political sides too" },
        { prompt: "Can a group that is not a State use hard power?", answer: "Yes. Hard power is coercion, and armed groups use it too" },
      ],
      traps: [
        {
          title: "The Washington Consensus wanted less State, not more",
          body: "It asked governments to free markets, sell public firms and cut rules. A policy that seeks intervention in the market is the opposite.",
        },
        {
          title: "Empirical is value-free, normative is value-laden",
          body: "Empirical study tries to report facts without judging them. Normative study is about what ought to be, so it cannot be neutral.",
        },
      ],
    },
  ],
};
