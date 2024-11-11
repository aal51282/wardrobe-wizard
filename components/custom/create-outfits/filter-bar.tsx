"use client";

import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { filterData, FilterOption } from "@/util/example-data";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  selectedFilters: {
    categories: string[];
    colors: string[];
    sizes: string[];
    brands: string[];
  };
  setSelectedFilters: (filters: {
    categories: string[];
    colors: string[];
    sizes: string[];
    brands: string[];
  }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onSelectionChange: (values: string[]) => void;
}

function FilterDropdown({ title, options, selected, onSelectionChange }: FilterDropdownProps) {
  const toggleOption = (value: string) => {
    const newSelection = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onSelectionChange(newSelection);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between ${selected.length > 0 ? 'border-[#D4AF37] text-[#D4AF37]' : ''}`}
        >
          {title}
          {selected.length > 0 && <Badge className="ml-2 bg-[#D4AF37]">{selected.length}</Badge>}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggleOption(option.value)}
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FilterBar({
  selectedFilters,
  setSelectedFilters,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      colors: [],
      sizes: [],
      brands: [],
    });
    setSearchQuery("");
  };

  const updateFilter = (filterType: keyof typeof selectedFilters) => (values: string[]) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: values,
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filter => filter.length > 0) || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your wardrobe..."
          className="pl-10 border-gray-200 w-full"
        />
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          {hasActiveFilters && (
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
          <FilterDropdown
            title="Category"
            options={filterData.categories}
            selected={selectedFilters.categories}
            onSelectionChange={updateFilter('categories')}
          />
          <FilterDropdown
            title="Color"
            options={filterData.colors}
            selected={selectedFilters.colors}
            onSelectionChange={updateFilter('colors')}
          />
          <FilterDropdown
            title="Size"
            options={filterData.sizes}
            selected={selectedFilters.sizes}
            onSelectionChange={updateFilter('sizes')}
          />
          <FilterDropdown
            title="Brand"
            options={filterData.brands}
            selected={selectedFilters.brands}
            onSelectionChange={updateFilter('brands')}
          />
        </div>
      </div>
    </div>
  );
}