# Project Rules - React Native Clean Architecture

## Project Overview

React Native 0.84.0 project with Clean Architecture principles.

## Build Commands

```bash
npm start                 # Start Metro bundler
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator
npm run lint             # Run ESLint
npm test                 # Run all tests
npm test -- __tests__/Text.test.tsx  # Run specific test
```

## Code Style

### Naming Conventions

- Components: PascalCase (`Button`, `SignUpForm`)
- Functions: camelCase (`handleSubmit`, `createAuthService`)
- Interfaces: PascalCase (`ButtonProps`, `AuthRepository`)
- Constants: SCREAMING_SNAKE (`API_ROUTES`, `AXIOS_MESSAGES`)
- Component files: PascalCase (`Button.tsx`)
- Service files: camelCase + .service (`auth.service.ts`)
- Test files: PascalCase.test.tsx (`Text.test.tsx`)

### Import Order

React → React Native → External libs → Internal aliases → Relative imports

```typescript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@components/core';
import { useTheme, spacing } from '@theme/index';
```

### Exports

- Named exports for components and hooks
- Default exports for services (factory pattern)

### Code Guidelines

- Do not add comments unless explicitly requested
- Spanish is used in UI strings and validation messages
- Always define interfaces for props
- Use type inference from Zod schemas

## Architecture

### Module Structure

```
src/modules/{feature}/
├── domain/
│   ├── {feature}.model.ts       # Data types
│   ├── {feature}.repository.ts  # Repository interface
│   ├── {feature}.adapter.ts     # Data transformers
│   └── {feature}.scheme.ts      # Zod schemas
├── infrastructure/
│   └── {feature}.service.ts     # API implementation
├── application/
│   ├── {feature}.mutations.ts   # React Query mutations
│   └── {feature}.queries.ts     # React Query queries
└── ui/
    ├── {Feature}View.tsx        # Main view
    └── components/              # View components
```

### Error Handling

Always use `manageAxiosError` for API calls:

```typescript
import { manageAxiosError } from '@modules/network/domain/network.error';

async function fetchData() {
  try {
    const response = await axiosService.get<Data>('/endpoint');
    return response.data;
  } catch (error) {
    return manageAxiosError(error);
  }
}
```

### Theme Usage

Use theme for consistent styling:

```typescript
import { useTheme, spacing } from '@theme/index';

const { colors } = useTheme();
// Use spacing.md, colors.text, etc.
```

## Path Aliases

- `@components/*` → `src/components/*`
- `@modules/*` → `src/modules/*`
- `@theme/*` → `src/theme/*`
- `@config/*` → `src/config/*`
