"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Check, Plus } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  item: Item;
  toggleSelection: (id: string) => void;
  deleteItem: (id: string) => void;
}

export function ProductCard({ item, toggleSelection, deleteItem }: ProductCardProps) {
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
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
          {item.name}
        </h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          {item.category}
        </Badge>
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
                Are you sure you want to delete "{item.name}"? This action cannot be undone.
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