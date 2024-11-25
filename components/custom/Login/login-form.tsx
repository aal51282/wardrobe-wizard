"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import styles from "../../../app/login/Login.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/registered-user-view");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>📧</span>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          disabled={isLoading}
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>🔒</span>
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={isLoading}
          className={styles.input}
        />
      </div>

      <Button type="submit" className={styles.loginButton} disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </form>
  );
}
