import { describe, it, expect } from "vitest";
import { signInSchema, signUpSchema } from "@/lib/validations";

describe("signInSchema", () => {
  it("accepts valid sign-in data", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const result = signInSchema.safeParse({
      email: "",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) =>
        i.path.includes("email"),
      );
      expect(emailError).toBeDefined();
    }
  });

  it("rejects invalid email format", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: "secret123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) =>
        i.path.includes("email"),
      );
      expect(emailError?.message).toBe(
        "Please provide a valid email address.",
      );
    }
  });

  it("rejects password shorter than 6 characters", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "12345",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const pwError = result.error.issues.find((i) =>
        i.path.includes("password"),
      );
      expect(pwError?.message).toBe(
        "Password must be at least 6 characters long",
      );
    }
  });

  it("rejects password longer than 100 characters", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "a".repeat(101),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const pwError = result.error.issues.find((i) =>
        i.path.includes("password"),
      );
      expect(pwError?.message).toBe("Password cannot exceed 100 characters");
    }
  });

  it("accepts password at boundary lengths (6 and 100)", () => {
    expect(
      signInSchema.safeParse({
        email: "a@b.co",
        password: "abcdef",
      }).success,
    ).toBe(true);

    expect(
      signInSchema.safeParse({
        email: "a@b.co",
        password: "a".repeat(100),
      }).success,
    ).toBe(true);
  });
});

describe("signUpSchema", () => {
  const validData = {
    username: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    password: "secret123",
    confirmPassword: "secret123",
  };

  it("accepts valid sign-up data", () => {
    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects username shorter than 3 characters", () => {
    const result = signUpSchema.safeParse({ ...validData, username: "ab" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const err = result.error.issues.find((i) =>
        i.path.includes("username"),
      );
      expect(err?.message).toBe("Username must be at least 3 characters");
    }
  });

  it("rejects username longer than 30 characters", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      username: "a".repeat(31),
    });
    expect(result.success).toBe(false);
  });

  it("rejects username with special characters", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      username: "john@doe",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const err = result.error.issues.find((i) =>
        i.path.includes("username"),
      );
      expect(err?.message).toBe(
        "Username can only contain letters, numbers and underscores",
      );
    }
  });

  it("accepts username with underscores and numbers", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      username: "john_123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = signUpSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 50 characters", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      name: "a".repeat(51),
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatching passwords", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const err = result.error.issues.find((i) =>
        i.path.includes("confirmPassword"),
      );
      expect(err?.message).toBe("Passwords do not match");
    }
  });

  it("accepts matching passwords at minimum length", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      password: "abcdef",
      confirmPassword: "abcdef",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email in sign-up", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      email: "bad-email",
    });
    expect(result.success).toBe(false);
  });
});
