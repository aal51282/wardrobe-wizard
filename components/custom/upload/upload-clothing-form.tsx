"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadFormState {
  category: string;
  color: string;
  size: string;
  brand: string;
  image: File | null;
}

const CATEGORIES = [
  "Shirt",
  "Sweater",
  "Jacket",
  "Pants",
  "Shoes",
  "Accessories",
  "Skirt",
] as const;

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export function UploadClothingForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<UploadFormState>({
    category: "",
    color: "",
    size: "",
    brand: "",
    image: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);

    // Clear form
    setFormState({
      category: "",
      color: "",
      size: "",
      brand: "",
      image: null,
    });
  };

  return (
    <Card className="w-full max-w-md border-[#D4AF37] bg-white/80 backdrop-blur-sm
                    shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-[#D4AF37]">
          Upload Clothing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-[#D4AF37]">
              Category
            </Label>
            <Select
              value={formState.category}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="border-[#D4AF37] bg-white/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-[#D4AF37]">
              Color
            </Label>
            <Input
              id="color"
              value={formState.color}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, color: e.target.value }))
              }
              className="border-[#D4AF37] bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="text-[#D4AF37]">
              Size
            </Label>
            <Select
              value={formState.size}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, size: value }))
              }
            >
              <SelectTrigger className="border-[#D4AF37] bg-white/50">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size.toLowerCase()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="text-[#D4AF37]">
              Brand
            </Label>
            <Input
              id="brand"
              value={formState.brand}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, brand: e.target.value }))
              }
              className="border-[#D4AF37] bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-[#D4AF37]">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  image: e.target.files?.[0] || null,
                }))
              }
              className="border-[#D4AF37] bg-white/50"
            />
          </div>

          <div className="space-y-4 pt-4">
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white
                       transition-colors duration-300"
            >
              Upload Item
            </Button>

            <Link href="/user-view" className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#D4AF37] text-[#D4AF37] 
                         hover:bg-[#D4AF37]/10 transition-colors duration-300"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 