/**
 * "Practise together" was removed on 2026-11-16 (experiments mock-together and
 * practice-friends): 34 sends in a month, and no friend ever started a paper.
 *
 * The SENDING side is gone: no box on the paper start page, the practice-test
 * result page or V's practice-test builder, and the start page no longer makes
 * an invite row on every signed-in visit. The RECEIVING side stays, so a link
 * already sent still lets a friend start free (the ?with= code, the start
 * route's join, the friend comparison card).
 *
 * A source scan, because these pages are auth-gated and dynamic: no build or
 * render test here can see what a signed-in student is shown.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

const SENDERS = [
  "src/app/mock/[slug]/page.tsx",
  "src/app/mock/attempt/[attemptId]/result/page.tsx",
  "src/components/chat/PracticeBuilder.tsx",
];

describe("practise together: the send box is gone", () => {
  it.each(SENDERS)("%s does not render the send-to-a-friend box", (file) => {
    expect(read(file)).not.toMatch(/SendToFriend/);
  });

  it("the paper start page makes no invite on a visit", () => {
    expect(read("src/app/mock/[slug]/page.tsx")).not.toMatch(/getOrCreateInvite/);
  });

  it("the box's component is deleted", () => {
    expect(existsSync(join(process.cwd(), "src/components/practice/SendToFriend.tsx"))).toBe(false);
  });

  it("a link already sent still works: the start page reads the friend's code", () => {
    const page = read("src/app/mock/[slug]/page.tsx");
    expect(page).toMatch(/readInvite\(/);
    expect(page).toMatch(/invite=\{fromFriend \? withCode : null\}/);
  });
});
