"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/custom/create-outfits/product-card";
import { FilterBar } from "@/components/custom/create-outfits/filter-bar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Shirt } from "lucide-react";
import { OutfitCanvas } from "@/components/custom/create-outfits/outfit-canvas";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";

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

function getSelectedItemsByCategory(items: Item[]) {
  return items.reduce((acc, item) => {
    if (item.selected) {
      acc[item.category] = (acc[item.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
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
          name: "Classic White Oxford Shirt",
          image: "/images/shirt.jpg",
          category: "T-Shirts",
          color: "White",
          size: "M",
          brand: "Uniqlo",
          selected: false,
        },
        {
          id: "2",
          name: "Slim Fit Dark Jeans",
          image: "/images/jeans.jpg",
          category: "Jeans",
          color: "Navy",
          size: "L",
          brand: "Zara",
          selected: false,
        },
        {
          id: "3",
          name: "Wool Blend Sweater",
          image: "/images/sweater.jpg",
          category: "Sweaters",
          color: "Gray",
          size: "M",
          brand: "H&M",
          selected: false,
        },
        {
          id: "4",
          name: "Leather Bomber Jacket",
          image: "/images/jacket.jpg",
          category: "Jackets",
          color: "Black",
          size: "L",
          brand: "Nike",
          selected: false,
        },
        {
          id: "5",
          name: "Cotton Chino Pants",
          image: "/images/pants.jpg",
          category: "Pants",
          color: "Khaki",
          size: "M",
          brand: "Uniqlo",
          selected: false,
        },
        {
          id: "6",
          name: "Graphic Print T-Shirt",
          image: "/images/tshirt.jpg",
          category: "T-Shirts",
          color: "Red",
          size: "S",
          brand: "Adidas",
          selected: false,
        },
        {
          id: "7",
          name: "Hooded Sweatshirt",
          image: "/images/hoodie.jpg",
          category: "Sweaters",
          color: "Green",
          size: "XL",
          brand: "Nike",
          selected: false,
        },
        {
          id: "8",
          name: "Denim Jacket",
          image: "/images/denim-jacket.jpg",
          category: "Jackets",
          color: "Blue",
          size: "M",
          brand: "Zara",
          selected: false,
        },
        {
          id: "9",
          name: "Formal Dress Shirt",
          image: "/images/dress-shirt.jpg",
          category: "T-Shirts",
          color: "Light Blue",
          size: "L",
          brand: "H&M",
          selected: false,
        },
        {
          id: "10",
          name: "Athletic Performance Shorts",
          image: "/images/shorts.jpg",
          category: "Pants",
          color: "Black",
          size: "M",
          brand: "Adidas",
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

    if (searchQuery.trim()) {
      updatedItems = updatedItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters with case-insensitive comparison
    if (selectedFilters.categories.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.categories.some(
          category => category.toLowerCase() === item.category.toLowerCase()
        )
      );
    }

    if (selectedFilters.colors.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.colors.some(
          color => color.toLowerCase() === item.color.toLowerCase()
        )
      );
    }

    if (selectedFilters.sizes.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.sizes.some(
          size => size.toLowerCase() === item.size.toLowerCase()
        )
      );
    }

    if (selectedFilters.brands.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.brands.some(
          brand => brand.toLowerCase() === item.brand.toLowerCase()
        )
      );
    }

    setFilteredItems(updatedItems);
  }, [selectedFilters, searchQuery, items]);

  // Toggle item selection
  const toggleSelection = (id: string) => {
    const itemToToggle = items.find(item => item.id === id);
    if (!itemToToggle) return;

    setItems(currentItems => {
      // If the item is being deselected, just handle that
      if (itemToToggle.selected) {
        return currentItems.map(item =>
          item.id === id ? { ...item, selected: false } : item
        );
      }

      // If selecting a new item, deselect any other item in the same category
      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, selected: true };
        }
        if (item.category === itemToToggle.category) {
          return { ...item, selected: false };
        }
        return item;
      });
    });

    // Update filtered items as well to maintain consistency
    setFilteredItems(currentFiltered => {
      if (itemToToggle.selected) {
        return currentFiltered.map(item =>
          item.id === id ? { ...item, selected: false } : item
        );
      }

      return currentFiltered.map(item => {
        if (item.id === id) {
          return { ...item, selected: true };
        }
        if (item.category === itemToToggle.category) {
          return { ...item, selected: false };
        }
        return item;
      });
    });

    // Optional: Show feedback to user
    if (!itemToToggle.selected) {
      toast.info(`Selected ${itemToToggle.name} for ${itemToToggle.category}`, {
        description: `Previous ${itemToToggle.category} selection has been removed.`,
      });
    }
  };

  // Handle item deletion
  const deleteItem = (id: string) => {
    // Implement deletion logic (API call)
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSaveOutfit = () => {
    const selectedItems = items.filter((item) => item.selected);
    const selectedByCategory = getSelectedItemsByCategory(items);
    
    if (selectedItems.length === 0) {
      toast.error("Please select items to save an outfit", {
        description: "Select one item from each category you want to include.",
      });
      return;
    }

    // Add your save logic here
    toast.success("Outfit saved successfully!", {
      description: `Saved ${Object.keys(selectedByCategory).length} items to your outfits.`,
    });
  };

  const handleCompleteOutfit = () => {
    const selectedItems = items.filter((item) => item.selected);
    const selectedByCategory = getSelectedItemsByCategory(items);
    
    if (selectedItems.length === 0) {
      toast.error("Please select items to create an outfit", {
        description: "Select one item from each category you want to include.",
      });
      return;
    }

    router.push('/analysis');
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#D4AF37]">
                  Preview Outfit
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveOutfit}
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Outfit</span>
                  </Button>
                  <Button
                    onClick={handleCompleteOutfit}
                    className="bg-[#D4AF37] hover:bg-[#B4941F] text-white"
                  >
                    <span>Complete Outfit</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="min-h-[600px]">
                <OutfitCanvas
                  selectedItems={items.filter((item) => item.selected)}
                />
              </div>
              
              {/* Mobile view buttons */}
              <div className="mt-6 space-y-3 lg:hidden">
                <Button
                  onClick={handleSaveOutfit}
                  variant="outline"
                  className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  <span>Save Outfit</span>
                </Button>
                <Button
                  onClick={handleCompleteOutfit}
                  className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white"
                >
                  <span>Complete Outfit</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
