# ACC case competition

Team workspace for the ACC case rounds.

## What's here

| Folder | What it holds |
|---|---|
| `Round 2 - Lumen/` | Round 2 mini case (Lumen): the case PDF, notes (`Lumen-*.md`), and the submitted deck `TeamName_ACC_Round2.pptx` / `.pdf`. Other looks are in the `TeamName_ACC_Round2_*` files, `Variations/` and `frontend-slides/`. |
| `Round 3 -case comp/` | Round 3 (Apollo Tyres: cricket to farm tyres): the case PDF, the deck `TeamName_ACC_Round3.pptx` / `.pdf`, the answer summary, and the research set in `Apollo_Tyres_Round_3/`. |
| `Round 3 -case comp/Apollo_Tyres_Round_3/` | Numbered research files `00`–`17`. There are three consulting-style views (`McKinsey_Lens/`, `Bain_Lens/`, `BCG_Lens/`) and the `Replacement_Decision/` follow-up. Raw notes are in `research_notes/`. |
| `Round 3 -case comp/deck_source/` | Scripts that build the Round 3 deck and summary doc (Node + `pptxgenjs` / `docx`). |

## Working together

**First time:** clone the repo.

```bash
git clone https://github.com/j-jain/acc-case-comp.git
```

Or use [GitHub Desktop](https://desktop.github.com/): File → Clone repository.

**Every time:**

1. **Pull before you start.** That way you're working on the latest files.
2. Make your changes.
3. Commit with a short message that says what changed, then push.

**Decks (.pptx) can't be merged.** If two people edit the same deck at once, one person's changes get lost. Say in the group chat before you open a deck to edit it. Pull first and push as soon as you're done.

## Rebuilding the Round 3 deck (optional)

```bash
cd "Round 3 -case comp/deck_source"
npm install
node build.js                      # writes deck.pptx in this folder
node summary_doc/build.js          # writes summary_doc/summary.docx
```

These test builds are git-ignored. The copies to share are the ones in `Round 3 -case comp/`.
