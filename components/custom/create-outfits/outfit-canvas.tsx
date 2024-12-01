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

  // Standard width for all clothing items
  const standardWidth = "w-[200px]";

  // Define positions for each category with standardized widths
  if (normalizedCategory.includes('shirt')) {
    return `top-[50px] left-1/2 -translate-x-1/2 ${standardWidth} h-[400px]`;
  }
  
  if (normalizedCategory.includes('sweater')) {
    return `top-[15px] left-1/2 -translate-x-1/2 ${standardWidth} h-[400px]`;
  }
  
  if (normalizedCategory.includes('jacket') || normalizedCategory.includes('coat')) {
    return `top-[15px] left-1/2 -translate-x-1/2 ${standardWidth} h-[400px]`;
  }
  
  if (normalizedCategory.includes('pants') || normalizedCategory.includes('jeans')) {
    return `top-[250px] left-1/2 -translate-x-1/2 ${standardWidth} h-[400px]`;
  }
  
  if (normalizedCategory.includes('skirt')) {
    return `top-[320px] left-1/2 -translate-x-1/2 ${standardWidth} h-[200px]`;
  }
  
  if (normalizedCategory.includes('dress')) {
    return `top-[140px] left-1/2 -translate-x-1/2 ${standardWidth} h-[420px]`;
  }
  
  if (normalizedCategory.includes('shoes')) {
    return `top-[550px] left-1/2 -translate-x-1/2 ${standardWidth} h-[150px]`;
  }
  
  // Handle different types of accessories with custom positioning and widths
  if (normalizedCategory.includes('accessories')) {
    if (normalizedCategory.includes('hat')) {
      return `top-[-20px] left-1/2 -translate-x-1/2 w-[100px] h-[90px]`;
    }
    if (normalizedCategory.includes('scarf')) {
      return `top-[110px] left-1/2 -translate-x-1/2 w-[120px] h-[100px]`;
    }
    if (normalizedCategory.includes('belt')) {
      return `top-[290px] left-1/2 -translate-x-1/2 w-[140px] h-[40px]`;
    }
    if (normalizedCategory.includes('necklace')) {
      return `top-[120px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]`;
    }
    if (normalizedCategory.includes('bracelet')) {
      return `top-[200px] left-[calc(50%+70px)] -translate-x-1/2 w-[60px] h-[60px]`;
    }
    if (normalizedCategory.includes('watch')) {
      return `top-[200px] left-[calc(50%-70px)] -translate-x-1/2 w-[60px] h-[60px]`;
    }
    // Default accessories position
    return `top-[-30px] left-1/2 -translate-x-1/2 w-[100px] h-[100px]`;
  }

  // Default position for unrecognized categories
  return `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${standardWidth} h-[140px]`;
}

// Helper function to get z-index based on category
function getZIndex(category: string): number {
  const normalizedCategory = category.toLowerCase();
  
  // Accessories layer
  if (normalizedCategory.includes('accessories')) {
    if (normalizedCategory.includes('hat')) return 70;
    if (normalizedCategory.includes('necklace')) return 65;
    if (normalizedCategory.includes('scarf')) return 60;
    if (normalizedCategory.includes('bracelet') || 
        normalizedCategory.includes('watch')) return 55;
    if (normalizedCategory.includes('belt')) return 45;
    return 50; // Default accessories
  }
  
  // Outerwear layer
  if (normalizedCategory.includes('jacket') || 
      normalizedCategory.includes('coat')) return 40;
  
  // Mid layers
  if (normalizedCategory.includes('sweater')) return 35;
  
  // Base layers
  if (normalizedCategory.includes('shirt')) return 30;
  if (normalizedCategory.includes('t-shirt')) return 25;
  if (normalizedCategory.includes('dress')) return 20;
  
  // Bottom layers
  if (normalizedCategory.includes('pants') || 
      normalizedCategory.includes('jeans')) return 15;
  if (normalizedCategory.includes('skirt')) return 15;
  
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
          className={`absolute transition-all duration-300 ease-in-out ${getPositionClasses(item.category)}`}
          style={{ 
            zIndex: getZIndex(item.category),
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain transition-all duration-300 ease-in-out hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      ))}
    </div>
  );
}
