"use client";

import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export function ProfilePhoto() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [photoUrl, setPhotoUrl] = useState("/default-avatar.png");

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'wardrobe-wizard'); // Create this preset in your Cloudinary dashboard

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dia5ivuqq/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "File must be an image",
          variant: "destructive",
        });
        return;
      }

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Update user profile in database
      const response = await fetch('/api/users/update-photo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoUrl: cloudinaryUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile photo');
      }

      // Update local state
      setPhotoUrl(cloudinaryUrl);

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          image: cloudinaryUrl,
        },
      });

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile photo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        <Image
          src={photoUrl}
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-[#D4AF37]"
        />
        <Label
          htmlFor="photo-upload"
          className={`absolute bottom-0 right-0 p-2 bg-white rounded-full 
                   shadow-lg cursor-pointer hover:bg-gray-50 
                   transition-colors duration-200 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Upload className="h-5 w-5 text-[#D4AF37]" />
        </Label>
        <Input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          disabled={isUploading}
        />
      </div>
      {isUploading && (
        <p className="text-sm text-gray-500">Uploading...</p>
      )}
    </div>
  );
} 