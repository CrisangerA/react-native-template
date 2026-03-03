# API Layer Skill — Service & Networking Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `api-layer` |
| **Description** | Enforces the dual-provider service architecture (HTTP + Firebase), factory pattern, `T \| Error` return contract, adapter-based data transformation, and centralized error handling. |
| **Purpose** | Abstract infrastructure implementations behind repository interfaces so providers can be swapped with zero changes to domain, application, or UI layers. |
| **Category** | Architecture, Networking |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Creating services, integrating API endpoints, switching providers, handling network errors |
| **Context** | `src/modules/*/infrastructure/*.service.ts`, `src/modules/network/`, `src/config/api.routes.ts` |
| **Observed paths** | `src/modules/{feature}/infrastructure/`, `src/modules/network/domain/network.error.ts` |

## 3. Responsibilities

### Validates
- Every service class implements a repository interface from `domain/`
- Services return `Promise<T | Error>`, never throw exceptions
- Factory function reads `CONFIG.SERVICE_PROVIDER` to select implementation
- Error handling uses centralized `manageAxiosError()` or `manageFirebaseError()`
- Adapters transform between API data format ↔ domain entity format
- API route constants are centralized in `src/config/api.routes.ts`

### Recommends
- Use `axiosService` singleton (not raw `axios`) for all HTTP calls
- Define Firestore collection names in `src/config/collections.routes.ts`
- Keep adapter functions pure and testable (no side effects)

### Prevents
- Raw `axios` or `fetch` calls outside `infrastructure/`
- Throwing exceptions from service methods
- Returning `AxiosResponse` directly to application layer
- Hardcoded URLs in service files
- Missing error handling in try/catch blocks

### Optimizes
- Provider switching speed (HTTP↔Firebase is a config change)
- Error message consistency via centralized error handlers
- API response caching via React Query integration

## 4. Rules

### Service Architecture Pattern (3-file system)

```typescript
// 1. {feature}.http.service.ts — HTTP implementation
class ProductHttpService implements ProductRepository {
  async getAll(params?: { searchText?: string }): Promise<ProductEntity[] | Error> {
    try {
      const response = await axiosService.get<ProductEntity[]>(
        API_ROUTES.PRODUCTS, { params }
      );
      return response.data;
    } catch (error) {
      return manageAxiosError(error);  // NEVER throw
    }
  }
}
function createProductHttpService(): ProductRepository {
  return new ProductHttpService();
}
export default createProductHttpService();

// 2. {feature}.firebase.service.ts — Firebase implementation
class ProductFirebaseService implements ProductRepository {
  async getAll(params?: { searchText?: string }): Promise<ProductEntity[] | Error> {
    const result = await firestoreService.list<ProductModel>({
      collection: COLLECTION_ROUTES.PRODUCTS,
    });
    if (result instanceof Error) return result;
    return result.docs.map(doc => productResponseAdapter(doc));
  }
}
function createProductFirebaseService(): ProductRepository {
  return new ProductFirebaseService();
}
export default createProductFirebaseService();

// 3. {feature}.service.ts — Factory (default export is singleton)
function createProductService(): ProductRepository {
  switch (CONFIG.SERVICE_PROVIDER) {
    case 'http': return productHttpService;
    case 'firebase': return productFirebaseService;
    default: throw new Error(`Unknown provider: ${CONFIG.SERVICE_PROVIDER}`);
  }
}
export default createProductService();
```

### Error Contract: `T | Error`

| Layer | Behavior |
|---|---|
| **Infrastructure** (service) | Catches all exceptions → returns `Error` object |
| **Application** (mutation hook) | Checks `result instanceof Error` → throws for React Query |
| **Application** (query hook) | Checks `result instanceof Error` → throws for React Query |
| **UI** (view) | Reads `isLoading`, `isError`, `error` from hook — never catches |

### Centralized Error Handlers

