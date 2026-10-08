---
name: Researchub
description: Multi-agent research and humanization platform that produces human-grade reports passing all AI classifiers.
colors:
  orange-primary: "#fa520f"
  orange-deep: "#cc3a05"
  orange-sunshine: "#ff8a00"
  orange-mid: "#ffa110"
  orange-light: "#ffb83e"
  orange-pale: "#ffd06a"
  yellow-sat: "#ffd900"
  cream: "#fff8e0"
  cream-soft: "#fffaeb"
  cream-deeper: "#fff0c2"
  beige-deep: "#e6d5a8"
  canvas: "#ffffff"
  surface: "#fafafa"
  surface-code: "#1c1c1e"
  hairline: "#e5e5e5"
  hairline-strong: "#c7c7c7"
  ink: "#1f1f1f"
  charcoal: "#2c2c2c"
  slate: "#4a4a4a"
  steel: "#6a6a6a"
  stone: "#8a8a8a"
  muted: "#a8a8a8"
  verified-green: "#059669"
  risk-red: "#be123c"
typography:
  body:
    fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  title:
    fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  display:
    fontFamily: "'Anton', 'Space Grotesk', Impact, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
    textTransform: "uppercase"
rounded:
  sm: "7px"
  md: "8px"
  lg: "12px"
  xl: "20px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.orange-primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.orange-deep}"
  button-primary-active:
    backgroundColor: "{colors.orange-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    padding: "8px 16px"
  nav-tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-cream:
    backgroundColor: "{colors.cream-soft}"
    rounded: "{rounded.lg}"
  metric-card:
    backgroundColor: "{colors.surface}"
    rounded: "10px"
    padding: "14px 16px"
---

# Design System: Researchub

## Overview

**Creative North Star: "The Research Foundry"**

Researchub is built like a precision instrument: clean surfaces that stay out of the way, controlled warmth that signals trustworthiness, and a single molten accent that marks the places where work happens. The canvas is white and cream — the color of good paper, of working drafts, of a document that means something. The orange burns at exactly one temperature and appears at exactly one moment: when you're ready to act.

The system rejects decoration by conviction. Every visual decision is a working decision. The pipeline step indicator, the forensic score ribbon, the mode-switch tabs — each exists because a user needs it at a specific moment. Nothing is there to look impressive.

Density is medium-low. The tool deals in high-stakes academic and professional output; it earns focus by refusing to crowd it. Whitespace is not a luxury — it is the container that makes precision readable.

**Key Characteristics:**
- Warm paper surfaces (cream/white) with a single molten orange accent
- Functional density: nothing decorative, every element earns its pixel
- Tactile buttons — springs back, presses down, lives in the hand
- Monospaced labels and status indicators read like instrument panels, not marketing
- Light mode always; no dark variant currently implemented

## Colors

The palette is a warm daylight foundry: cream paper backgrounds, charcoal ink, and one saturated orange flame that marks every call to action and every live-state indicator.

### Primary
- **Forge Orange** (`#fa520f`): The single active accent. CTAs, the active tab underline, live-state pings, icon accents. It appears only at action points and live indicators — nowhere decorative.
- **Deep Forge** (`#cc3a05`): Hover and pressed state of Forge Orange only. Never used at rest.
- **Sunshine** (`#ff8a00`): Secondary orange warmth; used only in the preset/feather icon in the command palette and light highlight contexts. Not interchangeable with Forge Orange.

### Tertiary
- **Verified Green** (`#059669`): Exclusively for passed/success/0%-risk states. The forensic score ribbon and pipeline step completion indicators.
- **Risk Red** (`#be123c`): Exclusively for high AI-risk verdicts and flagged-token chips.

### Neutral
- **Ink** (`#1f1f1f`): Primary text — headlines, body, all active labels.
- **Charcoal** (`#2c2c2c`): Body emphasis, slightly lighter than Ink for long-form reading contrast.
- **Slate** (`#4a4a4a`): Secondary text — inactive tab labels, button ghost text, descriptive metadata.
- **Steel** (`#6a6a6a`): Tertiary text — nav tabs at rest, status strip values.
- **Stone** (`#8a8a8a`): Muted labels, placeholders, word count.
- **Muted** (`#a8a8a8`): Disabled states and keyboard hint legends.
- **Canvas** (`#ffffff`): Card and modal backgrounds — pure white.
- **Surface** (`#fafafa`): Page background — one step off white to separate from cards.
- **Cream Soft** (`#fffaeb`): Input panel background and status strip — warm, not yellow.
- **Cream Deeper** (`#fff0c2`): Input panel header background; hover tint on quick-prompt rows.
- **Beige Deep** (`#e6d5a8`): Input panel and cream-card borders; warm hairline.
- **Hairline** (`#e5e5e5`): Neutral card and structural borders.
- **Hairline Strong** (`#c7c7c7`): Input borders, scrollbar thumb, stronger dividers.
- **Surface Code** (`#1c1c1e`): Code blocks and raw-draft comparison surfaces only.

