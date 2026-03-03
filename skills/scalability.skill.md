# Scalability Skill — Scalability Patterns Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `scalability-patterns` |
| **Description** | Enforces provider composition order, module isolation, configuration centralization, cross-cutting concern placement, and new-feature bootstrapping patterns. |
| **Purpose** | Ensure the template scales to large apps with many modules, many developers, and multiple service providers without architectural degradation. |
| **Category** | Architecture, DX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Adding new modules, creating providers, configuring services, adding shared utilities |
| **Context** | `src/providers/`, `src/config/`, `src/hooks/`, `src/modules/core/`, new module creation |
| **Observed paths** | `src/providers/AppProvider.tsx`, `src/config/config.ts`, `src/hooks/`, `src/modules/` |

## 3. Responsibilities

### Validates
- Provider composition follows the prescribed order
- Service factory reads from centralized `CONFIG` object
- Modules are independently removable (no cross-module domain imports)
- Cross-cutting hooks live in `src/hooks/`, feature hooks in `application/`
- New modules follow the complete 4-layer structure
- Adding a new provider requires zero changes to existing domain/application/UI

### Recommends
- Use the dual-provider pattern for all data services (HTTP + Firebase)
- Centralize all configuration in `src/config/`
- Use `src/modules/core/` for shared infrastructure (storage, global state)

### Prevents
- Cross-module domain imports (module A's domain importing from module B's domain)
- Provider order violations (security must be outermost)
- God modules with mixed responsibilities
- Configuration scattered across multiple files
- Shared state in places other than `core` module

## 4. Rules

### Provider Composition Order

```typescript
// src/providers/AppProvider.tsx — strict order
SecureProvider          // 1. Security (blocks compromised devices)
  → QueryClientProvider // 2. Server state management
    → ThemeProvider      // 3. Theme context
      → SafeAreaProvider // 4. Safe area insets
        → GestureHandlerRootView // 5. Gesture system
          → NavigationProvider    // 6. Navigation (uses theme)
            → {children}
            → GlobalDeleteConfirmation  // Global UI overlays
            → GlobalToast
```

### Configuration Centralization

```typescript
// src/config/config.ts — single source of truth
interface AppConfig {
  SERVICE_PROVIDER: 'http' | 'firebase';
}
export const CONFIG: AppConfig = {
  SERVICE_PROVIDER: 'firebase',  // Change here → all services switch
};

// src/config/api.routes.ts — HTTP endpoints
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

// src/config/storage.ts — MMKV configuration
```

### Module Independence Rules

```
✅ Allowed imports:
  - Any module → @components/* (shared components)
  - Any module → @theme/* (shared theme)
  - Any module → @config/* (shared config)
  - Any module → @navigation/* (shared routes)
  - Any module → @hooks/* (shared hooks)
  - Any module → src/modules/core/* (shared infrastructure)
  - Module's own layers (ui → application → infrastructure → domain)

❌ Prohibited imports:
  - modules/products/domain → modules/users/domain (cross-module domain)
  - modules/products/ui → modules/users/infrastructure (cross-module infra)
  - modules/products/application → modules/users/application (cross-module app)
```

### Cross-Cutting Concern Placement

| Concern | Location | Example |
|---|---|---|
| **Shared hooks** | `src/hooks/` | `useDebounce` |
| **Shared components** | `src/components/core/` | `Button`, `Text`, `Card` |
| **Layout components** | `src/components/layout/` | `RootLayout`, `Header`, `LoadingState` |
| **Form wrappers** | `src/components/form/` | `TextInput` (react-hook-form) |
| **Theme tokens** | `src/theme/` | `spacing`, `colors`, `typography` |
| **Animation hooks** | `src/theme/hooks/` | `useFocusFadeIn`, `useFadeScale` |
| **Global UI state** | `src/modules/core/infrastructure/app.storage.ts` | Toast, Modal |
| **Date utilities** | `src/modules/core/domain/date.utils.ts` | `formatJoinDate()` |
| **Error handlers** | `src/modules/network/domain/` | `manageAxiosError()` |
| **Firebase base** | `src/modules/firebase/` | `firestoreService`, `storageService` |

### New Feature Bootstrapping Checklist

When adding a new feature module (e.g., `orders`):

1. **Domain layer** (create first — no dependencies):
   - [ ] `src/modules/orders/domain/order.model.ts` — Entity + Payload + Response interfaces
   - [ ] `src/modules/orders/domain/order.repository.ts` — Repository interface
   - [ ] `src/modules/orders/domain/order.scheme.ts` — Zod schema + inferred type
   - [ ] `src/modules/orders/domain/order.adapter.ts` — Form↔Payload adapters

