export interface OutfitAnalysis {
  styleScore: number;
  colorHarmony: number;
  seasonalMatch: number;
  versatility: number;
  sustainabilityScore: number;
  occasionMatch: string;
  weatherSuitability: string;
  estimatedCost: string;
  wearCount: number;
  lastWorn: Date | null;
  colorPalette: string[];
  categories: Record<string, number>;
  brands: Record<string, number>;
}

export interface Recommendation {
  type: string;
  suggestion: string;
  reason: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
} 