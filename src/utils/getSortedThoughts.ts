import type { CollectionEntry } from "astro:content";
import thoughtFilter from "./thoughtFilter";

const getSortedThoughts = (thoughts: CollectionEntry<"thoughts">[]) => {
  return thoughts
    .filter(thoughtFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedThoughts;
