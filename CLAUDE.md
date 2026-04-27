# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

This is a static, single-page website with no build tools or dependencies. To develop:

```bash
# Start a local server (Python)
python3 -m http.server 8000

# Or use Node.js if installed
npx http-server

# Or Ruby
ruby -run -ehttpd . -p8000
```

Then open http://localhost:8000 in your browser. Changes to HTML/CSS/JS are reflected on refresh.

## Project Structure

**`index.html`** — The only page. Contains all semantic HTML sections, meta tags for SEO, and JSON-LD structured data for search engines.

**`script.js`** — Pure vanilla JavaScript (no frameworks). Handles:
- Mobile menu toggle with keyboard support (Escape to close)
- Smooth scroll navigation with `prefers-reduced-motion` respect
- FAQ accordion (single-open pattern)
- Program tab switching (two course offerings)
- Intersection Observer for fade-in animations on scroll
- Click-outside menu closure

**`style.css`** — Single 1330-line stylesheet using CSS custom properties (`--navy-950`, `--sky-500`, etc.). Organized by component. Includes:
- Full responsive design (breakpoints at 1080px, 860px, 700px, 480px)
- Glassmorphism effects (`backdrop-filter: blur`)
- Gradient overlays and animations
- Mobile-first layout with flexbox/grid

## Architecture & Patterns

### Component-Based Styling
Each major section has a dedicated component class (`.mentor-card`, `.faq-item`, `.program-overview`, etc.). Shared styles use CSS variables for consistency. Colors, spacing, and transitions are defined once in `:root`.

### Responsive Strategy
- **1080px and down**: Multi-column grids (3 cols) → 2 cols. Hero and layouts shift to single column.
- **860px and down**: Hamburger menu appears. Mobile nav slides from top.
- **700px and down**: All grids become single column. Buttons full-width.
- **480px and down**: Further padding reductions. Mobile-friendly font sizes.

### Interaction Patterns

**Mobile Menu:**
- Hamburger button toggles `.active` class on button and nav links.
- Click outside or press Escape closes menu.
- Nav link clicks auto-close menu.
- Animated hamburger icon (X when open).

**FAQ Accordion:**
- Buttons control `aria-expanded` state.
- Only one FAQ can be open at a time (others close when one opens).
- Answer uses CSS grid `grid-template-rows: 0fr` / `1fr` for smooth collapse/expand.

**Program Tabs:**
- Tab buttons control which panel displays via `aria-selected` and `aria-controls`.
- Panels hidden with `hidden` attribute and CSS `display: none`.
- Active panel gets `.active` class and `display: block` with fade-in animation.

**Scroll Animations:**
- Elements with `.fade-in` class start at `opacity: 0; transform: translateY(28px)`.
- Intersection Observer triggers `.visible` class when element enters viewport.
- Respects `prefers-reduced-motion: reduce` — no animations if user prefers.

### Accessibility Highlights
- Proper ARIA labels on interactive elements (`aria-expanded`, `aria-selected`, `aria-controls`)
- Skip-to-content link for keyboard users
- Focus styles with 3px outline
- Semantic HTML: `<button>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Alt text on SVG icons via `aria-hidden="true"` (decorative) where appropriate
- Form links (`href="https://forms.gle/..."`) open in new tabs with `rel="noopener noreferrer"`

## Key Content Sections

The site follows a consistent structure with six major sections:

1. **Hero (#hero)** — Eye-catching intro with gradient background, CTAs, and a side panel
2. **Audience (#audience)** — Three-card feature grid: Students, Professionals, Hands-on learners
3. **What You'll Build (#build)** — Three cards describing project-based outcomes
4. **Outcomes (#outcomes)** — Numbered list (4 items) + side panel on dark background
5. **Instructors (#instructors)** — Four mentor cards with names/credentials
6. **Programs (#programs)** — Tabbed interface switching between two course tracks

Additional sections: FAQ, Blog, Apply CTA, Pricing, Footer.

## How to Modify Content

### Update Hero Section
Edit the `.hero-title` text, subtitle, and proof points in the `<section id="hero">` block. The side panel (`.hero-panel`) shows program snapshot—update the list and metrics.

### Add/Remove Mentor Cards
Copy a `.mentor-card` article in `<section id="instructors">`. Card colors: default is light background; `.mentor-card-accent` is dark. Update name, title, and credentials.

### Update Program Content
Each program tab (`#panel-general`, `#panel-llm`) has its own `.syllabus-grid`. Each `.syllabus-item` is a module card. Update titles, descriptions, and badge text. Update tool chips in `.tools-list` for the LLM program.

### Modify Colors/Spacing
All colors and transitions are in CSS `:root` variables. Change `--navy-950`, `--sky-500`, `--radius-lg`, etc. to update the entire site. No hex values scattered through the CSS.

### Add New Sections
Use the existing `.section-light`, `.section-tint`, or `.section-dark` classes for background. Create a grid (use `grid-template-columns: repeat(3, minmax(0, 1fr))` for three-column). Add fade-in animations by adding the element class to the observer in `script.js` line 120.

## Testing Checklist

- **Mobile responsiveness**: Test at 480px, 700px, 860px, 1080px
- **Mobile menu**: Tap hamburger, click nav links, press Escape, click outside
- **Scroll animations**: Scroll through page; elements should fade in (unless `prefers-reduced-motion` is set)
- **Tab switching**: Click "AI for Real-World Decision Making" and "LLM Systems Engineering" tabs
- **FAQ**: Click questions; ensure only one opens at a time
- **Links**: All CTA buttons go to Google Forms or WhatsApp
- **Keyboard navigation**: Tab through interactive elements; focus outline should be visible

## Notes

- **No dependencies**: This is vanilla HTML/CSS/JS. No npm, no build step.
- **Static hosting**: Drop files on any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront). Add `_headers` or `.htaccess` if needed for cache control.
- **PDF files**: Two AI Workshop PDFs are in the root. Consider moving to a `/assets/` folder if more files are added.
- **Performance**: Currently light (single HTML, 1 CSS, 1 JS, 2 PDFs). Inline critical CSS if needed, or minify for production.
- **SEO**: Includes Open Graph tags, Twitter Card meta, and JSON-LD structured data (Course schema). Update `og:url` and social tags if domain changes.

## Common Edits

| Task | File | Lines |
|------|------|-------|
| Change site colors | `style.css` | 1–27 (`:root` variables) |
| Update hero copy | `index.html` | 73–112 |
| Add a mentor | `index.html` | 286–310 (mentor cards) |
| Update program syllabus | `index.html` | 402–485 (module cards) |
| Adjust spacing/padding | `style.css` | Component sections (e.g., 539–571) |
| Modify animations | `script.js` | 118–141 (Intersection Observer fade-in) |
| Add new interactive section | `script.js` | Add query selector and event listener |
