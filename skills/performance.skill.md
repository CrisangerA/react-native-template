# Performance Skill — Optimization Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `performance-optimization` |
| **Description** | Enforces FlashList over FlatList, React.memo for list items, search debouncing, focus-based animations, stable render functions, and React Query caching patterns. |
| **Purpose** | Maintain 60 FPS UI performance, minimize unnecessary re-renders, and optimize memory usage in list-heavy mobile screens. |
| **Category** | Performance, Quality, UX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Implementing lists, adding animations, optimizing renders, handling search |
| **Context** | List components, animation hooks, memoization, image loading |
| **Observed paths** | `*List.tsx`, `*Item.tsx`, `src/theme/hooks/`, any file with `FlashList` or `Animated` |

## 3. Responsibilities

### Validates
- FlashList used instead of FlatList for all list rendering
- `renderItem` defined outside component body (stable reference)
- List items wrapped in `React.memo`
- Search inputs debounced with `useDebounce(value, 500)`
- Animations use `useFocusFadeIn`/`useFocusSlideIn` hooks (focus-based, not mount-based)
- `keyExtractor` uses entity ID, never array index
- `StyleSheet.create()` at file bottom (not inline objects)

### Recommends
- Staggered animations: `delay: index * 100` for list items
- `useNativeDriver: true` for all opacity/transform animations
- `keyboardShouldPersistTaps="handled"` on scrollable lists
- `showsVerticalScrollIndicator={false}` for cleaner UX

### Prevents
- `FlatList` usage (always use `FlashList`)
- Anonymous functions in `renderItem` prop
- Inline style objects in render (re-created every render)
- `useEffect` for animations (use focus-based hooks)
- Missing `React.memo` on list item components
- Index-based `keyExtractor`

## 4. Rules

### List Rendering Pattern (from codebase)

```typescript
// src/modules/products/ui/components/ProductList.tsx
import { FlashList, ListRenderItem } from '@shopify/flash-list';

// ✅ renderItem defined OUTSIDE component body — stable reference
const renderProductItem: ListRenderItem<ProductEntity> = ({ item, index }) => (
  <ProductItem product={item} index={index} />
);

export function ProductList({ searchText }: { searchText: string }) {
  const { data: products, isLoading, isError, error } = useProducts({ searchText });

  // Guard chain (loading → error → empty → success)
  if (isLoading) return <LoadingState message="Cargando productos..." />;
  if (isError) return <ErrorState title="Error" message={error?.message} />;
  if (!products?.length) return <EmptyState title="Sin productos" />;

  return (
    <FlashList
      data={products}
      keyExtractor={item => item.id}       // Entity ID, not index
      renderItem={renderProductItem}        // Stable reference
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}
```

### List Item Pattern (from codebase)

```typescript
// src/modules/products/ui/components/ProductItem.tsx
export const ProductItem = React.memo(function ProductItem({
  product,
  index,
}: ProductItemProps) {
  const { navigate } = useNavigationProducts();
  const { animatedStyle } = useFocusFadeIn({
    delay: index * 100,                    // Staggered animation
    duration: ANIMATION_DURATION.normal,
  });

  return (
    <Animated.View style={animatedStyle}>
      <Card onPress={() => navigate(ProductsRoutes.ProductDetail, { productId: product.id })}>
        <View style={styles.info}>
          <Text variant="h3">{product.name}</Text>
          {product.description ? <Text variant="body">{product.description}</Text> : null}
          <Text variant="caption" color="primary">${product.price.toFixed(2)}</Text>
        </View>
      </Card>
    </Animated.View>
  );
});
```

### Search Debouncing Pattern (from codebase)

```typescript
// src/modules/products/ui/ProductsListView.tsx
export function ProductsListView() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);  // 500ms debounce

  return (
    <RootLayout scroll={false} toolbar={false}>
      <Header title="Productos" searchText={searchText} setSearchText={setSearchText} />
      <ProductList searchText={debouncedSearch} />  {/* Debounced value triggers query */}
    </RootLayout>
  );
}

// src/modules/core/application/core.hooks.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
```

### Animation Performance Patterns

```typescript
// Focus-based animation (replays on screen focus, not just mount)
import { useFocusFadeIn } from '@theme/hooks';

const { animatedStyle } = useFocusFadeIn({
  duration: ANIMATION_DURATION.slow,  // Use constants, not raw numbers
  offset: 20,
  delay: 300,
});

// List item stagger pattern
const { animatedStyle } = useFocusFadeIn({
  delay: index * 100,  // Each item appears 100ms after previous
  duration: ANIMATION_DURATION.normal,
});

// Native driver for opacity/transform animations
Animated.timing(opacity, {
  toValue: 1,
  duration: 400,
  useNativeDriver: true,  // ALWAYS true for opacity/transform
});
```

### Conditional Rendering Pattern

```typescript
// ✅ Ternary with null for conditional rendering (prevents falsy && issues)
{product.description ? <Text variant="body">{product.description}</Text> : null}

// ❌ NEVER use falsy && with non-boolean values
{product.count && <Text>{product.count}</Text>}  // Renders "0" if count is 0
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `<FlatList>` | Slower than FlashList | `<FlashList>` |
| `renderItem={({ item }) => <Item />}` | New function every render | Extract outside component |
| `keyExtractor={(_, index) => index}` | Breaks reorder/delete | `keyExtractor={item => item.id}` |
| `style={{ padding: 16 }}` in render | New object every render | `StyleSheet.create()` |
| `useEffect(() => animate())` | Doesn't replay on focus | `useFocusFadeIn()` hook |
| Missing `React.memo` on list item | Re-renders all items on any change | Wrap with `React.memo` |
| `{count && <Text />}` | Renders `0` when falsy | `{count ? <Text /> : null}` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Performance audit |
| **Severity: error** | FlatList used, inline renderItem, missing React.memo on list item |
| **Severity: warning** | Missing debounce on search, inline styles, index keyExtractor |
| **Severity: info** | Could add estimatedItemSize, could extract animation hook |

## 6. Practical Example

### Before — Slow list rendering
```typescript
const ProductList = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={{ padding: 16, marginBottom: 8 }}>
        <Text>{item.name}</Text>
      </View>
    )}
    keyExtractor={(_, index) => String(index)}
  />
);
```

### After — Optimized list rendering (actual project pattern)
```typescript
const renderProductItem: ListRenderItem<ProductEntity> = ({ item, index }) => (
  <ProductItem product={item} index={index} />
);

export function ProductList({ searchText }: ProductListProps) {
  const { data: products, isLoading, isError } = useProducts({ searchText });

  if (isLoading) return <LoadingState message="Cargando..." />;
  if (isError) return <ErrorState />;
  if (!products?.length) return <EmptyState />;

  return (
    <FlashList
      data={products}
      keyExtractor={item => item.id}
      renderItem={renderProductItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

// Memoized item with staggered animation
export const ProductItem = React.memo(function ProductItem({ product, index }) {
  const { animatedStyle } = useFocusFadeIn({ delay: index * 100 });
  return (
    <Animated.View style={animatedStyle}>
      <Card onPress={() => navigate(ProductsRoutes.ProductDetail, { productId: product.id })}>
        <Text variant="h3">{product.name}</Text>
      </Card>
    </Animated.View>
  );
});
```

**Explanation**: FlashList replaces FlatList for better performance. `renderItem` is stable (defined outside). Items are `React.memo`'d with staggered fade-in animations. Search is debounced at 500ms. Guard chain prevents rendering empty/error states as list data.
