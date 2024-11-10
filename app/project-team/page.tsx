"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { TeamHeader } from "@/components/custom/team/team-header";
import { TeamGrid } from "@/components/custom/team/team-grid";
import { teamMembers } from "@/lib/data/team-members";

export default function ProjectTeamPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <TeamHeader 
          title="Meet Our Team"
          description="We are passionate students collaborating to create an innovative wardrobe organization solution. Our diverse skills and dedication drive us to deliver a seamless user experience."
        />

        <TeamGrid members={teamMembers} />

        <div className="text-center">
          <Button
            onClick={() => router.push("/registered-user-view")}
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
