"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/mockApi";
import { TokenUsage, StorageUsage } from "@/types";
import { ChartSkeleton, CardSkeleton } from "@/components/SkeletonLoader";
import { TrendingUp, HardDrive, BarChart3 } from "lucide-react";
import styles from "./page.module.css";

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null);
  const [storageUsage, setStorageUsage] = useState<StorageUsage | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const [tokens, storage] = await Promise.all([
          api.getResourcesTokenUsage(),
          api.getResourcesStorageUsage(),
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
      <div className={styles.fadeIn}>
        <h1 className={styles.text3xl}>Resources</h1>
        <div className={styles.gridCols1LgCols2}>
          <ChartSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const usagePercentage = ((tokenUsage?.used || 0) / (tokenUsage?.total || 1)) * 100;
  const storagePercentage = ((storageUsage?.usedGB || 0) / (storageUsage?.totalGB || 1)) * 100;

  return (
    <div className={styles.fadeIn}>
      <h1 className={styles.text3xl}>Resources</h1>

      <div className={styles.gridCols1LgCols2}>
        {/* Tokens Section */}
        <div className={styles.bgCard}>
          <div className={styles.flexJustifyBetween}>
            <div className={styles.flexSpaceX2}>
              <TrendingUp className={styles.textPrimary} />
              <h2 className={styles.textLg}>Tokens</h2>
            </div>
            <BarChart3 className={styles.textMutedForeground} />
          </div>

          <div className={styles.flexJustifyBetween}>
            <div>
              <p className={styles.textSm}>You have</p>
              <p className={styles.text3xl}>{tokenUsage?.available.toLocaleString()}</p>
              <p className={styles.textSm}>tokens available</p>

              {/* Projection */}
              <div className={styles.mt4}>
                <p className={styles.textSm}>
                  At this rate, you are projected to run out of tokens by the 4th of September!
                </p>
              </div>
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
                  strokeDasharray={`${usagePercentage * 2.512} 251.2`}
                  className={styles.transitionAll}
                />
              </svg>
              <div className={styles.absoluteCenter}>
                <span className={styles.textXs}>Usage</span>
              </div>
            </div>
          </div>

          {/* Usage Analytics */}
          <div className={styles.spaceY3}>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div className={styles.w2} />
                <span className={styles.textSm}>Today</span>
              </div>
              <div className={styles.flexSpaceX2}>
                <span className={styles.fontMedium}>{tokenUsage?.today.toLocaleString()}</span>
                <div className={styles.textXs}>ℹ️</div>
              </div>
            </div>

            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div className={styles.w2} />
                <span className={styles.textSm}>7 days</span>
              </div>
              <div className={styles.flexSpaceX2}>
                <span className={styles.fontMedium}>{tokenUsage?.last7Days.toLocaleString()}</span>
                <div className={styles.textXs}>ℹ️</div>
              </div>
            </div>

            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div className={styles.w2} />
                <span className={styles.textSm}>31 days</span>
              </div>
              <div className={styles.flexSpaceX2}>
                <span className={styles.fontMedium}>{tokenUsage?.last31Days.toLocaleString()}</span>
                <div className={styles.textXs}>ℹ️</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className={styles.flexSpaceX3}>
            <button className={styles.borderButton}>See Plan</button>
            <button className={styles.primaryButton}>Upgrade Plan</button>
          </div>
        </div>

        {/* Storage Section */}
        <div className={styles.bgCard}>
          <div className={styles.flexSpaceX2}>
            <HardDrive className={styles.textPrimary} />
            <h2 className={styles.textLg}>Storage</h2>
          </div>

          <div className={styles.mb4}>
            <div className={styles.flexJustifyBetween}>
              <span className={styles.text2xl}>{Math.round(storagePercentage)}%</span>
              <span className={styles.textSm}>used</span>
            </div>

            <div className={styles.wFull}>
              <div
                className={styles.bgMuted}
                style={{
                  width: `${storagePercentage}%`,
                }}
              />
            </div>
          </div>

          <div className={styles.textCenter}>
            <p className={styles.textLg}>
              {storageUsage?.usedGB} GB / {storageUsage?.totalGB} GB
            </p>
          </div>

          {/* Storage Breakdown */}
          <div className={styles.spaceY3}>
            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.images.color }}
                />
                <span className={styles.textSm}>Images</span>
              </div>
              <span className={styles.textSm}>{storageUsage?.breakdown.images.sizeGB}GB</span>
            </div>

            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.pdfs.color }}
                />
                <span className={styles.textSm}>PDFs</span>
              </div>
              <span className={styles.textSm}>{storageUsage?.breakdown.pdfs.sizeGB}GB</span>
            </div>

            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.text.color }}
                />
                <span className={styles.textSm}>Text</span>
              </div>
              <span className={styles.textSm}>{storageUsage?.breakdown.text.sizeMB}MB</span>
            </div>

            <div className={styles.flexJustifyBetween}>
              <div className={styles.flexSpaceX2}>
                <div
                  className={styles.w3}
                  style={{ backgroundColor: storageUsage?.breakdown.links.color }}
                />
                <span className={styles.textSm}>Links</span>
              </div>
              <span className={styles.textSm}>{storageUsage?.breakdown.links.sizeKB}KB</span>
            </div>
          </div>

          <div className={styles.borderTop}>
            <div className={styles.flexSpaceX2}>
              <div className={styles.w2} />
              <span className={styles.textSm}>Free Space</span>
            </div>
            <p className={styles.textLg}>{storageUsage?.freeGB}GB of space remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
