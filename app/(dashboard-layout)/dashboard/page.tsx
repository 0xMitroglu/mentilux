"use client";

import { useEffect, useState } from "react";
import { TokenUsage, StorageUsage, BillingEntry, Activity, Notification } from "@/types";
import CardSkeleton from "@/components/CardSkeleton";
import ChartSkeleton from "@/components/ChartSkeleton";
import ActivitySkeleton from "@/components/ActivitySkeleton";
import { TrendingUp, HardDrive, CreditCard, Clock, Bell, DollarSign } from "lucide-react";
import styles from "./page.module.css";
import Image from "next/image";

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
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockTokenUsage = {
          available: 17289,
          total: 20000,
          used: 8000,
          today: 2000,
          last7Days: 2000,
          last31Days: 2000,
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

  const usagePercentage = ((tokenUsage?.used || 0) / (tokenUsage?.total || 1)) * 100;

  return (
    <div className={styles.fadeIn}>
      <div className={styles.twoCols}>
        {/* LEFT COLUMN */}
        <div className={styles.leftCol}>
          {/* Row 1: Tokens + Storage */}
          <div className={styles.rowCards}>
            <div className={styles.col + " " + styles.colMdThird + " " + styles.tokenMin}>
              <div className={styles.tokenCard}>
                <div className={styles.tokenLeft}>
                  <div className={styles.tokenHeader}>
                    <div className={styles.tokenIcon}>
                      <Image src="/icons/token-icon.png" alt="Tokens" width={30} height={30} />
                    </div>
                    <div className={styles.tokenTitle}>Tokens</div>
                  </div>

                  <div className={styles.tokenList}>
                    <div className={styles.tokenRow}>
                      <span className={styles.bullet} />
                      <span className={styles.tokenNumber}>
                        {tokenUsage?.total.toLocaleString()}
                      </span>
                      <span className={styles.tokenLabel}>in total</span>
                    </div>
                    <div className={styles.tokenRow}>
                      <span className={styles.bullet} />
                      <span className={styles.tokenNumber}>
                        {tokenUsage?.used.toLocaleString()}
                      </span>
                      <span className={styles.tokenLabel}>used this month</span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button className={styles.btnGhost}>Details</button>
                    <button className={styles.btnPrimaryGrad}>Upgrade</button>
                  </div>
                </div>

                <div>
                  <div className={styles.donutWrap}>
                    <svg className={styles.donutSvg} viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#15120e"
                        strokeWidth="10"
                        fill="none"
                      />
                      {/* last 31 days */}
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#6b2c07"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`70 276`}
                        transform="rotate(-90 60 60)"
                      />
                      {/* last 7 days */}
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#a9470a"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`50 276`}
                        transform="rotate(-20 60 60)"
                      />
                      {/* today */}
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#d25106"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`30 276`}
                        transform="rotate(20 60 60)"
                      />
                    </svg>
                  </div>

                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendBullet} ${styles.legendBulletToday}`} />
                      <span className={styles.legendLabel}>Today</span>
                      <span className={styles.legendValue}>
                        {tokenUsage?.today.toLocaleString()}
                      </span>
                      <span className={styles.legendBadge}>$</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendBullet} ${styles.legendBullet7}`} />
                      <span className={styles.legendLabel}>Last 7 days</span>
                      <span className={styles.legendValue}>
                        {tokenUsage?.last7Days.toLocaleString()}
                      </span>
                      <span className={styles.legendBadge}>$</span>
                    </div>
                    <div className={styles.legendItem}>
                      <span className={`${styles.legendBullet} ${styles.legendBullet31}`} />
                      <span className={styles.legendLabel}>Last 31 days</span>
                      <span className={styles.legendValue}>
                        {tokenUsage?.last31Days.toLocaleString()}
                      </span>
                      <span className={styles.legendBadge}>$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.col + " " + styles.colMdThird + " " + styles.storageMin}>
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
                        width: `${
                          ((storageUsage?.usedGB || 0) / (storageUsage?.totalGB || 1)) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Recent Activity full width */}
          <div className={styles.recentMin}>
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
          </div>

          {/* Row 3: Notifications full width */}
          <div className={styles.notifyMin}>
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

        {/* RIGHT COLUMN */}
        <div className={styles.rightCol}>
          <div className={styles.bgCard + " " + styles.billingCard}>
            <div className={styles.flexSpaceX2}>
              <CreditCard className={styles.textPrimary} />
              <h2 className={styles.textLg}>Billing History</h2>
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
      </div>
    </div>
  );
}
