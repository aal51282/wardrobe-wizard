"use client";

import { useState } from "react";
import { CheckIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
}

interface ClothingSelectorProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export function ClothingSelector({ items, setItems }: ClothingSelectorProps) {
  const removeItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: false } : item));
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <span className="text-gray-700">{item.name}</span>
            </div>
            <Button
              onClick={() => removeItem(item.id)}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Remove</span>
            </Button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No items selected.</p>
      )}
    </div>
  );
} 