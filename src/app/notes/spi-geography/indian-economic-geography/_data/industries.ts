import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_IG_INDUSTRIES_NOTE: SubtopicNote = {
  subtopicName: "Manufacturing Industries",
  title: "Manufacturing Industries",
  oneLineDefinition:
    "Industries are grouped by their raw material, their role and their owners; a factory is set up where raw material, power, labour, capital and markets come together.",
  whyItMatters:
    "Nine questions in the bank, six EASY and three MODERATE: whether an industry is agro based or mineral based, which industry uses bauxite and needs cheap power, where factories stood before independence, which industry makes telephones and computers, the country with the most spindles and who began Tata Steel.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiigin-classes",
      name: "How industries are classified",
      intuition:
        "An industry can be described by what it uses, what it does for other industries, who owns it and how heavy its goods are. Each question names one of these ways, so first see which way it is sorting.",
      definition:
        "- By **raw material**: **agro based** industries use farm produce (cotton, woollen, jute and silk textiles, rubber, sugar, tea, coffee, edible oil); **mineral based** industries use minerals (iron and steel, cement, aluminium, machine tools, petrochemicals).\n" +
        "- By **role**: **basic or key** industries supply other industries (iron and steel, copper and aluminium smelting); **consumer** industries make goods people use directly (sugar, toothpaste, paper, fans).\n" +
        "- By **ownership**: **public sector** (BHEL, SAIL), **private sector** (TISCO, Bajaj Auto, Dabur), **joint sector** (Oil India Ltd) and **cooperative sector** (sugar in Maharashtra, coir in Kerala).\n" +
        "- By **bulk**: **heavy** industries (iron and steel) and **light** industries (electrical goods).",
      table: {
        columns: ["Basis", "Kinds", "Examples"],
        rows: [
          { cells: ["Raw material", "Agro based", "Textiles, sugar, tea, coffee, edible oil"] },
          {
            cells: ["Raw material", "Mineral based", "Iron and steel, cement, aluminium, petrochemicals"],
            noteAmber: "Petrochemicals are mineral based: they come from petroleum.",
          },
          { cells: ["Role", "Basic (key), consumer", "Iron and steel is basic; toothpaste is consumer"] },
          { cells: ["Ownership", "Public, private, joint, cooperative", "SAIL public; TISCO private; Oil India joint; Maharashtra sugar cooperative"] },
          { cells: ["Bulk", "Heavy, light", "Iron and steel heavy; electrical goods light"] },
        ],
      },
      selfCheckExample: {
        prompt: "Is the iron and steel industry a basic industry or a consumer industry?",
        steps: ["A basic industry makes goods that other industries use.", "Steel goes into machines, buildings and tools made by other industries."],
        answer: "A basic (key) industry.",
      },
      practiceSet: [
        { prompt: "Is the sugar industry agro based or mineral based?", answer: "Agro based" },
        { prompt: "In which sector of ownership is SAIL?", answer: "Public sector" },
        { prompt: "Name an industry run in the cooperative sector.", answer: "Sugar in Maharashtra (or coir in Kerala)" },
        { prompt: "Is cement an agro based or a mineral based industry?", answer: "Mineral based" },
      ],
      pyqExampleId: "e151d73b-f8cc-4b64-b1ad-18a6cc7c7251",
      traps: [
        {
          title: "Calling textiles mineral based",
          body: "Textile mills use cotton, jute, silk and wool, all farm or animal produce, so the textile industry is agro based.",
        },
        {
          title: "Treating a cooperative as the opposite of agro based",
          body: "Cooperative is a kind of ownership; agro based is a kind of raw material. A sugar mill can be both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigin-location",
      name: "Where industries are set up",
      intuition:
        "A factory is built where it costs least to bring in what it needs and send out what it makes. For some industries one need outweighs the rest: aluminium smelting, for example, eats electricity.",
      definition:
        "- Industries are located where they get **raw material, labour, capital, power and a market**, helped by government policy.\n" +
        "- Before independence most factories stood in the port cities of **Mumbai, Kolkata and Chennai**, which suited overseas trade.\n" +
        "- **Aluminium smelting** uses **bauxite**. Its two prime location factors are a **regular supply of electricity** and an **assured source of raw material at minimum cost**.\n" +
        "- **Iron and steel** uses iron ore, coking coal and limestone, in a ratio of about 4 : 2 : 1.\n" +
        "- **Cement** needs bulky, heavy raw materials such as limestone, silica and gypsum.",
      table: {
        columns: ["Industry", "Raw material", "What decides its site"],
        rows: [
          {
            cells: ["Aluminium smelting", "Bauxite", "Regular electricity and cheap, assured raw material"],
            noteAmber: "Aluminium is made from bauxite, its ore.",
          },
          { cells: ["Iron and steel", "Iron ore, coking coal, limestone (about 4 : 2 : 1)", "Heavy raw materials, so near the mines"] },
          { cells: ["Cement", "Limestone, silica, gypsum", "Bulky raw materials"] },
        ],
        caption: "Before independence: Mumbai, Kolkata and Chennai, the port cities.",
      },
      selfCheckExample: {
        prompt: "Name the three main raw materials of the iron and steel industry.",
        steps: ["Iron comes from its ore.", "The ore is smelted with coke made from coal, and limestone is added."],
        answer: "Iron ore, coking coal and limestone.",
      },
      practiceSet: [
        { prompt: "Name three raw materials of the cement industry.", answer: "Limestone, silica and gypsum" },
        { prompt: "What is the ore of aluminium?", answer: "Bauxite" },
        { prompt: "In roughly what ratio are iron ore, coking coal and limestone used in making steel?", answer: "About 4 : 2 : 1" },
      ],
      pyqExampleId: "5628fb4b-3e3e-4ece-9ff0-3d950ead99c6",
      traps: [
        {
          title: "Giving iron and steel for the electricity question",
          body:
            "Iron and steel depends most on its heavy raw materials. The industry whose site is decided by a regular supply of electricity and cheap raw material is aluminium smelting.",
        },
        {
          title: "Placing early factories in today's tech cities",
          body: "Bengaluru and Hyderabad grew as industrial cities after independence. Before it, factories were in the ports of Mumbai, Kolkata and Chennai.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigin-named",
      name: "Textiles, iron and steel, electronics",
      intuition:
        "Three industries come up by name. Textiles is India's oldest big industry, iron and steel its basic one, and electronics the newest of the three.",
      definition:
        "- **Textiles**: the first successful cotton mill was set up in **Mumbai in 1854**. **China** has the largest installed capacity of spindles in the world, and India comes second.\n" +
        "- **Iron and steel**: Tata Steel (TISCO) was started at **Jamshedpur in 1907**. It was planned by **Jamsetji Tata** and set up by his son **Dorabji Tata**.\n" +
        "- **Electronics** makes television sets, transistors, telephones, cellular phones and computers. **Bengaluru** is called the electronic capital of India.\n" +
        "- **Information technology** is mostly software and services, not the making of machines.",
      table: {
        columns: ["Industry", "Key fact"],
        rows: [
          { cells: ["Cotton textiles", "First successful mill: Mumbai, 1854"] },
          { cells: ["Spinning", "Most spindles: China; India is second"] },
          {
            cells: ["Iron and steel", "Tata Steel, Jamshedpur, 1907"],
            noteAmber: "Planned by Jamsetji Tata, set up by Dorabji Tata.",
          },
          { cells: ["Electronics", "Telephones, televisions, computers; Bengaluru is the electronic capital"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which city is called the electronic capital of India?",
        steps: ["Electronics grew around one southern city with many research centres.", "That city is the capital of Karnataka."],
        answer: "Bengaluru.",
      },
      practiceSet: [
        { prompt: "In which city was India's first successful cotton mill set up?", answer: "Mumbai (1854)" },
        { prompt: "In which city is Tata Steel (TISCO)?", answer: "Jamshedpur" },
        { prompt: "Who planned Tata Steel?", answer: "Jamsetji Tata" },
        { prompt: "Is information technology mostly about making machines or about software and services?", answer: "Software and services" },
      ],
      pyqExampleId: "d1d945dc-7ab5-4596-a5ef-0e0b0b74d96a",
      traps: [
        {
          title: "Picking information technology for telephones and computers",
          body: "Making telephones, televisions and computers is the electronics industry. Information technology is the software and services that run on them.",
        },
        {
          title: "Thinking India has the most spindles",
          body: "India has the second largest number of spindles in the world. China has the most.",
        },
      ],
    },
  ],
};
