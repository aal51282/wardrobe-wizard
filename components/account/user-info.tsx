"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface UserInfoProps {
  initialUsername?: string;
  email?: string;
}

export function UserInfo({ 
  initialUsername = "User's Username",
  email = "user@example.com" 
}: UserInfoProps) {
  const [username, setUsername] = useState(initialUsername);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const { toast } = useToast();

  const handleUsernameUpdate = () => {
    if (username.trim().length < 3) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 3 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically update the username in your database
    toast({
      title: "Success",
      description: "Username updated successfully!",
    });
    setIsEditingUsername(false);
  };

  return (
    <div className="space-y-4">
      {/* Editable Username Field */}
      <div className="space-y-2">
        <Label className="text-[#D4AF37] flex items-center gap-2">
          Username
          <button
            onClick={() => setIsEditingUsername(!isEditingUsername)}
            className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </Label>
        <div className="flex gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditingUsername}
            className={`${
              isEditingUsername 
                ? "bg-white border-[#D4AF37]" 
                : "bg-gray-50"
            }`}
          />
          {isEditingUsername && (
            <Button
              onClick={handleUsernameUpdate}
              className="bg-[#D4AF37] hover:bg-[#B4941F] text-white"
            >
              <Save className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

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
