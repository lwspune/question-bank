import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_FEELINGS_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Feelings and States of Mind",
  title: "Idioms for feelings and states of mind",
  oneLineDefinition:
    "Idioms that name a feeling or a state of mind: anger and fear, joy and sorrow, understanding and doubt, rest and health.",
  whyItMatters:
    "This is one of the largest families of idioms on the CDS paper. The options are usually a set of feelings, some pleasant and some unpleasant. " +
    "Decide first whether the idiom is pleasant or unpleasant, and part of the list goes at once. Then choose the exact feeling.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-anger",
      name: "Anger, fear and disgust",
      intuition:
        "Before you read the options, decide the idiom's **charge**. Is it a pleasant feeling (**positive**) or an unpleasant one (**negative**)? " +
        "'Up in arms' pictures people reaching for weapons, so it is negative, and every happy option goes at once. Then choose between the unpleasant feelings: anger, fear or disgust.",
      definition:
        "Two decisions, in this order:\n" +
        "- **Positive charge:** a pleasant feeling (happy, calm, proud).\n" +
        "- **Negative charge:** an unpleasant feeling (angry, afraid, disgusted, jealous).\n" +
        "- Fix the charge first, then the exact feeling: anger and anxiety are both negative, but they are different answers.\n" +
        "- The body picture often points to the feeling: nerves and jitters to fear, the stomach to disgust, the skin to irritation, a green eye to jealousy.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Have a conniption fit", "Become very angry or upset", "To be very sad", "2019 (II)"],
            pyqExampleId: "74d663ec-655f-4880-ba33-da0c0d37cfe4",
          },
          {
            cells: ["Up in arms", "Very angry and ready to protest", "Very satisfied", "2021 (I)"],
            pyqExampleId: "600c7a6a-1a7f-4860-aa87-680d3b027c4c",
          },
          {
            cells: ["Get the jitters", "Feel nervous and anxious", "Feeling exposed", "2020 (II)"],
            pyqExampleId: "4d43e971-2498-468e-8262-96d4578bf0ca",
          },
          {
            cells: ["Live on your nerves", "Be anxious all the time", "To be steely nerved", "2026 (II)"],
            pyqExampleId: "a991ae8d-3866-4d36-91a1-5eb88ad26e14",
          },
          {
            cells: ["Fall in a heap", "Lose control of your feelings; break down", "To be in control of one's feelings", "2019 (II)"],
            pyqExampleId: "a0162306-931e-4092-90c9-770cfdfdcd63",
          },
          {
            cells: ["Get under someone's skin", "Annoy or irritate someone badly", "To understand someone completely", "2025 (II)"],
            noteAmber: "The phrase can also mean that someone fascinates you, which is why two options talk about love. Its usual meaning, and the answer, is to annoy.",
            pyqExampleId: "6caee6b0-4c1a-4bce-a3ef-c97fcb3094e0",
          },
          {
            cells: ["Turn one's stomach", "Make someone feel sick with disgust", "Being plagued by a stomach upset", "2025 (I)"],
            pyqExampleId: "05ea3fa8-6bd3-43e9-be2e-4bca49096d45",
          },
          {
            cells: ["The green-eyed monster", "Jealousy", "Feeling bad about happenings", "2020 (I)"],
            pyqExampleId: "441ba65e-6706-430d-95d5-d194b19d52e9",
          },
        ],
        caption: "All eight carry a negative charge, so a happy or calm option is never the answer here.",
      },
      pyqExampleId: "600c7a6a-1a7f-4860-aa87-680d3b027c4c",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Have butterflies in one's stomach'. (a) feel hungry (b) feel nervous before something (c) feel sick after eating (d) feel very happy",
        steps: [
          "Charge: butterflies are pretty, but fluttering in the stomach is an uneasy feeling. Negative, so (d) goes.",
          "(a) and (c) take the stomach literally: out.",
          "The fluttering is the nervous feeling before an exam or a speech.",
        ],
        answer: "(b) feel nervous before something.",
      },
      practiceSet: [
        { prompt: "Positive or negative: 'get the jitters'?", answer: "Negative: it means feeling nervous." },
        { prompt: "Which idiom in the table names jealousy?", answer: "The green-eyed monster" },
        { prompt: "'Turn one's stomach': is the feeling anger or disgust?", answer: "Disgust" },
        {
          prompt: "Spot the wrong row: 'Fall in a heap' = to stay in control of one's feelings.",
          answer: "Wrong. It means to lose control of one's feelings.",
        },
      ],
      traps: [
        {
          title: "Options come in opposite pairs",
          body:
            "For **fall in a heap** the options included both 'to lose control of one's own feelings' and 'to be in control of one's own feelings'. For **live on your nerves**, 'to be continually anxious' sat beside 'to be steely nerved', which means calm under pressure. Decide the direction before you choose.",
        },
        {
          title: "The body part is not an illness",
          body:
            "**Turn one's stomach** means to disgust you. 'A stomach upset' is the literal reading. The body part names where the feeling is felt, not a disease.",
        },
        {
          title: "Same charge, different feeling",
          body:
            "**The green-eyed monster** is jealousy, not general sadness ('feeling bad about happenings'). **A conniption fit** is anger, not sorrow. Once the charge is fixed, name the exact feeling.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-joy",
      name: "Joy, sorrow and surprise",
      intuition:
        "These idioms often tell you how strong a feeling is: not just happy but 'in seventh heaven', not just sad but 'with a heavy heart'. " +
        "Some look happy and carry a warning: a 'fool's paradise' is happiness built on not seeing the truth.",
      definition:
        "What to check:\n" +
        "- Fix the charge, then the strength: seventh heaven is **extreme** joy.\n" +
        "- **Surprise** idioms describe a reaction to something unexpected: raised eyebrows, 'what a small world!'.\n" +
        "- A paradise that belongs to a fool is not real happiness: the idiom criticises someone who will not face a bad truth.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Be in seventh heaven", "Be extremely happy", "To be extremely adventurous", "2019 (II)"],
            pyqExampleId: "5d0f8322-5a91-412c-8047-8d21f0d552a2",
          },
          {
            cells: ["With a heavy heart", "With sadness and regret", "With heavy weight", "2020 (II)"],
            pyqExampleId: "ca22ad63-2c88-42ef-9e3c-eed96b26c219",
          },
          {
            cells: ["Live in a fool's paradise", "Be happy only because you refuse to see how bad things are", "To believe that things you want will happen", "2019 (I)"],
            pyqExampleId: "baba5726-0cc2-4ac3-99a9-d517da5b967d",
          },
          {
            cells: ["Raise eyebrows", "Cause or show surprise", "Criticize", "2018 (I)"],
            pyqExampleId: "4ed96343-a838-48ea-b7cd-fa35bbff3e5a",
          },
          {
            cells: ["What a small world!", "What a coincidence (said on meeting someone you know in an unexpected place)", "What a narrow space", "2018 (I)"],
            pyqExampleId: "4241c5b2-2d1c-4088-ad53-33bb6752ff71",
          },
        ],
      },
      pyqExampleId: "5d0f8322-5a91-412c-8047-8d21f0d552a2",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Down in the dumps'. (a) working at a rubbish site (b) feeling sad and low (c) very surprised (d) extremely happy",
        steps: [
          "Charge: 'down' points to a low, unpleasant feeling. (d) goes.",
          "(a) takes 'dumps' as a place for rubbish: that is the picture.",
          "Surprise (c) is not about being low. The feeling is sadness.",
        ],
        answer: "(b) feeling sad and low.",
      },
      practiceSet: [
        { prompt: "Which idiom in the table shows surprise with a part of the face?", answer: "Raise eyebrows" },
        { prompt: "'With a heavy heart': pleasant or unpleasant?", answer: "Unpleasant: with sadness and regret." },
        {
          prompt: "Spot the wrong row: 'Live in a fool's paradise' = to spend a lot of money on pleasures.",
          answer: "Wrong. It means to be happy only because you refuse to see how bad things are.",
        },
        {
          prompt: "When do people say 'What a small world!'?",
          answer: "When they meet someone they know in an unexpected place: a coincidence.",
        },
      ],
      traps: [
        {
          title: "A fool's paradise is not hope",
          body:
            "'To believe that things you want will happen' is wishful thinking. **A fool's paradise** adds the key part: the person is happy **because** they will not accept how bad the situation really is.",
        },
        {
          title: "Heavy is not about weight",
          body:
            "**With a heavy heart** means with sadness and regret. 'With heavy weight' is the literal picture; reject it.",
        },
        {
          title: "Small world, not small space",
          body:
            "**What a small world!** is said about a surprising coincidence. 'What a narrow space' reads the words literally.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-mind",
      name: "Understanding, belief and what lies beneath",
      intuition:
        "Several idioms say that something cannot be understood: it is 'Greek to me', it is 'over my head', I am 'at sea'. " +
        "Others are about belief ('I don't buy it') or a hidden side ('more than meets the eye'). Read the options for the exact state of mind: not understanding is not the same as not believing.",
      definition:
        "Sort the idiom into one box:\n" +
        "- **Not understanding:** at sea, all Greek to me, over one's head.\n" +
        "- **Not believing:** I don't buy it.\n" +
        "- **Hidden depth:** more than meets the eye.\n" +
        "- **Plain reality:** life in the raw.\n" +
        "- Keep understand, believe, accept and recognise apart: CDS has put all four in a single question.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["At sea", "Confused; not knowing what to do", "Relaxed", "2023 (II)"],
            pyqExampleId: "f8568e5d-64ac-4e9b-a228-c8bc61186283",
          },
          {
            cells: ["It's all Greek to me", "I cannot understand it at all", "Something which I don't recognize", "2023 (II), 2026 (I)"],
            noteAmber: "Asked twice. Greek stands for a language you cannot read, so the point is understanding, not recognising or finding it foreign.",
            pyqExampleId: "811f9d3f-0ec7-42e1-bda9-53f641817c74",
          },
          {
            cells: ["Over one's head", "Too hard for someone to understand", "Bypassing authority secretly", "2026 (II)"],
            noteAmber: "'Go over someone's head' (go to a higher authority) is a different idiom.",
            pyqExampleId: "771a4764-76dd-4703-bf92-fe8fd986df57",
          },
          {
            cells: ["I don't buy it", "I don't believe it", "I have no money", "2018 (I)"],
            pyqExampleId: "edc72034-96dc-4884-b5cf-a2716ee6da33",
          },
          {
            cells: ["More than meets the eye", "A hidden meaning or importance beyond what is obvious", "A beautiful spectacle before one's eyes", "2026 (I)"],
            pyqExampleId: "c5317ccd-7f92-4f1e-a269-916b59fbd202",
          },
          {
            cells: ["Life in the raw", "Life as it really is, hard and unpolished", "Life at its easiest", "2021 (II)"],
            pyqExampleId: "7fc41caf-34b1-4529-8f57-aaca0cc6c72f",
          },
        ],
      },
      pyqExampleId: "771a4764-76dd-4703-bf92-fe8fd986df57",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Take it with a pinch of salt'. (a) add flavour to it (b) believe it only partly (c) understand it easily (d) reject it angrily",
        steps: [
          "Box: this is about belief, not understanding. (c) goes.",
          "(a) is the cooking picture: out.",
          "A pinch is a small amount: you keep a little doubt. That is partial belief, not angry rejection.",
        ],
        answer: "(b) believe it only partly.",
      },
      practiceSet: [
        { prompt: "Not understanding or not believing: 'I don't buy it'?", answer: "Not believing" },
        { prompt: "Which idiom in the table says something has a hidden side?", answer: "More than meets the eye" },
        { prompt: "'He was at sea in his new job.' How did he feel?", answer: "Confused and unsure what to do" },
        {
          prompt: "Spot the wrong row: 'Life in the raw' = life at its easiest.",
          answer: "Wrong. It means life as it really is, hard and unpolished.",
        },
      ],
      traps: [
        {
          title: "Understand, believe, accept, recognise",
          body:
            "For **it is all Greek to me** the options were 'something which I don't believe / accept / recognize / understand'. Only the last fits. One verb is the whole question.",
        },
        {
          title: "Two idioms with 'head'",
          body:
            "Something **over your head** is too hard for you to understand. To **go over someone's head** is to go to their boss. An option about bypassing authority belongs to the second idiom.",
        },
        {
          title: "Buying is not about money",
          body:
            "**I don't buy it** means I don't believe it. 'I have no money' takes 'buy' literally.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-rest",
      name: "Rest, health and looks",
      intuition:
        "These idioms describe the body: resting after work, sleeping deeply, being well again, eating little, looking smart. " +
        "The trap is usually the opposite activity: working hard instead of relaxing, untidy instead of neat.",
      definition:
        "The groups:\n" +
        "- **Rest:** wind down, mellow out (relax, take it easy).\n" +
        "- **Sleep:** be out for the count (deeply asleep; also knocked out).\n" +
        "- **Health:** as right as rain (fully well again).\n" +
        "- **Eating and looks:** eat like a bird (eat very little), spiff up (make yourself look neat and smart).\n" +
        "- Decide the direction first: more activity or less? Neat or untidy?",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Wind down", "Relax after a busy period", "Act furiously after a period of silence", "2021 (I)"],
            pyqExampleId: "f429dc98-58b4-464c-8824-3997a34cd2c6",
          },
          {
            cells: ["Mellow out", "Relax and take things easy", "Work hard and do a lot", "2021 (I)"],
            pyqExampleId: "aa7bf5cd-8d6a-441d-80ae-b3c5d149a8e0",
          },
          {
            cells: ["Be out for the count", "Be deeply asleep (or knocked out)", "Counting money carefully", "2022 (I)"],
            noteAmber: "From boxing: a fighter who is down and cannot rise before the referee counts ten.",
            pyqExampleId: "240ad819-779a-485f-84dd-1347f1fc0985",
          },
          {
            cells: ["As right as rain", "Fully well in body and mind again", "To be physically active", "2023 (II)"],
            pyqExampleId: "13c49b18-7bff-45d5-a24c-97d7576788fc",
          },
          {
            cells: ["Eat like a bird", "Eat very little", "Eat fast", "2020 (I)"],
            pyqExampleId: "dc8d9602-3ffd-4269-8e30-670007b33f23",
          },
          {
            cells: ["Spiff up", "Make yourself look neat and smart", "Make oneself look untidy", "2021 (I)"],
            pyqExampleId: "35e9bb58-795a-48a7-9231-ef36a407fbd4",
          },
        ],
      },
      pyqExampleId: "f429dc98-58b4-464c-8824-3997a34cd2c6",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'As fit as a fiddle'. (a) very healthy (b) good at music (c) very thin (d) nervous",
        steps: [
          "Box: this is a health idiom.",
          "(b) takes the fiddle (a violin) literally: out.",
          "A well-tuned fiddle is in perfect order, and so is the person.",
        ],
        answer: "(a) very healthy.",
      },
      practiceSet: [
        { prompt: "'Eat like a bird': a lot or very little?", answer: "Very little" },
        { prompt: "You 'spiff up' before an interview. What do you do?", answer: "Make yourself look neat and smart" },
        { prompt: "Which idiom in the table means fully well again?", answer: "As right as rain" },
        { prompt: "'Mellow out': relax, or work harder?", answer: "Relax" },
      ],
      traps: [
        {
          title: "Activity reversed",
          body:
            "**Mellow out** means to relax. 'To work hard and do much work' is its opposite. These idioms are about doing **less**, so an option about effort is a reversal.",
        },
        {
          title: "Counting is the picture",
          body:
            "**Out for the count** has nothing to do with counting money or steps. The count is the referee's count over a fallen boxer.",
        },
        {
          title: "Birds peck fast, but eat little",
          body:
            "**Eat like a bird** means to eat very little. 'Eat fast' comes from picturing a bird pecking, which is the wrong feature.",
        },
      ],
    },
  ],
};
