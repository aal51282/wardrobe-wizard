"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogoutButton } from "@/components/custom/auth/logout-button";
import { User } from "lucide-react";

const navigationLinks = [
  { href: "/upload", label: "Upload Clothing" },
  { href: "/create-outfit", label: "Create Outfits" },
  { href: "/analysis", label: "Analysis" },
  { href: "/project-team", label: "Meet the Team" },
];

export function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-[#D4AF37] bg-white sticky top-0 z-50">
      <div className="flex items-center h-16 px-8">
        <Link 
          href="/registered-user-view" 
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Image
            src="/big-logo.png"
            alt="Wardrobe Wizard Logo"
            width={45}
            height={45}
            className="object-contain"
            priority
          />
          <h1 className="text-3xl font-bold text-[#D4AF37]">Wardrobe Wizard</h1>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <nav className="hidden md:flex items-center">
            {navigationLinks.map(({ href, label }, index) => (
              <div key={href} className="flex items-center">
                <Link href={href} passHref>
                  <Button
                    variant="ghost"
                    className="text-[#D4AF37] hover:text-[#B4941F] hover:bg-[#F9F6E8] text-lg"
                  >
                    {label}
                  </Button>
                </Link>
                {index < navigationLinks.length - 1 && (
                  <div className="h-4 w-px bg-[#D4AF37] mx-2" />
                )}
              </div>
            ))}
          </nav>

          <div className="h-4 w-px bg-[#D4AF37]" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-[#F9F6E8]"
              >
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-[#F9F6E8] text-[#D4AF37]">
                    UN
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border-[#D4AF37]"
            >
              <DropdownMenuItem
                onClick={() => router.push("/account")}
                className="text-[#D4AF37] hover:bg-[#F9F6E8] cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
