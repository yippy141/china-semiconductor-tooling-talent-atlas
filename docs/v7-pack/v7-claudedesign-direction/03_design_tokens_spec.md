# 03 — Design tokens spec

Tailwind v4 uses CSS-first config via `@theme` blocks in your stylesheet.
The repo today has one such block in `app/globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: Arial, Helvetica, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}
```

v7 replaces it with the block below. Drop in. No `tailwind.config.ts` is
needed (Tailwind v4 does not require one).

## `app/globals.css` — full replacement

```css
@import "tailwindcss";

:root {
  /* Paper / ink */
  --color-paper:        #f3efe7;
  --color-paper-deep:   #ece7dc;
  --color-paper-edge:   #d9d2c2;
  --color-ink:          #14110d;
  --color-ink-soft:     #2a2620;
  --color-muted:        #6b6358;
  --color-muted-2:      #8a8174;

  /* Rules */
  --color-rule:         #1c1917;
  --color-rule-hair:    #c8c2b6;

  /* Accent + signals */
  --color-accent:       #b07418;   /* editorial amber */
  --color-accent-deep:  #7c4f0f;
  --color-sig-green:    #5a6b3e;   /* keep — source-checked badge */

  /* Reverse-out (city map, source trail) */
  --color-reverse:      #08070a;
  --color-reverse-soft: #1c1917;

  --font-sans-default: "IBM Plex Sans", system-ui, sans-serif;
  --font-serif-default: "Source Serif 4", "Iowan Old Style", Georgia, serif;
  --font-mono-default:  "IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace;
}

@theme inline {
  /* Tailwind palette aliases — so `bg-paper`, `text-ink`, `border-rule` work */
  --color-background:   var(--color-paper);
  --color-foreground:   var(--color-ink);
  --color-paper:        var(--color-paper);
  --color-paper-deep:   var(--color-paper-deep);
  --color-paper-edge:   var(--color-paper-edge);
  --color-ink:          var(--color-ink);
  --color-ink-soft:     var(--color-ink-soft);
  --color-muted:        var(--color-muted);
  --color-muted-2:      var(--color-muted-2);
  --color-rule:         var(--color-rule);
  --color-rule-hair:    var(--color-rule-hair);
  --color-accent:       var(--color-accent);
  --color-accent-deep:  var(--color-accent-deep);
  --color-sig-green:    var(--color-sig-green);
  --color-reverse:      var(--color-reverse);
  --color-reverse-soft: var(--color-reverse-soft);

  /* Type families — bound in app/layout.tsx via next/font */
  --font-sans:  var(--font-plex-sans, var(--font-sans-default));
  --font-serif: var(--font-source-serif, var(--font-serif-default));
  --font-mono:  var(--font-plex-mono, var(--font-mono-default));
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Optional — v7 ships light only. Comment back in if dark mode is needed. */
    /* --color-paper: #14110d; --color-ink: #f3efe7; */
  }
}

html, body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-feature-settings: "ss01", "onum";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Utility: tabular numerals for stat strips and figure columns */
.tabular-nums { font-feature-settings: "tnum"; }
```

## Fonts — bind via `next/font/google` in `app/layout.tsx`

Add three font instances and pass their variable names through to `<html>`:

```tsx
import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "China Semiconductor Tooling Talent Atlas",
  description: "An editorial evidence product built from local CSV data.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
```

No npm install needed — `next/font` is bundled with Next 16.

## Type ramp (used in markup)

