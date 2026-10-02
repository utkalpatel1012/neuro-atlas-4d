import React, { useEffect, useRef } from 'react';
import { BrainScene } from '../engine/BrainScene';

export default function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const scene = new BrainScene(ref.current);
    scene.init();
    scene.renderOnce();
    const onResize = () => scene.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      scene.dispose();
    };
  }, []);
  return <canvas ref={ref} data-testid="brain-canvas" style={{ width: '100%', height: 320 }} />;
}
