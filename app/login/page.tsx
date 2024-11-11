"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/custom/Login/login-form";
import { BrandSection } from "@/components/custom/Login/brand-section";
import { Divider } from "@/components/custom/Login/divider";
import Link from "next/link";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();

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
            <LoginForm />

            <div className="mt-4 text-center text-sm">
              <Link
                href="/reset-password"
                className="text-amber-600 hover:text-amber-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Divider />

            <Button
              variant="outline"
              className={styles.registerButton}
              onClick={() => router.push("/register")}
            >
              Register new account
            </Button>
          </CardContent>
        </Card>

        <BrandSection />
      </div>
    </div>
  );
}
