---
name: rncatemplate
description: React Native Clean Architecture Template guidance for agents. Invoke when working on app architecture, UI, network, or tests in this repo.
---

# React Native Template Agent Guidance

## Project Overview

- React Native v0.84.0 app with TypeScript and Jest tests.
- Core flow: App.tsx -> AppProvider -> RootNavigator.
- Architecture: 4-layer feature modules (Domain, Application, Infrastructure, UI).

## OpenCode Integration (Single Source of Truth)

This project uses OpenCode as the main brain for AI capabilities. All rules, agents, and skills live in .opencode/.

**CRITICAL: When you encounter a specific task, use your skill tool or read the corresponding file to load the detailed instructions.**

The skills are structured in two tiers:

- **Generic (create-*):** Reusable patterns for any React Native project. Edit these when copying to a new project.
- **Specific (project-):** Project-specific details embedded in each skill under "Project Specific" sections.

- **Architecture/Layers:** @.opencode/rules/core.md
- **Networking/API:** @.opencode/skills/create-service/SKILL.md
- **UI & Theming:** @.opencode/skills/create-component/SKILL.md
- **Module Scaffolding:** @.opencode/skills/create-module/SKILL.md
- **Forms & Validation:** @.opencode/skills/create-form/SKILL.md
- **Testing Setup:** @.opencode/rules/testing.md

## Agents Available

You can invoke specialized sub-agents (via the task tool) for specific workflows:

- scaffolder: To create a new module (e.g. Users, Transactions).
- test-writer: To generate Jest tests following the project's strict conventions.
- theme-auditor: To fix hardcoded colors and spacing across the UI.
- ci-cd-architect: To assist with GitHub Actions and deployment pipelines.

## Code Style

- TypeScript, React functional components.
- Use existing path aliases from tsconfig/babel (@components, @modules, etc).
- Prefer single quotes and trailing commas.
- Follow existing patterns for theme tokens (useTheme()). NEVER hardcode colors or use colors.light.* directly.

## Commands

- Install: npm install
- Start Metro: npm start
- iOS: npm run ios
- Android: npm run android
- Lint: npm run lint
- Tests: npm test
