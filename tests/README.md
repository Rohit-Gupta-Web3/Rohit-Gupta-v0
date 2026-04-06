# Todo UI Test Suite

## Overview
This directory contains unit tests that validate the behavior of the `/todo` experience. The tests focus on the user journey for creating tasks and subtasks with descriptions, plus validation feedback for missing inputs.

## Structure
- `setup.ts` configures the testing environment (JSDOM + custom globals).
- `todo-page.test.tsx` covers rendering, task creation, subtask creation, priority updates, completion toggles, and validation errors.
- `projects-section.test.tsx` validates that newly added project cards expose the correct external links.

## Coverage Focus
- **Positive flows:** Adding tasks and subtasks with descriptions.
- **Negative flows:** Missing task titles and missing subtask titles.
- **Failure simulations:** Storage save failures surface user-visible warnings.
- **UX safeguards:** Ensures seeded tasks render on first load and restore when stored tasks are empty.
- **Task management controls:** Validates priority updates and task completion state changes.
- **Portfolio content integrity:** Confirms critical project URLs render with correct destinations.
