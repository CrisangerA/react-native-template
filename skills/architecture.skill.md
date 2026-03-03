# Architecture Skill — Clean Architecture Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `clean-architecture` |
| **Description** | Enforces the 4-layer Clean Architecture pattern per feature module, validating dependency direction, file placement, naming, and module isolation. |
| **Purpose** | Guarantee every feature respects domain-driven boundaries — enabling independent testability, infrastructure replaceability, and safe module deletion. |
| **Category** | Architecture |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Creating, modifying, or reviewing any file inside `src/modules/` |
| **Context** | New feature scaffolding, refactors, code reviews, PR audits |
| **Observed paths** | `src/modules/{feature}/domain/**`, `src/modules/{feature}/infrastructure/**`, `src/modules/{feature}/application/**`, `src/modules/{feature}/ui/**` |

## 3. Responsibilities

### Validates
- Every module contains exactly 4 layers: `domain/`, `infrastructure/`, `application/`, `ui/`
- Dependency direction is strictly: **UI → application → infrastructure → domain**
- Domain layer has **zero** external imports (no React, no Axios, no Firebase — only Zod is allowed)
- UI layer **never** imports directly from `infrastructure/`
- Application layer wraps infrastructure calls into React Query hooks
- Adapters live in `domain/` and transform between form data ↔ API payloads

### Recommends
- Shared domain utilities go to `src/modules/core/domain/` (e.g., `date.utils.ts`)
- Cross-cutting hooks go to `src/hooks/` (e.g., `useDebounce`)
- Feature-specific hooks stay in `src/modules/{feature}/application/`

### Prevents
- Circular dependencies between modules
- UI importing services directly (must go through `application/` hooks)
- Domain models importing from infrastructure
- Business logic in `*View.tsx` files (views are thin wrappers)
- Cross-module domain imports (modules communicate via shared `core` module only)

### Optimizes
- Module scaffolding speed via predictable patterns
- Feature deletion safety — a module can be `rm -rf`'d without cascade
- Team parallelism — developers work on isolated modules

## 4. Rules

### Required Module Structure

```
src/modules/{feature}/
├── domain/
│   ├── {feature}.model.ts        # Interfaces: {Feature}Entity, {Feature}Payload, {Feature}Response
│   ├── {feature}.repository.ts   # Interface: {Feature}Repository (contract for infrastructure)
│   ├── {feature}.scheme.ts       # Zod schema + z.infer<typeof schema> type export
│   ├── {feature}.adapter.ts      # Pure functions: formToPayloadAdapter, responseToEntityAdapter
│   └── {feature}.utils.ts        # Optional: pure domain utilities
├── infrastructure/
│   ├── {feature}.service.ts      # Factory: reads CONFIG.SERVICE_PROVIDER, returns repository
│   ├── {feature}.http.service.ts # HTTP implementation via axiosService
│   └── {feature}.firebase.service.ts  # Firebase implementation via firestoreService
├── application/
│   ├── {feature}.queries.ts      # useQuery hooks: use{Feature}s(), use{Feature}(id)
│   └── {feature}.mutations.ts    # useMutation hooks: use{Feature}Create/Update/Delete()
└── ui/
    ├── {Feature}ListView.tsx      # List screen (Header + List component)
    ├── {Feature}DetailView.tsx    # Detail screen (receives ID via route params)
    ├── {Feature}FormView.tsx      # Form screen (create/edit mode via optional product param)
    └── components/
        ├── {Feature}List.tsx      # FlashList + loading/error/empty state guards
        ├── {Feature}Item.tsx      # React.memo'd list item with staggered animation
        └── {Feature}Form.tsx      # react-hook-form + zodResolver + controlled inputs
```

### Layer Import Rules

| From \ To | domain | infrastructure | application | ui |
|---|---|---|---|---|
| **domain** | self only | --- | --- | --- |
| **infrastructure** | domain | self + external libs | --- | --- |
| **application** | domain (types) | infrastructure (service) | self | --- |
| **ui** | domain (types only) | --- | application (hooks) | self + @components + @theme |

### Naming Conventions (Validated From Codebase)

