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
  const [imageUrl, setImageUrl] = useState<string>("/default-avatar.png");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        if (session?.user?.email) {
          const response = await fetch(`/api/users/photo?email=${session.user.email}`);
          if (response.ok) {
            const data = await response.json();
            if (data.photoUrl) {
              setImageUrl(data.photoUrl);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, [session?.user?.email]);

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

      console.log('Uploading to Cloudinary...'); // Debug log
      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dia5ivuqq/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error('Cloudinary upload error:', errorData); // Debug log
        throw new Error('Failed to upload image to Cloudinary');
      }

      const uploadData = await uploadResponse.json();
      console.log('Cloudinary response:', uploadData); // Debug log
      const newImageUrl = uploadData.secure_url;

      // Update in database
      console.log('Updating database...'); // Debug log
      const updateResponse = await fetch('/api/users/update-photo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl: newImageUrl }),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error('Database update error:', errorData); // Debug log
        throw new Error('Failed to update profile photo in database');
      }

      const updateData = await updateResponse.json();
      console.log('Database update response:', updateData); // Debug log

      // Update local state and session
      setImageUrl(newImageUrl);
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          image: newImageUrl,
        },
      });

      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });

    } catch (error) {
      console.error('Photo upload error:', error);
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
          src={imageUrl}
          alt="Profile"
          fill
          className="rounded-full object-cover border-2 border-[#D4AF37]"
          priority
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