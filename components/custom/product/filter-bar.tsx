"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const categories = ["Men", "Women", "Accessories", "Shoes", "Outerwear"];

export function FilterBar({
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your wardrobe..."
          className="pl-10 border-gray-200"
        />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Categories</h3>
          {(selectedCategories.length > 0 || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all filters
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className={`cursor-pointer ${
                selectedCategories.includes(category)
                  ? "bg-[#D4AF37] hover:bg-[#B4941F]"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