```typescript
// src/modules/network/domain/network.error.ts
export function manageAxiosError(error: unknown): Error {
  // Handles: ERR_NETWORK, ECONNREFUSED, 400 (FormError, DuplicateIdentifierError),
  //          response.data.message, fallback to UNKNOWN_ERROR
}

// src/modules/firebase/domain/firebase.error.ts
export function manageFirebaseError(error: unknown): Error {
  // Maps Firebase error codes to Spanish error messages
}
```

### Typed Error Names
| Error name | When | Example message |
|---|---|---|
| `FormError` | 400 with `errors` array | Serialized field validation errors |
| `DuplicateIdentifierError` | 400 with "Duplicate identifier" | `"Duplicate identifier: email"` |
| `Error` (generic) | Network, timeout, unknown | Spanish user-facing message |

### API Route Centralization

```typescript
// src/config/api.routes.ts — all endpoints here
export const API_ROUTES = {
  ROOT: 'https://api.example.com',
  PRODUCTS: '/products',
  USERS: '/users',
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
};

// src/config/collections.routes.ts — Firestore collections
export const COLLECTION_ROUTES = {
  PRODUCTS: 'products',
  USERS: 'users',
};
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `throw error` in service | Breaks `T \| Error` contract | `return manageAxiosError(error)` |
| Raw `axios.get()` in service | Bypasses configured singleton | `axiosService.get()` |
| Hardcoded URL in service | Not centralized | Use `API_ROUTES.ENDPOINT` |
| Return `AxiosResponse` from service | Leaks infrastructure | Return `response.data` |
| Missing `try/catch` in service method | Unhandled promise rejection | Always wrap in try/catch |
| `fetchData` as function name | Non-descriptive | Use CRUD verbs: `getAll`, `getById`, `create`, `update`, `delete` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Service implementation audit |
| **Severity: error** | Missing repository interface, throwing instead of returning Error, raw axios call |
| **Severity: warning** | Hardcoded URL, missing adapter, inconsistent error handler |
| **Severity: info** | Could add Firestore query optimization, missing collection index |

## 6. Practical Example

### Before — Tightly coupled service
```typescript
// ❌ No repository interface, throws, hardcoded URL, returns raw response
export async function getProducts() {
  const res = await axios.get('https://api.example.com/products');
  return res; // AxiosResponse leaked to caller
}
```

### After — Proper service architecture
```typescript
// domain/product.repository.ts
export interface ProductRepository {
  getAll(params?: { searchText?: string }): Promise<ProductEntity[] | Error>;
  getById(id: string): Promise<ProductEntity | Error>;
  create(data: CreateProductPayload): Promise<ProductEntity | Error>;
  update(id: string, data: UpdateProductPayload): Promise<ProductEntity | Error>;
  delete(id: string): Promise<void | Error>;
}

// infrastructure/product.http.service.ts
class ProductHttpService implements ProductRepository {
  async getAll(params?: { searchText?: string }): Promise<ProductEntity[] | Error> {
    try {
      const response = await axiosService.get<ProductEntity[]>(
        API_ROUTES.PRODUCTS, { params }
      );
      return response.data;
    } catch (error) {
      return manageAxiosError(error);
    }
  }
  // ... other CRUD methods
}
function createProductHttpService(): ProductRepository {
  return new ProductHttpService();
}
export default createProductHttpService();

// application/product.mutations.ts — converts Error to throw for React Query
export function useProductCreate() {
  const queryClient = useQueryClient();
  const { show } = useAppStorage(s => s.toast);

  return useMutation({
    mutationFn: async (data: CreateProductPayload) => {
      const result = await productService.create(data);
      if (result instanceof Error) throw result;  // React Query catches this
      return result;
    },
    onSuccess: () => {
      show({ message: 'Producto creado exitosamente', type: 'success', position: 'bottom' });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

**Explanation**: The repository interface defines the contract. The HTTP service implements it with `T | Error` returns. The factory selects the right implementation. The mutation hook bridges the `T | Error` pattern to React Query's throw-based error model. Switching from HTTP to Firebase requires only changing `CONFIG.SERVICE_PROVIDER` — zero code changes elsewhere.
