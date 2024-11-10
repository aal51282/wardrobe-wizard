"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Grace Walbrecher",
    role: "Frontend Developer",
    image: "/grace.jpg",
    description: "Specializing in React and UI/UX design",
  },
  {
    name: "Angel Loaiza",
    role: "Frontend Developer",
    image: "/angel.png",
    description: "Expert in TypeScript and Next.js",
  },
  {
    name: "Brenda Thornton",
    role: "Backend Developer",
    image: "/brenda.jpg",
    description: "Focused on API development and server architecture",
  },
  {
    name: "Lily Valdes",
    role: "Database Manager",
    image: "/lily.png",
    description: "MongoDB and data structure specialist",
  },
];

export default function ProjectTeamPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#D4AF37] mb-6">
            Meet Our Team
          </h1>
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
            We are passionate students collaborating to create an innovative
            wardrobe organization solution. Our diverse skills and dedication
            drive us to deliver a seamless user experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37]/20"
            >
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
          ))}
        </div>

        {/* Back Button */}
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
