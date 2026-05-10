# VS Code Beginner Checklist

## One-time installs
1. Install Visual Studio Code.
2. Install Node.js LTS.
3. Install Git.
4. Create or log into GitHub.
5. Install either the Claude Code VS Code extension or the OpenAI Codex VS Code extension.
6. Sign into the extension.

## Daily workflow
1. Open VS Code.
2. Open the project folder.
3. Open Terminal inside VS Code.
4. Run `npm run dev` to preview locally.
5. Ask the coding agent for one bounded task only.
6. Review changed files.
7. Run checks:
   - `npm run build:data`
   - `npm run lint`
   - `npm run build`
8. Commit changes.

## Golden rule
Never ask the coding agent to build the whole project. Ask for one small coherent diff.
