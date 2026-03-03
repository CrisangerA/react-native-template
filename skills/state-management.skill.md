# State Management Skill — State Strategy Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `state-management` |
| **Description** | Enforces the correct tool for each type of state: TanStack React Query for server data, Zustand for global client state, Zustand + MMKV for persistent state, react-hook-form for forms, and `useState` for ephemeral UI. |
| **Purpose** | Eliminate accidental complexity from manual data synchronization, prevent state management sprawl, and ensure predictable data flow. |
| **Category** | Architecture, Performance, DX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Adding state logic, creating stores, integrating API data, managing global UI state |
| **Context** | Any file using `useState`, `useEffect`, `useQuery`, `useMutation`, `create()` (Zustand) |
| **Observed paths** | `src/modules/*/application/`, `src/modules/*/infrastructure/*.storage.ts`, `src/theme/providers/theme.storage.ts` |

## 3. Responsibilities

### Validates
- Server data uses React Query (never `useState` + `useEffect`)
- Global ephemeral UI state uses Zustand without persistence (toast, modal)
- Persistent client state uses Zustand + MMKV (theme mode)
- Form state uses react-hook-form (never manual `useState` per field)
- Local UI state uses `useState` only for truly ephemeral concerns

### Recommends
- Zustand selectors for granular subscriptions: `useAppStorage(s => s.toast)`
- Query key pattern: `['{entities}']` for lists, `['{entities}', 'detail', id]` for details
- Cache invalidation in mutation `onSuccess` callbacks

### Prevents
- `useEffect` → `fetch` → `setState` pattern (use `useQuery`)
- Storing server data in Zustand/Context
- Props drilling more than 2 levels (use Zustand or query hooks)
- Multiple `useState` calls for form fields (use `useForm`)

## 4. Rules

### State Decision Matrix

| State Type | Tool | Location | Example |
|---|---|---|---|
| **Server data** (API/DB) | TanStack React Query | `application/*.queries.ts` | Product list, user details |
| **Server mutations** | TanStack React Query | `application/*.mutations.ts` | Create/update/delete product |
| **Global UI (ephemeral)** | Zustand (no persistence) | `infrastructure/app.storage.ts` | Toast, delete confirmation modal |
| **Global UI (persistent)** | Zustand + MMKV | `theme/providers/theme.storage.ts` | Theme mode (light/dark) |
| **Form state** | react-hook-form + Zod | `ui/components/*Form.tsx` | Product form, sign-in form |
| **Local UI (ephemeral)** | `useState` | Component file | Search text, expanded toggle |

### React Query Patterns (from codebase)

```typescript
// Queries — src/modules/products/application/product.queries.ts
export function useProducts(params?: { searchText?: string }) {
  return useQuery({
    queryKey: ['products', params],  // Includes params for cache partitioning
    queryFn: async () => {
      const result = await productService.getAll(params);
      if (result instanceof Error) throw result;
      return result;
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', 'detail', id],  // Nested key for detail
    queryFn: async () => {
      const result = await productService.getById(id);
      if (result instanceof Error) throw result;
      return result;
    },
  });
}

// Mutations — invalidate related queries on success
export function useProductCreate() {
  const queryClient = useQueryClient();
  const { show } = useAppStorage(s => s.toast);

  return useMutation({
    mutationFn: async (data: CreateProductPayload) => {
      const result = await productService.create(data);
      if (result instanceof Error) throw result;
      return result;
    },
    onSuccess: () => {
      show({ message: 'Producto creado exitosamente', type: 'success', position: 'bottom' });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

### Zustand Patterns (from codebase)

```typescript
// Ephemeral global UI state — src/modules/core/infrastructure/app.storage.ts
export const useAppStorage = create<State>()(set => ({
  modal: {
    visible: false,
    entityName: '',
    entityType: '',
    onConfirm: null,
    open: ({ entityName, entityType, onConfirm }) =>
      set(state => ({ modal: { ...state.modal, visible: true, entityName, entityType, onConfirm } })),
    close: () =>
      set(state => ({ modal: { ...state.modal, visible: false, entityName: '', entityType: '', onConfirm: null } })),
  },
  toast: {
    visible: false,
    message: '',
    type: 'info',
    show: ({ message, type, duration, position }) =>
      set(state => ({ toast: { ...state.toast, visible: true, message, type, duration, position } })),
    hide: () =>
      set(state => ({ toast: { ...state.toast, visible: false } })),
  },
}));

// Persistent state — src/theme/providers/theme.storage.ts
export const useThemeStorage = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      setTheme: (mode) => set({ mode }),
    }),
    { name: 'theme-storage', storage: createJSONStorage(() => mmkvStorage) }
  )
);
```

### MMKV Storage Configuration (from codebase)

```typescript
// src/config/storage.ts — custom Date reviver for JSON parsing
import { MMKV } from 'react-native-mmkv';
const mmkv = new MMKV();

// Custom StateStorage for Zustand persist middleware
export const mmkvStorage = {
  getItem: (name: string) => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string) => mmkv.set(name, value),
  removeItem: (name: string) => mmkv.delete(name),
};
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `useEffect` + `fetch` + `setState` | Manual sync, no cache, no loading/error | `useQuery` in application layer |
| Server data in Zustand store | Duplicates cache, manual invalidation | React Query manages server data |
| `useState` for each form field | Verbose, no validation, no error state | `useForm` with Zod resolver |
| `useContext` for global state | Re-renders entire tree | Zustand with selectors |
| Props drilling callbacks 3+ levels | Fragile, hard to trace | Zustand store or query hook |
| `AsyncStorage` for persistence | Slower, no encryption | MMKV via `react-native-mmkv` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | State strategy audit |
| **Severity: error** | Server data in Zustand, `useEffect`+`fetch` pattern, missing query invalidation |
| **Severity: warning** | Missing Zustand selector (subscribing to entire store), excessive `useState` |
| **Severity: info** | Could add `staleTime` to query, could memoize selector |

## 6. Practical Example

### Before — Manual sync with useState + useEffect
```typescript
// ❌ Manual state management for server data
export function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getAll()
      .then(data => setProducts(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  return <FlatList data={products} />;
}
```

### After — React Query + Zustand (actual project pattern)
```typescript
// ✅ Server state via React Query
// application/product.queries.ts
export function useProducts(params?: { searchText?: string }) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const result = await productService.getAll(params);
      if (result instanceof Error) throw result;
      return result;
    },
  });
}

// ✅ Global UI state via Zustand (toast notifications)
// infrastructure/app.storage.ts
const { show } = useAppStorage(s => s.toast);
show({ message: 'Producto creado', type: 'success', position: 'bottom' });

// ✅ Thin UI layer consumes both
export function ProductList({ searchText }: { searchText: string }) {
  const { data: products, isLoading, isError, error } = useProducts({ searchText });

  if (isLoading) return <LoadingState message="Cargando productos..." />;
  if (isError) return <ErrorState title="Error" message={error?.message} />;
  if (!products?.length) return <EmptyState title="Sin productos" />;

  return <FlashList data={products} renderItem={renderProductItem} />;
}
```

**Explanation**: React Query handles caching, loading states, error states, and background refetching automatically. Zustand handles ephemeral global UI (toasts, modals) with granular selectors that prevent unnecessary re-renders. The UI layer just reads and renders — zero data management logic.
