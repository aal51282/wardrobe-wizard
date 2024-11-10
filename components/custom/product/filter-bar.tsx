"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

interface FilterBarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const categories = ["Men", "Women", "Accessories"];

export function FilterBar({
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      {/* Category Filters */}
      <div className="flex space-x-2 mb-2 sm:mb-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-4 py-2 rounded-md border ${
              selectedCategories.includes(category)
                ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } flex items-center space-x-1`}
          >
            {selectedCategories.includes(category) && <CheckIcon className="h-4 w-4" />}
            <span>{category}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search your wardrobe..."
        className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
} 