### Named Rules
**The One Flame Rule.** `#fa520f` appears on ≤2 elements visible at any moment. Its scarcity is what makes it readable as "action here." Adding orange for decoration breaks the wayfinding system.

**The Cream Warmth Rule.** Interactive input surfaces use cream (`#fffaeb`), not white. White is reserved for output cards and modals. The distinction communicates: cream = where you type, white = where you read.

## Typography

**Body Font:** Space Grotesk (with Inter, -apple-system, BlinkMacSystemFont as fallbacks)
**Label / Mono Font:** JetBrains Mono (with SF Mono as fallback)
**Display Font:** Anton (with Space Grotesk, Impact as fallbacks — reserved for hero/brand contexts)

**Character:** Space Grotesk brings geometric confidence with slight humanist warmth — it reads like a smart, well-organized person rather than a sterile machine. JetBrains Mono marks everything that is data, status, metadata, or code: it signals instrument-panel precision without decoration.

### Hierarchy
- **Display** (Anton, 400, clamp(2rem–3.5rem), line-height 0.95, uppercase): Brand wordmark and hero-scale contexts only. Not used in the application shell.
- **Title** (Space Grotesk, 600, 14px, line-height 1.4): Section headers, button labels, tab labels, modal titles. The workhorse of the chrome.
- **Body** (Space Grotesk, 400–500, 15px, line-height 1.65): Textarea input, report output prose, descriptive copy. Max comfortable line length: 75ch.
- **Label** (JetBrains Mono, 700, 10px, 0.08em letter-spacing, uppercase): Status strip values, pipeline stage names, section labels above form zones, forensic score captions. Always monospaced. Always uppercase.
- **Caption** (Space Grotesk, 500, 13px): Ghost button labels, command palette items, word count, secondary metadata.

### Named Rules
**The Mono-for-Instruments Rule.** Monospaced type appears only for status data, classification labels, timestamps, and keyboard hints — never for prose or navigation. When you see JetBrains Mono, you're reading an instrument reading, not a sentence.

## Layout

The layout is a single centered column (max-width 1280px, 16px / 24px horizontal padding on mobile / desktop). No sidebars; no split panes. One focused working surface at a time.

**Structure (top → bottom):**
1. Sticky header (56px tall): logo left, mode tabs center-left, action icons right. Frosted glass at `rgba(255,255,255,0.92)` with 16px backdrop blur — present but not opaque.
2. Status strip (36px tall): warm cream background (`#fffaeb`), hairline bottom border. Persistent protocol status + quick links. Scrolls with page on mobile.
3. Main content column: 24px vertical gap between sections, 8–40px padding.
4. Input panel: cream card, 12px radius. Header stripe in `#fff0c2`, full-width textarea (transparent background), footer bar with word count + CTA.
5. Output zone: white cards with 12px radius, stacked vertically, 20px gap.

**Responsive behavior:** Below 640px the status strip scrolls horizontally; the mode tabs remain visible but keyboard shortcuts are hidden. Ghost buttons collapse to icon-only below 480px. The max-width container adds 16px side padding on mobile, 24px on tablet, 40px on desktop.

**Spacing rhythm:** 4px base unit. Component internal padding is multiples: 8px (xs), 16px (md), 24px (lg). Sections separated by 24–32px gaps. The 8px grid is the ground rule; 4px adjustments are available for optical corrections only.

## Elevation & Depth

This system is near-flat by philosophy. Depth is expressed through **tonal layering**, not shadows — surfaces stack from `#fafafa` (page) → `#ffffff` (cards) → `#fffaeb` (active input zone) → `#fff0c2` (input header). There is no true z-axis until overlays appear.

**The exception is state:** shadows exist only as a response to interaction, not at rest.

