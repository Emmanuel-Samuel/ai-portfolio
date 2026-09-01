# Writing a blog post

Posts are plain files. There is no CMS and no admin UI - you write Markdown,
commit it, and it deploys.

## Steps

1. Copy `_TEMPLATE.mdx.example` to a new file named for the URL you want:

       content/what-llm-calls-actually-cost.mdx

   That publishes at `/blog/what-llm-calls-actually-cost`.
   Use lowercase words separated by hyphens - no spaces, no capitals.

2. Fill in the frontmatter block at the top. All five fields matter:

   | Field     | Notes                                                        |
   |-----------|--------------------------------------------------------------|
   | `title`   | Shown as the H1. Do not repeat it as a heading in the body.  |
   | `summary` | One sentence. Used on the listing page and in meta tags.     |
   | `date`    | `YYYY-MM-DD`. Posts sort newest first.                       |
   | `tags`    | Array of strings, shown as chips on the card.                |
   | `draft`   | `true` = visible locally only. `false` = live in production. |

   A post missing `title` or `date` is silently skipped - if a post does not
   appear, check those two first.

3. Preview it with `npm run dev`, then visit http://localhost:3000/blog
   Drafts appear in dev so you can read them before publishing.

4. When it is ready, set `draft: false`, commit, and push. Vercel rebuilds
   and the post goes live.

## Reading time

Calculated automatically from the word count (~200 wpm). Nothing to set.

## Images

Put them in `public/images/blog/<post-slug>/` and reference them as
`![alt text](/images/blog/<post-slug>/name.webp)`.
Prefer WebP - a JPEG converted to PNG can be 5x larger for no visible gain.

## Files that are not posts

Anything not ending in `.md` or `.mdx` is ignored, which is why the template
is named `.mdx.example`.
