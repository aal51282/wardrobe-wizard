"use client";

import { useRouter } from 'next/navigation';
import styles from './SavedOutfits.module.css';

export default function SavedOutfitsPage() {
  const router = useRouter();

  return (
    <div className={styles.savedOutfitsContainer}>
      <h1 className={styles.pageTitle}>Not Implemented Yet</h1>
      <p className={styles.message}>This page is under construction. Check back later!</p>
      <button onClick={() => router.push('/user-view')} className={styles.backButton}>
        Back to User Page
      </button>
    </div>
  );
}
