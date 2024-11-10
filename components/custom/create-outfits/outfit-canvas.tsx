import Image from "next/image";

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

export function OutfitCanvas({ selectedItems }: OutfitCanvasProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white relative h-96 flex justify-center items-center">
      <div className="relative w-48 h-96">
        <Image
          src="/images/mannequin.png" // Placeholder mannequin image
          alt="Style Mannequin"
          layout="fill"
          objectFit="contain"
        />
        {/* Overlay selected clothing items */}
        {selectedItems.map((item) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        ))}
      </div>
    </div>
  );
} 