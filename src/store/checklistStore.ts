import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuyingTask } from '../types';

interface ChecklistState {
  tasks: BuyingTask[];
  addTask: (task: Omit<BuyingTask, 'id' | 'status' | 'timestamp'>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => {
        set({
          tasks: [
            ...get().tasks,
            {
              ...task,
              id: Date.now().toString(),
              status: 'pending',
              timestamp: new Date().toISOString(),
            },
          ],
        });
      },

      toggleTask: (id: string) => {
        set({
          tasks: get().tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
          ),
        });
      },

      removeTask: (id: string) => {
        set({ tasks: get().tasks.filter(t => t.id !== id) });
      },
    }),
    {
      name: 'buying-checklist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
