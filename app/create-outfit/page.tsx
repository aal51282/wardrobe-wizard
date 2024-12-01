"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/custom/create-outfits/product-card";
import { FilterBar } from "@/components/custom/create-outfits/filter-bar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Shirt } from "lucide-react";
import { OutfitCanvas } from "@/components/custom/create-outfits/outfit-canvas";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

interface FilterOption {
  id: string;
  value: string;
  label: string;
}

interface Filters {
  categories: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
  brands: FilterOption[];
}

interface SavedOutfit {
  _id: string;
  name: string;
  items: Item[];
  createdAt: string;
}

interface EditOutfitDialogProps {
  outfit: SavedOutfit;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string, selectedItems: string[]) => Promise<void>;
  allItems: Item[];
}

function getSelectedItemsByCategory(items: Item[]) {
  return items.reduce(
    (acc, item) => {
      if (item.selected) {
        acc[item.category] = (acc[item.category] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );
}

function EditOutfitDialog({
  outfit,
  isOpen,
  onOpenChange,
  onSave,
  allItems,
}: EditOutfitDialogProps) {
  const [name, setName] = useState(outfit.name);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    outfit.items.map((item) => item.id)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter an outfit name");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(name, selectedItems);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleItem = (itemId: string, category: string) => {
    setSelectedItems((prev) => {
      // If item is already selected, remove it
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }

      // If adding a new item, remove any other item from the same category
      const updatedSelection = prev.filter((id) => {
        const item = allItems.find((i) => i.id === id);
        return item?.category !== category;
      });

      return [...updatedSelection, itemId];
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Outfit</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 flex-1 overflow-hidden">
          <div className="space-y-2">
            <Label>Outfit Name</Label>
            <Input
              placeholder="Enter outfit name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <Label>Select Items</Label>
            <ScrollArea className="h-[50vh] mt-2 border rounded-md p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {allItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedItems.includes(item.id)
                        ? "border-[#D4AF37] bg-[#F9F6E8]"
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => toggleItem(item.id, item.category)}
                  >
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {item.size}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CreateOutfitPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
  });
  const [filterOptions, setFilterOptions] = useState<Filters>({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isOutfitDialogOpen, setIsOutfitDialogOpen] = useState(false);
  const [outfitName, setOutfitName] = useState("");
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [isLoadingOutfits, setIsLoadingOutfits] = useState(false);
  const [editingOutfit, setEditingOutfit] = useState<SavedOutfit | null>(null);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/clothing");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch items");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debug log
        setItems(data.items);
        setFilteredItems(data.items);
        setFilterOptions(data.filters);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load clothing items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Add this useEffect to fetch saved outfits
  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        setIsLoadingOutfits(true);
        const response = await fetch("/api/outfits");
        if (!response.ok) throw new Error("Failed to fetch outfits");
        const data = await response.json();
        setSavedOutfits(data);
      } catch (error) {
        console.error("Error fetching saved outfits:", error);
        toast.error("Failed to load saved outfits");
      } finally {
        setIsLoadingOutfits(false);
      }
    };

    fetchSavedOutfits();
  }, []);

  // Handle filtering
  useEffect(() => {
    let updatedItems = [...items];

    if (searchQuery.trim()) {
      updatedItems = updatedItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type-safe filter application
    if (selectedFilters.categories.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.categories.some(
          (category) => category.toLowerCase() === item.category.toLowerCase()
        )
      );
    }

    if (selectedFilters.colors.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.colors.some(
          (color) => color.toLowerCase() === item.color.toLowerCase()
        )
      );
    }

    if (selectedFilters.sizes.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.sizes.some(
          (size) => size.toLowerCase() === item.size.toLowerCase()
        )
      );
    }

    if (selectedFilters.brands.length > 0) {
      updatedItems = updatedItems.filter((item) =>
        selectedFilters.brands.some(
          (brand) => brand.toLowerCase() === item.brand.toLowerCase()
        )
      );
    }

    setFilteredItems(updatedItems);
  }, [selectedFilters, searchQuery, items]);

  // Toggle item selection
  const toggleSelection = (id: string) => {
    const itemToToggle = items.find((item) => item.id === id);
    if (!itemToToggle) return;

    setItems((currentItems) => {
      // If the item is being deselected, just handle that
      if (itemToToggle.selected) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, selected: false } : item
        );
      }

      // If selecting a new item, deselect any other item in the same category
      return currentItems.map((item) => {
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
    setFilteredItems((currentFiltered) => {
      if (itemToToggle.selected) {
        return currentFiltered.map((item) =>
          item.id === id ? { ...item, selected: false } : item
        );
      }

      return currentFiltered.map((item) => {
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
  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/clothing/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update local state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const handleSaveOutfit = async () => {
    const selectedItems = items.filter((item) => item.selected);
    const selectedByCategory = getSelectedItemsByCategory(items);

    if (selectedItems.length === 0) {
      toast.error("Please select items to save an outfit", {
        description: "Select one item from each category you want to include.",
      });
      return;
    }

    setIsOutfitDialogOpen(true);
  };

  const handleSaveOutfitConfirm = async () => {
    if (!outfitName.trim()) {
      toast.error("Please enter an outfit name");
      return;
    }

    setIsSaving(true);
    try {
      const selectedItems = items.filter((item) => item.selected);

      const response = await fetch("/api/outfits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: outfitName,
          items: selectedItems.map((item) => item.id),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save outfit");
      }

      toast.success("Outfit saved successfully!", {
        description: `Saved ${selectedItems.length} items to your outfits.`,
      });

      setOutfitName("");
      setIsOutfitDialogOpen(false);
    } catch (error) {
      console.error("Error saving outfit:", error);
      toast.error("Failed to save outfit");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompleteOutfit = (selectedItemIds: string[]) => {
    if (selectedItemIds.length === 0) {
      alert("Please select at least one item for your outfit");
      return;
    }

    // Navigate to analysis page with selected items
    router.push(`/analysis?items=${selectedItemIds.join(",")}`);
  };

  const loadSavedOutfit = (outfit: SavedOutfit) => {
    // Reset all items to unselected
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: false }))
    );

    // Select the items from the saved outfit
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: outfit.items.some((outfitItem) => outfitItem._id === item.id),
      }))
    );

    toast.success(`Loaded outfit: ${outfit.name}`);
  };

  const handleUpdateOutfit = async (
    outfitId: string,
    newName: string,
    selectedItemIds: string[]
  ) => {
    try {
      const response = await fetch(`/api/outfits/${outfitId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          items: selectedItemIds,
        }),
      });

      if (!response.ok) throw new Error("Failed to update outfit");

      // Update local state
      setSavedOutfits((prevOutfits) =>
        prevOutfits.map((outfit) =>
          outfit._id === outfitId
            ? {
                ...outfit,
                name: newName,
                items: items.filter((item) =>
                  selectedItemIds.includes(item.id)
                ),
              }
            : outfit
        )
      );

      toast.success("Outfit updated successfully");
    } catch (error) {
      console.error("Error updating outfit:", error);
      toast.error("Failed to update outfit");
    }
  };

  const handleDeleteOutfit = async (outfitId: string) => {
    try {
      const response = await fetch(`/api/outfits/${outfitId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete outfit");

      // Update local state
      setSavedOutfits((prevOutfits) =>
        prevOutfits.filter((outfit) => outfit._id !== outfitId)
      );

      toast.success("Outfit deleted successfully");
    } catch (error) {
      console.error("Error deleting outfit:", error);
      toast.error("Failed to delete outfit");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Back Button */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => router.push("/upload")}
              variant="ghost"
              className="text-[#D4AF37] hover:text-[#B4941F] hover:bg-[#F9F6E8]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Upload
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">
              Your Wardrobe
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your clothing collection and create stunning outfits.
              Select items to mix and match, or use filters to find specific
              pieces.
            </p>
          </div>
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
            { label: "Outfits Created", value: savedOutfits.length },
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
                filterOptions={filterOptions}
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
                {isLoading ? (
                  <div className="col-span-full flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : filteredItems.length > 0 ? (
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
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                      >
                        <Library className="h-4 w-4 mr-2" />
                        <span>Saved Outfits</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Saved Outfits</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                        {isLoadingOutfits ? (
                          <div className="flex justify-center py-4">
                            <LoadingSpinner />
                          </div>
                        ) : savedOutfits.length > 0 ? (
                          <div className="space-y-4">
                            {savedOutfits.map((outfit) => (
                              <div
                                key={outfit._id}
                                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div
                                    className="flex-1"
                                    onClick={() => loadSavedOutfit(outfit)}
                                  >
                                    <h3 className="font-medium text-[#D4AF37]">
                                      {outfit.name}
                                    </h3>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the parent click
                                        setEditingOutfit(outfit);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the parent click
                                          }}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Delete Outfit
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete "
                                            {outfit.name}"? This action cannot
                                            be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              handleDeleteOutfit(outfit._id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                                <div onClick={() => loadSavedOutfit(outfit)}>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {outfit.items.length} items •
                                    {new Date(
                                      outfit.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                  <div className="flex gap-2 mt-2 flex-wrap">
                                    {outfit.items.map((item) => (
                                      <Badge
                                        key={item._id}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {item.category}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No saved outfits yet
                          </div>
                        )}
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>

                  <Button
                    onClick={handleSaveOutfit}
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Outfit</span>
                  </Button>
                  <Button
                    onClick={() =>
                      handleCompleteOutfit(
                        items
                          .filter((item) => item.selected)
                          .map((item) => item.id)
                      )
                    }
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
                  onClick={() =>
                    handleCompleteOutfit(
                      items
                        .filter((item) => item.selected)
                        .map((item) => item.id)
                    )
                  }
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

      {/* Add this dialog component */}
      <Dialog open={isOutfitDialogOpen} onOpenChange={setIsOutfitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Outfit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Outfit Name</Label>
              <Input
                placeholder="Enter outfit name"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOutfitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveOutfitConfirm} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Outfit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {editingOutfit && (
        <EditOutfitDialog
          outfit={editingOutfit}
          isOpen={!!editingOutfit}
          onOpenChange={(open) => !open && setEditingOutfit(null)}
          onSave={async (newName, selectedItems) => {
            await handleUpdateOutfit(editingOutfit._id, newName, selectedItems);
          }}
          allItems={items}
        />
      )}
    </div>
  );
}
