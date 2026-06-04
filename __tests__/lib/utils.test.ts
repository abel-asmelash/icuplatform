import { describe, it, expect } from "vitest";
import { cn, getTechBibleClassName } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges tailwind conflicts (last wins)", () => {
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles array inputs", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("getTechBibleClassName", () => {
  it("returns correct icon for known tag names", () => {
    expect(getTechBibleClassName("bible")).toBe("fa-book-bible");
    expect(getTechBibleClassName("apostles")).toBe("fa-cross");
    expect(getTechBibleClassName("newtestament")).toBe("fa-scroll");
    expect(getTechBibleClassName("oldtestament")).toBe("fa-book");
    expect(getTechBibleClassName("theology")).toBe("fa-church");
    expect(getTechBibleClassName("greekbible")).toBe("fa-bookmark");
    expect(getTechBibleClassName("prayer")).toBe("fa-hands-praying");
    expect(getTechBibleClassName("dove")).toBe("fa-dove");
    expect(getTechBibleClassName("worship")).toBe("fa-place-of-worship");
    expect(getTechBibleClassName("starofdavid")).toBe("fa-star-of-david");
    expect(getTechBibleClassName("faith")).toBe("fa-hand-holding-heart");
    expect(getTechBibleClassName("gospel")).toBe("fa-book-open");
  });

  it("is case-insensitive", () => {
    expect(getTechBibleClassName("Bible")).toBe("fa-book-bible");
    expect(getTechBibleClassName("THEOLOGY")).toBe("fa-church");
    expect(getTechBibleClassName("Prayer")).toBe("fa-hands-praying");
  });

  it("strips dots and spaces from tag name", () => {
    expect(getTechBibleClassName("new testament")).toBe("fa-scroll");
    expect(getTechBibleClassName("old.testament")).toBe("fa-book");
    expect(getTechBibleClassName("greek bible")).toBe("fa-bookmark");
    expect(getTechBibleClassName("star of david")).toBe("fa-star-of-david");
  });

  it("returns default icon for unknown tag", () => {
    expect(getTechBibleClassName("unknown")).toBe("fa-book-bible");
    expect(getTechBibleClassName("randomtag")).toBe("fa-book-bible");
  });

  it("returns default icon for empty string", () => {
    expect(getTechBibleClassName("")).toBe("fa-book-bible");
  });
});
