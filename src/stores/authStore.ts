import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

import { login as loginService } from '@/services/auth';
import { AuthCredentials, AuthError, Driver } from '@/types/auth';

const TOKEN_KEY = 'auth_token';
const DRIVER_KEY = 'auth_driver';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  isOffline: boolean;
  error: string | null;
  driver: Driver | null;

  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  clearError: () => void;
}

async function saveSession(token: string, driver: Driver): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(DRIVER_KEY, JSON.stringify(driver));
}

async function loadSession(): Promise<{ token: string | null; driver: Driver | null }> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const driverRaw = await SecureStore.getItemAsync(DRIVER_KEY);

  let driver: Driver | null = null;
  if (driverRaw) {
    try {
      driver = JSON.parse(driverRaw) as Driver;
    } catch {
      driver = null;
    }
  }

  return { token, driver };
}

async function clearSession(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(DRIVER_KEY);
}

function isNetworkError(error: unknown): boolean {
  return !(error instanceof AuthError);
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  isOffline: false,
  error: null,
  driver: null,

  hydrate: async () => {
    const { token, driver } = await loadSession();
    set({
      isAuthenticated: Boolean(token && driver),
      isHydrated: true,
      isOffline: false,
      driver,
      error: null,
    });
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null, isOffline: false });

    try {
      const response = await loginService(credentials);
      await saveSession(response.token, response.driver);
      set({
        isAuthenticated: true,
        isLoading: false,
        isOffline: false,
        driver: response.driver,
        error: null,
      });
      return;
    } catch (error) {
      if (!isNetworkError(error)) {
        set({ isLoading: false, error: (error as AuthError).message });
        return;
      }

      // Network error: fall back to local session if the DNI matches.
      const { token, driver } = await loadSession();
      if (token && driver && driver.dni === credentials.dni && credentials.password.length > 0) {
        set({
          isAuthenticated: true,
          isLoading: false,
          isOffline: true,
          driver,
          error: null,
        });
        return;
      }

      set({
        isLoading: false,
        error: 'No hay conexión. Conectate una vez para usar la app offline.',
      });
    }
  },

  logout: async () => {
    await clearSession();
    set({
      isAuthenticated: false,
      isLoading: false,
      isOffline: false,
      driver: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
