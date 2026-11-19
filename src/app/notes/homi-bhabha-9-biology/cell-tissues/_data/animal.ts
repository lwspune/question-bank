import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CT_ANIMAL_NOTE: SubtopicNote = {
  subtopicName: "Animal Tissues",
  title: "Animal Tissues",
  oneLineDefinition:
    "Animal tissues are of four kinds: epithelium covers and lines, connective tissue joins and supports, muscle moves, and nerve tissue carries messages.",
  whyItMatters:
    "Six questions in the bank, four EASY and two MODERATE. Three are about connective tissue and epithelium (cartilage in the nose, the kind of tissue cartilage is, the tissue missing from a blood vessel), two sort the muscles into voluntary and involuntary, and one picks the smallest human cell from four drawings.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ctan-connective",
      name: "Epithelial and connective tissue",
      intuition:
        "Epithelium is the body's wallpaper: it covers the outside and lines every tube and hollow inside. Connective tissue is the body's glue and scaffolding: bone and cartilage hold you up, tendons and ligaments tie the parts together, and blood links every organ to every other.",
      definition:
        "- **Epithelial tissue** covers the body and lines its organs. Its cells sit close together with no spaces.\n" +
        "- **Squamous epithelium** (flat cells): one layer lines **blood vessels** and the air sacs of the lungs; many layers (**stratified** squamous) form the **skin** and line the **mouth** and food pipe.\n" +
        "- **Cuboidal** epithelium lines kidney tubules and glands; **columnar** lines the intestine; **ciliated** lines the windpipe.\n" +
        "- **Connective tissue** joins and supports: **bone**, **cartilage**, **blood**, **areolar** tissue (fills spaces between organs and under the skin), **adipose** (fat), **tendons** and **ligaments**.\n" +
        "- **Cartilage** is firm but bends: it is found at the **tip of the nose**, in the **outer ear**, in the windpipe rings and at the ends of bones in joints.\n" +
        "- A **blood vessel** wall has squamous epithelium inside, then **smooth muscle** and **connective tissue**.",
      table: {
        columns: ["Connective tissue", "Where it is", "What it does"],
        rows: [
          { cells: ["Bone", "Skeleton", "Hard support and shape"] },
          { cells: ["Cartilage", "Tip of the nose, outer ear, ends of bones", "Firm support that can bend"] },
          { cells: ["Tendon", "Between a muscle and a bone", "Joins muscle to bone"] },
          { cells: ["Ligament", "Between two bones at a joint", "Joins bone to bone"] },
          { cells: ["Areolar tissue", "Under the skin, between organs", "Fills spaces and holds organs in place"] },
          { cells: ["Adipose tissue", "Under the skin, around the kidneys", "Stores fat and keeps the body warm"] },
          { cells: ["Blood", "Heart and blood vessels", "Carries food, gases and wastes"] },
        ],
        caption: "Cartilage, bone and blood look nothing alike, but all three are connective tissues.",
      },
      selfCheckExample: {
        prompt: "You can bend the top of your ear, but it springs back into shape. Which tissue gives it this firm but flexible support?",
        steps: ["Bone cannot bend; a tissue that is firm yet bends is cartilage."],
        answer: "Cartilage",
      },
      practiceSet: [
        { prompt: "Which tissue joins a muscle to a bone?", answer: "A tendon" },
        { prompt: "Which kind of epithelium forms the outer layer of the skin?", answer: "Stratified squamous epithelium" },
        { prompt: "To which group of tissues does blood belong?", answer: "Connective tissue" },
        { prompt: "Which tissue joins one bone to another at a joint?", answer: "A ligament" },
      ],
      pyqExampleId: "34121b1a-2b05-4cbe-930d-258126154557",
      traps: [
        {
          title: "Thinking the tip of the nose is bone",
          body: "The tip of the nose bends, so it is supported by cartilage. Only its upper part, the bridge, has bone.",
        },
        {
          title: "Swapping tendon and ligament",
          body: "A tendon joins muscle to bone; a ligament joins bone to bone.",
        },
        {
          title: "Lining blood vessels with stratified epithelium",
          body: "Blood vessels are lined by a single thin layer of squamous epithelium. Many-layered (stratified) epithelium is found where there is wear, as in the skin and mouth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ctan-muscle",
      name: "Muscle tissue and special cells of the body",
      intuition:
        "You choose when to lift your arm, but you cannot tell your stomach to stop churning or your heart to stop beating. That is the line between voluntary muscle, which obeys you, and involuntary muscle, which works on its own. Heart muscle is special: striped like the muscles of the arm, but working on its own like the stomach.",
      definition:
        "- **Striated (skeletal) muscle**: **voluntary**, attached to **bones**. Long, cylindrical, striped cells with many nuclei. Moves the **arms and legs** in walking and running.\n" +
        "- **Smooth (unstriated) muscle**: **involuntary**. Spindle-shaped cells with one nucleus. In the walls of the **stomach, intestine, blood vessels** and the iris; it moves food along the alimentary canal.\n" +
        "- **Cardiac muscle**: **involuntary** but striated, with branched cells. Found only in the **heart**; it contracts and relaxes all our life without tiring.\n" +
        "- **Nerve tissue**: the **nerve cell (neuron)** is the **longest** cell of the body. The **ovum** is the **largest** human cell, and school books give the **sperm** as the **smallest**.",
      table: {
        columns: ["Muscle", "Voluntary or involuntary", "Striped?", "Example of its work"],
        rows: [
          { cells: ["Skeletal (striated)", "Voluntary", "Yes", "Moving the arms and legs"] },
          { cells: ["Smooth (unstriated)", "Involuntary", "No", "Pushing food along the intestine; narrowing blood vessels"] },
          { cells: ["Cardiac", "Involuntary", "Yes", "Beating of the heart"] },
        ],
        caption: "The two involuntary muscles are cardiac and smooth.",
      },
      selfCheckExample: {
        prompt: "Which muscle tissue is striped like an arm muscle but works without our control?",
        steps: ["Arm muscle is striated and voluntary.", "The only striated muscle that works on its own is in the heart."],
        answer: "Cardiac muscle",
      },
      practiceSet: [
        { prompt: "Which kind of muscle moves food along the alimentary canal?", answer: "Smooth (unstriated) muscle" },
        { prompt: "Are the muscles of the legs voluntary or involuntary?", answer: "Voluntary: they are striated skeletal muscles" },
        { prompt: "Which is the longest cell in the human body?", answer: "The nerve cell (neuron)" },
        { prompt: "Which is the largest cell in the human body?", answer: "The ovum (egg cell)" },
      ],
      pyqExampleId: "58ebf16e-3b78-43a0-926e-41f8ec634627",
      traps: [
        {
          title: "Calling heart muscle voluntary because it is striped",
          body: "Cardiac muscle is striated but involuntary. Being striped does not mean it obeys your will.",
        },
        {
          title: "Calling the nerve cell the largest cell",
          body: "The nerve cell is the longest cell. The largest cell is the ovum.",
        },
        {
          title: "Putting smooth muscle in the limbs",
          body: "The arms and legs are moved by striated skeletal muscle. Smooth muscle is in the walls of the stomach, intestine and blood vessels.",
        },
      ],
    },
  ],
};
