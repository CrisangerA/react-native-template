# Theme & Styling Skill — Design System Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `theme-styling` |
| **Description** | Enforces the 5-mode theme system, design token usage (spacing, typography, colors, borders, shadows), component style factories, responsive utilities, and animation hooks. |
| **Purpose** | Guarantee visual consistency across all 5 theme modes, eliminate style drift, and ensure all UI adapts to theme changes without code modification. |
| **Category** | UI/UX, Quality, DX |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Creating/styling components, using colors, defining spacing, adding animations |
| **Context** | Any TSX/style file, `src/theme/`, `src/theme/components/`, `src/theme/hooks/` |
| **Observed paths** | `src/theme/**`, `*.styles.ts`, any file with `StyleSheet.create` |

## 3. Responsibilities

### Validates
- All spacing uses tokens from `src/theme/spacing.ts` (never raw pixel values)
- All text uses `<Text variant="...">` from core components (never raw `<RNText>`)
- Colors accessed via `useTheme()` hook or style factory (never imported directly)
- Animation durations use `ANIMATION_DURATION` constants (never raw numbers)
- Border radii use `borderRadius` tokens (never raw numbers)
- Component styles use factory functions in `src/theme/components/`

### Recommends
- Use responsive utilities (`wScale`, `hScale`, `fScale`) for dimension scaling
- Use focus-based animation hooks (`useFocusFadeIn`, `useFocusSlideIn`) over mount-based effects
- Use `commonStyles` for flex utilities instead of repeating flex patterns

### Prevents
- Hardcoded hex colors (`#FF5733`, `rgb(255, 0, 0)`)
- Raw pixel values for spacing (`padding: 16`)
- Raw font sizes (`fontSize: 14`)
- Raw border radius values (`borderRadius: 8`)
- Direct color mode imports (`colors.light.primary`)
- Missing theme mode support in new components

## 4. Rules

### Theme Mode System

5 theme modes: `light` | `dark` | `primary` | `secondary` | `premium`

```typescript
// src/theme/providers/ThemeProvider.tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);

// src/theme/providers/useTheme.ts
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be inside ThemeProvider');
  return context;  // { colors, typography, spacing, borderRadius, shadows, toggleTheme }
}

// Theme persistence via Zustand + MMKV
// src/theme/providers/theme.storage.ts
export const useThemeStorage = create(persist(..., { storage: mmkvStorage }));
```

### Design Token Reference

```typescript
// src/theme/spacing.ts — 8-step scale with responsive scaling
export const spacing = {
  xs: wScale(4),    // ~4dp
  sm: wScale(8),    // ~8dp
  md: wScale(16),   // ~16dp
  lg: wScale(24),   // ~24dp
  xl: wScale(32),   // ~32dp
  '2xl': wScale(40),
  '3xl': wScale(48),
};

// src/theme/typography.ts — 11 text styles
const typography = {
  h1: { fontSize: fScale(32), fontWeight: '700' },
  h2: { fontSize: fScale(24), fontWeight: '700' },
  h3: { fontSize: fScale(20), fontWeight: '600' },
  body: { fontSize: fScale(16), fontWeight: '400' },
  bodySmall: { fontSize: fScale(14), fontWeight: '400' },
  caption: { fontSize: fScale(12), fontWeight: '400' },
  button: { fontSize: fScale(16), fontWeight: '600' },
  // ... h4, h5, h6, overline
};

// src/theme/borders.ts — 9 border radius tokens
export const borderRadius = {
  none: 0,
  xs: wScale(2),
  sm: wScale(4),
  md: wScale(8),
  lg: wScale(12),
  xl: wScale(16),
  '2xl': wScale(24),
  full: 9999,
};

// src/theme/shadows.ts — 5 shadow levels, mode-aware
export function getShadow(mode: ThemeMode, level: 'sm' | 'md' | 'lg' | 'xl') { ... }

// src/theme/animations.ts — duration + spring + easing constants
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 350,
  slow: 500,
};
export const SPRING_CONFIG = { tension: 100, friction: 10 };
```

### Responsive Utilities

```typescript
// src/theme/responsive.ts
export const wScale = (size: number) => (screenWidth / 375) * size;  // Width-based
export const hScale = (size: number) => (screenHeight / 812) * size; // Height-based
export const fScale = (size: number) => Math.round(wScale(size));     // Font scaling

export const wp = (percentage: number) => (screenWidth * percentage) / 100;
export const hp = (percentage: number) => (screenHeight * percentage) / 100;
```

### Component Style Factory Pattern

