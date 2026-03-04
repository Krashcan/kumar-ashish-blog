/**
 * Derive the thought slug from its content collection id.
 * The id for a thought at `src/data/thoughts/march/note.md` is `march/note`.
 * The folder name ("march") becomes the slug used for grouping and routing.
 * For root-level thoughts (no folder), the id itself is used.
 */
export function getThoughtSlug(id: string): string {
  const parts = id.split("/");
  return parts.length > 1 ? parts[0] : id;
}
