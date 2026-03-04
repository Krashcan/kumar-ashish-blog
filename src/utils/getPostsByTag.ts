import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import getSortedThoughts from "./getSortedThoughts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(
    posts.filter(post => slugifyAll(post.data.tags).includes(tag))
  );

const getThoughtsByTag = (
  thoughts: CollectionEntry<"thoughts">[],
  tag: string
) =>
  getSortedThoughts(
    thoughts.filter(thought => slugifyAll(thought.data.tags).includes(tag))
  );

export default getPostsByTag;
export { getThoughtsByTag };
