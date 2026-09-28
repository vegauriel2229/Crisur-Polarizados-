---
name: Crisur Polarizados
description: "Window-film workshop landing: graphite glass, red brand light, film applied live by a squeegee."
colors:
  brand-red: "#e3262b"
  cta: "#d91f26"
  cta-hover: "#e0232a"
  accent-ink: "#ff5a5f"
  bg: "#0c0f13"
  surface: "#1a1e24"
  ink: "#eef1f4"
  ink-soft: "#c9cfd6"
  ink-muted: "#a9b0b9"
  line: "rgba(238, 241, 244, 0.14)"
  cool-light: "rgba(160, 180, 205, 0.09)"
  on-red: "#ffffff"
  film-clear: "rgba(172, 198, 224, 0.34)"
  film-tint-top: "#161b22"
  film-tint-bottom: "#040506"
  film-mirror-light: "#eef2f6"
  film-mirror-mid: "#8e98a4"
  film-mirror-dark: "#545c67"
  film-frost-top: "rgba(236, 241, 246, 0.72)"
  film-frost-bottom: "rgba(205, 213, 222, 0.52)"
  chrome-mid: "#c7ced6"
  chrome-shadow: "#8b949f"
  art-paint-top: "#3a424c"
  art-paint-bottom: "#21272e"
  art-tire: "#08090b"
  art-interior: "#12161b"
  art-interior-ink: "#4b5561"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "min(6rem, 11svh, calc((100vw - 2.5rem) / (var(--title-chars) * 0.9)))"
    fontWeight: 820
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  display-prefix:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.3rem, 0.95rem + 1.5vw, 2.3rem)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 3vw, 3.75rem)"
    fontWeight: 780
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 780
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  title-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 750
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 650
  nav:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 550
  nav-mobile:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 550
  wordmark:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 820
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  caption:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  label:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 550
rounded:
  hairline: "2px"
  control: "999px"
  surface: "14px"
  frame: "20px"
spacing:
  xs: "0.4rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  section: "clamp(4.5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.on-red}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.cta-hover}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-secondary-hover:
    backgroundColor: "rgba(255, 255, 255, 0.09)"
  button-card-cta:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.on-red}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "3rem"
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.nav}"
    rounded: "{rounded.control}"
    padding: "0 0.95rem"
    height: "2.75rem"
  nav-link-hover:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.ink}"
  nav-link-active:
    textColor: "{colors.ink}"
  nav-cta:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.on-red}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 1.2rem"
    height: "2.5rem"
  chip-treatment:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.28rem 0.7rem"
  card-service:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "1.5rem 1.5rem 1.75rem"
  glass-pane:
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
    padding: "0.55rem 0.55rem 0.8rem"
    width: "min(27rem, 34vw, 46svh)"
  menu-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "0.75rem"
---

# Design System: Crisur Polarizados

## Overview

**Creative North Star: "Glass Under Red Light"**

A window-film workshop after dark. The page is tinted graphite, the product (glass) is the only translucent material on it, and the brand's logo red behaves as light: it glows behind the featured pane, rides the squeegee's edge, and fills the button that starts a WhatsApp chat. Everything that is not glass is solid, quiet and dark, so the one memorable moment (film sliding across a window, left to right) reads clearly.

Density is low and mobile-first. One family, Archivo, carries the whole hierarchy by changing width and weight: headings run wide and heavy like automotive lettering, body copy sits at normal width. Illustrations are fine chrome line drawings of a car, a house and a shopfront whose glass panes take real film fills (smoke, mirror, frost) and visibly hide the interior behind them. The system shows privacy instead of naming it.

The previous 3D showroom was replaced by this flat vector glass world on purpose; palette and type survived the change. Real job photos, when they exist, replace the illustrations one-for-one; nothing is faked in the meantime.

**Key Characteristics:**
- Tinted blue-graphite ground, never flat black.
- Red used only as light and action, never as decoration.
- Real glassmorphism (backdrop blur) only on the three hero panes, because they are windows.
- One variable typeface, hierarchy by width axis (100 to 125) and weight (400 to 820).
- Pill controls, softly rounded solid cards, hairline edges at 14% ink.
- One signature motion: a squeegee applying film, driven by a single CSS number (`--film`, 0 to 1).

## Colors

A cold, low-light graphite palette with one warm voice: the logo red, rationed as light.

