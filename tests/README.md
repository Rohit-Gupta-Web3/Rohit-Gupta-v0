# Todo UI Test Suite

## Overview
This directory contains unit tests that validate the behavior of the `/todo` experience. The tests focus on the user journey for creating tasks and subtasks with descriptions, plus validation feedback for missing inputs.

## Structure
- `setup.ts` configures the testing environment (JSDOM + custom globals).
- `todo-page.test.tsx` covers rendering, task creation, subtask creation, and validation errors.

## Coverage Focus
- **Positive flows:** Adding tasks and subtasks with descriptions.
- **Negative flows:** Missing task titles and missing subtask titles.
- **Failure simulations:** Storage save failures surface user-visible warnings.
- **UX safeguards:** Ensures empty-state messaging is displayed when there are no tasks.
