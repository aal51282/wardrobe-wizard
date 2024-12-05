"use client";

import { useState, ChangeEvent } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface UploadFormState {
  category: string;
  color: string;
  size: string;
  brand: string;
  images: File[];
}

interface FormErrors {
  category?: string;
  color?: string;
  size?: string;
  brand?: string;
  images?: string;
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

const uploadSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Please select a size"),
  brand: z.string().min(1, "Brand is required"),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
});

export function UploadClothingForm() {
  const { toast } = useToast();
  const [formState, setFormState] = useState<UploadFormState>({
    category: "",
    color: "",
    size: "",
    brand: "",
    images: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    try {
      uploadSchema.parse(formState);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category", formState.category);
      formData.append("color", formState.color);
      formData.append("size", formState.size);
      formData.append("brand", formState.brand);
      
      // Append each image file
      formState.images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const { _data, _error } = await response.json();
      
      toast({
        title: "Success!",
        description: "Item uploaded successfully",
      });

      // Clear form
      setFormState({
        category: "",
        color: "",
        size: "",
        brand: "",
        images: [],
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFormState((prev) => ({ ...prev, images: Array.from(files) }));
  };

  return (
    <Card
      className="w-full max-w-md border-[#D4AF37] bg-white/80 backdrop-blur-sm
                    shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
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
              <SelectTrigger
                className={`border-[#D4AF37] bg-white/50 
                ${errors.category ? "border-red-500" : ""}`}
              >
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
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
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
              className={`border-[#D4AF37] bg-white/50 
                ${errors.color ? "border-red-500" : ""}`}
            />
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color}</p>
            )}
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
            <Label className="text-[#D4AF37]">Images</Label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label
                  className="flex flex-col items-center justify-center w-full h-32 
                                border-2 border-[#D4AF37] border-dashed rounded-lg 
                                cursor-pointer bg-white/50 hover:bg-[#D4AF37]/5 
                                transition-colors duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-[#D4AF37]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-[#D4AF37]">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-[#D4AF37]/70">
                      PNG, JPG or WebP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                  />
                </label>
              </div>
              {formState.images.length > 0 && (
                <p className="mt-2 text-sm text-[#D4AF37]">
                  Selected:{" "}
                  {formState.images.map((image) => image.name).join(", ")}
                </p>
              )}
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white
                       transition-colors duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Uploading..." : "Upload Item"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
