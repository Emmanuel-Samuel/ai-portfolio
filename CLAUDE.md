# CLAUDE.md

Personal portfolio site for Emmanuel Samuel — a single long-form Next.js 16 landing page with an LLM-backed "AI Twin" chat and a Resend-backed contact form.

Stack: Next.js 16 App Router, React 19, TypeScript (`strict`), Tailwind v4, Framer Motion, next-themes, Radix/shadcn-style primitives.

## Project map

- `src/app/` — App Router. `layout.tsx` (metadata, JSON-LD, theming, `SmoothScroll`), `page.tsx` (section composition), `providers.tsx`
- `src/app/api/chat/` — AI Twin endpoint
- `src/app/api/contact/` — contact form endpoint
- `src/data/portfolio.ts` — source of truth for all personal, project, and career data
- `src/components/` — landing-page sections; `src/components/ui/` holds low-level primitives
- `src/lib/seo/` — canonical site metadata (`site.ts`) and schema graph (`jsonld.ts`)
- `src/lib/` — `ai-config.ts` (prompts, model), `ai-twin.ts` (knowledge context, link injection), `contact.ts` (Zod schema), `rate-limit.ts` (shared, used by both routes), `utils.ts` (`cn()`)
- `src/app/globals.css` — design tokens, cursors, theme variables

<important if="you need to run commands to build, test, lint, or verify a change">

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build production app |
| `npm run start` | Start production server |
| `npm run lint` | Lint repository |
| `npx eslint src/components/Navbar.tsx` | Lint one file |
| `npx eslint src/app/page.tsx src/app/api/contact/route.ts` | Lint multiple files |

No test runner is configured — there is no `test` script and no Jest/Vitest/Playwright/Cypress config. Verify meaningful changes with `npm run lint` and `npm run build`.

Use `npm`, not another package manager.
</important>

<important if="you are updating resume links, social links, project entries, or any career fact">

`src/data/portfolio.ts` is the source of truth. Homepage sections, contact links, AI Twin context, and SEO metadata all derive from it — after editing, verify the dependent SEO and chat behavior.
</important>

<important if="you are changing the AI Twin chat, its prompts, or its knowledge context">

- `src/components/AITwinChat.tsx` — chat UI, localStorage conversation persistence, retry UX, markdown rendering, suggestion chips, mobile/desktop dialog behavior
- `src/components/AITwinSection.tsx` — landing CTA that opens the chat via a custom window event
- `src/app/api/chat/route.ts` — input validation, rate limiting, history trimming, upstream LLM call, follow-up suggestions
- `src/lib/ai-config.ts` — system prompts and model selection
- `src/lib/ai-twin.ts` — portfolio knowledge context, project-name matching, stored history, contextual link injection

The assistant is intentionally scoped to Emmanuel Samuel's professional profile and project history. Changing portfolio data or project naming means reviewing both the prompt context and the link-generation logic.
</important>

<important if="you are changing the contact form or its email delivery">

- `src/components/ContactSection.tsx` — form UI, client validation, timeout handling, toasts
- `src/lib/contact.ts` — shared Zod schema and allowed contact reasons
- `src/app/api/contact/route.ts` — re-validates payload, rate-limits, builds sanitized email, sends via Resend
</important>

<important if="you are adding or modifying an API route">

Follow the existing pattern: Zod validation, `NextResponse.json(...)`, explicit status codes. Rate limiting comes from `src/lib/rate-limit.ts`, shared by both routes.
</important>

<important if="you are changing SEO, metadata, sitemap, or structured data">

SEO is centralized, not scattered across sections. `src/lib/seo/site.ts` defines canonical metadata, keywords, geo info, and identity; `src/lib/seo/jsonld.ts` builds the Website/WebPage/Person/project schema graph. `layout.tsx`, `sitemap.ts`, and `robots.ts` consume that layer.
</important>

<important if="you are adding or editing a homepage section, or navigation between sections">

`page.tsx` is intentionally compositional. Sections (`HeroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `SkillsSection`, `AITwinSection`, `ContactSection`) are presentation components backed by portfolio data. `Navbar` scrolls to hash sections and tracks the active one. `SmoothScroll` installs Lenis globally and intercepts in-page hash navigation — use the existing scroll helpers rather than custom scrolling.
</important>

<important if="you are writing styles, animation, or a new UI component">

- Design tokens and theme variables live in `src/app/globals.css`
- Extend the primitives in `src/components/ui/` before creating new base components
- Motion and reduced-motion support are already wired into key components — preserve that behavior when editing animated UI
</important>

<important if="you are creating a component or deciding on server vs client rendering">

Default to server components. Add `"use client"` only when hooks, browser APIs, animation, or event-driven UI require it.
</important>

<important if="you are adding or modifying imports">

Use `@/*` imports — `tsconfig.json` maps `@/*` to `src/*`.
</important>

<important if="you are working with environment variables or deployment config">

`RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`, `AI_MODEL`, `ANTHROPIC_API_KEY`, `LLM_BASE_URL`
</important>
