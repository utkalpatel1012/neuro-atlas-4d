# ARCHITECTURE

Vite + React 18 + TypeScript (strict) shell; Zustand single store (`src/state/store.ts`);
imperative Three.js `BrainScene` (`src/engine/`); NiiVue (dynamic import) in `src/mri/MriPanel.tsx`;
Vitest + node:test + Playwright. Static site, no backend, localStorage only.

- World space MNI152 mm RAS+, 1 unit = 1 mm; swaps only in `src/coords.ts` (matrix PENDING → identity).
- Packs (lazy, own manifest + licence): core-anatomy, atlas-exact, tracts, spinal, vascular, volumes, circuits, content, pack-nc (off default).
- Transparency (H4): alphaHash stochastic. Sections: clip-only + open-cut marker (H5 watertight UNVERIFIED).
- State → URL deep links `#s #c #d #x #p` + additive `#vis`.
