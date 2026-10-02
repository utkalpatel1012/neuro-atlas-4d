import { describe, it, expect } from 'vitest';
import fs from 'node:fs';

const p1 = JSON.parse(fs.readFileSync('content/disorders/p1.json', 'utf8'));
const syms = JSON.parse(fs.readFileSync('content/symptoms.json', 'utf8'));
const syns = JSON.parse(fs.readFileSync('content/syndromes.json', 'utf8'));

describe('P8 knowledge', () => {
  it('9 P1 packs complete: 12 tabs, ≥15 MCQs, 6-step tours, all draft', () => {
    expect(p1.disorders.length).toBe(9);
    for (const d of p1.disorders) {
      expect(Object.keys(d.tabs)).toHaveLength(12);
      expect(d.mcqs.length).toBeGreaterThanOrEqual(15);
      expect(d.tour.length).toBeGreaterThanOrEqual(6);
      expect(d.tour.length).toBeLessThanOrEqual(10);
      expect(d.reviewStatus).toBe('draft');
    }
    expect(p1.disorders.reduce((n: number, d: any) => n + d.mcqs.length, 0)).toBeGreaterThanOrEqual(135);
  });
  it('MCQ options valid (quiz index in range)', () => {
    for (const d of p1.disorders) {
      for (const m of d.mcqs) {
        expect(m.o).toHaveLength(4);
        expect(m.a).toBeGreaterThanOrEqual(0);
        expect(m.a).toBeLessThanOrEqual(3);
      }
    }
  });
  it('symptoms map to circuits with evidence levels', () => {
    expect(syms.symptoms.length).toBeGreaterThanOrEqual(15);
    for (const s of syms.symptoms) {
      expect(s.substrates.length).toBeGreaterThan(0);
      for (const sub of s.substrates) {
        expect(['established', 'strong', 'moderate', 'emerging', 'hypothesis']).toContain(sub.level);
      }
    }
  });
  it('syndromes link structures + territories', () => {
    expect(syns.syndromes.length).toBeGreaterThanOrEqual(15);
    const withTerr = syns.syndromes.filter((s: any) => s.territory);
    expect(withTerr.length).toBeGreaterThan(0); // stroke entries link to overlay
  });
});
