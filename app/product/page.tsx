"use client";

// Import necessary libraries and hooks
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Product.module.css";
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
    <div className={styles.productPageContainer}>
      <h1 className={styles.pageTitle}>Products</h1>

      {/* Filter buttons at the top */}
      <div className={styles.filterButtonsContainer}>
        <button className={styles.filterButton}>Men&apos;s</button>
        <button className={styles.filterButton}>Women&apos;s</button>
        <button className={styles.filterButton}>Accessories</button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Grid of items */}
      <div className={styles.itemsGrid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <Image
              src={item.image || ''}
              alt={item.name || ''}
              width={150}
              height={150}
              className={styles.itemImage}
            />
            <h3 className={styles.itemName}>{item.name}</h3>
            <div className={styles.itemButtonsContainer}>
              <button
                className={
                  item.selected ? styles.deselectButton : styles.addButton
                }
                onClick={() => toggleSelection(item.id)}
              >
                {item.selected ? "Deselect Item" : "Add Item"}
              </button>
              <button
                className={styles.deleteButton}
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
        className={styles.savedOutfitButton}
        onClick={() => setShowSavedOutfits(!showSavedOutfits)}
      >
        Show Saved Outfits
      </button>
      {showSavedOutfits && (
        <div className={styles.savedOutfitDropdown}>
          <p>Saved outfit 1</p>
          <p>Saved outfit 2</p>
          <p>Saved outfit 3</p>
          {/* Add functionality to select an outfit and pre-select items */}
        </div>
      )}

      {/* Continue button */}
      <button className={styles.continueButton} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