### Primary
- **Logo Red** (#e3262b): the brand's light source. The radial backlight behind the featured hero pane (at 50% alpha), the glow shadows under CTAs (75–85% alpha), the 2px underline of the active nav link, and text selection.
- **Action Red** (#d91f26): the fill of every WhatsApp call to action, always with white text (about 5:1).
- **Action Red Lit** (#e0232a): CTA hover fill; the brightest red that still keeps white text at 4.5:1 (AA).
- **Signal Coral** (#ff5a5f): the red that has to read on dark at small sizes: the 2px focus outline and the squeegee's leading edge. No text or icon is red (see The Red Is Light Rule). Action Red is never a text color on graphite (under 4.5:1).

### Neutral
- **Tinted Graphite** (#0c0f13): page background and browser theme color. The hero deepens it to #0e1116 then #0a0c10 and lays a cool top light over it (**Cool Light**, rgba(160, 180, 205, 0.09), `--color-cool-light`).
- **Graphite Surface** (#1a1e24): solid containers: service cards and the mobile menu panel.
- **Chrome Ink** (#eef1f4): headings, primary text, line icons, illustration detail strokes.
- **Soft Chrome** (#c9cfd6, `--color-ink-soft`): long reading text one step below ink: the hero lede and card summaries.
- **Brushed Steel** (#a9b0b9): secondary text: nav links at rest, the services intro, chips, benefit bodies, the wordmark suffix.
- **Hairline** (rgba(238, 241, 244, 0.14)): every edge: header rule, card outline, chip and ghost-button rings, media divider.
- **On-Red White** (#ffffff): text on red fills and selections only.

### Tertiary
The film and illustration materials. They live in `tokens.css` so a film color changes in one place.
- **Clear Glass** (rgba(172, 198, 224, 0.34)): unfilmed glass, deliberately lighter than its frame.
- **Smoke Film** (#161b22 to #040506, 94–97% opacity): polarizado.
- **Mirror Film** (#eef2f6 / #8e98a4 / #545c67, diagonal banded gradient): espejado.
- **Frost Film** (rgba(236, 241, 246, 0.72) to rgba(205, 213, 222, 0.52)): esmerilado.
- **Chrome Stroke** (white to #c7ced6 to #8b949f, vertical): the main outline of every drawing.
- **Body Paint** (#3a424c to #21272e), **Tire** (#08090b), **Interior** (#12161b) and **Interior Ink** (#4b5561): car bodywork and walls, wheels, and the room seen through clear glass.
- **Art Backdrop** (`--art-backdrop`, #1c222a to #13171d to #0e1115, vertical): the well behind every illustration, in the hero window and the card media.

### Named Rules
**The Red Is Light Rule.** Red appears only where light or action is: the backlight under the featured pane, CTA fills and their glow, the squeegee edge, the active-nav underline, the focus ring and text selection. Icons, headings, borders and ornaments stay in ink.

**The Clear Glass Rule.** Unfilmed glass is always lighter than its surroundings and shows the interior behind it; a film must visibly darken, mirror or frost that view. If a film does not change what is seen through the glass, it is not reading as film.

**The Graphite Not Black Rule.** Page and surface backgrounds are blue graphite (#0c0f13, #1a1e24). Near-black values exist only as materials inside the drawings (tire, smoke film).

## Typography

**Display Font:** Archivo Variable at width 125 (fallback: Archivo, system-ui, sans-serif)
**Body Font:** Archivo Variable at width 100 (same stack)

**Character:** A single self-hosted grotesque stretched wide and heavy for headings, like lettering on a car or a shop sign, and left at normal width for reading. Width steps (110, 112, 118, 125) do the work a second family would.

### Hierarchy
- **Display** (820, fit-to-word up to 6rem, 0.92, -0.03em, width 125): the one giant service word in the hero ("AUTOS", "LOCALES", "HOGARES", authored in capitals). Its size is the smallest of 6rem, 11svh and the viewport width divided by its own character count.
- **Display Prefix** (650, clamp 1.3–2.3rem, 1.1, -0.02em, width 110): the first line of the hero h1 ("Polarizado para"), same ink as the display word, one step down.
- **Headline** (780, clamp 2.1–3.75rem, 1.0, -0.03em, width 118): section h2, max 14ch, balanced wrap.
- **Title** (780, 1.6rem, 1.1, -0.02em, width 118): card h3.
- **Title Small** (750, 1.15rem, -0.01em, width 112): glass pane caption name.
- **Lede** (400, clamp 1–1.125rem, 1.6): hero lede (Soft Chrome, max 40rem) and the services intro (Brushed Steel, line height 1.65, max 52ch). Pretty wrap.
- **Body** (400, 1rem, 1.55): base text and card summaries (line height 1.6).
- **Body Small** (400, 0.95rem, 1.5): benefit lines; the lead-in phrase is ink at weight 620, the rest Brushed Steel.
- **Button / Nav** (650 / 550, 1rem): control labels. **Nav Mobile** (550, 1.05rem) for the full-width rows of the mobile menu.
- **Wordmark** (820, 1.2rem, -0.02em, width 125): "crisur" in the header lockup.
- **Caption** (400, 0.875rem) and **Label** (550, 0.8125rem): pane treatment line and treatment chips, both Brushed Steel.

Sizes are fluid (`clamp()` between a mobile floor and a desktop ceiling) rather than a fixed modular scale; the steps above are the whole ramp.

### Named Rules
**The One Family Rule.** Archivo is the only typeface. Hierarchy comes from the width axis and weight, never from a second family or a system display face.

**The Fit-To-Word Rule.** The display word scales to its own length and to the viewport height (`--title-chars`), so the longest service name never clips and the shortest never floats small.

## Layout

A single full-bleed dark column. The hero is a flex column at least `max(100svh, 640px)` tall: a 4.5rem header (4rem at 880px and below), centered copy, and the pane selector filling the remaining height. On portrait tablets (600px and up, aspect ratio 4/5 or taller) the hero drops its minimum height so the next section shows.

The services section sits in a 76rem container with `section` vertical padding and `gutter` sides (the header uses a slightly tighter clamp(1rem, 3vw, 2.5rem)). From 900px its header splits into two columns (1.1fr / 1fr, bottom-aligned, 3rem gap) and the card grid goes to three equal columns; below that, one column. Between 600px and 899px each card turns horizontal (art 0.9fr, text 1.1fr).

Spacing rhythm: 0.4rem inside clusters (chips, headline lines), 0.75rem between siblings (actions, benefits), 1rem inside card bodies, 1.25rem between cards, 1.5rem card and button padding. At 520px and below the hero actions stack full width (max 22rem) and the wordmark suffix hides. The body clips horizontal overflow so the side panes can bleed off-screen.

## Elevation & Depth

Hybrid: tonal layering (graphite ground, graphite surface) plus light. Shadows come in two kinds only: soft, deep black drops under things that float (glass panes, the mobile menu), and red glows under things that emit brand light (CTAs, the featured pane). Edges are 1px hairlines at 14% ink, usually drawn as inset rings. No hard offset shadows.

### Shadow Vocabulary
- **Glass Pane** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.07), 0 36px 60px -36px rgba(0,0,0,0.9)`): side panes; a lit top edge, a faint rim, a long soft drop.
- **Glass Pane Lit** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.24), inset 0 0 0 1px rgba(255,255,255,0.1), 0 40px 70px -34px rgba(227,38,43,0.5)`): the featured pane; the drop turns red.
- **CTA Glow** (`box-shadow: 0 12px 28px -12px rgba(227,38,43,0.75), inset 0 1px 0 rgba(255,255,255,0.2)`): hero primary button; hover deepens to `0 16px 32px -12px rgba(227,38,43,0.85)`.
- **Card CTA Glow** (`box-shadow: 0 12px 24px -14px rgba(227,38,43,0.8)`): card buttons.
- **Menu Lift** (`box-shadow: 0 24px 48px -12px rgba(0,0,0,0.6), inset 0 0 0 1px var(--color-line)`): the mobile menu panel.
- **Hairline Ring** (`box-shadow: inset 0 0 0 1px var(--color-line)`): cards, chips, the ghost button.

### Named Rules
**The Glass Only Where Glass Is Rule.** `backdrop-filter` blur (16px, saturate 1.3) exists only on the three hero panes, because they are windows. Cards, menus and sections are solid.

**The Light Behind Glass Rule.** The featured pane is lit from behind: a red radial glow shares its grid cell and sits under it, and the pane's own blur diffuses it. Red light is placed behind glass, not painted on it.

## Shapes

Three radii, plus a 2px hairline radius for the thin bars (active-nav underline, burger lines). Every control is a full pill (999px): buttons, nav links, chips, the burger. Solid surfaces are gently rounded (14px): cards, the mobile menu, and the window inside each glass pane. The glass frame itself is a little rounder (20px) so the inner window reads as set into it. Illustration and media wells are 16:10. The logo is a circle. Strokes in drawings are round-capped and non-scaling (1.6 outline, 1.2 details at 50% ink, 1 ground line at 22%).

## Components

### Buttons
Tactile pills that feel lit from below.
- **Shape:** full pill (999px), 3.25rem tall in the hero, 3rem in cards, 2.5rem in the header.
- **Primary:** Action Red fill, white label at 650, WhatsApp glyph, CTA Glow. On hover the fill brightens to Action Red Lit, the button lifts 1px, and a diagonal white shine sweeps across it (0.7s), the same gesture as the squeegee on glass.
- **Secondary (ghost):** 4% white fill with a Hairline Ring and ink label; hover raises the fill to 9% and lifts 1px. At 520px and below it drops fill and ring and sits under the primary as a 2.75rem text action.
- **Active:** scale 0.98. **Focus:** the global 2px Signal Coral outline, 3px offset.

### Chips
- **Style:** treatment tags on cards: no fill, Hairline Ring, pill, Brushed Steel label (550, 0.8125rem). Informational, not interactive.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Graphite Surface, solid; media well above in a dark vertical gradient (#1c222a to #0e1115) separated by a hairline.
- **Shadow Strategy:** Hairline Ring only; no drop.
- **Internal Padding:** 1.5rem sides, 1.75rem bottom, 1rem gap; the CTA is pushed to the bottom so all three align.
- **Behavior:** the card art rests with its film half applied, the squeegee stopped on a pane (before and after in one image); hover or keyboard focus inside the card completes the film over 0.9s.

### Navigation
- **Header:** hairline bottom rule; brand lockup of a 2.5rem circular logo, "crisur" in the display face (820, 1.2rem, width 125) and "polarizados" in Brushed Steel (450).
- **Links:** Brushed Steel pills at rest, ink on a 5% white fill on hover, ink with a 2px Logo Red underline bar when current. The Instagram link is an icon-only 2.75rem pill; "Consultar" is a compact red pill.
- **Mobile (880px and below):** a burger whose three 22px bars morph into an X; the links drop into a solid Graphite Surface panel (14px, Menu Lift), full-width 3rem rows at 1.05rem.

### Icons
Line icons at 1.25rem, 1.8 stroke, round caps, `currentColor` in ink. The WhatsApp glyph is the only filled icon. Benefit icons (heat, privacy, UV, security) sit in a 1.25rem column beside their text.

### Glass Pane Selector (signature)
Three glass frames stacked in one grid cell; `data-pos` (left, center, right) sets each one's transform. The frame is a translucent white gradient (11% to 3% to 6%) with 16px backdrop blur, 20px radius and the Glass Pane shadow; inside, a 14px 16:10 window holds the service art. Side panes scale to 0.74, dim to brightness 0.55 / saturation 0.7 (0.78 / 0.9 on hover) and hide their treatment line; below 880px they peek from the screen edges with captions hidden. The center pane gets the lit shadow and the red backlight. A change of service slides the panes (0.8s), peels the film off the leaving pane (0.4s) and replays the squeegee on the arriving one (1.1s); swipe, arrow keys, taps and nav links all drive it.

### Service Art with Film (signature)
Inline SVG in a 16:10 crop, layered: body paint, the interior visible through glass, clear glass with a diagonal sheen, then per-pane film clipped to each pane's exact shape, then frames and chrome outline on top. The film layer slides left to right by `translateX((--film - 1) * 100%)`; its leading edge is the squeegee, an 8-unit gradient from transparent Signal Coral to a white edge. `--film` is registered with `@property` as a number so it animates.

### Copy Crossfade
Hero text variants share one grid cell so the block never changes height. The leaving variant fades, drops 14px and blurs 6px (0.4s); the arriving one reverses it with a 0.1s delay.

## Do's and Don'ts

### Do:
- **Do** take every color, radius, easing and film fill from the custom properties in `src/styles/tokens.css`; add new values there first.
- **Do** use pills (999px) for every control, 14px for solid surfaces, and 20px only for glass frames.
- **Do** draw new illustrations as chrome line art over filled body shapes, with the interior visible through clear glass, so a dark film has something to hide.
- **Do** drive any film animation through the single `--film` number (0 to 1) and let CSS transitions interpolate it; script only changes state attributes.
- **Do** ease with `--ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for movement and `--ease-in-out` (cubic-bezier(0.65, 0, 0.35, 1)) for peeling and toggles; keep state changes at 0.2–0.25s.
- **Do** honor `prefers-reduced-motion`: drop transitions and the entrance. With motion on, the hero headline, lede and actions stay visible from the first frame: their entrance rises and un-blurs them but never fades them in from zero.

### Don't:
- **Don't** put `backdrop-filter` glass on cards, menus or sections; translucent blur is reserved for the hero panes.
- **Don't** use red on icons, headings, borders or decorative accents; red is light and action only.
- **Don't** use pure black or flat neutral grey for page or surface backgrounds.
- **Don't** add a second typeface or a system display face.
- **Don't** bring back 3D or WebGL scenes; the world is flat vector glass and CSS.
- **Don't** replace the illustrations with stock or placeholder photos; only real job photos, through the service's `photo` field, replace the art.
- **Don't** animate layout properties (width, height, top, margin); motion uses transform, opacity, filter and `--film`.
