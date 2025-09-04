"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/mockApi";
import { Activity, Workspace } from "@/types";
import { CardSkeleton } from "@/components/SkeletonLoader";
import { FolderOpen, Users, Check } from "lucide-react";
import styles from "./page.module.css";

export default function Workspaces() {
  const [loading, setLoading] = useState(true);
  const [recentWorkspaces, setRecentWorkspaces] = useState<Activity[]>([]);
  const [personalWorkspaces, setPersonalWorkspaces] = useState<Workspace[]>([]);
  const [sharedWorkspaces, setSharedWorkspaces] = useState<Workspace[]>([]);
  const [activeTab, setActiveTab] = useState<"personal" | "shared">("personal");

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const [recent, all] = await Promise.all([api.getRecentWorkspaces(), api.getWorkspaces()]);

        // Convert recent workspaces to activity format
        const recentActivity = recent.map((workspace, index) => ({
          id: workspace.id,
          type: workspace.type === "personal" ? ("workspace" as const) : ("shared" as const),
          title: workspace.name,
          date: workspace.lastModified,
          icon: workspace.icon,
          collaborators: workspace.collaborators,
        }));

        setRecentWorkspaces(recentActivity);
        setPersonalWorkspaces(all.filter((w) => w.type === "personal"));
        setSharedWorkspaces(all.filter((w) => w.type === "shared"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.fadeIn}>
        <h1 className={styles.text3xl}>Workspaces</h1>
        <div className={styles.gridCols1MdCols2LgCols4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const currentWorkspaces = activeTab === "personal" ? personalWorkspaces : sharedWorkspaces;

  return (
    <div className={styles.fadeIn}>
      <h1 className={styles.text3xl}>Workspaces</h1>

      {/* Recent Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <FolderOpen className={styles.textPrimary} />
          <h2 className={styles.textLg}>Recent</h2>
        </div>

        <div className={styles.gridCols1MdCols2}>
          {recentWorkspaces.map((workspace) => (
            <div key={workspace.id} className={styles.workspaceCard}>
              <div className={styles.workspaceHeader}>
                <div className={styles.workspaceIcon}>{workspace.icon}</div>
                <span className={styles.workspaceDate}>{workspace.date}</span>
              </div>
              <h3 className={styles.workspaceTitle}>{workspace.title}</h3>
              <div className={styles.workspaceType}>
                {workspace.type === "workspace" ? (
                  <>
                    <div className={styles.personalBadge}>
                      <span className={styles.textXs}>👤</span>
                    </div>
                    <span className={styles.workspaceTypeText}>Personal</span>
                  </>
                ) : (
                  <>
                    <div className={styles.collaborators}>
                      {workspace.collaborators?.slice(0, 3).map((_, i) => (
                        <div key={i} className={styles.collaboratorAvatar} />
                      ))}
                      {(workspace.collaborators?.length || 0) > 3 && (
                        <div className={styles.moreCollaborators}>
                          +{(workspace.collaborators?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <span className={styles.workspaceTypeText}>Shared</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsSection}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("personal")}
            className={`${styles.tab} ${
              activeTab === "personal" ? styles.tabActive : styles.tabInactive
            }`}>
            <span className={styles.tabText}>Personal</span>
            <Check className={styles.tabIcon} />
          </button>
          <button
            onClick={() => setActiveTab("shared")}
            className={`${styles.tab} ${
              activeTab === "shared" ? styles.tabActive : styles.tabInactive
            }`}>
            <span className={styles.tabText}>Shared</span>
            <Check className={styles.tabIcon} />
          </button>
        </div>

        {/* Workspace Grid */}
        <div className={styles.gridCols1MdCols2LgCols4}>
          {currentWorkspaces.map((workspace) => (
            <div key={workspace.id} className={styles.workspaceCard}>
              <div className={styles.workspaceHeader}>
                <div className={styles.workspaceIcon}>{workspace.icon}</div>
                <span className={styles.workspaceDate}>{workspace.lastModified}</span>
              </div>

              <h3 className={styles.workspaceTitle}>{workspace.name}</h3>

              <div className={styles.workspaceType}>
                {workspace.type === "personal" ? (
                  <div className={styles.workspaceTypeContent}>
                    <div className={styles.personalBadge}>
                      <span className={styles.textXs}>👤</span>
                    </div>
                    <span className={styles.workspaceTypeText}>Personal</span>
                  </div>
                ) : (
                  <div className={styles.workspaceTypeContent}>
                    <div className={styles.collaborators}>
                      {workspace.collaborators?.slice(0, 3).map((_, i) => (
                        <div key={i} className={styles.collaboratorAvatar} />
                      ))}
                      {(workspace.collaborators?.length || 0) > 3 && (
                        <div className={styles.moreCollaborators}>
                          +{(workspace.collaborators?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <span className={styles.workspaceTypeText}>Shared</span>
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
