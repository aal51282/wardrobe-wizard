"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, Check, X } from "lucide-react";

interface PasswordUpdateProps {
  showFields: boolean;
  onToggleFields: () => void;
  onUpdatePassword: (newPassword: string) => void;
}

interface PasswordValidation {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function PasswordUpdate({ 
  showFields, 
  onToggleFields, 
  onUpdatePassword 
}: PasswordUpdateProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [validation, setValidation] = useState<PasswordValidation>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    setValidation({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    validatePassword(newPass);
    setHasAttemptedSubmit(false);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setHasAttemptedSubmit(false);
  };

  const isPasswordValid = () => {
    return Object.values(validation).every(Boolean);
  };

  const handlePasswordUpdate = () => {
    setHasAttemptedSubmit(true);

    if (!isPasswordValid()) {
      toast({
        title: "Invalid Password",
        description: "Please meet all password requirements",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
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
      setHasAttemptedSubmit(false);
      onToggleFields();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    }
  };

  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={isValid ? "text-green-700" : "text-red-700"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setHasAttemptedSubmit(false);
          setNewPassword("");
          setConfirmPassword("");
          onToggleFields();
        }}
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
              onChange={handlePasswordChange}
              className={`border-2 ${
                hasAttemptedSubmit && !isPasswordValid() ? 'border-red-300' : ''
              }`}
            />
            <div className="mt-2 space-y-1">
              <ValidationItem 
                isValid={validation.hasMinLength} 
                text="At least 8 characters" 
              />
              <ValidationItem 
                isValid={validation.hasUpperCase} 
                text="One uppercase letter" 
              />
              <ValidationItem 
                isValid={validation.hasLowerCase} 
                text="One lowercase letter" 
              />
              <ValidationItem 
                isValid={validation.hasNumber} 
                text="One number" 
              />
              <ValidationItem 
                isValid={validation.hasSpecialChar} 
                text="One special character" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#D4AF37]">Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`border-2 ${
                hasAttemptedSubmit && confirmPassword !== newPassword ? 'border-red-300' : ''
              }`}
            />
            {hasAttemptedSubmit && confirmPassword !== newPassword && (
              <p className="text-sm text-red-500 mt-1">
                Passwords don&apos;t match
              </p>
            )}
          </div>

          <Button
            onClick={handlePasswordUpdate}
            className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white"
            disabled={!isPasswordValid() || !confirmPassword}
          >
            Save Password
          </Button>
        </div>
      )}
    </div>
  );
} 