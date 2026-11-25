/**
 * Exam rooms, round 2 (owner, 2026-11-25): anonymity and focus.
 *
 * - suggestNickname / checkNickname: a room name the student picks at Join
 *   (prefilled with a random friendly one), never their real name. 2-20
 *   letters, numbers or spaces; no phone numbers, emails, @, abuse, or names
 *   that pass for staff (PYQ Vault, V, Team, Admin).
 * - checkRoomText now also refuses social handles: "insta: priya_2009",
 *   "@priya_2009". A plain "@Quiet Falcon" mention stays allowed.
 * - The rooms button can be hidden for 2 hours or until turned back on
 *   (student_profiles.rooms_button_hidden_until; "infinity" = until turned on).
 */
import { describe, it, expect } from "vitest";
import { suggestNickname, checkNickname, NICK_MAX } from "@/lib/rooms/nickname";
import { checkRoomText } from "@/lib/rooms/text";
import { hideUntilFor, buttonHidden, msUntilShown, hiddenLabel, backAtLabel, hiddenToast, HIDE_FOREVER } from "@/lib/rooms/button";

describe("suggestNickname", () => {
  it("is two capitalised words that pass checkNickname", () => {
    const seq = [0, 0.5, 0.99, 0.25];
    for (let i = 0; i < seq.length - 1; i++) {
      let k = i;
      const name = suggestNickname(() => seq[k++ % seq.length]);
      expect(name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
      expect(checkNickname(name).ok).toBe(true);
    }
  });
});

describe("checkNickname", () => {
  it("trims and folds spaces", () => {
    expect(checkNickname("  Quiet   Falcon ")).toEqual({ ok: true, name: "Quiet Falcon" });
  });
  it("allows letters in any script and short numbers", () => {
    expect(checkNickname("Aarav 7").ok).toBe(true);
    expect(checkNickname("राहुल").ok).toBe(true);
  });
  it("refuses too short, too long and symbols", () => {
    expect(checkNickname("A").ok).toBe(false);
    expect(checkNickname("x".repeat(NICK_MAX + 1)).ok).toBe(false);
    expect(checkNickname("priya_2009").ok).toBe(false);
    expect(checkNickname("@priya").ok).toBe(false);
  });
  it("refuses numbers that could be a phone, and emails", () => {
    expect(checkNickname("Riya 9876543210").ok).toBe(false);
    expect(checkNickname("Riya 123456").ok).toBe(false);
  });
  it("refuses names that pass for staff, and abuse", () => {
    for (const n of ["PYQ Vault", "pyqvault", "V", "Team", "Admin", "Moderator", "PYQ Vault team"]) {
      expect(checkNickname(n).ok, n).toBe(false);
    }
    expect(checkNickname("chutiya").ok).toBe(false);
  });
});

describe("checkRoomText: social handles", () => {
  it("refuses a platform word followed by a handle", () => {
    for (const t of ["insta: priya_2009", "my instagram is priyas.notes", "snap me riya2009", "telegram @cglgroup", "discord riya#1234"]) {
      expect(checkRoomText(t).ok, t).toBe(false);
    }
  });
  it("refuses an @handle with digits, dots or underscores", () => {
    expect(checkRoomText("follow @priya_2009").ok).toBe(false);
    expect(checkRoomText("dm @riya.notes").ok).toBe(false);
  });
  it("still allows a plain @ mention of a room name and ordinary words", () => {
    expect(checkRoomText("@Quiet thanks, that helped").ok).toBe(true);
    expect(checkRoomText("Is the snap test on Sunday?").ok).toBe(true);
    expect(checkRoomText("x = 5 and y = 230").ok).toBe(true);
  });
  it("says why", () => {
    const r = checkRoomText("insta: priya_2009");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/social/i);
  });
});

describe("rooms button hiding", () => {
  const now = Date.parse("2026-11-25T14:10:00Z"); // 19:40 IST

  it("hides for 2 hours, or until turned back on", () => {
    expect(hideUntilFor("2h", now)).toBe("2026-11-25T16:10:00.000Z");
    expect(hideUntilFor("off", now)).toBe(HIDE_FOREVER);
    expect(hideUntilFor("show", now)).toBeNull();
  });

  it("is hidden while the time is ahead, and for good on infinity", () => {
    expect(buttonHidden(null, now)).toBe(false);
    expect(buttonHidden("2026-11-25T16:10:00Z", now)).toBe(true);
    expect(buttonHidden("2026-11-25T14:00:00Z", now)).toBe(false);
    expect(buttonHidden(HIDE_FOREVER, now)).toBe(true);
  });

  it("knows how long until a timed hide ends, and nothing for the others", () => {
    expect(msUntilShown("2026-11-25T16:10:00Z", now)).toBe(2 * 3600_000);
    expect(msUntilShown(HIDE_FOREVER, now)).toBeNull();
    expect(msUntilShown(null, now)).toBeNull();
  });

  it("says when it comes back, in IST", () => {
    expect(hiddenLabel("2026-11-25T16:10:00Z")).toBe("Button hidden until 9:40 pm");
    expect(hiddenLabel(HIDE_FOREVER)).toBe("Button hidden");
    expect(backAtLabel("2026-11-25T16:10:00Z")).toBe("Back at 9:40 pm");
  });

  it("tells the student where the rooms went", () => {
    expect(hiddenToast("2026-11-25T16:10:00Z")).toBe("Rooms button hidden until 9:40 pm. Exam rooms are in your account menu.");
    expect(hiddenToast(HIDE_FOREVER)).toBe("Rooms button hidden. Exam rooms are in your account menu.");
  });
});
