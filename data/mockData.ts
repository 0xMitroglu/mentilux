import { TokenUsage, StorageUsage, BillingEntry, Activity, Workspace, Notification } from '@/types';

export const mockTokenUsage: TokenUsage = {
  total: 17289,
  used: 8000,
  available: 9289,
  today: 1893,
  last7Days: 3289,
  last31Days: 7809
};

export const mockStorageUsage: StorageUsage = {
  totalGB: 10,
  usedGB: 7.5,
  freeGB: 2.5,
  breakdown: {
    images: { sizeGB: 4, color: '#4A90E2' },
    pdfs: { sizeGB: 1.2, color: '#E94E77' },
    text: { sizeMB: 3.7, color: '#50E3C2' },
    links: { sizeKB: 1, color: '#F5A623' }
  }
};

export const mockBillingHistory: BillingEntry[] = [
  {
    id: '1',
    planName: 'Pro Plan',
    amount: '8.00€',
    date: '29/08/2025',
    paymentMethod: 'visa'
  },
  {
    id: '2', 
    planName: 'Pro Plan',
    amount: '8.00€',
    date: '29/07/2025',
    paymentMethod: 'visa'
  },
  {
    id: '3',
    planName: 'Pro Plan', 
    amount: '8.00€',
    date: '29/06/2025',
    paymentMethod: 'visa'
  }
];

export const mockRecentActivity: Activity[] = [
  {
    id: '1',
    type: 'image-to-text',
    title: 'Image to text',
    date: '03/09/2025',
    icon: '📸'
  },
  {
    id: '2',
    type: 'image-to-text', 
    title: 'Image to text',
    date: '02/09/2025',
    icon: '📸'
  },
  {
    id: '3',
    type: 'image-to-text',
    title: 'Image to text', 
    date: '01/09/2025',
    icon: '📸'
  },
  {
    id: '4',
    type: 'workspace',
    title: 'TeaBound',
    date: 'Personal',
    icon: '👤'
  },
  {
    id: '5',
    type: 'shared',
    title: 'IBA - 2025',
    date: 'Shared',
    icon: '☁️',
    collaborators: ['user1', 'user2', 'user3']
  }
];

export const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Image to text',
    type: 'personal',
    owner: 'Timothy',
    lastModified: '03/09/2025',
    icon: '📸'
  },
  {
    id: '2', 
    name: 'Image to text',
    type: 'shared',
    owner: 'Timothy',
    collaborators: ['user1', 'user2'],
    lastModified: '03/09/2025',
    icon: '📸'
  },
  {
    id: '3',
    name: 'TeaBound',
    type: 'personal', 
    owner: 'Timothy',
    lastModified: '02/09/2025',
    icon: '👤'
  },
  {
    id: '4',
    name: 'IBA - 2025',
    type: 'shared',
    owner: 'Timothy',
    collaborators: ['user1', 'user2', 'user3'],
    lastModified: '01/09/2025', 
    icon: '☁️'
  },
  {
    id: '5',
    name: 'TeaBound',
    type: 'personal',
    owner: 'Timothy',
    lastModified: '31/08/2025',
    icon: '👤'
  },
  {
    id: '6',
    name: 'TeaBound', 
    type: 'personal',
    owner: 'Timothy',
    lastModified: '30/08/2025',
    icon: '👤'
  }
];

export const mockNotifications: Notification[] = [];