| Role | Family | Size / line-height | Weight | Tracking | Tailwind utility |
| --- | --- | --- | --- | --- | --- |
| Display (hero) | serif | `text-[56px] leading-[1.0]` → `text-[76px]` at `lg` | 400–500 | `-0.02em` | `font-serif font-medium tracking-[-0.02em]` |
| Section title | serif | `text-[36px] leading-[1.05]` | 500 | `-0.015em` | `font-serif font-medium` |
| Subhead (h3 in argument findings) | serif | `text-[17px] leading-snug` | 600 | normal | `font-serif font-semibold` |
| Body | serif | `text-[18px] leading-[1.6]` | 400 | normal | `font-serif text-ink-soft` |
| Standfirst / dek | serif | `text-[22px] leading-[1.45]` | 400 | normal | `font-serif text-ink-soft` |
| Caption | sans | `text-[12px] leading-[1.5]` | 500 | `+0.04em` | `font-sans text-muted` |
| Eyebrow / kicker | sans | `text-[11px] uppercase` | 600 | `+0.22em` | `font-sans uppercase tracking-[0.22em] text-muted` |
| Stat number | serif | `text-[32px] tabular-nums` | 500 | `-0.01em` | `font-serif font-medium tabular-nums` |
| Source ID | mono | `text-[12px]` | 500 | normal | `font-mono` |

## Color usage rules

| Element | Token |
| --- | --- |
| Page background | `bg-paper` |
| Secondary surface (pull-quote, raised exhibit) | `bg-paper-deep` |
| Primary text | `text-ink` |
| Body prose | `text-ink-soft` |
| Captions, denominators, metadata | `text-muted` |
| Section dividers, major rules | `border-rule` (1px solid) |
| In-section dividers, table rows | `border-rule-hair` (1px solid) |
| Section markers (§ glyph), drop caps, accent links | `text-accent` / `text-accent-deep` |
| Source-checked badge | `text-sig-green` + `border-sig-green/40` |
| Reverse-out sections (city map, source trail) | `bg-reverse text-paper`, with `border-reverse-soft` for internal rules |
| Primary CTA | `bg-ink text-paper border-ink` |
| Secondary CTA / link | underline on `border-rule-hair` |

**Rules of restraint.**
- No shadows on body content. Allow one `shadow-[0_24px_50px_-32px_rgba(15,12,8,0.18)]` on a single elevated surface (the city map already self-elevates with its dark background, so this is rarely used).
- No rounded corners on text containers (`rounded-none` enforced by reset of `0px` everywhere). Exhibits that have a frame (e.g. the city map inspector) may use `rounded-sm` (2px) maximum.
- No filled-color backgrounds on cards. Use hairlines and gutters.
- One accent at a time. The amber is reserved for: §-glyphs, drop caps, the active node on the city map, the `chip-tooling` italic in the hero title. Nowhere else.

## Spacing scale

| Step | Value | Used for |
| --- | --- | --- |
| `2` | 8px | gap inside chips |
| `4` | 16px | body paragraph spacing |
| `6` | 24px | column gap (mobile) |
| `8` | 32px | column gap (desktop) |
| `12` | 48px | section padding y (mobile) |
| `16` | 64px | section padding y (desktop) |
| `24` | 96px | between sections (border-top + padding-top) |

Grid: `max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14`. Inside the article
shell, use a `grid-cols-[96px_1fr]` (gutter / content) for section bodies and
`grid-cols-[1fr_19rem]` for the hero (content / exhibit). Both already
present in the repo — just resize.

## Source-checked badge — keep, but restyle to match

The badge today reads as a green pill on light-green fill. v7 keeps the
meaning, makes it quieter:

```tsx
<span className="inline-flex items-center gap-1.5 border border-sig-green/40 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-sig-green">
  <span aria-hidden>✓</span> Source checked
</span>
```

Source IDs paired with badge keep the mono treatment:

```tsx
<span className="font-mono text-[12px] text-muted">CN_FILING_AMEC_2025</span>
```

## What about the dark sections

`CitySignalMap` and the `Source trail` block are reverse-out. v7 keeps them
but maps their colors to the new tokens:

| Old | New |
| --- | --- |
| `bg-stone-950` | `bg-reverse` |
| `text-stone-100` | `text-paper` |
| `border-stone-800` | `border-reverse-soft` |
| `text-amber-300` (city-map highlight) | `text-accent` |

The change is mechanical and won't affect layout.

→ Continue to [`04_coding_agent_prompts.md`](./04_coding_agent_prompts.md).
