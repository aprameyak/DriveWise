import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    id: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // For MVP, accept any valid email/password
        if (email.includes('@') && password.length >= 6) {
          set({
            isAuthenticated: true,
            user: {
              email,
              id: Date.now().toString(),
            },
          });
          return true;
        }
        return false;
      },

      signup: async (email: string, password: string) => {
        // For MVP, accept any valid email/password
        if (email.includes('@') && password.length >= 6) {
          set({
            isAuthenticated: true,
            user: {
              email,
              id: Date.now().toString(),
            },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 