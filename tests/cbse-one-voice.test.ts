import { describe, it, expect } from "vitest";
import { oneVoice } from "../scripts/cbse-12-pyq/oneVoice";

describe("oneVoice", () => {
  it("turns an MCQ's scheme preamble into the working plus a closing answer", () => {
    const s =
      "CBSE's marking scheme answers Section A with the option letter alone: its table reads '6. (b)', and no justification is printed.\n\n" +
      "The keyed option is 'inductor decreases'.\n\n" +
      "Added here, and not from the marking scheme: the two reactances depend on frequency.\n\nLowering f lowers X_L.";
    expect(oneVoice(s).text).toBe(
      "The two reactances depend on frequency.\n\nLowering f lowers X_L.\n\nSo the answer is 'inductor decreases'."
    );
  });

  it("drops the scheme header, the mark split and marker notes, and keeps the physics", () => {
    const s =
      "CBSE's marking scheme:\n\n(i) Flux is E.A.\n\n" +
      "Alternatively: if the shape is taken cylindrical, full credit is to be given.\n\n" +
      "Marks: 1/2 + 1/2 for the definition.\n\n" +
      "CBSE's marking scheme allots 1 mark for WHY and 1 mark for HOW.\n\n" +
      "Note: the scheme deducts no marks if the values are not shown.\n\n" +
      "The scheme adds that full credit is to be given for any other method.\n\n" +
      "Added here, and not from the marking scheme: the factor 2 comes from two faces.";
    expect(oneVoice(s).text).toBe("(i) Flux is E.A.\n\nThe factor 2 comes from two faces.");
  });

  it("removes the value-point labels but keeps what they label", () => {
    const s =
      "The scheme's value points: the field grows with an iron core.\n\n" +
      "Current density (the scheme's value point): the current per unit area.\n\n" +
      "(i) The diagram (the scheme reproduces the standard NCERT figure): parallel rays.";
    expect(oneVoice(s).text).toBe(
      "The field grows with an iron core.\n\nCurrent density: the current per unit area.\n\n(i) The diagram: parallel rays."
    );
  });

  it("drops a value-point label that stands alone above a list", () => {
    expect(oneVoice("The scheme's value points:\n\n- one\n- two").text).toBe("- one\n- two");
  });

  it("rewords 'The scheme also prints the ...' as a plain heading", () => {
    expect(oneVoice("The scheme also prints the shorter route: V = Q/3C.").text).toBe("Shorter route: V = Q/3C.");
  });

  it("leaves math at the start of an unlabelled paragraph alone", () => {
    expect(oneVoice(String.raw`Added here, and not from the marking scheme: \(x = 1\) holds.`).text).toBe(
      String.raw`\(x = 1\) holds.`
    );
  });

  it("drops a '[CBSE marking scheme: ...]' bracket paragraph and lists it for review", () => {
    const r = oneVoice("[CBSE marking scheme: its fusion example misprints He as H.]\n\nThe reaction gives helium-3.");
    expect(r.text).toBe("The reaction gives helium-3.");
    expect(r.review).toHaveLength(1);
  });

  it("handles the label's variants: a trailing clause, and the label standing alone", () => {
    const s =
      "Added here, and not from the marking scheme, to say why that releases energy: the curve rises.\n\n" +
      "Added here, and not from the marking scheme:\n\n- more ways";
    expect(oneVoice(s).text).toBe("The curve rises.\n\n- more ways");
  });

  it("keeps a part number when it drops the value-point label after it", () => {
    expect(oneVoice("(ii) The scheme's value point: the products are more tightly bound.").text).toBe(
      "(ii) The products are more tightly bound."
    );
  });

  it("turns 'The scheme prints the X:' into a heading and drops scheme asides in brackets", () => {
    const s =
      "(i) The scheme prints the ray diagram: an object on the axis.\n\n" +
      "Examples of fusion (the scheme prints these three and accepts any other correct reaction):";
    expect(oneVoice(s).text).toBe("(i) Ray diagram: an object on the axis.\n\nExamples of fusion:");
  });

  it("drops a mark-split paragraph and turns the scheme's own instruction into a plain heading", () => {
    const s =
      "The mark split is (i) diagram, 1 mark. The scheme prints the two ray diagrams and no prose.\n\n" +
      "CBSE's marking scheme (any two of the following differences):\n\n| a | b |";
    expect(oneVoice(s).text).toBe("Any two of the following differences:\n\n| a | b |");
  });

  it("drops the Section A preamble in its 'letter and the wording' variant too", () => {
    const s =
      'CBSE\'s marking scheme answers Section A with the option letter and the wording alone: its table reads "5. (b)".\n\nThe beams repel.';
    expect(oneVoice(s).text).toBe("The beams repel.");
  });

  it("says 'the answer', not 'the keyed option'", () => {
    expect(oneVoice("So r = 3 m.\n\nThat is the keyed option, 3 m.").text).toBe("So r = 3 m.\n\nThat is the answer, 3 m.");
  });

  it("drops a note about the printed scheme itself", () => {
    expect(oneVoice("Snell's law holds.\n\nA note on the printed scheme rather than on the physics: it says rectangular.").text).toBe(
      "Snell's law holds."
    );
  });
});
