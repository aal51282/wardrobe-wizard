"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/custom/product/product-card";
import { FilterBar } from "@/components/custom/product/filter-bar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
}

export default function ProductPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          category: "Men",
          selected: false,
        },
        {
          id: "2",
          name: "Striped Shirt",
          image: "/images/shirt.jpg",
          category: "Women",
          selected: false,
        },
        {
          id: "3",
          name: "Sunglasses",
          image: "/images/sunglasses.jpg",
          category: "Accessories",
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

    if (selectedCategories.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (searchQuery.trim() !== "") {
      updatedItems = updatedItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
  }, [selectedCategories, searchQuery, items]);

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
      pathname: "/create-outfits",
      query: { selected: JSON.stringify(selectedItems) },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 p-4">
      <h1 className="text-3xl font-bold text-center text-[#D4AF37] mb-6">
        Your Wardrobe
      </h1>

      {/* Filter Bar */}
      <Suspense fallback={<LoadingSpinner />}>
        <FilterBar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Suspense>

      {/* Items Grid */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
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
            <p className="text-center col-span-full text-gray-500">
              No items found.
            </p>
          )}
        </div>
      </Suspense>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          variant="primary"
          className="w-1/2 sm:w-1/3 md:w-1/4 bg-[#D4AF37] hover:bg-[#B4941F] text-white"
        >
          Create Outfits
        </Button>
      </div>
    </div>
  );
}
