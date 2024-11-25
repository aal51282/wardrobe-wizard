"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { signIn } from "next-auth/react";
import styles from "../../../app/login/Login.module.css";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Login successful",
        });
        router.push("/registered-user-view");
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>👤</span>
        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          disabled={isLoading}
          className={styles.input}
          required
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
          required
        />
      </div>

      <Button
        type="submit"
        className={styles.loginButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
