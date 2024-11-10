import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ProfilePhotoProps {
  photoUrl: string;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfilePhoto({ photoUrl, onPhotoUpload }: ProfilePhotoProps) {
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
          className="absolute bottom-0 right-0 p-2 bg-white rounded-full 
                   shadow-lg cursor-pointer hover:bg-gray-50 
                   transition-colors duration-200"
        >
          <Upload className="h-5 w-5 text-[#D4AF37]" />
        </Label>
        <Input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={onPhotoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
} 