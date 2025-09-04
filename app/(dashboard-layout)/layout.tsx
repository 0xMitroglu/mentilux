"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Please log in to access this page</h2>
          <div className={styles.buttons}>
            <Link
              href="/login"
              className={styles.loginButton}>
              Login
            </Link>
            <Link
              href="/signup"
              className={styles.signupButton}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Layout>{children}</Layout>;
}
