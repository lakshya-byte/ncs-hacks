export type MascotState =
  | 'idle'
  | 'entering'
  | 'active'
  | 'interacting'
  | 'exiting'
  | 'hidden';

export type MascotAnchor = 'bottom-left' | 'bottom-right' | 'top-right' | 'mid-left';

export type MascotSectionMood = 'calm' | 'curious' | 'focused' | 'energetic';

export interface MascotMotionProfile {
  followStrength: number;
  floatAmplitude: number;
  floatSpeed: number;
  idleBounceInterval: number;
}

export const MASCOT_ANCHORS: MascotAnchor[] = [
  'bottom-left',
  'bottom-right',
  'top-right',
  'mid-left',
];

const EDGE_MARGIN = 30;
const MOBILE_EDGE_MARGIN = 18;

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCooldownMs(): number {
  return randomBetween(8000, 15000);
}

export function getVisibleDurationMs(isMobile: boolean): number {
  return isMobile ? randomBetween(6500, 9000) : randomBetween(8000, 12000);
}

export function getAnchorScreenPosition(
  anchor: MascotAnchor,
  viewportWidth: number,
  viewportHeight: number,
  mascotSize: number,
  isMobile: boolean,
): { x: number; y: number } {
  const margin = isMobile ? MOBILE_EDGE_MARGIN : EDGE_MARGIN;
  const maxX = viewportWidth - mascotSize - margin;
  const maxY = viewportHeight - mascotSize - margin;

  switch (anchor) {
    case 'bottom-left':
      return { x: margin, y: maxY };
    case 'bottom-right':
      return { x: maxX, y: maxY };
    case 'top-right':
      return { x: maxX, y: margin };
    case 'mid-left':
      return { x: margin, y: Math.max(margin, Math.min(maxY, viewportHeight * 0.45)) };
    default:
      return { x: maxX, y: maxY };
  }
}

export function getAnchorOffscreenPosition(
  anchor: MascotAnchor,
  viewportWidth: number,
  viewportHeight: number,
  mascotSize: number,
): { x: number; y: number } {
  switch (anchor) {
    case 'bottom-left':
      return { x: -mascotSize - 24, y: viewportHeight + mascotSize * 0.2 };
    case 'bottom-right':
      return { x: viewportWidth + mascotSize * 0.25, y: viewportHeight + mascotSize * 0.2 };
    case 'top-right':
      return { x: viewportWidth + mascotSize * 0.25, y: -mascotSize - 24 };
    case 'mid-left':
      return { x: -mascotSize - 24, y: viewportHeight * 0.45 };
    default:
      return { x: viewportWidth + mascotSize * 0.25, y: viewportHeight + mascotSize * 0.2 };
  }
}

export function pickNextAnchor(
  previousAnchor: MascotAnchor,
  isMobile: boolean,
): MascotAnchor {
  if (isMobile) {
    return 'bottom-right';
  }

  const options = MASCOT_ANCHORS.filter((anchor) => anchor !== previousAnchor);
  return options[Math.floor(Math.random() * options.length)] ?? previousAnchor;
}

export function getMoodFromSection(sectionId: string): MascotSectionMood {
  switch (sectionId) {
    case 'tracks':
      return 'curious';
    case 'timeline':
      return 'focused';
    case 'cta':
      return 'energetic';
    case 'home':
    default:
      return 'calm';
  }
}

export function getMotionProfile(mood: MascotSectionMood, isMobile: boolean): MascotMotionProfile {
  if (isMobile) {
    return {
      followStrength: 8,
      floatAmplitude: 3,
      floatSpeed: 0.0015,
      idleBounceInterval: 5600,
    };
  }

  switch (mood) {
    case 'curious':
      return {
        followStrength: 18,
        floatAmplitude: 7,
        floatSpeed: 0.002,
        idleBounceInterval: 4200,
      };
    case 'focused':
      return {
        followStrength: 12,
        floatAmplitude: 5,
        floatSpeed: 0.0017,
        idleBounceInterval: 5200,
      };
    case 'energetic':
      return {
        followStrength: 20,
        floatAmplitude: 9,
        floatSpeed: 0.0024,
        idleBounceInterval: 3600,
      };
    case 'calm':
    default:
      return {
        followStrength: 10,
        floatAmplitude: 4,
        floatSpeed: 0.0014,
        idleBounceInterval: 6200,
      };
  }
}

function intersects(
  a: { left: number; right: number; top: number; bottom: number },
  b: { left: number; right: number; top: number; bottom: number },
): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function overlapsInteractiveElement(
  mascotRect: { left: number; top: number; right: number; bottom: number },
): boolean {
  const interactiveElements = document.querySelectorAll<HTMLElement>(
    'a, button, input, textarea, select, summary, [role="button"], [data-mascot-safe="false"]',
  );

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  for (const element of interactiveElements) {
    if (element.closest('[data-mascot-ignore="true"]')) {
      continue;
    }

    const rect = element.getBoundingClientRect();
    if (
      rect.width < 1 ||
      rect.height < 1 ||
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > viewportWidth ||
      rect.top > viewportHeight
    ) {
      continue;
    }

    if (intersects(mascotRect, rect)) {
      return true;
    }
  }

  return false;
}
