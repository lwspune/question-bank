/**
 * A textbook question's own number, as the /board reader and the Textbook
 * Solutions ebook both print it (2026-10-27, moved out of BoardQuestionItem):
 * the transcription's leading section prefix goes ("2.1 Ex 2.1 Q.3 (i)" ->
 * "Q.3 (i)"); a ref already clean is left alone.
 */
import { describe, it, expect } from "vitest";
import { cleanRef } from "@/lib/board/cleanRef";

describe("cleanRef", () => {
  it("trims the leading section prefix", () => {
    expect(cleanRef("2.1 Ex 2.1 Q.3 (i)")).toBe("Q.3 (i)");
    expect(cleanRef("6.4 Exercise 6.3 Q.2")).toBe("Q.2");
    expect(cleanRef("2.1 Solved Ex 2.1 Q.1")).toBe("Q.1");
  });

  it("leaves a clean ref alone", () => {
    expect(cleanRef("Misc I (11)")).toBe("Misc I (11)");
    expect(cleanRef("Misc 2A Q.7")).toBe("Misc 2A Q.7");
    expect(cleanRef("Eg 7.1")).toBe("Eg 7.1");
  });
});
