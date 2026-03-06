import { describe, it, expect } from "vitest";
import { getBucket } from "@/utils/getBucket";

describe("getBucket", () => {
  it('returns "<10s" for 0 seconds', () => {
    expect(getBucket(0)).toBe("<10s");
  });

  it('returns "<10s" for 9 seconds', () => {
    expect(getBucket(9)).toBe("<10s");
  });

  it('returns "10-30s" at exactly 10 seconds', () => {
    expect(getBucket(10)).toBe("10-30s");
  });

  it('returns "10-30s" for 29 seconds', () => {
    expect(getBucket(29)).toBe("10-30s");
  });

  it('returns "30-60s" at exactly 30 seconds', () => {
    expect(getBucket(30)).toBe("30-60s");
  });

  it('returns "30-60s" for 59 seconds', () => {
    expect(getBucket(59)).toBe("30-60s");
  });

  it('returns "1-3m" at exactly 60 seconds', () => {
    expect(getBucket(60)).toBe("1-3m");
  });

  it('returns "1-3m" for 179 seconds', () => {
    expect(getBucket(179)).toBe("1-3m");
  });

  it('returns "3-5m" at exactly 180 seconds', () => {
    expect(getBucket(180)).toBe("3-5m");
  });

  it('returns "3-5m" for 299 seconds', () => {
    expect(getBucket(299)).toBe("3-5m");
  });

  it('returns "5-10m" at exactly 300 seconds', () => {
    expect(getBucket(300)).toBe("5-10m");
  });

  it('returns "5-10m" for 599 seconds', () => {
    expect(getBucket(599)).toBe("5-10m");
  });

  it('returns ">10m" at exactly 600 seconds', () => {
    expect(getBucket(600)).toBe(">10m");
  });

  it('returns ">10m" for very large values', () => {
    expect(getBucket(3600)).toBe(">10m");
  });
});
