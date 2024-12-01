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
import { Share2, Download, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [activeTab, setActiveTab] = useState("composition");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

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

  const handleSaveAnalysis = async () => {
    try {
      // Implement save to user's profile functionality
      toast.success("Analysis saved to your profile");
    } catch (error) {
      toast.error("Failed to save analysis");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Implement PDF generation and download
      toast.success("Analysis PDF downloaded");
    } catch (error) {
      toast.error("Failed to download PDF");
    }
  };

  const handleShare = async (method: string) => {
    try {
      switch (method) {
        case 'copy':
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard");
          break;
        case 'email':
          window.location.href = `mailto:?subject=Outfit Analysis&body=Check out my outfit analysis: ${window.location.href}`;
          break;
        // Add more sharing methods as needed
      }
      setIsShareDialogOpen(false);
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-red-500 text-xl mb-4">Error: {error.message}</div>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
  
  if (!analysisData) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-gray-500 text-xl mb-4">No analysis data available</div>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-[#F9F6E8]"
            >
              <ArrowLeft className="h-5 w-5 text-[#D4AF37]" />
            </Button>
            <h1 className="text-3xl font-bold text-[#D4AF37]">Outfit Analysis</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleSaveAnalysis}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F9F6E8]"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F9F6E8]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>

            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#F9F6E8]"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Analysis</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    variant="outline"
                    onClick={() => handleShare('copy')}
                    className="w-full"
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('email')}
                    className="w-full"
                  >
                    Share via Email
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Selected Items Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Selected Items</h2>
          <ScrollArea className="w-full rounded-lg border bg-white shadow-sm">
            <div className="flex p-6 gap-6">
              {analysisData.selectedItems.map((item) => (
                <Card key={item._id} className="w-[250px] flex-shrink-0 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name || item.category}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">{item.name || item.category}</p>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#F9F6E8] text-[#D4AF37] rounded-full text-sm">
                          {item.color}
                        </span>
                        <span className="px-3 py-1 bg-[#F9F6E8] text-[#D4AF37] rounded-full text-sm">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8">
          <MetricsGrid metrics={analysisData.outfitAnalysis} />
        </div>

        {/* Analysis Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-transparent">
            {[
              { value: "composition", label: "Composition" },
              { value: "occasions", label: "Occasions" },
              { value: "recommendations", label: "Recommendations" },
              { value: "sustainability", label: "Sustainability" }
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`
                  rounded-lg border-2 transition-all
                  ${activeTab === tab.value 
                    ? 'border-[#D4AF37] bg-[#F9F6E8] text-[#D4AF37]' 
                    : 'border-transparent hover:border-[#D4AF37]/50'
                  }
                `}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="bg-white rounded-lg shadow-sm p-6">
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
          </div>
        </Tabs>
      </div>
    </div>
  );
}
