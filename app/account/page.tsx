"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import { ProfilePhoto } from "@/components/custom/account/profile-photo";
import { PasswordUpdate } from "@/components/custom/account/password-update";
import { DeleteAccountDialog } from "@/components/custom/account/delete-account-dialog";
import { UserInfo } from "@/components/custom/account/user-info";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdatePassword = async (newPassword: string) => {
    try {
      setIsUpdatingPassword(true);
      
      const response = await fetch('/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update password');
      }

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      setShowPasswordFields(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = () => {
    router.push("/");
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-[#D4AF37]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#D4AF37]">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfilePhoto />
            <UserInfo />
            <PasswordUpdate
              showFields={showPasswordFields}
              onToggleFields={() => setShowPasswordFields(!showPasswordFields)}
              onUpdatePassword={handleUpdatePassword}
            />
            <DeleteAccountDialog onDelete={handleDeleteAccount} />
            <Button
              onClick={() => router.push("/registered-user-view")}
              variant="outline"
              className="w-full mt-4 border-[#D4AF37] text-[#D4AF37] 
                       hover:bg-[#D4AF37]/10 transition-colors"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
