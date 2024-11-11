"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function LogoutButton() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(true);
  };

  return (
    <>
      <DropdownMenuItem
        onClick={handleLogoutClick}
        className="text-red-600 hover:bg-red-50 cursor-pointer font-medium"
      >
        <LogOut className="mr-2 h-4 w-4 text-red-600" />
        Logout
      </DropdownMenuItem>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent
          className="sm:max-w-md border-red-600"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className="text-red-600 text-xl">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to logout from Wardrobe Wizard?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                Confirm Logout
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
