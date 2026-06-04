import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TagCard from "@/components/cards/TagCard";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("TagCard", () => {
  it("renders tag name", () => {
    render(<TagCard _id="1" name="bible" />);
    expect(screen.getByText("bible")).toBeInTheDocument();
  });

  it("links to the correct tag route", () => {
    render(<TagCard _id="abc123" name="theology" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tags/abc123");
  });

  it("shows question count when showCount is true", () => {
    render(<TagCard _id="1" name="prayer" questions={42} showCount />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("hides question count when showCount is false", () => {
    render(<TagCard _id="1" name="prayer" questions={42} />);
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });

  it("applies the correct icon class for the tag name", () => {
    const { container } = render(<TagCard _id="1" name="dove" />);
    const icon = container.querySelector("i");
    expect(icon).toHaveClass("fa-dove");
  });

  it("applies default icon class for unknown tag", () => {
    const { container } = render(<TagCard _id="1" name="unknowntag" />);
    const icon = container.querySelector("i");
    expect(icon).toHaveClass("fa-book-bible");
  });
});
