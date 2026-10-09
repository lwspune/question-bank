import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_FLAWS_NOTE: SubtopicNote = {
  subtopicName: "Flaws in Reasoning",
  title: "Identifying Flaws in Reasoning",
  oneLineDefinition:
    "A flaw is a mistake in the step from reasons to conclusion; IMAT asks you to name it in plain words.",
  whyItMatters:
    "Flaw questions were asked 19 times between 2011 and 2022. The right answer was most often a causal mistake (a link read as a cause, the cause running the other way, another explanation ignored), and next a conclusion drawn from one example or an unrepresentative statistic. Attacking a person's motive and misreading the other side's argument also appear.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-causal-flaws",
      name: "Causal flaws: correlation, reverse cause and ignored explanations",
      intuition:
        "When two things go together, it is tempting to say one causes the other. But a third thing may cause both, the cause may run the other way, or the timing may be coincidence. This jump from 'goes with' to 'causes' is the flaw IMAT tests most often.",
      definition:
        "Look for a conclusion with **causes, leads to, makes, is responsible for, because of**, then check what the evidence really shows.\n" +
        "- **Correlation is not causation**: A and B happening together does not show that A causes B.\n" +
        "- **Reverse causation**: B may cause A (success may build confidence, not the other way).\n" +
        "- **Third factor**: something else, C, may cause both A and B.\n" +
        "- **Post hoc**: B happened after A, so A must have caused B.\n" +
        "- **Ignored alternative**: another explanation for the evidence is not considered.\n" +
        "- IMAT words these as 'It confuses a correlation with a cause', 'It assumes that X is responsible for Y, and not the other way round', 'It ignores other reasons for ...'.",
      authoredExample: {
        prompt:
          "Name the flaw. 'A survey found that people who own a dog visit their doctor less often than people who do not. Owning a dog therefore makes people healthier, and doctors should encourage their patients to get one.'",
        steps: [
          "Conclusion: owning a dog makes people healthier (a causal claim). Evidence: dog owners visit the doctor less (a correlation).",
          "Reverse cause: people who are already healthy and active are better able to take on a dog, so good health may lead to dog ownership.",
          "Third factor: having more free time or a house with a garden may make people both more likely to own a dog and less stressed.",
          "So the argument treats a link as a cause and ignores these other explanations.",
        ],
        answer: "It assumes that a correlation between dog ownership and fewer doctor visits shows that dogs cause better health.",
      },
      selfCheckExample: {
        prompt:
          "Children whose families eat dinner together most evenings get into trouble at school less often than children whose families rarely do. Clearly, eating together makes children behave better, so schools should urge parents to have family meals.\n\nWhich one of the following identifies the flaw in the above argument?",
        options: [
          "It ignores the possibility that families who often eat together differ in other ways that also affect children's behaviour.",
          "It assumes that all children eat their evening meal at home.",
          "It attacks parents who do not eat with their children instead of considering their reasons.",
          "It assumes that schools are responsible for how children behave at home.",
          "It relies on a survey of only a small number of families.",
        ],
        steps: [
          "The evidence is a link between family meals and behaviour; the conclusion is that meals cause the behaviour. A names the gap: something else (time, routines, family stability) may produce both.",
          "B is not needed: the argument works even if some children eat elsewhere. C describes an attack on people, which the passage does not make.",
          "D misreads the passage, which is about behaviour at school. E invents a detail: the passage never says how many families were studied.",
        ],
        answer: "(A) It ignores the possibility that families who often eat together differ in other ways that also affect children's behaviour.",
      },
      practiceSet: [
        {
          prompt:
            "'Since the new coach arrived, the team has lost five games in a row. She is making the team worse.' Name the flaw.",
          answer: "Post hoc: assuming that what came after was caused by what came before.",
        },
        {
          prompt: "Sales of ice cream and the number of drownings both rise in summer. What best explains the link?",
          answer: "A third factor: hot weather, which leads to both more ice cream and more swimming.",
        },
        {
          prompt:
            "'Confident pupils get better marks, so building confidence will raise marks.' Give a reverse-cause explanation.",
          answer: "Getting good marks may make pupils confident.",
        },
      ],
      traps: [
        {
          title: "A link is only a flaw when the conclusion claims a cause",
          body: "If the passage says only that two things are linked, or that one may contribute to the other, it has not confused correlation with causation. Check the wording of the conclusion before choosing that option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-sample-flaws",
      name: "Generalising from a small or unrepresentative sample",
      intuition:
        "A conclusion about a whole group needs evidence from a fair slice of that group. One striking case, a handful of people, or people who chose to answer a survey can all give a false picture, however large the numbers look.",
      definition:
        "Ask two questions: **who was studied**, and **who is the conclusion about**? If they differ, there is a flaw.\n" +
        "- **Hasty generalisation**: a claim about all from one case or a few.\n" +
        "- **Unrepresentative sample**: the people studied differ from the group in the conclusion (one city, one age group, members of a club, readers of one website).\n" +
        "- **Self-selection**: people who choose to reply to a survey often have strong views.\n" +
        "- **Anecdote against statistics**: one personal story set against evidence about many people.\n" +
        "- A large sample does **not** fix a biased one.",
      authoredExample: {
        prompt:
          "Name the flaw. 'A cooking website asked its readers whether they would pay more for organic vegetables. Of the 4,000 readers who replied, 3,000 said yes. So three quarters of the country's shoppers would pay more for organic food.'",
        steps: [
          "Check the arithmetic: \\(3000/4000 = 0.75\\), so three quarters of those who replied said yes. The figure itself is right.",
          "Who was studied: readers of a cooking website, and only those who chose to reply. Who is the conclusion about: all the country's shoppers.",
          "People who read a cooking website are probably more interested in food than average, and people who bother to reply often feel strongly. The sample is not typical.",
          "The large number (4,000) does not help, because the bias is in who answered, not in how many.",
        ],
        answer: "It generalises from a self-selected group of food enthusiasts to all shoppers.",
      },
      selfCheckExample: {
        prompt:
          "Last winter my neighbour took a vitamin C tablet every day and did not catch a single cold. My brother took nothing and caught three colds. So vitamin C prevents colds, and everyone should take it in winter.\n\nWhich one of the following best identifies the flaw in the above argument?",
        options: [
          "It assumes that colds are always serious illnesses.",
          "It assumes that vitamin C tablets have no side effects.",
          "It attacks the brother rather than his reasons.",
          "It assumes that what happens in winter also happens in summer.",
          "It draws a general conclusion from the experience of only two people.",
        ],
        steps: [
          "The evidence is two people; the conclusion is about everyone. Two cases cannot show a general rule, and the two people may differ in many ways besides the tablets.",
          "A is not assumed: the argument does not say how serious colds are. B is not needed either: the claim that vitamin C prevents colds could hold even if the tablets had side effects.",
          "C is wrong: the brother is not criticised. D is wrong: the conclusion is only about winter.",
        ],
        answer: "(E) It draws a general conclusion from the experience of only two people.",
      },
      practiceSet: [
        {
          prompt:
            "A survey of gym members finds that 90% exercise every week. Does it follow that 90% of adults exercise every week?",
          answer: "No. Gym members are not typical adults.",
        },
        {
          prompt: "Can a very large sample fix a biased one?",
          answer: "No. The bias is in who is sampled, not in how many.",
        },
        {
          prompt:
            "'My grandfather ate fried food every day and lived to 98, so fried food does no harm.' Name the flaw.",
          answer: "Generalising from a single case (an anecdote).",
        },
      ],
      traps: [
        {
          title: "A big sample can still be a biased sample",
          body: "Thousands of replies sound convincing, but if the people who replied differ from the group in the conclusion, the result does not transfer. IMAT options that praise or attack the sample's size miss the real point: who was in it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-nec-suff",
      name: "Confusing necessary and sufficient conditions",
      intuition:
        "A necessary condition must be met for something to happen; a sufficient condition is enough on its own to make it happen. Having a ticket is necessary to see a concert, but it is not sufficient: the concert must also take place. Arguments that mix the two sound right and do not follow.",
      definition:
        "**Necessary**: B is necessary for A if A cannot happen without B. Signals: 'only if B', 'A requires B', 'without B, no A'.\n" +
        "- **Sufficient**: B is sufficient for A if B guarantees A. Signals: 'if B, then A', 'B is enough for A'.\n" +
        "- 'If A then B' makes A sufficient for B and B necessary for A.\n" +
        "- **Valid**: if A then B; A; so B. And: if A then B; not B; so not A.\n" +
        "- **Invalid (affirming the consequent)**: if A then B; B; so A.\n" +
        "- **Invalid (denying the antecedent)**: if A then B; not A; so not B.\n" +
        "- Meeting a necessary condition never guarantees the result.",
      authoredExample: {
        prompt:
          "Find the flaw. 'To board an international flight you must show a valid passport. Ravi has a valid passport, so he will be allowed to board his flight to Lisbon tomorrow.' Then compare: 'Mia was allowed to board her international flight, so she must have shown a valid passport.'",
        steps: [
          "'You must show a passport to board' makes the passport necessary for boarding.",
          "The first argument treats it as sufficient. Ravi may still be refused: no ticket, a late arrival, a missing visa. It affirms the consequent.",
          "The second argument goes the other way: boarding happened, and boarding requires a passport, so she had one. This is valid.",
        ],
        answer:
          "The first argument treats a necessary condition (a valid passport) as if it were sufficient; the second is valid.",
      },
      selfCheckExample: {
        prompt:
          "Every student who wins the school science prize has passed all of their exams. Lena has passed all of her exams, so she must be one of the students who will win the science prize.\n\nWhich one of the following best describes the flaw in the above argument?",
        options: [
          "It assumes that passing every exam is needed to win the prize.",
          "It assumes that the science prize is awarded every year.",
          "It treats a condition needed for winning the prize as if it were enough to win it.",
          "It generalises from one student to all students.",
          "It attacks Lena's character instead of considering her results.",
        ],
        steps: [
          "Form: every prize-winner passed all exams (if prize, then passed). Lena passed, so she wins the prize. That is affirming the consequent.",
          "Passing everything is necessary for the prize, but many students may pass everything and only a few win. C names this.",
          "A is not a flaw: the passage states it as a premise. B and D describe things the argument does not do. E is wrong: nothing about Lena is attacked.",
        ],
        answer: "(C) It treats a condition needed for winning the prize as if it were enough to win it.",
      },
      practiceSet: [
        {
          prompt: "'If it is raining, the pitch is wet. The pitch is wet.' Does it follow that it is raining?",
          answer: "No (affirming the consequent): the sprinklers may have been on.",
        },
        {
          prompt: "'If it is raining, the pitch is wet. The pitch is dry.' What follows?",
          answer: "It is not raining.",
        },
        {
          prompt: "In 'You can vote only if you are 18 or over', which condition is necessary?",
          answer: "Being 18 or over is necessary for voting.",
          method: "'Only if' introduces the necessary condition",
        },
      ],
      traps: [
        {
          title: "'Only if' introduces the necessary condition",
          body: "'You may enter only if you have a ticket' means a ticket is necessary, not that having one lets you in. Students often read 'only if' as 'if' and then accept a conclusion that does not follow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-named-flaws",
      name: "Other named flaws: attacking the person, straw man, false choice and more",
      intuition:
        "These flaws do not misread evidence; they replace reasoning with something else. They attack the speaker, distort the other side's view, pretend there are only two options, or quietly assume what they set out to prove. Learn each name together with the plain description IMAT would use in an option.",
      definition:
        "Each flaw, with how IMAT would describe it:\n" +
        "- **Ad hominem**: attacks the person's motive, character or habits instead of their reasons. 'It attacks the speaker rather than her argument.'\n" +
        "- **Straw man**: misrepresents the opposing view as weaker or more extreme, then attacks that version.\n" +
        "- **False dichotomy (false choice)**: presents two options as the only ones when there are others.\n" +
        "- **Slippery slope**: claims one step will lead, through a chain of unsupported steps, to an extreme result.\n" +
        "- **Circular reasoning**: the conclusion is already assumed in the premises.\n" +
        "- **Appeal to authority**: true because an expert said so, especially an expert in another field.\n" +
        "- **Appeal to popularity**: true or right because many people believe or do it.",
      authoredExample: {
        prompt:
          "Name the two flaws. 'Dr Ferri argues that energy drinks should not be sold to under-16s because of their high caffeine content. But Dr Ferri herself drinks several cups of strong coffee a day, so we need not take her argument seriously. Besides, if we ban energy drinks for teenagers, the next step will be banning coffee, chocolate and cola for everyone.'",
        steps: [
          "Sentence 2 rejects the argument because of Dr Ferri's own habits. Her coffee drinking says nothing about whether caffeine harms under-16s. This is ad hominem.",
          "Sentence 3 claims one ban will lead to bans on many foods for everyone, with no reason given for any step in the chain. This is a slippery slope.",
          "Neither part addresses her actual reason: the caffeine content and its effect on young people.",
        ],
        answer: "Ad hominem (sentence 2) and slippery slope (sentence 3).",
      },
      selfCheckExample: {
        prompt:
          "Supporters of a longer school day say it would give pupils more time for sport and music. What they really want is for children to spend every waking hour at school, away from their families. Either we keep the school day as it is, or we let schools take over family life entirely. Since no parent wants the second, the school day must stay as it is.\n\nWhich one of the following identifies a flaw in the above argument?",
        options: [
          "It assumes that sport and music are not already taught in schools.",
          "It presents the supporters' proposal as far more extreme than it is, and then rejects that version.",
          "It relies on the opinion of an expert speaking outside their field.",
          "It confuses a cause with an effect.",
          "It assumes that what is true of one school is true of all schools.",
        ],
        steps: [
          "The supporters asked for more time for sport and music; the author recasts this as 'every waking hour at school'. That is a straw man, which B describes.",
          "The passage also offers a false choice (keep the day or lose family life), but no option names it, so B is the answer.",
          "A, C, D and E describe flaws the passage does not contain: no expert is cited, no cause is claimed, and no single school is used as evidence.",
        ],
        answer: "(B) It presents the supporters' proposal as far more extreme than it is, and then rejects that version.",
      },
      practiceSet: [
        {
          prompt: "'Everyone in my class uses this revision app, so it must be the best one.' Name the flaw.",
          answer: "Appeal to popularity.",
        },
        {
          prompt:
            "'The report is reliable because its authors are trustworthy, and we know the authors are trustworthy because their report is reliable.' Name the flaw.",
          answer: "Circular reasoning.",
        },
        {
          prompt: "'Either we build the new shopping centre or the town will die.' Name the flaw.",
          answer: "False dichotomy (false choice).",
        },
      ],
      traps: [
        {
          title: "Citing an expert is not automatically a flaw",
          body: "Relying on a relevant expert is normal and reasonable. It becomes a flaw when the expert speaks outside their field, or when the claim rests on authority alone with no reason given. Do not choose 'appeal to authority' just because a scientist is mentioned.",
        },
      ],
    },
  ],
};