| Element | Convention | Real Example |
|---|---|---|
| Entity interfaces | PascalCase + `Entity` | `ProductEntity`, `UserEntity` |
| API payload types | PascalCase + `Payload` | `SignUpPayload`, `CreateProductPayload` |
| Repository interfaces | PascalCase + `Repository` | `ProductRepository`, `AuthRepository` |
| Service classes | PascalCase + `Service` | `ProductHttpService`, `FirebaseAuthService` |
| Factory functions | `create` + Service name | `createProductService()`, `createAuthService()` |
| Factory default export | `export default createXService()` | Singleton pattern |
| Zod schemas | camelCase + `Schema` | `productSchema`, `registerSchema` |
| Inferred form types | PascalCase + `FormData` | `ProductFormData`, `RegisterFormData` |
| Adapter functions | descriptive + `Adapter` | `productFormToPayloadAdapter()` |
| Query hooks | `use` + Entity (singular/plural) | `useProducts()`, `useProduct(id)` |
| Mutation hooks | `use` + Entity + Action | `useProductCreate()`, `useProductDelete()` |
| View components | PascalCase + `View` | `ProductsListView`, `ProductDetailView` |

### Prohibited Anti-patterns

| Anti-pattern | Violation | Correct Approach |
|---|---|---|
| `import axiosService` in UI file | Layer boundary | Use `application/` query/mutation hook |
| `throw new Error()` in service | Error contract | Return `T \| Error` |
| Data transformation in `*View.tsx` | Business logic leak | Use adapter in `domain/` |
| `useState` + `useEffect` for API calls | Manual sync | Use `useQuery` in `application/` |
| Cross-module domain imports | Module coupling | Use shared `core/domain/` |
| Business logic in `renderItem` | View layer leak | Extract to item component |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Structural validation with file-level diagnostics |
| **Severity: error** | Layer violation, missing required file, wrong import direction |
| **Severity: warning** | Naming deviation, missing adapter, business logic in view |
| **Severity: info** | Optimization opportunity, shared code extraction suggestion |

### Correction Examples

**ERROR — UI imports from infrastructure:**
```typescript
// ❌ src/modules/products/ui/ProductsListView.tsx
import productService from '../infrastructure/product.service';
const data = await productService.getAll();

// ✅ Use application hook
import { useProducts } from '../application/product.queries';
const { data } = useProducts();
```

**ERROR — Service throws instead of returning Error:**
```typescript
// ❌
async getAll(): Promise<ProductEntity[]> {
  try { ... }
  catch (error) { throw new Error('Failed'); }
}

// ✅ Return T | Error
async getAll(): Promise<ProductEntity[] | Error> {
  try { ... }
  catch (error) { return manageAxiosError(error); }
}
```

## 6. Practical Example

### Before — Monolithic screen
```typescript
// src/screens/ProductScreen.tsx
import axios from 'axios';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/products').then(r => setProducts(r.data));
  }, []);
  return <FlatList data={products} renderItem={({item}) => <Text>{item.name}</Text>} />;
}
```

### After — Clean Architecture (actual project pattern)
```typescript
// domain/product.repository.ts
export interface ProductRepository {
  getAll(params?: { searchText?: string }): Promise<ProductEntity[] | Error>;
  getById(id: string): Promise<ProductEntity | Error>;
  create(data: CreateProductPayload): Promise<ProductEntity | Error>;
  update(id: string, data: UpdateProductPayload): Promise<ProductEntity | Error>;
  delete(id: string): Promise<void | Error>;
}

// infrastructure/product.service.ts — factory selects provider
function createProductService(): ProductRepository {
  switch (CONFIG.SERVICE_PROVIDER) {
    case 'http': return productHttpService;
    case 'firebase': return productFirebaseService;
    default: throw new Error(`Unknown provider: ${CONFIG.SERVICE_PROVIDER}`);
  }
}
export default createProductService();

// application/product.queries.ts — React Query wrapper
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

// ui/ProductsListView.tsx — thin view
export function ProductsListView() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  return (
    <RootLayout scroll={false} toolbar={false}>
      <Header title="Productos" searchText={searchText} setSearchText={setSearchText} />
      <ProductList searchText={debouncedSearch} />
    </RootLayout>
  );
}
```

**Explanation**: Each layer has a single responsibility. Domain defines the contract. Infrastructure implements it (swappable HTTP↔Firebase). Application bridges with React Query. UI renders with zero business logic. Any provider can be swapped without touching UI, domain, or application layers.
