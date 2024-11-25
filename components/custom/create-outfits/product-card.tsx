"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Plus, Edit2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
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

interface ProductCardProps {
  item: Item;
  toggleSelection: (id: string) => void;
  deleteItem: (id: string) => void;
}

const CATEGORIES = [
  "Shirt",
  "T-Shirts",
  "Sweater",
  "Jacket",
  "Pants",
  "Shoes",
  "Accessories",
  "Skirt",
] as const;

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export function ProductCard({
  item,
  toggleSelection,
  deleteItem,
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/clothing/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: editedItem.category,
          color: editedItem.color,
          size: editedItem.size,
          brand: editedItem.brand,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      toast.success('Item updated successfully');
      setIsEditing(false);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="relative p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-200"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {item.name}
          </h3>
          <Badge variant="outline" className="text-[#D4AF37] border-[#D4AF37]">
            {item.brand}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {item.category}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
            {item.size}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 capitalize"
          >
            {item.color}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          onClick={() => toggleSelection(item.id)}
          variant={item.selected ? "default" : "outline"}
          className={`flex-1 ${
            item.selected
              ? "bg-[#D4AF37] hover:bg-[#B4941F]"
              : "hover:bg-gray-100"
          }`}
        >
          {item.selected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Selected
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Select
            </>
          )}
        </Button>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={editedItem.category}
                  onValueChange={(value) =>
                    setEditedItem((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <Input
                  value={editedItem.color}
                  onChange={(e) =>
                    setEditedItem((prev) => ({ ...prev, color: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={editedItem.size}
                  onValueChange={(value) =>
                    setEditedItem((prev) => ({ ...prev, size: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Brand</Label>
                <Input
                  value={editedItem.brand}
                  onChange={(e) =>
                    setEditedItem((prev) => ({ ...prev, brand: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{item.name}?&quot; This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