### Shadow Vocabulary
- **Hover lift** (`0 4px 12px rgba(250, 82, 15, 0.4)`): Primary button hover only. Orange-tinted — communicates warmth, not altitude.
- **Resting button** (`0 1px 3px rgba(250, 82, 15, 0.3)`): The primary button at rest carries a 1px ambient shadow so it reads as a pressable object. Everything else is shadowless.
- **Modal overlay** (`rgba(0,0,0,0.35)` backdrop + `blur(8px)`): Command palette and modals. The blur is structural — it separates the focus layer without a hard edge.

### Named Rules
**The Flat-By-Default Rule.** Cards, inputs, nav, chips, and metric tiles are shadowless at rest. Shadows appear only on the primary button (always) and on hover states (orange lift only). If an element needs a shadow to look like a separate surface, it is probably better served by a 1px border.

## Shapes

Corner radius follows a consistent vocabulary:
- **7px** (`rounded.sm`): Ghost buttons, small controls, textarea focus rings.
- **8px** (`rounded.md`): Primary buttons, pipeline steps, select dropdowns.
- **10px**: Metric score cards (tighter, data-grid feel).
- **12px** (`rounded.lg`): Input panel, standard output cards, modals.
- **20px** (`rounded.xl`): Status chips (pill-orange, pill-green, pill-red) and PR-39 status badge — pill shapes signal badges and non-interactive classification.

**Form language:** The system is gently rounded — enough to feel approachable, not so rounded it reads as consumer-product. Right angles are avoided entirely. Borders are 1px, never thicker. There are no decorative dividers; only structural hairlines where layout sections meet.

**The Input Zone shape:** the cream panel has a 12px outer radius with a subtly darker `#fff0c2` header stripe, creating an inset panel feel without a shadow.

## Components

### Buttons

**Character:** Tactile and confident. Every button springs back on release — `scale(0.98)` press, `translateY(-1px)` hover lift, spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on the bounce-back. They feel like physical keys.

- **Shape:** 8px radius (`rounded.md`)
- **Primary (`.btn-primary`):** Forge Orange fill (`#fa520f`), white label, 10px / 20px padding, 600 weight, 14px Space Grotesk. Shadow at rest: `0 1px 3px rgba(250,82,15,0.3)`. Hover: deepens to `#cc3a05`, lifts `translateY(-1px)`, orange shadow blooms. Press: `scale(0.98)`, shadow drops.
- **Ghost (`.btn-ghost`):** Transparent background, Slate (`#4a4a4a`) text, 1px `#e5e5e5` border, 7px radius. Hover: fills to Surface (`#fafafa`), border darkens to `#c7c7c7`.
- **Disabled:** 0.45 opacity, `not-allowed` cursor, no transform. Applied via `:disabled` — never via class override.
- **Transition:** `160ms cubic-bezier(0.34, 1.56, 0.64, 1)` on all properties.

### Navigation Tabs

- **Style:** Flat text tabs flush with the header bottom border. 14px Space Grotesk, 500 weight at rest, 600 active.
- **Default:** Steel text (`#6a6a6a`), transparent border-bottom (2px, transparent — always present to prevent layout shift).
- **Active:** Ink text (`#1f1f1f`), Forge Orange 2px bottom border (`#fa520f`).
- **Hover:** Ink text, border stays transparent.
- **Mobile:** Tabs overflow-scroll horizontally with `scrollbar-none`. Keyboard shortcuts (⌥1, ⌥2, ⌥3) are hidden below `md` breakpoint.

### Input Panel (Signature Component)

The cream-surfaced query zone is the product's primary surface. It is not a `<textarea>` styled in isolation — it is a composed panel.

- **Outer:** 12px radius, `#fffaeb` background, `1px solid #e6d5a8` border.
- **Header stripe:** `#fff0c2` background, bottom border `1px solid #e6d5a8`. Contains mode label in JetBrains Mono uppercase (10px, 700) and preset selector when in Humanize mode.
- **Textarea:** Transparent background, no border, no outline. 15px Space Grotesk, `#1f1f1f` text, `#8a8a8a` placeholder. Line-height 1.65. Minimum height 140px.
- **Quick-prompt rows (Research idle):** 10px JetBrains Mono label "SUGGESTED QUERIES", then rows at 13px Space Grotesk `#4a4a4a`. Each row hovers to `#fff0c2` background with a Forge Orange `ChevronRight` appearing at the right edge.
- **Footer bar:** `1px solid #e6d5a8` top border. Left: word count + `⌘Enter` kbd hint in Stone (`#8a8a8a`) JetBrains Mono. Right: primary CTA button.

