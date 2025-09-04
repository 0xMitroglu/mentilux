"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Database,
  CreditCard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { authUtils } from "@/utils/auth";
import { cn } from "@/lib/utils";
import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Workspaces", href: "/workspaces", icon: FolderOpen },
  { name: "Resources", href: "/resources", icon: Database },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
    document.documentElement.style.setProperty(
      "--sidebar-width",
      saved === "true" ? "var(--sidebar-width-collapsed)" : "18rem"
    );
  }, []);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
    document.documentElement.style.setProperty(
      "--sidebar-width",
      next ? "var(--sidebar-width-collapsed)" : "18rem"
    );
  };

  const handleLogout = () => {
    authUtils.logout();
    router.push("/login");
  };

  return (
    <div className={cn(styles.sidebar, collapsed && styles.sidebarCollapsed)}>
      {/* Logo and Toggle */}
      <div className={cn(styles.logo, collapsed && styles.logoCollapsed)}>
        <div className={cn(styles.logoContainer, collapsed && styles.logoContainerCollapsed)}>
          <Image
            src="/logo.svg"
            alt="Mentilux Logo"
            width={32}
            height={32}
            className={cn(styles.logoImg, collapsed && styles.logoImgHidden)}
            priority
          />
          <span className={cn(styles.logoText, collapsed && styles.logoTextHidden)}>MENTILUX</span>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={handleToggle}
            className={cn(styles.toggleBtn, collapsed && styles.toggleBtnCollapsed)}>
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(styles.nav, collapsed && styles.navCollapsed)}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                styles.navLink,
                collapsed && styles.navIconOnly,
                isActive ? styles.navLinkActive : styles.navLinkInactive
              )}>
              <Icon className={cn(styles.navIcon, collapsed && styles.navIconCollapsed)} />
              <span className={cn(collapsed && styles.navTextHidden)}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={cn(styles.footer, collapsed && styles.footerCollapsed)}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut className={cn(styles.logoutIcon, collapsed && styles.logoutIconCollapsed)} />
          <span className={cn(collapsed && styles.navTextHidden)}>Log out</span>
        </button>
      </div>
    </div>
  );
}
