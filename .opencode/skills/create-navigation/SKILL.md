---
name: create-navigation
description: Create navigation structure with React Navigation. Use when setting up app navigation, stacks, or routes.
---

# Create Navigation

Create navigation structure following React Navigation patterns with TypeScript support.

## When to Use

- Setting up app navigation for the first time
- Adding new navigation stacks
- Creating route definitions
- Adding navigation hooks

## Navigation Structure

```
src/navigation/
├── RootNavigation.tsx      # Main navigation container
├── config/
│   └── routes.ts           # Route definitions and param types
├── stacks/
│   └── {Feature}StackNavigation.tsx  # Stack navigators
└── hooks/
    └── useNavigation.tsx   # Typed navigation hooks
```

## Implementation

### 1. Route Definitions (`config/routes.ts`)

```typescript
import { Product } from '@modules/products/domain/product.model';

export const ProductsRoutes = {
  Home: 'Home',
  Form: 'Form',
  Detail: 'Detail',
} as const;

export type ProductsRoutes =
  (typeof ProductsRoutes)[keyof typeof ProductsRoutes];

export type ProductsStackParamsList = {
  [ProductsRoutes.Home]: undefined;
  [ProductsRoutes.Form]: { product?: Product };
  [ProductsRoutes.Detail]: { product: Product };
};
```

### 2. Stack Navigator (`stacks/{Feature}StackNavigation.tsx`)

```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsListView from '@modules/products/ui/views/ProductsListView';
import ProductsFormView from '@modules/products/ui/views/ProductsFormView';
import ProductDetailView from '@modules/products/ui/views/ProductDetailView';
import {
  ProductsRoutes,
  type ProductsStackParamsList,
} from '@navigation/config/routes';

const ProductsStack = createNativeStackNavigator<ProductsStackParamsList>();

export default function ProductsStackNavigation() {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductsStack.Screen
        name={ProductsRoutes.Home}
        component={ProductsListView}
      />
      <ProductsStack.Screen
        name={ProductsRoutes.Form}
        component={ProductsFormView}
      />
      <ProductsStack.Screen
        name={ProductsRoutes.Detail}
        component={ProductDetailView}
      />
    </ProductsStack.Navigator>
  );
}
```

### 3. Navigation Hook (`hooks/useNavigation.tsx`)

```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductsStackParamsList } from '@navigation/config/routes';

export const useProductsNavigation = () =>
  useNavigation<NativeStackNavigationProp<ProductsStackParamsList>>();
```

### 4. Root Navigation (`RootNavigation.tsx`)

```typescript
import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import ProductsStackNavigation from './stacks/ProductsStackNavigation';

const navigationRef = createNavigationContainerRef();

export default function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <ProductsStackNavigation />
    </NavigationContainer>
  );
}
```

## Usage in Components

```typescript
import { useProductsNavigation } from '@navigation/hooks/useNavigation';
import { ProductsRoutes } from '@navigation/config/routes';

function ProductCard({ product }) {
  const navigation = useProductsNavigation();

  const handlePress = () => {
    navigation.navigate(ProductsRoutes.Detail, { product });
  };

  return <Button onPress={handlePress} title="View Details" />;
}
```

## Register in AppProvider

Add NavigationContainer to your providers:

```typescript
// src/providers/AppProvider.tsx
import RootNavigation from '@navigation/RootNavigation';

export default function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
```

## Required Dependencies

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
```

## Checklist

1. Create `src/navigation/` directory structure
2. Define routes and param types in `config/routes.ts`
3. Create stack navigator in `stacks/`
4. Create typed navigation hook in `hooks/`
5. Create RootNavigation container
6. Register in AppProvider
7. Install required dependencies

## Best Practices

- Use `as const` for route definitions
- Type all route params explicitly
- Use typed navigation hooks instead of `useNavigation()` directly
- Keep route params minimal (pass IDs, fetch data in screen)
- Export navigation ref for navigation outside components
