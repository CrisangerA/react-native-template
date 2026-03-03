---
name: rncatemplate
description: React Native Clean Architecture Template guidance for agents. Invoke when working on app architecture, UI, network, or tests in this repo.
---

# React Native Template Agent Guidance

## Project Overview

- React Native v0.84.0 with TypeScript and Jest tests.
- Core flow: App.tsx -> AppProvider -> RootNavigator.
- Architecture: 4-layer feature modules (Domain, Application, Infrastructure, UI).
- Node.js: >= 22.11.0

## OpenCode Integration

All rules, agents, and skills live in .opencode/. Use the skill tool or read the corresponding file.

- **Architecture/Layers:** @.opencode/rules/core.md
- **Testing:** @.opencode/rules/testing.md, @.opencode/skills/mobile-testing/SKILL.md
- **UI & Theming:** @.opencode/skills/create-component/SKILL.md
- **Module Scaffolding:** @.opencode/skills/create-module/SKILL.md
- **Forms:** @.opencode/skills/create-form/SKILL.md
- **Services:** @.opencode/skills/create-service/SKILL.md

## Agents Available

- scaffolder: Create new modules (Users, Transactions, etc.)
- test-writer: Generate Jest tests
- theme-auditor: Fix hardcoded colors/spacing
- ci-cd-architect: GitHub Actions and deployment pipelines

---

## Commands

### Development

| Command           | Description          |
| ----------------- | -------------------- |
| `npm install`     | Install dependencies |
| `npm start`       | Start Metro bundler  |
| `npm run ios`     | Run iOS simulator    |
| `npm run android` | Run Android emulator |

### Linting & Formatting

| Command            | Description          |
| ------------------ | -------------------- |
| `npm run lint`     | Run ESLint           |
| `npm run prettier` | Format with Prettier |

### Testing

| Command                                | Description         |
| -------------------------------------- | ------------------- |
| `npm test`                             | Run all tests       |
| `npm test -- --watch`                  | Watch mode          |
| `npm test -- --testPathPattern="file"` | Single test file    |
| `npm test -- --testNamePattern="name"` | Tests matching name |

### Cleanup

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run clean-node`    | Remove node_modules      |
| `npm run clean-ios`     | Clean iOS (removes Pods) |
| `npm run clean-android` | Clean Android build      |
| `npm run pod-install`   | Reinstall CocoaPods      |

---

## Code Style

### General

- TypeScript only - no plain JavaScript
- React functional components with hooks
- Single quotes, trailing commas (Prettier)
- No comments unless requested

### Path Aliases

Use aliases instead of relative imports:

```typescript
// Good
import { Button } from '@components/core';
import { useAuth } from '@modules/auth/application';
import { useTheme } from '@theme/index';

// Bad
import { Button } from '../../../components/core';
```

Aliases: `@assets/*`, `@components/*`, `@config/*`, `@containers/*`, `@hooks/*`, `@modules/*`, `@theme/*`, `@navigation/*`

### Naming Conventions

| Type       | Convention      | Example                    |
| ---------- | --------------- | -------------------------- |
| Components | PascalCase      | `UserProfile`, `LoginForm` |
| Hooks      | use prefix      | `useAuth`, `useUserData`   |
| Services   | .service suffix | `auth.service.ts`          |
| Types      | PascalCase      | `User`, `ApiResponse`      |
| Constants  | SCREAMING_SNAKE | `API_ROUTES`               |

### TypeScript Rules

- Define return types when not obvious
- Use interfaces for objects, types for unions
- Avoid `any` - use `unknown` if needed

### Import Order

1. React/React Native
2. External libraries (react-hook-form, tanstack query)
3. Path aliases (grouped)
4. Relative imports

---

## Architecture & Layers

### Module Structure

```
src/modules/{feature}/
├── domain/        # Models, repositories, adapters, schemas
├── infrastructure/ # API calls, Firebase, storage
├── application/   # React Query hooks (queries, mutations)
└── ui/            # Components and screens
```

### Layer Dependencies (MUST FOLLOW)

1. **ui** → consumes hooks from application. MUST NOT import from infrastructure.
2. **application** → depends on domain and infrastructure.
3. **infrastructure** → implements repositories, HTTP calls.
4. **domain** → pure TypeScript, no dependencies.

### Theming

- NEVER hardcode colors - use `useTheme()`
- NEVER use `colors.light.*` or `colors.dark.*` directly
- Access via: `const { colors, spacing, typography } = useTheme()`

---

## Error Handling

- Use centralized error types from domain layer
- Wrap async operations in try/catch
- Return typed error responses from services

```typescript
try {
  const response = await api.get('/endpoint');
  return { data: response.data, error: null };
} catch (err) {
  return { data: null, error: err as ApiError };
}
```

---

## Testing

- Tests in `__tests__/` at root, mirroring `src/` structure
- Use: `import { render, screen, fireEvent, waitFor } from '@test-utils';`
- Required providers: QueryClientProvider, ThemeProvider, SafeAreaProvider, NavigationContainer
- Mock: `jest.mock('@modules/.../infrastructure/service');`
- Clear mocks: `beforeEach(() => { jest.clearAllMocks(); });`
- Exclude: index.ts, _.model.ts, _.repository.ts

---

## Linting

- ESLint extends: `@react-native`
- Run `npm run lint` before committing

## Exclude from TypeScript

node_modules/, Pods/, android/build/, ios/build/
