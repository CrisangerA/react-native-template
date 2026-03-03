# Navigation Skill — Route & Navigation Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `navigation-patterns` |
| **Description** | Enforces React Navigation with typed routes (enums), typed ParamList, screen props types, typed navigation hooks, and consistent stack navigator configuration. |
| **Purpose** | Guarantee type-safe navigation — no string magic, no runtime route errors, no untyped params. |
| **Category** | Architecture, DX, Quality |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Adding screens, creating stacks, using `navigate()`, defining route params |
| **Context** | `src/navigation/`, route definitions, stack navigators, navigation hooks |
| **Observed paths** | `src/navigation/routes/`, `src/navigation/stacks/`, `src/navigation/hooks/`, `src/navigation/RootNavigator.tsx` |

## 3. Responsibilities

### Validates
- All route names defined in an `enum` (never string literals)
- Every stack has a typed `ParamList` and `ScreenProps` type
- Navigation hooks are typed per stack (not generic `useNavigation`)
- Detail screens receive `entityId: string` (not full entity objects)
- Form screens receive optional full entity (for edit mode)
- All stacks use `headerShown: false` with `slide_from_right` animation

### Recommends
- Barrel export all routes from `src/navigation/routes/index.ts`
- Typed navigation hooks in `src/navigation/hooks/useNavigation.ts`
- One stack navigator file per module in `src/navigation/stacks/`

### Prevents
- String literal route names: `navigate('ProductDetail')`
- Passing non-serializable data (functions, class instances) as params
- Importing screen components inline in `<Stack.Screen component={...} />`
- Nested navigators more than 2 levels deep

## 4. Rules

### Route Definition Pattern (3-file system per module)

```typescript
// 1. Route enum + ParamList — src/navigation/routes/{feature}.routes.ts
export enum ProductsRoutes {
  ProductList = 'ProductList',
  ProductDetail = 'ProductDetail',
  ProductForm = 'ProductForm',
}

export type ProductsStackParamList = {
  [ProductsRoutes.ProductList]: undefined;
  [ProductsRoutes.ProductDetail]: { productId: string };  // ID only
  [ProductsRoutes.ProductForm]?: { product: ProductEntity }; // Optional = create, present = edit
};

export type ProductsScreenProps<T extends keyof ProductsStackParamList> =
  NativeStackScreenProps<ProductsStackParamList, T>;

// 2. Stack navigator — src/navigation/stacks/ProductsStackNavigator.tsx
const Stack = createNativeStackNavigator<ProductsStackParamList>();

export default function ProductsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name={ProductsRoutes.ProductList} component={ProductsListView} />
      <Stack.Screen name={ProductsRoutes.ProductDetail} component={ProductDetailView} />
      <Stack.Screen name={ProductsRoutes.ProductForm} component={ProductFormView} />
    </Stack.Navigator>
  );
}

// 3. Typed navigation hook — src/navigation/hooks/useNavigation.ts
export const useNavigationProducts = useNavigation<
  NativeStackNavigationProp<ProductsStackParamList>
>;
```

### Root Navigator Pattern

```typescript
// src/navigation/RootNavigator.tsx
export enum RootRoutes {
  Examples = 'Examples',
  Products = 'Products',
  Users = 'Users',
}

export type RootStackParamList = {
  [RootRoutes.Examples]: NavigatorScreenParams<ExamplesStackParamList>;
  [RootRoutes.Products]: NavigatorScreenParams<ProductsStackParamList>;
  [RootRoutes.Users]: NavigatorScreenParams<UsersStackParamList>;
};

// Stack uses all nested navigators as screens
<Stack.Screen name={RootRoutes.Products} component={ProductsNavigator} />
```

### Screen Props Consumption

```typescript
// Detail screen — receives params with typed destructuring
export function ProductDetailView({
  route: { params: { productId } },
}: ProductsScreenProps<ProductsRoutes.ProductDetail>) {
  const { goBack, navigate } = useNavigationProducts();
  const { data: product } = useProduct(productId);
  // ...
}

// Form screen — optional params for create/edit mode
export function ProductFormView({
  route: { params },
  navigation: { goBack },
}: ProductsScreenProps<ProductsRoutes.ProductForm>) {
  const product = params?.product;
  const isEditing = !!product;
  // ...
}
```

### Barrel Export Pattern

```typescript
// src/navigation/routes/index.ts
export * from './products.routes';
export * from './examples.routes';
export * from './root.routes';
export * from './users.routes';

// src/navigation/hooks/index.ts
export * from './useNavigation';
```

### Adding a New Stack — Checklist

1. Create `src/navigation/routes/{feature}.routes.ts` — enum + ParamList + ScreenProps
2. Create `src/navigation/stacks/{Feature}StackNavigator.tsx` — Stack.Navigator with screens
3. Add typed hook to `src/navigation/hooks/useNavigation.ts`
4. Register in `src/navigation/routes/index.ts` barrel export
5. Add to `RootStackParamList` and `RootNavigator.tsx`

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `navigate('ProductDetail')` | String magic, no type check | `navigate(ProductsRoutes.ProductDetail, { productId })` |
| `{ product: fullObject }` to detail | Non-serializable risk, stale data | `{ productId: product.id }` — fetch fresh in detail |
| `component={() => <Screen />}` | Creates new component each render | `component={Screen}` (reference) |
| `useNavigation()` without type | No param autocomplete | `useNavigationProducts()` typed hook |
| Inline screen in Stack.Screen | Verbose, hard to test | Import at top, reference in JSX |

### NavigationProvider Theme Mapping

```typescript
// src/providers/NavigationProvider.tsx
const navigationTheme = {
  dark: mode === 'dark',
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.error,
  },
};
```

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Navigation audit |
| **Severity: error** | String literal route, untyped navigation, missing ParamList |
| **Severity: warning** | Missing ScreenProps type, full entity passed to detail screen |
| **Severity: info** | Could add deep linking config, could lazy-load screens |

## 6. Practical Example

### Before — Untyped navigation
```typescript
const ProductScreen = ({ navigation }) => {
  return (
    <Button onPress={() => navigation.navigate('Details', { user: { name: 'John' } })} />
  );
};
```

### After — Fully typed navigation
```typescript
// routes/products.routes.ts
export enum ProductsRoutes {
  ProductList = 'ProductList',
  ProductDetail = 'ProductDetail',
}

export type ProductsStackParamList = {
  [ProductsRoutes.ProductList]: undefined;
  [ProductsRoutes.ProductDetail]: { productId: string };
};

// Screen component with typed props
export function ProductsListView() {
  const { navigate } = useNavigationProducts();

  const handlePress = (id: string) => {
    navigate(ProductsRoutes.ProductDetail, { productId: id });
    // TypeScript catches: wrong route name, missing params, wrong param types
  };

  return <ProductList onItemPress={handlePress} />;
}
```

**Explanation**: Every route name is an enum value — no string magic. Params are typed at the ParamList level — TypeScript catches missing or wrong params at compile time. The typed navigation hook provides autocomplete for all routes in that stack.
