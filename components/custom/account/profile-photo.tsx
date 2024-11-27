"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export function ProfilePhoto() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { data: session, update: updateSession } = useSession();
  const [imageUrl, setImageUrl] = useState("/default-avatar.png");

  useEffect(() => {
    if (session?.user?.image) {
      setImageUrl(session.user.image);
    }
  }, [session?.user?.image]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'wardrobe-wizard');

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dia5ivuqq/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadData = await uploadResponse.json();
      const newImageUrl = uploadData.secure_url;

      // Update in database
      const updateResponse = await fetch('/api/users/update-photo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl: newImageUrl }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update profile photo in database');
      }

      // Update local state
      setImageUrl(newImageUrl);

      // Update session
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          image: newImageUrl,
        },
      };
      await updateSession(newSession);

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });

    } catch (error) {
      console.error('Photo upload error:', error);
      toast({
        title: "Error",
        description: "Failed to update profile photo",
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
          src={imageUrl}
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-[#D4AF37]"
          unoptimized // Add this to prevent Next.js image optimization issues
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