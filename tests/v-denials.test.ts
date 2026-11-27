/**
 * The weekly gap list (`npm run v:denials`, 2026-11-27): V's replies that deny
 * a feature or say V has no information about the product. Each real one is a
 * fact V lacked. The examples are V's own replies from November 2026.
 */
import { describe, it, expect } from "vitest";
import { denialKind } from "../scripts/lib/vDenials";

describe("denialKind", () => {
  it.each([
    ['PYQ Vault has no ₹300 "super pass". Our passes are:', "denies"],
    ["There is no homework section on PYQ Vault, so I can't say how it works.", "denies"],
    ["No, we don't have a 1-month pass. The Practice Pass is ₹199 for 6 months.", "denies"],
  ])("flags a denial: %s", (reply, kind) => {
    expect(denialKind(reply)).toBe(kind);
  });

  it.each([
    "I don't have any information about a way to ask a parent to pay.",
    "I don't have details on where the sign-out button is.",
    "It's a 6-month pass, and I don't have details on renewal, so check /pricing.",
    "I don't have information about a PYQ Vault mobile app, so I can't confirm one.",
    "I don't have any information about offline classes, so I can't tell you how to join one.",
  ])("flags a reply that says V knows nothing about the product: %s", (reply) => {
    expect(denialKind(reply)).toBe("no-info");
  });

  it.each([
    // A question with no worked solution yet: true, and from the tools.
    "Your pick (C) Thane is correct. There is no worked solution for this question yet.",
    // An exam we do not cover: rule 3e, said on purpose.
    "YÖS is not on PYQ Vault yet. Our international entrance exams are on intl.pyqvault.com.",
    // The student's screen: true.
    "I can't see which question is on your screen, so here are your recent ones.",
    // Physics, not the product.
    "With negligible medium density there is no buoyancy, so the weight is balanced by drag.",
    "This one is different: there is no circuit to reduce.",
    // The app answer V gives today: no store app, but it installs. Not a denial of a feature.
    "There is no app in the Play Store or App Store, but the site installs like one. Open /app.",
  ])("leaves a true or on-purpose answer alone: %s", (reply) => {
    expect(denialKind(reply)).toBeNull();
  });
});