2. **Infrastructure layer**:
   - [ ] `src/modules/orders/infrastructure/order.http.service.ts` — HTTP implementation
   - [ ] `src/modules/orders/infrastructure/order.firebase.service.ts` — Firebase implementation
   - [ ] `src/modules/orders/infrastructure/order.service.ts` — Factory (reads CONFIG)

3. **Application layer**:
   - [ ] `src/modules/orders/application/order.queries.ts` — useQuery hooks
   - [ ] `src/modules/orders/application/order.mutations.ts` — useMutation hooks

4. **UI layer**:
   - [ ] `src/modules/orders/ui/OrdersListView.tsx` — List screen
   - [ ] `src/modules/orders/ui/OrderDetailView.tsx` — Detail screen
   - [ ] `src/modules/orders/ui/OrderFormView.tsx` — Create/edit form screen
   - [ ] `src/modules/orders/ui/components/OrderList.tsx` — FlashList wrapper
   - [ ] `src/modules/orders/ui/components/OrderItem.tsx` — Memoized list item
   - [ ] `src/modules/orders/ui/components/OrderForm.tsx` — Form component

5. **Navigation integration**:
   - [ ] `src/navigation/routes/orders.routes.ts` — Enum + ParamList + ScreenProps
   - [ ] `src/navigation/stacks/OrdersStackNavigator.tsx` — Stack navigator
   - [ ] Add to `src/navigation/hooks/useNavigation.ts` — Typed hook
   - [ ] Add to `src/navigation/routes/index.ts` — Barrel export
   - [ ] Add to `RootStackParamList` + `RootNavigator.tsx` — Register stack

6. **Config registration**:
   - [ ] Add endpoint to `src/config/api.routes.ts`
   - [ ] Add collection to `src/config/collections.routes.ts`

### Path Aliases (defined in tsconfig.json + babel.config.js)

| Alias | Target | Usage |
|---|---|---|
| `@components/*` | `src/components/*` | Shared UI components |
| `@modules/*` | `src/modules/*` | Feature modules |
| `@theme/*` | `src/theme/*` | Theme system |
| `@config/*` | `src/config/*` | Configuration |
| `@navigation/*` | `src/navigation/*` | Navigation |
| `@hooks/*` | `src/hooks/*` | Shared hooks |

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| Cross-module domain import | Couples modules | Use `core/domain/` for shared types |
| Config in service file | Not centralized | Use `src/config/config.ts` |
| Shared state outside `core` | Scattered responsibility | Use `core/infrastructure/app.storage.ts` |
| Provider not in AppProvider | Inconsistent initialization | Register in AppProvider chain |
| Module with missing layers | Breaks architecture | All 4 layers required |
| Utility in wrong location | Hard to discover | Follow cross-cutting concern table |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Scalability audit |
| **Severity: error** | Cross-module domain import, missing layer, wrong provider order |
| **Severity: warning** | Utility in wrong location, config not centralized |
| **Severity: info** | Could add new path alias, could extract shared hook |

## 6. Practical Example

### Before — Coupled modules, scattered config
```typescript
// ❌ Product module imports from User domain
import { UserEntity } from '@modules/users/domain/user.model';

// ❌ API URL hardcoded in service
const API = 'https://api.example.com';
async getProducts() {
  return axios.get(`${API}/products`);
}

// ❌ Provider registered inconsistently
function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <QueryClientProvider> {/* Wrong order */}
          <Routes />
        </QueryClientProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
```

### After — Isolated modules, centralized config, correct composition
```typescript
// ✅ Shared types in core module
import { formatJoinDate } from '@modules/core/domain/date.utils';

// ✅ API route from config
import { API_ROUTES } from '@config/api.routes';
async getProducts() {
  return axiosService.get(API_ROUTES.PRODUCTS);
}

// ✅ Correct provider composition
function App() {
  return (
    <AppProvider>      {/* Secure → Query → Theme → SafeArea → Gesture → Nav */}
      <RootNavigator />
    </AppProvider>
  );
}
```

**Explanation**: Modules are isolated — each can be deleted without cascading failures. Configuration is centralized — switching providers is a one-line change. Provider composition follows security-first ordering. Cross-cutting concerns live in prescribed locations. The bootstrapping checklist ensures every new feature follows the complete pattern.
