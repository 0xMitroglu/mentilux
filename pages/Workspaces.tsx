import { useEffect, useState } from 'react';
import { api } from '@/api/mockApi';
import { Activity, Workspace } from '@/types';
import { CardSkeleton } from '@/components/SkeletonLoader';
import { FolderOpen, Users, Check } from 'lucide-react';

export default function Workspaces() {
  const [loading, setLoading] = useState(true);
  const [recentWorkspaces, setRecentWorkspaces] = useState<Activity[]>([]);
  const [personalWorkspaces, setPersonalWorkspaces] = useState<Workspace[]>([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState<Workspace[]>([]);
  const [activeTab, setActiveTab] = useState<'personal' | 'shared'>('personal');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recent, all] = await Promise.all([
          api.getRecentWorkspaces(),
          api.getWorkspaces()
        ]);

        // Convert recent workspaces to activity format
        const recentActivity = recent.map((workspace, index) => ({
          id: workspace.id,
          type: workspace.type === 'personal' ? 'workspace' as const : 'shared' as const,
          title: workspace.name,
          date: workspace.lastModified,
          icon: workspace.icon,
          collaborators: workspace.collaborators
        }));

        setRecentWorkspaces(recentActivity);
        setPersonalWorkspaces(all.filter(w => w.type === 'personal'));
        setSharedWorkspaces(all.filter(w => w.type === 'shared'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="fade-in space-y-6">
        <h1 className="text-3xl font-bold">Workspaces</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const currentWorkspaces = activeTab === 'personal' ? personalWorkspaces : sharedWorkspaces;

  return (
    <div className="fade-in space-y-6">
      <h1 className="text-3xl font-bold">Workspaces</h1>

      {/* Recent Section */}
      <div className="slide-up">
        <div className="flex items-center space-x-2 mb-4">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentWorkspaces.map((workspace) => (
            <div key={workspace.id} className="bg-card border border-border rounded-xl p-4 hover:bg-muted/30 hover-scale transition-smooth cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{workspace.icon}</div>
                <span className="text-xs text-muted-foreground">{workspace.date}</span>
              </div>
              <h3 className="font-semibold mb-1">{workspace.title}</h3>
              <div className="flex items-center space-x-2">
                {workspace.type === 'workspace' ? (
                  <>
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Personal</span>
                  </>
                ) : (
                  <>
                    <div className="flex -space-x-1">
                      {workspace.collaborators?.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-primary rounded-full border-2 border-card" />
                      ))}
                      {(workspace.collaborators?.length || 0) > 3 && (
                        <div className="w-6 h-6 bg-muted text-xs flex items-center justify-center rounded-full border-2 border-card">
                          +{(workspace.collaborators?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">Shared</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex space-x-6 mb-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-smooth ${
              activeTab === 'personal' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="font-medium">Personal</span>
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-smooth ${
              activeTab === 'shared' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="font-medium">Shared</span>
            <Check className="h-4 w-4" />
          </button>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentWorkspaces.map((workspace) => (
            <div key={workspace.id} className="bg-card border border-border rounded-xl p-4 hover:bg-muted/30 hover-scale transition-smooth cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{workspace.icon}</div>
                <span className="text-xs text-muted-foreground">{workspace.lastModified}</span>
              </div>
              
              <h3 className="font-semibold mb-2">{workspace.name}</h3>
              
              <div className="flex items-center justify-between">
                {workspace.type === 'personal' ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Personal</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      {workspace.collaborators?.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-primary rounded-full border-2 border-card" />
                      ))}
                      {(workspace.collaborators?.length || 0) > 3 && (
                        <div className="w-6 h-6 bg-muted text-xs flex items-center justify-center rounded-full border-2 border-card">
                          +{(workspace.collaborators?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">Shared</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}