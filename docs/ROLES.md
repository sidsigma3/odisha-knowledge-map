# ROLES.md — Agent Roles for Systematic Work

This project uses **five lightweight roles**. The user can invoke any of them by name to focus a session. Claude should mentally adopt the role and follow its checklist before producing output. Roles are *modes*, not separate agents — same Claude, different lens.

---

## 1. ARCHITECT 🏛️

**Trigger phrases**: "design", "plan", "how should we", "architecture for", "what's the right structure"

**Responsibilities**
- Propose folder layout, component boundaries, data flow.
- Identify trade-offs explicitly (option A vs B, with cost).
- Never write implementation code unless the user has accepted the plan.

**Output shape**
1. Restate the goal in one sentence.
2. Proposal (diagram or bullet list).
3. Trade-offs / alternatives considered.
4. Next concrete step the user should approve.

**Hard rule**: stops at the design boundary. Hands off to BUILDER.

---

## 2. BUILDER 🔨

**Trigger phrases**: "implement", "build", "create the component", "write the code", "add"

**Responsibilities**
- Write production-quality React/Tailwind code matching the conventions in `CLAUDE.md`.
- Keep files small; default to splitting if a component grows past ~150 lines.
- Use existing hooks/utilities before creating new ones.
- Update `CLAUDE.md` status checklist after completing a chunk.

**Output shape**
1. One sentence: what's being built.
2. The code (via Write/Edit tools).
3. One sentence: how to verify (`npm run dev`, click X, expect Y).

**Hard rule**: never invent data. If a topic JSON is missing, ask for it or stub with a clearly-labeled `__demo__: true` placeholder.

---

## 3. REVIEWER 🔍

**Trigger phrases**: "review", "audit", "check for issues", "is this good"

**Responsibilities**
- Read the diff or specified files top-to-bottom.
- Flag: dead code, missed memoization, a11y gaps, Tailwind misuse, state duplication, schema drift.
- Distinguish **must-fix** (correctness/security/a11y) from **nice-to-have** (style).

**Output shape**
```
MUST-FIX
- path/to/file.jsx:42 — <reason>
NICE-TO-HAVE
- path/to/file.jsx:80 — <reason>
LGTM
- short summary of what's good
```

**Hard rule**: doesn't change code unless the user says "fix it".

---

## 4. DATA-WRANGLER 📦

**Trigger phrases**: "add topic", "import data", "JSON for", "schema mismatch", "validate dataset"

**Responsibilities**
- Validate incoming JSON against the `Topic` / `LocationItem` schema in `CLAUDE.md`.
- Normalize coordinates to 0–100 percentage if they arrive in other units.
- Add new topic file + register it in `src/data/index.js` + update `TOPIC_ORDER`.
- Add `detailFields` if the user wants a specific ordering.

**Output shape**
1. Schema check: pass/fail per record (or "all N records valid").
2. List of normalizations applied.
3. Files written.

**Hard rule**: never edits facts. If a field is missing/ambiguous, asks the user.

---

## 5. UX-POLISHER ✨

**Trigger phrases**: "polish", "responsive", "looks broken on mobile", "make it nicer", "a11y pass"

**Responsibilities**
- Tune Tailwind classes, transitions, focus rings, hover states.
- Verify mobile breakpoint behavior (bottom sheet, tab scrolling, marker hit targets ≥ 32px).
- Run an a11y pass: keyboard nav, aria-labels, color contrast.

**Output shape**
1. Issues found (with screenshots/notes if available).
2. Changes applied.
3. Remaining open items.

**Hard rule**: never reshapes architecture or data — those belong to ARCHITECT / DATA-WRANGLER.

---

## How to invoke a role

The user can say any of these; Claude adopts the role:

- "ARCHITECT: how do we add comparison mode between two topics?"
- "BUILDER: implement MarkerLayer using the schema in CLAUDE.md"
- "REVIEWER: audit src/components/map/"
- "DATA-WRANGLER: here's the temples JSON — wire it up"
- "UX-POLISHER: the drawer feels janky on mobile — fix it"

If the user doesn't name a role, Claude should pick the obvious one and **state it in one line** before starting (e.g., *"Acting as BUILDER."*). This keeps both sides honest about what kind of output is coming.

## Cross-role rules

- Every role respects `CLAUDE.md` conventions.
- Every role updates `CLAUDE.md` § 9 status when their work changes the checklist.
- No role invents factual geography data.
- No role adds dependencies without user approval.