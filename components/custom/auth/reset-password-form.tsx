"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ResetPasswordFormState {
  loginName: string;
  isUserValid: boolean;
  newPassword: string;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<ResetPasswordFormState>({
    loginName: '',
    isUserValid: false,
    newPassword: '',
  });

  const handleLoginNameSubmit = () => {
    // Placeholder: Check if loginName exists in the database
    if (formState.loginName === "existingUser") {
      setFormState(prev => ({ ...prev, isUserValid: true }));
    } else {
      // TODO: Replace with proper error handling
      alert("User does not exist.");
    }
  };

  const handlePasswordReset = () => {
    // Placeholder: Update the user's password in the database
    console.log(`Password for ${formState.loginName} updated to: ${formState.newPassword}`);
    alert("Password has been reset successfully!");
    router.push('/login');
  };

  return (
    <Card className="w-full max-w-md border-[#D4AF37] bg-white/80 backdrop-blur-sm
                    shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-[#D4AF37]">
          Reset Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!formState.isUserValid ? (
          // Step 1: Login name input
          <div className="space-y-2">
            <Label htmlFor="loginName" className="text-[#D4AF37]">
              Enter your login name
            </Label>
            <Input
              id="loginName"
              type="text"
              value={formState.loginName}
              onChange={(e) => setFormState(prev => ({ ...prev, loginName: e.target.value }))}
              placeholder="Login Name"
              className="border-[#D4AF37] bg-white/50 focus:ring-[#D4AF37]"
            />
            <Button
              onClick={handleLoginNameSubmit}
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white
                       transition-colors duration-300"
            >
              Continue
            </Button>
          </div>
        ) : (
          // Step 2: New password input
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-[#D4AF37]">
              Enter your new password
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={formState.newPassword}
              onChange={(e) => setFormState(prev => ({ ...prev, newPassword: e.target.value }))}
              placeholder="New Password"
              className="border-[#D4AF37] bg-white/50 focus:ring-[#D4AF37]"
            />
            <Button
              onClick={handlePasswordReset}
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white
                       transition-colors duration-300"
            >
              Reset Password
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 