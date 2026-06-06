import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const mockSignIn = vi.fn();

vi.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string; [key: string]: unknown }) => (
    <img {...props} />
  ),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("@/constants/routes", () => ({
  default: {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
  },
  ROUTES: {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/questions/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
  },
}));

describe("SocialAuthForm", () => {
  beforeEach(() => {
    mockSignIn.mockReset();
  });

  it("renders the Google sign-in button", () => {
    render(<SocialAuthForm />);
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
  });

  it("renders the Google logo image", () => {
    render(<SocialAuthForm />);
    const img = screen.getByAltText("Google logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/assets/google-logo.svg.svg");
  });

  it("calls signIn with 'google' when clicked", async () => {
    mockSignIn.mockResolvedValue({ url: "/" });
    render(<SocialAuthForm />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await vi.waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/",
        redirect: false,
      });
    });
  });

  it("shows toast error when sign-in result has an error", async () => {
    const { toast } = await import("sonner");
    mockSignIn.mockResolvedValue({ error: "some error" });

    render(<SocialAuthForm />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await vi.waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Sign-in failed. Please try again later",
      );
    });
  });
});