### Cards (Output)

- **Standard output card:** `#ffffff` background, `1px solid #e5e5e5` border, 12px radius, 32px / 40px padding on mobile / desktop.
- **Verified ribbon:** `#f0fdf4` background, `1px solid #a7f3d0` border. Used when results are safe (0% AI risk). Contains metric cards in a flex row.
- **Risk ribbon:** `#fff1f2` background, `1px solid #fecdd3` border. Used when AI risk is high.
- **Metric card:** `#fafafa` background, `1px solid #e5e5e5` border, 10px radius, 14px / 16px padding. Centered: caption (JetBrains Mono 10px Stone) above value (Space Grotesk 600 20px, colored green or red by score).

### Chips / Pills

- **Status chip (pill-orange):** `#fff0c2` background, `#cc3a05` text, `1px solid #e6d5a8` border, 20px radius, JetBrains Mono 10px uppercase — used for "PR-39 Active" badge.
- **Verified chip (pill-green):** `#ecfdf5` background, `#059669` text, `1px solid #a7f3d0` border, 20px radius.
- **Risk chip (pill-red):** `#fff1f2` background, `#be123c` text, `1px solid #fecdd3` border, 20px radius — used for flagged AI token badges.

### Agent Pipeline (Signature Component)

The live pipeline indicator appears during research execution. Each step is a `.pipeline-step` row:
- **Done:** `#ecfdf5` background, green `CheckCircle2` icon, Slate text.
- **Running:** `#fffaeb` (cream-soft) background, spinning Forge Orange `Activity` icon, Ink bold text.
- **Pending:** 50% opacity, numbered circle border icon, Muted text.
- **Container:** white card, 12px radius, 20px padding, 1.5px gap between steps.

### Command Palette (⌘K)

- **Backdrop:** `rgba(0,0,0,0.35)` with `blur(8px)`.
- **Panel:** `#ffffff` background, `1px solid #e5e5e5` border, 16px radius, max-width 512px.
- **Search bar:** Command icon (Forge Orange), 14px Space Grotesk, `#8a8a8a` placeholder, ESC kbd hint.
- **Item hover:** `#fffaeb` row background, 8px radius — warm cream flush, not a selection highlight.
- **Section headers:** JetBrains Mono, 10px, uppercase, `#8a8a8a`, padded 12px / 6px.

## Do's and Don'ts

### Do:
- **Do** use `#fa520f` for exactly one CTA and active-state indicator at a time. Its scarcity is the wayfinding system.
- **Do** put all status data (scores, percentages, pipeline names, keyboard hints) in JetBrains Mono. Any status value in a sans-serif font is a violation.
- **Do** use cream (`#fffaeb`) for writable/input surfaces and white (`#ffffff`) for readable/output surfaces — the distinction tells the user where they are in the workflow.
- **Do** apply the spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) to button hover and press transitions. It is the tactile signature of the system.
- **Do** use 1px borders (`#e5e5e5` / `#e6d5a8`) as the primary depth device for cards and panels. They are cheaper than shadows and more honest.
- **Do** give verified results a green ribbon (`#f0fdf4` / `#a7f3d0`) and high-risk results a red ribbon (`#fff1f2` / `#fecdd3`). These are diagnostic signals, not decorative colors.

### Don't:
- **Don't** add orange anywhere except CTAs, active tab underlines, live-state pings, and icon accents. No decorative orange borders, backgrounds, or gradients.
- **Don't** use shadows on cards, inputs, nav, chips, or metric tiles at rest. The primary button is the only always-shadowed element.
- **Don't** use sans-serif for labels, status readings, or keyboard hints. These are instrument readings; they belong in JetBrains Mono.
- **Don't** add a dark mode without a full design token audit. The system was designed light-first; naive CSS variable inversion breaks the cream/white depth hierarchy.
- **Don't** round buttons beyond 8px or cards beyond 12px. The system is gently rounded, not bubbly.
- **Don't** use `#ff8a00` (Sunshine) or the lighter orange steps for interactive states — they exist for decorative warmth only and are visually too similar to Forge Orange to be reliable affordance signals.
