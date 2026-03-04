# Kumar Ashish Blog

Personal blog built on the AstroPaper Astro theme (v5.x). Posts live in `src/data/blog/`. Thoughts (short micro-posts) live in `src/data/thoughts/`.

## New Features
- For any new features being requested, we must use red/green tests
- Its important that readme is associated with the new changes

## Key files

- `src/config.ts` — site metadata (title, author, description, timezone=Asia/Kolkata)
- `src/constants.ts` — social links (GitHub, LinkedIn, email, X)
- `src/content.config.ts` — content collection schema
- `src/pages/index.astro` — homepage layout (hero section + featured/recent posts)
- `src/data/blog/` — blog post markdown files
- `src/data/thoughts/` — thought markdown files (short micro-posts)

## Blog post format

Posts are markdown files in `src/data/blog/`. Subdirectories are supported:
- Normal subdirs affect the URL (e.g. `blog/2025/post.md` → `/posts/2025/post`)
- Underscore-prefixed subdirs (`_releases/`) don't affect the URL

### Required frontmatter

```yaml
---
title: Post Title
pubDatetime: 2026-03-03T12:00:00Z  # ISO 8601
description: A short description used for SEO and excerpts.
---
```

### Optional frontmatter

```yaml
author: Kumar Ashish          # default = SITE.author
modDatetime: 2026-03-03T12:00:00Z  # only when post is modified
slug: custom-slug              # default = slugified filename
featured: false                # true → appears in Featured section on homepage
draft: false                   # true → hidden from published site
tags:
  - example                    # default = ["others"]
ogImage: ../../assets/images/og.png  # or remote URL
canonicalURL: https://...      # if cross-posted
hideEditPost: false            # hide edit button for this post
timezone: Asia/Kolkata         # override SITE.timezone
```

### Post body conventions

- Use `## Table of contents` where you want a TOC inserted
- Title (h1) comes from frontmatter, so body headings should start at h2
- Images can be in `src/assets/` (optimized) or `public/` (unoptimized)
- Markdown image syntax: `![alt](@/assets/images/img.png)` or relative paths

## Thoughts format

Thoughts are short, tweet-like posts stored in `src/data/thoughts/`. They have no title or description — just content and tags. Multiple thoughts share a page via the `slug` field (e.g., all thoughts with `slug: march` appear at `/thoughts/march`).

### Required frontmatter

```yaml
---
pubDatetime: 2026-03-01T10:00:00Z
tags:
  - random
slug: march
---
```

### Optional frontmatter

```yaml
modDatetime: 2026-03-03T12:00:00Z  # only when thought is modified
draft: false                        # true → hidden from published site
```

## Homepage

The homepage (`src/pages/index.astro`) has:
- A merged chronological feed of posts and thoughts
- Posts show title + 200-char excerpt via Card
- Thoughts show full content via ThoughtCard
- Links to "All Posts" and "All Thoughts"

## Workflow: uncommitted blog posts

When the user shares a blog post that hasn't been committed yet, automatically:
1. **Proofread** — apply the proofreading prompt below
2. **Add frontmatter** — add required (and any relevant optional) frontmatter if missing
3. **Fix markdown formatting** — ensure headings, links, images, and structure follow post body conventions

## Proofreading prompt

Use this when asked to proofread a post:

> You are a proofreader for posts about to be published.
>
> 1. Identify spelling mistakes and typos
> 2. Identify grammar mistakes
> 3. Watch out for repeated terms like "It was interesting that X, and it was interesting that Y"
> 4. Spot any logical errors or factual mistakes
> 5. Highlight weak arguments that could be strengthened
> 6. Make sure there are no empty or placeholder links
