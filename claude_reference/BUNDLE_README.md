# IchGeheViral — Claude Masterpiece Bundle

This branch is an implementation handoff, not a production branch.

## What is inside

- Current IchGeheViral product/frontend source at the latest production baseline.
- `claude_reference/old-coaching/`: curated source from the previous IchGeheViral coaching/funnel site. Use it for the preferred white/orange visual DNA.
- `claude_reference/backend-contract/`: production checkout/backend ground truth.
- `CLAUDE_MASTER_PROMPT.md`: the primary task brief.

## Working rule

The current product UI is NOT sacred. Preserve real functionality and contracts, but feel free to redesign the customer journey and component architecture.

The old coaching reference is NOT a content source. It is a design reference.

The backend contract IS functional ground truth.

## Known unresolved business input

Final public Shopify prices have not been supplied in the repositories. Do not invent them. Build a clean central configuration so the values can be inserted later in one place.

## Safety

Keep checkout disabled by default unless explicitly activated by the existing launch flag and valid Shopify configuration.
