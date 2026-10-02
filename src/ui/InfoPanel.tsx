import React from 'react';
import { useAtlas } from '../state/store';

export default function InfoPanel() {
  const { selection, crosshairMNI } = useAtlas();
  return (
    <aside aria-label="Info panel">
      <p data-testid="selection">{selection ?? 'No selection'}</p>
      <p data-testid="crosshair">{crosshairMNI.join(',')}</p>
      <p>Draft — verify</p>
    </aside>
  );
}
