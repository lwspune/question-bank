import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Argument Structure",
  title: "Parts of an Argument and the Main Conclusion",
  oneLineDefinition:
    "An argument is a claim plus the reasons given for it; every critical thinking question starts by telling the two apart.",
  whyItMatters:
    "Main conclusion questions were the most regular single type in the Cambridge papers, asked 20 times between 2012 and 2022. Every other question type in this chapter starts with the same skill: finding the claim and the reasons that support it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-parts",
      name: "Parts of an argument: premises, conclusions and indicator words",
      intuition:
        "An argument tries to make you accept a claim by giving you reasons. To work on any argument you first have to label its sentences: which one is the claim, which ones are the reasons, and which ones are only background. Indicator words help, but the real test is which sentence the others are there to support.",
      definition:
        "An **argument** gives reasons to accept a claim.\n" +
        "- **Premise**: a reason given in support. Often follows because, since, as, given that, for.\n" +
        "- **Conclusion**: the claim the reasons support. Often follows therefore, so, thus, hence, consequently, it follows that; often a recommendation with should, must or ought.\n" +
        "- **Intermediate conclusion**: a claim that is supported by premises and in turn supports the main conclusion.\n" +
        "- **Counter-argument**: a view the author reports in order to reject it, often after 'some people say' or 'it is claimed', with the author's reply after 'but' or 'however'.\n" +
        "- **Evidence and examples**: facts, figures and cases. They work as premises.\n" +
        "- **Background**: sentences that set the scene but give no reason. Not every sentence is a premise.\n" +
        "- The **therefore test**: read 'A, therefore B'. If it makes sense and the reverse 'B, therefore A' does not, then A supports B.",
      authoredExample: {
        prompt:
          "Label every part of this argument. 'Some residents say the town's outdoor swimming pool should close in winter, because few people swim in the cold. However, the pool is heated, and last winter the school swimming teams trained in it every weekday morning. Since the teams have no other pool within an hour's drive, closing it would stop their training for four months. The pool therefore serves the schools' sport all year round. So the council should keep it open through the winter.'",
        steps: [
          "Sentence 1 begins 'Some residents say': it reports a view, and the next sentence opens with 'However'. It is a counter-argument the author goes on to reject.",
          "Sentence 2 gives two facts (the pool is heated; the teams used it every weekday). These are premises.",
          "Sentence 3: 'the teams have no other pool' is a premise (after 'since'). 'Closing it would stop their training' is a claim supported by that premise, so it is an intermediate conclusion.",
          "Sentence 4 contains 'therefore', but it is not the end of the argument: it is supported by sentences 2 and 3 and it supports sentence 5. It is another intermediate conclusion.",
          "Sentence 5 is a recommendation ('should') that nothing else in the passage depends on. Therefore test: 'The pool serves the schools' sport all year, therefore the council should keep it open' reads well; the reverse does not. This is the main conclusion.",
        ],
        answer:
          "Counter-argument: sentence 1. Premises: the pool is heated, the teams used it, they have no other pool. Intermediate conclusions: closing it would stop their training; the pool serves school sport all year. Main conclusion: the council should keep it open in winter.",
      },
      selfCheckExample: {
        prompt:
          "A bakery throws away about a fifth of its bread every evening. Bread that is one day old is still safe to eat and tastes almost as good when toasted. Many shoppers on low incomes say they would buy it if it were cheaper. Selling yesterday's bread at half price would therefore bring in money from loaves that now earn nothing. The bakery should start selling its day-old bread at a discount.\n\nWhich one of the following best describes the role of the statement 'Selling yesterday's bread at half price would therefore bring in money from loaves that now earn nothing' in the argument above?",
        options: [
          "It is the main conclusion of the argument.",
          "It is a counter-argument that the author rejects.",
          "It is an intermediate conclusion that supports the main conclusion.",
          "It is a premise given as background, not supported by anything else.",
          "It is an example that illustrates the main conclusion.",
        ],
        steps: [
          "The statement contains 'therefore' and is supported by earlier sentences (the bread is still good, shoppers would buy it), so it is a conclusion of some kind.",
          "It is not the end of the argument: it is the reason for the recommendation in the last sentence. 'It would bring in money, therefore the bakery should sell it' reads well. So it is an intermediate conclusion.",
          "A is the trap set by the word 'therefore'; the main conclusion is the last sentence. D is wrong because the statement is supported by other sentences. B is wrong because the author never rejects it. E is wrong because it is a general claim, not a particular case.",
        ],
        answer: "(C) It is an intermediate conclusion that supports the main conclusion.",
      },
      practiceSet: [
        {
          prompt:
            "Find the conclusion: 'Since the river has flooded twice this year, the path beside it is often unusable. The council should move the path to higher ground.'",
          answer: "The council should move the path to higher ground.",
          method: "A recommendation ('should') supported by the flood facts",
        },
        {
          prompt:
            "In 'Critics claim that reading on screens harms memory, but the studies they cite tested only adults over seventy', what is the role of the first clause?",
          answer: "A counter-argument that the author goes on to attack.",
          method: "'Critics claim' reports a view; 'but' introduces the reply",
        },
        {
          prompt: "Name three words that often introduce a premise.",
          answer: "Because, since, as (also given that, for).",
        },
        {
          prompt: "Must every sentence in an argument be either a premise or a conclusion?",
          answer: "No. Some sentences are only background or context.",
        },
      ],
      traps: [
        {
          title: "'Therefore' does not always mark the main conclusion",
          body: "An indicator word shows that a sentence is a conclusion, but it may be an intermediate one that goes on to support something else. The main conclusion is the claim that supports nothing further, and it can sit in the first sentence with no indicator word at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-main-conclusion",
      name: "Identifying the main conclusion of an argument",
      intuition:
        "IMAT builds the five options for a main conclusion question out of the passage itself: a premise, an intermediate conclusion, the view the author rejects, a claim slightly stronger than the passage, and the right answer. So you are not looking for something true. You are looking for the one claim that everything else in the passage is there to support.",
      definition:
        "The **main conclusion** is the claim the whole passage is trying to make you accept. It is supported by the other sentences and supports none of them.\n" +
        "- It can appear anywhere: first sentence, middle or last.\n" +
        "- It is often a recommendation (should, must, ought) or an overall judgement.\n" +
        "- **Method**: list the claims; run the therefore test between them; the one that comes after every 'therefore' is the main conclusion.\n" +
        "- The right option says the same thing **with the same strength**: not stronger (all, always, must), not narrower, not a different topic.\n" +
        "- Wrong options are usually a premise, an intermediate conclusion, the rejected counter-argument, or an overstatement.",
      authoredExample: {
        prompt:
          "Find the main conclusion. 'Offices should not rush to replace every chair with a standing desk. It is true that sitting for many hours is linked to back pain and poor circulation. But standing still for long periods brings its own problems, such as sore feet and swollen legs. What seems to help most is changing position often, and an ordinary desk with short regular walks allows that at almost no cost. A standing desk on its own does not.'",
        steps: [
          "Sentence 1 is a recommendation with no indicator word. Keep it as a candidate.",
          "Sentence 2 begins 'It is true that': the author concedes a point to the other side before answering it.",
          "Sentences 3, 4 and 5 give reasons: standing still causes problems, changing position helps, an ordinary desk allows that cheaply, a standing desk alone does not.",
          "Therefore test: 'Standing still has its own problems and changing position is what helps, therefore offices should not rush to replace every chair.' This reads well. The reverse does not.",
          "So the first sentence is the main conclusion. 'Changing position often helps most' is a premise, however important it sounds.",
        ],
        answer: "Offices should not rush to replace every chair with a standing desk.",
      },
      selfCheckExample: {
        prompt:
          "Primary schools should set much less homework. Studies of children under eleven find almost no link between time spent on homework and later test results. Meanwhile, long evening tasks cut into sleep, play and family time, all of which young children need in order to develop well. So, for this age group, heavy homework has real costs and few proven benefits. Some parents worry that their children would fall behind, but the research gives no sign of that.\n\nWhich one of the following best expresses the main conclusion of the above argument?",
        options: [
          "For young children, heavy homework has real costs and few proven benefits.",
          "Primary schools should set much less homework.",
          "Children under eleven do not need homework to do well in tests.",
          "Sleep, play and family time are what young children need to develop well.",
          "Children who are given less homework will not fall behind.",
        ],
        steps: [
          "The claims: schools should set less homework (sentence 1); homework has costs and few benefits (sentence 4, after 'So'); the rest are reasons or a reply to parents.",
          "Therefore test: 'Heavy homework has costs and few benefits, therefore schools should set much less.' This works, so sentence 4 is an intermediate conclusion and sentence 1 is the main conclusion.",
          "A is the intermediate conclusion, tempting because of 'So'. C and D restate premises (C also overstates them). E is the author's reply to the counter-argument, and stronger than 'no sign of that'.",
        ],
        answer: "(B) Primary schools should set much less homework.",
      },
      practiceSet: [
        {
          prompt:
            "Find the main conclusion: 'Hand-written notes help students remember lectures better than typed ones. Writing by hand is slower, so students must summarise rather than copy. Summarising makes them think about the meaning.'",
          answer: "Hand-written notes help students remember lectures better than typed ones.",
          method: "The other two sentences explain why this is so",
        },
        {
          prompt: "A sentence is supported by two facts and is itself a reason for the final recommendation. What is it called?",
          answer: "An intermediate conclusion.",
        },
        {
          prompt:
            "A passage concludes 'Cities should plant more shade trees'. Why is the option 'Cities must plant shade trees on every street' wrong?",
          answer: "It is stronger than the passage's conclusion ('must', 'every street').",
        },
      ],
      traps: [
        {
          title: "The last sentence is not always the conclusion",
          body: "Writers often state their conclusion first and then defend it, or put it in the middle. Find it by the therefore test, never by position.",
        },
        {
          title: "The intermediate conclusion is the favourite wrong answer",
          body: "It is a conclusion, it often follows 'so' or 'therefore', and it sounds important. But it is used as a reason for something further. If you can put 'therefore' after it and reach another claim in the passage, it is not the main conclusion.",
        },
      ],
    },
  ],
};
