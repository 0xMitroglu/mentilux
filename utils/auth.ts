import { User } from '@/types';

export const authUtils = {
  getUser(): User | null {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    
    return {
      username: userString,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userString}`
    };
  },

  setUser(username: string): void {
    localStorage.setItem('user', username);
  },

  logout(): void {
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
};