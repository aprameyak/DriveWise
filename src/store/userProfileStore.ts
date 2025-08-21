import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';

interface UserProfileState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setOnboarded: (onboarded: boolean) => void;
  clearProfile: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isOnboarded: false,

      setProfile: (profile: UserProfile) => {
        set({ profile, isOnboarded: true });
      },

      updateProfile: (updates: Partial<UserProfile>) => {
        const currentProfile = get().profile;
        if (currentProfile) {
          const updatedProfile = {
            ...currentProfile,
            ...updates,
            updatedAt: new Date(),
          };
          set({ profile: updatedProfile });
        }
      },

      setOnboarded: (onboarded: boolean) => {
        set({ isOnboarded: onboarded });
      },

      clearProfile: () => {
        set({ profile: null, isOnboarded: false });
      },
    }),
    {
      name: 'user-profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
