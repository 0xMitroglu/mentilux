import { 
  mockTokenUsage, 
  mockStorageUsage, 
  mockBillingHistory, 
  mockRecentActivity, 
  mockWorkspaces, 
  mockNotifications 
} from '@/data/mockData';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Dashboard APIs
  async getTokenUsage() {
    await delay();
    return mockTokenUsage;
  },

  async getStorageUsage() {
    await delay();
    return mockStorageUsage;
  },

  async getBillingHistory() {
    await delay();
    return mockBillingHistory.slice(0, 1); // Latest entry for dashboard
  },

  async getRecentActivity() {
    await delay();
    return mockRecentActivity;
  },

  async getNotifications() {
    await delay();
    return mockNotifications;
  },

  // Workspaces APIs
  async getWorkspaces() {
    await delay();
    return mockWorkspaces;
  },

  async getRecentWorkspaces() {
    await delay();
    return mockWorkspaces.slice(0, 2); // Recent ones
  },

  // Resources APIs (same as dashboard but different endpoints for separation)
  async getResourcesTokenUsage() {
    await delay();
    return mockTokenUsage;
  },

  async getResourcesStorageUsage() {
    await delay();
    return mockStorageUsage;
  }
};