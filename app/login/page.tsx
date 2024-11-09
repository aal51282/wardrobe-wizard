"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import styles from './Login.module.css';

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/user-view');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <Card className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="Wardrobe Wizard Logo"
              width={80}
              height={80}
              priority
              className={styles.logoImage}
            />
          </div>
          
          <h1 className={styles.loginTitle}>Login</h1>
          <p className={styles.subtitle}>Sign in to your account</p>

          <CardContent>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <span className={styles.icon}>👤</span>
                <Input
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  className={styles.input}
                />
              </div>

              <Button 
                type="submit" 
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <Link 
                href="/reset-password" 
                className="text-amber-600 hover:text-amber-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className={styles.registerButton}
              onClick={() => router.push('/register')}
            >
              Register new account
            </Button>
          </CardContent>
        </Card>

        <div className={styles.brandSection}>
          <div className={styles.brandContent}>
            <Image
              src="/logo.png"
              alt="Wardrobe Wizard"
              width={400}
              height={400}
              priority
              className={styles.brandImage}
            />
            <h1 className={styles.brandTitle}>Wardrobe Wizard</h1>
            <p className={styles.brandTagline}>Don't get mad, get Wardrobe Wizard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
