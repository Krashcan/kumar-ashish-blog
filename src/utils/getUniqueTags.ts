import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";
import thoughtFilter from "./thoughtFilter";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (
  posts: CollectionEntry<"blog">[],
  thoughts: CollectionEntry<"thoughts">[] = []
) => {
  const postTags = posts.filter(postFilter).flatMap(post => post.data.tags);
  const thoughtTags = thoughts
    .filter(thoughtFilter)
    .flatMap(thought => thought.data.tags);

  const tags: Tag[] = [...postTags, ...thoughtTags]
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
