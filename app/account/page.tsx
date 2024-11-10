"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePhoto } from "@/components/account/profile-photo";
import { PasswordUpdate } from "@/components/account/password-update";
import { DeleteAccountDialog } from "@/components/account/delete-account-dialog";
import { UserInfo } from "@/components/account/user-info";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string>(
    "/default-avatar.png"
  );
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const userEmail = "user@example.com"; // This would come from your auth system

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfilePhoto(imageUrl);
    toast({
      title: "Success",
      description: "Profile photo updated successfully",
    });
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
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
            <ProfilePhoto
              photoUrl={profilePhoto}
              onPhotoUpload={handlePhotoUpload}
            />
            <UserInfo initialUsername="User's Username" email={userEmail} />
            <PasswordUpdate
              showFields={showPasswordFields}
              onToggleFields={() => setShowPasswordFields(!showPasswordFields)}
              onUpdatePassword={(password) =>
                console.log("Update password:", password)
              }
            />
            <DeleteAccountDialog
              userEmail={userEmail}
              onDelete={handleDeleteAccount}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
