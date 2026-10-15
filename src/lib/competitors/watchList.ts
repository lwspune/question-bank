import type { WatchItem } from "./model";

/** Products outside our audiences with something worth borrowing. Newest first. */
export const WATCH_LIST: WatchItem[] = [
  {
    id: "sortmyprep",
    name: "sortmyprep",
    url: "https://sortmyprep.com/",
    covers: "IGCSE, AS & A Level and IB (39 subjects)",
    whyNotCompared:
      "No Indian entrance or state-board exams, so it is not in any of our audience tables. Added at the owner's request on 2026-10-15.",
    lessons: [
      "An AI tutor ('Sorty') a student asks when stuck on one step of a solution, instead of waiting for the next class. Same shape as our idea to let V explain a question.",
      "Honest comparison pages ('sortmyprep vs Save My Exams', 'vs Papa Cambridge') and 'best IGCSE / A Level / IB website' posts. These answer the questions students put to ChatGPT, which sends us about half our signups. We have none.",
      "Chapter blog posts that pair notes with questions and solutions, one URL per topic. Close to our /formula and /questions pages.",
      "A separate page for teachers (/teachers), which we do not have for our paper builder.",
    ],
    checkedOn: "2026-10-15",
  },
];
