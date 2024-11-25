import Image from "next/image";
import { Mannequin } from "./mannequin";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
}

interface OutfitCanvasProps {
  selectedItems: Item[];
}

// Helper function to get position classes based on category
function getPositionClasses(category: string): string {
  // Normalize the category to lowercase for consistent matching
  const normalizedCategory = category.toLowerCase();

  // Define positions for each category
  if (normalizedCategory.includes('shirt')) {
    return "top-[150px] left-1/2 -translate-x-1/2 w-[160px] h-[200px]";
  }
  
  if (normalizedCategory.includes('t-shirt')) {
    return "top-[150px] left-1/2 -translate-x-1/2 w-[150px] h-[180px]";
  }
  
  if (normalizedCategory.includes('sweater')) {
    return "top-[140px] left-1/2 -translate-x-1/2 w-[180px] h-[220px]";
  }
  
  if (normalizedCategory.includes('jacket')) {
    return "top-[130px] left-1/2 -translate-x-1/2 w-[200px] h-[240px]";
  }
  
  if (normalizedCategory.includes('pants') || normalizedCategory.includes('jeans')) {
    return "top-[340px] left-1/2 -translate-x-1/2 w-[120px] h-[280px]";
  }
  
  if (normalizedCategory.includes('skirt')) {
    return "top-[340px] left-1/2 -translate-x-1/2 w-[140px] h-[160px]";
  }
  
  if (normalizedCategory.includes('shoes')) {
    return "top-[640px] left-1/2 -translate-x-1/2 w-[120px] h-[60px]";
  }
  
  // Handle different types of accessories
  if (normalizedCategory.includes('accessories')) {
    if (normalizedCategory.includes('hat')) {
      return "top-[-10px] left-1/2 -translate-x-1/2 w-[80px] h-[60px]";
    }
    if (normalizedCategory.includes('scarf')) {
      return "top-[100px] left-1/2 -translate-x-1/2 w-[100px] h-[80px]";
    }
    if (normalizedCategory.includes('belt')) {
      return "top-[300px] left-1/2 -translate-x-1/2 w-[120px] h-[30px]";
    }
    if (normalizedCategory.includes('necklace')) {
      return "top-[120px] left-1/2 -translate-x-1/2 w-[80px] h-[80px]";
    }
    // Default accessories position
    return "top-[120px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]";
  }

  // Default position for unrecognized categories
  return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px]";
}

// Helper function to get z-index based on category
function getZIndex(category: string): number {
  const normalizedCategory = category.toLowerCase();
  
  // Accessories should always be on top
  if (normalizedCategory.includes('accessories')) {
    if (normalizedCategory.includes('hat')) return 60;
    if (normalizedCategory.includes('scarf')) return 55;
    if (normalizedCategory.includes('necklace')) return 54;
    if (normalizedCategory.includes('belt')) return 25;
    return 53; // Default accessories
  }
  
  // Outerwear
  if (normalizedCategory.includes('jacket')) return 50;
  
  // Mid layers
  if (normalizedCategory.includes('sweater')) return 40;
  
  // Base layers
  if (normalizedCategory.includes('shirt')) return 30;
  if (normalizedCategory.includes('t-shirt')) return 30;
  
  // Bottom layers
  if (normalizedCategory.includes('pants') || 
      normalizedCategory.includes('jeans')) return 20;
  if (normalizedCategory.includes('skirt')) return 20;
  
  // Shoes should be at the bottom
  if (normalizedCategory.includes('shoes')) return 10;
  
  return 1; // Default z-index
}

export function OutfitCanvas({ selectedItems }: OutfitCanvasProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white relative h-[800px] flex justify-center items-center">
      <Mannequin />
      {/* Overlay selected clothing items */}
      {selectedItems.map((item) => (
        <div
          key={item.id}
          className={`absolute ${getPositionClasses(item.category)}`}
          style={{ 
            zIndex: getZIndex(item.category),
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="contain"
            className="transition-all duration-300 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
}
