# NCS Hacks — System Guidelines

Use these rules and design tokens to maintain the **Norse Cinematic Aesthetic** for the Asgard Archives project.

# General Guidelines

* **Premium Layouts**: Prioritize horizontal space and airy padding. Avoid cramped vertical stacking.
* **Responsive First**: Always use `md:flex-row` and `flex-col` to ensure layouts work on mobile and desktop.
* **GSAP Animations**: Use GSAP for all cinematic reveals. Typical easing: `power2.out` for entrance, `power3.inOut` for interactions.
* **Component Modularity**: Keep logic and styles within the components in `app/components/`.

--------------

# Design System Guidelines

## Typography
Maintain a strict hierarchy using the following font pairings:

* **Primary Heading (Cinzel)**: Use for section titles (e.g., "FREQUENTLY ASKED QUESTIONS"). Always use `uppercase` and `tracking-wider`.
* **Secondary Heading (EB Garamond)**: Use for component titles and questions. Set to `font-bold` (700) and `font-style: italic` for a more premium look.
* **Body Text (EB Garamond)**: Use for answers and descriptions with a minimum `line-height` of 1.7.

## Color Palette
* **Background (Parchment)**: `#f5f0e6` — Use for the main page background.
* **Primary (Gold/Amber)**: `#8B5E1A` — Use for active states and primary accents.
* **Secondary (Auroous)**: `#c9a227` — Use for thin decorative lines and accents.
* **Text (Deep Earth)**: `#1a0f06` — Main font color.
* **Border (Sandstone)**: `#d4c9b0` — Use for card and component borders.

## Accordion / Cards
The "Asgard Archive" accordion represents the core content display pattern.

### Structural Rules
* **Horizontal Split**: On desktop, split cards side-by-side (Question left, Answer center, Chevron far right).
* **Corner Radius**: Always use `rounded-xl` for card-based components.
* **Interaction**: The entire question bar must be clickable. The chevron should rotate 180deg when active.
* **Background Transitions**: Use `bg-white/40` for inactive cards and `bg-white` for active/focused cards.

## Interactive Icons
* **Chevron**: Use `lucide-react`'s `ChevronDown`. Enclose in a circular button with a thin border.
* **Arrows**: Use `ArrowRight` for CTAs like "CONSULT THE ORACLE".
