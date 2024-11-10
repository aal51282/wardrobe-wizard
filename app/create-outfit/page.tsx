"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/custom/create-outfits/product-card";
import { FilterBar } from "@/components/custom/create-outfits/filter-bar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Shirt } from "lucide-react";
import { OutfitCanvas } from "@/components/custom/create-outfits/outfit-canvas";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  selected: boolean;
}

export default function CreateOutfitPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
  });

  // Fetch items from API or context
  useEffect(() => {
    // Replace with actual data fetching logic
    const fetchItems = async () => {
      // Example placeholder data
      const fetchedItems: Item[] = [
        {
          id: "1",
          name: "Skinny Mid-Rise Trousers",
          image: "/images/trousers.jpg",
          category: "Pants",
          color: "black",
          size: "M",
          brand: "Zara",
          selected: false,
        },
        {
          id: "2",
          name: "Classic Cotton Shirt",
          image: "/images/shirt.jpg",
          category: "T-Shirts",
          color: "white",
          size: "L",
          brand: "Uniqlo",
          selected: false,
        },
        {
          id: "3",
          name: "Designer Sunglasses",
          image: "/images/sunglasses.jpg",
          category: "Accessories",
          color: "black",
          size: "One Size",
          brand: "Nike",
          selected: false,
        },
      ];
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
    };

    fetchItems();
  }, []);

  // Handle filtering
  useEffect(() => {
    let updatedItems = [...items];

    // Apply each filter type
    Object.entries(selectedFilters).forEach(([filterType, selectedValues]) => {
      if (selectedValues.length > 0) {
        updatedItems = updatedItems.filter((item) =>
          selectedValues.includes(item[filterType as keyof Item])
        );
      }
    });

    // Apply search query
    if (searchQuery.trim() !== "") {
      updatedItems = updatedItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
  }, [selectedFilters, searchQuery, items]);

  // Toggle item selection
  const toggleSelection = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Handle item deletion
  const deleteItem = (id: string) => {
    // Implement deletion logic (API call)
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle continue to create outfits
  const handleContinue = () => {
    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one item to create an outfit.");
      return;
    }
    // Pass selected items via query params or state management
    router.push({
      pathname: "/create-outfit",
      query: { selected: JSON.stringify(selectedItems) },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">
            Your Wardrobe
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your clothing collection and create stunning outfits. Select
            items to mix and match, or use filters to find specific pieces.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Items", value: items.length },
            {
              label: "Selected",
              value: items.filter((i) => i.selected).length,
            },
            {
              label: "Categories",
              value: new Set(items.map((i) => i.category)).size,
            },
            { label: "Outfits Created", value: "0" }, // Replace with actual data
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-4 text-center"
            >
              <p className="text-2xl font-bold text-[#D4AF37]">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Bar - Now full width */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 w-full">
            <Suspense fallback={<LoadingSpinner />}>
              <FilterBar
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Suspense>
          </div>
        </div>

        {/* Content Grid and Preview */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Products */}
          <div className="lg:w-1/2">
            {/* Items Grid */}
            <Suspense fallback={<LoadingSpinner />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      toggleSelection={toggleSelection}
                      deleteItem={deleteItem}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-lg">
                    <Shirt className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No items found</p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </div>
            </Suspense>
          </div>

          {/* Right Side - Preview Outfit */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6">
                Preview Outfit
              </h2>
              <div className="min-h-[600px]">
                <OutfitCanvas
                  selectedItems={items.filter((item) => item.selected)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
