"use client";

// Import necessary libraries and hooks
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Item {
  id: string;
  name: string;
  selected: boolean;
  image?: string;
  category?: string;
}

export default function ProductPage() {
  const router = useRouter();

  // Placeholder state for clothing items
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Skinny Mid-Rise Trousers",
      image: "/images/trousers.jpg" as string,
      category: "Men",
      selected: false,
    },
    {
      id: "2",
      name: "Striped Shirt",
      image: "/images/shirt.jpg" as string,
      category: "Women",
      selected: false,
    },
    {
      id: "3",
      name: "Sunglasses",
      image: "/images/sunglasses.jpg" as string,
      category: "Accessories",
      selected: false,
    },
  ]);

  // State to show the saved outfits dropdown
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter items based on search query with null checking
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
  );

  // Toggle item selection with proper typing
  const toggleSelection = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Handle item deletion (placeholder for future database logic)
  const deleteItem = (id: string) => {
    console.log(`Deleting item with ID: ${id}`);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle continue button click
  const handleContinue = () => {
    const selectedItems = items.filter((item) => item.selected);
    console.log("Selected items for the outfit:", selectedItems);
    router.push("/analysis"); // Redirect to analytical page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filter buttons at the top */}
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Men&apos;s</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">Women&apos;s</button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded">Accessories</button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <Image
              src={item.image || ''}
              alt={item.name || ''}
              width={150}
              height={150}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <div className="flex space-x-2">
              <button
                className={
                  item.selected ? "bg-red-500 text-white px-4 py-2 rounded" : "bg-blue-500 text-white px-4 py-2 rounded"
                }
                onClick={() => toggleSelection(item.id)}
              >
                {item.selected ? "Deselect Item" : "Add Item"}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Saved outfits dropdown button */}
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => setShowSavedOutfits(!showSavedOutfits)}
      >
        Show Saved Outfits
      </button>
      {showSavedOutfits && (
        <div className="bg-gray-100 p-4 rounded">
          <p>Saved outfit 1</p>
          <p>Saved outfit 2</p>
          <p>Saved outfit 3</p>
          {/* Add functionality to select an outfit and pre-select items */}
        </div>
      )}

      {/* Continue button */}
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
