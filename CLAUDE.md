# Kumar Ashish Blog

Personal blog built on the AstroPaper Astro theme (v5.x). Posts live in `src/data/blog/`.

## Key files

- `src/config.ts` — site metadata (title, author, description, timezone=Asia/Kolkata)
- `src/constants.ts` — social links (GitHub, LinkedIn, email, X)
- `src/content.config.ts` — content collection schema
- `src/pages/index.astro` — homepage layout (hero section + featured/recent posts)
- `src/data/blog/` — blog post markdown files

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

## Homepage

The homepage (`src/pages/index.astro`) has:
- A hero section with heading + intro paragraph
- Featured posts (filtered by `featured: true`)
- Recent posts (non-featured, limited by `SITE.postPerIndex` which defaults to 4)

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
