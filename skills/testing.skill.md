# Testing Skill — Test Strategy Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `testing-strategy` |
| **Description** | Enforces test file structure, Jest + React Native Testing Library patterns, service mocking, domain-layer testing, and the `T \| Error` mock contract. |
| **Purpose** | Ensure test reliability, prevent regressions, and maintain testability across all architectural layers. |
| **Category** | Quality, DX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Writing tests, creating test utilities, mocking services, reviewing test coverage |
| **Context** | `__tests__/`, any `*.test.ts` or `*.test.tsx` file |
| **Observed paths** | `__tests__/`, `jest.config.js`, test utility files |

## 3. Responsibilities

### Validates
- Tests exist for adapters, schemas, and critical UI flows
- Service mocks return `T | Error` matching the real contract
- Mocks are cleared in `beforeEach` blocks
- Tests use RNTL utilities (`render`, `screen`, `fireEvent`, `waitFor`)
- Test files mirror source structure in `__tests__/`

### Recommends
- Test adapters thoroughly (they are pure functions)
- Test Zod schemas with valid and invalid data
- Test mutation hooks verify `instanceof Error` branch
- Test UI components for loading, error, empty, and success states

### Prevents
- Tests that depend on implementation details
- Direct import from `@testing-library/react-native` (use custom wrapper)
- Tests without mock cleanup (`jest.clearAllMocks`)
- Testing trivial files: `index.ts`, `*.model.ts`, `*.repository.ts`

## 4. Rules

### Test File Structure

```
__tests__/
├── {feature}/
│   ├── domain/
│   │   ├── {feature}.adapter.test.ts     # Pure function tests
│   │   └── {feature}.scheme.test.ts      # Schema validation tests
│   ├── application/
│   │   ├── {feature}.queries.test.ts     # Query hook tests
│   │   └── {feature}.mutations.test.ts   # Mutation hook tests
│   └── ui/
│       ├── {Feature}ListView.test.tsx    # Screen integration tests
│       └── components/
│           └── {Feature}Form.test.tsx    # Form component tests
```

### Testing Tools

| Tool | Usage |
|---|---|
| Jest | Test runner, assertions, mocking |
| `@testing-library/react-native` | Component rendering, queries, events |
| `@testing-library/jest-native` | Custom matchers (toBeVisible, etc.) |
| `jest.mock()` | Service/module mocking |

### Service Mock Pattern

```typescript
// Mock the service at file top
jest.mock('@modules/products/infrastructure/product.service', () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Import the mocked service
import productService from '@modules/products/infrastructure/product.service';

// In tests — mock returns T | Error (matching real contract)
beforeEach(() => {
  jest.clearAllMocks();
});

it('should return products on success', async () => {
  (productService.getAll as jest.Mock).mockResolvedValue([
    { id: '1', name: 'Product 1', price: 10 },
  ]);
  // ... test logic
});

it('should handle error', async () => {
  (productService.getAll as jest.Mock).mockResolvedValue(
    new Error('Network error')  // Returns Error, not throws
  );
  // ... test logic
});
```

### Adapter Test Pattern

```typescript
// __tests__/products/domain/product.adapter.test.ts
import { productFormToPayloadAdapter } from '@modules/products/domain/product.adapter';

describe('productFormToPayloadAdapter', () => {
  it('should transform form data to API payload', () => {
    const formData = {
      name: '  Product Name  ',
      description: 'Description',
      price: 29.99,
    };

    const result = productFormToPayloadAdapter(formData);

    expect(result).toEqual({
      name: 'Product Name',       // Trimmed
      description: 'Description',
      price: 29.99,
    });
  });

  it('should handle optional fields', () => {
    const formData = { name: 'Product', price: 10 };
    const result = productFormToPayloadAdapter(formData);
    expect(result.description).toBeUndefined();
  });
});
```

### Schema Test Pattern

