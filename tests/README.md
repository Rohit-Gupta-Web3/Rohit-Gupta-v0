# Portfolio Test Suite

## Overview
Unit tests that validate the portfolio home page renders the correct,
resume-driven content and positioning. Tests run under Vitest with a JSDOM
environment; JSX is transformed by Vitest's built-in esbuild (automatic
runtime), so no `@vitejs/plugin-react` plugin is required.

## Structure
- `setup.ts` configures the environment: `@testing-library/jest-dom` matchers
  plus JSDOM shims for `crypto`, `matchMedia`, `IntersectionObserver`, and
  pointer/scroll APIs the components touch.
- `home-page.test.tsx` renders `app/page.tsx` (`next/image` mocked) and asserts
  the key content.

## Coverage Focus
- **Identity & positioning:** hero name, rotating title (AI Product Manager),
  and the AI Product & Technical Program tagline.
- **Current role:** Thinkverse Labs — Tech Lead, Web3 (from the 2026 resume).
- **Selected work:** AI portfolio featured (DialTone, Sharp AI Agents).
- **Information architecture:** AI portfolio and Web3 project groups render as
  distinct, labeled sections.
- **Data accuracy:** corrected location (Noida) and writing stats (314 articles).

## Running
```
pnpm test
```
