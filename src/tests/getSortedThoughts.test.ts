import { describe, it, expect, vi } from "vitest";
import getSortedThoughts from "@/utils/getSortedThoughts";

vi.mock("@/config", () => ({
  SITE: {
    scheduledPostMargin: 15 * 60 * 1000,
  },
}));

type MockThought = {
  data: {
    pubDatetime: Date;
    modDatetime?: Date | null;
    draft?: boolean;
    tags: string[];
    slug: string;
  };
};

function makeThought(overrides: Partial<MockThought["data"]> = {}): MockThought {
  return {
    data: {
      pubDatetime: new Date("2025-01-01T00:00:00Z"),
      modDatetime: null,
      draft: false,
      tags: ["test"],
      slug: "january",
      ...overrides,
    },
  };
}

describe("getSortedThoughts", () => {
  it("should sort thoughts by pubDatetime descending", () => {
    const thoughts = [
      makeThought({ pubDatetime: new Date("2025-01-01") }),
      makeThought({ pubDatetime: new Date("2025-03-01") }),
      makeThought({ pubDatetime: new Date("2025-02-01") }),
    ];

    const sorted = getSortedThoughts(thoughts as any);
    expect(sorted[0].data.pubDatetime).toEqual(new Date("2025-03-01"));
    expect(sorted[1].data.pubDatetime).toEqual(new Date("2025-02-01"));
    expect(sorted[2].data.pubDatetime).toEqual(new Date("2025-01-01"));
  });

  it("should prefer modDatetime over pubDatetime for sorting", () => {
    const thoughts = [
      makeThought({
        pubDatetime: new Date("2025-01-01"),
        modDatetime: new Date("2025-04-01"),
      }),
      makeThought({ pubDatetime: new Date("2025-03-01") }),
    ];

    const sorted = getSortedThoughts(thoughts as any);
    expect(sorted[0].data.modDatetime).toEqual(new Date("2025-04-01"));
  });

  it("should filter out draft thoughts", () => {
    const thoughts = [
      makeThought({ draft: true }),
      makeThought({ draft: false }),
    ];

    const sorted = getSortedThoughts(thoughts as any);
    expect(sorted).toHaveLength(1);
  });
});
