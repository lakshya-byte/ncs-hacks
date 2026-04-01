export const sections = [
  'hero',
  'announcement',
  'kingdom',
  'team',
  'community',
  'tracks',
  'timeline',
  'flow',
  'prizes',
  'winners',
  'memories',
  'sponsors',
  'faq',
  'cta',
] as const;

export type MascotSection = (typeof sections)[number];

export type MascotBehaviorState =
  | 'IDLE'
  | 'CURIOUS'
  | 'GUIDING'
  | 'EXCITED'
  | 'HIDDEN'
  | 'REACTING'
  | 'INTERRUPTING';

export const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'near-cursor',
  'near-element',
  'center-floating',
] as const;

export type MascotPosition = (typeof positions)[number];

export const sizeMap = {
  hero: { className: 'w-32', px: 128 },
  timeline: { className: 'w-24', px: 96 },
  faq: { className: 'w-20', px: 80 },
  idle: { className: 'w-16', px: 64 },
  default: { className: 'w-28', px: 112 },
} as const;

export interface ContextSnapshot {
  currentSection: MascotSection;
  previousSection: MascotSection | null;
  timeInSection: number;
  scrollVelocity: number;
  cursorMovement: number;
  userInactiveMs: number;
  interactionHistory: string[];
}

export interface ViewportInfo {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function isMascotSection(value: string): value is MascotSection {
  return (sections as readonly string[]).includes(value);
}

export function getNextCorner(index: number): MascotPosition {
  const corners: MascotPosition[] = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  return corners[index % corners.length];
}

export function getSizeForSection(section: MascotSection, isIdle: boolean): { className: string; px: number } {
  if (isIdle) {
    return sizeMap.idle;
  }

  if (section === 'hero') {
    return sizeMap.hero;
  }

  if (section === 'timeline') {
    return sizeMap.timeline;
  }

  if (section === 'faq') {
    return sizeMap.faq;
  }

  return sizeMap.default;
}

export function resolveSectionPosition(section: MascotSection, defaultCorner: MascotPosition): MascotPosition {
  if (section === 'hero') {
    return 'center-floating';
  }

  if (section === 'timeline' || section === 'faq' || section === 'prizes') {
    return 'near-element';
  }

  return defaultCorner;
}

export function getPositionCoordinates(
  position: MascotPosition,
  viewport: ViewportInfo,
  size: number,
  cursor: Point,
  nearElementRect?: DOMRect | null,
): Point {
  const margin = 24;
  const maxX = viewport.width - size - margin;
  const maxY = viewport.height - size - margin;

  if (position === 'near-element' && nearElementRect) {
    const x = clamp(nearElementRect.left + nearElementRect.width + 16, margin, maxX);
    const y = clamp(nearElementRect.top - size * 0.15, margin, maxY);
    return { x, y };
  }

  if (position === 'near-cursor') {
    const x = clamp(cursor.x + 18, margin, maxX);
    const y = clamp(cursor.y + 10, margin, maxY);
    return { x, y };
  }

  if (position === 'center-floating') {
    return {
      x: clamp(viewport.width * 0.5 - size / 2, margin, maxX),
      y: clamp(viewport.height * 0.22, margin, maxY),
    };
  }

  switch (position) {
    case 'top-left':
      return { x: margin, y: margin };
    case 'top-right':
      return { x: maxX, y: margin };
    case 'bottom-left':
      return { x: margin, y: maxY };
    case 'bottom-right':
    default:
      return { x: maxX, y: maxY };
  }
}
