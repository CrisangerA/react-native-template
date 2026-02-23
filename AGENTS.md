# AGENTS.md

Guidelines for AI coding agents working in this React Native codebase.

## Build/Lint/Test Commands

```bash
# Development
npm start                 # Start Metro bundler
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator

# Linting & Formatting
npm run lint             # Run ESLint
npm run prettier         # Format all source files

# Testing
npm test                 # Run all tests
npm test -- --testPathPattern="Text"          # Run tests matching pattern
npm test -- __tests__/Text.test.tsx           # Run specific test file
npm test -- --coverage  # Run with coverage

# Cleaning
npm run clean-android    # Clean Android build
npm run clean-ios        # Clean iOS build
npm run clean-watch      # Clean watchman cache
npm run clean-node       # Remove node_modules
```

## Project Architecture

React Native 0.84.0 project with **Clean Architecture**:

```
src/
├── components/        # Reusable UI components
│   ├── core/         # Base components (Button, Text, Modal, etc.)
│   ├── form/         # Form-integrated components (with react-hook-form)
│   └── layout/       # Layout components (RootLayout)
├── config/           # App configuration (API routes, storage keys)
├── modules/          # Feature modules (authentication, network, examples)
│   └── {feature}/
│       ├── domain/       # Business logic (models, repositories, adapters, schemas)
│       ├── infrastructure/  # External services (API calls)
│       ├── application/  # React Query hooks (mutations, queries)
│       └── ui/           # UI components and views
├── providers/        # React context providers (AppProvider, ThemeProvider)
└── theme/            # Design system (colors, typography, spacing, shadows)
```

## Path Aliases

```typescript
import { Button } from '@components/core';
import { TextInput } from '@components/form';
import { useTheme, spacing } from '@theme/index';
import { API_ROUTES } from '@config/api.routes';
import authService from '@modules/authentication/infrastructure/auth.service';
```

## Naming Conventions

| Element           | Convention           | Example                             |
| ----------------- | -------------------- | ----------------------------------- |
| Components        | PascalCase           | `Button`, `SignUpForm`              |
| Functions         | camelCase            | `handleSubmit`, `createAuthService` |
| Interfaces        | PascalCase           | `ButtonProps`, `AuthRepository`     |
| Constants         | SCREAMING_SNAKE      | `API_ROUTES`, `AXIOS_MESSAGES`      |
| Files (component) | PascalCase           | `Button.tsx`, `SignUpView.tsx`      |
| Files (service)   | camelCase + .service | `auth.service.ts`                   |
| Test files        | PascalCase.test.tsx  | `Text.test.tsx`                     |

## Key Dependencies

- **State**: Zustand (global), TanStack Query (server state)
- **Forms**: react-hook-form + @hookform/resolvers + Zod
- **Network**: Axios
- **Storage**: react-native-mmkv
- **Navigation**: Custom navigator (no React Navigation)
- **UI**: react-native-gesture-handler, react-native-safe-area-context

## Skills & Agents

This project includes specialized skills for common tasks:

- `/create-component` - Create new UI components following project conventions
- `/create-service` - Create new services with factory pattern
- `/create-module` - Create new feature modules with Clean Architecture

Use `@code-reviewer` agent for code reviews focusing on project conventions.

## Editor Compatibility

This project is configured for multiple AI editors:

| Editor          | Rules            | Skills            | Agents              |
| --------------- | ---------------- | ----------------- | ------------------- |
| **Cursor**      | `.cursor/rules/` | -                 | -                   |
| **OpenCode**    | `AGENTS.md`      | `.agents/skills/` | `.opencode/agents/` |
| **TraeAI**      | `.trae/rules/`   | `.trae/skills/`   | -                   |
| **Claude Code** | -                | `.agents/skills/` | -                   |

## Code Patterns

For detailed code patterns, refer to:

- Component structure: Load skill `create-component` when creating components
- Service pattern: Load skill `create-service` when creating services
- Module structure: Load skill `create-module` when creating modules

## Notes

- Default export is used for services (factory pattern)
- Named exports for components and hooks
- Do not add comments unless explicitly requested
- Spanish is used in UI strings and validation messages
