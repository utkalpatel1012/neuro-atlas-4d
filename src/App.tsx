import React, { useEffect } from 'react';
import Canvas from './ui/Canvas';
import LayerTree from './ui/LayerTree';
import InfoPanel from './ui/InfoPanel';
import Timeline from './ui/Timeline';
import SectionControls from './ui/SectionControls';
import TractToggles from './ui/TractToggles';
import SpinalPanel from './ui/SpinalPanel';
import VascularPanel from './ui/VascularPanel';
import CircuitPlayer from './circuits/CircuitPlayer';
import { DisorderView, SymptomExplorer, SyndromeLibrary, EntityCard } from './knowledge/Knowledge';
import { QuizPanel, VivaPanel, FlashPanel, NotesPanel, ExportButton } from './quiz/ExamTools';
import MriPanel from './mri/MriPanel';
import { useAtlas } from './state/store';
import { parseHash, buildHash } from './state/deeplink';

export default function App() {
  const { selection, select, setCrosshair, crosshairMNI, layerPreset, hiddenMasters } = useAtlas();

  // Restore from URL on load + on same-document hash navigation (deep links #s= #c= #d= #x= #p= + P2 #vis=).
  useEffect(() => {
    const restore = () => {
      const dl = parseHash(window.location.hash);
      const cur = useAtlas.getState();
      if (dl.s && dl.s !== cur.selection) select(dl.s);
      if (dl.x) setCrosshair(dl.x);
    };
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist selection + crosshair + preset + hidden masters to URL.
  useEffect(() => {
    window.location.hash = buildHash({ s: selection, c: null, d: null, x: crosshairMNI, p: layerPreset, vis: hiddenMasters });
  }, [selection, crosshairMNI, layerPreset, hiddenMasters]);

  return (
    <main>
      <h1>NeuroAtlas 4D</h1>
      <p>Educational use — not for clinical decisions</p>
      <button type="button" onClick={() => {
        const cur = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
      }}>Toggle theme</button>
      <div className="na4d-grid">
        <LayerTree />
        <Canvas />
      </div>
      <InfoPanel />
      <Timeline />
      <SectionControls />
      <TractToggles />
      <SpinalPanel />
      <VascularPanel />
      <CircuitPlayer />
      <DisorderView />
      <SymptomExplorer />
      <SyndromeLibrary />
      <QuizPanel />
      <VivaPanel />
      <FlashPanel />
      <NotesPanel />
      <ExportButton />
      <MriPanel />
    </main>
  );
}
