"use client";

import Image from "next/image";

interface TeamHeaderProps {
  title: string;
  description: string;
}

export function TeamHeader({ title, description }: TeamHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-[#D4AF37] mb-6">{title}</h1>
      <div className="relative w-full max-w-lg mx-auto mb-8">
        <Image
          src="/wardrobe.png"
          alt="Team Illustration"
          width={400}
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
} 