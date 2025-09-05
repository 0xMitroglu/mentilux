"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { authUtils } from "@/utils/auth";
import { useState } from "react";
import styles from "./TopBar.module.css";

export default function TopBar() {
  const user = authUtils.getUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={styles.topBar}>
      {/* Left side */}
      <h1>Dashboard</h1>

      {/* Right side */}

      <div className={styles.rightSide}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search" className={styles.searchInput} />
          </div>
        </div>
        {/* Notifications */}
        <button className={styles.notificationButton}>
          <Bell className={styles.notificationIcon} />
        </button>
        {/* User Profile */}
        <div className={styles.userProfile}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.userButton}>
            <img src={user?.avatar} alt={user?.username} className={styles.userAvatar} />
            <span className={styles.userName}>{user?.username}</span>
            <ChevronDown className={styles.chevronIcon} />
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>{user?.username}</div>
              <button
                onClick={() => {
                  authUtils.logout();
                  window.location.reload();
                }}
                className={styles.dropdownButton}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
