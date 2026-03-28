'use client';

import { useMascot } from './useMascot';
import MascotView from './MascotView';

export default function Mascot() {
  const controller = useMascot();

  return <MascotView {...controller} />;
}
