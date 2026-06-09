import type { ChapterNote } from "@/app/notes/_types";

export const BINARY_NUMBERS_CHAPTER: ChapterNote = {
  chapterName: "Binary Numbers",
  title: "Binary Numbers — NDA Maths",
  intro:
    "Binary Numbers is a small but reliable chapter: 13 PYQs span 2017–2025, and almost every one rewards the same first move — " +
    "translate the binary strings into ordinary decimal, do the easy arithmetic there, and (if asked) translate the answer back. " +
    "The marks are rarely in the binary itself; they are in spotting that a question dressed up in base 2 is really a one-line " +
    "place-value conversion, a simple division, or a familiar algebra identity. The notes teach in three movements, foundations first: " +
    "(1) Binary to Decimal Conversion — what base 2 means, why place values are powers of 2, converting a binary string to decimal, " +
    "and converting decimal back to binary by repeated division; " +
    "(2) Binary Arithmetic — adding, subtracting and dividing in binary (and the unknown-digit puzzles that hide an addition), " +
    "plus the recurring cube identities where the numbers just happen to be given in binary; " +
    "(3) Binary Representation and Number Theory — counting/representing numbers and the few modular-arithmetic and " +
    "perfect-square recall items the chapter files here. " +
    "Convert-first is the chapter's centre of gravity: master decimal ↔ binary, and the rest is arithmetic you already know. " +
    "Every PYQ is tagged.",
  subtopicOrder: [
    "bin-to-decimal-conversion",
    "bin-arithmetic",
    "bin-representation-number-theory",
  ],
};
