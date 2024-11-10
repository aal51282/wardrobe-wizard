"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/lib/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37]/20">
      <CardContent className="p-6">
        <div className="relative mb-6 mx-auto w-32 h-32">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-xl text-[#D4AF37] mb-2">
            {member.name}
          </h3>
          <p className="text-[#D4AF37]/70 font-medium mb-3">
            {member.role}
          </p>
          {member.description && (
            <p className="text-gray-600 text-sm">
              {member.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 