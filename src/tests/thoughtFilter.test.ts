import { describe, it, expect, vi } from "vitest";
import thoughtFilter from "@/utils/thoughtFilter";

// Mock SITE config
vi.mock("@/config", () => ({
  SITE: {
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  },
}));

type MockThought = {
  data: {
    pubDatetime: Date;
    draft?: boolean;
    tags: string[];
    slug: string;
  };
};

function makeThought(overrides: Partial<MockThought["data"]> = {}): MockThought {
  return {
    data: {
      pubDatetime: new Date("2025-01-01T00:00:00Z"),
      draft: false,
      tags: ["test"],
      slug: "january",
      ...overrides,
    },
  };
}

describe("thoughtFilter", () => {
  it("should include non-draft thoughts with past publish date", () => {
    const thought = makeThought();
    expect(thoughtFilter(thought as any)).toBe(true);
  });

  it("should exclude draft thoughts", () => {
    const thought = makeThought({ draft: true });
    expect(thoughtFilter(thought as any)).toBe(false);
  });

  it("should include thoughts with future publish date in dev mode", () => {
    // In vitest, import.meta.env.DEV is true by default
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow
    const thought = makeThought({ pubDatetime: futureDate });
    // DEV mode allows future posts
    expect(thoughtFilter(thought as any)).toBe(true);
  });
});
