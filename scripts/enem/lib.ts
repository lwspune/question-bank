/**
 * ENEM lane, pure core (spec tests/enem-lib.test.ts).
 *
 * ENEM prints five options A-E and INEP's key names one letter per question,
 * or "Anulado" when INEP cancelled it. Rows keep the PRINTED order (no
 * shuffle): a student sees exactly what the paper showed, and the key letter
 * stays INEP's.
 *
 * Legal (owner, 2026-11-15): INEP's questions are official acts (Lei 9.610
 * art. 8 IV). Many Sciences questions adapt a published text and print its
 * credit; that credit is the attribution the quotation exception (art. 46 III)
 * relies on, so a row whose credit line is missing from its text is refused.
 */
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { ParsedRowPayload, StoredOptionLabel } from "../../src/lib/upload/validate";

export type EnemSubject = "matematica" | "fisica" | "quimica" | "biologia";
export type KeyEntry = "A" | "B" | "C" | "D" | "E" | "ANULADO";
export type FigureBox = { page: number; box: number[]; what?: string };

/** One reviewed question (data/<year>.questions.json). */
export type EnemQuestion = {
  n: number;
  area: "natureza" | "matematica";
  subject: EnemSubject;
  chapter: string;
  text: string;
  options: string[];
  credit: string[];
  figure: FigureBox | null;
  option_figures: FigureBox | null;
  solution: string;
  answer?: string;
  confidence?: string;
  notes?: string;
};

export const SUBJECT_NAMES: Record<EnemSubject, string> = {
  matematica: "Matemática",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biologia",
};

/** Chapter ids (the reviewers' catalog) and the names stored in the bank. */
export const CHAPTER_NAMES: Record<string, string> = {
  "aritmetica-porcentagem": "Aritmética e porcentagem",
  "razao-proporcao": "Razão e proporção",
  "medidas-unidades": "Grandezas e unidades de medida",
  "geometria-plana": "Geometria plana",
  "geometria-espacial": "Geometria espacial",
  funcoes: "Funções",
  "exponencial-logaritmo": "Exponencial e logaritmo",
  trigonometria: "Trigonometria",
  estatistica: "Estatística",
  "probabilidade-combinatoria": "Probabilidade e análise combinatória",
  sequencias: "Sequências e progressões",
  "logica-raciocinio": "Raciocínio lógico",
  cinematica: "Cinemática",
  "dinamica-energia": "Dinâmica e energia",
  hidrostatica: "Hidrostática",
  termologia: "Termologia",
  optica: "Óptica",
  ondulatoria: "Ondulatória",
  eletricidade: "Eletricidade",
  eletromagnetismo: "Eletromagnetismo",
  "fisica-moderna": "Física moderna",
  atomistica: "Estrutura atômica",
  "ligacoes-interacoes": "Ligações e interações",
  "funcoes-inorganicas": "Funções inorgânicas",
  estequiometria: "Estequiometria",
  solucoes: "Soluções",
  termoquimica: "Termoquímica",
  "cinetica-equilibrio": "Cinética e equilíbrio",
  eletroquimica: "Eletroquímica",
  organica: "Química orgânica",
  "separacao-ambiental": "Separação de misturas e química ambiental",
  citologia: "Citologia",
  genetica: "Genética",
  biotecnologia: "Biotecnologia",
  evolucao: "Evolução",
  ecologia: "Ecologia",
  "fisiologia-humana": "Fisiologia humana",
  botanica: "Botânica",
  zoologia: "Zoologia",
  microbiologia: "Microbiologia",
};

const LABELS: StoredOptionLabel[] = ["A", "B", "C", "D", "E"];
const DRAWN = ["Figura A", "Figura B", "Figura C", "Figura D", "Figura E"];

/** The booklet each sitting's rows come from: booklet 7 of Day 2, and in 2016 (Sciences on Day 1) booklet 1. */
export function bookletFor(day: 1 | 2): number {
  return day === 1 ? 1 : 7;
}

/** The provenance shown on the site; under 48 characters (publicPyqNote's cap). */
export function pyqNoteFor(year: number, day: 1 | 2): string {
  return `ENEM ${year}, ${day}º dia, caderno ${bookletFor(day)}`;
}

/** The notice a question INEP cancelled carries (migration 0119); in Portuguese, like the question. */
export function cancelledNoteFor(year: number, day: 1 | 2): string {
  return (
    `Questão anulada pelo INEP no gabarito oficial desta prova (${pyqNoteFor(year, day)}). ` +
    `Nenhuma alternativa é considerada correta. Nos simulados do PYQ Vault, ela conta como acerto para todos.`
  );
}

function refuse(where: string, msg: string): never {
  throw new Error(`${where}: ${msg}`);
}

export function buildRow(year: number, q: EnemQuestion, key: KeyEntry, opts: { day: 1 | 2 }): ParsedRowPayload {
  const where = `ENEM ${year} Q${q.n}`;
  if (!(key === "ANULADO" || LABELS.includes(key as StoredOptionLabel))) refuse(where, `key ${key} is not A-E or Anulado`);
  if (!(q.subject in SUBJECT_NAMES)) refuse(where, `unknown subject ${q.subject}`);
  const chapterName = CHAPTER_NAMES[q.chapter];
  if (!chapterName) refuse(where, `unknown chapter ${q.chapter}`);
  if (q.options.length !== 5) refuse(where, `ENEM questions have five options, got ${q.options.length}`);
  const printed = q.options.map((o) => o.trim());
  if (printed.some((o) => !o)) refuse(where, "an empty option");
  if (new Set(printed).size !== 5) refuse(where, "duplicate options");
  const drawn = printed.every((o, i) => o === DRAWN[i]);
  if (drawn && !q.option_figures) refuse(where, "options drawn as figures need option_figures");
  const text = q.text.trim();
  for (const c of q.credit ?? []) {
    if (!text.includes(c.trim())) refuse(where, `source credit missing from the text: ${c.slice(0, 50)}`);
  }
  for (const [name, v] of [["text", text], ["solution", q.solution], ...printed.map((o, i) => [`option ${LABELS[i]}`, o])]) {
    if (v && normalizeNewlines(v) !== v) refuse(where, `${name}: literal backslash-n; fix the transcription`);
    if (v && /(^|[^\\])\$/.test(v)) refuse(where, `${name}: a bare $ (write \\$)`);
  }

  const options = printed.map((t, i) => ({ label: LABELS[i], text: t, isCorrect: key !== "ANULADO" && LABELS[i] === key }));
  const answer = key === "ANULADO" ? "CANCELLED" : key;
  return {
    sourceRow: q.n,
    questionNumber: String(q.n),
    subjectName: SUBJECT_NAMES[q.subject],
    chapterName,
    text,
    // INEP's difficulty is its IRT parameters, not a band; MODERATE is the bank's neutral value.
    difficulty: "MODERATE",
    solution: q.solution.trim() || undefined,
    options,
    contentHash: contentHash(text, printed, answer),
    ...(key === "ANULADO" ? { cancelledNote: cancelledNoteFor(year, opts.day) } : {}),
  };
}