```typescript
// src/theme/components/Button.styles.ts
export function getButtonStyle(
  mode: ThemeMode,
  variant: 'primary' | 'secondary' | 'outlined' | 'ghost',
  size: 'sm' | 'md' | 'lg',
  options?: { disabled?: boolean; fullWidth?: boolean }
) {
  const theme = getTheme(mode);
  return StyleSheet.create({
    container: {
      backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.surface,
      paddingVertical: size === 'sm' ? spacing.xs : size === 'lg' ? spacing.md : spacing.sm,
      paddingHorizontal: size === 'sm' ? spacing.sm : size === 'lg' ? spacing.xl : spacing.lg,
      borderRadius: borderRadius.md,
      opacity: options?.disabled ? 0.5 : 1,
      width: options?.fullWidth ? '100%' : undefined,
    },
    text: {
      ...typography.button,
      color: variant === 'primary' ? theme.colors.textOnPrimary : theme.colors.text,
    },
  });
}
```

### Animation Hook Patterns

```typescript
// Focus-based fade-in (replays when screen regains focus)
import { useFocusFadeIn } from '@theme/hooks';

const { animatedStyle } = useFocusFadeIn({
  duration: ANIMATION_DURATION.slow,
  offset: 20,        // translateY offset
  delay: 300,         // optional delay
});

// Focus-based slide-in (directional)
import { useFocusSlideIn } from '@theme/hooks';

const { animatedStyle } = useFocusSlideIn({
  direction: 'right',
  duration: ANIMATION_DURATION.slow,
});

// Fade + scale (spring-based)
import { useFadeScale } from '@theme/hooks';

const { animatedStyle } = useFadeScale({
  duration: ANIMATION_DURATION.normal,
  initialScale: 0.8,
});

// Staggered list item animation
const { animatedStyle } = useFocusFadeIn({
  delay: index * 100,  // Each item 100ms after previous
  duration: ANIMATION_DURATION.normal,
});
```

### Common Styles

```typescript
// src/theme/common.ts
export const commonStyles = StyleSheet.create({
  flex: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  center: { justifyContent: 'center', alignItems: 'center' },
  centerHorizontal: { alignItems: 'center' },
  centerVertical: { justifyContent: 'center' },
});
```

### Token Usage in Components

```typescript
// ✅ Correct — tokens everywhere
const styles = StyleSheet.create({
  container: {
    padding: spacing.md,        // Token, not 16
    gap: spacing.xs,            // Token, not 4
  },
  card: {
    borderRadius: borderRadius.md,  // Token, not 8
    marginBottom: spacing.sm,       // Token, not 8
  },
});

// ❌ Incorrect — raw values
const styles = StyleSheet.create({
  container: { padding: 16, gap: 4 },
  card: { borderRadius: 8, marginBottom: 8 },
});
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `color: '#FF5733'` | Ignores theme modes | `color: colors.primary` via `useTheme()` |
| `padding: 16` | Not responsive, breaks tokens | `padding: spacing.md` |
| `fontSize: 14` | Not responsive | `fontSize: fScale(14)` or `<Text variant="bodySmall">` |
| `borderRadius: 8` | Not from token | `borderRadius: borderRadius.md` |
| `colors.light.primary` | Direct mode access | `useTheme().colors.primary` |
| `duration: 500` | Raw animation duration | `ANIMATION_DURATION.slow` |
| `<Text style={{fontSize: 16}}>` (RN) | No theme, no variant | `<Text variant="body">` (core) |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Theme compliance audit |
| **Severity: error** | Hardcoded color, direct mode import, raw RN Text |
| **Severity: warning** | Raw pixel spacing, raw font size, missing animation constant |
| **Severity: info** | Could use responsive utility, could use common style |

## 6. Practical Example

### Before — Hardcoded styles
```typescript
<View style={{ padding: 16, backgroundColor: '#ffffff' }}>
  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333333' }}>Title</Text>
  <Text style={{ fontSize: 14, color: '#666666' }}>Body text</Text>
  <View style={{ height: 1, backgroundColor: '#E0E0E0', marginVertical: 8 }} />
</View>
```

### After — Token-based theming (actual project pattern)
```typescript
import { Text, Card } from '@components/core';
import { spacing } from '@theme/index';

<Card style={styles.card}>
  <Text variant="h2">Title</Text>
  <Text variant="body">Body text</Text>
</Card>

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
    padding: spacing.md,
  },
});
```

**Explanation**: All colors come from the theme system (auto-switches across 5 modes). Spacing uses tokens (responsive across devices). Text uses variant props (consistent typography). Border radii use tokens. Animations use duration constants. No hardcoded values anywhere — the entire UI adapts to theme changes automatically.
