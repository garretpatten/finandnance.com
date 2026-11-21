import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { socialLinks, AMAZON_BOOK_URL, INSTAGRAM_URL } from "../socials";

describe("socials", () => {
  it("exposes amazon, instagram, and email links", () => {
    expect(socialLinks).toHaveLength(3);
    expect(socialLinks.map((social) => social.label)).toEqual([
      "Amazon",
      "Instagram",
      "Email the author",
    ]);
    expect(socialLinks[0].href).toBe(AMAZON_BOOK_URL);
    expect(socialLinks[1].href).toBe(INSTAGRAM_URL);
    expect(socialLinks[2].href).toBe("mailto:maureen@finandnance.com");
    expect(socialLinks[2].isEmail).toBe(true);
    expect(socialLinks[2].ariaLabel).toBe("Email the author");
  });

  it("gives every link an icon glyph and viewBox", () => {
    for (const social of socialLinks) {
      expect(social.viewBox).toBeTypeOf("string");
      expect(social.iconPath).toBeTypeOf("string");
    }
  });

  it("keeps the envelope glyph inset for even optical spacing", () => {
    // The Amazon and Instagram glyphs carry their own edge breathing
    // room (letterboxing / thin ring); the solid envelope does not, so
    // its viewBox must be expanded to inset it.
    const [, , email] = socialLinks;
    const [minX, , width] = email.viewBox.split(" ").map(Number);

    expect(minX).toBeLessThan(0);
    expect(width).toBeGreaterThan(512);
  });

  it("does not store the raw email address in the module source", () => {
    const source = readFileSync(resolve("src/data/socials.js"), "utf8");

    expect(source).not.toMatch(/maureen@finandnance\.com/i);
    expect(source).not.toContain("mailto:maureen");
  });
});
