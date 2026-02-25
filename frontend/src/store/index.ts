import { create } from 'zustand';
import { IDashboardMetrics } from '../types';

interface DashboardStore {
  metrics: IDashboardMetrics | null;
  setMetrics: (metrics: IDashboardMetrics) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  metrics: null,
  setMetrics: (metrics) => set({ metrics }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

interface AuthStore {
  token: string | null;
  user: any | null;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
