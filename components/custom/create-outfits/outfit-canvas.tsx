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

export function OutfitCanvas({ selectedItems }: OutfitCanvasProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white relative h-[800px] flex justify-center items-center">
      <Mannequin />
      {/* Overlay selected clothing items */}
      {selectedItems.map((item) => (
        <div
          key={item.id}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
      ))}
    </div>
  );
}
