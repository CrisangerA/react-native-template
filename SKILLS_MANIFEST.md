# Skills Manifest

> **Opinionated React Native Framework** — Agent Skills Registry
> Version 2.0 — Generated from codebase analysis

---

## Global Description

This skill system transforms the React Native Clean Architecture Template into an **opinionated framework** that automatically guides development decisions. Each skill is a production-ready enforcement document grounded in the actual codebase patterns — not theoretical guidelines.

The skills cover the complete lifecycle: from creating a new feature module to deploying it, ensuring consistency across teams, preventing anti-patterns before they reach code review, and accelerating onboarding.

## Design Philosophy

### Core Principles

1. **Layer Isolation** — Every feature module has 4 layers (domain, infrastructure, application, UI) with strict dependency direction. UI never touches infrastructure.

2. **Contract-First** — Repository interfaces in domain define the contract. Infrastructure implements it. Application bridges it. UI consumes it. Swapping providers requires zero code changes outside infrastructure.

3. **Error Safety** — Services return `T | Error` (never throw). Application hooks convert to throws for React Query. UI renders states in strict guard order: loading → error → empty → success.

4. **Token-Based Theming** — 5 theme modes (light, dark, primary, secondary, premium) powered by design tokens. Zero hardcoded colors, spacing, or typography values anywhere.

5. **Composition Over Inheritance** — Provider chain composes capabilities. Components compose from core primitives. Modules compose independently.

6. **Predictable Naming** — Every file, function, hook, type, and constant follows documented naming conventions. Code is greppable, discoverable, and self-documenting.

### Technical Stack

| Concern | Tool | Location |
|---|---|---|
| Framework | React Native 0.84 + React 19 | Root |
| Language | TypeScript (strict) | All `src/` |
| Navigation | React Navigation 7 (Native Stack) | `src/navigation/` |
| Server State | TanStack React Query 5 | `src/modules/*/application/` |
| Client State | Zustand 5 | `src/modules/core/infrastructure/` |
| Persistence | MMKV | `src/config/storage.ts` |
| Forms | react-hook-form 7 + Zod 4 | `src/modules/*/domain/*.scheme.ts` |
| HTTP | Axios | `src/modules/network/` |
| Firebase | @react-native-firebase | `src/modules/firebase/` |
| Lists | FlashList (Shopify) | `src/modules/*/ui/components/` |
| Testing | Jest + RNTL | `__tests__/` |
| Security | JailMonkey | `src/providers/SecureProvider.tsx` |

---

## Skill Registry

### Architecture & Structure (3 skills)

