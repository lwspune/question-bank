import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SD_INSTITUTES_NOTE: SubtopicNote = {
  subtopicName: "Scientific Institutions",
  title: "Scientific Institutions",
  oneLineDefinition:
    "Where India's space centres and research institutes are and what each one does, from the Sriharikota launch pad to C-DAC's supercomputers in Pune, plus the full forms of bodies such as IUPAC.",
  whyItMatters:
    "Five questions in the bank, three EASY and two MODERATE: the rocket centre in Odisha, the city of ISRO's remote sensing centre, the work C-DAC does, the city of the Indian Institute of Ecology and Environment, and the full form of IUPAC. Each is a place or a full form, so a two-column table of names and places does the job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sdin-space",
      name: "ISRO and India's space centres",
      intuition:
        "India's space programme began in 1963 with a small rocket launched from a fishing village near Thiruvananthapuram. Today its work is spread across the country: rockets are designed in Kerala, satellites are launched from an island in Andhra Pradesh, and the pictures they send back are studied in Hyderabad. Learn each centre with its state and its job.",
      definition:
        "- **ISRO** (Indian Space Research Organisation) has its headquarters in **Bengaluru**.\n" +
        "- **Thumba**, near Thiruvananthapuram (**Kerala**): India's first rocket was launched here in 1963.\n" +
        "- **Vikram Sarabhai Space Centre**, Thiruvananthapuram (**Kerala**): designs rockets.\n" +
        "- **Satish Dhawan Space Centre**, **Sriharikota** (**Andhra Pradesh**): India's main launch centre for satellites.\n" +
        "- **Chandipur, Balasore** (**Odisha**): a rocket and missile launching and test range.\n" +
        "- **National Remote Sensing Centre**: **Hyderabad**; studies the pictures of the Earth taken by satellites.\n" +
        "- **Space Applications Centre** and **Physical Research Laboratory**: **Ahmedabad**.",
      table: {
        columns: ["Centre", "Place"],
        rows: [
          { cells: ["ISRO headquarters", "Bengaluru"] },
          { cells: ["Thumba Equatorial Rocket Launching Station", "Thumba, Kerala"] },
          { cells: ["Vikram Sarabhai Space Centre", "Thiruvananthapuram, Kerala"] },
          { cells: ["Satish Dhawan Space Centre", "Sriharikota, Andhra Pradesh"] },
          { cells: ["Rocket and missile test range", "Chandipur, Balasore, Odisha"] },
          { cells: ["National Remote Sensing Centre", "Hyderabad"] },
          { cells: ["Space Applications Centre, Physical Research Laboratory", "Ahmedabad"] },
        ],
        caption: "Two of the centres are in Kerala; the only one in Odisha is at Balasore.",
      },
      selfCheckExample: {
        prompt: "From which place in Andhra Pradesh does ISRO launch most of its satellites, and what is the centre there called?",
        steps: ["India's main launch pad is on the island of Sriharikota.", "The centre is named after Satish Dhawan, a former head of ISRO."],
        answer: "Sriharikota: the Satish Dhawan Space Centre",
      },
      practiceSet: [
        { prompt: "In which city is the headquarters of ISRO?", answer: "Bengaluru" },
        { prompt: "In which state is the Vikram Sarabhai Space Centre?", answer: "Kerala (Thiruvananthapuram)" },
        { prompt: "From which place was India's first rocket launched in 1963?", answer: "Thumba, near Thiruvananthapuram" },
        { prompt: "In which city are the Space Applications Centre and the Physical Research Laboratory?", answer: "Ahmedabad" },
      ],
      pyqExampleId: "4451b56e-5b49-4c60-b2eb-efcc7a31a726",
      traps: [
        {
          title: "Putting Sriharikota in Tamil Nadu",
          body: "Sriharikota, home of the Satish Dhawan Space Centre, is in Andhra Pradesh, close to the Tamil Nadu border.",
        },
        {
          title: "Taking Thumba for the main launch centre",
          body: "Thumba saw India's first rocket in 1963. Satellites are launched today from Sriharikota.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sdin-research",
      name: "Research institutes and their full forms",
      intuition:
        "Many famous research bodies are known only by their initials, and a question often asks what the letters stand for or where the body works. Pune alone has several: one builds supercomputers, one studies the stars, one studies chemistry. Learn the full form, the city and the field together.",
      definition:
        "- **IUPAC**: **International Union of Pure and Applied Chemistry**; sets the rules for naming elements and compounds.\n" +
        "- **C-DAC**: **Centre for Development of Advanced Computing**, **Pune**; builds India's **PARAM** supercomputers.\n" +
        "- **IUCAA**: Inter-University Centre for Astronomy and Astrophysics, **Pune**.\n" +
        "- **NCL**: National Chemical Laboratory, **Pune**.\n" +
        "- **BARC**: Bhabha Atomic Research Centre, **Mumbai**; atomic energy research.\n" +
        "- **IISc**: Indian Institute of Science, **Bengaluru**.\n" +
        "- **IMD**: India Meteorological Department, headquarters in **New Delhi**; weather forecasts.\n" +
        "- The **Indian Institute of Ecology and Environment** is in **New Delhi**.",
      table: {
        columns: ["Body", "Full form", "City", "Field"],
        rows: [
          { cells: ["IUPAC", "International Union of Pure and Applied Chemistry", "International body", "Names of elements and compounds"] },
          { cells: ["C-DAC", "Centre for Development of Advanced Computing", "Pune", "Computers, supercomputers"] },
          { cells: ["IUCAA", "Inter-University Centre for Astronomy and Astrophysics", "Pune", "Astronomy"] },
          { cells: ["NCL", "National Chemical Laboratory", "Pune", "Chemistry"] },
          { cells: ["BARC", "Bhabha Atomic Research Centre", "Mumbai", "Atomic energy"] },
          { cells: ["IMD", "India Meteorological Department", "New Delhi", "Weather"] },
        ],
        caption: "Weather belongs to IMD; computers to C-DAC.",
      },
      selfCheckExample: {
        prompt: "What does BARC stand for, and in which city is it?",
        steps: ["It is named after Homi Bhabha, the father of India's atomic energy programme."],
        answer: "Bhabha Atomic Research Centre, Mumbai",
      },
      practiceSet: [
        { prompt: "What is the full form of IUPAC?", answer: "International Union of Pure and Applied Chemistry" },
        { prompt: "In which city is IUCAA, the centre for astronomy?", answer: "Pune" },
        { prompt: "Which department gives India's official weather forecasts?", answer: "The India Meteorological Department (IMD)" },
        { prompt: "What does NCL stand for, and in which city is it?", answer: "National Chemical Laboratory, Pune" },
      ],
      pyqExampleId: "213f3300-a57b-457d-920d-dbae4f7407f5",
      traps: [
        {
          title: "Reading IUPAC as 'Pure Analytical'",
          body: "IUPAC is the International Union of Pure and Applied Chemistry. Check every word of a full form, not just the first and last.",
        },
        {
          title: "Linking C-DAC with weather",
          body: "C-DAC works on computers. Weather forecasting is the work of the India Meteorological Department.",
        },
      ],
    },
  ],
};
