# Rohit Gupta Portfolio

## Overview
This project powers Rohit Gupta's portfolio site, built with Next.js and Tailwind CSS. It now includes an "Awesome Todo" experience at `/todo` for planning tasks, subtasks, and detailed descriptions.

## Implemented Use Cases
- **Awesome Todo page (`/todo`):**
  - View a dashboard of all tasks, subtask counts, and completion progress.
  - Start with a curated set of seeded task sections (conference, rewards, ops, etc.) that map to subtasks on first load.
  - Review tasks in a tile + accordion layout with expandable subtask details.
  - Add a top-level task.
  - Assign priority to each task and update it from the task tile.
  - Mark tasks (and subtasks) as completed to track progress.
  - Expand a task tile to add subtasks.
  - Add a description to each subtask for clarity and context.
  - Toggle subtask completion and track task progress visually.
  - Remove tasks or subtasks with immediate feedback.

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
