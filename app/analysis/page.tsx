"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsGrid } from "@/components/custom/analysis/metrics-grid";
import { CompositionTab } from "@/components/custom/analysis/composition-tab";
import { OccasionsTab } from "@/components/custom/analysis/occasions-tab";
import { RecommendationsTab } from "@/components/custom/analysis/recommendations-tab";
import { SustainabilityTab } from "@/components/custom/analysis/sustainability-tab";

// Move the mock data to a separate file later
import { outfitAnalysis, recommendations } from "@/lib/mock-data";

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

        <MetricsGrid metrics={outfitAnalysis} />

        <Tabs defaultValue="composition" className="space-y-4">
          <TabsList>
            <TabsTrigger value="composition">Composition</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="composition">
            <CompositionTab 
              categories={outfitAnalysis.categories} 
              brands={outfitAnalysis.brands} 
            />
          </TabsContent>

          <TabsContent value="occasions">
            <OccasionsTab 
              occasionMatch={outfitAnalysis.occasionMatch}
              weatherSuitability={outfitAnalysis.weatherSuitability}
            />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsTab recommendations={recommendations} />
          </TabsContent>

          <TabsContent value="sustainability">
            <SustainabilityTab 
              sustainabilityScore={outfitAnalysis.sustainabilityScore}
              estimatedCost={outfitAnalysis.estimatedCost}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
