import { GLOBAL_REACTIVE_MESSAGES, getSectionMessages, type MascotMessage } from './MascotMessages';
import {
  getNextCorner,
  getPositionCoordinates,
  getSizeForSection,
  isMascotSection,
  resolveSectionPosition,
  sections,
  type ContextSnapshot,
  type MascotBehaviorState,
  type MascotPosition,
  type MascotSection,
  type Point,
  type ViewportInfo,
} from './MascotLogic';

const MESSAGE_TRIGGER_DEBOUNCE = 900;
const INACTIVE_THRESHOLD_MS = 4000;
const SECTION_HINT_THRESHOLD_MS = 5000;
const SECTION_DEEP_HINT_THRESHOLD_MS = 10000;
const MAX_HISTORY_LENGTH = 50;

interface Metrics {
  scrollVelocity: number;
  cursorMovement: number;
  userInactiveMs: number;
  timeInSection: number;
}

export interface BrainSnapshot {
  state: MascotBehaviorState;
  currentSection: MascotSection;
  previousSection: MascotSection | null;
  message: MascotMessage;
  bubbleVisible: boolean;
  visible: boolean;
  position: MascotPosition;
  point: Point;
  sizePx: number;
  sizeClass: string;
  context: ContextSnapshot;
}

const FALLBACK_MESSAGE: MascotMessage = {
  id: 'fallback',
  text: 'Onward, warrior.',
  tone: 'hint',
  priority: 1,
  trigger: 'onEnter',
  section: 'hero',
  cooldownMs: 10000,
};

export class MascotController {
  private state: MascotBehaviorState = 'IDLE';
  private currentSection: MascotSection = 'hero';
  private previousSection: MascotSection | null = null;
  private sectionEnteredAt = performance.now();
  private lastMouseMoveAt = performance.now();
  private lastCursor = { x: 0, y: 0 };
  private cursor = { x: 0, y: 0 };
  private scrollVelocity = 0;
  private cursorMovement = 0;
  private currentPosition: MascotPosition = 'bottom-right';
  private cornerIndex = 0;
  private point: Point = { x: 0, y: 0 };
  private message: MascotMessage = FALLBACK_MESSAGE;
  private bubbleVisible = false;
  private visible = true;
  private interactionHistory: string[] = [];
  private seenMessages = new Set<string>();
  private cooldownUntil = new Map<string, number>();
  private lastTriggerAt = new Map<string, number>();
  private sectionsWithHintShown = new Set<MascotSection>();
  private sectionsWithDeepHintShown = new Set<MascotSection>();

  constructor(private readonly getViewport: () => ViewportInfo) {}

  public setInitialSection(sectionId: string): void {
    if (isMascotSection(sectionId)) {
      this.currentSection = sectionId;
      this.sectionEnteredAt = performance.now();
    }
  }

  public onSectionObserved(sectionId: string, now: number): void {
    if (!isMascotSection(sectionId) || sectionId === this.currentSection) {
      return;
    }

    this.previousSection = this.currentSection;
    this.currentSection = sectionId;
    this.sectionEnteredAt = now;
    this.state = this.currentSection === 'cta' || this.currentSection === 'prizes' ? 'EXCITED' : 'GUIDING';

    this.pickAndApplyMessage('onEnter', now);
    this.setSectionPosition(now);
    this.logHistory(`section:${this.currentSection}`);
  }

  public onScroll(deltaY: number, deltaMs: number, now: number): void {
    if (deltaMs > 0) {
      this.scrollVelocity = Math.abs(deltaY / deltaMs);
    }

    if (this.scrollVelocity > 1.5) {
      this.state = 'REACTING';
      this.pickReactiveMessage('onScrollFast', now);
    } else if (this.scrollVelocity < 0.12 && this.bubbleVisible === false) {
      this.pickReactiveSlowMessage(now);
    }
  }

  public onCursorMove(x: number, y: number, now: number): void {
    const dx = x - this.lastCursor.x;
    const dy = y - this.lastCursor.y;
    this.cursorMovement = Math.sqrt(dx * dx + dy * dy);
    this.lastCursor = { x, y };
    this.cursor = { x, y };
    this.lastMouseMoveAt = now;

    if (this.state === 'INTERRUPTING') {
      this.state = 'GUIDING';
      this.currentPosition = resolveSectionPosition(this.currentSection, getNextCorner(this.cornerIndex));
    }
  }

  public onHoverImportant(now: number): void {
    this.state = 'CURIOUS';
    this.pickAndApplyMessage('onHover', now);
  }

