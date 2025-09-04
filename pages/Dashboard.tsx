"use client";

import { useEffect, useState } from "react";
import { TokenUsage, StorageUsage, BillingEntry, Activity, Notification } from "@/types";
import CardSkeleton from "@/components/CardSkeleton";
import ChartSkeleton from "@/components/ChartSkeleton";
import ActivitySkeleton from "@/components/ActivitySkeleton";
import { TrendingUp, HardDrive, CreditCard, Clock, Bell } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null);
  const [storageUsage, setStorageUsage] = useState<StorageUsage | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingEntry[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls with delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockTokenUsage = {
          available: 17289,
          total: 20000,
          used: 8000,
          today: 2000,
          last7Days: 3289,
          last31Days: 7809,
        };
        const mockStorageUsage = {
          usedGB: 7.5,
          totalGB: 10,
          freeGB: 2.5,
          breakdown: {
            images: { sizeGB: 4, color: "#4A90E2" },
            pdfs: { sizeGB: 1.2, color: "#E94E77" },
            text: { sizeMB: 3.7, color: "#50E3C2" },
            links: { sizeKB: 1, color: "#F5A623" },
          },
        };
        const mockBillingHistory: BillingEntry[] = [
          {
            id: "1",
            planName: "Pro Plan",
            amount: "8.00€",
            date: "29/08/2025",
            paymentMethod: "visa",
          },
        ];
        const mockRecentActivity: Activity[] = [
          {
            id: "1",
            title: "Image to text",
            date: "03/09/2025",
            icon: "📷",
            collaborators: ["user1", "user2"],
            type: "image-to-text",
          },
          {
            id: "2",
            title: "Image to text",
            date: "01/09/2025",
            icon: "📷",
            collaborators: undefined,
            type: "image-to-text",
          },
        ];
        const mockNotifications: Notification[] = [];

        setTokenUsage(mockTokenUsage);
        setStorageUsage(mockStorageUsage);
        setBillingHistory(mockBillingHistory);
        setRecentActivity(mockRecentActivity);
        setNotifications(mockNotifications);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.fadeIn}>
        <h1 className={styles.text3xl}>Dashboard</h1>
        <div className={styles.gridCols1MdCols3}>
          <ChartSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className={styles.gridCols1LgCols2}>
          <ActivitySkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fadeIn}>
      <h1 className={styles.text3xl}>Dashboard</h1>

      {/* Top Stats Row */}
      <div className={styles.gridCols1MdCols3}>
        {/* Tokens */}
        <div className={styles.bgCard}>
          <div className={styles.flexSpaceX2}>
            <TrendingUp className={styles.textPrimary} />
            <h2 className={styles.textLg}>Tokens</h2>
          </div>
          <div className={styles.flexJustifyBetween}>
            <div>
              <p className={styles.textSm}>You have</p>
              <p className={styles.text2xl}>{tokenUsage?.available.toLocaleString()}</p>
              <p className={styles.textSm}>tokens available</p>
            </div>
            <div className={styles.relativeW24}>
              <svg className={styles.w24} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#2D2D2D" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FF6F00"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${
                    ((tokenUsage?.used || 0) / (tokenUsage?.total || 1)) * 251.2
                  } 251.2`}
                  className={styles.transitionAll}
                />
              </svg>
              <div className={styles.absoluteCenter}>
                <span className={styles.textXs}>Usage</span>
              </div>
            </div>
          </div>
          <div className={styles.spaceY2}>
            <div className={styles.flexJustifyBetween}>
              <span className={styles.textSm}>Today</span>
              <span>{tokenUsage?.today.toLocaleString()}</span>
            </div>
            <div className={styles.flexJustifyBetween}>
              <span className={styles.textSm}>7 days</span>
              <span>{tokenUsage?.last7Days.toLocaleString()}</span>
            </div>
            <div className={styles.flexJustifyBetween}>
              <span className={styles.textSm}>31 days</span>
              <span>{tokenUsage?.last31Days.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className={styles.bgCard}>
          <div className={styles.flexSpaceX2}>
            <HardDrive className={styles.textPrimary} />
            <h2 className={styles.textLg}>Storage</h2>
          </div>
          <div className={styles.mb4}>
            <div className={styles.flexJustifyBetween}>
              <span className={styles.textSm}>{storageUsage?.usedGB} GB used</span>
              <span className={styles.textSm}>
                {storageUsage?.usedGB} GB / {storageUsage?.totalGB} GB
              </span>
            </div>
            <div className={styles.wFull}>
              <div
                className={styles.bgMuted}
                style={{
                  width: `${((storageUsage?.usedGB || 0) / (storageUsage?.totalGB || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className={styles.spaceY2}>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.images.color }}
                />
                <span className={styles.textSm}>Images</span>
              </div>
              <span>{storageUsage?.breakdown.images.sizeGB}GB</span>
            </div>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.pdfs.color }}
                />
                <span className={styles.textSm}>PDFs</span>
              </div>
              <span>{storageUsage?.breakdown.pdfs.sizeGB}GB</span>
            </div>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.text.color }}
                />
                <span className={styles.textSm}>Text</span>
              </div>
              <span>{storageUsage?.breakdown.text.sizeMB}MB</span>
            </div>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.links.color }}
                />
                <span className={styles.textSm}>Links</span>
              </div>
              <span>{storageUsage?.breakdown.links.sizeKB}KB</span>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className={styles.bgCard}>
          <div className={styles.flexJustifyBetween}>
            <div className={styles.flexSpaceX2}>
              <CreditCard className={styles.textPrimary} />
              <h2 className={styles.textLg}>Billing History</h2>
            </div>
          </div>
          {billingHistory.map((entry) => (
            <div key={entry.id} className={styles.p3}>
              <div className={styles.flexSpaceX3}>
                <div className={styles.bgPrimary}>{entry.paymentMethod}</div>
                <div>
                  <p className={styles.fontMedium}>
                    {entry.planName} - {entry.amount}
                  </p>
                  <p className={styles.textSm}> {entry.date}</p>
                </div>
              </div>
              <button className={styles.textXs}>Download</button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.gridCols1LgCols2}>
        {/* Recent Activity */}
        <div className={styles.bgCard}>
          <div className={styles.flexSpaceX2}>
            <Clock className={styles.textPrimary} />
            <h2 className={styles.textLg}>Recent Activity</h2>
          </div>
          <div className={styles.spaceY3}>
            {recentActivity.map((activity) => (
              <div key={activity.id} className={styles.p3}>
                <div className={styles.flexSpaceX3}>
                  <div className={styles.textXl}>{activity.icon}</div>
                  <div className={styles.flex1}>
                    <p className={styles.fontMedium}>{activity.title}</p>
                    <p className={styles.textSm}>{activity.date}</p>
                  </div>
                  {activity.collaborators && (
                    <div className={styles.textXs}>+{activity.collaborators.length}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className={styles.bgCard}>
          <div className={styles.flexJustifyBetween}>
            <div className={styles.flexSpaceX2}>
              <Bell className={styles.textPrimary} />
              <h2 className={styles.textLg}>Notifications</h2>
            </div>
            <button className={styles.bgPrimary}>See full history</button>
          </div>
          <div className={styles.textCenter}>No new notifications</div>
        </div>
      </div>
    </div>
  );
}
