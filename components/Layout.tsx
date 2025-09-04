import Link from "next/link";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { authUtils } from "@/utils/auth";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isAuthenticated = authUtils.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authContent}>
          <h1 className={styles.authTitle}>Please log in to access this page</h1>
          <div className={styles.authButtons}>
            <Link
              href="/login"
              className={styles.loginButton}>
              Log in
            </Link>
            <Link
              href="/signup"
              className={styles.signupButton}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