```typescript
// __tests__/products/domain/product.scheme.test.ts
import { productSchema } from '@modules/products/domain/product.scheme';

describe('productSchema', () => {
  it('should validate correct data', () => {
    const result = productSchema.safeParse({
      name: 'Valid Product',
      description: 'A description',
      price: 29.99,
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty name with Spanish message', () => {
    const result = productSchema.safeParse({
      name: '',
      price: 10,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find(i => i.path[0] === 'name');
      expect(nameError?.message).toBe('El nombre es requerido');
    }
  });

  it('should reject negative price', () => {
    const result = productSchema.safeParse({
      name: 'Product',
      price: -5,
    });
    expect(result.success).toBe(false);
  });
});
```

### UI Component Test Pattern

```typescript
// __tests__/products/ui/ProductsListView.test.tsx
import { render, screen, waitFor } from '@testing-library/react-native';

// Mock the query hook
jest.mock('@modules/products/application/product.queries', () => ({
  useProducts: jest.fn(),
}));

import { useProducts } from '@modules/products/application/product.queries';

describe('ProductList', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should show loading state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<ProductList searchText="" />);
    expect(screen.getByText('Cargando productos...')).toBeTruthy();
  });

  it('should show error state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error('Failed'),
    });
    render(<ProductList searchText="" />);
    expect(screen.getByText('Error al cargar')).toBeTruthy();
  });

  it('should show empty state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });
    render(<ProductList searchText="" />);
    expect(screen.getByText('Producto no encontrado')).toBeTruthy();
  });

  it('should render products on success', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: [{ id: '1', name: 'Test Product', price: 10 }],
      isLoading: false,
      isError: false,
    });
    render(<ProductList searchText="" />);
    expect(screen.getByText('Test Product')).toBeTruthy();
  });
});
```

### What NOT to Test

| File type | Why |
|---|---|
| `index.ts` (barrel exports) | Just re-exports, no logic |
| `*.model.ts` | Pure type definitions, no runtime behavior |
| `*.repository.ts` | Interface definitions only |
| `*.routes.ts` | Enum + type definitions only |
| `*.styles.ts` | Style factories tested visually, not unit-tested |

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `import { render } from '@testing-library/react-native'` | Missing providers wrapper | Use custom test utility with providers |
| Missing `beforeEach(() => jest.clearAllMocks())` | Mock state leaks | Always clear between tests |
| `mockRejectedValue()` for service error | Services don't throw | `mockResolvedValue(new Error())` |
| Testing `console.log` output | Implementation detail | Test behavior and rendered output |
| `sleep(1000)` in tests | Flaky, slow | `waitFor()` or `act()` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Test coverage audit |
| **Severity: error** | Missing adapter tests, wrong mock contract, no mock cleanup |
| **Severity: warning** | Missing UI state tests, no schema validation tests |
| **Severity: info** | Could add snapshot tests, could increase coverage |

## 6. Practical Example

### Before — No tests, tightly coupled
```typescript
// No tests exist for the product adapter
// Service mock uses throw instead of return Error
```

### After — Comprehensive layer tests
```typescript
// Domain: adapter test (pure function)
describe('productFormToPayloadAdapter', () => {
  it('trims name', () => {
    expect(productFormToPayloadAdapter({ name: ' X ', price: 1 }).name).toBe('X');
  });
});

// Domain: schema test (validates Spanish messages)
describe('productSchema', () => {
  it('rejects empty name with Spanish message', () => {
    const r = productSchema.safeParse({ name: '', price: 1 });
    expect(r.error.issues[0].message).toBe('El nombre es requerido');
  });
});

// UI: tests all 4 states (loading, error, empty, success)
describe('ProductList', () => {
  it('shows LoadingState when loading', () => { ... });
  it('shows ErrorState when error', () => { ... });
  it('shows EmptyState when empty', () => { ... });
  it('renders items when data present', () => { ... });
});
```

**Explanation**: Tests are organized by layer. Domain tests verify pure functions and validation rules. UI tests verify all 4 rendering states. Service mocks match the real `T | Error` contract. All mocks are cleaned between tests.
