# Claude Code / Codex prompt bank

Use one prompt at a time. Do not ask the agent to implement the whole sprint in one pass.

## Universal opening

Paste this before each implementation task if the agent starts drifting:

```text
Rules:
- Read the repo before editing.
- Make the smallest coherent diff.
- Touch only the files named in the task.
- Do not invent data.
- Do not add dependencies.
- Do not change the CSV schema.
- Do not create composite scores or capability rankings.
- Keep caveats, but do not put defensive language in headlines.
- After editing, list files changed and commands to run.
```

## Prompt: branch safety explanation

```text
I am a novice developer. Before editing, explain in 5 short bullets what this task will change and why. Then make the code change.

Do not explain unrelated Next.js concepts. Teach only what I need for this task.
```

## Prompt: fix a failing build

```text
The last command failed. Fix the error with the smallest possible diff.

Rules:
- Do not redesign the page.
- Do not change the data model unless the error proves the type is wrong.
- Explain the cause in plain English.
- Show the changed files.

Error:
[paste terminal output]
```

## Prompt: ask for a diff review

```text
Review your own diff before I commit.

Check:
- Did you touch only the requested files?
- Did you invent data?
- Did you add a dependency?
- Did you change routes or schema unexpectedly?
- Could this break npm run build?

Return:
1. Risk list.
2. Files changed.
3. Suggested commit message.
```

## Prompt: firm dossier implementation

Use the full Phase 2 prompt in `01_step_by_step_v4_sprint.md`.

## Prompt: segment pages

Use the full Phase 3 prompt in `01_step_by_step_v4_sprint.md`.

## Prompt: map fix

Use the full Phase 4 prompt in `01_step_by_step_v4_sprint.md`.

## Prompt: explorer URL filters

Use the full Phase 5 prompt in `01_step_by_step_v4_sprint.md`.
