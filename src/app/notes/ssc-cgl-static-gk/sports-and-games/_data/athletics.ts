import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSP_ATHLETICS_NOTE: SubtopicNote = {
  subtopicName: "Athletics, Swimming and Combat Sports",
  title: "Athletics, Swimming and Combat Sports",
  oneLineDefinition:
    "Track distances, hurdles, lanes, relay zones and starts; the rules and techniques of the jumps and throws; swimming events; and the words and rules of judo, taekwondo, boxing and wrestling.",
  whyItMatters:
    "Twenty-two questions in the bank, twenty of them from the 2025 shifts and seven of them HARD. This is where SSC's newest questions sit: rulebook numbers and technique statements rather than names, so learn the numbers exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsspat-track",
      name: "Track events: distances, hurdles, lanes, relays and starts",
      intuition:
        "Track questions are numbers from the rulebook: the marathon distance, the number of hurdles, the width of a lane, the length of a relay zone. One number each, so learn them exactly.",
      definition:
        "The facts:\n" +
        "- The **marathon** is **42.195 km** (26 miles 385 yards).\n" +
        "- The **100 m, 110 m and 400 m hurdles** each have **10 hurdles** (flights).\n" +
        "- Every race **up to 400 m** is run in **separate lanes**, each **1.22 m** wide (up to about 1.25 m), marked by **5 cm** white lines.\n" +
        "- The **relay takeover zone**, where the baton changes hands, was traditionally **20 m** long, and still is in the **4 × 400 m**. Since **2018** it is **30 m** in the 4 × 100 m and 4 × 200 m.\n" +
        "- In the **bunch start**, a crouch start, the feet are close together: the toe of the rear foot is roughly level with the heel of the front foot.",
      table: {
        columns: ["Event or rule", "Answer"],
        rows: [
          { cells: ["Marathon distance", "42.195 km"] },
          { cells: ["Hurdles in the 110 m (and 100 m, 400 m) hurdles", "10"] },
          { cells: ["Lane width", "1.22 m, lines 5 cm"] },
          { cells: ["Takeover zone, 4 × 400 m relay", "20 m"] },
          { cells: ["Takeover zone, 4 × 100 m relay, since 2018", "30 m"] },
        ],
      },
      pyqExampleId: "f4648889-d7b7-4b43-a973-d6361d9bacdd",
      selfCheckExample: {
        prompt: "How many hurdles does a runner clear in the 400 m hurdles?",
        steps: ["All three hurdle races (100 m, 110 m and 400 m) have the same number of hurdles: ten."],
        answer: "10.",
      },
      practiceSet: [
        { prompt: "How long is a marathon?", answer: "42.195 km" },
        { prompt: "How long is the takeover zone in the 4 × 400 m relay?", answer: "20 m" },
        { prompt: "Since 2018, how long is the takeover zone in the 4 × 100 m relay?", answer: "30 m" },
        { prompt: "In the bunch start, where is the toe of the rear foot placed?", answer: "Roughly level with the heel of the front foot" },
      ],
      traps: [
        {
          title: "The marathon is not 42.5 km",
          body: "The marathon is exactly **42.195 km**. Options such as 42.5 km or 41.5 km are near misses.",
        },
        {
          title: "Two relay zone lengths",
          body: "The **4 × 400 m** zone is **20 m**; the **4 × 100 m** and 4 × 200 m zones are **30 m** since 2018. Check which relay the question names.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspat-field",
      name: "Jumps and throws",
      intuition:
        "Field questions ask a rule (runway length, attempts allowed, the landing sector) or a technique (which leg to take off from, which jump goes over backwards). Tie each word to its event.",
      definition:
        "**High jump**:\n" +
        "- The runway is at least **15 m** long. The crossbar is a round bar about **30 mm** across, usually of **fibreglass**: light, slightly flexible and safer than metal when an athlete lands on it.\n" +
        "- Techniques: the **scissors**, the **western roll**, the **straddle** and the **Fosbury Flop**, in which the jumper crosses the bar head first and back down and lands on the shoulders. Dick Fosbury made it famous at the 1968 Olympics.\n" +
        "- In the high jump and the **pole vault**, **three** failed attempts in a row put the athlete out.\n\n" +
        "**Long jump**: the approach run builds the greatest speed before the board, and the jumper takes off from the **stronger** leg.\n\n" +
        "**Throws**: a **javelin** must land inside the marked **landing sector** to count. The **glide** and the **spin** are **shot put** techniques (the discus is also thrown with a spin).",
      table: {
        columns: ["Event", "Rule or word", "Answer"],
        rows: [
          { cells: ["High jump", "Shortest runway allowed", "15 m"] },
          { cells: ["High jump", "Crossbar material", "Fibreglass: light, flexible, safer"] },
          { cells: ["High jump and pole vault", "Failures in a row that eliminate", "Three"] },
          { cells: ["Long jump", "Take-off leg", "The stronger leg"] },
          { cells: ["Javelin", "Where a valid throw lands", "Inside the landing sector"] },
          { cells: ["Shot put", "Two techniques", "Glide and spin"] },
        ],
      },
      pyqExampleId: "9fa81224-e13a-4f1e-bf13-c092220cf0fa",
      selfCheckExample: {
        prompt: "The glide and the spin are techniques of which throwing event?",
        steps: ["Both are ways of crossing the throwing circle before the release.", "They are the two techniques of the shot put."],
        answer: "The shot put.",
      },
      practiceSet: [
        { prompt: "After how many failed attempts in a row is a pole vaulter eliminated?", answer: "Three" },
        { prompt: "From which leg does a long jumper take off?", answer: "The stronger leg" },
        { prompt: "Where must a javelin land for the throw to count?", answer: "Inside the landing sector" },
        { prompt: "What is the shortest high jump runway the rules allow?", answer: "15 m" },
      ],
      traps: [
        {
          title: "Take off from the strong leg",
          body: "A long jumper drives off the **stronger** leg at take-off. A statement saying the **weaker** foot is used for balance is wrong.",
        },
        {
          title: "The crossbar is thin",
          body: "A high jump crossbar is about **30 mm** across. A statement giving 15 to 20 cm is far too thick.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspat-swim",
      name: "Swimming events and sculling",
      intuition:
        "Swimming questions ask which distances are swum in a 50 m pool and what a basic skill does. Learn the freestyle ladder and the medley order.",
      definition:
        "The facts:\n" +
        "- A **long-course** pool, the kind used at the Olympics and World Championships, is **50 m** long.\n" +
        "- At the long-course World Championships, men and women swim the same freestyle distances: **50, 100, 200, 400, 800 and 1500 m**.\n" +
        "- The **individual medley** (all four strokes in the order butterfly, backstroke, breaststroke, freestyle) is swum over **200 m and 400 m** in a 50 m pool; a 100 m medley exists only in 25 m pools.\n" +
        "- **Sculling** is a figure-of-eight movement of the hands **under water** that keeps a swimmer balanced and supported. Swimmers of every level use it, artistic swimmers above all.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Length of a long-course pool", "50 m"] },
          { cells: ["Freestyle distances, men and women", "50, 100, 200, 400, 800, 1500 m"] },
          { cells: ["Medley order", "Butterfly, backstroke, breaststroke, freestyle"] },
          { cells: ["Sculling", "Hands move under water to balance and support"] },
        ],
      },
      pyqExampleId: "5bbd08ce-79bf-4e64-a7ec-7747546340ca",
      selfCheckExample: {
        prompt: "In what order are the four strokes swum in an individual medley?",
        steps: ["The medley opens with butterfly and closes with freestyle.", "Backstroke and breaststroke come in between, in that order."],
        answer: "Butterfly, backstroke, breaststroke, freestyle.",
      },
      practiceSet: [
        { prompt: "How long is a long-course (Olympic) swimming pool?", answer: "50 m" },
        { prompt: "Which hand movement under water keeps a swimmer balanced and supported?", answer: "Sculling" },
        { prompt: "Which stroke is swum last in an individual medley?", answer: "Freestyle" },
        { prompt: "During sculling, are the swimmer's hands above or under the water?", answer: "Under the water" },
      ],
      traps: [
        {
          title: "Sculling is not only for beginners",
          body: "**Sculling** is used by swimmers of every level, artistic swimmers most of all. A statement that only beginners use it is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsspat-combat",
      name: "Judo, taekwondo, boxing and wrestling",
      intuition:
        "Combat-sport questions are statements built from a few named terms. Know what each Japanese or Korean word means and which result ends a judo bout.",
      definition:
        "**Judo**:\n" +
        "- Founded by **Jigoro Kano** in **Japan in 1882**; an **Olympic sport since Tokyo 1964**.\n" +
        "- An **ippon** (full point) wins the bout outright; **hansoku-make** (disqualification), the heaviest penalty, also ends it.\n" +
        "- **Shime-waza** are **strangles and chokes**; **kansetsu-waza** are **joint locks**. Striking and kicking are not allowed in competition.\n" +
        "- The contestant called **first wears white**, the second **blue**.\n" +
        "- The contest area is at least **8 m × 8 m**, with a safety area at least **3 m** wide around it; two mats side by side share a safety area of at least 3 m.\n" +
        "- Holders of the **6th to 8th dan** may wear a **red-and-white** belt.\n\n" +
        "**Taekwondo** (Korean): **Tae** means to strike with the foot, **Kwon** to strike with the hand, **Do** the way; a **dojang** is the training hall.\n\n" +
        "**Boxing**: **shadow boxing** and **mirror boxing** are training methods for technique.\n\n" +
        "**Freestyle wrestling**: a **takedown** (bringing the opponent down under control) scores technical points; fleeing the mat, holding the singlet and illegal holds are fouls.",
      table: {
        columns: ["Term", "Sport", "Meaning"],
        rows: [
          { cells: ["Ippon", "Judo", "Full point; wins the bout"] },
          { cells: ["Hansoku-make", "Judo", "Disqualification, the heaviest penalty"] },
          { cells: ["Shime-waza", "Judo", "Strangles and chokes"] },
          { cells: ["Kansetsu-waza", "Judo", "Joint locks"] },
          { cells: ["Dojang", "Taekwondo", "Training hall"] },
          { cells: ["Takedown", "Wrestling", "Bringing the opponent down; scores points"] },
        ],
      },
      pyqExampleId: "8a29035d-1dc7-4f4e-877a-8461264a9d3d",
      selfCheckExample: {
        prompt: "In judo, which two results end a bout at once?",
        steps: ["An ippon is a full point and wins outright.", "Hansoku-make is disqualification, which also ends the bout."],
        answer: "Ippon and hansoku-make.",
      },
      practiceSet: [
        { prompt: "Who founded judo?", answer: "Jigoro Kano, in Japan" },
        { prompt: "At which Olympics did judo first appear?", answer: "Tokyo 1964" },
        { prompt: "In judo, what colour does the contestant called first wear?", answer: "White" },
        { prompt: "In freestyle wrestling, which move scores technical points by bringing the opponent down under control?", answer: "A takedown" },
      ],
      traps: [
        {
          title: "Shime-waza are chokes, not arm locks",
          body: "**Shime-waza** are **strangles and chokes**. Arm and other joint locks are **kansetsu-waza**.",
        },
        {
          title: "Judo joined the Olympics in 1964",
          body: "Judo first appeared at the **Tokyo 1964** Olympics, not in 1965.",
        },
        {
          title: "Hansoku-make is the heaviest penalty",
          body: "**Hansoku-make** is **disqualification**, not a minor penalty.",
        },
      ],
    },
  ],
};
