"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OutfitCanvas } from "@/components/custom/create-outfits/outfit-canvas";
import { ClothingSelector } from "@/components/custom/create-outfits/clothing-selector";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
}

export default function CreateOutfitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    const selected = searchParams.get("selected");
    if (selected) {
      setSelectedItems(JSON.parse(selected));
    }
  }, [searchParams]);

  const handleFinish = () => {
    // Implement outfit creation logic
    alert("Outfit created successfully!");
    router.push("/registered-user-view");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
        Create Your Outfit
      </h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Outfit Canvas */}
        <div className="flex-1">
          <OutfitCanvas selectedItems={selectedItems} />
        </div>

        {/* Clothing Selector */}
        <div className="flex-1">
          <ClothingSelector items={selectedItems} setItems={setSelectedItems} />
        </div>
      </div>

      {/* Finish Button */}
      <Button
        onClick={handleFinish}
        variant="primary"
        className="mt-6 bg-[#D4AF37] hover:bg-[#B4941F] text-white px-6 py-3"
      >
        Finish Outfit
      </Button>
    </div>
  );
}
