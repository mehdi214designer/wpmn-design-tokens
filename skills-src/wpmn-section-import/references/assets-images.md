# External assets: what to do with them

Nothing outside the design system ships. Replacement rules, in order of preference:

1. **Photos / app screenshots** → verified Unsplash images (all return 200), pattern
   `https://images.unsplash.com/<id>?auto=format&fit=crop&w=<900-1400>&q=80`:
   - photo-1460925895917-afdab827c52f — analytics dashboard A
   - photo-1551288049-bebda4e38f71 — charts dashboard B
   - photo-1498050108023-c5249f4df085 — code editor
   - photo-1486312338219-ce68d2c6f44d — macbook over shoulder
   - photo-1517180102446-f3ece451e9d8 — clean desk
   - photo-1522202176988-66273c2fd55f — team collaborating
   - photo-1497366216548-37526070297c — office space
   - photo-1542744173-8e7e53415bb0 — meeting/support
   - photo-1506905925346-21bda4d32df4 — landscape
   - photo-1523275335684-37898b6baf30 — product shot
   - photo-1557682250-33bd709cbe85 / photo-1557683316-973673baf926 — gradients
   - photo-1618005182384-a83a8bd57fbe / photo-1620641788421-7a1c342ea42e — 3d abstract
   Never reuse the same image twice within one section. New ids must be verified (curl HEAD).
2. **Videos** → swap to images; the wipe/crossfade interactions work identically.
3. **Lottie / external JS** → drop the dependency, promote the design's own CSS fallback, or
   rebuild as token-based CSS art (radial/conic gradients, keyframes).
4. **Decorative textures** (dot grids, noise, swirls) → CSS patterns from tokens, e.g.
   `radial-gradient(color-mix(in srgb, var(--color-text-primary) 10%, transparent) 1px, transparent 1.5px)`
   with `background-size`.
5. **Logos** → text marks styled with tokens, or the DS Logo component.
6. **Inline SVG icons in references** → keep geometry verbatim, strip `style=""` attrs,
   convert fills/strokes to `currentColor`, color via a token on the parent.
7. **Canvas art** → render with token colors resolved at runtime
   (`getComputedStyle(sec).getPropertyValue('--btn-bg-enable')`), re-render on
   `data-brand`/`data-theme` via MutationObserver, vary opacity with `globalAlpha`.
