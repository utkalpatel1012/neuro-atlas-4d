import React from 'react';
import { useAtlas } from '../state/store';

export default function Timeline() {
  const { timelineT, setTimeline } = useAtlas();
  return (
    <div aria-label="Timeline">
      <input
        aria-label="timeline scrubber"
        type="range"
        min={0}
        max={1000}
        value={Math.round(timelineT * 1000)}
        onChange={(e) => setTimeline(Number(e.target.value) / 1000)}
      />
    </div>
  );
}
