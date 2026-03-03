# Code Quality Skill — Standards Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `code-quality` |
| **Description** | Enforces ESLint, Prettier (single quotes, trailing commas, no arrow parens), TypeScript strict mode, path aliases, naming conventions, import organization, and file structure standards. |
| **Purpose** | Maintain codebase consistency, readability, and developer experience across all files. |
| **Category** | Quality, DX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Creating any file, reviewing code style, configuring tooling, naming variables/functions |
| **Context** | All TypeScript/TSX files in `src/` |
| **Observed paths** | `src/**/*.ts`, `src/**/*.tsx`, `.eslintrc.js`, `.prettierrc.js`, `tsconfig.json` |

## 3. Responsibilities

### Validates
- Naming follows PascalCase/camelCase/SCREAMING_SNAKE conventions
- Imports use path aliases for cross-module, relative for intra-module
- Import sections organized with comment headers
- `StyleSheet.create()` at file bottom
- No `any` types (except Zod v4 resolver compatibility `as any`)
- Prettier formatting applied

### Recommends
- `handle` prefix for internal event handlers
- `on` prefix for callback props
- Named exports for components, default exports for service singletons and navigators
- Comment headers for import sections: `// Components`, `// Theme`, `// Navigation`, etc.

### Prevents
- `any` types (except documented exceptions)
- Unused imports and variables
- Console.log in production code
- Non-descriptive variable names

## 4. Rules

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProductItem`, `SignInForm` |
| Component files | PascalCase | `ProductItem.tsx`, `SignInForm.tsx` |
| View components | PascalCase + `View` | `ProductsListView`, `ProductDetailView` |
| Functions | camelCase | `handleSubmit`, `formatJoinDate` |
| Internal handlers | `handle` prefix | `handleEdit`, `handleCardPress` |
| Callback props | `on` prefix | `onPress`, `onSubmit`, `onAction` |
| Hooks | `use` + camelCase | `useProducts`, `useDebounce` |
| Constants | SCREAMING_SNAKE | `API_ROUTES`, `ANIMATION_DURATION`, `COLLECTION_ROUTES` |
| Types/Interfaces | PascalCase | `ProductEntity`, `ButtonProps` |
| Enums | PascalCase members | `ProductsRoutes.ProductList` |
| Schema files | kebab.scheme.ts | `product.scheme.ts`, `auth.scheme.ts` |
| Model files | kebab.model.ts | `product.model.ts`, `auth.model.ts` |
| Service files | kebab.service.ts | `product.http.service.ts` |
| Style files | PascalCase.styles.ts | `Button.styles.ts`, `Card.styles.ts` |

### Import Organization

```typescript
// Grouped with comment headers, in this order:
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
// Components
import { Text, Card, Button } from '@components/core';
import { LoadingState, ErrorState, EmptyState, RootLayout } from '@components/layout';
// Application
import { useProducts } from '../application/product.queries';
import { useProductDelete } from '../application/product.mutations';
// Domain
import type { ProductEntity } from '../domain/product.model';
import { productSchema, ProductFormData } from '../domain/product.scheme';
// Navigation
import { ProductsRoutes, ProductsScreenProps } from '@navigation/routes';
import { useNavigationProducts } from '@navigation/hooks';
// Theme
import { useFocusFadeIn } from '@theme/hooks';
import { ANIMATION_DURATION, spacing } from '@theme/index';
// Store
import { useAppStorage } from '@modules/core/infrastructure/app.storage';
```

### Path Alias Rules

| Context | Rule | Example |
|---|---|---|
| Cross-module imports | Use `@alias` | `import { Text } from '@components/core'` |
| Same-module imports | Use relative path | `import { useProducts } from '../application/product.queries'` |
| Config imports | Use `@config` | `import { API_ROUTES } from '@config/api.routes'` |
| Theme imports | Use `@theme` | `import { spacing } from '@theme/index'` |
| Navigation imports | Use `@navigation` | `import { ProductsRoutes } from '@navigation/routes'` |

### Export Patterns

| Element | Export Style | Why |
|---|---|---|
| View components | Named export | `export function ProductsListView()` — explicit, greppable |
| Core/form/layout components | Named export | `export function Button()` |
| Module components | Named export + `React.memo` | `export const ProductItem = React.memo(...)` |
| Service singletons | Default export | `export default createProductService()` — consumed as import name |
| Navigators | Default export | `export default function ProductsNavigator()` |
| Barrel files | Re-export | `export * from './Button'` |

### Prettier Configuration

```javascript
// .prettierrc.js
module.exports = {
  singleQuote: true,       // 'string' not "string"
  trailingComma: 'all',    // Trailing commas everywhere
  arrowParens: 'avoid',    // x => x, not (x) => x
};
```

### StyleSheet Rules

```typescript
// ✅ StyleSheet.create at file bottom
export function ProductItem() {
  return <View style={styles.container}>...</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});

// ❌ Inline styles (not cacheable)
<View style={{ padding: 16, gap: 4 }}>
```

### TypeScript Strictness

```typescript
// ✅ Explicit types for function params and return values
interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
  initialData?: ProductEntity;
}

// ✅ Type imports with `type` keyword
import type { ProductEntity } from '../domain/product.model';

// ❌ Avoid `any` — only exception: zodResolver compatibility
resolver: zodResolver(productSchema) as any,  // Documented Zod v4 exception
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `console.log()` in production | Debug noise | Remove or use proper logging |
| `any` type (except documented) | Breaks type safety | Explicit types |
| Unused imports | Dead code | Remove with ESLint |
| Non-descriptive names (`data`, `temp`, `x`) | Unreadable | Descriptive names (`products`, `searchText`) |
| Inline styles | Not cacheable | `StyleSheet.create()` |
| Direct RN imports for themed components | Bypasses theme | Use `@components/core` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Code style audit |
| **Severity: error** | `any` type, missing TypeScript type, incorrect path alias |
| **Severity: warning** | Naming deviation, missing import header, console.log |
| **Severity: info** | Could use `type` import, could improve naming |

## 6. Practical Example

### Before — Inconsistent style
```typescript
import axios from 'axios'
import {View, Text, StyleSheet} from "react-native"
import {useEffect, useState} from "react"

export default function productList({data}: any) {
  const handle_click = (item) => {
    console.log(item)
  }
  return <View style={{padding: 16}}><Text>{data.name}</Text></View>
}
```

### After — Project standards
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
// Components
import { Text, Card } from '@components/core';
// Types
import type { ProductEntity } from '../../domain/product.model';
// Theme
import { spacing } from '@theme/index';

interface ProductItemProps {
  product: ProductEntity;
}

export function ProductItem({ product }: ProductItemProps) {
  const handlePress = () => {
    // Navigation logic
  };

  return (
    <Card onPress={handlePress}>
      <View style={styles.info}>
        <Text variant="h3">{product.name}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    gap: spacing.xs,
  },
});
```

**Explanation**: Named export, PascalCase component, typed props interface, `handle` prefix for handlers, path aliases for cross-module, comment headers for import sections, `StyleSheet.create` at bottom, themed components, spacing tokens.
