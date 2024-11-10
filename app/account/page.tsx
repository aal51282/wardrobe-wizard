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
            <UserInfo email={userEmail} />
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
