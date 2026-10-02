# Design Specification

## Design Goal

Create an elegant, emotional, premium memory album for a baby boy's first birthday.

The design should feel personal and photographic rather than corporate.

## Reference Direction

The supplied reference establishes a playful vertical birthday-board language: striped backdrop, hanging ropes, bunting, a scalloped central birthday plaque, balloons, stars/clouds, and a hanging pinata-style transition below the first viewport. Reinterpret this into production UI/assets rather than blindly reproducing the image.

## Visual Personality

- Warm
- Soft
- Joyful
- Premium
- Playful but refined
- Baby-boy appropriate
- Editorial/photo-album inspired

## Avoid

- Generic SaaS cards
- Dashboard layouts
- Excessive glassmorphism
- Overuse of gradients
- Random decorative clutter
- Animation on every element

## Styling & Border Radius Rules

- Per explicit client direction, rounded/pill borders, scalloped badge motifs, and soft playful shapes are approved to honor the baby-celebration visual reference (`landing-reference-mobile.jpg`).
- Sharp/square corners are NOT enforced for this project.
- Visual elements (pill buttons, plaque badges, clouds, balloons) follow the organic papercraft and storybook theme.

## Color Direction

Established celebration palette derived directly from the approved reference:

- Sky Blue (`#5299D3`): backdrop vertical stripes and celebratory balloons
- Warm Ivory/Cream (`#F6F2EA` & `#FCFAF6`): backdrop vertical stripes, plaque face, and cards
- Celebration Red (`#E65046`): plaque borders, CTA badges, and accent bunting
- Sunshine Yellow (`#F5B738`): stars, balloons, and pinata fringe
- Sage Green (`#65A765`): leaves, balloons, and pinata fringe
- Deep Navy (`#163A5C`): high-contrast readable typography
- Braided Rope Tan (`#BF9056` / `#8F6433`): hanging ropes and knotted ties

## Typography

- Display/Celebration: **Fredoka** (`font-display`) for joyful headings, the birthday plaque, and badges.
- Body/Reading: **Quicksand** (`font-body`) for highly readable captions, milestones, and supporting text.
- Accent: **Caveat** (`font-accent`) for warm personal notes.

## Layout

Favor:

- large photography
- generous whitespace
- visual storytelling
- full-width moments
- editorial grids
- asymmetrical image compositions where appropriate
- clear chronological or thematic progression

## Animation

Potential animation patterns:

- opening reveal
- gentle image fade/scale
- scroll-triggered memory reveals
- staggered text
- subtle parallax
- horizontal/vertical memory movement
- elegant section transitions
- photo hover micro-interactions where appropriate

Animation must support the story.

## Upload CTA

Use a simple **Add a Memory** action without login. The default recommendation is to place it toward the end of the album so the primary opening remains an emotional memory experience. It may move to a more visible middle placement if the final information architecture benefits from it.

## Responsive Design

### Mobile
Design intentionally for touch and small screens.

### Tablet
Maintain visual rhythm and photo hierarchy.

### Desktop
Use larger photography, whitespace, editorial compositions, and more expressive transitions.

## Accessibility

- Respect `prefers-reduced-motion`.
- Maintain readable contrast.
- Do not hide essential information exclusively behind animation.
- Images should have meaningful alt text where appropriate.
- Keyboard navigation should remain possible.

## Image Guidelines

- Prefer original client photographs.
- Preserve image quality while optimizing delivery.
- Use appropriate aspect ratios.
- Avoid unnecessary cropping of faces.
- Never invent missing photos.
