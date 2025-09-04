export interface User {
  username: string;
  avatar?: string;
}

export interface TokenUsage {
  total: number;
  used: number;
  available: number;
  today: number;
  last7Days: number;
  last31Days: number;
}

export interface StorageUsage {
  totalGB: number;
  usedGB: number;
  freeGB: number;
  breakdown: {
    images: { sizeGB: number; color: string };
    pdfs: { sizeGB: number; color: string };
    text: { sizeMB: number; color: string };
    links: { sizeKB: number; color: string };
  };
}

export interface BillingEntry {
  id: string;
  planName: string;
  amount: string;
  date: string;
  paymentMethod: 'visa' | 'mastercard';
}

export interface Activity {
  id: string;
  type: 'image-to-text' | 'workspace' | 'shared';
  title: string;
  date: string;
  icon: string;
  collaborators?: string[];
}

export interface Workspace {
  id: string;
  name: string;
  type: 'personal' | 'shared';
  owner: string;
  collaborators?: string[];
  lastModified: string;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}