import { describe, it, expect, vi } from "vitest";
import getUniqueTags from "@/utils/getUniqueTags";

vi.mock("@/config", () => ({
  SITE: {
    scheduledPostMargin: 15 * 60 * 1000,
  },
}));

type MockEntry = {
  data: {
    pubDatetime: Date;
    draft?: boolean;
    tags: string[];
    [key: string]: any;
  };
};

function makePost(tags: string[]): MockEntry {
  return {
    data: {
      pubDatetime: new Date("2025-01-01"),
      draft: false,
      tags,
      title: "Test Post",
      description: "test",
    },
  };
}

function makeThought(tags: string[]): MockEntry {
  return {
    data: {
      pubDatetime: new Date("2025-01-01"),
      draft: false,
      tags,
      slug: "january",
    },
  };
}

describe("getUniqueTags", () => {
  it("should return tags from blog posts", () => {
    const posts = [makePost(["javascript", "react"])];
    const tags = getUniqueTags(posts as any);
    expect(tags).toHaveLength(2);
    expect(tags.map(t => t.tagName)).toContain("javascript");
    expect(tags.map(t => t.tagName)).toContain("react");
  });

  it("should return merged tags from posts and thoughts", () => {
    const posts = [makePost(["javascript"])];
    const thoughts = [makeThought(["random", "javascript"])];
    const tags = getUniqueTags(posts as any, thoughts as any);
    expect(tags).toHaveLength(2); // javascript (deduped) + random
    expect(tags.map(t => t.tagName)).toContain("javascript");
    expect(tags.map(t => t.tagName)).toContain("random");
  });

  it("should deduplicate tags across posts and thoughts", () => {
    const posts = [makePost(["javascript"])];
    const thoughts = [makeThought(["javascript"])];
    const tags = getUniqueTags(posts as any, thoughts as any);
    expect(tags).toHaveLength(1);
  });

  it("should work when no thoughts are provided", () => {
    const posts = [makePost(["javascript"])];
    const tags = getUniqueTags(posts as any);
    expect(tags).toHaveLength(1);
  });
});
