import { describe, expect, it } from "vitest";
import { answeredShape } from "@/lib/mocks/answeredShape";
import { isAnswered } from "@/lib/mocks/answers";

describe("answeredShape + isAnswered on a raw attempt_answers row", () => {
  it("counts an option, a value (0 included) or a tick set, and nothing else", () => {
    expect(isAnswered(answeredShape({ selected_label: "B", numeric_response: null, selected_labels: null }))).toBe(true);
    expect(isAnswered(answeredShape({ selected_label: null, numeric_response: 0, selected_labels: null }))).toBe(true);
    expect(isAnswered(answeredShape({ selected_label: null, numeric_response: null, selected_labels: ["A", "C"] }))).toBe(true);
    expect(isAnswered(answeredShape({ selected_label: null, numeric_response: null, selected_labels: null }))).toBe(false);
    expect(isAnswered(answeredShape({ selected_label: null, numeric_response: null }))).toBe(false);
  });
});
