"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authUtils } from "@/utils/auth";
import styles from "./page.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      authUtils.setUser(username.trim());
      router.push("/dashboard");
    }
  };

  return (
    <div className={styles.minHScreen}>
      <div className={styles.wFullMaxWmd}>
        {/* Logo */}
        <div className={styles.textCenter}>
          <div className={`${styles.flexItemsCenterJustifyCenter} ${styles.spaceX2} ${styles.mb8}`}>
            <div
              className={`${styles.w10} ${styles.h10} ${styles.bgPrimary} ${styles.roundedLg} ${styles.flexItemsCenterJustifyCenter}`}>
              <span
                className={`${styles.textSm} ${styles.fontBold} ${styles.textPrimaryForeground}`}>
                M
              </span>
            </div>
            <span className={`${styles.text2xl} ${styles.fontBold} ${styles.textPrimary}`}>
              MENTILUX
            </span>
          </div>
          <h2 className={styles.text3xl}>Welcome back</h2>
          <p className={`${styles.mt2} ${styles.textMutedForeground}`}>Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.spaceY6}>
          <div>
            <label
              htmlFor="username"
              className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.mb2}`}>
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${styles.wFull} ${styles.px4} ${styles.py3} ${styles.bgInput} ${styles.border} ${styles.borderBorder} ${styles.roundedLg} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingPrimary50} ${styles.transitionSmooth}`}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`${styles.block} ${styles.textSm} ${styles.fontMedium} ${styles.mb2}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.wFull} ${styles.px4} ${styles.py3} ${styles.bgInput} ${styles.border} ${styles.borderBorder} ${styles.roundedLg} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingPrimary50} ${styles.transitionSmooth}`}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className={`${styles.wFull} ${styles.bgPrimary} ${styles.textPrimaryForeground} ${styles.py3} ${styles.roundedLg} ${styles.fontMedium} ${styles.hoverGlow} ${styles.hoverScale} ${styles.transitionSmooth}`}>
            Sign in
          </button>
        </form>

        {/* Sign up link */}
        <div className={styles.textCenter}>
          <span className={styles.textMutedForeground}>Need an account? </span>
          <Link
            href="/signup"
            className={`${styles.textPrimary} ${styles.hoverTextPrimary80} ${styles.fontMedium} ${styles.transitionSmooth}`}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
