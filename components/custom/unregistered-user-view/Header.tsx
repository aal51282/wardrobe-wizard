import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-[#f3d19e] shadow-sm z-50 px-4">
      <div className="w-full flex justify-between items-center py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/big-logo.png"
              alt="Wardrobe Wizard Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-[#a77e3e] to-[#c69c6d] bg-clip-text text-transparent">
              Wardrobe Wizard
            </h1>
          </div>
        </Link>
        <nav className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            variant="default" 
            className="bg-[#b38c5a] hover:bg-[#a77e3e]"
            asChild
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
