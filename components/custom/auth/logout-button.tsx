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
        className="text-[#D4AF37] hover:bg-[#F9F6E8] cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent
          className="sm:max-w-md border-[#D4AF37]"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className="text-[#D4AF37] text-xl">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-[#D4AF37]/70">
              Are you sure you want to logout from Wardrobe Wizard?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#F9F6E8]"
            >
              Cancel
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-[#D4AF37] text-white hover:bg-[#B4941F]">
                Confirm Logout
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
