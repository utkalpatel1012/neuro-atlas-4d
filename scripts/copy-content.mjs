// copy-content.mjs — content/ (source of truth) → public/content/ (served). P8: whole tree.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pairs = [
  ['content/circuits/catalogue.json', 'public/content/circuits/catalogue.json'],
  ['content/disorders/p1.json', 'public/content/disorders/p1.json'],
  ['content/symptoms.json', 'public/content/symptoms.json'],
  ['content/syndromes.json', 'public/content/syndromes.json'],
];
for (const [s, d] of pairs) {
  const src = path.join(root, s);
  const dst = path.join(root, d);
  if (!fs.existsSync(src)) { console.log(`skip missing ${s}`); continue; }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}
console.log('content: synced to public/content');
