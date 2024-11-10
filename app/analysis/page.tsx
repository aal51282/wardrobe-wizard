"use client";

import { useRouter } from "next/navigation";
import { 
  BarChart, 
  PieChart, 
  Calendar,
  TrendingUp,
  Award,
  Sun,
  Cloud,
  Umbrella,
  Thermometer,
  Clock,
  Tag,
  Repeat,
  Heart
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - Replace with real data from your state/API
const outfitAnalysis = {
  styleScore: 85,
  colorHarmony: 92,
  seasonalMatch: 78,
  versatility: 88,
  sustainabilityScore: 75,
  occasionMatch: "Business Casual",
  weatherSuitability: "All Seasons",
  estimatedCost: "$245",
  wearCount: 0,
  lastWorn: null,
  colorPalette: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C"],
  categories: {
    "T-Shirts": 1,
    "Pants": 1,
    "Jackets": 1,
    "Accessories": 0
  },
  brands: {
    "Nike": 1,
    "Zara": 1,
    "H&M": 1
  }
};

const recommendations = [
  {
    type: "Accessory",
    suggestion: "Add a leather belt to complete the look",
    reason: "Enhances formal appeal and adds structure"
  },
  {
    type: "Color",
    suggestion: "Consider adding a pop of burgundy",
    reason: "Complements existing color palette"
  },
  {
    type: "Versatility",
    suggestion: "This outfit works for multiple occasions",
    reason: "Can be dressed up or down"
  }
];

export default function AnalysisPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#D4AF37]">Outfit Analysis</h1>
          <Button 
            onClick={() => router.push("/registered-user-view")}
            className="bg-[#D4AF37] hover:bg-[#B4941F] text-white"
          >
            Back to User Page
          </Button>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Style Score</CardTitle>
              <Award className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outfitAnalysis.styleScore}/100</div>
              <Progress value={outfitAnalysis.styleScore} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Color Harmony</CardTitle>
              <PieChart className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outfitAnalysis.colorHarmony}%</div>
              <Progress value={outfitAnalysis.colorHarmony} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Seasonal Match</CardTitle>
              <Sun className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outfitAnalysis.seasonalMatch}%</div>
              <Progress value={outfitAnalysis.seasonalMatch} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Versatility</CardTitle>
              <Repeat className="h-4 w-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outfitAnalysis.versatility}%</div>
              <Progress value={outfitAnalysis.versatility} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="composition" className="space-y-4">
          <TabsList>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="composition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Breakdown of clothing types</CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.entries(outfitAnalysis.categories).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between mb-2">
                      <span>{category}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Mix</CardTitle>
                  <CardDescription>Brands in your outfit</CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.entries(outfitAnalysis.brands).map(([brand, count]) => (
                    <div key={brand} className="flex items-center justify-between mb-2">
                      <span>{brand}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occasions">
            <Card>
              <CardHeader>
                <CardTitle>Occasion Suitability</CardTitle>
                <CardDescription>Where and when to wear this outfit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-[#D4AF37]" />
                    <span>Best for: {outfitAnalysis.occasionMatch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cloud className="h-4 w-4 text-[#D4AF37]" />
                    <span>Weather: {outfitAnalysis.weatherSuitability}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#D4AF37]" />
                    <span>Time of Day: Any</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Style Recommendations</CardTitle>
                <CardDescription>Suggestions to enhance your outfit</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] pr-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-lg">
                      <h3 className="font-semibold text-[#D4AF37]">{rec.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{rec.suggestion}</p>
                      <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Metrics</CardTitle>
                <CardDescription>Environmental impact of your outfit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Sustainability Score</span>
                      <span className="font-bold">{outfitAnalysis.sustainabilityScore}/100</span>
                    </div>
                    <Progress value={outfitAnalysis.sustainabilityScore} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Estimated Cost Per Wear</h3>
                      <p className="text-2xl font-bold text-[#D4AF37]">{outfitAnalysis.estimatedCost}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Materials</h3>
                      <p className="text-sm text-gray-600 mt-1">70% Sustainable Materials</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
