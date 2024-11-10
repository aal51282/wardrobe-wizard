"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface UserInfoProps {
  email?: string;
}

export function UserInfo({ 
  email = "user@example.com" 
}: UserInfoProps) {
  return (
    <div className="space-y-4">
      {/* Non-editable Email Field */}
      <div className="space-y-2">
        <Label className="text-[#D4AF37] flex items-center gap-2">
          Email
          <Mail className="h-4 w-4 text-[#D4AF37]/70" />
        </Label>
        <div className="relative">
          <Input
            value={email}
            disabled
            className="bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-xs text-gray-500">Cannot be changed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
