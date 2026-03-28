import type { MascotSectionMood } from './MascotLogic';

const firstVisitMessages = [
  'Welcome, builder…',
  'Explore the realms ahead.',
  'I will guide your journey through Asgard.',
];

const idleMessages = [
  'A new challenge awaits.',
  'Need a hint? Scroll onward.',
  'The gods favor the curious.',
];

const clickMessages = [
  'A bold tap! Well played.',
  'Your saga grows stronger.',
  'I see your resolve, warrior.',
];

const moodMessages: Record<MascotSectionMood, string[]> = {
  calm: ['The halls are quiet… begin your quest.'],
  curious: ['Choose your domain wisely.'],
  focused: ['The timeline reveals your journey.'],
  energetic: ['The final gate is near. Claim your glory!'],
};

export type MascotMessageReason = 'first-visit' | 'section-change' | 'idle' | 'click' | 'manual';

export interface MascotMessage {
  text: string;
  reason: MascotMessageReason;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0];
}

export function getMessageForReason(
  reason: MascotMessageReason,
  mood: MascotSectionMood,
): MascotMessage {
  if (reason === 'first-visit') {
    return { text: pickRandom(firstVisitMessages), reason };
  }

  if (reason === 'section-change') {
    return { text: pickRandom(moodMessages[mood]), reason };
  }

  if (reason === 'click') {
    return { text: pickRandom(clickMessages), reason };
  }

  if (reason === 'idle') {
    return { text: pickRandom(idleMessages), reason };
  }

  return { text: 'Onward, builder.', reason };
}
