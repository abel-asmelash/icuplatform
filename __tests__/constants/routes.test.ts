import { describe, it, expect } from "vitest";
import ROUTES from "@/constants/routes";

describe("ROUTES", () => {
  it("has correct static routes", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.SIGN_IN).toBe("/sign-in");
    expect(ROUTES.SIGN_UP).toBe("/sign-up");
  });

  it("generates correct profile URL", () => {
    expect(ROUTES.PROFILE("123")).toBe("/profile/123");
    expect(ROUTES.PROFILE("abc-def")).toBe("/profile/abc-def");
  });

  it("generates correct question URL", () => {
    expect(ROUTES.QUESTION("456")).toBe("/questions/456");
    expect(ROUTES.QUESTION("q-789")).toBe("/questions/q-789");
  });

  it("generates correct tags URL", () => {
    expect(ROUTES.TAGS("tag1")).toBe("/tags/tag1");
    expect(ROUTES.TAGS("my-tag")).toBe("/tags/my-tag");
  });
});
