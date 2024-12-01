"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsGrid } from "@/components/custom/analysis/metrics-grid";
import { CompositionTab } from "@/components/custom/analysis/composition-tab";
import { OccasionsTab } from "@/components/custom/analysis/occasions-tab";
import { RecommendationsTab } from "@/components/custom/analysis/recommendations-tab";
import { SustainabilityTab } from "@/components/custom/analysis/sustainability-tab";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisData {
  outfitAnalysis: {
    styleScore: number;
    colorHarmony: number;
    seasonalMatch: number;
    versatility: number;
    categories: Record<string, number>;
    brands: Record<string, number>;
    occasionMatch: string;
    weatherSuitability: string;
    sustainabilityScore: number;
    estimatedCost: string;
  };
  recommendations: Array<{
    type: string;
    suggestion: string;
    reason: string;
  }>;
  selectedItems: Array<{
    _id: string;
    category: string;
    color: string;
    size: string;
    brand: string;
    imageUrls: string[];
    name?: string;
  }>;
}

export default function AnalysisPage() {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const itemsParam = urlParams.get("items");
        
        if (!itemsParam) {
          throw new Error("No items selected for analysis");
        }

        const selectedItemIds = itemsParam.split(",");
        const response = await fetch("/api/analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedItemIds }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch analysis data: ${response.statusText}`);
        }

        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) return <div className="loading">Loading analysis...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!analysisData) return <div className="error">No analysis data available</div>;

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

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Selected Items</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex p-4 gap-4">
              {analysisData.selectedItems.map((item) => (
                <Card key={item._id} className="w-[200px] flex-shrink-0">
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name || item.category}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{item.name || item.category}</p>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">{item.color}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">{item.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        <MetricsGrid metrics={analysisData.outfitAnalysis} />

        <Tabs defaultValue="composition" className="space-y-4">
          <TabsList>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="composition">
            <CompositionTab 
              categories={analysisData.outfitAnalysis.categories} 
              brands={analysisData.outfitAnalysis.brands} 
            />
          </TabsContent>

          <TabsContent value="occasions">
            <OccasionsTab 
              occasionMatch={analysisData.outfitAnalysis.occasionMatch}
              weatherSuitability={analysisData.outfitAnalysis.weatherSuitability}
            />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsTab recommendations={analysisData.recommendations} />
          </TabsContent>

          <TabsContent value="sustainability">
            <SustainabilityTab 
              sustainabilityScore={analysisData.outfitAnalysis.sustainabilityScore}
              estimatedCost={analysisData.outfitAnalysis.estimatedCost}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
