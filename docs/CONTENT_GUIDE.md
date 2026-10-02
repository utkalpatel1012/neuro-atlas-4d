# CONTENT_GUIDE (§8)

Original wording only (never DSM/ICD/DrugBank/textbook passages); claims ≤4 sentences with
`sourceIds` + evidence level; resolvable sources only — `src.needs-source` placeholders are
EXCLUDED from release builds with warnings (strict stays green, nothing fabricated).
No invented numbers; no dosing (mark “reference only — verify formulary”); hypotheses labelled;
`reviewStatus: draft` + visible badge until human review. Preferred sources: IPS CPGs, NICE, WFSBP,
CANMAT, APA, WHO mhGAP, Cochrane, ENIGMA/open meta-analyses; textbooks cited only.
Build packs: `node scripts/build-p1.mjs`; validate: `lint:content:strict`; mapping: `test:mapping`.
