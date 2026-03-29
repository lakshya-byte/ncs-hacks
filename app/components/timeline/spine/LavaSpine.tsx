'use client';

import { useRef } from 'react';
import { useLavaFlow } from './useLavaFlow';

export const LavaSpine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLavaFlow(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
};
