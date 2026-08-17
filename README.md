# @kbg/ui-kit

The KBG **visual and behavioural language**. Artifact 3 of the
[Platform Surfaces canon](../../docs/canon/README.md); read
[surface 06 — Experience](../../docs/canon/surfaces/06-experience.md) first.

> *"Even the UI/UX should be similar across the projects going forward. I don't want to reinvent
> every time."* — Mohan, 2026-08-16

## What this is — and is not

**Not** a general component library. Projects already have those, and a second one competes badly.
This ships the parts of the Experience contract that every project otherwise re-argues and gets
wrong the same way:

| Export | What it prevents |
|---|---|
| **The eight states** | The two-state screen. Most software ships loading + happy and improvises the rest under deadline. |
| `DeniedState` | A hidden control. `reason` is a **required prop** — a silent denial does not compile. |
| `SyncIndicator` | A green tick that lies. State is *derived* from the queue, so a caller cannot claim synced with work pending. |
| `tokens.css` | Forty screens that each picked their own grey, and a semantic palette fused to the brand accent. |

Everything else — tables, forms, charts — stays with the project, built to the contract in the
spec. That is the canon's thesis applied to UI: ship the part where doing it *differently* is the
bug.

## Use

```tsx
import '@kbg/ui-kit/tokens.css';
import { DeniedState, EmptyState, SyncIndicator } from '@kbg/ui-kit';

// Feed DeniedState from the SAME decision the API enforces with, so the disabled
// control and the 403 can never disagree (canon RBAC §3).
{!decision.enabled && (
  <DeniedState action="Correct this bill" reason={decision.reason} whoCan={decision.whoCan} />
)}

<SyncIndicator queuedCount={queue.length} queuedValue="₹48,300" lastSyncedAt={lastAt} />
```

Floor screens opt in to the touch minimum with a class, so the rule is enforced by CSS rather than
by a reviewer noticing:

```tsx
<main className="kbg-floor"> … </main>   /* every control ≥ --kbg-touch-min (44px) */
```

## Theming

Override the `:root` tokens. Do **not** redefine what a state or a denial looks like — that is the
part users carry between apps, and it is the whole point of the package.

## Verify

```bash
npm install
npm run typecheck     # tsc --noEmit, exits 0
node test_states.mjs  # the sync-state invariant + token rules
```

⚠️ `npx tsc` without a local install hits npm's placeholder package and **prints a message while
exiting 0** — a false green. Use the `typecheck` script, which resolves the real compiler.

## Versioning

`0.x` while Vijay, Aurafab and Solomon shake it out. Breaking changes go in the consuming project's
divergence register, not behind a compatibility shim.
