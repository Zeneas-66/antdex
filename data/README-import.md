# AntDex verified data import policy

Verified species facts are imported as additive batches.

- `rich.js` contains earlier verified facts.
- `verified-import.js` is the guard: empty/template values may be filled, existing non-empty verified values are preserved, and conflicting values are logged instead of silently overwritten.
- `verified-batch-XX.js` contains reviewed species-level facts and sources.
- `import-selftest.js` checks that expected verified species records exist before the atlas renderer boots.
- The compressed base database is not rewritten by these batch imports.
- Species-level temperature/humidity and husbandry values are not imported unless a species-level source supports them.

This structure is intentional: data corrections can be reviewed and rolled back per batch without replacing the whole atlas database.
