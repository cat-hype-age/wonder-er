

# Design System Continuity: Landing Page to Session Page

## The Problem

The landing page uses a **light warm theme** (`bg-background`, cream/beige tones) while the session and settings pages use a **dark navy theme** (`bg-wonder-navy`). This creates a jarring visual break when clicking a CTA. The typography, color accents, and component patterns also diverge between pages -- buttons, spacing, and visual language don't carry through consistently.

## Design Strategy

Rather than forcing both pages into the same light or dark mode, the goal is to make the **transition feel intentional** and create **visual threads** that carry across both contexts. Think of it like walking from a bright gallery foyer into an immersive installation room -- different moods, same design language.

## What Changes

### 1. Landing Page: Add Subtle Navy Groundedness

- Add a soft gradient at the bottom of the landing page that transitions from the warm background toward a hint of navy/purple, foreshadowing the session environment
- Style the CTA buttons with the wonder palette colors (wonder-coral and wonder-teal) instead of generic `primary`/`secondary`, creating color continuity with the session orb
- Add a subtle wonder-purple accent to the "No account needed" text area

### 2. Session Page: Echo Landing Page Warmth

- Add a faint warm gradient overlay behind the orb (subtle cream/gold glow) so the session doesn't feel 100% cold navy
- Use the same `rounded-full` button styling and `font-body font-semibold` patterns from the landing CTAs for the mic button and send button
- Match the "End session" button style to the landing page's settings icon style (muted, understated)

### 3. Shared Design Tokens -- Consistent Component Patterns

- **Buttons**: All interactive buttons across pages use `rounded-full`, consistent padding (`px-8 py-4` for primary, `px-5 py-3` for secondary), and wonder palette colors
- **Section headings**: Use `font-display` consistently (already done, but reinforce)
- **Cards/containers**: Use `rounded-2xl` with `border border-wonder-purple/10` consistently (settings already does this, session transcript should match)
- **Transitions**: All pages use the same framer-motion entry pattern (fade up with staggered delays)

### 4. Settings Page: Align with Both Contexts

- Already uses dark navy and looks consistent with session
- Fix the indentation issue in the core principles section (lines 163-170 have inconsistent whitespace from the last edit)
- Add a subtle warm accent line or gradient at the top to echo the landing page warmth

### 5. Page Transition Animation

- Wrap the router in a shared `AnimatePresence` so navigating between landing and session has a smooth crossfade rather than a hard cut

## Technical Details

### Files Modified

**`src/pages/Index.tsx`**
- Replace `bg-primary text-primary-foreground` on the "Check in" CTA with `bg-wonder-coral text-white` (or wonder-navy)
- Replace `bg-secondary text-secondary-foreground` on "Work through" CTA with `bg-wonder-teal text-white`
- Add a gradient overlay div at the bottom: `bg-gradient-to-t from-wonder-navy/5 via-transparent to-transparent`
- Update "No account needed" text to use wonder-purple tint

**`src/pages/Session.tsx`**
- Add a subtle warm radial gradient behind the orb area: `bg-radial-gradient from-wonder-warm/5 via-transparent to-transparent`
- Ensure the transcript panel border and padding match the settings page card style
- Make the text input styling consistent with landing CTA border-radius and font

**`src/pages/Settings.tsx`**
- Fix indentation on lines 163-170 (cosmetic cleanup from prior edit)
- Add a thin warm-colored accent line at the top of the page to bridge the landing warmth

**`src/App.tsx`**
- Wrap route outlet in `AnimatePresence` with a shared fade transition for smoother page-to-page flow

**`src/index.css`**
- No changes needed -- the wonder CSS variables and animations are already well-defined

### What Stays the Same

- The fundamental light-landing / dark-session contrast is intentional and stays
- The orb design, WonderBackground component, and all session logic untouched
- All localStorage persistence and voice/toggle functionality unchanged