  public tick(now: number): BrainSnapshot {
    if (typeof document !== 'undefined' && document.hidden) {
      this.state = 'HIDDEN';
      this.visible = false;
    } else if (this.state === 'HIDDEN') {
      this.state = 'GUIDING';
      this.visible = true;
    }

    const timeInSection = now - this.sectionEnteredAt;
    const userInactiveMs = now - this.lastMouseMoveAt;

    if (userInactiveMs > INACTIVE_THRESHOLD_MS) {
      this.state = 'INTERRUPTING';
      this.currentPosition = 'near-cursor';
      this.pickReactiveMessage('onIdle', now);
    } else if (this.state === 'INTERRUPTING') {
      this.state = 'GUIDING';
    }

    if (timeInSection > SECTION_HINT_THRESHOLD_MS && !this.sectionsWithHintShown.has(this.currentSection)) {
      this.sectionsWithHintShown.add(this.currentSection);
      this.pickAndApplyMessage('onIdle', now);
    }

    if (timeInSection > SECTION_DEEP_HINT_THRESHOLD_MS && !this.sectionsWithDeepHintShown.has(this.currentSection)) {
      this.sectionsWithDeepHintShown.add(this.currentSection);
      this.pickAndApplyMessage('onIdle', now);
    }

    const sectionPosition =
      this.state === 'INTERRUPTING'
        ? 'near-cursor'
        : resolveSectionPosition(this.currentSection, getNextCorner(this.cornerIndex));

    this.currentPosition = sectionPosition;

    const viewport = this.getViewport();
    const nearElementRect = this.resolveNearElementRect();
    const size = getSizeForSection(this.currentSection, this.state === 'IDLE' || this.state === 'INTERRUPTING');

    this.point = getPositionCoordinates(this.currentPosition, viewport, size.px, this.cursor, nearElementRect);

    if (this.state === 'REACTING' && this.scrollVelocity < 0.4) {
      this.state = 'GUIDING';
    }

    return {
      state: this.state,
      currentSection: this.currentSection,
      previousSection: this.previousSection,
      message: this.message,
      bubbleVisible: this.bubbleVisible,
      visible: this.visible,
      position: this.currentPosition,
      point: this.point,
      sizePx: size.px,
      sizeClass: size.className,
      context: {
        currentSection: this.currentSection,
        previousSection: this.previousSection,
        timeInSection,
        scrollVelocity: this.scrollVelocity,
        cursorMovement: this.cursorMovement,
        userInactiveMs,
        interactionHistory: [...this.interactionHistory],
      },
    };
  }

  public hideBubble(): void {
    this.bubbleVisible = false;
  }

  public getSectionIds(): readonly string[] {
    return sections;
  }

  private setSectionPosition(now: number): void {
    this.cornerIndex = (this.cornerIndex + 1) % 4;
    this.currentPosition = resolveSectionPosition(this.currentSection, getNextCorner(this.cornerIndex));
    this.lastTriggerAt.set('position', now);
  }

  private pickAndApplyMessage(trigger: MascotMessage['trigger'], now: number): void {
    if (!this.canTrigger(`section-${trigger}`, now)) {
      return;
    }

    const candidates = getSectionMessages(this.currentSection, trigger)
      .filter((item) => !this.seenMessages.has(item.id))
      .filter((item) => (this.cooldownUntil.get(item.id) ?? 0) <= now)
      .sort((a, b) => b.priority - a.priority);

    const chosen = candidates[0] ?? getSectionMessages(this.currentSection)[0];
    if (!chosen) {
      return;
    }

    this.applyMessage(chosen, now);
  }

  private pickReactiveMessage(trigger: MascotMessage['trigger'], now: number): void {
    if (!this.canTrigger(`reactive-${trigger}`, now)) {
      return;
    }

    const candidates = GLOBAL_REACTIVE_MESSAGES
      .filter((message) => message.trigger === trigger)
      .filter((message) => (this.cooldownUntil.get(message.id) ?? 0) <= now)
      .sort((a, b) => b.priority - a.priority);

    if (candidates[0]) {
      this.applyMessage(candidates[0], now);
    }
  }

  private pickReactiveSlowMessage(now: number): void {
    if (!this.canTrigger('reactive-slow', now)) {
      return;
    }

    const candidate = GLOBAL_REACTIVE_MESSAGES.find((item) => item.id === 'react-slow-1');
    if (candidate && (this.cooldownUntil.get(candidate.id) ?? 0) <= now) {
      this.applyMessage(candidate, now);
    }
  }

  private applyMessage(message: MascotMessage, now: number): void {
    this.message = message;
    this.bubbleVisible = true;
    this.seenMessages.add(message.id);
    this.cooldownUntil.set(message.id, now + message.cooldownMs);
    this.logHistory(`msg:${message.id}`);
  }

  private canTrigger(channel: string, now: number): boolean {
    const last = this.lastTriggerAt.get(channel) ?? 0;
    if (now - last < MESSAGE_TRIGGER_DEBOUNCE) {
      return false;
    }
    this.lastTriggerAt.set(channel, now);
    return true;
  }

  private logHistory(entry: string): void {
    this.interactionHistory.push(entry);
    if (this.interactionHistory.length > MAX_HISTORY_LENGTH) {
      this.interactionHistory = this.interactionHistory.slice(-MAX_HISTORY_LENGTH);
    }
  }

  private resolveNearElementRect(): DOMRect | null {
    if (typeof document === 'undefined') {
      return null;
    }

    if (this.currentSection === 'timeline') {
      return document.querySelector('[data-timeline-spine]')?.getBoundingClientRect() ?? null;
    }

    if (this.currentSection === 'faq') {
      return (
        document.querySelector('#faq [data-faq-active="true"]')?.getBoundingClientRect() ??
        document.querySelector('#faq .faq-card')?.getBoundingClientRect() ??
        null
      );
    }

    if (this.currentSection === 'prizes') {
      return (
        document.querySelector('#prizes .card-wrapper:hover')?.getBoundingClientRect() ??
        document.querySelector('#prizes .mobile-card:hover')?.getBoundingClientRect() ??
        document.querySelector('#prizes .card-wrapper')?.getBoundingClientRect() ??
        document.querySelector('#prizes .mobile-card')?.getBoundingClientRect() ??
        null
      );
    }

    return document.getElementById(this.currentSection)?.getBoundingClientRect() ?? null;
  }
}

export type { Metrics };
