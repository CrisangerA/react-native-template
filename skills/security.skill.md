# Security Skill — Security Hardening Enforcer

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | `security-hardening` |
| **Description** | Enforces device integrity checking (JailMonkey), MMKV encrypted storage, authentication patterns, error message security, and network security configuration. |
| **Purpose** | Protect against jailbroken/rooted devices, ensure sensitive data is stored securely, and prevent information leakage via error messages. |
| **Category** | Security, Quality |

## 2. Trigger

| Condition | Detail |
|---|---|
| **Activated when** | Implementing auth flows, storing sensitive data, configuring network layer, handling error messages |
| **Context** | `src/providers/SecureProvider.tsx`, `src/config/storage.ts`, auth module, network module |
| **Observed paths** | `*Provider.tsx`, `*.storage.ts`, `*auth*.ts`, `network.error.ts` |

## 3. Responsibilities

### Validates
- `SecureProvider` is the **outermost** provider in `AppProvider` composition
- MMKV used for all persistent storage (never `AsyncStorage`)
- Error messages never expose technical details (stack traces, SQL, internal paths)
- Axios timeout is always configured (default: 10000ms)
- Auth tokens stored in MMKV, never in plain React state or Context

### Recommends
- Use `SecureProvider` to block app on jailbroken/rooted devices
- Keep MMKV storage configuration centralized in `src/config/storage.ts`
- Use typed error names for handling specific auth errors

### Prevents
- Sensitive data in plain `useState` or `useContext`
- `AsyncStorage` usage anywhere in the project
- Technical error details reaching the UI
- Missing network timeout configuration
- Hardcoded API keys or secrets in source code

## 4. Rules

### Provider Composition Order (Security-First)

```typescript
// src/providers/AppProvider.tsx — SecureProvider MUST be outermost
export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SecureProvider>                    {/* 1. Security check — blocks jailbroken devices */}
      <QueryClientProvider>             {/* 2. Server state */}
        <ThemeProvider>                 {/* 3. Theme */}
          <SafeAreaProvider>            {/* 4. Safe area */}
            <GestureHandlerRootView>   {/* 5. Gestures */}
              <NavigationProvider>      {/* 6. Navigation */}
                {children}
                <GlobalDeleteConfirmation />
                <GlobalToast />
              </NavigationProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SecureProvider>
  );
}
```

### Device Integrity Check

```typescript
// src/providers/SecureProvider.tsx
import JailMonkey from 'jail-monkey';

export default function SecureProvider({ children }) {
  if (JailMonkey.isJailBroken()) {
    return (
      <View style={styles.blocked}>
        <Text>Esta aplicación no puede ejecutarse en dispositivos modificados.</Text>
      </View>
    );
  }
  return <>{children}</>;
}
```

### MMKV Storage (not AsyncStorage)

```typescript
// src/config/storage.ts — centralized MMKV config
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

// Custom storage adapter for Zustand persist
export const mmkvStorage = {
  getItem: (name: string) => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string) => mmkv.set(name, value),
  removeItem: (name: string) => mmkv.delete(name),
};

// Date reviver for JSON parsing (handles Date objects in persisted state)
```

### Network Security

```typescript
// src/modules/network/infrastructure/axios.service.ts
class AxiosService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ROUTES.ROOT,
      timeout: 10000,           // Always set timeout
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
```

### Error Message Security

```typescript
// ✅ User-facing messages — no technical details
'No pudimos conectar con el servidor. Revisa tu conexión a internet.'
'El servicio no está disponible en este momento.'
'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'

// ❌ NEVER expose:
'AxiosError: ECONNREFUSED 127.0.0.1:3000'
'Firebase: auth/invalid-credential (auth/invalid-credential)'
'TypeError: Cannot read properties of undefined'
```

### Prohibited Anti-patterns

| Anti-pattern | Why | Correct |
|---|---|---|
| `AsyncStorage` anywhere | Slower, no encryption | MMKV via `react-native-mmkv` |
| Token in `useState` | Lost on re-render, no persistence | MMKV storage |
| Missing `SecureProvider` wrapper | No jailbreak detection | First provider in chain |
| `error.stack` in UI | Information leak | User-friendly Spanish message |
| Missing `timeout` on Axios | Hanging requests | `timeout: 10000` |
| API key in source code | Credential leak | Environment variables |
| `console.log(token)` in production | Credential leak | Remove all sensitive logging |

## 5. Expected Output

| Aspect | Detail |
|---|---|
| **Feedback type** | Security audit |
| **Severity: error** | AsyncStorage usage, token in plain state, missing SecureProvider, API key in code |
| **Severity: warning** | Missing timeout, technical error in UI, console.log of sensitive data |
| **Severity: info** | Could add certificate pinning, could add biometric auth |

## 6. Practical Example

### Before — Insecure patterns
```typescript
// ❌ AsyncStorage, token in state, no jailbreak check
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('token').then(t => setToken(t));
  }, []);
  // No SecureProvider wrapping
  return <NavigationContainer>...</NavigationContainer>;
}
```

### After — Secure patterns (actual project)
```typescript
// ✅ MMKV, SecureProvider as outermost, proper provider chain
function App() {
  return (
    <AppProvider>      {/* SecureProvider → QueryClient → Theme → SafeArea → Gesture → Nav */}
      <RootNavigator />
    </AppProvider>
  );
}

// Token persisted via MMKV + Zustand
const useAuthStorage = create(
  persist(
    (set) => ({ token: null, setToken: (t) => set({ token: t }) }),
    { name: 'auth-storage', storage: createJSONStorage(() => mmkvStorage) }
  )
);
```

**Explanation**: SecureProvider blocks the app on jailbroken devices before any other provider initializes. MMKV provides fast, native-encrypted storage. Error messages never expose technical details. Axios has timeout configured. The provider chain ensures security is the first layer evaluated.
