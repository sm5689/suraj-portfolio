# suraj-world

Personal portfolio of **Suraj Mishra**, a software engineer building AI products and the systems beneath them.

**Live:** [suraj-world.vercel.app](https://suraj-world.vercel.app)

## Stack

- **Next.js 16** (App Router, React Server Components), **React 19**, **TypeScript**
- **Tailwind CSS v4** with CSS-variable design tokens and class-based dark mode
- **next/font** (Geist Sans + Geist Mono), **next/image** (AVIF/WebP)
- **next/og** for the generated social preview card and favicons
- Vercel Analytics + Speed Insights

## Highlights

- **Static + ISR.** The page is prerendered and revalidated every 6 hours. GitHub data (stars, live links) is fetched server-side in a single paginated request, so visitors never hit the GitHub API or its rate limits.
- **Graceful fallbacks.** If GitHub is unreachable, cards still render from local content. If a repo becomes private or is deleted, its link is dropped instead of pointing to a 404. Broken logos fall back to initials.
- **Zero-JS motion.** Scroll reveals use CSS scroll-driven animations (`animation-timeline: view()`), are disabled under `prefers-reduced-motion`, and content stays visible in browsers without support.
- **⌘K command menu** built on the native `<dialog>` element, with a full ARIA combobox/listbox pattern and keyboard navigation.
- **Accessible by default.** Skip link, semantic landmarks, visible focus rings, `aria-current` section tracking, AA-contrast color tokens, and native `<details>` disclosures.
- **SEO.** Generated Open Graph image, JSON-LD `Person` schema, sitemap, robots, web manifest, and canonical URL.

## Project structure

```
app/
  content.ts            ← all site copy and data (edit this to update the site)
  page.tsx              ← page composition
  layout.tsx            ← fonts, metadata, JSON-LD, theme provider
  globals.css           ← design tokens, dark mode, animations
  opengraph-image.tsx   ← generated 1200×630 social card
  icon.tsx, apple-icon.tsx, sitemap.ts, robots.ts, manifest.ts, not-found.tsx
components/
  CaseStudy.tsx         ← featured project with metrics + pipeline diagram
  ProjectCard.tsx, Experience.tsx, Nav.tsx, CommandMenu.tsx, ...
  ui.tsx                ← Container, Section, Button, Chip, Reveal primitives
lib/
  github.ts             ← cached GitHub enrichment
public/
  me.jpg, me-square.jpg, Suraj_Mishra_Resume.pdf
```

## Updating content

Everything visible on the site lives in [`app/content.ts`](app/content.ts):

- `caseStudies`: the four featured projects (summary, highlights, metrics, stack, pipeline steps)
- `projects`: the project grid. Set `repo` to the GitHub repo name to get live links and stars.
- `experience`, `earlierExperience`, `education`, `skills`, `stats`

To replace the résumé, overwrite `public/Suraj_Mishra_Resume.pdf` (the US version, linked from the site). The old `/resume.pdf` URL redirects to it, so previously shared links keep working.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

### Environment variables

| Variable       | Required | Purpose                                                        |
| -------------- | -------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN` | No       | Raises the GitHub API rate limit during builds and revalidation. A fine-grained token with no scopes is enough. |

## Deployment

Deployed on Vercel. Pushing to `main` triggers a production deploy. Enable **Analytics** and **Speed Insights** in the Vercel project settings to start collecting data.
