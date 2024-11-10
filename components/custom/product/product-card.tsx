import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  selected: boolean;
}

interface ProductCardProps {
  item: Item;
  toggleSelection: (id: string) => void;
  deleteItem: (id: string) => void;
}

export function ProductCard({ item, toggleSelection, deleteItem }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">{item.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{item.category}</p>
      <div className="flex space-x-2">
        <Button
          onClick={() => toggleSelection(item.id)}
          variant={item.selected ? "success" : "outline"}
          className="flex items-center justify-center space-x-1"
        >
          {item.selected ? <Check className="h-4 w-4" /> : null}
          <span>{item.selected ? "Deselect" : "Add"}</span>
        </Button>
        <Button
          onClick={() => deleteItem(item.id)}
          variant="destructive"
          className="flex items-center justify-center space-x-1"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
} 