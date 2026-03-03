# Forms & Validation Skill — Form System Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `forms-validation` |
| **Description** | Enforces Zod schemas for validation, react-hook-form for state, adapter-based data transformation, and Spanish error messages across all forms. |
| **Purpose** | Standardize form handling with type-safe validation, consistent error UX, and clean data flow from form → adapter → API payload. |
| **Category** | Quality, DX, UX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Creating forms, defining validation schemas, handling form submission |
| **Context** | `src/modules/*/domain/*.scheme.ts`, `src/modules/*/ui/components/*Form.tsx`, `src/components/form/` |
| **Observed paths** | `*.scheme.ts`, `*Form.tsx`, `*.adapter.ts` |

## 3. Responsibilities

### Validates
- Zod schemas live in `domain/{feature}.scheme.ts`
- Form types inferred via `z.infer<typeof schema>` (never manually typed)
- Error messages in Spanish, using string format (`.min(1, 'message')`)
- All string fields have `.max()` defined
- Form data transformed via adapter before API call
- `zodResolver` used with `as any` cast (Zod v4 compatibility)

### Recommends
- Use `z.coerce.number()` for numeric fields from text inputs
- Use `.optional()` suffix for optional fields
- Use `.refine()` for cross-field validation (e.g., password confirmation)
- Define `defaultValues` in `useForm` matching all schema fields

### Prevents
- Manual `useState` per form field (use `useForm`)
- Object format for Zod messages: `.min(1, { message: '...' })` — use string format
- English error messages (project standard is Spanish)
- Missing `maxLength` on string fields
- Form submission without adapter transformation

## 4. Rules

### Schema Definition Pattern

```typescript
// src/modules/products/domain/product.scheme.ts
import z from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')              // Spanish, string format
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),                                     // .optional() suffix
  price: z.coerce                                    // z.coerce for input conversion
    .number()
    .min(0.01, 'El precio debe ser mayor a 0'),
});

export type ProductFormData = z.infer<typeof productSchema>;  // Inferred, never manual
```

### Complex Schema Pattern (from auth)

```typescript
// Cross-field validation with .refine()
export const registerSchema = z
  .object({
    nombreCompleto: z.string().min(1, 'El nombre es requerido').min(2, 'Al menos 2 caracteres'),
    email: z.string().min(1, 'El email es requerido').email('Ingrese un email válido'),
    password: z.string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'Al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string().min(1, 'Confirme su contraseña'),
    fechaNacimiento: z.date({ message: 'La fecha de nacimiento es requerida' })
      .refine(date => /* age >= 18 */, { message: 'Debe ser mayor de 18 años' }),
    pais: z.object({ label: z.string(), value: z.string() })
      .refine(val => val.value !== '', { message: 'Seleccione un país' }),
    aceptaTerminos: z.boolean()
      .refine(val => val === true, { message: 'Debe aceptar los términos' }),
    recibirNewsletter: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],  // Target specific field for cross-field errors
  });
```

### Form Component Pattern

```typescript
// src/modules/products/ui/components/ProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../domain/product.scheme';
import { TextInput } from '@components/form';
import { Button } from '@components/core';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
  initialData?: ProductEntity;  // Present = edit mode, absent = create mode
}

export function ProductForm({ onSubmit, isLoading = false, initialData }: ProductFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,  // Zod v4 compatibility cast
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput control={control} name="name" label="Nombre" error={errors.name?.message} />
      <TextInput control={control} name="description" label="Descripción" multiline />
      <TextInput control={control} name="price" label="Precio" keyboardType="decimal-pad" />
      <Button onPress={handleSubmit(onSubmit)} loading={isLoading}>
        {initialData ? 'Actualizar' : 'Crear'}
      </Button>
    </View>
  );
}
```

### Adapter Pattern (form → API payload)

```typescript
// src/modules/products/domain/product.adapter.ts
export function productFormToPayloadAdapter(form: ProductFormData): CreateProductPayload {
  return {
    name: form.name.trim(),
    description: form.description?.trim() || undefined,
    price: Number(form.price),
  };
}
```

### Form View Pattern (connects form + mutation + adapter)

```typescript
// src/modules/products/ui/ProductFormView.tsx
export function ProductFormView({ route: { params }, navigation: { goBack } }) {
  const { mutate: createProduct, isPending: isCreating } = useProductCreate();
  const { mutate: updateProduct, isPending: isUpdating } = useProductUpdate();
  const product = params?.product;
  const isEditing = !!product;

  const handleSubmit = (data: ProductFormData) => {
    const payload = productFormToPayloadAdapter(data);  // Always use adapter
    if (isEditing) {
      updateProduct({ id: product.id, data: payload });
    } else {
      createProduct(payload);
    }
    goBack();
  };

  return <ProductForm onSubmit={handleSubmit} isLoading={isCreating || isUpdating} initialData={product} />;
}
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `.min(1, { message: 'Requerido' })` | Object format, project uses string | `.min(1, 'Requerido')` |
| English error message | Project standard is Spanish | `'El nombre es requerido'` |
| Missing `.max()` on string field | Unbounded input | `.max(100, 'Máximo 100 caracteres')` |
| `type FormData = { name: string }` | Manual type, drifts from schema | `z.infer<typeof schema>` |
| `const [name, setName] = useState('')` | Manual state management | `useForm` + `control` |
| Submit without adapter | Raw form data hits API | `const payload = formToPayloadAdapter(data)` |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Form implementation audit |
| **Severity: error** | Missing Zod schema, manual `useState` for form, English error message |
| **Severity: warning** | Missing `.max()`, missing adapter, object format message |
| **Severity: info** | Could add custom refine, could improve UX with field-level hints |

## 6. Practical Example

### Before — Manual form handling
```typescript
export function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name) { setError('Name required'); return; }
    if (!price) { setError('Price required'); return; }
    api.createProduct({ name, price: parseFloat(price) });
  };
  // ... JSX with manual state binding
}
```

### After — Zod + react-hook-form + adapter
```typescript
// 1. Schema (domain/product.scheme.ts)
export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
});
export type ProductFormData = z.infer<typeof productSchema>;

// 2. Adapter (domain/product.adapter.ts)
export function productFormToPayloadAdapter(form: ProductFormData): CreateProductPayload {
  return { name: form.name.trim(), price: form.price };
}

// 3. Form component (ui/components/ProductForm.tsx)
const { control, handleSubmit } = useForm<ProductFormData>({
  resolver: zodResolver(productSchema) as any,
});
// 4. View connects form → adapter → mutation
const handleSubmit = (data: ProductFormData) => {
  createProduct(productFormToPayloadAdapter(data));
};
```

**Explanation**: Zod schema is the single source of truth for validation rules and TypeScript types. react-hook-form manages all state internally. The adapter transforms form data to API payload format. Error messages are consistently in Spanish with string format.