| Skill | File | Purpose |
|---|---|---|
| **[Architecture](#architecture)** | `skills/architecture.skill.md` | Clean Architecture 4-layer enforcement per module |
| **[Scalability](#scalability)** | `skills/scalability.skill.md` | Module isolation, provider composition, bootstrapping |
| **[Code Quality](#code-quality)** | `skills/code-quality.skill.md` | Naming, imports, formatting, TypeScript standards |

### Data & Services (3 skills)

| Skill | File | Purpose |
|---|---|---|
| **[API Layer](#api-layer)** | `skills/api-layer.skill.md` | Dual-provider services, factory pattern, `T\|Error` contract |
| **[State Management](#state-management)** | `skills/state-management.skill.md` | React Query vs Zustand vs useState decision matrix |
| **[Error Handling](#error-handling)** | `skills/error-handling.skill.md` | Centralized errors, typed names, UI guard order |

### UI & Presentation (4 skills)

| Skill | File | Purpose |
|---|---|---|
| **[Components](#components)** | `skills/components.skill.md` | 3-tier component system, style factories |
| **[Theme & Styling](#theme-styling)** | `skills/theme-styling.skill.md` | 5-mode themes, design tokens, responsive utilities |
| **[Navigation](#navigation)** | `skills/navigation.skill.md` | Typed routes, stack navigators, navigation hooks |
| **[Forms & Validation](#forms-validation)** | `skills/forms-validation.skill.md` | Zod schemas, react-hook-form, Spanish messages |

### Quality & Operations (3 skills)

| Skill | File | Purpose |
|---|---|---|
| **[Performance](#performance)** | `skills/performance.skill.md` | FlashList, React.memo, debouncing, animations |
| **[Testing](#testing)** | `skills/testing.skill.md` | Jest, RNTL, service mocking, layer testing |
| **[Security](#security)** | `skills/security.skill.md` | JailMonkey, MMKV, error message security |

---

## Skill Interaction Map

```
                    ┌───────────────────┐
                    │   ARCHITECTURE    │
                    │  (4-layer rules)  │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │  API LAYER   │ │    STATE     │ │  NAVIGATION  │
     │ (services)   │ │ MANAGEMENT   │ │  (routing)   │
     └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
            │                │                │
            ▼                ▼                ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │    ERROR     │ │    FORMS     │ │    THEME     │
     │  HANDLING    │ │ VALIDATION   │ │   STYLING    │
     └──────────────┘ └──────────────┘ └──────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
           ┌──────────────┐    ┌──────────────┐
           │ COMPONENTS   │    │  CODE        │
           │ (UI system)  │    │  QUALITY     │
           └──────┬───────┘    └──────┬───────┘
                  │                   │
           ┌──────┴─────┐     ┌──────┴───────┐
           ▼            ▼     ▼              ▼
    ┌────────────┐ ┌──────────┐    ┌──────────────┐
    │PERFORMANCE │ │ TESTING  │    │ SCALABILITY  │
    │            │ │          │    │              │
    └────────────┘ └──────────┘    └──────────────┘
                                          │
                                   ┌──────┴───────┐
                                   ▼              ▼
                            ┌────────────┐  (feeds back
                            │  SECURITY  │   to Architecture)
                            └────────────┘
```

---

## Skill Details

### Architecture
**Enforces**: Clean Architecture with 4 layers (domain, infrastructure, application, UI). Dependency direction: UI → application → infrastructure → domain. Domain is pure TypeScript. UI never imports from infrastructure.

**Key patterns validated**:
- Repository interfaces in `domain/`
- Service factory in `infrastructure/` reads `CONFIG.SERVICE_PROVIDER`
- React Query hooks in `application/`
- Thin views in `ui/` with zero business logic

---

### API Layer
**Enforces**: Dual-provider service architecture (HTTP + Firebase), factory pattern for provider selection, `T | Error` return contract, centralized error handling via `manageAxiosError()` and `manageFirebaseError()`.

**Key patterns validated**:
- 3-file service system: `*.http.service.ts` + `*.firebase.service.ts` + `*.service.ts` (factory)
- Services never throw — always return `T | Error`
- API routes centralized in `src/config/api.routes.ts`
- Application hooks bridge `T | Error` → throw for React Query

---

### State Management
**Enforces**: State decision matrix — React Query for server data, Zustand for global UI state, Zustand + MMKV for persistent state, react-hook-form for forms, `useState` for ephemeral local state.

**Key patterns validated**:
- `useQuery` with `['entities', params]` key pattern
- `useMutation` with `onSuccess` toast + cache invalidation
- Zustand selectors for granular subscriptions
- MMKV storage with Date reviver in `src/config/storage.ts`

---

### Error Handling
**Enforces**: 3-layer error flow (infrastructure returns → application converts → UI renders). Typed error names (`FormError`, `DuplicateIdentifierError`). UI guard order: loading → error → empty → success. Spanish user-facing messages.

**Key patterns validated**:
- `manageAxiosError()` maps Axios errors to typed Error objects
- Mutations check `result instanceof Error` before throwing
- Views use `LoadingState`, `ErrorState`, `EmptyState` layout components
- Error messages never expose technical details

---

### Components
**Enforces**: 3-tier component system (core/form/layout). Core components are theme-aware. Form components wrap core with react-hook-form. Layout components provide screen structure. Module components compose from all tiers.

**Key patterns validated**:
- 12 core components with variant/size props
- Style factories in `src/theme/components/*.styles.ts`
- Barrel exports in each tier's `index.ts`
- `React.memo` for list items

---

### Theme & Styling
**Enforces**: 5-mode theme system, design tokens (spacing, typography, colors, borderRadius, shadows), responsive utilities (`wScale`, `fScale`), animation hooks, `StyleSheet.create()` at file bottom.

**Key patterns validated**:
- Spacing uses 8-step token scale (`xs` through `3xl`)
- Typography uses 11 text variants (`h1` through `overline`)
- Animation durations from `ANIMATION_DURATION` constants
- Focus-based animation hooks (replay on screen focus)

---

### Navigation
**Enforces**: React Navigation with typed routes (enums), typed ParamList, ScreenProps types, typed navigation hooks per stack. `headerShown: false` with `slide_from_right` animation.

**Key patterns validated**:
- Route names in enums, never string literals
- Detail screens receive ID, not full entity
- Form screens receive optional entity for edit mode
- Barrel export from `src/navigation/routes/index.ts`

---

### Forms & Validation
**Enforces**: Zod schemas for validation with `z.infer` type inference. react-hook-form with `zodResolver`. Adapter-based data transformation. Spanish error messages in string format.

**Key patterns validated**:
- Schemas in `domain/{feature}.scheme.ts`
- `.min(1, 'message')` format (not object format)
- `.max()` on all string fields
- `z.coerce.number()` for numeric inputs
- `zodResolver(schema) as any` (Zod v4 compatibility)

---

### Performance
**Enforces**: FlashList over FlatList, `React.memo` for list items, search debouncing (`useDebounce(value, 500)`), focus-based animations with stagger, stable `renderItem` references.

**Key patterns validated**:
- `renderItem` defined outside component body
- `keyExtractor` uses entity ID, not index
- Conditional rendering uses ternary + null (not falsy &&)
- `useNativeDriver: true` for opacity/transform animations

---

### Testing
**Enforces**: Test structure mirrors source in `__tests__/`. Service mocks return `T | Error`. Mocks cleared in `beforeEach`. UI tests verify all 4 states (loading, error, empty, success).

**Key patterns validated**:
- Adapter tests (pure function input/output)
- Schema tests (validate Spanish error messages)
- UI tests (mock query hooks, test all render paths)
- Never test: `index.ts`, `*.model.ts`, `*.repository.ts`

---

### Security
**Enforces**: `SecureProvider` as outermost provider (jailbreak detection). MMKV for all persistence (never AsyncStorage). Error messages hide technical details. Axios timeout configured.

**Key patterns validated**:
- Provider order: Security → Query → Theme → SafeArea → Gesture → Nav
- MMKV storage adapter for Zustand `persist` middleware
- Spanish error messages with no stack traces
- `timeout: 10000` on Axios instance

---

### Scalability
**Enforces**: Module independence (cross-module domain imports prohibited). Configuration centralization in `src/config/`. Cross-cutting concern placement rules. Complete bootstrapping checklist for new features.

**Key patterns validated**:
- Path aliases for cross-module, relative for intra-module
- `CONFIG.SERVICE_PROVIDER` as single provider switch
- `src/modules/core/` for shared infrastructure
- New feature checklist: 15 files across 6 integration points

---

## Contribution Rules

### Adding a New Skill

1. Create `skills/{name}.skill.md` following the 6-section format:
   - Metadata, Trigger, Responsibilities, Rules, Expected Output, Practical Example
2. Ground all rules in actual codebase patterns (reference real files)
3. Include at least one Before/After example with real project code
4. Add the skill to this manifest with file path and purpose
5. Update the interaction map if the skill depends on or feeds other skills

### Modifying an Existing Skill

1. Verify the rule change against actual codebase patterns
2. Update all affected Before/After examples
3. Ensure no contradiction with other skills
4. Update this manifest if severity levels or triggers change

### Skill Format Requirements

- **Metadata table**: Name, Description, Purpose, Category
- **Trigger table**: When activated, Context, Observed paths
- **Responsibilities**: Validates, Recommends, Prevents, Optimizes
- **Rules**: Code patterns with actual project examples, anti-pattern table
- **Expected Output**: Severity levels (error/warning/info) with descriptions
- **Practical Example**: Before (wrong) and After (correct) with explanation

---

## Usage Guide

### For New Projects

```bash
# 1. Copy the skills directory into your React Native project
cp -r skills/ /your-project/skills/

# 2. Reference skills in your CLAUDE.md or agent configuration
# 3. The agent will automatically enforce patterns when tasks match triggers
```

### For Auditing Existing Code

```
"Audit the orders module against the architecture skill"
"Review ProductItem against the performance skill"
"Check the auth form against the forms-validation skill"
"Run a security audit on the providers"
"Validate theme compliance in the users module"
```

### For Code Generation

```
"Create a new orders module"               → architecture + api-layer + forms-validation
"Create a search component"                → components + theme-styling + code-quality
"Add a new navigation stack for payments"  → navigation + scalability
"Create a Zustand store for cart"          → state-management + security
"Add form validation for checkout"         → forms-validation + error-handling
```

### For Onboarding New Developers

Read skills in this order for progressive understanding:

1. **Architecture** — understand the 4-layer module structure
2. **Code Quality** — understand naming, imports, formatting
3. **API Layer** + **State Management** — understand data flow
4. **Forms & Validation** + **Error Handling** — understand user interactions
5. **Theme & Styling** + **Components** — understand the UI system
6. **Navigation** — understand routing patterns
7. **Performance** — understand optimization rules
8. **Testing** — understand test strategy
9. **Security** + **Scalability** — understand production concerns

---

## Codebase Reference

### Module Map

| Module | Layers | Description |
|---|---|---|
| `authentication` | domain, infrastructure, application, ui | Sign-in/sign-up with HTTP + Firebase auth |
| `products` | domain, infrastructure, application, ui | CRUD with HTTP + Firebase Firestore |
| `users` | domain, infrastructure, application, ui | CRUD with HTTP + Firebase Firestore |
| `core` | domain, infrastructure, application, ui | Shared state (toast, modal), date utils |
| `network` | domain, infrastructure | Axios singleton, error handler, messages |
| `firebase` | domain, infrastructure, application | Firestore/Storage services, error handler |
| `examples` | ui, hooks | UI component showcase, animation demos |

### File Count by Category

| Category | Count | Location |
|---|---|---|
| Source files | 138 | `src/` |
| Feature modules | 7 | `src/modules/` |
| Shared components | 26 | `src/components/` |
| Theme files | 22 | `src/theme/` |
| Navigation files | 9 | `src/navigation/` |
| Config files | 4 | `src/config/` |
| Provider files | 3 | `src/providers/` |
| Skills | 12 | `skills/` |
