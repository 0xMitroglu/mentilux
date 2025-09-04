import { useEffect, useState } from 'react';
import { api } from '@/api/mockApi';
import { TokenUsage, StorageUsage } from '@/types';
import { ChartSkeleton, CardSkeleton } from '@/components/SkeletonLoader';
import { TrendingUp, HardDrive, BarChart3 } from 'lucide-react';

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null);
  const [storageUsage, setStorageUsage] = useState<StorageUsage | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tokens, storage] = await Promise.all([
          api.getResourcesTokenUsage(),
          api.getResourcesStorageUsage()
        ]);

        setTokenUsage(tokens);
        setStorageUsage(storage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="fade-in space-y-6">
        <h1 className="text-3xl font-bold">Resources</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const usagePercentage = ((tokenUsage?.used || 0) / (tokenUsage?.total || 1)) * 100;
  const storagePercentage = ((storageUsage?.usedGB || 0) / (storageUsage?.totalGB || 1)) * 100;

  return (
    <div className="fade-in space-y-6">
      <h1 className="text-3xl font-bold">Resources</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tokens Section */}
        <div className="bg-card border border-border rounded-xl p-6 slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Tokens</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">You have</p>
              <p className="text-3xl font-bold text-primary">{tokenUsage?.available.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">tokens available</p>
              
              {/* Projection */}
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  At this rate, you are projected to run out of tokens by the 4th of September!
                </p>
              </div>
            </div>

            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${usagePercentage * 2.512} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">Usage</span>
              </div>
            </div>
          </div>

          {/* Usage Analytics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{tokenUsage?.today.toLocaleString()}</span>
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">ℹ️</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">7 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{tokenUsage?.last7Days.toLocaleString()}</span>
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">ℹ️</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">31 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{tokenUsage?.last31Days.toLocaleString()}</span>
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">ℹ️</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 mt-6">
            <button className="flex-1 border border-border text-foreground py-2 rounded-lg hover:bg-muted/50 transition-smooth">
              See Plan
            </button>
            <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover-glow hover-scale transition-smooth">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Storage Section */}
        <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center space-x-2 mb-6">
            <HardDrive className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Storage</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{Math.round(storagePercentage)}%</span>
              <span className="text-sm text-muted-foreground">used</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden mb-4">
              <div className="h-full flex">
                <div 
                  className="bg-chart-blue transition-all duration-1000"
                  style={{ width: `${(storageUsage?.breakdown.images.sizeGB || 0) / (storageUsage?.totalGB || 1) * 100}%` }}
                />
                <div 
                  className="bg-chart-pink transition-all duration-1000"
                  style={{ width: `${(storageUsage?.breakdown.pdfs.sizeGB || 0) / (storageUsage?.totalGB || 1) * 100}%` }}
                />
                <div 
                  className="bg-chart-green transition-all duration-1000"
                  style={{ width: `${((storageUsage?.breakdown.text.sizeMB || 0) / 1000) / (storageUsage?.totalGB || 1) * 100}%` }}
                />
                <div 
                  className="bg-chart-yellow transition-all duration-1000"
                  style={{ width: `${((storageUsage?.breakdown.links.sizeKB || 0) / 1000000) / (storageUsage?.totalGB || 1) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold">{storageUsage?.usedGB} GB / {storageUsage?.totalGB} GB</p>
            </div>
          </div>

          {/* Storage Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-blue rounded-full" />
                <span className="text-sm">Links</span>
              </div>
              <span className="text-sm font-medium">{storageUsage?.breakdown.links.sizeKB}KB</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-green rounded-full" />
                <span className="text-sm">Text</span>
              </div>
              <span className="text-sm font-medium">{storageUsage?.breakdown.text.sizeMB}MB</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-pink rounded-full" />
                <span className="text-sm">PDFs</span>
              </div>
              <span className="text-sm font-medium">{storageUsage?.breakdown.pdfs.sizeGB}GB</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-chart-yellow rounded-full" />
                <span className="text-sm">Images</span>
              </div>
              <span className="text-sm font-medium">{storageUsage?.breakdown.images.sizeGB}GB</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-muted rounded-full" />
              <span className="text-sm text-muted-foreground">Free Space</span>
            </div>
            <p className="text-lg font-semibold">{storageUsage?.freeGB}GB of space remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}