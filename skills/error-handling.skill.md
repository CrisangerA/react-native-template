# Error Handling Skill — Error Strategy Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `error-handling` |
| **Description** | Enforces the centralized error strategy across service, application, and UI layers: `T \| Error` returns in services, `instanceof Error` checks in mutations, and guard-order rendering in views. |
| **Purpose** | Ensure consistent, user-friendly error handling with Spanish messages, typed error names, and predictable UI state transitions. |
| **Category** | Quality, UX, Architecture |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Implementing try/catch blocks, creating error messages, handling API failures, rendering loading/error states |
| **Context** | `src/modules/network/domain/network.error.ts`, `src/modules/firebase/domain/firebase.error.ts`, any service/mutation/view file |
| **Observed paths** | `*.service.ts`, `*.mutations.ts`, `*.queries.ts`, `*View.tsx`, `*List.tsx` |

## 3. Responsibilities

### Validates
- Services return `T | Error` (never throw)
- Application hooks check `result instanceof Error` before returning
- UI views render states in order: `loading → error → empty → success`
- Error messages are in Spanish and user-friendly (no technical details)
- Typed error names used for specific error handling (`FormError`, `DuplicateIdentifierError`)

### Recommends
- Use `ErrorState` component for error screens
- Use `LoadingState` component for loading screens
- Use `EmptyState` component for empty data screens
- Toast notifications for mutation success/failure

### Prevents
- Unhandled promise rejections in services
- Technical error messages shown to users
- Missing loading/error state guards in views
- Swallowed errors (catch with no action)

## 4. Rules

### Error Flow Architecture

```
Infrastructure (service)          Application (hook)              UI (view)
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│ try {                │    │ queryFn: async () => {│    │ const { data,       │
│   const r = await..  │    │   const r = await svc │    │   isLoading, isError │
│   return r.data      │    │   if (r instanceof    │    │ } = useProducts();  │
│ } catch (error) {    │    │     Error) throw r    │    │                     │
│   return manageError │    │   return r            │    │ if (isLoading) →    │
│ }                    │    │ }                     │    │   <LoadingState />  │
│                      │    │                       │    │ if (isError) →      │
│ Returns: T | Error   │    │ Throws: for RQ        │    │   <ErrorState />    │
└─────────────────────┘    └──────────────────────┘    │ if (!data) →        │
                                                        │   <EmptyState />    │
                                                        │ return <Data />     │
                                                        └─────────────────────┘
```

### Centralized Error Handlers

```typescript
// src/modules/network/domain/network.error.ts
export function manageAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    if (error.code?.includes('ERR_NETWORK'))
      return new Error(AXIOS_MESSAGES.NETWORK_ERROR);
    if (error.code?.includes('ECONNREFUSED'))
      return new Error(AXIOS_MESSAGES.CONNECTION_REFUSED);
    if (error.status === 400) {
      if (error.response?.data?.errors) {
        const e = new Error(JSON.stringify(error.response.data.errors));
        e.name = 'FormError';  // Typed error name
        return e;
      }
      if (error.response?.data?.message?.includes('Duplicate identifier')) {
        const e = new Error(error.response.data.message);
        e.name = 'DuplicateIdentifierError';
        return e;
      }
      return new Error(AXIOS_MESSAGES.BAD_REQUEST);
    }
    if (error.response?.data?.message)
      return new Error(error.response.data.message);
    return new Error(error.message + ' - ' + error.code);
  }
  if (error instanceof Error) return error;
  return new Error(AXIOS_MESSAGES.UNKNOWN_ERROR);
}
```

### Error Messages (Spanish)

```typescript
// src/modules/network/domain/network.messages.ts
export const AXIOS_MESSAGES = {
  NETWORK_ERROR: 'No pudimos conectar con el servidor. Revisa tu conexión a internet.',
  CONNECTION_REFUSED: 'El servicio no está disponible en este momento. Por favor, vuelve a intentarlo más tarde.',
  UNKNOWN_ERROR: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
  BAD_REQUEST: 'Solicitud incorrecta. Por favor, verifica los datos ingresados.',
};
```

### UI Guard Order Pattern (mandatory)

```typescript
// Every view that consumes async data MUST follow this order:
export function ProductDetailView({ route: { params: { productId } } }) {
  const { data: product, isLoading, isError, error } = useProduct(productId);

  // 1. Loading guard
  if (isLoading) {
    return <LoadingState message="Cargando producto..." />;
  }

  // 2. Error guard
  if (isError) {
    return (
      <ErrorState
        title="Error al cargar"
        message={error?.message || 'No se pudo cargar el producto'}
        onRetry={goBack}
        retryLabel="Volver"
      />
    );
  }

  // 3. Empty guard
  if (!product) {
    return (
      <EmptyState
        title="Producto no encontrado"
        message="El producto que buscas no existe o fue eliminado"
        icon="📦"
        onAction={goBack}
        actionLabel="Volver"
      />
    );
  }

  // 4. Success render
  return <View>...</View>;
}
```

### Mutation Error Pattern with Toast

```typescript
// application/product.mutations.ts
export function useProductCreate() {
  const { show } = useAppStorage(s => s.toast);

  return useMutation({
    mutationFn: async (data) => {
      const result = await productService.create(data);
      if (result instanceof Error) throw result;  // Convert to throw for React Query
      return result;
    },
    onSuccess: () => {
      show({ message: 'Producto creado exitosamente', type: 'success', position: 'bottom' });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    // onError is handled by React Query default behavior
  });
}
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `throw new Error()` in service | Breaks `T \| Error` contract | `return manageAxiosError(error)` |
| `catch (e) { console.log(e) }` | Swallowed error | Return or throw error |
| Error message in English | Project standard is Spanish | Spanish user-facing messages |
| Technical error shown to user | Confusing UX | User-friendly message via error handler |
| Missing loading guard in view | Flash of empty content | Check `isLoading` first |
| `error → empty → loading` order | Wrong guard sequence | `loading → error → empty → success` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Error handling audit |
| **Severity: error** | Service throws, missing guards in view, swallowed error |
| **Severity: warning** | English error message, missing toast on mutation success |
| **Severity: info** | Could add retry logic, could improve error boundary |

## 6. Practical Example

### Before — Inconsistent error handling
```typescript
// Service throws
async getAll() {
  const res = await axios.get('/products');
  return res.data;
  // No try/catch — unhandled rejection on network error
}

// View has no guards
function ProductList() {
  const { data } = useQuery(['products'], fetchProducts);
  return <FlatList data={data} />; // Crashes if data is undefined
}
```

### After — Proper error flow
```typescript
// Service returns T | Error
async getAll(): Promise<ProductEntity[] | Error> {
  try {
    const response = await axiosService.get<ProductEntity[]>(API_ROUTES.PRODUCTS);
    return response.data;
  } catch (error) {
    return manageAxiosError(error);
  }
}

// View has full guard chain
function ProductList({ searchText }) {
  const { data: products, isLoading, isError, error } = useProducts({ searchText });

  if (isLoading) return <LoadingState message="Cargando productos..." />;
  if (isError) return <ErrorState title="Error al cargar" message={error?.message} />;
  if (!products?.length) return <EmptyState title="Sin productos" icon="📦" />;

  return <FlashList data={products} renderItem={renderProductItem} />;
}
```

**Explanation**: Errors flow predictably from infrastructure → application → UI. Services never throw (return `Error` objects). Application hooks convert to throws for React Query. Views check states in strict order. Users always see Spanish, human-friendly messages — never technical details.
