"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";

interface PasswordUpdateProps {
  showFields: boolean;
  onToggleFields: () => void;
  onUpdatePassword: (newPassword: string) => void;
}

export function PasswordUpdate({ showFields, onToggleFields, onUpdatePassword }: PasswordUpdateProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handlePasswordUpdate = () => {
    setError("");
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      onUpdatePassword(newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={onToggleFields}
        variant="outline"
        className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
      >
        <KeyRound className="mr-2 h-4 w-4" />
        Update Password
      </Button>

      {showFields && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#D4AF37]">New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#D4AF37]">Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button
            onClick={handlePasswordUpdate}
            className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white"
          >
            Save Password
          </Button>
        </div>
      )}
    </div>
  );
} 