"use client";

import { useRouter } from "next/navigation";
import styles from "./Analysis.module.css";

export default function AnalysisPage() {
  const router = useRouter();

  return (
    <div className={styles.analysisContainer}>
      <h1 className={styles.pageTitle}>Not Implemented Yet</h1>
      <p className={styles.message}>
        This page is under construction. Check back later!
      </p>
      <button
        onClick={() => router.push("/registered-user-view")}
        className={styles.backButton}
      >
        Back to User Page
      </button>
    </div>
  );
}
