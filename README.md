# Rohit Gupta Portfolio

## Summary
A polished personal portfolio built with **Next.js** and **Tailwind CSS**, featuring a high-fidelity `/todo` experience that blends structured task planning with a premium UI. The app focuses on clarity, momentum, and actionable detail—ideal for showcasing product thinking and execution.

## Key Features
- **Awesome Todo (`/todo`)**
  - Task dashboard with completion metrics, subtask counts, and progress visibility.
  - Seeded, curated task sections on first load (and automatic restoration if storage is empty).
  - Tile + accordion task layout with expandable subtasks.
  - Task priority controls (Low → Critical) with visual emphasis.
  - Task/subtask completion toggles with progress indicators.
  - Detailed subtask descriptions for context and ownership.
  - Real-time feedback on updates and removals.

## Implemented Use Cases
### Awesome Todo (`/todo`)
- Organize tasks with nested subtasks and rich descriptions.
- Prioritize work using structured urgency levels.
- Track progress at task and subtask levels.
- Preserve local state while maintaining a consistent default experience.

## Tech Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI:** Radix UI primitives + custom components
- **Testing:** Vitest + Testing Library

## Local Development
```bash
pnpm install
pnpm dev
```

## Testing
```bash
pnpm test
```

## Test Suite Documentation
See `tests/README.md` for details on the unit test structure and coverage.
