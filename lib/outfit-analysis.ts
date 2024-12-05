import { IClothingItem } from "@/models/clothingItem";

interface OutfitAnalysis {
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
}

interface Recommendation {
  type: string;
  suggestion: string;
  reason: string;
}

interface ColorPalette {
  primary: string[];
  neutral: string[];
  accent: string[];
}

const COLOR_PALETTES: Record<string, ColorPalette> = {
  spring: {
    primary: ['yellow', 'coral', 'peach', 'mint'],
    neutral: ['beige', 'ivory', 'light gray'],
    accent: ['light blue', 'pink', 'lavender']
  },
  summer: {
    primary: ['blue', 'purple', 'pink', 'teal'],
    neutral: ['gray', 'navy', 'white'],
    accent: ['mint', 'lavender', 'light yellow']
  },
  fall: {
    primary: ['burgundy', 'orange', 'olive', 'brown'],
    neutral: ['camel', 'cream', 'dark brown'],
    accent: ['forest green', 'rust', 'gold']
  },
  winter: {
    primary: ['black', 'white', 'red', 'navy'],
    neutral: ['charcoal', 'silver', 'dark gray'],
    accent: ['emerald', 'purple', 'royal blue']
  }
};

const OCCASION_ESSENTIALS: Record<string, string[]> = {
  formal: ['suit', 'dress shirt', 'dress', 'blazer'],
  business: ['blazer', 'slacks', 'button-up', 'pencil skirt'],
  casual: ['t-shirt', 'jeans', 'sneakers', 'sweater'],
  'smart casual': ['polo', 'chinos', 'blouse', 'cardigan']
};

type PlainClothingItem = {
  _id: string;
  userId: string;
  category: string;
  color: string;
  size: string;
  brand: string;
  imageUrls: string[];
  price?: string;
};

function calculateStyleScore(_items: PlainClothingItem[]): number {
  return 85;
}

function calculateColorHarmony(_items: PlainClothingItem[]): number {
  return 90;
}

export function performAnalysis(items: PlainClothingItem[]) {
  const styleScore = calculateStyleScore(items);
  const colorHarmonyScore = calculateColorHarmony(items);

  return {
    styleScore,
    colorHarmonyScore,
    overallScore: (styleScore + colorHarmonyScore) / 2,
  };
}

export function generateRecommendations(analysis: ReturnType<typeof performAnalysis>, items: PlainClothingItem[]) {
  const recommendations = [];

  if (analysis.styleScore < 90) {
    recommendations.push("Consider adding more variety in clothing styles");
  }

  if (analysis.colorHarmonyScore < 90) {
    recommendations.push("Try incorporating complementary colors");
  }

  if (items.length < 3) {
    recommendations.push("Add more items to create a complete outfit");
  }

  return recommendations;
} 