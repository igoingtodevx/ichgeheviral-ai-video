# CLAUDE MASTER PROMPT — IchGeheViral Product Experience

You are not being asked for a cosmetic redesign. You are taking ownership of the product experience and turning the current implementation into a customer-ready, professional, conversion-oriented SaaS experience.

## 0. Start by understanding the bundle

Read the repository before changing anything.

The root repository is the current IchGeheViral frontend/product implementation.

Important reference folders:

- `claude_reference/old-coaching/`
  - This is the earlier IchGeheViral coaching/funnel site that the client explicitly liked.
  - Use it as VISUAL DNA: white, warm off-white, orange (#FF8600), strong black editorial typography, restrained serif accents, clean spacing, confident sales-page hierarchy.
  - Do NOT copy its old coaching content or blindly reproduce its page structure.

- `claude_reference/backend-contract/`
  - This contains the production backend and Shopify contract.
  - Treat these documents as functional ground truth.
  - Do not invent a different production flow.

The current production frontend commit this bundle was based on already contains the current landing page, `/admin`, social-proof integration and `/kundenbereich`.

## 1. The actual problem to solve

The current redesign is not customer-real enough.

It looks more coherent than before, but it still reads like something made by a developer for another developer. The user sees implementation details, internal architecture concepts, missing-product disclaimers and technical language instead of being guided through a polished buying and creation experience.

Examples of what MUST disappear from customer-facing UI:

- `Paid-Webhook`
- `/jobs bypass`
- `MARKETING_COURSE_VARIANT_ID`
- repository/internal implementation language
- "we did not hardcode this"
- "backend is not implemented"
- architecture disclaimers
- developer-centric status copy

Those facts may matter internally, but a paying customer must never need to understand them.

The product needs to answer these questions almost immediately:

1. What is IchGeheViral?
2. What kind of video do I get?
3. Why is it designed for high viral potential?
4. What do I have to provide?
5. What happens after I click the CTA?
6. How long / what format / what result do I receive?
7. How does the "no credits" promise work?
8. What does it cost?
9. Where do I create my video?
10. What can I trust? Show real examples and real proof, not invented claims.

## 2. Product positioning

The central message is NOT "we built an automated AI pipeline."

The central message is:

**IchGeheViral turns one idea into a complete short-form transformation reel whose structure is deliberately optimized for attention, visible progression and payoff.**

The client specifically wants "maximales Viralpotential" to be one of the dominant ideas of the site.

Be precise:
- We can say the video is BUILT / OPTIMIZED for maximum viral potential.
- We cannot guarantee that a video will go viral.
- Never state or imply guaranteed reach, views or earnings.

Secondary product benefits:
- no confusing credit wallet / credit counting
- no manual video editing
- coherent 60+ second vertical reel instead of disconnected AI clips
- stable visual progression across multiple transformation phases
- ready for TikTok / Instagram Reels / YouTube Shorts
- simple input: user gives the idea, the system handles the production flow

"No credits" must be explained in normal customer language. Do NOT imply unlimited free generation if the commercial model does not support that. The intended message is closer to:
"You buy a clear result instead of constantly calculating generation credits."

## 3. Visual direction

The old coaching site is the preferred aesthetic reference.

Use its strengths:
- white / warm off-white page surfaces
- primary orange #FF8600
- dark ink around #101114
- restrained borders around #E7E3DF
- large, confident black headings
- occasional serif accent for important emotional words
- strong whitespace
- editorial hierarchy
- rounded elements only where useful
- polished but not flashy
- high readability on mobile

Avoid generic AI-SaaS visual language:
- no purple/blue neon
- no glassmorphism everywhere
- no random gradient text
- no decorative sparkles unless they have a real role
- no dense grids of tiny feature cards
- no fake terminal/pipeline aesthetic
- no theme switcher
- no "AI slop" illustration patterns

A subtle warm orange radial glow or tasteful orange emphasis is fine. The website should feel like a premium modern creator product, not a hackathon dashboard.

You have freedom to improve beyond the old reference. The reference is a design language, not a cage.

## 4. Public landing page — desired experience

Re-think the full information architecture. Do not preserve the current section order just because it exists.

A strong direction would include:

### Hero
Within 3 seconds the visitor should understand the product.

Need:
- strong headline centered on viral potential + complete reel
- one short explanatory paragraph
- primary CTA: create/start a video
- secondary CTA: watch a real result
- real video/result visual in the hero or directly below it
- compact trust/value line: 60+ sec / 9:16 / no editing / no credit confusion

Do not overload the hero.

### Show the actual result early
Use the real generated reel(s) already in the repository.

This is stronger than abstract promises.

Explain it in customer terms:
- one idea
- a sequence of coordinated transformation phases
- final 60+ second vertical reel
- consistent visual progression
- ambient sound / finished MP4 where supported by actual product facts

### Explain why it is designed for viral potential
This section should be understandable by a normal creator/customer.

Use concepts such as:
- Scroll stop
- visible progress
- curiosity: "what will the final result look like?"
- final reveal / payoff
- native vertical short-form format

Do not turn this into a technical lecture.

### How it works
Prefer a highly visual 3-step explanation:
1. Describe the transformation you want.
2. IchGeheViral builds the visual progression and reel.
3. Receive/download the finished vertical video.

The customer should understand exactly what happens.

### "No credits"
Make this a strong, simple benefit section.

Explain:
- many AI tools force users to think in tokens/credits/generations
- IchGeheViral should communicate the purchasable RESULT clearly
- do not claim unlimited use unless the final commercial model explicitly supports it

### Social proof
Keep the existing REAL social-proof backend/feed.

Rules:
- no invented testimonials
- no invented view counts
- no fake logos
- no fake counters
- if the feed is empty, use a graceful layout that does not fabricate proof

### Pricing
The client explicitly asked where prices are.

The current repository does NOT contain a final approved public price. Therefore:
- DO NOT invent a number
- build pricing as a proper first-class section/component
- make price/package data centrally configurable (single product config or environment-backed configuration)
- support at least:
  - AI Video
  - optional AI Video + Marketing Course bundle if that offer remains part of the product
- while price is unknown, use a tasteful pre-launch state instead of developer copy
- make it trivial to insert the final price later in one place

If a valid Shopify/product price can be retrieved from an existing real endpoint without creating a security or architecture problem, you may use it. Otherwise keep the source of truth explicit and centralized.

### FAQ
Answer real buyer questions, not implementation questions.

Examples:
- What exactly do I receive?
- Which video formats are currently supported?
- How long is the finished video?
- How long does generation normally take, if supported by existing product facts?
- Do I need editing skills?
- What does "optimized for viral potential" mean?
- Can you guarantee that my video goes viral? (No.)
- How does pricing / no-credits work?
- Which transformation types are currently validated?
- What happens after ordering?

Only state facts supported by the repository / product source.

## 5. Customer area / Studio

`/kundenbereich` should feel like a real product, not a technical handoff screen.

The customer must never see backend architecture.

Design it as a polished **IchGeheViral Studio**.

The primary job to be done is "Create a new video."

A good UX may contain:

### Product shell
- clear brand
- "Studio" / Kundenbereich
- simple nav hierarchy
- help / back-to-site affordance
- future-ready area for projects/orders without pretending data exists

### New video wizard
This is the core.

Guide the user through:
1. Choose / describe the transformation.
2. Optional helpful presets/examples.
3. Explain what the system will produce.
4. Show concise order summary / format / deliverable.
5. Optional marketing-course add-on if commercially intended.
6. Show the real price once configured.
7. Continue to secure checkout.

The form needs excellent labels, helper copy, examples and validation. A non-technical user should never wonder what to type.

### After purchase
Do not fabricate job history or completed orders.

The current backend contract creates the generation job only after a verified paid Shopify webhook. Preserve that truth.

If the backend does not expose enough data to build a real authenticated order-history flow, do not fake it. Instead:
- structure the UI so it can be added cleanly later
- keep current launch flow honest
- optionally create polished empty states
- document the missing backend capability internally, not as customer-facing copy

## 6. Functional ground truth — do not break

Read `claude_reference/backend-contract/BACKEND.md` and `SHOPIFY_ACTIVATION.md`.

Important:
- Production purchase entry is `POST /checkout`.
- The frontend sends at minimum `concept` and optional `add_course`.
- Backend creates a purchase draft.
- Shopify checkout is created.
- A verified paid Shopify webhook creates exactly one generation job.
- Production anonymous direct `POST /jobs` is intentionally disabled.
- Do NOT re-introduce a production `/jobs` shortcut.

Current frontend already has a `createCheckout()` client boundary. Preserve / improve it rather than bypassing it.

Checkout is currently gated by `NEXT_PUBLIC_CHECKOUT_ENABLED=true`.
Keep a safe launch gate until real pricing / Shopify activation is approved.

Do not expose secrets.
Do not put Shopify secret data in the client.

## 7. Existing things that must survive

- `/admin` social-proof admin route and its functionality
- real social-proof feed
- actual generated demo video assets
- Next.js app must build successfully
- responsive mobile experience
- current backend API contract
- safe disabled-checkout state before final commercial activation

You may refactor components and page structure aggressively if that produces a cleaner product.

## 8. Engineering quality

Use the current Next.js stack.

Prefer:
- clean component boundaries
- a central product/pricing config
- semantic HTML
- accessible focus states
- correct labels
- responsive layouts
- no horizontal overflow
- no huge monolithic page if sensible components improve maintainability
- `next/image` for normal images where appropriate
- native video behavior appropriate for the existing assets
- minimal unnecessary client-side JS
- no fake network requests
- no hidden hardcoded secrets

Do not overengineer. This product is small. Simplicity and finish beat architecture theater.

## 9. Your execution process

Do not stop after proposing a design.

1. Audit the repo and reference material.
2. Decide the final customer journey and information architecture.
3. Implement it.
4. Run the production build.
5. Run the relevant lint/type checks.
6. Render the landing page and customer area at desktop and mobile sizes.
7. Inspect the actual screenshots visually.
8. Iterate on anything that looks cramped, generic, amateur, confusing or developer-centric.
9. Verify key links / CTA flow.
10. Verify checkout stays safely gated unless it is explicitly configured.
11. Verify `/admin` still works.
12. Leave the repository in a clean, production-ready state.

Do not ask me to approve every small decision. Use product/design judgment and take the implementation to a coherent finished state.

## 10. Quality bar

The final result should feel like a real paid creator product a non-technical customer could understand and trust.

A visitor should not need a call with the founder to understand:
- the offer
- the result
- the process
- the reason it may perform well
- the pricing model
- where to start

The Studio should feel like the natural product behind the marketing site.

The goal is not "better than the current page."

The goal is: **customer-ready, visually premium, trustworthy, obvious, and cohesive end-to-end.**
